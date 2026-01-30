'use client'

import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export function StatCard({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  trend, 
  trendValue,
  className 
}) {
  return (
    <Card className={cn(
      'relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1',
      className
    )}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
            {trend && (
              <div className={cn(
                'flex items-center gap-1 text-xs font-medium',
                trend === 'up' ? 'text-success' : 'text-destructive'
              )}>
                <span>{trend === 'up' ? '+' : '-'}{trendValue}</span>
                <span className="text-muted-foreground">vs mes anterior</span>
              </div>
            )}
          </div>
          
          {Icon && (
            <div className="p-3 bg-primary/10 rounded-xl">
              <Icon className="h-6 w-6 text-primary" />
            </div>
          )}
        </div>
        
        {/* Decorative gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50" />
      </CardContent>
    </Card>
  )
}
