'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  MapPin,
  Calendar,
  CheckCircle2,
  XCircle,
  User
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Datos de ejemplo para el calendario del profesor
const mockClases = [
  {
    id: '1',
    estudiante: 'Pedro Sanchez Jr.',
    hora: '15:00',
    duracion: 1,
    direccion: 'Calle 45 #12-34, Bogota',
    instrumento: 'Piano',
    estado: 'programada',
    fecha: '2026-01-30'
  },
  {
    id: '2',
    estudiante: 'Isabella Ramirez',
    hora: '17:00',
    duracion: 1,
    direccion: 'Avenida 6 #23-45, Cali',
    instrumento: 'Piano',
    estado: 'programada',
    fecha: '2026-01-30'
  },
  {
    id: '3',
    estudiante: 'Laura Martinez',
    hora: '10:00',
    duracion: 1,
    direccion: 'Carrera 20 #30-40, Bogota',
    instrumento: 'Piano',
    estado: 'programada',
    fecha: '2026-01-31'
  },
  {
    id: '4',
    estudiante: 'Pedro Sanchez Jr.',
    hora: '15:00',
    duracion: 1,
    direccion: 'Calle 45 #12-34, Bogota',
    instrumento: 'Piano',
    estado: 'programada',
    fecha: '2026-02-01'
  },
  {
    id: '5',
    estudiante: 'Isabella Ramirez',
    hora: '10:00',
    duracion: 1,
    direccion: 'Avenida 6 #23-45, Cali',
    instrumento: 'Piano',
    estado: 'completada',
    fecha: '2026-01-28'
  },
  {
    id: '6',
    estudiante: 'Laura Martinez',
    hora: '14:00',
    duracion: 1,
    direccion: 'Carrera 20 #30-40, Bogota',
    instrumento: 'Piano',
    estado: 'completada',
    fecha: '2026-01-27'
  },
]

const diasSemana = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']
const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

export default function MisHorariosPage() {
  const { userData } = useAuth()
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 30))
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 0, 30))

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay()
    
    const days = []
    
    // Previous month days
    for (let i = 0; i < startingDay; i++) {
      const prevDate = new Date(year, month, -startingDay + i + 1)
      days.push({ date: prevDate, isCurrentMonth: false })
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true })
    }
    
    // Next month days
    const remainingDays = 42 - days.length
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false })
    }
    
    return days
  }

  const getClasesForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0]
    return mockClases.filter(clase => clase.fecha === dateStr)
  }

  const hasClases = (date) => {
    return getClasesForDate(date).length > 0
  }

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const isToday = (date) => {
    const today = new Date(2026, 0, 30) // Simulated today
    return date.toDateString() === today.toDateString()
  }

  const isSelected = (date) => {
    return date.toDateString() === selectedDate.toDateString()
  }

  const clasesDelDia = getClasesForDate(selectedDate)
  const clasesProximas = mockClases.filter(c => 
    c.estado === 'programada' && new Date(c.fecha) >= new Date(2026, 0, 30)
  ).slice(0, 5)

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
          <Link href="/dashboard" className="hover:text-primary transition-colors">
            Dashboard
          </Link>
          <span>/</span>
          <span>Mis Horarios</span>
        </div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Mis Horarios</h1>
        <p className="text-muted-foreground mt-1">
          Calendario de clases programadas
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                {meses[currentDate.getMonth()]} {currentDate.getFullYear()}
              </CardTitle>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" onClick={prevMonth}>
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={nextMonth}>
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Days Header */}
            <div className="grid grid-cols-7 mb-2">
              {diasSemana.map((dia) => (
                <div 
                  key={dia} 
                  className="text-center text-sm font-medium text-muted-foreground py-2"
                >
                  {dia}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {getDaysInMonth(currentDate).map((day, index) => {
                const dayClases = getClasesForDate(day.date)
                return (
                  <button
                    key={index}
                    onClick={() => setSelectedDate(day.date)}
                    className={cn(
                      'relative aspect-square p-1 rounded-lg text-sm transition-all',
                      day.isCurrentMonth ? 'text-foreground' : 'text-muted-foreground/50',
                      isToday(day.date) && 'bg-primary/10 font-bold',
                      isSelected(day.date) && 'bg-primary text-primary-foreground',
                      !isSelected(day.date) && 'hover:bg-muted'
                    )}
                  >
                    <span>{day.date.getDate()}</span>
                    {dayClases.length > 0 && !isSelected(day.date) && (
                      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                        {dayClases.slice(0, 3).map((_, i) => (
                          <div 
                            key={i} 
                            className={cn(
                              'w-1.5 h-1.5 rounded-full',
                              isToday(day.date) ? 'bg-primary' : 'bg-primary/60'
                            )} 
                          />
                        ))}
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Classes */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Proximas Clases</CardTitle>
            <CardDescription>Tu agenda de la semana</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {clasesProximas.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                No hay clases programadas
              </p>
            ) : (
              clasesProximas.map((clase) => (
                <div 
                  key={clase.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <Avatar className="h-10 w-10 bg-primary/10">
                    <AvatarFallback className="bg-primary/10 text-primary text-sm">
                      {getInitials(clase.estudiante)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{clase.estudiante}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(clase.fecha).toLocaleDateString('es-CO', { 
                        weekday: 'short', 
                        day: 'numeric',
                        month: 'short'
                      })} - {clase.hora}
                    </p>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* Selected Day Classes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Clases del {selectedDate.toLocaleDateString('es-CO', { 
              weekday: 'long', 
              day: 'numeric', 
              month: 'long',
              year: 'numeric'
            })}
          </CardTitle>
          <CardDescription>
            {clasesDelDia.length} clase{clasesDelDia.length !== 1 ? 's' : ''} programada{clasesDelDia.length !== 1 ? 's' : ''}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {clasesDelDia.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">No hay clases programadas para este dia</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {clasesDelDia.map((clase) => (
                <div 
                  key={clase.id}
                  className="border border-border rounded-lg p-4 hover:border-primary/30 hover:bg-primary/5 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12 bg-primary/10 border border-primary/20">
                        <AvatarFallback className="bg-primary/10 text-primary font-bold">
                          {getInitials(clase.estudiante)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">{clase.estudiante}</h4>
                        <p className="text-sm text-muted-foreground">{clase.instrumento}</p>
                      </div>
                    </div>
                    <Badge 
                      variant="outline"
                      className={cn(
                        clase.estado === 'completada' 
                          ? 'bg-success/10 text-success border-success/20'
                          : 'bg-primary/10 text-primary border-primary/20'
                      )}
                    >
                      {clase.estado === 'completada' ? 'Completada' : 'Programada'}
                    </Badge>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{clase.hora} ({clase.duracion}h)</span>
                    </div>
                    <div className="flex items-start gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4 mt-0.5" />
                      <span className="line-clamp-2">{clase.direccion}</span>
                    </div>
                  </div>

                  {clase.estado === 'programada' && (
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" className="flex-1 bg-success hover:bg-success/90 text-white">
                        <CheckCircle2 className="mr-1 h-4 w-4" />
                        Completar
                      </Button>
                      <Button size="sm" variant="outline" className="text-destructive hover:bg-destructive/10 bg-transparent">
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
