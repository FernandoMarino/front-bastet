import {
    buscarCursosService,
    buscarCursoPorIdService,
    buscarCursosFiltradosPorUsuarioService,
} from '../services/cursosServices.js';

export async function listarCursos(req, res) {
    console.log(req.user);

    const userId = req.user?.id; // Obtém o usuário autenticado do middleware

    if (!userId) {
        console.log('Usuário não está autenticado');
    }

    const cursos = await buscarCursosService(userId);

    res.status(200).json({
        message: 'Cursos listados com sucesso',
        cursos,
    });
}

export async function buscarCursoPorIdController(req, res) {
    const { id } = req.params;
    const curso = await buscarCursoPorIdService(id);

    if (!curso) {
        return res.status(404).json({
            message: 'Curso não encontrado',
        });
    }

    res.status(200).json({
        message: 'Curso encontrado com sucesso',
        curso,
    });
}

export async function buscarCursosPorUsuariosController(req, res) {
    const userIdRota = req.params.idUsuario;
    const userIdToken = req.user?.id; // Obtém o usuário autenticado do middleware

    // Verifica se o usuário autenticado é o mesmo que está tentando acessar os cursos
    // Convertendo ambos para string para evitar problemas de tipo
    if (String(userIdRota) !== String(userIdToken)) {
        return res.status(403).json({
            message: 'Acesso negado. Usuário não autorizado',
        });
    }

    try {
        const cursos = await buscarCursosFiltradosPorUsuarioService(userIdToken);
        res.status(200).json(cursos);

    } catch (error) {
        console.error('Erro ao buscar cursos por usuário:', error);
        res.status(500).json({
            message: 'Erro interno do servidor',
        });
    }

}
