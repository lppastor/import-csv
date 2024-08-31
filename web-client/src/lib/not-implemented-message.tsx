import { AlertTriangle } from 'lucide-react'
import { toast } from 'sonner'

export function notImplementedMessage() {
  toast.warning(`Em desenvolvimento`, {
    icon: (
      <AlertTriangle
        size='1em'
        className='text-base text-slate-950 dark:text-slate-100 fill-slate-950/20 dark:fill-slate-100/20'
      />
    ),
    description: `Essa funcionalidade ainda não está completa. Aguarde novidades em breve!`,
  })
}
