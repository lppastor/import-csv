import { Date } from '~/components/date'
import { fetchCSVData, fetchCSVImports } from '~/lib/fake-data'
import { MyChart } from './my-chart'

export default function GraphPage() {
  const imports = fetchCSVImports().map((importData) => ({
    ...importData,
    csvData: fetchCSVData(importData.id),
  }))

  return (
    <div className='space-y-7'>
      <header className='space-y-5'>
        <h2 className='text-xl font-semibold'>Gráfico de Importações</h2>
      </header>

      <div>
        <MyChart />
      </div>
    </div>
  )
}
