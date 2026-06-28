import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { findUserByEmailOrNomeUsuarioService } from '../services/usersServices.js';
import { buscarCursosFiltradosPorUsuarioService } from '../services/cursosServices.js';

export class AuthenticationController {
    // funcao para login de usuario, recebe o identificador (email ou nome de usuario) e a senha,
    // verifica se o usuario existe e se a senha esta correta, retorna um token JWT
    static async login(req, res) {
        try {
            // Recebe o identificador (email ou nome de usuario) e a senha do corpo da requisicao
            const { identifier, password } = req.body;

            // Verifica se o identificador e a senha foram fornecidos
            if (!identifier || !password) {
                return res.status(400).json({
                    message: 'Identificador e senha são obrigatórios',
                });
            }

            // Se o identificador for um email, busca o usuario pelo email, caso contrario busca pelo nome de usuario
            const user = await findUserByEmailOrNomeUsuarioService(identifier);

            // Se o usuario nao for encontrado, retorna um erro 404
            if (!user) {
                return res.status(404).json('Credenciais Inválidas');
            }

            // Verifica se a senha fornecida corresponde à senha armazenada no banco de dados
            const verifiedPassword = await bcrypt.compare(password, user.senha);

            // Se a senha nao for verificada, retorna um erro 404
            if (!verifiedPassword) {
                return res.status(404).json('Credenciais Inválidas');
            }

            // Se a senha for verificada, gera um token JWT com o id do usuario e uma chave secreta, com validade de 1 hora
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
                sameSite: 'strict',
                maxAge: 60 * 60 * 1000, // 1 hour
            });

            res.status(200).json({
                message: 'Logout bem sucedido',
                user: {
                    id: user.id,
                    nome_usuario: user.nome_usuario,
                    email: user.email,
                },
            });
        } catch (err) {
            return err;
        }
    }

    static async logout(req, res) {
        try {
            const token = req.cookies?.token;

            if (!token) {
                return res.status(403).json({
                    message: 'Acesso negado. Usuário não autenticado',
                });
            }

            res.clearCookie('token', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
                sameSite: 'strict',
            });

            jwt.res.status(200).json({
                message: 'Logout bem sucedido',
            });
        } catch (err) {
            console.log('Logout error:', err);

            res.status(500).json({
                message: 'Server Error',
            });
        }
    }

    static async me(req, res) {
        const userIdRota = req.params.userId;
        const userIdToken = req.user?.id;

        if (userIdRota !== userIdToken) {
            return res.status(403).json({
                message: 'Acesso negado. Usuário não autenticado',
            });
        }

        const cursos = await buscarCursosFiltradosPorUsuarioService(userId);

        res.status(200).json({
            message: 'Cursos listados com sucesso',
            cursos,
        });
    }
}
