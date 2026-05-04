// components/NeonButton.tsx
import { ButtonHTMLAttributes, ReactNode } from "react";

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    className?: string;
    variant?: "primary" | "secondary" | "danger";
}

export default function NeonButton({
    children,
    className = "",
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    variant = "primary",
    ...props
}: NeonButtonProps) {
    return (
        <button
            className={`
                relative overflow-hidden w-full py-4 px-6 rounded-2xl font-bold text-lg
                transition-all duration-300 active:scale-[0.97]
                border border-zinc-700 hover:border-violet-400
                bg-zinc-900 text-white
                ${className}
            `}
            {...props}
        >
            <div className="absolute inset-[-1000%] animate-[spin_0.9s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#06b6d4_0%,#a855f7_50%,#06b6d4_100%)]" />

            <div className="absolute inset-0.5 bg-zinc-900 rounded-[14px] z-10" />
            <span className="relative z-20 flex items-center justify-center gap-2 group-hover:gap-3 transition-all">
                {children}
            </span>
        </button>
    );
}