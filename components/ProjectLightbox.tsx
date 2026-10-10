'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { ImageItem, Project } from '@/lib/getProjects'

const FLIP_DURATION_MS = 650

const BTN: React.CSSProperties = {
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  width: 44, height: 44, borderRadius: 999,
  border: 0, background: 'rgba(255,255,255,0.15)', color: '#fff',
  fontSize: 20, flexShrink: 0,
  backdropFilter: 'blur(4px)',
  transition: 'background .15s',
}

function Page({ img, side }: { img?: ImageItem; side: 'left' | 'right' }) {
  return (
    <div style={{ flex: 1, width: '100%', height: '100%', position: 'relative', overflow: 'hidden', background: '#f3efe4' }}>
      {img && (
        <img
          src={img.src}
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
        />
      )}
      {/* spine shadow */}
      <div style={{
        position: 'absolute', top: 0, bottom: 0, width: 36,
        [side === 'left' ? 'right' : 'left']: 0,
        background: side === 'left'
          ? 'linear-gradient(to right, transparent, rgba(0,0,0,0.22))'
          : 'linear-gradient(to left, transparent, rgba(0,0,0,0.22))',
        pointerEvents: 'none',
      } as React.CSSProperties} />
    </div>
  )
}

function BookView({
  project,
  initialIndex,
  onClose,
}: {
  project: Project
  initialIndex: number
  onClose: () => void
}) {
  const spreads = useMemo(() => {
    const out: [ImageItem | undefined, ImageItem | undefined][] = []
    for (let i = 0; i < project.images.length; i += 2) {
      out.push([project.images[i], project.images[i + 1]])
    }
    return out
  }, [project.images])

  const total = spreads.length
  // Two pages side by side, in the pages' own proportions — not a hardcoded guess.
  const firstPage = project.images[0]
  const spreadAspect = firstPage ? (2 * firstPage.width) / firstPage.height : 2.82

  const [spreadIndex, setSpreadIndex] = useState(Math.floor(initialIndex / 2))
  const [flip, setFlip] = useState<{ dir: 1 | -1; from: number; to: number } | null>(null)
  const [flipActive, setFlipActive] = useState(false)
  const flipTokenRef = useRef(0)

  const goTo = (dir: 1 | -1) => {
    if (flip) return
    const to = spreadIndex + dir
    if (to < 0 || to >= total) return
    setFlip({ dir, from: spreadIndex, to })
  }

  const commitFlip = (to: number, token: number) => {
    if (token !== flipTokenRef.current) return // a newer flip already took over
    setSpreadIndex(to)
    setFlip(null)
    // Without this, the next flip's fresh overlay would mount already at
    // flipActive=true (leftover from this one) and jump straight to its end
    // position with nothing to visibly transition from.
    setFlipActive(false)
  }

  useEffect(() => {
    if (!flip) return
    flipTokenRef.current += 1
    const token = flipTokenRef.current
    setFlipActive(false)
    // Double rAF: the first guarantees a paint has happened with flipActive
    // still false before the second one flips it true — single rAF can
    // occasionally land before that paint, in which case the CSS transition
    // has nothing to animate from and the leaf just jumps to its end state.
    let raf2 = 0
    const raf = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setFlipActive(true))
    })
    // transitionend can fail to fire (reduced-motion, tab backgrounding,
    // some headless browsers) — a timer guarantees navigation never sticks.
    const fallback = setTimeout(() => commitFlip(flip.to, token), FLIP_DURATION_MS + 120)
    return () => {
      cancelAnimationFrame(raf)
      cancelAnimationFrame(raf2)
      clearTimeout(fallback)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flip])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') goTo(-1)
      if (e.key === 'ArrowRight') goTo(1)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClose, flip, spreadIndex, total])

  // The page not being turned updates right away (it was always "underneath").
  // The page being turned keeps showing its old side until the leaf lands on it.
  const leftStatic = !flip
    ? spreads[spreadIndex]?.[0]
    : flip.dir === 1 ? spreads[flip.from]?.[0] : spreads[flip.to]?.[0]
  const rightStatic = !flip
    ? spreads[spreadIndex]?.[1]
    : flip.dir === 1 ? spreads[flip.to]?.[1] : spreads[flip.from]?.[1]

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 2000,
        background: 'rgba(10,10,10,0.95)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        animation: 'lb-fade .2s ease',
      }}
    >
      <button
        onClick={(e) => { e.stopPropagation(); onClose() }}
        style={{ ...BTN, position: 'absolute', top: 20, right: 20, fontSize: 22 }}
      >
        ×
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); goTo(-1) }}
        style={{
          ...BTN,
          position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)',
          visibility: spreadIndex > 0 ? 'visible' : 'hidden',
        }}
      >
        ←
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '92vw' }}
      >
        <div
          style={{
            position: 'relative',
            width: `min(92vw, 78vh * ${spreadAspect})`,
            aspectRatio: String(spreadAspect),
            perspective: 3600,
            boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
            borderRadius: 3,
            // Keeps the flipping leaf's 3D perspective flare from ever
            // visually (or if a browser mis-hit-tests it, interactively)
            // spilling outside the book's own rectangle.
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', inset: 0, display: 'flex', borderRadius: 3, overflow: 'hidden' }}>
            <Page img={leftStatic} side="left" />
            <Page img={rightStatic} side="right" />
          </div>

          {flip && (() => {
            const forward = flip.dir === 1
            // The single leaf that's turning: its front is the page currently
            // showing, its back is the page revealed on the far side once it lands.
            const frontImg = forward ? spreads[flip.from]?.[1] : spreads[flip.from]?.[0]
            const backImg = forward ? spreads[flip.to]?.[0] : spreads[flip.to]?.[1]
            return (
              <div
                style={{
                  position: 'absolute', top: 0, bottom: 0,
                  left: forward ? '50%' : 0, width: '50%',
                  transformStyle: 'preserve-3d',
                  transformOrigin: forward ? 'left center' : 'right center',
                  transform: `rotateY(${flipActive ? (forward ? -180 : 180) : 0}deg)`,
                  transition: `transform ${FLIP_DURATION_MS}ms cubic-bezier(.4,.1,.2,1)`,
                  boxShadow: '0 0 30px rgba(0,0,0,0.5)',
                  // Decorative only — must never be able to sit on top of and
                  // swallow clicks meant for the nav arrows or close button.
                  pointerEvents: 'none',
                }}
                onTransitionEnd={() => commitFlip(flip.to, flipTokenRef.current)}
              >
                <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', overflow: 'hidden' }}>
                  <Page img={frontImg} side={forward ? 'right' : 'left'} />
                </div>
                <div style={{
                  position: 'absolute', inset: 0,
                  backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', overflow: 'hidden',
                }}>
                  <Page img={backImg} side={forward ? 'left' : 'right'} />
                </div>
              </div>
            )
          })()}
        </div>

        <div style={{ marginTop: 18, textAlign: 'center' }}>
          <div style={{ fontFamily: "'Kyiv Region', serif", fontSize: 20, color: 'rgba(255,255,255,0.92)' }}>
            {project.title}
          </div>
          <div style={{
            fontFamily: 'var(--font-dm-mono), monospace', fontSize: 11,
            letterSpacing: '0.12em', color: 'rgba(255,255,255,0.5)', marginTop: 6,
          }}>
            pages {spreadIndex * 2 + 1}–{Math.min(spreadIndex * 2 + 2, project.images.length)} / {project.images.length}
          </div>
        </div>
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); goTo(1) }}
        style={{
          ...BTN,
          position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)',
          visibility: spreadIndex < total - 1 ? 'visible' : 'hidden',
        }}
      >
        →
      </button>
    </div>
  )
}

export function ProjectLightbox({
  project,
  initialIndex,
  onClose,
}: {
  project: Project
  initialIndex: number
  onClose: () => void
}) {
  if (project.book) {
    return <BookView project={project} initialIndex={initialIndex} onClose={onClose} />
  }

  return <SingleImageView project={project} initialIndex={initialIndex} onClose={onClose} />
}

function SingleImageView({
  project,
  initialIndex,
  onClose,
}: {
  project: Project
  initialIndex: number
  onClose: () => void
}) {
  const [idx, setIdx] = useState(initialIndex)
  const total = project.images.length

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') setIdx((i) => (i > 0 ? i - 1 : i))
      if (e.key === 'ArrowRight') setIdx((i) => (i < total - 1 ? i + 1 : i))
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, total])

  const img = project.images[idx]

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 2000,
        background: 'rgba(10,10,10,0.95)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        animation: 'lb-fade .2s ease',
      }}
    >
      {/* × close */}
      <button
        onClick={(e) => { e.stopPropagation(); onClose() }}
        style={{ ...BTN, position: 'absolute', top: 20, right: 20, fontSize: 22 }}
      >
        ×
      </button>

      {/* Left arrow */}
      <button
        onClick={(e) => { e.stopPropagation(); setIdx(idx - 1) }}
        style={{
          ...BTN,
          position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)',
          visibility: idx > 0 ? 'visible' : 'hidden',
        }}
      >
        ←
      </button>

      {/* Image + caption */}
      <figure
        onClick={(e) => e.stopPropagation()}
        style={{ margin: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '90vw' }}
      >
        <img
          src={img.src}
          alt={`${project.title} — image ${idx + 1}`}
          style={{
            maxWidth: '90vw', maxHeight: '78vh',
            objectFit: 'contain', borderRadius: 4,
            display: 'block', cursor: 'default',
          }}
        />
        <figcaption style={{ marginTop: 18, textAlign: 'center' }}>
          <div style={{ fontFamily: "'Kyiv Region', serif", fontSize: 20, color: 'rgba(255,255,255,0.92)' }}>
            {project.title}
          </div>
          <div style={{
            fontFamily: 'var(--font-dm-mono), monospace', fontSize: 11,
            letterSpacing: '0.12em', color: 'rgba(255,255,255,0.5)', marginTop: 6,
          }}>
            {String(idx + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </div>
        </figcaption>
      </figure>

      {/* Right arrow */}
      <button
        onClick={(e) => { e.stopPropagation(); setIdx(idx + 1) }}
        style={{
          ...BTN,
          position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)',
          visibility: idx < total - 1 ? 'visible' : 'hidden',
        }}
      >
        →
      </button>
    </div>
  )
}
