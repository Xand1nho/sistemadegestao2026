import { CursoData } from "./cursos";

export interface AlunoData{
    id: number;
    name: string;
    idade: number;
    cpf: number;
    email: string;
    createAt: Date;
    uptadeAt: Date; 
}

export interface Aluno extends AlunoData{
    cursos: CursoData[]
}