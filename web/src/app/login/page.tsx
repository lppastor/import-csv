'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'

import { useAuth } from '~/context/auth-context'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const router = useRouter()

  const { login } = useAuth()

  const loginFormSchema = z.object({
    email: z
      .string({
        required_error: 'O campo email não pode estar vazio.',
      })
      .email('Campo email inválido.')
      .min(1, 'Campo email não pode estar vazio.'),
    password: z
      .string({ required_error: 'O campo senha não pode estar vazio.' })
      .min(1, 'O campo senha não pode estar vazio.'),
  })

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
  })

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    setIsLoading(true)

    await login(values.email, values.password)
    router.push('/')

    setIsLoading(false)
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <Card className='w-[350px]'>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl'>Login</CardTitle>
          <CardDescription>
            Adicione sua credenciais para entrar no sistema
          </CardDescription>
        </CardHeader>
        <CardContent className='grid gap-4'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        id='email'
                        type='email'
                        placeholder='email@exemplo.com'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input id='password' type='password' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className='w-full' type='submit' disabled={isLoading}>
                {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                Entrar
              </Button>
            </form>
          </Form>

          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <span className='w-full border-t' />
            </div>
            <div className='relative flex justify-center text-xs uppercase'>
              <span className='bg-background px-2 text-muted-foreground'>
                Ou continue com
              </span>
            </div>
          </div>
          <Button
            type='button'
            className='bg-[rgba(219,68,55,0.85)] hover:bg-[rgba(219,68,55,1)] text-white'
            disabled={isLoading}
          >
            Google
          </Button>
        </CardContent>
        <CardFooter className='flex flex-col space-y-4'>
          <div className='text-sm text-center text-gray-500'>
            Não tem uma conta?{' '}
            <Link href='/register' className='text-primary hover:underline'>
              Registre-se aqui
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
