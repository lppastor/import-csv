import { X } from 'lucide-react'

import { CsvData } from '~/types'

import { DataTable } from './data-table'
import { columns } from './columns'

import { Button } from '../ui/button'

type Props = {
  onClose: () => void
  data: CsvData[] | undefined
  show?: boolean
}

export function ImportTable({ data, onClose, show = true }: Props) {
  if (!data || !show) {
    return null
  }

  return (
    <div className='fixed bg-black/30 inset-0 flex items-center justify-center'>
      <div className='w-[85vw] bg-background rounded-lg relative h-full min-h-[60vh] max-h-[90dvh]'>
        <Button
          onClick={onClose}
          variant='ghost'
          className='absolute top-1 right-1 z-50 w-fit h-fit p-px hover:text-red-700 hover:bg-red-600/20'
        >
          <X />
        </Button>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  )
}
