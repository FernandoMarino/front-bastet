import { createUserService } from '../services/usersServices.js';

// Controller para criar um usuário

export async function createUserController(req, res) {
    try {
        // 1. receber payload do body da requisição
        const { nome, nome_usuario, data_nascimento, email, senha } = req.body;

        const payload = {
            nome,
            nome_usuario,
            data_nascimento,
            email,
            senha,
        };

        // 4. se o usuário não existir, criar o usuário utilizando o serviço de criação
        const createUserResponse = await createUserService(payload);

        if (createUserResponse.status === 400) {
            return res.status(400).json({
                success: false,
                message: createUserResponse.message,
            });
        }

        if (createUserResponse.status === 409) {
            return res.status(409).json({
                success: false,
                message: createUserResponse.message,
            });
        }

        // 5. retornar status 201 com a mensagem de sucesso e o usuário criado

        console.log('Usuário criado com sucesso (Controller)');

        res.status(201).json({
            success: true,
            message: 'Usuário criado com sucesso',
            data: createUserResponse.data,
        });
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor',
        });
    }
}
