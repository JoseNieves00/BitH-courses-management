'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { 
  Search, 
  MoreHorizontal, 
  Eye, 
  Pencil, 
  Trash2,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export function DataTable({
  title,
  data = [],
  columns = [],
  loading = false,
  searchPlaceholder = 'Buscar...',
  onView,
  onEdit,
  onDelete,
  actions = true,
  pagination = true,
  itemsPerPage = 10,
  emptyMessage = 'No hay datos disponibles',
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  // Filter data based on search
  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage)

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
    const statusLower = status?.toLowerCase()
    if (['activo', 'pagado', 'completada'].includes(statusLower)) {
      return 'bg-success/10 text-success border-success/20'
    }
    if (['pendiente', 'programada'].includes(statusLower)) {
      return 'bg-warning/10 text-warning border-warning/20'
    }
    if (['inactivo', 'vencido', 'cancelada'].includes(statusLower)) {
      return 'bg-destructive/10 text-destructive border-destructive/20'
    }
    return ''
  }

  const renderCell = (item, column) => {
    const value = item[column.key]

    if (column.type === 'avatar') {
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 bg-primary/10 border border-primary/20">
            <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
              {getInitials(value)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{value}</p>
            {column.subKey && (
              <p className="text-xs text-muted-foreground">{item[column.subKey]}</p>
            )}
          </div>
        </div>
      )
    }

    if (column.type === 'badge') {
      return (
        <Badge variant="outline" className={cn('font-medium', getBadgeVariant(value))}>
          {value}
        </Badge>
      )
    }

    if (column.type === 'date') {
      return new Date(value).toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    }

    if (column.type === 'currency') {
      return `$${Number(value).toLocaleString('es-CO')}`
    }

    return value
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-48" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-10 w-full" />
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      {title && (
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="text-xl">{title}</CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1)
                }}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
      )}
      <CardContent className="p-0 sm:p-6 sm:pt-0">
        {filteredData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">{emptyMessage}</p>
          </div>
        ) : (
          <>
            {/* Mobile View */}
            <div className="sm:hidden space-y-3 p-4">
              {paginatedData.map((item, index) => (
                <div
                  key={item.id || index}
                  className="bg-muted/30 rounded-lg p-4 space-y-3"
                >
                  {columns.map((column) => (
                    <div key={column.key} className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{column.label}</span>
                      <span className="text-sm font-medium">
                        {renderCell(item, column)}
                      </span>
                    </div>
                  ))}
                  {actions && (
                    <div className="flex gap-2 pt-2 border-t border-border">
                      {onView && (
                        <Button size="sm" variant="outline" onClick={() => onView(item)} className="flex-1">
                          <Eye className="h-4 w-4 mr-1" /> Ver
                        </Button>
                      )}
                      {onEdit && (
                        <Button size="sm" variant="outline" onClick={() => onEdit(item)} className="flex-1">
                          <Pencil className="h-4 w-4 mr-1" /> Editar
                        </Button>
                      )}
                      {onDelete && (
                        <Button size="sm" variant="destructive" onClick={() => onDelete(item)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop View */}
            <div className="hidden sm:block overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    {columns.map((column) => (
                      <TableHead key={column.key} className={column.className}>
                        {column.label}
                      </TableHead>
                    ))}
                    {actions && <TableHead className="w-[80px]">Acciones</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedData.map((item, index) => (
                    <TableRow key={item.id || index} className="hover:bg-muted/50">
                      {columns.map((column) => (
                        <TableCell key={column.key} className={column.className}>
                          {renderCell(item, column)}
                        </TableCell>
                      ))}
                      {actions && (
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {onView && (
                                <DropdownMenuItem onClick={() => onView(item)}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  Ver detalles
                                </DropdownMenuItem>
                              )}
                              {onEdit && (
                                <DropdownMenuItem onClick={() => onEdit(item)}>
                                  <Pencil className="mr-2 h-4 w-4" />
                                  Editar
                                </DropdownMenuItem>
                              )}
                              {onDelete && (
                                <>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    onClick={() => onDelete(item)}
                                    className="text-destructive focus:text-destructive"
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Eliminar
                                  </DropdownMenuItem>
                                </>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {pagination && totalPages > 1 && (
              <div className="flex items-center justify-between p-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Mostrando {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredData.length)} de {filteredData.length}
                </p>
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 bg-transparent"
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronsLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 bg-transparent"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="px-3 text-sm font-medium">
                    {currentPage} / {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 bg-transparent"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 bg-transparent"
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronsRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}
