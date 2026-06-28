import { buscarMatricula, cancelarMatricula, inserirMatricula } from "../repository/matriculaRepository.js";
import { findUserById } from "../repository/usersRepository.js";
import { buscarCursoPorIdService } from "./cursosServices.js";

export async function inscreverUsuarioNoCursoService(userId, cursoId) {
    // verificar se o curso existe
    const curso = await buscarCursoPorIdService(cursoId);

    if (!curso) {
        return {
            status: 404,
            message: 'Curso não encontrado',
        };
    }

    // verificar se o usuário existe
    const user = await findUserById(userId);

    if (!user) {
        return {
            status: 404,
            message: 'Usuário não encontrado',
        };
    }

    // verificar se o usuário já está inscrito no curso
    const matriculaExistente = await buscarMatricula(userId, cursoId);

    if (matriculaExistente) {
        return {
            status: 409,
            message: 'Usuário já está inscrito neste curso',
        };
    }

    // Registrar a matrícula do usuário no curso
    try {
        const inscricao = await inserirMatricula(userId, cursoId);

        return {
            status: 200,
            message: 'Inscrição realizada com sucesso',
            inscricao,
        };
    } catch (error) {
        return {
            status: 500,
            message: 'Erro ao inscrever usuário no curso',
        };
    }
}

export async function cancelarInscricaoService(userId, cursoId) {
    
    // verificar se o curso existe
    const curso = await buscarCursoPorIdService(cursoId);

    if (!curso) {
        return {
            status: 404,
            message: 'Curso não encontrado',
        };
    }

    // verificar se o usuário existe
    const user = await findUserById(userId);

    if (!user) {
        return {
            status: 404,
            message: 'Usuário não encontrado',
        };
    }

    // verificar se o usuário está inscrito no curso
    const matriculaExistente = await buscarMatricula(userId, cursoId);

    if (!matriculaExistente) {
        return {
            status: 404,
            message: 'Usuário não está inscrito neste curso',
        };
    }


    if (matriculaExistente.status_id === 2) {
        return {
            status: 409,
            message: 'A matrícula já está cancelada',
        };
    }

    // Cancelar a matrícula do usuário no curso
    try {
        const resultado = await cancelarMatricula(matriculaExistente.id);

        return {
            status: 200,
            message: 'Inscrição cancelada com sucesso',
            resultado,
        };
    } catch (error) {
        return {
            status: 500,
            message: 'Erro ao cancelar inscrição do usuário no curso',
        };
    }


}
