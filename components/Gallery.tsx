'use client'

import { useEffect, useRef, useState } from 'react'
import type { Project } from '@/lib/getProjects'
import { ProjectLightbox } from './ProjectLightbox'

// Every image preview uses this exact box, regardless of the source image's
// own aspect ratio — object-fit: cover zooms/crops it in to fill the box.
// Book pages are the exception (see TiltCard): original proportions, uncropped.
const CARD_WIDTH = 280
const CARD_HEIGHT = 360

const ArrowIcon = ({ direction }: { direction: 'left' | 'right' }) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path
      d={direction === 'right' ? 'M3 9h12M10 4l5 5-5 5' : 'M15 9H3M8 4L3 9l5 5'}
      stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
    />
  </svg>
)

const MAX_TILT = 8 // degrees — kept subtle ("minimal") rather than a full card flip

function TiltCard({
  src,
  alt,
  onClick,
  ratio,
}: {
  src: string
  alt: string
  onClick: () => void
  ratio?: number // present for book pages — keeps their own proportions, uncropped
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const glossRef = useRef<HTMLDivElement>(null)
  const width = ratio ? Math.round(CARD_HEIGHT * ratio) : CARD_WIDTH

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    const rotateY = (px - 0.5) * 2 * MAX_TILT
    const rotateX = (0.5 - py) * 2 * MAX_TILT
    el.style.transform = `perspective(800px) scale(1.18) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    // Glossy sheen follows the cursor across the cover.
    if (glossRef.current) {
      glossRef.current.style.background =
        `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.5), transparent 55%)`
    }
  }

  const handleMouseLeave = () => {
    const el = cardRef.current
    if (!el) return
    el.style.transform = 'perspective(800px) scale(1) rotateX(0deg) rotateY(0deg)'
    el.style.boxShadow = '0 0 0 rgba(0,0,0,0)'
    el.style.zIndex = '0'
    if (glossRef.current) glossRef.current.style.opacity = '0'
  }

  const handleMouseEnter = () => {
    const el = cardRef.current
    if (!el) return
    el.style.boxShadow = '0 16px 32px rgba(0,0,0,0.28)'
    el.style.zIndex = '2' // grow above neighboring cards instead of under them
    if (glossRef.current) glossRef.current.style.opacity = '1'
  }

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="cursor-zoom-hover"
      style={{
        position: 'relative',
        zIndex: 0,
        height: CARD_HEIGHT,
        width,
        flexShrink: 0,
        borderRadius: 10,
        background: '#efefef',
        scrollSnapAlign: 'start',
        transform: 'perspective(800px) scale(1) rotateX(0deg) rotateY(0deg)',
        transition: 'transform 150ms ease-out, box-shadow 200ms ease-out',
        willChange: 'transform',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: 10 }}>
        <img
          src={src}
          alt={alt}
          style={{
            width: '100%', height: '100%', display: 'block', pointerEvents: 'none',
            objectFit: ratio ? 'contain' : 'cover',
          }}
        />
        <div
          ref={glossRef}
          style={{
            position: 'absolute', inset: 0,
            opacity: 0, transition: 'opacity 200ms ease-out',
            pointerEvents: 'none', mixBlendMode: 'overlay',
          }}
        />
      </div>
    </div>
  )
}

function CollectionRow({
  project,
  registerRef,
  onImageClick,
}: {
  project: Project
  registerRef: (id: string, el: HTMLElement | null) => void
  onImageClick: (project: Project, index: number) => void
}) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const updateArrows = () => {
    const el = scrollerRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 4)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4)
  }

  useEffect(() => {
    updateArrows()
    window.addEventListener('resize', updateArrows)
    return () => window.removeEventListener('resize', updateArrows)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const scrollByPage = (dir: 1 | -1) => {
    const el = scrollerRef.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' })
  }

  return (
    <div
      ref={(el) => registerRef(project.id, el)}
      data-project-id={project.id}
      style={{ position: 'relative', padding: '4px 0' }}
    >
      <div
        ref={scrollerRef}
        onScroll={updateArrows}
        className="collection-scroller"
        style={{
          display: 'flex', gap: 32, overflowX: 'auto',
          // overflowX:auto forces overflowY to clip too, so this still has to
          // fully contain the (now bigger) hover scale-up + shadow.
          padding: '56px 90px 90px 90px',
          scrollSnapType: 'x mandatory',
          scrollPaddingLeft: 90,
          scrollPaddingRight: 90,
        }}
      >
        {project.images.map((img, i) => (
          <TiltCard
            key={i}
            src={img.cover ?? img.src}
            alt={`${project.title} — image ${i + 1}`}
            ratio={project.book ? img.width / img.height : undefined}
            onClick={() => onImageClick(project, i)}
          />
        ))}
      </div>

      {canScrollLeft && (
        <button
          onClick={() => scrollByPage(-1)}
          className="collection-arrow"
          aria-label="previous images"
          style={ARROW_STYLE_LEFT}
        >
          <ArrowIcon direction="left" />
        </button>
      )}

      {canScrollRight && (
        <button
          onClick={() => scrollByPage(1)}
          className="collection-arrow"
          aria-label="more images"
          style={ARROW_STYLE_RIGHT}
        >
          <ArrowIcon direction="right" />
        </button>
      )}
    </div>
  )
}

const ARROW_BASE: React.CSSProperties = {
  // Row padding is asymmetric (top 56 / bottom 90, to fit the hover shadow),
  // so the true card center sits above the box's own 50% mark.
  position: 'absolute', top: 'calc(50% - 17px)', transform: 'translateY(-50%)',
  width: 44, height: 44, borderRadius: '50%',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  background: '#fff', border: '1px solid #141414', color: '#141414',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
}
const ARROW_STYLE_LEFT: React.CSSProperties = { ...ARROW_BASE, left: 4 }
const ARROW_STYLE_RIGHT: React.CSSProperties = { ...ARROW_BASE, right: 4 }

export function Gallery({ projects }: { projects: Project[] }) {
  const [activeId, setActiveId] = useState(projects[0]?.id)
  const [lightbox, setLightbox] = useState<{ project: Project; index: number } | null>(null)

  const rowRefs = useRef<Record<string, HTMLElement | null>>({})
  const sidebarRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const sidebarContainerRef = useRef<HTMLDivElement>(null)
  const sidebarListRef = useRef<HTMLDivElement>(null)

  const registerRowRef = (id: string, el: HTMLElement | null) => {
    rowRefs.current[id] = el
  }

  // The sidebar list glides in lockstep with the page scroll: whichever
  // collection's row is centered in the viewport has its name centered in
  // the (fixed) sidebar too, interpolating smoothly between rows as you
  // scroll past them — rather than jumping discretely from name to name.
  useEffect(() => {
    let rafId = 0

    const update = () => {
      rafId = 0
      const list = sidebarListRef.current
      const container = sidebarContainerRef.current
      if (!list || !container) return

      const rowCenters = projects.map((p) => {
        const el = rowRefs.current[p.id]
        if (!el) return 0
        const rect = el.getBoundingClientRect()
        return rect.top + window.scrollY + rect.height / 2
      })
      // offsetTop is transform-independent, unlike getBoundingClientRect —
      // needed since the list itself is what we're about to translate.
      const itemCenters = projects.map((p) => {
        const el = sidebarRefs.current[p.id]
        return el ? el.offsetTop + el.offsetHeight / 2 : 0
      })

      const viewportCenterDocY = window.scrollY + window.innerHeight / 2

      let virtualItemY: number
      let nearestIndex = 0

      if (viewportCenterDocY <= rowCenters[0]) {
        virtualItemY = itemCenters[0]
      } else if (viewportCenterDocY >= rowCenters[rowCenters.length - 1]) {
        virtualItemY = itemCenters[itemCenters.length - 1]
        nearestIndex = rowCenters.length - 1
      } else {
        let i = 0
        while (i < rowCenters.length - 1 && rowCenters[i + 1] < viewportCenterDocY) i++
        const span = rowCenters[i + 1] - rowCenters[i]
        const t = span > 0 ? (viewportCenterDocY - rowCenters[i]) / span : 0
        virtualItemY = itemCenters[i] + (itemCenters[i + 1] - itemCenters[i]) * t
        nearestIndex = t < 0.5 ? i : i + 1
      }

      list.style.transform = `translateY(${container.clientHeight / 2 - virtualItemY}px)`

      const nextActive = projects[nearestIndex]?.id
      if (nextActive) setActiveId((prev) => (prev === nextActive ? prev : nextActive))
    }

    const onScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects])

  const selectCollection = (id: string) => {
    rowRefs.current[id]?.scrollIntoView({ block: 'center', behavior: 'smooth' })
  }

  if (!projects.length) return null

  return (
    <>
      <section>
        {/* ── Left: collection list, fixed in place from the start ─ */}
        <div
          ref={sidebarContainerRef}
          style={{
            width: 240,
            position: 'fixed', top: 0, height: '100vh',
            // Align to the centered 1280px content column instead of the
            // raw viewport edge, so it lines up with the rows on wide screens.
            left: 'max(0px, calc(50vw - 640px))',
            overflow: 'hidden', zIndex: 2,
          }}
        >
          <div
            ref={sidebarListRef}
            style={{
              position: 'relative', display: 'flex', flexDirection: 'column',
              gap: 10, padding: '0 0 0 32px', willChange: 'transform',
            }}
          >
            {projects.map((p) => {
              const isActive = p.id === activeId
              return (
                <button
                  key={p.id}
                  ref={(el) => { sidebarRefs.current[p.id] = el }}
                  onClick={() => selectCollection(p.id)}
                  className="collection-item"
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    background: 'none', border: 0,
                    padding: '4px 0', textAlign: 'left',
                    fontFamily: "'Kyiv Region', serif", fontSize: 18,
                    color: isActive ? '#141414' : '#c7c7c7',
                    textDecoration: isActive ? 'underline' : 'none',
                    textUnderlineOffset: 4,
                  }}
                >
                  <span style={{
                    width: 7, height: 7, borderRadius: '50%', flexShrink: 0,
                    border: `1.5px solid ${isActive ? '#141414' : '#c7c7c7'}`,
                    background: isActive ? '#141414' : 'transparent',
                  }} />
                  {p.title}
                </button>
              )
            })}
          </div>
        </div>

        {/* ── Right: one scrollable row per collection ─────────── */}
        <div style={{ marginLeft: 240, minWidth: 0 }}>
          {projects.map((p) => (
            <CollectionRow
              key={p.id}
              project={p}
              registerRef={registerRowRef}
              onImageClick={(proj, index) => setLightbox({ project: proj, index })}
            />
          ))}
        </div>
      </section>

      {lightbox && (
        <ProjectLightbox
          project={lightbox.project}
          initialIndex={lightbox.index}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  )
}
