import { where } from 'sequelize';
import { findUserById } from '../repository/usersRepository.js';
import {
    buscarCursoPorId,
    buscarCursosAtivos,
    buscarCursosInscritos,
} from '../repository/cursosRepository.js';

export async function buscarCursosService(userId) {
    console.log('User ID recebido no serviço: ', userId);
    const cursos = await buscarCursosAtivos(userId);

    return cursos.map((curso) => ({
        id: curso.id,
        nome: curso.nome,
        descricao: curso.descricao,
        capa: curso.capa,
        data_inicio: curso.data_inicio,
        status_curso: curso.curso_status?.status,
        inscricoes: curso.inscritos.length,
        // Verifica se o usuário está inscrito no curso, caso o userId seja fornecido
        inscrito: userId
            ? curso.inscritos.some((inscricao) => inscricao.aluno_id === userId)
            : false,
        matricula_status: curso.inscritos?.matricula_status?.status, // Status da matrícula do usuário no curso
    }));
}

export async function buscarCursoPorIdService(id) {
    const curso = await buscarCursoPorId(id);

    return curso;
}

export async function buscarCursosFiltradosPorUsuarioService(userId) {
    // Verifica se o usuário existe
    const user = await findUserById(userId);

    if (!user) {
        throw new Error('Usuário não encontrado');
    }

    // Busca os cursos nos quais o usuário está inscrito
    const cursos = await buscarCursosInscritos(userId);

    return cursos.map((curso) => {
        // Pega a matrícula do aluno que veio no include
        const matriculaDoAluno = curso.inscritos[0];
        return {
            id: curso.id,
            nome: curso.nome,
            descricao: curso.descricao,
            capa: curso.capa,
            data_inicio: curso.data_inicio,
            matricula_status: matriculaDoAluno?.matricula_status?.status,
            inscricao_cancelada: matriculaDoAluno?.matricula_status?.status === 'cancelada', // ou matriculaDoAluno?.matricula_status?.status === 'cancelada'
            inscrito: true,
        };
    });
}
