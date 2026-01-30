'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { LoginForm } from '@/components/auth/LoginForm'
import { Loader2 } from 'lucide-react'

export default function HomePage() {
  const { user, userData, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user && userData) {
      if (userData.requiereCambioPassword) {
        router.push('/cambiar-password')
      } else {
        router.push('/dashboard')
      }
    }
  }, [user, userData, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center animate-pulse">
            <span className="text-2xl font-bold text-white">B</span>
          </div>
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Cargando...</p>
        </div>
      </div>
    )
  }

  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return <LoginForm />
}
