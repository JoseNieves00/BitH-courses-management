'use client'

import { useAuth } from '@/contexts/AuthContext'
import { StatCard } from '@/components/dashboard/StatCard'
import { RecentTable } from '@/components/dashboard/RecentTable'
import { QuickActions } from '@/components/dashboard/QuickActions'
import { InstrumentsChart } from '@/components/dashboard/InstrumentsChart'
import { 
  Users, 
  GraduationCap, 
  UserCog, 
  Calendar,
  CreditCard,
  TrendingUp
} from 'lucide-react'

// Datos de ejemplo para el dashboard
const mockStats = {
  totalProfesores: 8,
  totalClientes: 45,
  totalEstudiantes: 52,
  clasesEsteMes: 124,
  ingresosMes: 4850000,
  pagossPendientes: 12,
}

const mockProfesores = [
  { id: 1, nombre: 'Carlos Rodriguez', instrumento: 'Piano', estado: 'Activo' },
  { id: 2, nombre: 'Maria Garcia', instrumento: 'Guitarra', estado: 'Activo' },
  { id: 3, nombre: 'Juan Martinez', instrumento: 'Bateria', estado: 'Activo' },
  { id: 4, nombre: 'Ana Lopez', instrumento: 'Violin', estado: 'Activo' },
]

const mockPagos = [
  { id: 1, estudiante: 'Pedro Sanchez', monto: 150000, estado: 'Pagado' },
  { id: 2, estudiante: 'Laura Torres', monto: 200000, estado: 'Pendiente' },
  { id: 3, estudiante: 'Diego Ramirez', monto: 150000, estado: 'Pagado' },
  { id: 4, estudiante: 'Sofia Herrera', monto: 175000, estado: 'Pendiente' },
]

const mockClases = [
  { id: 1, estudiante: 'Pedro Sanchez', descripcion: 'Piano - Hoy 3:00 PM', estado: 'Programada' },
  { id: 2, estudiante: 'Laura Torres', descripcion: 'Guitarra - Hoy 4:30 PM', estado: 'Programada' },
  { id: 3, estudiante: 'Diego Ramirez', descripcion: 'Bateria - Manana 10:00 AM', estado: 'Programada' },
]

export default function DashboardPage() {
  const { userData, isAdmin, isProfesor } = useAuth()

  if (isAdmin) {
    return <AdminDashboard stats={mockStats} />
  }

  return <ProfesorDashboard userData={userData} />
}

function AdminDashboard({ stats }) {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Resumen general de la academia BitH
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          title="Profesores"
          value={stats.totalProfesores}
          icon={UserCog}
          trend="up"
          trendValue="2"
        />
        <StatCard
          title="Clientes"
          value={stats.totalClientes}
          icon={Users}
          trend="up"
          trendValue="5"
        />
        <StatCard
          title="Estudiantes"
          value={stats.totalEstudiantes}
          icon={GraduationCap}
          trend="up"
          trendValue="8"
        />
        <StatCard
          title="Clases del Mes"
          value={stats.clasesEsteMes}
          icon={Calendar}
          description="Enero 2026"
        />
        <StatCard
          title="Ingresos"
          value={`$${(stats.ingresosMes / 1000000).toFixed(1)}M`}
          icon={TrendingUp}
          trend="up"
          trendValue="12%"
        />
        <StatCard
          title="Pagos Pendientes"
          value={stats.pagossPendientes}
          icon={CreditCard}
          description="Por cobrar"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <QuickActions />
        </div>

        {/* Instruments Chart */}
        <div className="lg:col-span-2">
          <InstrumentsChart />
        </div>
      </div>

      {/* Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RecentTable
          title="Profesores Activos"
          description="Equipo docente de BitH"
          data={mockProfesores}
          emptyMessage="No hay profesores registrados"
        />
        
        <RecentTable
          title="Proximas Clases"
          description="Clases programadas"
          data={mockClases}
          emptyMessage="No hay clases programadas"
        />
        
        <RecentTable
          title="Pagos Recientes"
          description="Ultimos movimientos"
          data={mockPagos}
          emptyMessage="No hay pagos registrados"
        />
      </div>
    </div>
  )
}

function ProfesorDashboard({ userData }) {
  const mockMisEstudiantes = [
    { id: 1, nombre: 'Pedro Sanchez', instrumento: 'Piano', estado: 'Activo' },
    { id: 2, nombre: 'Laura Torres', instrumento: 'Piano', estado: 'Activo' },
    { id: 3, nombre: 'Diego Ramirez', instrumento: 'Piano', estado: 'Activo' },
  ]

  const mockMisClases = [
    { id: 1, estudiante: 'Pedro Sanchez', descripcion: 'Hoy 3:00 PM - Leccion 12', estado: 'Programada' },
    { id: 2, estudiante: 'Laura Torres', descripcion: 'Hoy 4:30 PM - Leccion 8', estado: 'Programada' },
    { id: 3, estudiante: 'Diego Ramirez', descripcion: 'Manana 10:00 AM - Leccion 5', estado: 'Programada' },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Mi Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Bienvenido, {userData?.nombre || 'Profesor'}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Mis Estudiantes"
          value={3}
          icon={GraduationCap}
        />
        <StatCard
          title="Clases esta Semana"
          value={12}
          icon={Calendar}
        />
        <StatCard
          title="Clases Completadas"
          value={45}
          icon={TrendingUp}
          description="Este mes"
        />
        <StatCard
          title="Horas Impartidas"
          value={36}
          icon={UserCog}
          description="Este mes"
        />
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentTable
          title="Mis Estudiantes"
          description="Estudiantes asignados"
          data={mockMisEstudiantes}
          emptyMessage="No tienes estudiantes asignados"
        />
        
        <RecentTable
          title="Proximas Clases"
          description="Tu agenda de clases"
          data={mockMisClases}
          emptyMessage="No tienes clases programadas"
        />
      </div>
    </div>
  )
}
