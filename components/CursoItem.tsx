"use client";

import Link from "next/link";
import { Trash } from "lucide-react";
import { deleteCurso } from "@/app/cursos/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
    id: number;
    nome: string;
    professor?: string;
    cargaHoraria: number;
    descricao: string;

}

export default function CursoItem({ id, nome, professor, cargaHoraria, descricao }: Props) {
    const router = useRouter();
    const [showSuccess, setShowSuccess] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    async function handleDelete() {
        const confirmed = window.confirm(
            `Tem certeza que deseja deletar "${nome}"?\n\nEssa ação não pode ser desfeita!`
        );
        if (!confirmed || isDeleting) return;

        setIsDeleting(true);

        try {
            await deleteCurso(id);

            setShowSuccess(true);

            await new Promise(resolve => setTimeout(resolve, 4500));

            router.refresh();

            await new Promise(resolve => setTimeout(resolve, 800));

            setShowSuccess(false);
            setIsDeleting(false);

        } catch (error) {
            console.error(error);
            alert("Erro ao deletar o curso.");
            setShowSuccess(false);
            setIsDeleting(false);
        }
    }

    return (
        <Link href={`/curso/${id}`} className="block group">
            <li className={`flex items-center gap-4 bg-white border-2 border-zinc-100 rounded-2xl p-5 
                 transition-all duration-300 relative overflow-hidden min-h-25
                 ${isDeleting ? 'opacity-50' : 'hover:border-violet-400 hover:bg-violet-50/30 hover:-translate-y-1'}`}>

                {/* Mensagem de sucesso */}
                {showSuccess && (
                    <div className="absolute inset-0 flex items-center justify-center bg-green-600/95 backdrop-blur-md z-20">
                        <div className="bg-white text-green-700 font-semibold px-10 py-5 rounded-3xl shadow-2xl flex items-center gap-3 text-xl animate-pulse">
                            ✅ Curso deletado com sucesso!
                        </div>
                    </div>
                )}

                <div className="flex-1">
                    <p className={`text-xl font-bold transition-all ${isDeleting || showSuccess ? 'line-through text-zinc-400' : 'text-zinc-800 group-hover:text-violet-700'}`}>
                        {nome}
                    </p>
                    <p className="text-sm text-zinc-400">Curso #{id}</p>
                </div>

                <span className="text-2xl text-zinc-300 group-hover:text-violet-500 transition-all">→</span>

                <button
                    disabled={isDeleting || showSuccess}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleDelete();
                    }}
                    className="p-3 text-zinc-400 hover:text-red-600 transition-colors disabled:opacity-40"
                >
                    <Trash size={24} />
                </button>
            </li>
        </Link>
    );
}