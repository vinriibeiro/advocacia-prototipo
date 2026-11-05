/** Data de referência do protótipo (todos os dados fictícios giram em torno dela). */
export const TODAY = new Date(2026, 10, 5) // 05/11/2026

export const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

export function money(v: number, compact = false): string {
  if (compact) {
    if (Math.abs(v) >= 1_000_000) return `R$ ${(v / 1_000_000).toFixed(1).replace('.', ',')} mi`
    if (Math.abs(v) >= 1_000) return `R$ ${(v / 1_000).toFixed(0)} mil`
    return `R$ ${Math.round(v)}`
  }
  return brl.format(v)
}

export function parseISO(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function fmtDate(iso: string, opts: 'short' | 'long' | 'weekday' = 'short'): string {
  const d = parseISO(iso)
  if (opts === 'long') return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
  if (opts === 'weekday') return d.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'short' })
  return d.toLocaleDateString('pt-BR')
}

export function daysFromToday(iso: string): number {
  const d = parseISO(iso)
  return Math.round((d.getTime() - TODAY.getTime()) / 86_400_000)
}

export function relativeDays(iso: string): string {
  const n = daysFromToday(iso)
  if (n === 0) return 'hoje'
  if (n === 1) return 'amanhã'
  if (n === -1) return 'ontem'
  if (n > 0) return `em ${n} dias`
  return `há ${Math.abs(n)} dias`
}

export function toISO(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export function addDays(iso: string, n: number): string {
  const d = parseISO(iso)
  d.setDate(d.getDate() + n)
  return toISO(d)
}

export function initials(name: string): string {
  const parts = name.replace(/^(Dra?\.|Sr\.|Sra\.)\s+/, '').split(' ').filter(Boolean)
  return (parts[0]?.[0] ?? '') + (parts.at(-1)?.[0] ?? '')
}

export function hours(h: number): string {
  const hh = Math.floor(h)
  const mm = Math.round((h - hh) * 60)
  return mm ? `${hh}h${String(mm).padStart(2, '0')}` : `${hh}h`
}
