'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

export function RecentTable({ 
  title, 
  description, 
  data = [], 
  columns = [],
  emptyMessage = 'No hay datos disponibles',
  maxHeight = '300px'
}) {
  const getInitials = (name) => {
    if (!name) return '?'
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const getBadgeVariant = (status) => {
    switch (status?.toLowerCase()) {
      case 'activo':
      case 'pagado':
      case 'completada':
        return 'default'
      case 'pendiente':
      case 'programada':
        return 'secondary'
      case 'inactivo':
      case 'vencido':
      case 'cancelada':
        return 'destructive'
      default:
        return 'outline'
    }
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{title}</CardTitle>
        {description && (
          <CardDescription>{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="p-0">
        {data.length === 0 ? (
          <div className="flex items-center justify-center h-32 text-muted-foreground">
            {emptyMessage}
          </div>
        ) : (
          <ScrollArea style={{ maxHeight }} className="px-6 pb-6">
            <div className="space-y-4">
              {data.map((item, index) => (
                <div
                  key={item.id || index}
                  className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <Avatar className="h-10 w-10 bg-primary/10 border border-primary/20">
                    <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                      {getInitials(item.nombre || item.estudiante || item.profesor)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {item.nombre || item.estudiante || item.profesor}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {item.email || item.instrumento || item.descripcion}
                    </p>
                  </div>
                  
                  {item.estado && (
                    <Badge 
                      variant={getBadgeVariant(item.estado)}
                      className={cn(
                        'text-xs',
                        item.estado.toLowerCase() === 'activo' && 'bg-success/10 text-success border-success/20',
                        item.estado.toLowerCase() === 'pagado' && 'bg-success/10 text-success border-success/20',
                        item.estado.toLowerCase() === 'pendiente' && 'bg-warning/10 text-warning border-warning/20'
                      )}
                    >
                      {item.estado}
                    </Badge>
                  )}
                  
                  {item.monto && (
                    <span className="text-sm font-semibold text-foreground">
                      ${item.monto.toLocaleString()}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  )
}
