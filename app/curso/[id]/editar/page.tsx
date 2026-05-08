"use client";

import { useParams, useRouter } from "next/navigation";
import { SubmitEvent, useEffect, useState } from "react";
import { getCurso, updateCurso } from "../actions";
import { Curso } from "@/interfaces/cursos";

export default function CursoPage() {
    const { id } = useParams();
    const [curso, setCurso] = useState({} as Curso);
    const router = useRouter();

    useEffect(() => {
        getCurso(Number(id)).then(response => setCurso(response));
    }, [id])

    function handleChange(value: string|number, key: keyof Curso) {
        setCurso((oldState) => ({ ...oldState, [key]: value }))
    };


    async function handleUpdate(e: SubmitEvent) {
        e.preventDefault();
        const response = await updateCurso(Number(id), curso);

        if (response) {
            alert(response);
            return;
        }

        router.push(`/curso/${id}`);
    }

    return (
        <div className="w-screen h-screen bg-zinc-950 flex flex-col items-center justify-center text-center px-6 selection:bg-orange-500/30 overflow-hidden">

            <form className="p-6 bg-gray-800 text-white rounded-lg shadow-2xl max-w-md flex flex-col items-center gap-2             relative border border-transparent transition-all duration-700 hover:bg-zinc-800/60 hover:translate-x-2  hover:shadow-violet-500 hover:border-violet-400 hover:scale-[1.01]" onSubmit={handleUpdate}>
                {/* Título com Gradiente Sunset */}
                <h1 className="hover:text-shadow-2xs text-shadow-cyan-400/30  text-6xl font-black from-fuchsia-600 orange-500 to-rose-600 text-transparent bg-clip-text bg-linear-to-r mb-10 tracking-tighter animate-in fade-in slide-in-from-top-6 duration-1000">
                    Editar <span className="bg-linear-to-r from-orange-400 via-rose-500 to-fuchsia-600 bg-clip-text text-transparent">Curso</span>
                </h1>

                {/* Card Principal com "Moldura" de Gradiente */}
                <div className="relative group w-full max-w-md">

                    {/* Glow Externo Dinâmico */}
                    <div className="absolute -inset-1 bg-linear-to-r from-orange-600 to-rose-600 rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>

                    <div className="relative bg-zinc-900/80 backdrop-blur-2xl p-10 rounded-[2.5rem] border border-white/10 shadow-2xl transition-all duration-500 hover:border-orange-500/30 animate-in fade-in zoom-in-95">

                        {/* Efeito de Luz Interna Quente */}
                        <div className="absolute -z-10 top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-orange-500/10 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        <div className="space-y-6 text-left">
                            <div
                                className="group/item relative bg-zinc-800/30 p-4 rounded-2xl border border-transparent transition-all duration-300 hover:bg-zinc-800/60 hover:border-orange-500/20 hover:translate-x-2"
                                style={{ transitionDelay: "100ms" }}
                            >
                                <label className=" text-[10px] uppercase tracking-[0.2em] text-orange-400/70 font-black mb-2">
                                    Nome
                                </label>
                                <input className="p-3 text-lg text-zinc-100 font-semibold group-hover/item:text-orange-50 transition-colors" value={curso.nome} type="nome" onChange={e => handleChange(e.target.value, "nome")} />

                                {/* Linha de detalhe lateral que aparece no hover do item */}
                                <div className="absolute left-0 top-1/4 w-0.5 h-1/2 bg-orange-500 scale-y-0 group-hover/item:scale-y-100 transition-transform duration-300 rounded-full" />
                            </div>

                            <div
                                className="group/item relative bg-zinc-800/30 p-4 rounded-2xl border border-transparent transition-all duration-300 hover:bg-zinc-800/60 hover:border-orange-500/20 hover:translate-x-2"
                                style={{ transitionDelay: "200ms" }}
                            >
                                <label className="text-[10px] uppercase tracking-[0.2em] text-orange-400/70 font-black mb-1">
                                    Professor
                                </label>
                                <input className="p-3 text-lg text-zinc-100 font-semibold group-hover/item:text-orange-50 transition-colors" value={curso.professor} type="professor" onChange={e => handleChange(e.target.value, "professor")} />

                                {/* Linha de detalhe lateral que aparece no hover do item */}
                                <div className="absolute left-0 top-1/4 w-0.5 h-1/2 bg-orange-500 scale-y-0 group-hover/item:scale-y-100 transition-transform duration-300 rounded-full" />
                            </div>

                            <div
                                className="group/item relative bg-zinc-800/30 p-4 rounded-2xl border border-transparent transition-all duration-300 hover:bg-zinc-800/60 hover:border-orange-500/20 hover:translate-x-2"
                                style={{ transitionDelay: "300ms" }}
                            >
                                <label className="text-[10px] uppercase tracking-[0.2em] text-orange-400/70 font-black mb-1">
                                    Carga Horária
                                </label>
                                <input className="p-3 text-lg text-zinc-100 font-semibold group-hover/item:text-orange-50 transition-colors" value={curso.cargaHoraria} type="cargaHoraria" onChange={e => handleChange(Number(e.target.value), "cargaHoraria")} />

                                {/* Linha de detalhe lateral que aparece no hover do item */}
                                <div className="absolute left-0 top-1/4 w-0.5 h-1/2 bg-orange-500 scale-y-0 group-hover/item:scale-y-100 transition-transform duration-300 rounded-full" />
                            </div>


                            
                            <div
                                className="group/item relative bg-zinc-800/30 p-4 rounded-2xl border border-transparent transition-all duration-300 hover:bg-zinc-800/60 hover:border-orange-500/20 hover:translate-x-2"
                                style={{ transitionDelay: "300ms" }}
                            >
                                <label className="text-[10px] uppercase tracking-[0.2em] text-orange-400/70 font-black mb-1">
                                    DESCRIÇÃO
                                </label>
                                <input className=" p-3 text-lg text-zinc-100 font-semibold group-hover/item:text-orange-50 transition-colors" value={curso.descricao} type="descricao" onChange={e => handleChange(e.target.value, "descricao")} />

                                {/* Linha de detalhe lateral que aparece no hover do item */}   
                                <div className="absolute left-0 top-1/4 w-0.5 h-1/2 bg-orange-500 scale-y-0 group-hover/item:scale-y-100 transition-transform duration-300 rounded-full" />
                            </div>


                            {/* Botão Voltar Estilizado */}
                            <button
                            type="submit"
                                className="w-full mt-4 py-4 rounded-2xl bg-zinc-800/50 text-zinc-400 font-bold flex items-center justify-center gap-3 transition-all duration-300 border border-zinc-700/50 hover:bg-linear-to-r hover:from-orange-500 hover:to-rose-600 hover:text-white hover:border-transparent hover:shadow-lg hover:shadow-orange-500/20 group/btn"
                            >
                                Salvar
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
} 