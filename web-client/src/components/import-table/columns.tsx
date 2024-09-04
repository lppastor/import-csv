'use client'

import { ColumnDef } from '@tanstack/react-table'
import { CSVLine } from '~/types'

export const columns: ColumnDef<CSVLine>[] = [
  {
    accessorKey: '<DATE>',
    header: 'Data',
  },
  {
    accessorKey: '<BALANCE>',
    header: 'Balanço',
  },
  {
    accessorKey: '<DEPOSIT LOAD>',
    header: 'Depósito',
  },
  {
    accessorKey: '<EQUITY>',
    header: 'Equidade',
  },
]
