export type CSVLine = {
  '<BALANCE>': string // "1000.00"
  '<DATE>': string // "2022.07.01 00:00"
  '<DEPOSIT LOAD>': string // "0.0000",
  '<EQUITY>': string // "10000.00",
}

export type CsvImportMetadata = {
  import_name: number
  import_type: 'direct' | 'indirect'
  created_at: string // 2024-09-17 04:38:51
  balance_sum: number
  equity_sum: number
  deposit_sum: number
}
