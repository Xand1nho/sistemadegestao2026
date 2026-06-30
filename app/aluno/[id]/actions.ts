"use server";

import { Aluno, AlunoData } from "@/interfaces/alunos";
import { Curso } from "@/interfaces/cursos";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getAluno(id: number) { // funcao de pegar dado de um aluno por id
    const cookiesStore = await cookies(); // pega o cookies para pegar o token de acesso
    const token = cookiesStore.get("access_token")?.value; // pega o token de acesso do cookies

    const response = await fetch(`http://localhost:8080/alunos/${id}`, { // faz a requisição para pegar os dados do aluno por id
        headers: {          // adiciona os headers para o pedido, incluindo o token de acesso para autenticação
            Authorization: `Bearer ${token}`,
        },
        next: { tags: ["pegarDados"] }, // adiciona a tag "pegarDados" para revalidar os dados quando necessário
    });



    if (response.status === 401) { // se a respost for 401, significa que o token de acesso é inválido ou expirou, então redireciona para a página de login
        redirect("/login");
    }

    // função para converter o resposta em JSON e retornar os dados do aluno, ou retornar um objeto vazio em caso de erro
    try {
        const data = await response.json();
        return data as Aluno;
    } catch (e) {
        console.error(e);
        return {} as Aluno;
    }
}


// função para atualizar os dados de um aluno por id, recebe o id do aluno e os novos dados do aluno como parâmetros
export async function updateAluno(id: number, aluno: AlunoData) {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("access_token")?.value;

    const response = await fetch(`http://localhost:8080/alunos/${id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(aluno), // envia os dados atualizados para o servidor
    });

    if (response.status === 401) {
        redirect("/login");
    }


    if (response.status === 200) {
        revalidateTag("pegarDados", "max");
        return;
    }
    try {
        // recebimento dos dados
        const data = await response.json(); // convert o resposta em JSON e retorna os dados atualizados
        return data; // retorna os dados atualizados
    } catch (e) {
        console.error(e);
        return "Erro ao atualizar aluno";
    }

}

// maitrcular um aluno em varios cursos
// recebe o id do aluno, os cursos que ele está matriculando e os cursos que ele está desmatriculando
export async function matriculas(
    id: number,
    matriculado: Curso[],
    desmatriculado: Curso[],
) {


    const cookiesStore = await cookies();
    const token = cookiesStore.get("access_token")?.value;

    let response = await fetch(`http://localhost:8080/alunosMatricular/${id}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            cursosId: matriculado.map(curso => curso.id)
        })
    });

    if (response.status === 401) {
        redirect("/login");
    }

    if (response.status === 201) {
        try {

            const data = await response.json();
            return data;
        } catch (e) {
            console.error(e);
            return "Erro ao matricular o aluno";

        }
    }


    response = await fetch(`http://localhost:8080/alunos/desmatriculas/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            cursosId: desmatriculado.map(curso => curso.id),
        })
    })

    if (response.status === 401) {
        redirect("/login")
    }


    if (response.status !== 200) {
        try {
            const data = await response.json();
            return data;
        } catch (e) {
            console.error(e);
            return "Erro ao desmatricular o aluno";
        }
    }

    revalidateTag("pegarDados", "max")
    revalidateTag("listarCursos", "max")
    return;
}


