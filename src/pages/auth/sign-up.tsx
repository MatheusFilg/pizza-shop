import { useMutation } from '@tanstack/react-query'
import { CheckCircle2, XCircle } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { registerRestaurant } from '@/api/register-restaurant'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'

const signUpForm = z.object({
  restaurantName: z.string(),
  managerName: z.string(),
  phone: z.string(),
  email: z.string().email(),
})

type SignUpForm = z.infer<typeof signUpForm>

export function SignUp() {
  const { toast } = useToast()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpForm>()

  const { mutateAsync: registerRestaurantFn } = useMutation({
    mutationFn: registerRestaurant,
  })

  async function handleSignUp(data: SignUpForm) {
    console.log(data)
    try {
      await registerRestaurantFn({
        restaurantName: data.restaurantName,
        managerName: data.managerName,
        email: data.email,
        phone: data.phone,
      })

      toast({
        icon: <CheckCircle2 />,
        title: 'Retaurante cadastrado com sucesso',
        action: (
          <ToastAction
            altText="Login"
            onClick={() => navigate(`/sign-in?email=${data.email}`)}
          >
            Login
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
    <div className="p-8 ">
      <Helmet title="Cadastro" />
      <Button asChild className="absolute right-8 top-8" variant="outline">
        <Link to="/sign-in">Fazer Login</Link>
      </Button>
      <div className="flex w-[350px] flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 text-center ">
          <h1 className="text-2xl font-semibold tracking-tight">
            Criar conta grátis
          </h1>
          <p className="text-sm text-muted-foreground">
            Seja um parceiro e comece suas vendas!
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
          <div className="space-y-2">
            <Label htmlFor="restaurantName">Nome do estabelecimento</Label>
            <Input
              id="restaurantName"
              type="text"
              {...register('restaurantName')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="managerName">Seu nome</Label>
            <Input id="managerName" type="text" {...register('managerName')} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Seu e-mail</Label>
            <Input id="email" type="email" {...register('email')} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Seu celular</Label>
            <Input id="phone" type="tel" {...register('phone')} />
          </div>

          <Button className="w-full" type="submit" disabled={isSubmitting}>
            Finalizar Cadastro
          </Button>
          <p className="p-6 text-center text-sm leading-relaxed text-muted-foreground">
            Ao continuar, você concorda com nossos{' '}
            <a href="" className="underline underline-offset-4">
              termos de serviço
            </a>{' '}
            e{' '}
            <a href="" className="underline underline-offset-4">
              políticas de privacidade.
            </a>
            .
          </p>
        </form>
      </div>
    </div>
  )
}
