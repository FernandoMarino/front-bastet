import { buscarCursosService, buscarCursoPorIdService, buscarCursosFiltradosPorUsuarioService } from '../services/cursosServices.js';

export async function listarCursos(req, res) {

    console.log(req.user)

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
    const userId = req.user?.id; // Obtém o usuário autenticado do middleware

    if (!userId) {
        return res.status(401).json({
            message: 'Usuário não autenticado',
        });
    }

    const cursos = await buscarCursosFiltradosPorUsuarioService(userId);

    res.status(200).json({
        message: 'Cursos listados com sucesso',
        cursos,
    });
}


