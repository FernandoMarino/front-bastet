import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import ajvErrors from 'ajv-errors';

const ajv = new Ajv({ allErrors: true });

addFormats(ajv);
ajvErrors(ajv);

export const createUserSchema = {
    type: 'object',
    required: ['nome', 'email', 'nome_usuario', 'data_nascimento', 'senha'],
    additionalProperties: false,
    properties: {
        nome: {
            type: 'string',
            minLength: 3,
            errorMessage: {
                type: 'O nome deve ter pelo menos 3 caracteres',
                minLength: 'O nome deve ter pelo menos 3 caracteres',
            },
        },
        email: { type: 'string', format: 'email', errorMessage: 'Digite um email válido' },
        nome_usuario: {
            type: 'string',
            minLength: 2,
            errorMessage: 'O nome de usuário deve ter pelo menos 2 caracteres',
        },
        data_nascimento: { type: 'string', format: 'date' },
        senha: {
            type: 'string',
            minLength: 6,
            errorMessage: { minLength: 'O campo senha deve ter pelo menos 6 caracteres' },
        },
    },
};

export const createUserValidator = ajv.compile(createUserSchema);

export function validatePayload(payload) {
    return createUserValidator(payload);
}
