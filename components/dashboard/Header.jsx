'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { 
  Menu, 
  Bell, 
  LogOut, 
  User, 
  Settings,
  Shield,
  Music
} from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export function Header({ onMenuClick, sidebarCollapsed }) {
  const { user, userData, signOut, isAdmin } = useAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      await signOut()
      toast.success('Sesion cerrada correctamente')
      router.push('/')
    } catch (error) {
      toast.error('Error al cerrar sesion')
    }
  }

  const getInitials = (name) => {
    if (!name) return 'U'
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <header className={cn(
      'fixed top-0 right-0 z-30 h-16 bg-background/80 backdrop-blur-lg border-b border-border transition-all duration-300',
      sidebarCollapsed ? 'left-[72px]' : 'left-64',
      'lg:left-64',
      sidebarCollapsed && 'lg:left-[72px]'
    )}>
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="hidden sm:block">
            <h1 className="text-lg font-semibold text-foreground">
              {isAdmin ? 'Panel de Administracion' : 'Panel de Profesor'}
            </h1>
            <p className="text-sm text-muted-foreground">
              Bienvenido de vuelta, {userData?.nombre?.split(' ')[0] || 'Usuario'}
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 lg:gap-3">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full animate-pulse" />
          </Button>

          <ThemeToggle />

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-2 lg:px-3">
                <Avatar className="h-8 w-8 bg-primary/10 border-2 border-primary/20">
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
                    {getInitials(userData?.nombre)}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden lg:flex flex-col items-start">
                  <span className="text-sm font-medium">{userData?.nombre || 'Usuario'}</span>
                  <Badge 
                    variant="secondary" 
                    className={cn(
                      'text-[10px] px-1.5 py-0',
                      isAdmin ? 'bg-primary/10 text-primary' : 'bg-secondary text-secondary-foreground'
                    )}
                  >
                    {isAdmin ? 'Administrador' : 'Profesor'}
                  </Badge>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{userData?.nombre}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                Mi Perfil
              </DropdownMenuItem>
              
              {isAdmin && (
                <DropdownMenuItem className="cursor-pointer">
                  <Shield className="mr-2 h-4 w-4" />
                  Administracion
                </DropdownMenuItem>
              )}
              
              {!isAdmin && (
                <DropdownMenuItem className="cursor-pointer">
                  <Music className="mr-2 h-4 w-4" />
                  Mis Instrumentos
                </DropdownMenuItem>
              )}
              
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                Configuracion
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem 
                className="cursor-pointer text-destructive focus:text-destructive"
                onClick={handleSignOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar Sesion
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
