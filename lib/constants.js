// Instrumentos disponibles en la academia BitH
export const INSTRUMENTOS = [
  { id: 'piano', nombre: 'Piano', icono: 'Piano' },
  { id: 'bajo', nombre: 'Bajo', icono: 'Guitar' },
  { id: 'tecnica-vocal', nombre: 'Tecnica Vocal', icono: 'Mic' },
  { id: 'bateria', nombre: 'Bateria', icono: 'Drum' },
  { id: 'guitarra', nombre: 'Guitarra', icono: 'Music' },
  { id: 'violin', nombre: 'Violin', icono: 'Music2' },
  { id: 'acordeon', nombre: 'Acordeon', icono: 'Music3' },
]

// Roles del sistema
export const ROLES = {
  ADMIN: 'admin',
  PROFESOR: 'profesor',
}

// Estados de pago
export const ESTADOS_PAGO = {
  PENDIENTE: 'pendiente',
  PAGADO: 'pagado',
  VENCIDO: 'vencido',
}

// Estados de clase
export const ESTADOS_CLASE = {
  PROGRAMADA: 'programada',
  COMPLETADA: 'completada',
  CANCELADA: 'cancelada',
}

// Colores de la marca BitH
export const BRAND_COLORS = {
  primary: '#7204f9',
  white: '#ffffff',
  dark: '#0f0a1a',
}

// Nombre de la academia
export const ACADEMY_NAME = 'BitH'
export const ACADEMY_SLOGAN = 'TALENTO A TU HOGAR'
