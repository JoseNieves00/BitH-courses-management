'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential
} from 'firebase/auth'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'

const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser)
        // Obtener datos adicionales del usuario desde Firestore
        const userDoc = await getDoc(doc(db, 'usuarios', firebaseUser.uid))
        if (userDoc.exists()) {
          setUserData(userDoc.data())
        }
      } else {
        setUser(null)
        setUserData(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signIn = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      const userDoc = await getDoc(doc(db, 'usuarios', result.user.uid))
      
      if (userDoc.exists()) {
        const data = userDoc.data()
        setUserData(data)
        return { success: true, requiresPasswordChange: data.requiereCambioPassword }
      }
      
      return { success: true, requiresPasswordChange: false }
    } catch (error) {
      console.error('Error al iniciar sesion:', error)
      throw error
    }
  }

  const signOut = async () => {
    try {
      await firebaseSignOut(auth)
      setUser(null)
      setUserData(null)
    } catch (error) {
      console.error('Error al cerrar sesion:', error)
      throw error
    }
  }

  const changePassword = async (currentPassword, newPassword) => {
    try {
      const credential = EmailAuthProvider.credential(user.email, currentPassword)
      await reauthenticateWithCredential(user, credential)
      await updatePassword(user, newPassword)
      
      // Actualizar flag en Firestore
      await updateDoc(doc(db, 'usuarios', user.uid), {
        requiereCambioPassword: false
      })
      
      setUserData(prev => ({ ...prev, requiereCambioPassword: false }))
      return { success: true }
    } catch (error) {
      console.error('Error al cambiar contraseña:', error)
      throw error
    }
  }

  const value = {
    user,
    userData,
    loading,
    signIn,
    signOut,
    changePassword,
    isAdmin: userData?.rol === 'admin',
    isProfesor: userData?.rol === 'profesor',
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider')
  }
  return context
}
