import { prisma } from '../config/prisma';

interface CriarUsuarioRequest {
  nome: string; 
  email: string;
  senha: string;
  cargo: string;
}

class CriarUsuarioService {
  async execute({ nome, email, senha, cargo }: CriarUsuarioRequest) {
    if (!nome || !email || !senha || !cargo) {
      throw new Error("Todos os campos (nome, email, senha, cargo) são obrigatórios.");
    }

    const usuarioExiste = await prisma.usuario.findUnique({
      where: { email }
    });

    if (usuarioExiste) {
      throw new Error("Este e-mail já está cadastrado no sistema.");
    }

    const usuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha,
        cargo
      },
      select: {
        id: true,
        nome: true,
        email: true,
        cargo: true,
        criadoEm: true
      }
    });

    return usuario;
  }
}

export { CriarUsuarioService };