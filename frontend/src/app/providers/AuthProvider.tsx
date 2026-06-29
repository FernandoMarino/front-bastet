'use client';

import { User } from '@/app/types/User';
import { useEffect, useState } from 'react';
import { loginRequest, logoutRequest, meRequest } from '../api/authRequests';
import AuthContext from '../context/AuthContext';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function loadUser() {
            try {
                const data = await meRequest();
                setUser(data.user); // Atualiza o estado do usuário com os dados retornados
                setIsAuthenticated(!!data.user); // Atualiza o estado de autenticação com base na presença do usuário
            } catch (error) {
                console.error('Erro ao buscar informações do usuário:', error);
                setUser(null); // Se houver erro, define o usuário como null
                setIsAuthenticated(false); // Define o estado de autenticação como falso 
            } finally {
                setLoading(false); // Define loading como false após a tentativa de carregamento
            }
        }
        loadUser();
    }, []);

    async function logout() {
        try {
            await logoutRequest(); // Chamada para o endpoint de logout
            setUser(null); // Limpa o estado do usuário após logout
            setIsAuthenticated(false); // Define o estado de autenticação como falso após logout
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    }

    async function login(credentials: { identifier: string; password: string }) {
        const data = await loginRequest(credentials);

        setUser(data.user); // Atualiza o estado do usuário com os dados retornados
        setIsAuthenticated(!!data.user); // Atualiza o estado de autenticação com base na presença do usuário
    }

    if (loading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-slate-50">
                <span className="text-indigo-600 font-semibold animate-pulse">
                    Autenticando...
                </span>
            </div>
        );
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                isAuthenticated,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
