'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, Loader2, UserPlus, Copy, Check } from 'lucide-react'
import { toast } from 'sonner'
import { INSTRUMENTOS } from '@/lib/constants'

export default function NuevoProfesorPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showCredentials, setShowCredentials] = useState(false)
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    instrumento: '',
    direccion: '',
  })

  const generatePassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789'
    let password = ''
    for (let i = 0; i < 10; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return password
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.nombre || !formData.apellido || !formData.email || !formData.instrumento) {
      toast.error('Por favor completa los campos obligatorios')
      return
    }

    if (!formData.email.includes('@')) {
      toast.error('Por favor ingresa un correo valido')
      return
    }

    setLoading(true)

    try {
      // Simular creacion de profesor
      await new Promise(resolve => setTimeout(resolve, 1500))

      const tempPassword = generatePassword()
      setCredentials({
        email: formData.email,
        password: tempPassword
      })
      setShowCredentials(true)
      
      toast.success('Profesor creado exitosamente')
    } catch (error) {
      console.error('Error:', error)
      toast.error('Error al crear el profesor')
    } finally {
      setLoading(false)
    }
  }

  const copyCredentials = () => {
    const text = `Email: ${credentials.email}\nContrasena temporal: ${credentials.password}`
    navigator.clipboard.writeText(text)
    setCopied(true)
    toast.success('Credenciales copiadas al portapapeles')
    setTimeout(() => setCopied(false), 2000)
  }

  const handleFinish = () => {
    router.push('/dashboard/profesores')
  }

  if (showCredentials) {
    return (
      <div className="max-w-lg mx-auto space-y-6 animate-fade-in">
        <Card className="border-success/20">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mb-4">
              <Check className="h-8 w-8 text-success" />
            </div>
            <CardTitle className="text-2xl">Profesor Creado</CardTitle>
            <CardDescription>
              El profesor ha sido registrado exitosamente. Comparte estas credenciales temporales.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted rounded-lg p-4 space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{credentials.email}</p>
              </div>
              <Separator />
              <div>
                <p className="text-sm text-muted-foreground">Contrasena Temporal</p>
                <p className="font-mono font-medium text-lg">{credentials.password}</p>
              </div>
            </div>

            <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
              <p className="text-sm text-warning-foreground">
                <strong>Importante:</strong> El profesor debera cambiar esta contrasena en su primer inicio de sesion.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                className="flex-1 bg-transparent"
                onClick={copyCredentials}
              >
                {copied ? (
                  <Check className="mr-2 h-4 w-4" />
                ) : (
                  <Copy className="mr-2 h-4 w-4" />
                )}
                {copied ? 'Copiado' : 'Copiar Credenciales'}
              </Button>
              <Button className="flex-1 bg-primary" onClick={handleFinish}>
                Finalizar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
          <Link href="/dashboard" className="hover:text-primary transition-colors">
            Dashboard
          </Link>
          <span>/</span>
          <Link href="/dashboard/profesores" className="hover:text-primary transition-colors">
            Profesores
          </Link>
          <span>/</span>
          <span>Nuevo</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/dashboard/profesores">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Nuevo Profesor</h1>
            <p className="text-muted-foreground">Registra un nuevo profesor en el sistema</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Informacion del Profesor</CardTitle>
          <CardDescription>
            Los campos marcados con * son obligatorios
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre *</Label>
                <Input
                  id="nombre"
                  placeholder="Nombre"
                  value={formData.nombre}
                  onChange={(e) => handleChange('nombre', e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="apellido">Apellido *</Label>
                <Input
                  id="apellido"
                  placeholder="Apellido"
                  value={formData.apellido}
                  onChange={(e) => handleChange('apellido', e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electronico *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefono">Telefono</Label>
                <Input
                  id="telefono"
                  placeholder="300-000-0000"
                  value={formData.telefono}
                  onChange={(e) => handleChange('telefono', e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="instrumento">Instrumento *</Label>
              <Select
                value={formData.instrumento}
                onValueChange={(value) => handleChange('instrumento', value)}
                disabled={loading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un instrumento" />
                </SelectTrigger>
                <SelectContent>
                  {INSTRUMENTOS.map((inst) => (
                    <SelectItem key={inst.id} value={inst.id}>
                      {inst.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="direccion">Direccion</Label>
              <Input
                id="direccion"
                placeholder="Direccion completa"
                value={formData.direccion}
                onChange={(e) => handleChange('direccion', e.target.value)}
                disabled={loading}
              />
            </div>

            <Separator />

            <div className="flex flex-col sm:flex-row gap-3 justify-end">
              <Link href="/dashboard/profesores">
                <Button type="button" variant="outline" className="w-full sm:w-auto bg-transparent" disabled={loading}>
                  Cancelar
                </Button>
              </Link>
              <Button 
                type="submit" 
                className="w-full sm:w-auto bg-primary hover:bg-primary/90"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creando...
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Crear Profesor
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
