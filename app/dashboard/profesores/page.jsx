'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
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
import { UserPlus, ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'

// Datos de ejemplo
const mockProfesores = [
  { 
    id: '1', 
    nombre: 'Carlos Rodriguez', 
    email: 'carlos@bith.com',
    instrumento: 'Piano', 
    telefono: '300-123-4567',
    estudiantes: 8,
    estado: 'Activo',
    fechaIngreso: '2024-03-15'
  },
  { 
    id: '2', 
    nombre: 'Maria Garcia', 
    email: 'maria@bith.com',
    instrumento: 'Guitarra', 
    telefono: '301-234-5678',
    estudiantes: 12,
    estado: 'Activo',
    fechaIngreso: '2024-01-10'
  },
  { 
    id: '3', 
    nombre: 'Juan Martinez', 
    email: 'juan@bith.com',
    instrumento: 'Bateria', 
    telefono: '302-345-6789',
    estudiantes: 6,
    estado: 'Activo',
    fechaIngreso: '2024-06-20'
  },
  { 
    id: '4', 
    nombre: 'Ana Lopez', 
    email: 'ana@bith.com',
    instrumento: 'Violin', 
    telefono: '303-456-7890',
    estudiantes: 5,
    estado: 'Inactivo',
    fechaIngreso: '2023-11-05'
  },
  { 
    id: '5', 
    nombre: 'Pedro Sanchez', 
    email: 'pedro@bith.com',
    instrumento: 'Bajo', 
    telefono: '304-567-8901',
    estudiantes: 4,
    estado: 'Activo',
    fechaIngreso: '2024-08-12'
  },
  { 
    id: '6', 
    nombre: 'Laura Torres', 
    email: 'laura@bith.com',
    instrumento: 'Tecnica Vocal', 
    telefono: '305-678-9012',
    estudiantes: 10,
    estado: 'Activo',
    fechaIngreso: '2024-02-28'
  },
]

const columns = [
  { key: 'nombre', label: 'Profesor', type: 'avatar', subKey: 'email' },
  { key: 'instrumento', label: 'Instrumento' },
  { key: 'telefono', label: 'Telefono' },
  { key: 'estudiantes', label: 'Estudiantes' },
  { key: 'estado', label: 'Estado', type: 'badge' },
  { key: 'fechaIngreso', label: 'Ingreso', type: 'date' },
]

export default function ProfesoresPage() {
  const router = useRouter()
  const [profesores, setProfesores] = useState(mockProfesores)
  const [deleteDialog, setDeleteDialog] = useState({ open: false, profesor: null })

  const handleView = (profesor) => {
    router.push(`/dashboard/profesores/${profesor.id}`)
  }

  const handleEdit = (profesor) => {
    router.push(`/dashboard/profesores/${profesor.id}/editar`)
  }

  const handleDelete = (profesor) => {
    setDeleteDialog({ open: true, profesor })
  }

  const confirmDelete = () => {
    if (deleteDialog.profesor) {
      setProfesores(profesores.filter(p => p.id !== deleteDialog.profesor.id))
      toast.success(`Profesor ${deleteDialog.profesor.nombre} eliminado`)
      setDeleteDialog({ open: false, profesor: null })
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
            <span>Profesores</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Profesores</h1>
          <p className="text-muted-foreground mt-1">
            Gestiona el equipo docente de BitH
          </p>
        </div>
        
        <Link href="/dashboard/profesores/nuevo">
          <Button className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
            <UserPlus className="mr-2 h-5 w-5" />
            Nuevo Profesor
          </Button>
        </Link>
      </div>

      {/* Table */}
      <DataTable
        title={`Lista de Profesores (${profesores.length})`}
        data={profesores}
        columns={columns}
        searchPlaceholder="Buscar profesor..."
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        emptyMessage="No hay profesores registrados"
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialog.open} onOpenChange={(open) => setDeleteDialog({ ...deleteDialog, open })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Eliminar Profesor</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estas seguro de que deseas eliminar a <strong>{deleteDialog.profesor?.nombre}</strong>? 
              Esta accion no se puede deshacer y se eliminaran todos los datos asociados.
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
