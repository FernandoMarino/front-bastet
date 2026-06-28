import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3333/api',
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
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized access - redirecting to login');
    }
    return Promise.reject(error);
  }, 
);

export default api;
