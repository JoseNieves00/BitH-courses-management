'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Logo } from '@/components/ui/logo'
import { Eye, EyeOff, Loader2, ShieldCheck, KeyRound } from 'lucide-react'
import { toast } from 'sonner'

export function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPasswords, setShowPasswords] = useState(false)
  const [loading, setLoading] = useState(false)
  const { changePassword } = useAuth()
  const router = useRouter()

  const validatePassword = (password) => {
    if (password.length < 8) {
      return 'La contrasena debe tener al menos 8 caracteres'
    }
    if (!/[A-Z]/.test(password)) {
      return 'La contrasena debe tener al menos una mayuscula'
    }
    if (!/[0-9]/.test(password)) {
      return 'La contrasena debe tener al menos un numero'
    }
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('Por favor completa todos los campos')
      return
    }

    const validationError = validatePassword(newPassword)
    if (validationError) {
      toast.error(validationError)
      return
    }

    if (newPassword !== confirmPassword) {
      toast.error('Las contrasenas no coinciden')
      return
    }

    if (currentPassword === newPassword) {
      toast.error('La nueva contrasena debe ser diferente a la actual')
      return
    }

    setLoading(true)

    try {
      await changePassword(currentPassword, newPassword)
      toast.success('Contrasena actualizada exitosamente')
      router.push('/dashboard')
    } catch (error) {
      console.error('Error al cambiar contrasena:', error)
      
      if (error.code === 'auth/wrong-password') {
        toast.error('La contrasena actual es incorrecta')
      } else {
        toast.error('Error al cambiar la contrasena')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl border-primary/10">
          <CardHeader className="space-y-1 text-center pb-2">
            <div className="mb-4 flex justify-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <KeyRound className="w-8 h-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Cambiar Contrasena</CardTitle>
            <CardDescription className="text-muted-foreground">
              Por seguridad, debes cambiar tu contrasena temporal antes de continuar
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Contrasena Temporal</Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showPasswords ? 'text' : 'password'}
                    placeholder="Ingresa tu contrasena temporal"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    disabled={loading}
                    className="h-11 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords(!showPasswords)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPasswords ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">Nueva Contrasena</Label>
                <Input
                  id="newPassword"
                  type={showPasswords ? 'text' : 'password'}
                  placeholder="Ingresa tu nueva contrasena"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={loading}
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Contrasena</Label>
                <Input
                  id="confirmPassword"
                  type={showPasswords ? 'text' : 'password'}
                  placeholder="Confirma tu nueva contrasena"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
                  className="h-11"
                />
              </div>

              <div className="bg-muted/50 rounded-lg p-3 text-sm text-muted-foreground">
                <p className="font-medium mb-2">La contrasena debe tener:</p>
                <ul className="space-y-1 list-disc list-inside">
                  <li className={newPassword.length >= 8 ? 'text-success' : ''}>
                    Al menos 8 caracteres
                  </li>
                  <li className={/[A-Z]/.test(newPassword) ? 'text-success' : ''}>
                    Al menos una letra mayuscula
                  </li>
                  <li className={/[0-9]/.test(newPassword) ? 'text-success' : ''}>
                    Al menos un numero
                  </li>
                </ul>
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-primary hover:bg-primary/90 text-white font-medium"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Actualizando...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="mr-2 h-5 w-5" />
                    Actualizar Contrasena
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-6 flex justify-center">
          <Logo size="sm" />
        </div>
      </div>
    </div>
  )
}
