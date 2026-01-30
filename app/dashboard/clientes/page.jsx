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
import { UserPlus } from 'lucide-react'
import { toast } from 'sonner'

// Datos de ejemplo
const mockClientes = [
  { 
    id: '1', 
    nombre: 'Roberto Sanchez', 
    email: 'roberto.s@email.com',
    telefono: '300-111-2222',
    direccion: 'Calle 45 #12-34, Bogota',
    estudiantes: 2,
    estado: 'Activo',
    fechaRegistro: '2024-02-15'
  },
  { 
    id: '2', 
    nombre: 'Patricia Torres', 
    email: 'patricia.t@email.com',
    telefono: '301-222-3333',
    direccion: 'Carrera 80 #56-78, Medellin',
    estudiantes: 1,
    estado: 'Activo',
    fechaRegistro: '2024-03-20'
  },
  { 
    id: '3', 
    nombre: 'Fernando Ramirez', 
    email: 'fernando.r@email.com',
    telefono: '302-333-4444',
    direccion: 'Avenida 6 #23-45, Cali',
    estudiantes: 3,
    estado: 'Activo',
    fechaRegistro: '2024-01-10'
  },
  { 
    id: '4', 
    nombre: 'Carmen Herrera', 
    email: 'carmen.h@email.com',
    telefono: '303-444-5555',
    direccion: 'Calle 100 #45-67, Barranquilla',
    estudiantes: 1,
    estado: 'Pendiente',
    fechaRegistro: '2024-06-05'
  },
  { 
    id: '5', 
    nombre: 'Miguel Angel Diaz', 
    email: 'miguel.d@email.com',
    telefono: '304-555-6666',
    direccion: 'Carrera 15 #78-90, Bogota',
    estudiantes: 2,
    estado: 'Activo',
    fechaRegistro: '2024-04-12'
  },
]

const columns = [
  { key: 'nombre', label: 'Cliente', type: 'avatar', subKey: 'email' },
  { key: 'telefono', label: 'Telefono' },
  { key: 'direccion', label: 'Direccion' },
  { key: 'estudiantes', label: 'Estudiantes' },
  { key: 'estado', label: 'Estado', type: 'badge' },
  { key: 'fechaRegistro', label: 'Registro', type: 'date' },
]

export default function ClientesPage() {
  const router = useRouter()
  const [clientes, setClientes] = useState(mockClientes)
  const [deleteDialog, setDeleteDialog] = useState({ open: false, cliente: null })

  const handleView = (cliente) => {
    router.push(`/dashboard/clientes/${cliente.id}`)
  }

  const handleEdit = (cliente) => {
    router.push(`/dashboard/clientes/${cliente.id}/editar`)
  }

  const handleDelete = (cliente) => {
    setDeleteDialog({ open: true, cliente })
  }

  const confirmDelete = () => {
    if (deleteDialog.cliente) {
      setClientes(clientes.filter(c => c.id !== deleteDialog.cliente.id))
      toast.success(`Cliente ${deleteDialog.cliente.nombre} eliminado`)
      setDeleteDialog({ open: false, cliente: null })
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
            <span>Clientes</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Clientes</h1>
          <p className="text-muted-foreground mt-1">
            Gestiona los acudientes y responsables de los estudiantes
          </p>
        </div>
        
        <Link href="/dashboard/clientes/nuevo">
          <Button className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
            <UserPlus className="mr-2 h-5 w-5" />
            Nuevo Cliente
          </Button>
        </Link>
      </div>

      {/* Table */}
      <DataTable
        title={`Lista de Clientes (${clientes.length})`}
        data={clientes}
        columns={columns}
        searchPlaceholder="Buscar cliente..."
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        emptyMessage="No hay clientes registrados"
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialog.open} onOpenChange={(open) => setDeleteDialog({ ...deleteDialog, open })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Eliminar Cliente</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estas seguro de que deseas eliminar a <strong>{deleteDialog.cliente?.nombre}</strong>? 
              Esta accion tambien eliminara los estudiantes asociados.
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
