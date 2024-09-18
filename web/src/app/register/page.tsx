'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const loginFormSchema = z.object({
    first_name: z
      .string({ required_error: 'O campo nome não pode estar vazio.' })
      .min(1, 'Campo nome não pode estar vazio.'),
    last_name: z
      .string({ required_error: 'O campo sobrenome não pode estar vazio.' })
      .min(1, 'Campo sobrenome não pode estar vazio.'),
    email: z
      .string({
        required_error: 'O campo email não pode estar vazio.',
      })
      .email('Campo email inválido.')
      .min(1, 'Campo email não pode estar vazio.'),
    password: z
      .string({ required_error: 'O campo senha não pode estar vazio.' })
      .min(8, 'A senha deve ter no mínimo 8 caracteres.'),
  })

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
  })

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <Card className='w-[500px]'>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl'>Registrar</CardTitle>
          <CardDescription>
            Preencha as informações abaixo para criar sua conta.
          </CardDescription>
        </CardHeader>
        <CardContent className='grid gap-4'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
              <div className='flex gap-2'>
                <FormField
                  control={form.control}
                  name='first_name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor='first_name'>Primeiro nome</FormLabel>
                      <FormControl>
                        <Input
                          id='first_name'
                          type='text'
                          placeholder='Nome'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className='text-sm' />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='last_name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor='last_name'>Sobrenome</FormLabel>
                      <FormControl>
                        <Input
                          id='last_name'
                          type='text'
                          placeholder='Sobrenome'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className='text-sm' />
                    </FormItem>
                  )}
                />
              </div>

              <div className='flex gap-2'>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor='email'>Email</FormLabel>
                      <FormControl>
                        <Input
                          id='email'
                          type='email'
                          placeholder='email@exemplo.com'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className='text-sm' />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor='password'>Senha</FormLabel>
                      <FormControl>
                        <Input
                          id='password'
                          type={showPassword ? 'text' : 'password'}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className='text-sm' />
                    </FormItem>
                  )}
                />
              </div>

              <Button className='w-full' type='submit' disabled={isLoading}>
                {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                Registrar
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
            Já possui uma conta?{' '}
            <Link href='/login' className='text-primary hover:underline'>
              Faça login aqui
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
