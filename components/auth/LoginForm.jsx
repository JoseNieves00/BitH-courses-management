'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Logo } from '@/components/ui/logo'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { Eye, EyeOff, Loader2, Music, LogIn } from 'lucide-react'
import { toast } from 'sonner'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email || !password) {
      toast.error('Por favor completa todos los campos')
      return
    }

    setLoading(true)

    try {
      const result = await signIn(email, password)
      
      if (result.success) {
        toast.success('Bienvenido a BitH')
        
        if (result.requiresPasswordChange) {
          router.push('/cambiar-password')
        } else {
          router.push('/dashboard')
        }
      }
    } catch (error) {
      console.error('Error de autenticacion:', error)
      
      if (error.code === 'auth/user-not-found') {
        toast.error('Usuario no encontrado')
      } else if (error.code === 'auth/wrong-password') {
        toast.error('Contrasena incorrecta')
      } else if (error.code === 'auth/invalid-email') {
        toast.error('Correo electronico invalido')
      } else if (error.code === 'auth/too-many-requests') {
        toast.error('Demasiados intentos. Intenta mas tarde')
      } else {
        toast.error('Error al iniciar sesion. Verifica tus credenciales')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/80" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
        </div>
        
        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12 text-white">
          <div className="mb-8 animate-fade-in">
            <div className="w-32 h-32 bg-white rounded-2xl flex items-center justify-center shadow-2xl">
              <Music className="w-16 h-16 text-primary" />
            </div>
          </div>
          
          <h1 className="text-5xl font-bold mb-4 text-center animate-fade-in">BitH</h1>
          <p className="text-xl font-medium tracking-widest uppercase mb-8 animate-fade-in">
            Talento a tu Hogar
          </p>
          
          <div className="max-w-md text-center space-y-4 animate-fade-in">
            <p className="text-lg text-white/90">
              Sistema de gestion para clases de musica e instrumentos
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              {['Piano', 'Guitarra', 'Bateria', 'Violin', 'Bajo', 'Vocal', 'Acordeon'].map((instrument, i) => (
                <span
                  key={instrument}
                  className="px-3 py-1 bg-white/20 rounded-full text-sm backdrop-blur-sm animate-fade-in"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  {instrument}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex flex-col min-h-screen lg:min-h-0">
        {/* Mobile Header */}
        <div className="lg:hidden bg-primary p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <Music className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold">BitH</h1>
                <p className="text-xs tracking-wider uppercase text-white/80">Talento a tu Hogar</p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>

        {/* Form Container */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-background">
          <div className="w-full max-w-md">
            {/* Desktop Theme Toggle */}
            <div className="hidden lg:flex justify-end mb-6">
              <ThemeToggle />
            </div>

            <Card className="border-0 shadow-xl lg:border lg:shadow-2xl">
              <CardHeader className="space-y-1 text-center pb-2">
                <div className="hidden lg:block mb-4">
                  <Logo size="lg" className="justify-center" />
                </div>
                <CardTitle className="text-2xl font-bold">Iniciar Sesion</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Ingresa tus credenciales para acceder al sistema
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo Electronico</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@correo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                      className="h-11 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Contrasena</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Tu contrasena"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                        className="h-11 pr-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-11 bg-primary hover:bg-primary/90 text-white font-medium transition-all duration-200 hover:shadow-lg hover:shadow-primary/25"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Ingresando...
                      </>
                    ) : (
                      <>
                        <LogIn className="mr-2 h-5 w-5" />
                        Ingresar
                      </>
                    )}
                  </Button>
                </form>

                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-center text-sm text-muted-foreground">
                    Si eres profesor y es tu primer ingreso, usa la contrasena temporal proporcionada por el administrador.
                  </p>
                </div>
              </CardContent>
            </Card>

            <p className="text-center text-xs text-muted-foreground mt-6">
              © {new Date().getFullYear()} BitH - Talento a tu Hogar. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
