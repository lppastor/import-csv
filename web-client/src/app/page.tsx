'use client'

import { CloudUpload } from 'lucide-react'

import { Card } from '~/components/import-card'
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
import { notImplementedMessage } from '~/lib/not-implemented-message'

export default function Home() {
  const imports = fetchCSVImports()

  return (
    <div className='space-y-7'>
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
              <Input type='file' id='csv-file-input' />
            </div>
          </div>
          <Button
            onClick={notImplementedMessage}
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
        <div className='grid grid-cols-3 gap-8'>
          {imports.reverse().map((importData) => (
            <Card key={importData.id} importData={importData} />
          ))}
        </div>
      </div>
    </div>
  )
}
