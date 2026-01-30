'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/ui/logo'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
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
  ChevronLeft,
  ChevronRight,
  Music,
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

export function Sidebar({ collapsed, onToggle }) {
  const pathname = usePathname()
  const { isAdmin } = useAuth()

  const menuItems = isAdmin ? adminMenuItems : profesorMenuItems

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out',
        collapsed ? 'w-[72px]' : 'w-64'
      )}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className={cn(
          'flex items-center h-16 px-4 border-b border-sidebar-border',
          collapsed ? 'justify-center' : 'justify-between'
        )}>
          {collapsed ? (
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Music className="w-5 h-5 text-white" />
            </div>
          ) : (
            <Logo size="sm" />
          )}
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className={cn(
              'h-8 w-8 text-muted-foreground hover:text-foreground',
              collapsed && 'absolute -right-4 top-4 bg-sidebar border border-sidebar-border rounded-full shadow-md'
            )}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 py-4">
          <nav className="px-3 space-y-6">
            {menuItems.map((section) => (
              <div key={section.title}>
                {!collapsed && (
                  <h3 className="mb-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {section.title}
                  </h3>
                )}
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const isActive = pathname === item.href
                    const Icon = item.icon

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                          isActive
                            ? 'bg-primary text-primary-foreground shadow-md shadow-primary/25'
                            : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                          collapsed && 'justify-center px-0'
                        )}
                        title={collapsed ? item.name : undefined}
                      >
                        <Icon className={cn('h-5 w-5 flex-shrink-0', isActive && 'text-primary-foreground')} />
                        {!collapsed && <span>{item.name}</span>}
                      </Link>
                    )
                  })}
                </div>
                {!collapsed && <Separator className="mt-4" />}
              </div>
            ))}
          </nav>
        </ScrollArea>

        {/* Footer */}
        <div className={cn(
          'p-4 border-t border-sidebar-border',
          collapsed && 'px-2'
        )}>
          {!collapsed && (
            <div className="text-xs text-muted-foreground text-center">
              <p>BitH v1.0</p>
              <p className="mt-1">© {new Date().getFullYear()}</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
