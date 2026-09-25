import { useTheme } from '../lib/theme'

interface LogoProps {
  className?: string
}

/**
 * Logo for the current theme. public/logos/*.webp are cropped, resized copies of
 * logos/logo_white.png (white background) and logos/logo_dark.png (#092E40 background).
 */
export function Logo({ className = 'w-32' }: LogoProps) {
  const { theme } = useTheme()
  const src = theme === 'dark' ? './logos/logo-dark.webp' : './logos/logo-light.webp'
  return <img src={src} alt="elevate" className={`block h-auto ${className}`} decoding="async" />
}
