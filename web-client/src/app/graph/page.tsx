'use client'

import { Label } from '~/components/ui/label'

import { MyChart } from './my-chart'
import { ImportFilter } from './import-filter'
import { chartData } from './chart-data'
import { useState } from 'react'

export default function GraphPage() {
  const [includedImports, setIncludedImports] = useState<string[]>([
    'import-01',
    'import-03',
  ])

  function toggleSelect(id: string) {
    setIncludedImports((prev) =>
      includedImports.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    )
  }

  const importList = Object.keys(chartData[0]).filter((key) => key !== 'month')

  return (
    <div className='space-y-7'>
      <header className='space-y-5'>
        <h2 className='text-xl font-semibold'>Gráfico de Importações</h2>
        <div className='flex items-center gap-2'>
          <Label className='text-md'>Importações</Label>
          <ImportFilter
            importList={importList}
            includedImports={includedImports}
            toggleSelect={toggleSelect}
          />
        </div>
      </header>

      <div>
        <MyChart includedImports={includedImports} />
      </div>
    </div>
  )
}
