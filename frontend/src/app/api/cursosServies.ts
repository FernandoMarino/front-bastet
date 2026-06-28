import api from "./api";
import { Curso } from "../types/Curso";


type ListarCursosResponse = {
  message: string;
  cursos: Curso[];
};

export async function getCursos(): Promise<Curso[]> {
  try {
    const response = await api.get<ListarCursosResponse>("/cursos");
    return response.data.cursos ;
  } catch (error) {
    console.error("Erro ao buscar cursos:", error);
    throw error;
  }
}