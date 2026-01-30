'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Sidebar } from '@/components/dashboard/Sidebar'
import { Header } from '@/components/dashboard/Header'
import { MobileSidebar } from '@/components/dashboard/MobileSidebar'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function DashboardLayout({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, userData, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (!loading && userData?.requiereCambioPassword) {
      router.push('/cambiar-password')
    }
  }, [userData, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center animate-pulse">
            <span className="text-2xl font-bold text-white">B</span>
          </div>
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Cargando dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Header */}
      <Header
        onMenuClick={() => setMobileMenuOpen(true)}
        sidebarCollapsed={sidebarCollapsed}
      />

      {/* Main Content */}
      <main
        className={cn(
          'pt-16 min-h-screen transition-all duration-300',
          'lg:pl-64',
          sidebarCollapsed && 'lg:pl-[72px]'
        )}
      >
        <div className="p-4 lg:p-6">
          {children}
        </div>
      </main>
    </div>
  )
}
