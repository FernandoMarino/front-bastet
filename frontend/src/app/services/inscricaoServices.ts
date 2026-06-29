import { cancelarInscricaoRequest, realizarInscricaoRequest } from "../api/cursosRequests";

export async function realizarInscricaoService(cursoId: number): Promise<void> {
    try {
        await realizarInscricaoRequest(cursoId);

    } catch (error) {
        console.error("Erro ao realizar inscrição:", error);
        throw error; 
    }

}

export async function cancelarInscricaoService(cursoId: number): Promise<void> {
    try {
        await cancelarInscricaoRequest(cursoId);
    } catch (error) {
        console.error("Erro ao cancelar inscrição:", error);
        throw error;
    }
}