'use client'

import { CloudUpload } from 'lucide-react'
import { ChangeEvent, useState } from 'react'
import Papa from 'papaparse'

import { Card } from '~/components/import-card'
import { ImportTable } from '~/components/import-table'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { fetchCSVImports } from '~/lib/fake-data'

import { CSVLine } from '~/types'

export default function Home() {
  const [csvImportData, setCsvImportData] = useState<CSVLine[] | undefined>()
  const [showImportTableModal, setShowImportTableModal] = useState(false)

  const imports = fetchCSVImports()

  function csvFileChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return

    const csvFile = e.target.files[0]

    Papa.parse<CSVLine>(csvFile, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => setCsvImportData(result.data),
    })
  }

  return (
    <div className='flex flex-col gap-7'>
      <header className='space-y-5'>
        <h2 className='text-xl font-semibold'>Importar arquivo CSV</h2>
        <div className='flex gap-5 justify-between items-center'>
          <div className='flex gap-5'>
            <div>
              <Label>Tipo de importação</Label>
              <Select>
                <SelectTrigger className='min-w-48'>
                  <SelectValue placeholder='Direta ou Indireta' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='direct'>Direto</SelectItem>
                  <SelectItem value='indirect'>Indireto</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor='csv-file-input'>Arquivo CSV</Label>
              <Input
                type='file'
                id='csv-file-input'
                accept='.csv'
                onChange={csvFileChangeHandler}
              />
            </div>
          </div>
          <Button
            onClick={() => setShowImportTableModal(true)}
            disabled={!csvImportData}
            size='lg'
            className='flex gap-3 items-center text-base'
          >
            <CloudUpload size='1.1em' />
            <span>Importar</span>
          </Button>
        </div>
      </header>
      <div className='flex items-center gap-5'>
        <div className='h-1 flex-1 bg-secondary rounded-lg' />
        <Input className='w-44' placeholder='Procurar...' />
      </div>
      <div>
        <div className='flex flex-wrap gap-8'>
          {imports.reverse().map((importData) => (
            <Card key={importData.id} importData={importData} />
          ))}
        </div>
      </div>
      <ImportTable
        data={csvImportData as CSVLine[]}
        show={showImportTableModal && csvImportData != undefined}
        onClose={() => setShowImportTableModal(false)}
      />
    </div>
  )
}
