import LoginForm from "../../components/LoginForm"; // Exporta o componente LoginForm, que é usado para renderizar o formulário de login
import { loginAction } from "./actions";


export default function LoginPage() {
    return (
        <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 selection:bg-orange-500/30 relative overflow-hidden">

            {/* Luz de fundo para profundidade */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-500 h-500 bg-orange-600/10 blur-[120px] rounded-full pointer-events-none animate-pulse" />


                {/* Cabeçalho do Login */}
                <div className="text-center mb-12 group">
                    <h1 className="text-6xl font-black tracking-tighter text-white transition-all duration-500 group-hover:tracking-normal">
                        Login<span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-rose-600">.</span>
                    </h1>
                    <div className="h-1 w-12 bg-linear-to-r from-orange-500 to-rose-600 mx-auto mt-4 rounded-full transition-all duration-500 group-hover:w-32" />
                </div>

                <div className="relative p-0.5 rounded-[3rem] bg-linear-to-b from-white/10 via-transparent to-white/5 shadow-2xl group/card">

                    <div className="absolute inset-0 rounded-[3rem] bg-linear-to-r from-orange-500/20 to-rose-500/20 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 blur-xl" />

                    <div className="relative bg-zinc-900/90 backdrop-blur-3xl p-10 rounded-[2.9rem] flex flex-col gap-6 border border-white/5">

                        
                        
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-linear-to-r from-transparent via-orange-500/50 to-transparent" />

                        <LoginForm onSend={loginAction} />
                    </div>
                </div>

                {/* rodapé do Login */}
                <div className="mt-12 flex justify-center items-center gap-4">
                    <div className="h-px w-8 bg-zinc-800" />
                    <span className="text-[10px] text-zinc-600 uppercase tracking-[0.4em] font-bold">Acesso Restrito</span>
                    <div className="h-px w-8 bg-zinc-800" />
                </div>
            </div>
        
    )
}
