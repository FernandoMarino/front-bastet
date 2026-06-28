export default function CursoPage({ params }: { params: { id: string } }) {
  return (
    <main>
      <h2 className="page-title">Curso {params.id}</h2>
      <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-8'>
        
      </div>
    </main>
  );
}