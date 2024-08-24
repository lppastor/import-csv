export function SideMenu() {
  return (
    <div className='relative'>
      <div className='h-dvh px-5 py-3 w-fit sticky top-0 bg-secondary-foreground text-secondary space-y-10'>
        <header className='text-center'>
          <h1>SISTEMA</h1>
        </header>
        <nav className='flex flex-col'>
          <a href='#'>Importar arquivo CSV</a>
          <a href='#'>Gráfico de importações</a>
        </nav>
      </div>
    </div>
  )
}
