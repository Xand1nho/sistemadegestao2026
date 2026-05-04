import { AlunoData } from "./alunos";

export interface CursoData{
    id: number;
    nome: string;
    professor?: string;
    cargaHoraria: number;
    descricao: string;
    createAt: Date;
    uptadeAt: Date; 
}

export interface Curso extends AlunoData{
    professor: any;
    cargaHoraria: any;
    descricao: any;
    nome: any;
    alunos: AlunoData[];
}
