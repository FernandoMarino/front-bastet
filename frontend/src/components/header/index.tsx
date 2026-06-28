import Link from "next/link";

export default function Header() {
  return (
    <header className='layout-guide h-[16rem] flex flex-col justify-end'>
      <h1 className='text-5xl font-bold py-5'>
        <Link href='/' className='text-indigo-800 hover:text-indigo-900'>
          Bastet
        </Link>
      </h1>
      <p>Uma nova plataforma de cursos</p>
      <menu className='flex flex-row gap-4'>
        <Link className='text-indigo-600' href='/cadastro'>
          Fazer cadastro
        </Link>
        <Link className='text-indigo-600' href='/login'>
          Fazer login
        </Link>
        <Link className='text-indigo-600' href='/usuario/will'>
          Meus cursos
        </Link>
      </menu>
    </header>
  );
}
