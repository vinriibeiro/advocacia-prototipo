/**
 * Marca do escritório fictício Albuquerque & Prado Advogados.
 * Símbolo: balança estilizada (coluna, travessa e pratos) em traço geométrico.
 */
interface MarkProps {
  size?: number
  primary?: string
  accent?: string
  className?: string
}

export function LogoMark({ size = 36, primary = 'currentColor', accent = '#c6a55c', className }: MarkProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true" focusable="false" className={className}>
      {/* coluna e base */}
      <rect x="22.25" y="9" width="3.5" height="29" rx="1.2" fill={primary} />
      <rect x="13" y="38" width="22" height="3" rx="1.5" fill={primary} />
      {/* finial */}
      <circle cx="24" cy="6.5" r="2.6" fill={accent} />
      {/* travessa */}
      <rect x="7" y="13.5" width="34" height="3" rx="1.5" fill={primary} />
      {/* cordas */}
      <path d="M11 16.5 5.5 26M11 16.5 16.5 26M37 16.5 31.5 26M37 16.5 42.5 26" stroke={primary} strokeWidth="1.4" strokeLinecap="round" />
      {/* pratos */}
      <path d="M4 26.5h15a7.5 4.5 0 0 1-15 0Z" fill={accent} />
      <path d="M29 26.5h15a7.5 4.5 0 0 1-15 0Z" fill={accent} />
    </svg>
  )
}

interface LogoProps {
  tone?: 'dark' | 'light'
  size?: number
  withTagline?: boolean
  className?: string
}

export function Logo({ tone = 'dark', size = 36, withTagline = true, className }: LogoProps) {
  const text = tone === 'light' ? 'text-white' : 'text-brand-800'
  const sub = tone === 'light' ? 'text-accent-400' : 'text-accent-700'
  return (
    <span className={['inline-flex items-center gap-3', className].filter(Boolean).join(' ')}>
      <LogoMark size={size} className={text} />
      <span className="flex flex-col leading-none">
        <span className={`font-serif text-[1.15rem] leading-none tracking-[-0.01em] ${text}`}>
          Albuquerque <span className={sub}>&amp;</span> Prado
        </span>
        {withTagline && (
          <span className={`mt-1 text-[9.5px] font-semibold tracking-[0.26em] uppercase ${sub}`}>Advogados</span>
        )}
      </span>
    </span>
  )
}
