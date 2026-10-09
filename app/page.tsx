import { getProjects } from '@/lib/getProjects'
import { Gallery } from '@/components/Gallery'

export default function GalleryPage() {
  const projects = getProjects()
  return <Gallery projects={projects} />
}
