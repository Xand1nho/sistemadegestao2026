"use server";

import { Curso } from "@/interfaces/cursos";
import { cookies } from "next/headers";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function getCursos() {
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("access_token")?.value;
    const response = await fetch(`http://localhost:8080/cursos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ["listar"] },
    });
    
    
    if(response.status == 401){
      return redirect("/login");
    }

    if(response.status == 200){
      const data = await response.json();
      return data as Curso[];
    }

    console.error(response)
    return [];
    
  }catch (e){
    console.error(e);
    return [];
  }
}

export async function deleteCurso(id: number) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("access_token")?.value;

  if (!token) {
    throw new Error("Token não encontrado");
  }

  const response = await fetch(`http://localhost:8080/cursos/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    console.error("Erro ao deletar curso:", response.status, errorText);
    throw new Error(`Falha ao deletar curso (status ${response.status})`);
  }

  // ✅ Revalida a página inteira da lista
  revalidatePath("/cursos");     // ← Mude para o caminho exato da sua lista
  revalidatePath("/");           // opcional: revalida raiz também

  const data = await response.json();

  console.log(`Curso ${id} deletado com sucesso`);

  if(response.status === 200) {
    revalidateTag("listar" , "max");
    return;
  }

  if (response.status === 200) {
    redirect("/login");
  }
  return data; 
}
