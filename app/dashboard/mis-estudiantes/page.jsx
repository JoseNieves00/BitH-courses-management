'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { 
  Search, 
  Phone, 
  MapPin, 
  Clock, 
  Calendar,
  User,
  Music,
  Eye
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Datos de ejemplo para el profesor
const mockMisEstudiantes = [
  { 
    id: '1', 
    nombre: 'Pedro Sanchez Jr.', 
    acudiente: 'Roberto Sanchez',
    telefonoAcudiente: '300-111-2222',
    direccion: 'Calle 45 #12-34, Bogota',
    instrumento: 'Piano', 
    horasMes: 8,
    clasesTomadas: 6,
    proximaClase: '2026-01-31 15:00',
    estado: 'Activo',
    notas: 'Estudiante muy aplicado, practica regularmente.'
  },
  { 
    id: '2', 
    nombre: 'Isabella Ramirez', 
    acudiente: 'Fernando Ramirez',
    telefonoAcudiente: '302-333-4444',
    direccion: 'Avenida 6 #23-45, Cali',
    instrumento: 'Piano', 
    horasMes: 8,
    clasesTomadas: 5,
    proximaClase: '2026-02-01 10:00',
    estado: 'Activo',
    notas: 'Nivel intermedio, trabajando en escalas.'
  },
  { 
    id: '3', 
    nombre: 'Laura Martinez', 
    acudiente: 'Ana Martinez',
    telefonoAcudiente: '305-666-7777',
    direccion: 'Carrera 20 #30-40, Bogota',
    instrumento: 'Piano', 
    horasMes: 4,
    clasesTomadas: 3,
    proximaClase: '2026-02-02 14:00',
    estado: 'Activo',
    notas: 'Principiante, aprendiendo notas basicas.'
  },
]

export default function MisEstudiantesPage() {
  const { userData } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedEstudiante, setSelectedEstudiante] = useState(null)

  const filteredEstudiantes = mockMisEstudiantes.filter(est =>
    est.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    est.acudiente.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-CO', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
          <Link href="/dashboard" className="hover:text-primary transition-colors">
            Dashboard
          </Link>
          <span>/</span>
          <span>Mis Estudiantes</span>
        </div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Mis Estudiantes</h1>
        <p className="text-muted-foreground mt-1">
          Estudiantes asignados a ti, {userData?.nombre?.split(' ')[0] || 'Profesor'}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Estudiantes</p>
            <p className="text-2xl font-bold text-foreground">{mockMisEstudiantes.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Clases este Mes</p>
            <p className="text-2xl font-bold text-primary">
              {mockMisEstudiantes.reduce((sum, e) => sum + e.clasesTomadas, 0)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Horas Programadas</p>
            <p className="text-2xl font-bold text-foreground">
              {mockMisEstudiantes.reduce((sum, e) => sum + e.horasMes, 0)}h
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Proxima Clase</p>
            <p className="text-lg font-bold text-success">Hoy 3:00 PM</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar estudiante..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEstudiantes.map((estudiante) => (
          <Card 
            key={estudiante.id}
            className="group hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            onClick={() => setSelectedEstudiante(estudiante)}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-14 w-14 bg-primary/10 border-2 border-primary/20">
                  <AvatarFallback className="bg-primary/10 text-primary text-lg font-bold">
                    {getInitials(estudiante.nombre)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {estudiante.nombre}
                  </h3>
                  <p className="text-sm text-muted-foreground truncate">
                    {estudiante.instrumento}
                  </p>
                  <Badge 
                    variant="outline" 
                    className="mt-2 bg-success/10 text-success border-success/20"
                  >
                    {estudiante.estado}
                  </Badge>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span className="truncate">{estudiante.acudiente}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{estudiante.horasMes}h/mes - {estudiante.clasesTomadas} clases tomadas</span>
                </div>
                <div className="flex items-center gap-2 text-primary font-medium">
                  <Calendar className="h-4 w-4" />
                  <span className="truncate">
                    Proxima: {new Date(estudiante.proximaClase).toLocaleDateString('es-CO', { 
                      weekday: 'short', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </div>

              <Button 
                variant="outline" 
                className="w-full mt-4 group-hover:bg-primary group-hover:text-white transition-colors bg-transparent"
              >
                <Eye className="mr-2 h-4 w-4" />
                Ver Detalles
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEstudiantes.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">No se encontraron estudiantes</p>
        </div>
      )}

      {/* Student Detail Dialog */}
      <Dialog open={!!selectedEstudiante} onOpenChange={() => setSelectedEstudiante(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <Avatar className="h-12 w-12 bg-primary/10 border-2 border-primary/20">
                <AvatarFallback className="bg-primary/10 text-primary font-bold">
                  {selectedEstudiante && getInitials(selectedEstudiante.nombre)}
                </AvatarFallback>
              </Avatar>
              <div>
                <span>{selectedEstudiante?.nombre}</span>
                <Badge variant="outline" className="ml-2 bg-success/10 text-success border-success/20">
                  {selectedEstudiante?.estado}
                </Badge>
              </div>
            </DialogTitle>
            <DialogDescription>
              Informacion detallada del estudiante
            </DialogDescription>
          </DialogHeader>

          {selectedEstudiante && (
            <div className="space-y-6 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Instrumento</p>
                  <p className="font-medium flex items-center gap-2">
                    <Music className="h-4 w-4 text-primary" />
                    {selectedEstudiante.instrumento}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Horas por Mes</p>
                  <p className="font-medium flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    {selectedEstudiante.horasMes} horas
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h4 className="font-semibold">Informacion del Acudiente</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedEstudiante.acudiente}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <a 
                      href={`tel:${selectedEstudiante.telefonoAcudiente}`}
                      className="text-primary hover:underline"
                    >
                      {selectedEstudiante.telefonoAcudiente}
                    </a>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <span>{selectedEstudiante.direccion}</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h4 className="font-semibold">Proxima Clase</h4>
                <div className="bg-primary/5 border border-primary/10 rounded-lg p-4">
                  <p className="font-medium text-primary">
                    {formatDate(selectedEstudiante.proximaClase)}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Clase #{selectedEstudiante.clasesTomadas + 1} del mes
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h4 className="font-semibold">Notas del Estudiante</h4>
                <p className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
                  {selectedEstudiante.notas}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
