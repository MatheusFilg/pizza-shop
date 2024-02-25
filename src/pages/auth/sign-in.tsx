import { useMutation } from '@tanstack/react-query'
import { CheckCircle2, XCircle } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { signIn } from '@/api/sign-in'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'

const signInForm = z.object({
  email: z.string().email(),
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
  const [searchParams] = useSearchParams()

  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>({
    // Utilizando o search params para definir o defaultvalue do input
    defaultValues: {
      email: searchParams.get('email') ?? '',
    },
  })

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  })

  async function handleSignIn(data: SignInForm) {
    console.log(data)
    // faz o sistema aguardar 2 segundos
    try {
      await authenticate({ email: data.email })

      toast({
        icon: <CheckCircle2 />,
        title: 'Enviamos um link de autenticação para seu e-mail',
        action: (
          <ToastAction altText="Reenviar" onClick={() => handleSignIn(data)}>
            Reenviar
          </ToastAction>
        ),
      })
    } catch {
      toast({
        icon: <XCircle />,
        title: 'Opa algo de errado aconteceu',
      })
    }
  }

  return (
    <div className="p-8">
      <Helmet title="Login" />
      <Button asChild className="absolute right-8 top-8" variant="outline">
        <Link to="/sign-up">Novo Estabelecimento</Link>
      </Button>

      <div className="flex w-[350px] flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 text-center ">
          <h1 className="text-2xl font-semibold tracking-tight">
            Acessar painel
          </h1>
          <p className="text-sm text-muted-foreground">
            Acompanhe suas vendas pelo painel do parceiro!
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
          <div className="space-y-2">
            <Label htmlFor="email">Seu e-mail</Label>
            <Input id="email" type="email" {...register('email')} />
          </div>
          <Button className="w-full" type="submit" disabled={isSubmitting}>
            Acessar Painel
          </Button>
        </form>
      </div>
    </div>
  )
}
