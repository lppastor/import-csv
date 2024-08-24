import { CloudUpload, Eye, Trash2 } from 'lucide-react'
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

type ImportData = {
  id: number
  type: 'direct' | 'indirect'
  date: string
  lines: number
}

const Card = ({ importData }: { importData: ImportData }) => {
  const { date, id, lines, type } = importData

  const typeString: string = type === 'direct' ? 'Direta' : 'Indireta'

  return (
    <CardContainer>
      <CardHeader>
        <CardTitle>Importação {id.toString().padStart(3, '0')}</CardTitle>
        {/* <CardDescription>Importação direta</CardDescription> */}
      </CardHeader>
      <CardContent className='space-y-5'>
        <div>
          <div className='flex justify-between items-center'>
            <span>Tipo de importação</span>
            <span className='flex-1 mx-2 border-b border-dotted border-gray-500' />
            <span className='font-bold'>{typeString}</span>
          </div>
          <div className='flex justify-between items-center'>
            <span>Data de importação</span>
            <span className='flex-1 mx-2 border-b border-dotted border-gray-500' />
            <span className='font-bold'>
              <Date dateString={date} />
            </span>
          </div>
          <div className='flex justify-between items-center'>
            <span>Número de linhas</span>
            <span className='flex-1 mx-2 border-b border-dotted border-gray-500' />
            <span className='font-bold'>{lines}</span>
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
  const imports: ImportData[] = [
    { id: 1, type: 'direct', date: '2024-08-22', lines: 258 },
    { id: 2, type: 'indirect', date: '2024-08-23', lines: 116 },
    { id: 3, type: 'direct', date: '2024-08-24', lines: 312 },
    { id: 4, type: 'indirect', date: '2024-08-25', lines: 89 },
    { id: 5, type: 'direct', date: '2024-08-26', lines: 78 },
    { id: 6, type: 'indirect', date: '2024-08-27', lines: 45 },
    { id: 7, type: 'direct', date: '2024-08-28', lines: 99 },
    { id: 8, type: 'indirect', date: '2024-08-29', lines: 123 },
    { id: 9, type: 'direct', date: '2024-08-30', lines: 456 },
    { id: 10, type: 'indirect', date: '2024-08-31', lines: 789 },
    { id: 11, type: 'direct', date: '2024-09-01', lines: 123 },
    { id: 12, type: 'indirect', date: '2024-09-02', lines: 456 },
    { id: 13, type: 'direct', date: '2024-09-03', lines: 789 },
    { id: 14, type: 'indirect', date: '2024-09-04', lines: 123 },
    { id: 15, type: 'direct', date: '2024-09-05', lines: 456 },
    { id: 16, type: 'indirect', date: '2024-09-06', lines: 789 },
    { id: 17, type: 'direct', date: '2024-09-07', lines: 123 },
    { id: 18, type: 'indirect', date: '2024-09-08', lines: 456 },
    { id: 19, type: 'direct', date: '2024-09-09', lines: 789 },
    { id: 20, type: 'indirect', date: '2024-09-10', lines: 123 },
  ]

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
