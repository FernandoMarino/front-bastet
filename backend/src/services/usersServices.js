import { sequelize } from '../models/index.js';
import bcrypt from 'bcrypt';
import { findUserByEmail, findUserByEmailOrNomeUsuario, findUserByNomeUsuario, insertUser } from '../repository/usersRepository.js';
import Ajv from 'ajv';

import { createUserValidator } from '../schemas/createUserSchema.js';

export const createUserService = async (payload) => {
    console.log('Inicio do createUserService');

    const transaction = await sequelize.transaction();
    try {
        // 1. receber payload do controller
        const { nome, nome_usuario, data_nascimento, email, senha } = payload;

        // 2. validar o payload utilizando o schema de validação
        const validatedPayload = createUserValidator(payload);

        if (!validatedPayload) {
            const errors = (createUserValidator.errors ?? []).map((e) => ({
                field: e.instancePath.replace('/', ''),
                keyword: e.keyword,
                message: e.message,
            }));

            return {
                message: 'Payload inválido',
                status: 400,
                errors,
            };
        }

        // 3. verificar se o usuário já existe no banco de dados utilizando o repositório
        const existingUserByNomeUsuario = await findUserByNomeUsuario(nome_usuario);

        if (existingUserByNomeUsuario) {
            return {
                message: 'Nome de Usuário já existe',
                status: 409,
            };
        }
        const existingUserByEmail = await findUserByEmail(email);

        if (existingUserByEmail) {
            return {
                message: 'Email já existe',
                status: 409,
            };
        }

        // 4. normalizar o email e criptografar a senha antes de salvar no banco de dados
        const normalizedEmail = email.trim().toLowerCase();
        const hashedPassword = await bcrypt.hash(senha, 10);

        // 5. Preparar o payload para inserção no banco de dados
        const newUserPayload = {
            nome,
            nome_usuario,
            data_nascimento,
            email: normalizedEmail,
            senha: hashedPassword,
        };

        // 6. inserir o usuário no banco de dados utilizando o repositório
        const createdUser = await insertUser(transaction, newUserPayload);

        const createdUserWithoutPassword = {
            ...createdUser,
            senha: undefined, // Remover a senha do objeto retornado
        };

        // 7. Commit da transação
        await transaction.commit();

        // 8. retornar status 201 com a mensagem de sucesso e o usuário criado (sem a senha)
        console.log('Usuário criado com sucesso (Services)');
        return {
            message: 'Usuário criado com sucesso',
            status: 201,
            data: createdUserWithoutPassword,
        };
    } catch (error) {
        await transaction.rollback();
        console.error('Erro ao criar usuário:', error);
        throw error;
    }
};

export async function findUserByEmailOrNomeUsuarioService(identifier) {

    const isEmail = identifier.includes('@');

    const user = isEmail
        ? await findUserByEmail(identifier)
        : await findUserByNomeUsuario(identifier);

    return user;
}
