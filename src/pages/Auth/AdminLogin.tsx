import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import LoginForm from './login-form'

const AdminLogin = () => {
  return (
    <div className='relative flex h-auto min-h-screen items-center justify-center overflow-x-hidden px-4 py-10 sm:px-6 lg:px-8'>
      <Card className='z-1 w-full border-none  sm:max-w-lg'>
        <CardHeader className='gap-6'>
          <div>
            <CardDescription className='text-center'> Let's go to</CardDescription>
            <CardTitle className='mb-1.5 text-xl text-center'>Jolrong Dashboard</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {/* Login Form */}
          <div className='space-y-4'>
            <LoginForm />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AdminLogin
