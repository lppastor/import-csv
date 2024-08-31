interface CSVImport {
  id: number // serial
  import_type: 'direct' | 'indirect'
  created_at: string // ISO8601
}

interface CSVData {
  csv_import_id: number // serial
  transation_date: string // ISO8601
  balance: number // Example 13:44
  equity: number
  deposit: number
}

const FAKE_CSV_IMPORT: CSVImport[] = [
  {
    id: 1,
    import_type: 'direct',
    created_at: '2024-08-22T12:00:00Z',
  },
  {
    id: 2,
    import_type: 'indirect',
    created_at: '2024-08-23T12:00:00Z',
  },
  {
    id: 3,
    import_type: 'direct',
    created_at: '2024-08-24T12:00:00Z',
  },
  {
    id: 4,
    import_type: 'direct',
    created_at: '2024-08-25T12:00:00Z',
  },
]

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
  data_lines: number
  balance_sum: number
  equity_sum: number
  deposit_sum: number
}

export function fetchCSVImports(): CSVImportReturn[] {
  const data: CSVImportReturn[] = FAKE_CSV_IMPORT.map((csvImport) => {
    return {
      ...csvImport,
      data_lines: FAKE_CSV_DATA.filter(
        (csvData) => csvData.csv_import_id === csvImport.id
      ).length,
      balance_sum: FAKE_CSV_DATA.filter(
        (csvData) => csvData.csv_import_id === csvImport.id
      ).reduce((acc, curr) => acc + curr.balance, 0),
      equity_sum: FAKE_CSV_DATA.filter(
        (csvData) => csvData.csv_import_id === csvImport.id
      ).reduce((acc, curr) => acc + curr.equity, 0),
      deposit_sum: FAKE_CSV_DATA.filter(
        (csvData) => csvData.csv_import_id === csvImport.id
      ).reduce((acc, curr) => acc + curr.deposit, 0),
    }
  })

  return data
}

export function fetchCSVData(import_id: number): CSVData[] {
  return FAKE_CSV_DATA.filter((csvData) => csvData.csv_import_id === import_id)
}
