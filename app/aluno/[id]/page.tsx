"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getAluno } from "./actions";
import { Aluno } from "@/interfaces/alunos";
import { PenBox } from "lucide-react";
import Link from "next/link";


export default function AlunoPage() {
    const { id } = useParams();
    const [aluno, setAluno] = useState({} as Aluno);

    useEffect(() => {
        getAluno(Number(id)).then(response => setAluno(response));
    }, [id])

    return (
        <div className="w-screen h-screen bg-zinc-950 flex flex-col items-center justify-center text-center px-6 selection:bg-orange-500/30 overflow-hidden">
    
    {/* Título com Gradiente Sunset */}
    <h1 className="text-6xl font-black text-white mb-10 tracking-tighter animate-in fade-in slide-in-from-top-6 duration-1000">
        Detalhes do <span className="bg-linear-to-r from-orange-400 via-rose-500 to-fuchsia-600 bg-clip-text text-transparent">Aluno</span>
        <Link href={`/aluno/${id}/editar`} className="text-zinc-300 hover:text-violet-400 font-medium transition-all duration-700 ease-in-out hover:scale-105 active:scale-95">
        <PenBox />
        </Link>
    </h1>

    {/* Card Principal com "Moldura" de Gradiente */}
    <div className="relative group w-full max-w-md">
        
        {/* Glow Externo Dinâmico */}
        <div className="absolute -inset-1 bg-linear-to-r from-orange-600 to-rose-600 rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>

        <div className="relative bg-zinc-900/80 backdrop-blur-2xl p-10 rounded-[2.5rem] border border-white/10 shadow-2xl transition-all duration-500 hover:border-orange-500/30 animate-in fade-in zoom-in-95">
            
            {/* Efeito de Luz Interna Quente */}
            <div className="absolute -z-10 top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-orange-500/10 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="space-y-6 text-left">
                {[
                    { label: "ID", value: aluno.id },
                    { label: "Nome", value: aluno.name },
                    { label: "Email", value: aluno.email },
                    { label: "CPF", value: aluno.cpf }
                ].map((item, i) => (
                    <div 
                        key={item.label}
                        className="group/item relative bg-zinc-800/30 p-4 rounded-2xl border border-transparent transition-all duration-300 hover:bg-zinc-800/60 hover:border-orange-500/20 hover:translate-x-2"
                        style={{ transitionDelay: `${i * 100}ms` }}
                    >
                        <p className="text-[10px] uppercase tracking-[0.2em] text-orange-400/70 font-black mb-1">
                            {item.label}
                        </p>
                        <p className="text-lg text-zinc-100 font-semibold group-hover/item:text-orange-50 transition-colors">
                            {item.value}
                        </p>
                        
                        {/* Linha de detalhe lateral que aparece no hover do item */}
                        <div className="absolute left-0 top-1/4 w-0.5 h-1/2 bg-orange-500 scale-y-0 group-hover/item:scale-y-100 transition-transform duration-300 rounded-full" />
                    </div>
                ))}


                {/* Botão Voltar Estilizado */}
                <button 
                    onClick={() => window.history.back()} 
                    className="w-full mt-4 py-4 rounded-2xl bg-zinc-800/50 text-zinc-400 font-bold flex items-center justify-center gap-3 transition-all duration-300 border border-zinc-700/50 hover:bg-linear-to-r hover:from-orange-500 hover:to-rose-600 hover:text-white hover:border-transparent hover:shadow-lg hover:shadow-orange-500/20 group/btn"
                >
                    <span className="group-hover/btn:-translate-x-2 transition-transform duration-300">←</span> 
                    Voltar para lista
                </button>
            </div>
        </div>
    </div>
</div>
    )
}