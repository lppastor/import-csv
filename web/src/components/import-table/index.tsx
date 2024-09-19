import { X } from 'lucide-react'

import { CsvData } from '~/types'

import { DataTable } from './data-table'
import { columns } from './columns'

import { Button } from '../ui/button'

type Props = {
  onClose: () => void
  data: CsvData[] | undefined
  importTitle: string
  show?: boolean
}

export function ImportTable({
  data,
  onClose,
  importTitle,
  show = true,
}: Props) {
  if (!data || !show) {
    return null
  }

  return (
    <div className='fixed bg-black/30 inset-0 flex items-center justify-center'>
      <div className='w-[85vw] bg-background rounded-lg h-full min-h-[60vh] max-h-[90dvh]'>
        <header className='flex items-center justify-between p-2'>
          <h2 className='font-bold text-secondary-foreground/50'>
            Dados do arquivo CSV - Import {importTitle}
          </h2>
          <Button
            onClick={onClose}
            variant='ghost'
            className='w-fit h-fit p-1 hover:text-red-700 hover:bg-red-600/20'
          >
            <X />
          </Button>
        </header>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  )
}
