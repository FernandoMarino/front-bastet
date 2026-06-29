'use client';

import Link from 'next/link';
import { FormEvent, useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import FormInput from '@/components/Form/FormInput';

export default function LoginPage() {
    const { login } = useContext(AuthContext);
    const router = useRouter();

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const formData = new FormData(e.currentTarget);

        const identifier = formData.get('identifier') as string;
        const password = formData.get('senha') as string;

        if (!identifier || !password) {
            setError('Por favor, preencha todos os campos.');
            setLoading(false);
            return;
        }

        try {
            await login({ identifier, password });
            router.push('/'); // Redireciona para a página inicial após o login bem-sucedido
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const message =
                    error.response?.data?.message ?? 'Ocorreu um erro. Tente novamente mais tarde.';
                setError(message);
            } else {
                console.error('Erro ao fazer login:', error);
                setError('Ocorreu um erro. Tente novamente mais tarde.');
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className='min-h-[calc(100vh-5rem)] bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100'>
                {/* Cabeçalho */}
                <div className='text-center'>
                    <h2 className='mt-2 text-3xl font-bold tracking-tight text-gray-900'>
                        Acesse sua conta
                    </h2>
                    <p className='mt-2 text-sm text-gray-600'>
                        Ainda não tem conta?{' '}
                        <Link
                            href='/cadastro'
                            className='font-medium text-indigo-600 hover:text-indigo-500 transition-colors'
                        >
                            Faça seu cadastro
                        </Link>
                    </p>
                </div>
                {/* Formulário */}
                <form onSubmit={handleSubmit} className='mt-8 space-y-6'>
                    {/* Alerta de erro */}
                    {error && (
                        <div className='bg-red-50 border-l-4 border-red-500 p-4 rounded-md'>
                            <p className='text-sm text-red-700'>{error}</p>
                        </div>
                    )}
                    {/* Inputs usando o componente FormInput que você criou */}
                    <div className='space-y-5'>
                        <FormInput
                            label='E-mail ou Nome de Usuário'
                            name='identifier'
                            placeholder='seu@email.com ou seu.usuario'
                        />
                        <FormInput
                            label='Senha'
                            name='senha'
                            type='password'
                            placeholder='••••••••'
                        />
                    </div>
                    <button
                        type='submit'
                        disabled={loading}
                        className='w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                        {loading ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>
            </div>
        </main>
    );
}
