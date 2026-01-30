'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'

export function Logo({ className, size = 'md', showText = true }) {
  const sizes = {
    sm: { img: 32, text: 'text-lg' },
    md: { img: 48, text: 'text-xl' },
    lg: { img: 64, text: 'text-2xl' },
    xl: { img: 96, text: 'text-3xl' },
  }

  const currentSize = sizes[size] || sizes.md

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className="relative overflow-hidden rounded-lg">
        <Image
          src="/logo-bith.png"
          alt="BitH - Talento a tu Hogar"
          width={currentSize.img}
          height={currentSize.img}
          className="object-contain"
          priority
        />
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={cn('font-bold text-primary', currentSize.text)}>
            BitH
          </span>
          <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
            Talento a tu Hogar
          </span>
        </div>
      )}
    </div>
  )
}
