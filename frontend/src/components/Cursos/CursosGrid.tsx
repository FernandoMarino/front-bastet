'use client';

import { getCursos } from '@/app/api/cursosRequests';
import CursoCard from './CursoCard';
import { Curso } from '@/app/types/Curso';
import { useEffect, useState } from 'react';

export default function CursosGrid() {
    const [cursos, setCursos] = useState<Curso[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchCursos() {
            try {
                // Chamada da função getCursos para buscar os cursos do backend
                const cursosData = await getCursos();

                // Atualiza o estado com os cursos retornados
                setCursos(cursosData);
            } catch (error) {
                console.error('Erro ao buscar cursos:', error);
            } finally {
                setLoading(false); // Define loading como false após a tentativa de carregamento
            }
            // Executa a função fetchCursos quando o componente é montado
        }
        fetchCursos();
    }, []);

    if (loading) {
        return <p>Carregando cursos...</p>;
    }

    return (
        <div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {cursos.map((curso) => (
                    <CursoCard key={curso.id} curso={curso} />
                ))}
            </div>
        </div>
    );
}
