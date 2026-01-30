'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/ui/logo'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  UserCog,
  Calendar,
  CreditCard,
  FileText,
  Settings,
  X,
} from 'lucide-react'

const adminMenuItems = [
  {
    title: 'Principal',
    items: [
      { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    ],
  },
  {
    title: 'Gestion',
    items: [
      { name: 'Profesores', href: '/dashboard/profesores', icon: UserCog },
      { name: 'Clientes', href: '/dashboard/clientes', icon: Users },
      { name: 'Estudiantes', href: '/dashboard/estudiantes', icon: GraduationCap },
    ],
  },
  {
    title: 'Operaciones',
    items: [
      { name: 'Clases', href: '/dashboard/clases', icon: Calendar },
      { name: 'Pagos', href: '/dashboard/pagos', icon: CreditCard },
      { name: 'Reportes', href: '/dashboard/reportes', icon: FileText },
    ],
  },
  {
    title: 'Sistema',
    items: [
      { name: 'Configuracion', href: '/dashboard/configuracion', icon: Settings },
    ],
  },
]

const profesorMenuItems = [
  {
    title: 'Principal',
    items: [
      { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    ],
  },
  {
    title: 'Mis Clases',
    items: [
      { name: 'Estudiantes', href: '/dashboard/mis-estudiantes', icon: GraduationCap },
      { name: 'Horarios', href: '/dashboard/mis-horarios', icon: Calendar },
      { name: 'Historial', href: '/dashboard/mi-historial', icon: FileText },
    ],
  },
]

export function MobileSidebar({ open, onClose }) {
  const pathname = usePathname()
  const { isAdmin } = useAuth()

  const menuItems = isAdmin ? adminMenuItems : profesorMenuItems

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="left" className="w-72 p-0">
        <SheetHeader className="px-4 py-4 border-b">
          <div className="flex items-center justify-between">
            <Logo size="sm" />
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <SheetTitle className="sr-only">Menu de navegacion</SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex-1 py-4 h-[calc(100vh-80px)]">
          <nav className="px-3 space-y-6">
            {menuItems.map((section) => (
              <div key={section.title}>
                <h3 className="mb-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {section.title}
                </h3>
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const isActive = pathname === item.href
                    const Icon = item.icon

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                          isActive
                            ? 'bg-primary text-primary-foreground shadow-md'
                            : 'text-foreground hover:bg-accent'
                        )}
                      >
                        <Icon className="h-5 w-5 flex-shrink-0" />
                        <span>{item.name}</span>
                      </Link>
                    )
                  })}
                </div>
                <Separator className="mt-4" />
              </div>
            ))}
          </nav>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
