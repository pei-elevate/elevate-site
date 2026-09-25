/**
 * Meeting minutes are loaded from src/content/minutes/*.md at build time.
 * Add a new minute by dropping a new .md file in that folder (see _TEMPLATE.md).
 * Files whose name starts with "_" are ignored.
 */

export interface Minute {
  slug: string
  number: number
  date: string
  title: string
  location: string
  time: string
  duration: string
  /** Path to the PDF in public/, e.g. "minutes/ata-01.pdf". */
  pdf: string
  body: string
}

const files = import.meta.glob('../content/minutes/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

/** Minimal front matter parser: `key: value` lines between two `---` lines. */
function parseFrontMatter(raw: string): { data: Record<string, string>; body: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw)
  if (!match) return { data: {}, body: raw }
  const data: Record<string, string> = {}
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(':')
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    const value = line.slice(idx + 1).trim().replace(/^["']|["']$/g, '')
    if (key) data[key] = value
  }
  return { data, body: raw.slice(match[0].length) }
}

export const minutes: Minute[] = Object.entries(files)
  .map(([path, raw]) => {
    const file = path.split('/').pop()!.replace(/\.md$/, '')
    return { file, raw }
  })
  .filter(({ file }) => !file.startsWith('_'))
  .map(({ file, raw }) => {
    const { data, body } = parseFrontMatter(raw)
    const heading = /^#\s+(.+)$/m.exec(body)?.[1]
    return {
      slug: file,
      number: Number(data.number) || Number(/\d+/.exec(file)?.[0]) || 0,
      date: data.date ?? '',
      title: data.title ?? heading ?? file,
      location: data.location ?? '',
      time: data.time ?? '',
      duration: data.duration ?? '',
      pdf: data.pdf ?? '',
      body,
    }
  })
  .sort((a, b) => b.number - a.number || b.date.localeCompare(a.date))

export function findMinute(slug: string): Minute | undefined {
  return minutes.find((m) => m.slug === slug)
}
