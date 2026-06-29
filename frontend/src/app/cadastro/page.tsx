'use client';

import api from '@/app/api/api';
import Link from 'next/link';
import { CreateUserFormData } from '../types/CreateUserFormData';
import { createUserAction } from '../actions/createUserFormActions';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { validateCreateUserFormData } from '../schemas/createUserBodySchema';
import { createUserRequest } from '../api/usersRequests';
import FormInput from '@/components/Form/FormInput';
import axios from 'axios';

export default function CreateUserPage() {
    const router = useRouter();
    // Estado para armazenar o erro geral do formulário
    const [error, setError] = useState<string | null>(null);

    // Estado para armazenar os erros de validação dos campos do formulário
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Função para lidar com o envio do formulário
    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // Limpa o erro anterior antes de enviar o formulário
        setError(null);

        // Cria um objeto FormData a partir do formulário enviado
        const formData = new FormData(e.currentTarget);

        // Cria o payload com os dados do formulário
        const payload: CreateUserFormData = {
            nome: formData.get('nome') as string,
            email: formData.get('email') as string,
            nome_usuario: formData.get('nome_usuario') as string,
            data_nascimento: formData.get('data_nascimento') as string,
            senha: formData.get('senha') as string,
        };

        // Valida os dados do formulário antes de enviar a requisição
        const validatedData = validateCreateUserFormData(payload);

        // Se a validação falhar, atualiza o estado de erros e exibe uma mensagem de erro geral
        if (!validatedData.success) {
            const fieldErrors: Record<string, string> = {};

            validatedData.error.issues.forEach((issue) => {
                const fieldName = issue.path[0] as string;
                fieldErrors[fieldName] = issue.message;
            });
            setErrors(fieldErrors);
            setError('Por favor, corrija os erros no formulário.');
            return;
        }

        try {
            // Se a validação for bem-sucedida, envia a requisição para criar o usuário
            await createUserRequest(validatedData.data);

            // Redireciona para a página de login após o cadastro bem-sucedido
            router.push('/login');
        } catch (error) {
            // Se ocorrer um erro durante a requisição, exibe uma mensagem de erro apropriada
            if (axios.isAxiosError(error)) {
                const message =
                    error.response?.data?.message ?? 'Ocorreu um erro. Tente novamente mais tarde.';
                console.error('Erro ao criar usuário:', error);

                // Atualiza o estado de erro com a mensagem apropriada
                setError(message);
            }
            // Se o erro não for do tipo AxiosError, exibe uma mensagem de erro genérica
            else {
                console.error('Erro ao criar usuário:', error);
                setError('Ocorreu um erro. Tente novamente mais tarde.');
            }
        }
    }

    return (
        <main>
            <form onSubmit={handleSubmit} className='flex flex-col  gap-2'>
                <h2 className='page-title'>Cadastro</h2>
                <p>
                    Eu já tenho cadastro, quero <Link href='/login'>fazer login.</Link>
                </p>
                <div className='max-w-96 flex flex-col gap-4'>
                    <FormInput label='Nome' name='nome' error={errors.nome} />
                    <FormInput
                        label='Nome de Usuário'
                        name='nome_usuario'
                        error={errors.nome_usuario}
                    />
                    <FormInput
                        label='Data de Nascimento'
                        name='data_nascimento'
                        type='date'
                        error={errors.data_nascimento}
                    />
                    <FormInput label='E-mail' name='email' type='email' error={errors.email} />
                    <FormInput label='Senha' name='senha' type='password' error={errors.senha} />
                </div>

                <div className='flex justify-start'>
                    <button
                        type='submit'
                        className='bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 my-6 rounded-lg'
                    >
                        Cadastrar
                    </button>
                </div>
                <div className='flex justify-start'>
                    {error && <p className='text-red-500 mt-2'>{error}</p>}
                </div>
            </form>
        </main>
    );
}
