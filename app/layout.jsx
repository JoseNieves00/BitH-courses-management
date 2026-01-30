import { Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { AuthProvider } from '@/contexts/AuthContext'
import { Toaster } from '@/components/ui/toaster-custom'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
})

const geistMono = Geist_Mono({ 
  subsets: ['latin'],
  variable: '--font-geist-mono'
})

export const metadata = {
  title: 'BitH - Talento a tu Hogar | Sistema de Gestion',
  description: 'Sistema de administracion y gestion de clases de musica para la academia BitH - Talento a tu Hogar',
  keywords: ['musica', 'clases', 'academia', 'gestion', 'BitH'],
    generator: 'v0.app'
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#7204f9' },
    { media: '(prefers-color-scheme: dark)', color: '#0f0a1a' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <AuthProvider>
            {children}
            <Toaster position="top-right" richColors closeButton />
          </AuthProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
