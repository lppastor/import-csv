'use client'

import { ColumnDef } from '@tanstack/react-table'
import { CsvData } from '~/types'

export const columns: ColumnDef<CsvData>[] = [
  {
    accessorKey: 'date_time',
    header: 'Data',
    cell: (row) => new Date(row.cell.getValue() as string).toLocaleDateString(),
  },
  {
    accessorKey: 'balance',
    header: 'Balanço',
  },
  {
    accessorKey: 'deposit',
    header: 'Depósito',
  },
  {
    accessorKey: 'equity',
    header: 'Equidade',
  },
]
