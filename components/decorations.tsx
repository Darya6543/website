'use client'

import React from 'react'

interface DecorProps {
  size?: number
  color?: string
  rotate?: number
  style?: React.CSSProperties
}

export const Sprig = ({ size = 40, color = '#5b6b3a', rotate = 0, style }: DecorProps) => (
  <svg width={size} height={size} viewBox="0 0 40 40"
    style={{ transform: `rotate(${rotate}deg)`, ...style }}
    fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round">
    <path d="M20 4 Q 20 22 20 36" />
    <path d="M20 12 Q 12 11 9 7" />
    <path d="M20 16 Q 28 15 31 11" />
    <path d="M20 22 Q 12 22 9 18" />
    <path d="M20 26 Q 28 26 31 22" />
  </svg>
)

export const Berry = ({ size = 32, color = '#7a2942', rotate = 0, style }: DecorProps) => (
  <svg width={size} height={size} viewBox="0 0 32 32"
    style={{ transform: `rotate(${rotate}deg)`, ...style }}>
    <circle cx="11" cy="20" r="5" fill={color} />
    <circle cx="21" cy="22" r="5" fill={color} opacity="0.85" />
    <circle cx="16" cy="14" r="5" fill={color} opacity="0.92" />
    <path d="M16 9 Q 18 4 22 4" stroke="#3d5a2c" strokeWidth="1.4" strokeLinecap="round" fill="none" />
    <path d="M14 8 Q 12 4 9 5" stroke="#3d5a2c" strokeWidth="1.4" strokeLinecap="round" fill="none" />
  </svg>
)

export const Mushroom = ({ size = 36, color = '#9a4b2c', rotate = 0, style }: DecorProps) => (
  <svg width={size} height={size} viewBox="0 0 36 36"
    style={{ transform: `rotate(${rotate}deg)`, ...style }}>
    <path d="M5 18 Q 5 7 18 7 Q 31 7 31 18 Z" fill={color} />
    <circle cx="13" cy="13" r="1.6" fill="#f0eee9" />
    <circle cx="22" cy="11" r="1.2" fill="#f0eee9" />
    <circle cx="19" cy="16" r="1.4" fill="#f0eee9" />
    <rect x="14" y="18" width="8" height="13" rx="3" fill="#e9dfc8" />
  </svg>
)

export const Leaf = ({ size = 40, color = '#5b6b3a', rotate = 0, style }: DecorProps) => (
  <svg width={size} height={size} viewBox="0 0 40 40"
    style={{ transform: `rotate(${rotate}deg)`, ...style }}>
    <path d="M6 32 Q 8 8 32 6 Q 30 30 6 32 Z" fill={color} />
    <path d="M8 30 Q 20 20 30 8" stroke="#f0eee9" strokeWidth="1" fill="none" opacity="0.6" />
  </svg>
)

export const Snail = ({ size = 44, color = '#a86b2c', rotate = 0, style }: DecorProps) => (
  <svg width={size} height={size} viewBox="0 0 44 44"
    style={{ transform: `rotate(${rotate}deg)`, ...style }}
    fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 30 Q 6 36 14 36 L 30 36 Q 38 36 38 30" />
    <path d="M30 36 Q 30 18 22 18 Q 14 18 14 26 Q 14 32 20 32 Q 24 32 24 28 Q 24 24 21 24" />
    <path d="M38 30 Q 39 26 41 26" />
    <path d="M38 26 Q 39 22 41 22" />
  </svg>
)

export const Bird = ({ size = 44, color = '#b88a2c', rotate = 0, style }: DecorProps) => (
  <svg width={size} height={size} viewBox="0 0 44 44"
    style={{ transform: `rotate(${rotate}deg)`, ...style }}>
    <path d="M8 26 Q 14 14 26 16 Q 36 18 36 26 Q 32 32 22 32 Q 12 32 8 26 Z" fill={color} />
    <circle cx="30" cy="22" r="1.4" fill="#2a251f" />
    <path d="M36 24 L 42 22 L 38 27 Z" fill="#7a4a1c" />
    <path d="M22 32 L 20 38" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    <path d="M26 32 L 25 38" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
  </svg>
)

export const Flower = ({ size = 36, color = '#7a2942', rotate = 0, style }: DecorProps) => (
  <svg width={size} height={size} viewBox="0 0 36 36"
    style={{ transform: `rotate(${rotate}deg)`, ...style }}>
    {[0, 1, 2, 3, 4].map((i) => (
      <ellipse key={i} cx="18" cy="10" rx="4" ry="6" fill={color}
        transform={`rotate(${i * 72} 18 18)`} opacity="0.9" />
    ))}
    <circle cx="18" cy="18" r="3" fill="#b88a2c" />
  </svg>
)

export const Pomegranate = ({ size = 40, color = '#7a2942', rotate = 0, style }: DecorProps) => (
  <svg width={size} height={size} viewBox="0 0 40 40"
    style={{ transform: `rotate(${rotate}deg)`, ...style }}>
    <circle cx="20" cy="22" r="13" fill={color} />
    <path d="M20 9 L 16 4 M 20 9 L 24 4 M 20 9 L 20 3"
      stroke="#3d5a2c" strokeWidth="1.6" strokeLinecap="round" fill="none" />
    <circle cx="16" cy="20" r="1" fill="#f0eee9" opacity="0.7" />
    <circle cx="22" cy="22" r="1" fill="#f0eee9" opacity="0.7" />
    <circle cx="19" cy="26" r="1" fill="#f0eee9" opacity="0.7" />
  </svg>
)

export const Fern = ({ size = 50, color = '#3d5a2c', rotate = 0, style }: DecorProps) => (
  <svg width={size} height={size} viewBox="0 0 50 50"
    style={{ transform: `rotate(${rotate}deg)`, ...style }}
    fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round">
    <path d="M25 4 L 25 46" />
    {[8, 14, 20, 26, 32, 38].map((y, i) => {
      const r = 14 - i * 1.6
      return (
        <g key={i}>
          <path d={`M25 ${y} Q ${25 - r / 2} ${y - r / 3} ${25 - r} ${y + 1}`} />
          <path d={`M25 ${y} Q ${25 + r / 2} ${y - r / 3} ${25 + r} ${y + 1}`} />
        </g>
      )
    })}
  </svg>
)

export const Star = ({ size = 18, color = '#b88a2c', rotate = 0, style }: DecorProps) => (
  <svg width={size} height={size} viewBox="0 0 18 18"
    style={{ transform: `rotate(${rotate}deg)`, ...style }}>
    <path d="M9 1 L 11 7 L 17 9 L 11 11 L 9 17 L 7 11 L 1 9 L 7 7 Z" fill={color} />
  </svg>
)

export const Squiggle = ({
  width = 60,
  color = '#7a2942',
  style,
}: {
  width?: number
  color?: string
  style?: React.CSSProperties
}) => (
  <svg width={width} height="12" viewBox="0 0 60 12" style={style}
    fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round">
    <path d="M2 6 Q 8 1 14 6 T 26 6 T 38 6 T 50 6 T 58 6" />
  </svg>
)

