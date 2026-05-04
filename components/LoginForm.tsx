"use client"
import { useRouter } from "next/navigation";
// Fala que esse componente é um "Client Component" e pode ser executado no cliente (navegador)
import { useState } from "react"

// Interface que define as props que o componente LoginForm vai receber, nesse caso, a função onSend, que é chamada quando o botão de login é clicado, passando o email e a senha como argumentos
interface Props {
    onSend: (email: string, password: string) => Promise<void | string>;
}

export default function LoginForm({ onSend }: Props) {

    // Estados para armazenar o email e a senha digitados pelo usuário
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");



    async function handleSubmit() {
        const response = await onSend(email, password);

        if (response) {
            alert(response);
            return
        }
        router.push("/");
    }

    return (

        // Div que envolve o formulário de login, com estilização usando Tailwind CSS
        <div className="flex flex-col  ">

            <input
                className=" hover:shadow-2xl  shadow-2xl hover: hover:shadow-blue-400  transition duration-700 ease-in-out  bg-gray-400
            hover:bg-white
            hover:animate-pulse
            p-10 hover:border-s-cyan-400
            border-2
            hover:scale-110
            hover:rounded-2xl
             m-20  mb-10 bg-center  text-center "
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />


            <input
            className="   shadow-2xl hover: hover:shadow-blue-400 transition duration-700 ease-in-out  bg-gray-400 
            hover:bg-white
            hover:animate-pulse
            border-2
            hover:border-s-cyan-400
            transform-gpu

            hover:rounded-2xl
            p-10
            hover:scale-110
            hover:border-red-500
            m-20  mb-30 bg-center text-center"
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />

            <button className=" hover:shadow-2xl  shadow-2xl hover: hover:shadow-blue-400  transition duration-700 ease-in-out  bg-gray-400
            hover:bg-white
            hover:animate-pulse
            p-10 hover:border-s-cyan-400
            border-2
            hover:scale-110
            hover:rounded-2xl
             m-20  mb-10 bg-center text-center" onClick={handleSubmit}>Entrar</button>




        </div>

    )
}