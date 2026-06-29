
import axios from 'axios';

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptors para lidar com erros de autenticação
api.interceptors.response.use(
    // Passa a resposta diretamente se for bem-sucedida
    (response) => response,

    // Lida com erros de resposta
    (error) => {
        // Verifica se o erro é de autenticação (401 Unauthorized)
        if (error.response && error.response.status === 403) {
            const url = error.config?.url;
            if (url !== '/me') {
                console.error(
                    'Erro de autenticação: Acesso negado. Redirecionando para a página de login...',
                );
                if (typeof window !== 'undefined') {
                    // Redireciona para a página de login
                    window.location.href = '/login';
                }
            }
        }
        return Promise.reject(error);
    },
);

export default api;
