import createUserBodySchema from '@/app/schemas/createUserBodySchema';
import api from './api';
import { CreateUserFormData } from '@/app/types/CreateUserFormData';

import axios from 'axios';
import { CreateUserResponse } from '../types/User';

export async function createUserRequest(validatedFormData: CreateUserFormData) {
    console.log('userServices.ts - Create User Request - Start');

    try {
        const response = await api.post<CreateUserResponse>('/usuarios', validatedFormData);

        console.log('userServices.ts - Create User Request - End');

        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(error.response?.data?.message ?? 'Erro ao criar usuário');
        }

        // Lança o erro para que o frontend possa capturá-lo e exibir uma mensagem de erro apropriada
        throw error;
    }
}
