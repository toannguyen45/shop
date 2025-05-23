'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { LoginBody, LoginBodyType } from '@/schemaValidations/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
// import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
// import { handleErrorApi } from '@/lib/utils'
// import { useAppContext } from '@/components/app-provider'
// import { useLoginMutation } from '@/queries/useAuth'

export default function LoginForm() {
//   const loginMutation = useLoginMutation()
//   const { setIsAuth } = useAppContext()
//   const { toast } = useToast()
  const router = useRouter()
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: '',
      password: ''
    }
  })
  async function onSubmit(values: LoginBodyType) {
    if (loginMutation.isPending) return
    try {
      const result = await loginMutation.mutateAsync(values)
    //   toast({
    //     description: result.payload.message
    //   })
    //   router.push('/manage/dashboard')
      router.refresh()
    //   setIsAuth(true)
    } catch (error: any) {
    //   handleErrorApi({
    //     error,
    //     setError: form.setError
    //   })
    }
  }
  return (
    <Card className='mx-auto w-xl'>
      <CardHeader>
        <CardTitle className='text-2xl'>Đăng nhập</CardTitle>
        <CardDescription>Nhập email và mật khẩu của bạn để đăng nhập vào hệ thống</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-2 max-w-[600px] flex-shrink-0 w-full'
            noValidate
          >
            <div className='grid gap-4'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <div className='grid gap-2'>
                      <Label htmlFor='email'>Email</Label>
                      <Input id='email' type='email' placeholder='m@example.com' required {...field} />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <div className='grid gap-2'>
                      <div className='flex items-center'>
                        <Label htmlFor='password'>Password</Label>
                        {/* <Link href='#' className='ml-auto inline-block text-sm underline'>
                          Quên mật khẩu?
                        </Link> */}
                      </div>
                      <Input id='password' type='password' required {...field} />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <Button type='submit' className='w-full'>
                Đăng nhập
              </Button>
              <Button variant='outline' className='w-full' type='button'>
                Đăng nhập bằng Google
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
