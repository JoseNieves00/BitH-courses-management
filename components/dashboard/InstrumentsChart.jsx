'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

const COLORS = ['#7204f9', '#a855f7', '#c084fc', '#10b981', '#f59e0b', '#ef4444', '#3b82f6']

const defaultData = [
  { name: 'Piano', value: 25, estudiantes: 25 },
  { name: 'Guitarra', value: 20, estudiantes: 20 },
  { name: 'Bateria', value: 15, estudiantes: 15 },
  { name: 'Violin', value: 12, estudiantes: 12 },
  { name: 'Bajo', value: 10, estudiantes: 10 },
  { name: 'Vocal', value: 10, estudiantes: 10 },
  { name: 'Acordeon', value: 8, estudiantes: 8 },
]

export function InstrumentsChart({ data = defaultData }) {
  const total = data.reduce((sum, item) => sum + item.value, 0)

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload
      return (
        <div className="bg-popover border border-border rounded-lg shadow-lg p-3">
          <p className="font-medium text-foreground">{item.name}</p>
          <p className="text-sm text-muted-foreground">
            {item.estudiantes} estudiantes ({((item.value / total) * 100).toFixed(1)}%)
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Distribucion por Instrumento</CardTitle>
        <CardDescription>Estudiantes activos por instrumento</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]}
                    stroke="none"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="bottom"
                height={36}
                formatter={(value) => (
                  <span className="text-sm text-muted-foreground">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 text-center">
          <p className="text-2xl font-bold text-foreground">{total}</p>
          <p className="text-sm text-muted-foreground">Total de estudiantes</p>
        </div>
      </CardContent>
    </Card>
  )
}
