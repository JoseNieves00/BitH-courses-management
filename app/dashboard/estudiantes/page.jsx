'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { DataTable } from '@/components/shared/DataTable'
import { Button } from '@/components/ui/button'
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { GraduationCap } from 'lucide-react'
import { toast } from 'sonner'

// Datos de ejemplo
const mockEstudiantes = [
  { 
    id: '1', 
    nombre: 'Pedro Sanchez Jr.', 
    acudiente: 'Roberto Sanchez',
    instrumento: 'Piano', 
    profesor: 'Carlos Rodriguez',
    horasMes: 8,
    estado: 'Activo',
    fechaInicio: '2024-02-20'
  },
  { 
    id: '2', 
    nombre: 'Sofia Sanchez', 
    acudiente: 'Roberto Sanchez',
    instrumento: 'Guitarra', 
    profesor: 'Maria Garcia',
    horasMes: 4,
    estado: 'Activo',
    fechaInicio: '2024-02-20'
  },
  { 
    id: '3', 
    nombre: 'Valentina Torres', 
    acudiente: 'Patricia Torres',
    instrumento: 'Violin', 
    profesor: 'Ana Lopez',
    horasMes: 8,
    estado: 'Activo',
    fechaInicio: '2024-03-25'
  },
  { 
    id: '4', 
    nombre: 'Mateo Ramirez', 
    acudiente: 'Fernando Ramirez',
    instrumento: 'Bateria', 
    profesor: 'Juan Martinez',
    horasMes: 12,
    estado: 'Activo',
    fechaInicio: '2024-01-15'
  },
  { 
    id: '5', 
    nombre: 'Isabella Ramirez', 
    acudiente: 'Fernando Ramirez',
    instrumento: 'Piano', 
    profesor: 'Carlos Rodriguez',
    horasMes: 8,
    estado: 'Activo',
    fechaInicio: '2024-01-15'
  },
  { 
    id: '6', 
    nombre: 'Santiago Ramirez', 
    acudiente: 'Fernando Ramirez',
    instrumento: 'Tecnica Vocal', 
    profesor: 'Laura Torres',
    horasMes: 4,
    estado: 'Pendiente',
    fechaInicio: '2024-06-10'
  },
  { 
    id: '7', 
    nombre: 'Camila Herrera', 
    acudiente: 'Carmen Herrera',
    instrumento: 'Guitarra', 
    profesor: 'Maria Garcia',
    horasMes: 8,
    estado: 'Activo',
    fechaInicio: '2024-06-08'
  },
  { 
    id: '8', 
    nombre: 'Daniel Diaz', 
    acudiente: 'Miguel Angel Diaz',
    instrumento: 'Bajo', 
    profesor: 'Pedro Sanchez',
    horasMes: 8,
    estado: 'Activo',
    fechaInicio: '2024-04-18'
  },
]

const columns = [
  { key: 'nombre', label: 'Estudiante', type: 'avatar', subKey: 'acudiente' },
  { key: 'instrumento', label: 'Instrumento' },
  { key: 'profesor', label: 'Profesor' },
  { key: 'horasMes', label: 'Horas/Mes' },
  { key: 'estado', label: 'Estado', type: 'badge' },
  { key: 'fechaInicio', label: 'Inicio', type: 'date' },
]

export default function EstudiantesPage() {
  const router = useRouter()
  const [estudiantes, setEstudiantes] = useState(mockEstudiantes)
  const [deleteDialog, setDeleteDialog] = useState({ open: false, estudiante: null })

  const handleView = (estudiante) => {
    router.push(`/dashboard/estudiantes/${estudiante.id}`)
  }

  const handleEdit = (estudiante) => {
    router.push(`/dashboard/estudiantes/${estudiante.id}/editar`)
  }

  const handleDelete = (estudiante) => {
    setDeleteDialog({ open: true, estudiante })
  }

  const confirmDelete = () => {
    if (deleteDialog.estudiante) {
      setEstudiantes(estudiantes.filter(e => e.id !== deleteDialog.estudiante.id))
      toast.success(`Estudiante ${deleteDialog.estudiante.nombre} eliminado`)
      setDeleteDialog({ open: false, estudiante: null })
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Link href="/dashboard" className="hover:text-primary transition-colors">
              Dashboard
            </Link>
            <span>/</span>
            <span>Estudiantes</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Estudiantes</h1>
          <p className="text-muted-foreground mt-1">
            Todos los estudiantes registrados en la academia
          </p>
        </div>
        
        <Link href="/dashboard/clientes/nuevo">
          <Button className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
            <GraduationCap className="mr-2 h-5 w-5" />
            Nuevo Estudiante
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">Total Estudiantes</p>
          <p className="text-2xl font-bold text-foreground">{estudiantes.length}</p>
        </div>
        <div className="bg-card rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">Activos</p>
          <p className="text-2xl font-bold text-success">
            {estudiantes.filter(e => e.estado === 'Activo').length}
          </p>
        </div>
        <div className="bg-card rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">Pendientes</p>
          <p className="text-2xl font-bold text-warning">
            {estudiantes.filter(e => e.estado === 'Pendiente').length}
          </p>
        </div>
        <div className="bg-card rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">Horas Totales/Mes</p>
          <p className="text-2xl font-bold text-primary">
            {estudiantes.reduce((sum, e) => sum + e.horasMes, 0)}
          </p>
        </div>
      </div>

      {/* Table */}
      <DataTable
        title={`Lista de Estudiantes (${estudiantes.length})`}
        data={estudiantes}
        columns={columns}
        searchPlaceholder="Buscar estudiante..."
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        emptyMessage="No hay estudiantes registrados"
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialog.open} onOpenChange={(open) => setDeleteDialog({ ...deleteDialog, open })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Eliminar Estudiante</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estas seguro de que deseas eliminar a <strong>{deleteDialog.estudiante?.nombre}</strong>? 
              Esta accion eliminara todo el historial de clases del estudiante.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
