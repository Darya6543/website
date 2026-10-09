import fs from 'fs'
import path from 'path'
import sizeOf from 'image-size'

export interface ImageItem {
  src: string
  cover?: string
  width: number
  height: number
}

export interface Project {
  id: string
  title: string
  category: string
  year: number
  swatch: string
  description: string
  images: ImageItem[]
  count: number
  book: boolean
}

const IMAGE_EXTS = /\.(png|jpg|jpeg|webp|gif|avif)$/i

// A hand-made gallery-row crop for image "foo.png" is named "foo-cover.png"
// and lives right next to it. The full original is still what opens in the lightbox.
const COVER_SUFFIX = /-cover\.(png|jpg|jpeg|webp|gif|avif)$/i

const SWATCHES = [
  '#3d5a2c', '#7a2942', '#a86b2c',
  '#b88a2c', '#5b6b3a', '#9a4b2c',
]

// Folder names carry a leading "N. " just to fix the display order —
// that prefix is never shown.
function stripOrderPrefix(folder: string): string {
  return folder.replace(/^\d+\.\s*/, '').trim()
}

function formatTitle(name: string): string {
  if (/\s/.test(name)) return name // already a readable, hand-named folder
  return name
    .replace(/-/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/(^|\s)([a-z])/g, (_, p1, p2) => p1 + p2.toUpperCase())
}

function orderOf(folder: string): number {
  const m = folder.match(/^(\d+)\./)
  return m ? parseInt(m[1], 10) : Number.MAX_SAFE_INTEGER
}

export function getProjects(): Project[] {
  const imagesRoot = path.join(process.cwd(), 'public', 'images')

  const folders = fs
    .readdirSync(imagesRoot, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort((a, b) => orderOf(a) - orderOf(b) || a.localeCompare(b))

  return folders.map((folder, i) => {
    const folderPath = path.join(imagesRoot, folder)

    let meta: Partial<Pick<Project, 'title' | 'category' | 'year' | 'description' | 'book'>> = {}
    const metaPath = path.join(folderPath, 'meta.json')
    if (fs.existsSync(metaPath)) {
      meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8'))
    }

    const allFiles = fs.readdirSync(folderPath).filter((f) => IMAGE_EXTS.test(f))

    const coverByBaseName = new Map<string, string>()
    for (const f of allFiles) {
      if (COVER_SUFFIX.test(f)) coverByBaseName.set(f.replace(COVER_SUFFIX, ''), f)
    }

    const files = allFiles.filter((f) => !COVER_SUFFIX.test(f)).sort()

    const images: ImageItem[] = files.map((f) => {
      const buf = fs.readFileSync(path.join(folderPath, f))
      const { width = 4, height = 5 } = sizeOf(buf)
      const coverFile = coverByBaseName.get(f.replace(IMAGE_EXTS, ''))
      return {
        src: `/images/${encodeURIComponent(folder)}/${encodeURIComponent(f)}`,
        cover: coverFile
          ? `/images/${encodeURIComponent(folder)}/${encodeURIComponent(coverFile)}`
          : undefined,
        width,
        height,
      }
    })

    return {
      id: folder,
      title: meta.title ?? formatTitle(stripOrderPrefix(folder)),
      category: meta.category ?? 'Illustration',
      year: meta.year ?? 2025,
      swatch: SWATCHES[i % SWATCHES.length],
      description: meta.description ?? '',
      images,
      count: images.length,
      book: meta.book ?? false,
    }
  })
}
