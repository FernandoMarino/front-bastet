import { Curso, CursoStatus, Matricula, MatriculaStatus } from '../models/index.js';

export async function buscarCursoPorId(id) {
    const curso = await Curso.findByPk(id);

    return curso;
}

export async function inserirCurso(cursoData) {
    const novoCurso = await Curso.create(cursoData);

    return novoCurso;
}

export async function removerCurso(cursoId) {
    return await Curso.destroy({ where: { id: cursoId } });
}

export async function buscarCursosAtivos(id) {
    return await Curso.findAll({
        include: [
            {
                // associar o status do curso
                model: CursoStatus,
                as: 'curso_status',
                attributes: ['status'],
                where: {
                    status: 'ativo', // Buscar apenas cursos com status "ativo"
                },
            },
            {
                // buscar quantidade de inscritos no curso
                model: Matricula,
                as: 'inscritos',
                attributes: ['id', 'aluno_id'],
                required: false, // Permitir cursos sem inscrições
            },
        ],
    });
}

export async function buscarCursosInscritos(userId) {
    return await Curso.findAll({
        include: [
            {
                model: Matricula,
                as: 'inscritos',
                attributes: ['id', 'aluno_id'],
                where: {
                    aluno_id: userId, // Filtra apenas as matrículas do usuário
                },
                required: true, // Garante que apenas cursos com inscrições do usuário sejam retornados,
                include: [
                    {
                        model: MatriculaStatus,
                        as: 'matricula_status',
                        attributes: ['status'],
                    },
                ],
            },
            {
                model: CursoStatus,
                as: 'curso_status',
                attributes: ['status'],
            },
            
        ],
    });
}
