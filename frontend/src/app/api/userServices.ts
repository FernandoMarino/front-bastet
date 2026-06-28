import createUserBodySchema from '@/app/schemas/createUserBodySchema';
import api from './api';
import { CreateUserFormData } from '@/app/types/CreateUserFormData';

import axios from 'axios';
import { CreateUserResponse } from '../types/User';

export function validateCreateUserFormData(FormData: CreateUserFormData) {
    // Validação dos dados do formulário usando o schema Zod
    const validatedFormData = createUserBodySchema.safeParse(FormData);

    console.log('validatedFormData:', validatedFormData.success);
    return validatedFormData;
}

export async function createUserRequest(validatedFormData: CreateUserFormData) {
    console.log('userServices.ts - Create User Request - Start');

    try {
        const response = await api.post<CreateUserResponse>('/users', validatedFormData);

        console.log('userServices.ts - Create User Request - End');

        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(error.response?.data?.message ?? 'Erro ao criar usuário');
        }
    }
}
