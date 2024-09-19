'use client'

import { CloudUpload, Loader2 } from 'lucide-react'
import { ChangeEvent, useEffect, useState } from 'react'
import { toast } from 'sonner'
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

import { CSVLine, CsvImportMetadata } from '~/types'
import { api } from '~/lib/api'

type ImportType = 'direct' | 'indirect'

export default function Home() {
  const [csvImportData, setCsvImportData] = useState<CSVLine[] | undefined>()
  const [importTypes, setImportTypes] = useState<ImportType | undefined>(
    undefined
  )
  const [importNumber, setImportNumber] = useState<number>()

  const [searchQuery, setSearchQuery] = useState('')

  const [loading, setLoading] = useState(false)

  const [imports, setImports] = useState<CsvImportMetadata[]>([])
  const [loadingImports, setLoadingImports] = useState(true)

  async function fetchImports() {
    setLoadingImports(true)
    const imports = await api
      .get<CsvImportMetadata[]>('/user-imports/')
      .then((response) => response.data)
    setImports(imports)
    setLoadingImports(false)
  }

  function getTokens(csvImport: CsvImportMetadata): string {
    let tokens = []
    tokens.push(
      `Importação ${csvImport.import_name.toString().padStart(3, '0')}`
    )
    tokens.push(csvImport.import_type === 'direct' ? 'Direta' : 'Indireta')
    tokens.push(csvImport.created_at)
    tokens.push(csvImport.balance_sum.toString())
    tokens.push(csvImport.deposit_sum.toString())
    tokens.push(csvImport.equity_sum.toString())

    return tokens.join(' ').toLocaleLowerCase()
  }

  function filterImports(imports: CsvImportMetadata[]): CsvImportMetadata[] {
    if (searchQuery === '') return imports

    return imports.filter((importData) =>
      getTokens(importData).includes(searchQuery.toLocaleLowerCase())
    )
  }

  function csvFileChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return

    const csvFile = e.target.files[0]

    Papa.parse<CSVLine>(csvFile, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => setCsvImportData(result.data),
    })
  }

  function remadeCsvLine(csvLine: CSVLine) {
    return {
      balance: csvLine['<BALANCE>'],
      date: new Date(csvLine['<DATE>'].split(' ')[0]).toISOString(),
      deposit: csvLine['<DEPOSIT LOAD>'],
      equity: csvLine['<EQUITY>'],
    }
  }

  async function handleImportCsv() {
    setLoading(true)

    if (!csvImportData || !importTypes || !importNumber) {
      toast.error('Preencha todos os campos')
      setLoading(false)
      return
    }

    const importPayload = {
      import_name: importNumber,
      import_type: importTypes === 'direct' ? 1 : 2,
      data: csvImportData.map(remadeCsvLine),
    }

    await api
      .post('/import-data/', importPayload)
      .then((response) => {
        response.status === 201 && toast.success('Importado com sucesso')
      })
      .catch((error) => {
        console.error(error)
        toast.error('Erro ao importar arquivo')
      })

    setLoading(false)

    fetchImports()
  }

  async function handleDeleteImport(importName: number) {
    await api
      .get(`/delete/import/`, { params: { import_name: importName } })
      .then((response) => {
        response.status === 204 &&
          toast.success('Importação deletada com sucesso')
      })
      .catch((error) => {
        console.error(error)
        toast.error('Erro ao deletar importação')
      })

    fetchImports()
  }

  useEffect(() => {
    fetchImports()
  }, [])

  return (
    <div className='flex flex-col gap-7'>
      <header className='space-y-5'>
        <h2 className='text-xl font-semibold'>Importar arquivo CSV</h2>
        <div className='flex gap-5 justify-between items-center'>
          <div className='flex gap-5'>
            <div>
              <Label htmlFor='csv-id'>Import ID</Label>
              <Input
                type='number'
                id='csv-id'
                value={importNumber}
                onChange={(e) => setImportNumber(Number(e.target.value))}
                className='w-24'
              />
            </div>
            <div>
              <Label>Tipo de importação</Label>
              <Select
                // defaultValue={importTypes}
                value={importTypes}
                onValueChange={(type) => setImportTypes(type as ImportType)}
              >
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
            onClick={handleImportCsv}
            disabled={
              !csvImportData || !importTypes || !importNumber || loading
            }
            size='lg'
            className='flex gap-3 items-center text-base'
          >
            {loading ? (
              <Loader2 size='1.1em' className='animate-spin' />
            ) : (
              <CloudUpload size='1.1em' />
            )}
            <span>Importar</span>
          </Button>
        </div>
      </header>
      <div className='flex items-center gap-5'>
        <div className='h-1 flex-1 bg-secondary rounded-lg' />
        <Input
          className='w-44'
          placeholder='Procurar...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div>
        {loadingImports && (
          <div className='w-full h-full flex justify-center items-center p-20 gap-2'>
            <Loader2 size='1em' className='animate-spin' />
            <span>Carregando imports...</span>
          </div>
        )}

        {imports.length === 0 && !loadingImports && (
          <div className='w-full h-full flex justify-center items-center p-20'>
            <span>Nenhum import para mostrar...</span>
          </div>
        )}

        {imports.length > 0 && !loadingImports && (
          <div className='grid grid-cols-1 justify-center md:justify-start md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8'>
            {filterImports(imports)
              .sort((a, b) => b.import_name - a.import_name)
              .map((importData) => (
                <Card
                  key={importData.import_name}
                  handleDelete={handleDeleteImport}
                  csvImportMetadata={importData}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  )
}
