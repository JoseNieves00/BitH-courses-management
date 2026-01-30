'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { ChangePasswordForm } from '@/components/auth/ChangePasswordForm'
import { Loader2 } from 'lucide-react'

export default function CambiarPasswordPage() {
  const { user, userData, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/')
      } else if (userData && !userData.requiereCambioPassword) {
        router.push('/dashboard')
      }
    }
  }, [user, userData, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return <ChangePasswordForm />
}
