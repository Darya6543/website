import type { Metadata } from 'next'
import { AboutPage } from '@/components/AboutPage'

export const metadata: Metadata = {
  title: 'About',
  description: 'Darya Goloborodko — freelance game artist and illustrator in Berlin: experience, education and teaching.',
  alternates: { canonical: '/about' },
}

export default function About() {
  return <AboutPage />
}
