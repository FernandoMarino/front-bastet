import { Curso } from '@/app/types/Curso';
import Image from 'next/image';
import Link from 'next/link';


export default function CursoCard({ curso }: { curso: Curso }) {
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
            Inscritos: {curso.total_inscritos ?? 0}
          </span>
          <span className='text-xs py-1 px-2 bg-slate-200 rounded-2xl'>
            Inicia em {new Date(curso.data_inicio).toLocaleDateString('pt-BR')}
          </span>
        </div>

        <Link
          href={`/curso/${curso.id}`}
          className='mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full'
        >
          Ver Detalhes
        </Link>
      </div>
    </div>
  );
}
