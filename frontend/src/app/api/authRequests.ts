import axios from "axios";
import api from "./api";

// ==========================================
// 1. Fazer Login
// ==========================================
export async function loginRequest(credentials: {identifier: string, password: string}) {
    try {
        const response = await api.post('/login', credentials);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(error.response?.data?.message ?? 'Erro ao fazer login');
        }
        throw error;
    }
}

// ==========================================
// 2. Fazer Logout
// ==========================================
export async function logoutRequest() {
    try {
        const response = await api.post('/logout');
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(error.response?.data?.message ?? 'Erro ao fazer logout');
        }
        throw error;
    }
}

// ==========================================
// 3. Buscar informações do usuário logado
// ==========================================
export async function meRequest() {
    try {
        const response = await api.get('/me');
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(error.response?.data?.message ?? 'Erro ao buscar informações do usuário');
        }
        throw error;
    }
}