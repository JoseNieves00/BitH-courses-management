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
import { ArrowLeft, Loader2, UserPlus, Plus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { INSTRUMENTOS } from '@/lib/constants'

// Profesores de ejemplo
const mockProfesores = [
  { id: '1', nombre: 'Carlos Rodriguez', instrumento: 'piano' },
  { id: '2', nombre: 'Maria Garcia', instrumento: 'guitarra' },
  { id: '3', nombre: 'Juan Martinez', instrumento: 'bateria' },
  { id: '4', nombre: 'Ana Lopez', instrumento: 'violin' },
  { id: '5', nombre: 'Pedro Sanchez', instrumento: 'bajo' },
  { id: '6', nombre: 'Laura Torres', instrumento: 'tecnica-vocal' },
]

export default function NuevoClientePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    direccion: '',
  })

  const [estudiantes, setEstudiantes] = useState([
    { id: 1, nombre: '', instrumento: '', horasMes: '', profesorId: '' }
  ])

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleEstudianteChange = (index, field, value) => {
    const newEstudiantes = [...estudiantes]
    newEstudiantes[index] = { ...newEstudiantes[index], [field]: value }
    setEstudiantes(newEstudiantes)
  }

  const addEstudiante = () => {
    setEstudiantes([
      ...estudiantes,
      { id: Date.now(), nombre: '', instrumento: '', horasMes: '', profesorId: '' }
    ])
  }

  const removeEstudiante = (index) => {
    if (estudiantes.length > 1) {
      setEstudiantes(estudiantes.filter((_, i) => i !== index))
    }
  }

  const getProfesoresByInstrumento = (instrumento) => {
    if (!instrumento) return []
    return mockProfesores.filter(p => p.instrumento === instrumento)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.nombre || !formData.apellido || !formData.telefono) {
      toast.error('Por favor completa los campos del cliente')
      return
    }

    const estudiantesValidos = estudiantes.every(est => 
      est.nombre && est.instrumento && est.horasMes
    )

    if (!estudiantesValidos) {
      toast.error('Por favor completa la informacion de todos los estudiantes')
      return
    }

    setLoading(true)

    try {
      // Simular creacion
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      toast.success('Cliente y estudiantes creados exitosamente')
      router.push('/dashboard/clientes')
    } catch (error) {
      console.error('Error:', error)
      toast.error('Error al crear el cliente')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
          <Link href="/dashboard" className="hover:text-primary transition-colors">
            Dashboard
          </Link>
          <span>/</span>
          <Link href="/dashboard/clientes" className="hover:text-primary transition-colors">
            Clientes
          </Link>
          <span>/</span>
          <span>Nuevo</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/dashboard/clientes">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Nuevo Cliente</h1>
            <p className="text-muted-foreground">Registra un nuevo cliente con sus estudiantes</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Datos del Cliente */}
        <Card>
          <CardHeader>
            <CardTitle>Datos del Cliente (Acudiente)</CardTitle>
            <CardDescription>
              Informacion del responsable de los estudiantes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
                <Label htmlFor="email">Correo Electronico</Label>
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
                <Label htmlFor="telefono">Telefono *</Label>
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
              <Label htmlFor="direccion">Direccion</Label>
              <Input
                id="direccion"
                placeholder="Direccion completa"
                value={formData.direccion}
                onChange={(e) => handleChange('direccion', e.target.value)}
                disabled={loading}
              />
            </div>
          </CardContent>
        </Card>

        {/* Estudiantes */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Estudiantes</CardTitle>
                <CardDescription>
                  Agrega los estudiantes asociados a este cliente
                </CardDescription>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addEstudiante}
                disabled={loading}
              >
                <Plus className="mr-2 h-4 w-4" />
                Agregar
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {estudiantes.map((estudiante, index) => (
              <div key={estudiante.id} className="space-y-4 p-4 bg-muted/30 rounded-lg relative">
                {estudiantes.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => removeEstudiante(index)}
                    disabled={loading}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
                
                <p className="text-sm font-medium text-primary">Estudiante {index + 1}</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nombre Completo *</Label>
                    <Input
                      placeholder="Nombre del estudiante"
                      value={estudiante.nombre}
                      onChange={(e) => handleEstudianteChange(index, 'nombre', e.target.value)}
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Instrumento *</Label>
                    <Select
                      value={estudiante.instrumento}
                      onValueChange={(value) => {
                        handleEstudianteChange(index, 'instrumento', value)
                        handleEstudianteChange(index, 'profesorId', '')
                      }}
                      disabled={loading}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona instrumento" />
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
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Horas por Mes *</Label>
                    <Select
                      value={estudiante.horasMes}
                      onValueChange={(value) => handleEstudianteChange(index, 'horasMes', value)}
                      disabled={loading}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona horas" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="4">4 horas/mes</SelectItem>
                        <SelectItem value="8">8 horas/mes</SelectItem>
                        <SelectItem value="12">12 horas/mes</SelectItem>
                        <SelectItem value="16">16 horas/mes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Profesor Asignado</Label>
                    <Select
                      value={estudiante.profesorId}
                      onValueChange={(value) => handleEstudianteChange(index, 'profesorId', value)}
                      disabled={loading || !estudiante.instrumento}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={
                          estudiante.instrumento 
                            ? "Selecciona profesor" 
                            : "Primero selecciona instrumento"
                        } />
                      </SelectTrigger>
                      <SelectContent>
                        {getProfesoresByInstrumento(estudiante.instrumento).map((prof) => (
                          <SelectItem key={prof.id} value={prof.id}>
                            {prof.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <Link href="/dashboard/clientes">
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
                Crear Cliente
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
