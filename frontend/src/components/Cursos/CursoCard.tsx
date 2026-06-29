import AuthContext from '@/app/context/AuthContext';
import {
    cancelarInscricaoService,
    realizarInscricaoService,
} from '@/app/services/inscricaoServices';
import { Curso } from '@/app/types/Curso';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

type CursoCardProps = {
    curso: Curso;
};

export default function CursoCard({ curso }: CursoCardProps) {
    // Contexto de autenticação para verificar se o usuário está logado
    const { isAuthenticated } = useContext(AuthContext);

    // Router do Next.js para navegação programática
    const router = useRouter();

    // Estados para controlar a inscrição
    const [isSubmitting, setIsSubmitting] = useState(false); // Estado para controlar se a requisição de inscrição está em andamento
    const [isInscrito, setIsInscrito] = useState(false); // Estado para controlar se o usuário já está inscrito
    const [isInscricaoCancelada, setIsInscricaoCancelada] = useState(curso.inscricao_cancelada); // Estado para controlar se a inscrição já foi cancelada

    const [inscritos, setInscritos] = useState(curso.inscricoes); // Estado para controlar o número de inscritos no curso

    // Efeito para atualizar o estado de inscrição com base na autenticação e no status do curso
    useEffect(() => {
        if (!isAuthenticated) {
            setIsInscrito(false);
        } else {
            setIsInscrito(curso.inscrito);
        }
    }, [curso.inscrito, isAuthenticated]);

    useEffect(() => {
        setInscritos(curso.inscricoes);
    }, [curso.inscricoes]);

    // Função para lidar com a inscrição no curso
    const handleInscricao = async () => {
        const cursoId = curso.id;

        if (!isAuthenticated) {
            router.push('/login');
            return;
        }

        try {
            await realizarInscricaoService(cursoId);
            setIsInscrito(true); // Atualiza o estado para indicar que o usuário está inscrito

            setInscritos((prev) => prev + 1); // Incrementa o número de inscritos
            toast.success('Inscrição realizada com sucesso!'); // Exibe uma mensagem de sucesso
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const message =
                    error.response?.data?.message ?? 'Ocorreu um erro. Tente novamente mais tarde.';
                console.error('Erro ao realizar inscrição:', error);
                toast.error(message);
            }
        }
    };

    const handleCancelarInscricao = async () => {
        const cursoId = curso.id;
        setIsSubmitting(true);

        try {
            await cancelarInscricaoService(cursoId);

            // Atualiza os estados para refletir que a inscrição foi cancelada
            setIsInscrito(false);
            setIsInscricaoCancelada(true); // Atualiza o estado para indicar que a inscrição foi cancelada
            setInscritos((prev) => prev - 1); // Decrementa o número de inscritos

            toast.success('Inscrição cancelada com sucesso!');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const message =
                    error.response?.data?.message ?? 'Ocorreu um erro. Tente novamente mais tarde.';
                console.error('Erro ao cancelar inscrição:', error);
                toast.error(message);
            } else {
                console.error('Erro ao cancelar inscrição:', error);
                toast.error('Ocorreu um erro. Tente novamente mais tarde.');
            }
        } finally {
            setIsSubmitting(false); // Define isSubmitting como false após a tentativa de cancelamento
        }
    };

    return (
        <div className='bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col'>
            <div className='relative w-full h-48'>
                <Image src={curso.capa} alt={curso.nome} fill className='object-cover' />
            </div>

            <div className='p-4 flex flex-col flex-1'>
                <h2 className='text-xl font-semibold'>{curso.nome}</h2>

                <p className='text-gray-600 mt-3 flex-1 line-clamp-3'>{curso.descricao}</p>

                <div className='flex justify-around items-center flex-wrap gap-2 mt-4'>
                    <span className='text-xs py-1 px-2 bg-slate-200 rounded-2xl'>
                        Inscritos: {inscritos ?? 0}
                    </span>
                    <span className='text-xs py-1 px-2 bg-slate-200 rounded-2xl'>
                        Inicia em {new Date(curso.data_inicio).toLocaleDateString('pt-BR')}
                    </span>
                </div>

                {!isAuthenticated ? (
                    <button
                        onClick={() => router.push('/login')}
                        className='mt-4 bg-gray-100 text-gray-700 px-4 py-2.5 rounded-xl hover:bg-gray-200 transition-colors w-full font-semibold text-sm'
                    >
                        Faça login para inscrever-se
                    </button>
                ) : isInscricaoCancelada ? (
                    <button
                        disabled
                        className='mt-4 bg-gray-100 text-gray-400 border border-gray-200 px-4 py-2.5 rounded-xl w-full font-semibold text-sm cursor-not-allowed'
                    >
                        🚫 Inscrição Cancelada
                    </button>
                ) : isInscrito ? (
                    <button
                        onClick={handleCancelarInscricao}
                        disabled={isSubmitting}
                        className={`mt-4 px-4 py-2.5 rounded-xl w-full font-semibold text-sm transition-all duration-150 flex justify-center items-center border group ${
                            isSubmitting
                                ? 'bg-gray-100 text-gray-500 border-gray-200 cursor-not-allowed'
                                : 'bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200'
                        }`}
                    >
                        {isSubmitting ? (
                            'Processando...'
                        ) : (
                            <>
                                {/* Mostra essa tag quando o mouse NÃO está em cima */}
                                <span className='block group-hover:hidden'>Inscrito</span>

                                {/* Mostra essa tag quando o mouse ESTÁ em cima */}
                                <span className='hidden group-hover:block'>Cancelar Inscrição</span>
                            </>
                        )}
                    </button>
                ) : (
                    <button
                        onClick={handleInscricao}
                        disabled={isSubmitting || isInscricaoCancelada}
                        className='mt-4 bg-indigo-600 text-white px-4 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors w-full font-semibold text-sm disabled:opacity-70 flex justify-center items-center'
                    >
                        {isSubmitting ? 'Processando...' : 'Realizar Inscrição'}
                    </button>
                )}
            </div>
        </div>
    );
}
