'use client'

import { Label } from '~/components/ui/label'

import { MyChart } from './my-chart'
import { ImportFilter } from './import-filter'
import { ImportData } from './chart-data'
import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'
import { fetchCSVImports } from '~/lib/fake-data'

export default function GraphPage() {
  const [includedImports, setIncludedImports] = useState<string[]>([])
  const [chartData, setChartData] = useState<ImportData[]>([])
  const [loading, setLoading] = useState(true)

  function toggleSelect(id: string) {
    setIncludedImports((prev) =>
      includedImports.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    )
  }

  async function fetchChartData() {
    setLoading(true)

    const importList = (await fetchCSVImports()).map((item) => item.id)
    const chartData: ImportData[] = await fetch(
      `http://localhost:8000/app/graph-data/?client_id=007f0a12-3b15-4fe6-ab3f-e09ddb7386aa&import_ids=${importList.join(
        ','
      )}`
    ).then((res) => res.json())

    setChartData(chartData)
    setLoading(false)
  }

  useEffect(() => {
    fetchChartData()
  }, [])

  const importList =
    chartData.length > 0 &&
    Object.keys(chartData[0]).filter((key) => key !== 'month')

  return (
    <div className='space-y-7'>
      <header className='space-y-5'>
        <h2 className='text-xl font-semibold'>Gráfico de Importações</h2>
        <div className='flex items-center gap-2'>
          {loading && (
            <p className='flex gap-2 items-center text-lg'>
              <Loader2 className='animate-spin' size='1em' />
              <span>Carregando imports...</span>
            </p>
          )}
          {!loading && (
            <>
              <Label className='text-md'>Importações</Label>
              <ImportFilter
                importList={importList || []}
                includedImports={includedImports}
                toggleSelect={toggleSelect}
              />
            </>
          )}
        </div>
      </header>

      <div>
        <MyChart
          includedImports={includedImports}
          chartData={chartData}
          importList={importList || []}
        />
      </div>
    </div>
  )
}
