"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface CreateCurso {
  nome: string;
  professor: string;
  cargaHoraria: number;
  descricao: string;
}

export async function CreateCurso(curso: CreateCurso) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("access_token")?.value;

  const response = await fetch("http://localhost:8080/cursos", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(curso),
  });

  const data = await response.json();

  if (response.status === 201) {
    revalidateTag("listar", "max");
    return;
  }
  if (response.status === 401) {
    redirect("/login");
  }

  return data;
}