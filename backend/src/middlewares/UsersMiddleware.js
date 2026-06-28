

import { createUserValidator } from '../schemas/createUserSchema.js';

export function validateCreateUserPayload(req, res, next) {
    console.log('Inicio validaçao payload');

    // 1. receber payload do body da requisição
    const { nome, nome_usuario, data_nascimento, email, senha } = req.body;

    const payload = {
        nome,
        nome_usuario,
        data_nascimento,
        email,
        senha,
    };

    // 2. validar os campos obrigatórios utilizando ajv
    const validatedPayload = createUserValidator(payload);

    // 3. se tiver erros, retornar status 400 com os erros
    if (!validatedPayload) {
        return res.status(400).json({
            message: 'Payload inválido',
            errors: createUserValidator.errors,
        });
    }

    // 4. se estiver tudo certo, chamar o next() para passar para o próximo middleware ou controller
    console.log('Payload validado com sucesso');

    next();
}
