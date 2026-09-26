import { useTheme } from '../lib/theme'

interface LogoProps {
  className?: string
}

/**
 * Logo for the current theme. public/logos/*.webp are transparent crops of
 * logos/logo_light_pfp_nobg.png (the dark variant has the text recoloured to white).
 */
export function Logo({ className = 'w-32' }: LogoProps) {
  const { theme } = useTheme()
  const src = theme === 'dark' ? './logos/logo-dark.webp' : './logos/logo-light.webp'
  return <img src={src} alt="elevate" className={`block h-auto ${className}`} decoding="async" />
}
