import { Dot, Eye, Trash2 } from 'lucide-react'

import { moneyFormat } from '~/lib/utils'

import {
  Card as CardContainer,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'
import { Date } from './date'
import { Button } from './ui/button'
import { notImplementedMessage } from '~/lib/not-implemented-message'
import { CsvImportMetadata } from '~/types'

export function Card({ importData }: { importData: CsvImportMetadata }) {
  const {
    import_name,
    import_type,
    created_at,
    balance_sum,
    deposit_sum,
    equity_sum,
  } = importData

  const typeString: string = import_type === 'direct' ? 'Direta' : 'Indireta'

  return (
    <CardContainer className='shadow-lg'>
      <CardHeader>
        <CardTitle>
          Importação {import_name.toString().padStart(3, '0')}
        </CardTitle>
        <CardDescription className='flex items-center gap-px'>
          <span>{typeString}</span>
          <Dot />
          <Date dateString={created_at} />
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-5'>
        <div>
          <div className='flex justify-between items-center'>
            <span>Balanço total</span>
            <span className='flex-1 mx-2 border-b border-dotted border-gray-500' />
            <span className='font-bold'>{moneyFormat(balance_sum)}</span>
          </div>
          <div className='flex justify-between items-center'>
            <span>Total de depósitos</span>
            <span className='flex-1 mx-2 border-b border-dotted border-gray-500' />
            <span className='font-bold'>{moneyFormat(deposit_sum)}</span>
          </div>
          <div className='flex justify-between items-center'>
            <span>Equity total</span>
            <span className='flex-1 mx-2 border-b border-dotted border-gray-500' />
            <span className='font-bold'>{moneyFormat(equity_sum)}</span>
          </div>
        </div>
        <div className='flex items-center justify-end gap-3'>
          <Button
            onClick={notImplementedMessage}
            variant='ghost'
            size='sm'
            className='flex gap-1 items-center hover:text-destructive hover:bg-destructive/10'
          >
            <Trash2 size='1.2em' />
            <span>Deletar</span>
          </Button>

          <Button
            onClick={notImplementedMessage}
            size='sm'
            variant='secondary'
            className='flex gap-1 items-center'
          >
            <Eye size='1.2em' />
            <span>Visualizar</span>
          </Button>
        </div>
      </CardContent>
    </CardContainer>
  )
}
