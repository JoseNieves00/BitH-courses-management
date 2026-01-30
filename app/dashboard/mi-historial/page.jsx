'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { DataTable } from '@/components/shared/DataTable'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Calendar, 
  Clock,
  CheckCircle2,
  XCircle,
  TrendingUp
} from 'lucide-react'

// Datos de ejemplo
const mockHistorial = [
  { 
    id: '1', 
    estudiante: 'Pedro Sanchez Jr.', 
    fecha: '2026-01-28',
    hora: '15:00',
    duracion: 1,
    estado: 'Completada',
    notas: 'Practica de escalas'
  },
  { 
    id: '2', 
    estudiante: 'Isabella Ramirez', 
    fecha: '2026-01-27',
    hora: '10:00',
    duracion: 1,
    estado: 'Completada',
    notas: 'Lectura de partituras'
  },
  { 
    id: '3', 
    estudiante: 'Laura Martinez', 
    fecha: '2026-01-26',
    hora: '14:00',
    duracion: 1,
    estado: 'Completada',
    notas: 'Introduccion a teclas'
  },
  { 
    id: '4', 
    estudiante: 'Pedro Sanchez Jr.', 
    fecha: '2026-01-25',
    hora: '15:00',
    duracion: 1,
    estado: 'Cancelada',
    notas: 'Cancelada por estudiante'
  },
  { 
    id: '5', 
    estudiante: 'Isabella Ramirez', 
    fecha: '2026-01-24',
    hora: '10:00',
    duracion: 1,
    estado: 'Completada',
    notas: 'Acordes basicos'
  },
  { 
    id: '6', 
    estudiante: 'Laura Martinez', 
    fecha: '2026-01-23',
    hora: '14:00',
    duracion: 1,
    estado: 'Completada',
    notas: 'Postura y manos'
  },
  { 
    id: '7', 
    estudiante: 'Pedro Sanchez Jr.', 
    fecha: '2026-01-21',
    hora: '15:00',
    duracion: 1,
    estado: 'Completada',
    notas: 'Melodias simples'
  },
  { 
    id: '8', 
    estudiante: 'Isabella Ramirez', 
    fecha: '2026-01-20',
    hora: '10:00',
    duracion: 1,
    estado: 'Completada',
    notas: 'Ritmo y tempo'
  },
]

const columns = [
  { key: 'estudiante', label: 'Estudiante', type: 'avatar' },
  { key: 'fecha', label: 'Fecha', type: 'date' },
  { key: 'hora', label: 'Hora' },
  { key: 'duracion', label: 'Duracion' },
  { key: 'estado', label: 'Estado', type: 'badge' },
  { key: 'notas', label: 'Notas' },
]

export default function MiHistorialPage() {
  const { userData } = useAuth()
  const [activeTab, setActiveTab] = useState('todas')

  const clasesCompletadas = mockHistorial.filter(c => c.estado === 'Completada')
  const clasesCanceladas = mockHistorial.filter(c => c.estado === 'Cancelada')
  
  const getFilteredData = () => {
    switch (activeTab) {
      case 'completadas':
        return clasesCompletadas
      case 'canceladas':
        return clasesCanceladas
      default:
        return mockHistorial
    }
  }

  const totalHoras = clasesCompletadas.reduce((sum, c) => sum + c.duracion, 0)

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
          <Link href="/dashboard" className="hover:text-primary transition-colors">
            Dashboard
          </Link>
          <span>/</span>
          <span>Mi Historial</span>
        </div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Mi Historial</h1>
        <p className="text-muted-foreground mt-1">
          Registro de todas tus clases impartidas
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Clases</p>
                <p className="text-2xl font-bold text-foreground">{mockHistorial.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completadas</p>
                <p className="text-2xl font-bold text-success">{clasesCompletadas.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-destructive/10 rounded-lg">
                <XCircle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Canceladas</p>
                <p className="text-2xl font-bold text-destructive">{clasesCanceladas.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-chart-5/10 rounded-lg">
                <Clock className="h-5 w-5 text-chart-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Horas Impartidas</p>
                <p className="text-2xl font-bold text-foreground">{totalHoras}h</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="todas">
            Todas ({mockHistorial.length})
          </TabsTrigger>
          <TabsTrigger value="completadas">
            Completadas ({clasesCompletadas.length})
          </TabsTrigger>
          <TabsTrigger value="canceladas">
            Canceladas ({clasesCanceladas.length})
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Table */}
      <DataTable
        data={getFilteredData()}
        columns={columns}
        searchPlaceholder="Buscar en historial..."
        actions={false}
        emptyMessage="No hay clases en el historial"
      />
    </div>
  )
}
