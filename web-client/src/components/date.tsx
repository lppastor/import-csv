import React from 'react'
import { parseISO, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface Props {
  dateString: string
  dateFormat?: string
}

export const Date: React.FC<Props> = ({
  dateString,
  dateFormat = 'dd/MM/yyyy',
}) => {
  const date = parseISO(dateString)

  return (
    <time dateTime={dateString}>
      {format(date, dateFormat, { locale: ptBR })}
    </time>
  )
}
