import { env } from '~/env'

interface CSVData {
  csv_import_id: number // serial
  transation_date: string // ISO8601
  balance: number // Example 13:44
  equity: number
  deposit: number
}

const FAKE_CSV_DATA: CSVData[] = [
  {
    csv_import_id: 1,
    transation_date: '2021-01-16T12:00:00Z',
    balance: 100.0,
    equity: 116.0,
    deposit: 104.0,
  },
  {
    csv_import_id: 1,
    transation_date: '2021-01-17T12:00:00Z',
    balance: 200.0,
    equity: 216.0,
    deposit: 204.0,
  },
  {
    csv_import_id: 1,
    transation_date: '2021-01-18T12:00:00Z',
    balance: 300.0,
    equity: 316.0,
    deposit: 304.0,
  },
  {
    csv_import_id: 2,
    transation_date: '2021-01-19T12:00:00Z',
    balance: 400.0,
    equity: 416.0,
    deposit: 404.0,
  },
  {
    csv_import_id: 2,
    transation_date: '2021-01-20T12:00:00Z',
    balance: 500.0,
    equity: 516.0,
    deposit: 504.0,
  },
  {
    csv_import_id: 3,
    transation_date: '2021-01-21T12:00:00Z',
    balance: 600.0,
    equity: 616.0,
    deposit: 604.0,
  },
  {
    csv_import_id: 3,
    transation_date: '2021-01-22T12:00:00Z',
    balance: 700.0,
    equity: 716.0,
    deposit: 704.0,
  },
  {
    csv_import_id: 4,
    transation_date: '2021-01-23T12:00:00Z',
    balance: 800.0,
    equity: 816.0,
    deposit: 804.0,
  },
  {
    csv_import_id: 4,
    transation_date: '2021-01-24T12:00:00Z',
    balance: 900.0,
    equity: 916.0,
    deposit: 904.0,
  },
]

export interface CSVImportReturn {
  id: number
  import_type: 'direct' | 'indirect'
  created_at: string
  balance_sum: number
  equity_sum: number
  deposit_sum: number
}

type CsvResponse = {
  csv_id: number
  import_type: string
  created_at: string
  balance_sum: number
  equity_sum: number
  deposit_sum: number
}

export async function fetchCSVImports(): Promise<CSVImportReturn[]> {
  const data: CsvResponse[] = await fetch(
    `${env.API_URL}/app/user-imports/007f0a12-3b15-4fe6-ab3f-e09ddb7386aa/`
  ).then((res) => res.json())

  return data.map((csvImport) => ({
    id: csvImport.csv_id,
    import_type: csvImport.import_type === 'direct' ? 'direct' : 'indirect',
    created_at: csvImport.created_at,
    balance_sum: csvImport.balance_sum,
    equity_sum: csvImport.equity_sum,
    deposit_sum: csvImport.deposit_sum,
  }))
}

export function fetchCSVData(import_id: number): CSVData[] {
  return FAKE_CSV_DATA.filter((csvData) => csvData.csv_import_id === import_id)
}
