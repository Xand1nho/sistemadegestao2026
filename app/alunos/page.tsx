import AlunoItem from "@/components/AlunoItem"; // Exporta o componente AlunoItem, que é usado para renderizar cada item da lista de alunos
import { getAlunos } from "./actions";
import Link from "next/link";
import NeonButton from "@/components/NeonButton";

export default async function AlunosPage() { // Essa função é a página de alunos, onde os dados dos alunos são buscados da API e renderizados na tela
    const alunos = await getAlunos(); // Busca os dados dos alunos da API usando a função getAlunos, que é um "Server Action" e só pode ser executada no servidor

    console.log(alunos);


    return (
        <div className="h-screen w-screen bg-zinc-950 flex flex-col items-center overflow-hidden transition-all duration-700 ease-in-out">
            {/* Título */}
            <h1 className="mt-12 mb-8 text-5xl font-bold text-white tracking-tight transition-all duration-700 ease-in-out hover:text-violet-400">
                Lista de Alunos
            </h1>

            {/* Botão Home (Posicionado no topo) */}
            <Link href="/" className="w-[90%] max-w-2xl mb-6 block">
                <NeonButton
                    className="cursor-pointer w-full py-4 rounded-2xl bg-zinc-800/50 text-zinc-400 font-bold flex items-center justify-center gap-3 transition-all duration-300 border border-zinc-700/50 hover:bg-linear-to-r hover:from-violet-600 hover:to-indigo-600 hover:text-white hover:border-transparent hover:shadow-lg hover:shadow-violet-500/20 group/btn"
                    
                >
                    Ir para o Início
                </NeonButton>
            </Link>


            {/* Container da lista */}
            <div className="w-[90%] max-w-2xl h-[65vh] bg-white rounded-3xl shadow-2xl shadow-violet-500/30 border-2 border-zinc-200 p-6 overflow-auto transition-all duration-700 ease-in-out hover:shadow-2xl hover:shadow-violet-500/50 hover:border-violet-400 hover:scale-[1.01]">
                <ul className="flex flex-col gap-3 transition-all duration-700 ease-in-out">
                    {alunos.map((aluno) => (
                        <AlunoItem key={aluno.id} id={aluno.id} nome={aluno.name} />
                    ))}
                </ul>
            </div>

            {/* Botão Home (Posicionado no topo) */}
            <Link href="/aluno/cadastro" className=" p-5 w-[90%] max-w-2xl mb-6 block">
                <NeonButton className="cursor-pointer w-full py-4 rounded-2xl bg-zinc-800/50 text-zinc-400 font-bold flex items-center justify-center gap-3 transition-all duration-300 border border-zinc-700/50 hover:bg-linear-to-r hover:from-violet-600 hover:to-indigo-600 hover:text-white hover:border-transparent hover:shadow-lg hover:shadow-violet-500/20 group/btn">
                    <span className="group-hover/btn:-translate-x-1 transition-transform duration-700"></span>
                    Cadastrar Aluno
                </NeonButton>
            </Link>
        </div>


    )
}