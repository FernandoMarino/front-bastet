'use client'

import api from '@/app/api/api'
import Link from 'next/link'
import { CreateUserFormData } from "../types/CreateUserFormData"
import { createUserAction } from '../actions/createUserFormActions';


const initialFormData: CreateUserFormData = {
  nome: '',
  email: '',
  nome_usuario: '',
  data_nascimento: '',
  senha: '',
};


export default function Page() {




  const formData: CreateUserFormData = initialFormData;

  return (
    <main>
      <form action={createUserAction} className='flex flex-col  gap-2'>
        <h2 className='page-title'>Cadastro</h2>
        <p>
          Eu já tenho cadastro, quero <Link href='/login'>fazer login.</Link>
        </p>
        <div className='max-w-96 flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <label htmlFor='nome'>Nome</label>
            <input
              type='text'
              required
              name='nome'
              id='nome'
              className='border h-10 rounded-xl focus:outline-none focus:border-indigo-300 px-4 py-2'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor='nome_usuario'>Nome de Usuário</label>
            <input
              type='text'
              required
              name='nome_usuario'
              id='nome_usuario'
              className='border h-10 rounded-xl focus:outline-none focus:border-indigo-300 px-4 py-2'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor='data_nascimento'>Data de Nascimento</label>
            <input
              type='date'
              required
              name='data_nascimento'
              id='data_nascimento'
              className='border h-10 rounded-xl focus:outline-none focus:border-indigo-300 px-4 py-2'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor='email'>E-mail</label>
            <input
              type='email'
              required
              name='email'
              id='email'
              className='border h-10 rounded-xl focus:outline-none focus:border-indigo-300 px-4 py-2'
            />
          </div>
          <div className='flex flex-col  gap-2'>
            <label htmlFor='senha'>Senha</label>
            <input
              type='password'
              required
              name='senha'
              id='senha'
              className='border h-10 rounded-xl focus:outline-none focus:border-indigo-300 px-4 py-2'
            />
          </div>
        </div>
        <div className='flex justify-start'>
          <button
            type='submit'
            className='bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 my-6 rounded-lg'
          >
            Cadastrar
          </button>
        </div>
      </form>
    </main>
  );
}
