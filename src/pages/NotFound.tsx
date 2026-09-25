import { Link } from 'react-router-dom'
import { Section } from '../components/Section'

export function NotFound() {
  return (
    <Section className="text-center">
      <p className="text-6xl font-bold text-petrol dark:text-accent">404</p>
      <h1 className="mt-4 text-2xl font-semibold text-petrol dark:text-offwhite">Page not found</h1>
      <Link
        to="/"
        className="mt-8 inline-flex rounded-full bg-petrol px-6 py-2.5 font-semibold text-white hover:bg-petrol-600 dark:bg-accent dark:text-petrol"
      >
        Back to home
      </Link>
    </Section>
  )
}
