import { inscreverUsuarioNoCursoService, cancelarInscricaoService } from '../services/matriculaServices.js';

export async function inscreverUsuarioNoCursoController(req, res) {
    const userId = req.user.id; // Obtém o ID do usuário autenticado do middleware
    const cursoId = req.params.idCurso;

    try {
        const resposta = await inscreverUsuarioNoCursoService(userId, cursoId);

        if (resposta.status !== 200) {
            return res.status(resposta.status).json({
                message: resposta.message,
            });
        }

        return res.status(200).json({
            message: 'Inscrição realizada com sucesso',
            inscricao: resposta.inscricao,
        });
    } catch (error) {
        console.error('Erro ao inscrever usuário no curso:', error);
        return res.status(500).json({
            message: 'Erro ao inscrever usuário no curso',
        });
    }
}
 
export async function cancelarInscricaoController(req, res) {
    const userId = req.user.id; // Obtém o ID do usuário autenticado do middleware
    const cursoId = req.params.idCurso; // Obtém o ID do curso a partir dos parâmetros da rota

    // Verifica se o ID do curso foi fornecido
    if (!cursoId) {
        return res.status(400).json({
            message: 'ID do curso não fornecido',
        });
    }

    try {
        const resposta = await cancelarInscricaoService(userId, cursoId);

        if (resposta.status !== 200) {
            return res.status(resposta.status).json({
                message: resposta.message,
            });
        }

        return res.status(200).json({
            message: 'Inscrição cancelada com sucesso',
        });
    } catch (error) {
        console.error('Erro ao cancelar inscrição do usuário no curso:', error);
        return res.status(500).json({
            message: 'Erro ao cancelar inscrição do usuário no curso',
        });
    }
}
