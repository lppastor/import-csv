import { z } from 'zod'

const apiUrlSchema = z.string()

const parsedApiUrl = apiUrlSchema.safeParse(process.env.NEXT_PUBLIC_API_URL)
const parsedApiPort = apiUrlSchema.safeParse(process.env.NEXT_PUBLIC_API_PORT)

if (!parsedApiUrl.success) {
  console.error(
    'Configuração de variáveis de ambiente inválida: ',
    parsedApiUrl.error.format()
  )
  throw new Error('Configuração de variáveis de ambiente inválida')
}

if (!parsedApiPort.success) {
  console.error(
    'Configuração de variáveis de ambiente inválida: ',
    parsedApiPort.error.format()
  )
  throw new Error('Configuração de variáveis de ambiente inválida')
}

export const env = {
  API_URL: `${parsedApiUrl.data}:${parsedApiPort.data}`,
}
