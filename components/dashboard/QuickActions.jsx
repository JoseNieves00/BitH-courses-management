'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  UserPlus, 
  Users, 
  GraduationCap, 
  Calendar,
  CreditCard,
  ArrowRight
} from 'lucide-react'
import { cn } from '@/lib/utils'

const actions = [
  {
    title: 'Nuevo Profesor',
    description: 'Agregar un profesor al sistema',
    href: '/dashboard/profesores/nuevo',
    icon: UserPlus,
    color: 'bg-primary/10 text-primary',
  },
  {
    title: 'Nuevo Cliente',
    description: 'Registrar un nuevo cliente',
    href: '/dashboard/clientes/nuevo',
    icon: Users,
    color: 'bg-chart-2/10 text-chart-2',
  },
  {
    title: 'Nuevo Estudiante',
    description: 'Agregar un estudiante',
    href: '/dashboard/estudiantes/nuevo',
    icon: GraduationCap,
    color: 'bg-chart-4/10 text-chart-4',
  },
  {
    title: 'Programar Clase',
    description: 'Crear una nueva clase',
    href: '/dashboard/clases/nueva',
    icon: Calendar,
    color: 'bg-chart-5/10 text-chart-5',
  },
]

export function QuickActions() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Acciones Rapidas</CardTitle>
        <CardDescription>Accesos directos a las funciones mas usadas</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {actions.map((action) => {
            const Icon = action.icon
            return (
              <Link key={action.href} href={action.href}>
                <div className="group flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 cursor-pointer">
                  <div className={cn('p-2 rounded-lg', action.color)}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium group-hover:text-primary transition-colors">
                      {action.title}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {action.description}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
