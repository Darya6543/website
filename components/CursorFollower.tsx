'use client'

import { useEffect, useRef } from 'react'

export function CursorFollower() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let targetX = -200, targetY = -200
    let currentX = -200, currentY = -200
    let rafId: number

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX
      targetY = e.clientY
    }

    const tick = () => {
      // Lerp: follows with a slight lag for a floaty feel
      currentX += (targetX - currentX) * 0.1
      currentY += (targetY - currentY) * 0.1

      if (ref.current) {
        // Offset so the bee hovers just beside the cursor, not on top of it
        ref.current.style.transform = `translate(${currentX + 16}px, ${currentY + 10}px)`
      }

      rafId = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        willChange: 'transform',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/bee.png" alt="" width={40} height={40} style={{ transform: 'rotate(-20deg)', display: 'block' }} />
    </div>
  )
}
