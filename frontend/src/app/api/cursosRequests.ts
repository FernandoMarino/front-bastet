import api from "./api";
import { Curso } from "../types/Curso";



type ListarCursosResponse = {
  message: string;
  cursos: Curso[];
};


// ==========================================
// 1. Buscar todos os cursos (Público / Logado)
// ==========================================
export async function getCursos(): Promise<Curso[]> {
  try {
    const response = await api.get<ListarCursosResponse>("/cursos");
    return response.data.cursos ;
  } catch (error) {
    console.error("Erro ao buscar cursos:", error);
    throw error;
  }
}

// ==========================================
// 2. Fazer Inscrição em um Curso
// ==========================================
export async function realizarInscricaoRequest(cursoId: number): Promise<void> {
  try {
    // O backend não exige payload no body, apenas o id na URL e o Cookie (JWT)
    await api.post(`/cursos/${cursoId}`);
  } catch (error) {
    console.error("Erro ao realizar inscrição:", error);
    throw error; // O frontend pode capturar esse erro para mostrar um Toast/Alerta
  }
}
// ==========================================
// 3. Cancelar Inscrição
// ==========================================
export async function cancelarInscricaoRequest(cursoId: number): Promise<void> {
  try {
    await api.delete(`/cursos/${cursoId}`);
  } catch (error) {
    console.error("Erro ao cancelar inscrição:", error);
    throw error;
  }
}
// ==========================================
// 4. Listar Cursos que o Usuário está Inscrito
// ==========================================
export async function getCursosInscritosRequest(usuarioId: number): Promise<Curso[]> {
  try {
    const response = await api.get<ListarCursosResponse>(`/${usuarioId}`);
    return response.data.cursos;
  } catch (error) {
    console.error("Erro ao buscar cursos do usuário:", error);
    throw error;
  }
}