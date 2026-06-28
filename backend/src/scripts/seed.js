// import  from '../config/database.js';
import { sequelize, Role, Curso, CursoStatus, MatriculaStatus } from '../models/index.js';

async function insertRoles() {
  try {

    console.log('Inserindo carga padrão (Roles)...');

    await Role.bulkCreate(
      [
        { id: 1, role_name: 'admin' },
        { id: 2, role_name: 'professor' },
        { id: 3, role_name: 'aluno' },
        { id: 4, role_name: 'user' },
        { id: 5, role_name: 'desativado' },
      ],
      { ignoreDuplicates: true },
    );
  } catch (err) {
    console.error('Erro ao inserir roles:', err);
  } 
}

async function insertCursos() {
  try {
    
    console.log('Inserindo carga padrão (Cursos)...');
    

    
    await Curso.bulkCreate([
        {
          nome: 'Desenvolvimento Web com React e Next.js', 
          status_id: 2,
          descricao: 'Aprenda a criar websites modernos e interativos com as tecnologias mais populares do mercado.',
          capa: 'https://img-c.udemycdn.com/course/240x135/4160208_71be_5.jpg',
          data_inicio: new Date(2026, 5, 20),
        },
        {
          nome: 'Introdução à Inteligência Artificial',
          descricao: 'Descubra os fundamentos da Inteligência Artificial e suas aplicações no mundo real.',
          capa: 'https://s3.amazonaws.com/coursera_assets/meta_images/generated/XDP/XDP~SPECIALIZATION!~bases-de-inteligencia-artificial-para-todos/XDP~SPECIALIZATION!~bases-de-inteligencia-artificial-para-todos.jpeg',
          data_inicio: new Date(2026, 6, 15),
        },
        {
          nome: 'Fotografia para Iniciantes',
          descricao: 'Aprenda os princípios básicos da fotografia e tire fotos incríveis com seu celular ou câmera.',
          capa: 'https://img-c.udemycdn.com/course/240x135/1680762_24a3_4.jpg',
          data_inicio: new Date(2026, 7, 10),
        },
        {
          nome: 'Inglês Instrumental para o Mercado de Trabalho',
          descricao: 'Aprimore suas habilidades de comunicação em inglês e prepare-se para os desafios do mercado profissional.',
          capa: 'https://img-c.udemycdn.com/course/240x135/2927102_7440_13.jpg',
          data_inicio: new Date(2026, 8, 5),
        },
        {
          nome: 'Finanças Pessoais para Iniciantes',
          descricao: 'Aprenda a gerenciar seu dinheiro de forma inteligente e alcançar seus objetivos financeiros.',
          capa: 'https://img-c.udemycdn.com/course/750x422/1021106_fa99_6.jpg',
          data_inicio: new Date(2026, 9, 1),
        },
        {
          nome: 'Culinária Vegetariana',
          descricao: 'Descubra o mundo da culinária vegetariana com receitas deliciosas e nutritivas.',
          capa: 'https://img-c.udemycdn.com/course/750x422/2846294_d765_5.jpg',
          data_inicio: new Date(2026, 9, 20),
        },
        {
          nome: 'Yoga para Iniciantes',
          descricao: 'Aprenda os princípios básicos da yoga e melhore sua flexibilidade, força e bem-estar.',
          capa: 'https://img-c.udemycdn.com/course/240x135/1222344_23a3_2.jpg',
          data_inicio: new Date(2026, 10, 15),
        },
        {
          nome: 'Produtividade Pessoal',
          descricao: 'Aprenda técnicas para gerenciar seu tempo, organizar suas tarefas e aumentar sua produtividade.',
          capa: 'https://img-c.udemycdn.com/course/750x422/1692770_85c5_4.jpg',
          data_inicio: new Date(2026, 11, 5),
        },
      ], { ignoreDuplicates: true });
} catch (err) {
    console.error('Erro ao inserir cursos:', err);
  } 
}

async function insertCursoStatus() {
  try {

    console.log('Inserindo carga padrão (CursoStatus)...');


    await CursoStatus.bulkCreate(
      [
        { status: 'ativo' },
        { status: 'cancelado' },
        { status: 'finalizado' },         
      ],
      { ignoreDuplicates: true },
    );
  } catch (err) {
    console.error('Erro ao inserir status de curso:', err);
  }
}

async function insertMatriculaStatus() {
  try {

    console.log('Inserindo carga padrão (MatriculaStatus)...');


    await MatriculaStatus.bulkCreate(
      [
        { status: 'ativa' },
        { status: 'cancelada' },
        { status: 'concluida' },
        { status: 'lista_espera' },
        { status: 'trancada' },
      ],
      { ignoreDuplicates: true },
    );
  } catch (err) {
    console.error('Erro ao inserir status de matrícula:', err);
  }
}

export default async function seed() {
  try {

    console.log('Iniciando carga inicial de dados...');
    await insertRoles();
    await insertCursoStatus();
    await insertMatriculaStatus();
    await insertCursos();
    console.log('Carga inicial de dados realizada com sucesso...');

  } catch (err) {
    console.error('Erro ao inserir dados:', err);
    throw err; 
  } 
    
}


