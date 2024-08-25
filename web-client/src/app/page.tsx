import { CloudUpload, Dot, Eye, Trash2 } from 'lucide-react'
import { Date } from '~/components/date'
import { Button } from '~/components/ui/button'
import {
  Card as CardContainer,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { CSVImportReturn, fetchCSVImports } from '~/lib/fake-data'
import { moneyFormat } from '~/lib/utils'

const Card = ({ importData }: { importData: CSVImportReturn }) => {
  const {
    id,
    import_type,
    created_at,
    balance_sum,
    data_lines,
    deposit_sum,
    equity_sum,
  } = importData

  const typeString: string = import_type === 'direct' ? 'Direta' : 'Indireta'

  return (
    <CardContainer className='shadow-lg'>
      <CardHeader>
        <CardTitle>Importação {id.toString().padStart(3, '0')}</CardTitle>
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
          <div className='flex justify-between items-center'>
            <span>Número de linhas</span>
            <span className='flex-1 mx-2 border-b border-dotted border-gray-500' />
            <span className='font-bold'>{data_lines}</span>
          </div>
        </div>
        <div className='flex items-center justify-end gap-3'>
          <Button
            variant='ghost'
            size='sm'
            className='flex gap-1 items-center hover:text-destructive hover:bg-destructive/10'
          >
            <Trash2 size='1.2em' />
            <span>Deletar</span>
          </Button>

          <Button
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

export default function Home() {
  const imports = fetchCSVImports()

  return (
    <div className='space-y-7'>
      <header className='space-y-5'>
        <h2 className='text-xl font-semibold'>Importar arquivo CSV</h2>
        <div className='flex gap-5 justify-between items-center'>
          <div className='flex gap-5'>
            <div>
              <Label htmlFor='import-number-input'>Número da importação</Label>
              <Input type='number' placeholder='042' id='import-number-input' />
            </div>
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
          <Button size='lg' className='flex gap-3 items-center text-base'>
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
