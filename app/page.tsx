import NeonButton from "@/components/NeonButton";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen h-screen bg-zinc-950 flex flex-col overflow-hidden transition-all duration-700 ease-in-out">

      {/* Navbar */}
      <div className="w-screen h-20 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-8 transition-all duration-700 ease-in-out">

        <div className="text-xl font-bold text-white hover:text-violet-400 transition-all duration-700 ease-in-out hover:scale-105 active:scale-95">
          Sistema de Gestão 2026
        </div>


        <div className="flex items-center gap-8 text-lg">
          <Link
            href="/"
            className="text-zinc-300 hover:text-white font-medium transition-all duration-700 ease-in-out hover:scale-105 active:scale-95"
          >
            Home
          </Link>

          <Link
            href="/alunos"
            className="text-zinc-300 hover:text-violet-400 font-medium transition-all duration-700 ease-in-out hover:scale-105 active:scale-95"
          >
            Alunos
          </Link>

          <Link
            href="/login"
            className="text-zinc-300 hover:text-red-400 font-medium cursor-pointer transition-all duration-700 ease-in-out hover:scale-105 active:scale-95"
          >
            Sair
          </Link>
        </div>

      </div>

      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 transition-all duration-700 ease-in-out">
        <h2 className="text-6xl font-bold text-white mb-6 tracking-tighter">
          <NeonButton className=" tracking-wide italic text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-rose-600 hover:scale-105 active:scale-95">
          Bem Vindo (a)!
          </NeonButton>
        </h2>

        <p className="text-xl text-zinc-400 max-w-md mb-12 hover:text-white transition-all duration-700 ease-in-out hover:scale-105 active:scale-95">
          Aqui você pode gerenciar seus alunos e cursos de forma simples e intuitiva.</p>

        <Link
          href="/alunos"
          className="px-10 py-4  bg-violet-600 hover:bg-violet-500 text-white text-lg font-semibold rounded-2xl transition-all duration-700 ease-in-out hover:scale-105 active:scale-95 shadow-xl shadow-violet-500/30 flex items-center gap-3"
        >
          Ver Lista de Alunos →
        </Link>
        <Link
          href="/cursos"
          className="m-10  px-10 py-4  bg-violet-600 hover:bg-violet-500 text-white text-lg font-semibold rounded-2xl transition-all duration-700 ease-in-out hover:scale-105 active:scale-95 shadow-xl shadow-violet-500/30 flex items-center gap-3"
        >
          Ver Lista de Cursos →
        </Link>
      </div>

    </div>
  );
}