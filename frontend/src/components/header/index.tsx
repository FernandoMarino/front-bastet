'use client';
import AuthContext from '@/app/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
export default function Header() {
    const { isAuthenticated, user, logout } = useContext(AuthContext);
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        } finally {
            // Redireciona para a página inicial após o logout
            router.push('/');
        }
    }

    return (
        <header className='sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 border-b border-gray-200 shadow-sm'>
            <div className='layout-guide h-20 mx-auto flex items-center justify-between px-6 lg:px-8 max-w-7xl'>
                {/* Logo */}
                <div className='flex flex-col'>
                    <Link
                        href='/'
                        className='text-3xl font-extrabold text-indigo-700 tracking-tight hover:text-indigo-900 transition-colors'
                    >
                        Bastet
                    </Link>
                    <span className='text-xs text-gray-500 font-medium tracking-wide'>
                        Plataforma de Cursos
                    </span>
                </div>

                {/* Navegação */}
                <nav className='flex items-center gap-6 text-sm font-medium'>
                    {isAuthenticated ? (
                        <>
                            <Link
                                className='text-gray-600 hover:text-indigo-600 transition-colors'
                                href={`/${user?.id}`}
                            >
                                Meus cursos
                            </Link>
                            <div className='h-6 w-px bg-gray-300'></div>
                            <span className='text-gray-800'>
                                Olá, <span className='font-bold text-indigo-700'>{user?.nome_usuario}</span>
                                
                            </span>
                            <button
                                onClick={logout}
                                className='px-4 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-full transition-colors'
                            >
                                Sair
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                className='text-gray-600 hover:text-indigo-600 transition-colors'
                                href='/login'
                            >
                                Entrar
                            </Link>
                            <Link
                                className='px-5 py-2.5 text-white bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg rounded-full transition-all'
                                href='/cadastro'
                            >
                                Cadastrar-se
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}
