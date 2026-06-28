import { getCursos } from '@/app/api/cursosServies';
import CursoCard from './CursoCard';
import { Curso } from '@/app/types/Curso';

const cursos = await getCursos();

export default function CursosGrid() {
  return (
    <div>
      <h2 className='font-5xl text-indigo-800 hover:text-indigo-900'>Cursos</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {cursos.map((curso) => (
          <CursoCard key={curso.id} curso={curso} />
        ))}
      </div>
    </div>
  );
}
