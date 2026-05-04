"use client";

import { SubmitEvent, useState } from "react";
import { CreateCurso } from "./actions";
import { useRouter } from "next/navigation";

export default function CursoCadastroPage() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [professor, setProfessor] = useState("");
  const [cargaHoraria, setCargaHoraria] = useState("");
  const [descricao, setDescricao] = useState("");

  async function handleSubmit(e: SubmitEvent){
    e.preventDefault();
    const response = await CreateCurso({
        nome: nome,
        professor: professor,
        cargaHoraria: Number(cargaHoraria),
        descricao,  
    })
    if (!response) {
       setNome("");
       setProfessor("");
       setCargaHoraria("");
       setDescricao("");
       router.push("/cursos");
       return;
    }
    alert(response);
    
  }

  return (
    <div className=" min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 selection:bg-cyan-500/30 relative overflow-hidden">
      
      <div className="  absolute top-1/4 -left-20 w-80 h-80 bg-purple-600 rounded-full blur-[120px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-cyan-600 rounded-full blur-[120px] opacity-20 animate-pulse delay-700"></div>


       
      <div className=" transition duration-700 ease-in-out hover:scale-130 hover:shadow-blue-500 shadow-2xl  w-full max-w-md z-10"> 
        <form 
          className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl flex flex-col gap-6" 
          onSubmit={handleSubmit}
        >

            {/* Título do formulário */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-black tracking-tight text-white italic">
              CURSO<span className="text-cyan-400 font-extralight block not-italic text-sm tracking-[0.3em] uppercase ">Cadastro Digital</span>
            </h1>
          </div>

          {/* Campo Nome */}

          <div className="space-y-4">
            <div className="relative group">
              <input 
                className=" hover:transition-all duration-700 ease-in-out hover:shadow-blue-500 shadow-2xl   w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2.5 pl-10 pr-4 text-zinc-100 placeholder:text-zinc-500 outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400 transition-all"
                type="text" 
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)} 
              />
            </div>

            {/* Campo Professor */}

            <div className="grid grid-cols-2 gap-4">
              <div className="relative group">
                <input 
                  className=" hover:transition-all duration-700 ease-in-out hover:shadow-blue-500 shadow-2xl  w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2.5 pl-10 pr-4 text-zinc-100 placeholder:text-zinc-500 outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400 transition-all"
                  type="text" 
                  placeholder="Professor"
                  value={professor}
                  onChange={(e) => setProfessor(e.target.value)} 
                />
              </div>

              {/* Campo CargaHoraria */}
              <div className="relative group">
                <input 
                  className=" hover:transition-all duration-700 ease-in-out hover:shadow-blue-500 shadow-2xl  w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2.5 pl-10 pr-4 text-zinc-100 placeholder:text-zinc-500 outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400 transition-all"
                  type="number" 
                  placeholder="Carga Horária"
                  value={cargaHoraria}
                  onChange={(e) => setCargaHoraria(e.target.value)} 
                />
              </div>
            </div>

            {/* Campo Descricao */}
            <div className="relative group">
              <input 
                className=" hover:transition-all duration-700 ease-in-out hover:shadow-blue-500 shadow-2xl  w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2.5 pl-10 pr-4 text-zinc-100 placeholder:text-zinc-500 outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400 transition-all"
                type="text" 
                placeholder="Descrição"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)} 
              />
              {/*<div className="absolute inset-[-1000%] animate-[spin_0.1s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#06b6d4_0%,#a855f7_50%,#06b6d4_100%)]" /> */}
            </div>
          </div>


            {/* Botão de enviar */}
          <button 
            className="w-full mt-2 relative group overflow-hidden rounded-lg p-px " 
            type="submit"
          >
           { /* Efeito de borda neon animada */}
            <div className="absolute inset-[-1000%] animate-[spin_0.9s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#06b6d4_0%,#a855f7_50%,#06b6d4_100%)]" />
            

            { /* Botão de enviar*/}
            <div className=" cursor-pointer  flex h-full w-full items-center justify-center gap-2 rounded-lg bg-zinc-900 px-7 py-3 text-sm font-bold text-white backdrop-blur-3xl group-hover:bg-zinc-900/80 transition-all hover:scale-110">
              CADASTRAR O CURSO
            </div>
          </button>
 
          {/* Sistema de Gestão 2026 */}
          <p className="text-[10px] text-center text-zinc-500 tracking-widest uppercase">
            Sistema de Gestão 2026 ;
          </p>
        </form>
      </div>
    </div>
  );
}