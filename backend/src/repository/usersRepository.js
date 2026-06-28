import { User } from '../models/index.js';
import { Op } from 'sequelize';

const { or } = Op;

export async function insertUser(transaction, payload) {
    console.log('Inicio do insertUser');

    const newUser = await User.create(payload, { transaction });

    return newUser;
}

export async function findUserByEmail(email) {
    const user = await User.findOne({
        where: {
            email: email,
        },
    });

    return user;
}
export async function findUserByNomeUsuario(nome_usuario) {
    const user = await User.findOne({
        where: {
            nome_usuario: nome_usuario,
        },
    });

    return user;
}

export async function findUserById(id) {
    return await User.findByPk(id);
}

export async function findUserByEmailOrNomeUsuario(email, nome_usuario) {
    const user = await User.findOne({
        where: {
            [or]: [{ email: email }, { nome_usuario: nome_usuario }],
        },
    });

    // 3. retornar true se o usuário existir ou false se não existir
    return user ? user : null;
}
