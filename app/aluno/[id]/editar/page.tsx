"use client";

import { Aluno } from "@/interfaces/alunos";
import { useParams, useRouter } from "next/navigation";
import { SubmitEvent, useEffect, useState } from "react";
import { getAluno, updateAluno } from "../actions";
import { Curso } from "@/interfaces/cursos";
import { getCursos } from "@/app/cursos/actions";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";

export default function AlunoPage() {
    const { id } = useParams();
    const [aluno, setAluno] = useState({} as Aluno);
    const [cursos, setCursos] = useState([] as Curso[]);
    const [matriculado, setMatriculado] = useState([] as Curso[]);
    const [naoMatriculado, setNaoMatriculado] = useState([] as Curso[]);
    const router = useRouter();

    useEffect(() => {
        getAluno(Number(id)).then((response) => setAluno(response));
        getCursos().then((response) => setCursos(response));
    }, [id]);

    useEffect(() => {
        if (aluno.cursos) {
            const matriculadoTemp = [] as Curso[];
            const naoMatriculadoTemp = [] as Curso[];

            for (const curso of cursos) {
                if (aluno.cursos.find((c) => c.id === curso.id)) {
                    matriculadoTemp.push(curso);
                } else {
                    naoMatriculadoTemp.push(curso);
                }
            }
            setMatriculado(matriculadoTemp);
            setNaoMatriculado(naoMatriculadoTemp);
        }
    }, [cursos, aluno]);

    function handleChange(value: string | number, key: keyof Aluno) {
        setAluno((oldState) => ({ ...oldState, [key]: value }));
    }

    async function handleUpdate(e: SubmitEvent) {
        e.preventDefault();
        const response = await updateAluno(Number(id), aluno);

        if (response) {
            alert(response);
            return;
        }

        router.push(`/aluno/${id}`);
    }

    function matricular(curso: Curso) {
        setMatriculado((oldState) => [...oldState, curso]);
        setNaoMatriculado((oldState) => oldState.filter((c) => c.id !== curso.id));
    }

    function desmatricular(curso: Curso) {
        setMatriculado((oldState) => oldState.filter((c) => c.id !== curso.id));
        setNaoMatriculado((oldState) => [...oldState, curso]);
    }


    return (
        <div className="w-screen h-screen bg-zinc-950 flex flex-col items-center justify-center text-center px-6 selection:bg-orange-500/30 overflow-hidden">

            <form className=" p-6 bg-gray-800 text-white rounded-lg shadow-2xl max-w-md flex flex-col items-center gap-2 relative border border-transparent transition-all duration-700 hover:bg-zinc-800/60 hover:translate-x-2  hover:shadow-violet-500 hover:border-violet-400 hover:scale-[1.01]" onSubmit={handleUpdate}>
                <h1 className="hover:text-shadow-2xs text-shadow-cyan-400/30  text-6xl font-black from-fuchsia-600 orange-500 to-rose-600 text-transparent bg-clip-text bg-linear-to-r mb-10 tracking-tighter animate-in fade-in slide-in-from-top-6 duration-1000">
                    Editar <span className="bg-linear-to-r from-orange-400 via-rose-500 to-fuchsia-600 bg-clip-text text-transparent">Aluno</span>
                </h1>

                <div className="relative group w-full max-w-md">

                    <div className="absolute -inset-1 bg-linear-to-r from-orange-600 to-rose-600 rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>

                    <div className="0relative bg-zinc-900/80 backdrop-blur-2xl p-10 rounded-[2.5rem] border border-white/10 shadow-2xl transition-all duration-500 hover:border-orange-500/30 animate-in fade-in zoom-in-95">

                        <div className="absolute -z-10 top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-orange-500/10 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        <div className="space-y-6 text-left">
                            <div
                                className="group/item relative bg-zinc-800/30 p-4 rounded-2xl border border-transparent transition-all duration-300 hover:bg-zinc-800/60 hover:border-orange-500/20 hover:translate-x-2"
                                style={{ transitionDelay: "100ms" }}
                            >
                                <label className=" text-[10px] uppercase tracking-[0.2em] text-orange-400/70 font-black mb-2">
                                    Nome
                                </label>
                                <input className="p-3 text-lg text-zinc-100 font-semibold group-hover/item:text-orange-50 transition-colors" value={aluno.name} type="name" onChange={e => handleChange(e.target.value, "name")} />

                                <div className="absolute left-0 top-1/4 w-0.5 h-1/2 bg-orange-500 scale-y-0 group-hover/item:scale-y-100 transition-transform duration-300 rounded-full" />
                            </div>

                            <div
                                className="group/item relative bg-zinc-800/30 p-4 rounded-2xl border border-transparent transition-all duration-300 hover:bg-zinc-800/60 hover:border-orange-500/20 hover:translate-x-2"
                                style={{ transitionDelay: "200ms" }}
                            >
                                <label className="text-[10px] uppercase tracking-[0.2em] text-orange-400/70 font-black mb-1">
                                    Idade
                                </label>
                                <input className="p-3 text-lg text-zinc-100 font-semibold group-hover/item:text-orange-50 transition-colors" value={aluno.idade} type="idade" onChange={e => handleChange(Number(e.target.value), "idade")} />

                                <div className="absolute left-0 top-1/4 w-0.5 h-1/2 bg-orange-500 scale-y-0 group-hover/item:scale-y-100 transition-transform duration-300 rounded-full" />
                            </div>

                            <div
                                className="group/item relative bg-zinc-800/30 p-4 rounded-2xl border border-transparent transition-all duration-300 hover:bg-zinc-800/60 hover:border-orange-500/20 hover:translate-x-2"
                                style={{ transitionDelay: "300ms" }}
                            >
                                <label className="text-[10px] uppercase tracking-[0.2em] text-orange-400/70 font-black mb-1">
                                    CPF
                                </label>
                                <input className="p-3 text-lg text-zinc-100 font-semibold group-hover/item:text-orange-50 transition-colors" value={aluno.cpf} type="cpf" onChange={e => handleChange(Number(e.target.value), "cpf")} />

                                {/* Linha de detalhe lateral que aparece no hover do item */}
                                <div className="absolute left-0 top-1/4 w-0.5 h-1/2 bg-orange-500 scale-y-0 group-hover/item:scale-y-100 transition-transform duration-300 rounded-full" />
                            </div>



                            <div
                                className="group/item relative bg-zinc-800/30 p-4 rounded-2xl border border-transparent transition-all duration-300 hover:bg-zinc-800/60 hover:border-orange-500/20 hover:translate-x-2"
                                style={{ transitionDelay: "300ms" }}
                            >
                                <label className="text-[10px] uppercase tracking-[0.2em] text-orange-400/70 font-black mb-1">
                                    EMAIL
                                </label>
                                <input className=" p-3 text-lg text-zinc-100 font-semibold group-hover/item:text-orange-50 transition-colors" value={aluno.email} type="email" onChange={e => handleChange(e.target.value, "email")} />

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




                            <div className="bg-white rounded-xl h-[40%] overflow-y-auto flex text-black p-4 gap-1 w-[90%] justify-center">
                                <ul className="w-[90%] text-end">
                                    <h2 className="text-center">Não Matriculado</h2>
                                    {naoMatriculado.map((curso) => (
                                        <li
                                            key={curso.id}
                                            className="underline w-full px-2 flex justify-between"
                                        >
                                            {curso.nome}
                                            <button onClick={() => matricular(curso)}>
                                                <ArrowRightCircle />
                                            </button>
                                            
                                        </li>
                                    ))}


                                </ul>
                                <ul className="w-px h-full bg-black" />

                                <ul className="w-[90%] text-end">
                                    <h2 className="text-center">Matriculado</h2>
                                    {matriculado.map((curso) => (
                                        <li
                                            key={curso.id}
                                            className="underline w-full px-2 flex justify-between"
                                        >
                                            <button onClick={() => desmatricular(curso)}>
                                                <ArrowLeftCircle />
                                            </button>
                                            {curso.nome}
                                        </li>
                                    ))}


                                </ul>



                            </div>
                            <button className="bg-black text-white rounded-xl px-10 py-2 cursor-pointer"> Salvar matrículas</button>

                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}