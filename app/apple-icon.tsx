import { ImageResponse } from 'next/og'
import fs from 'fs'
import path from 'path'

// Home-screen icon for iPhone/iPad: the hover leaf on white
// (iOS would otherwise fill the transparent background with black).
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  const leaf = fs.readFileSync(path.join(process.cwd(), 'public', 'cursor-hover.png'))
  const src = `data:image/png;base64,${leaf.toString('base64')}`
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ffffff' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} width={128} height={128} alt="" />
      </div>
    ),
    size,
  )
}
