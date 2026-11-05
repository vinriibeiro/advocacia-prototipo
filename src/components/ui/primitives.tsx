import { useState, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { Icon, type IconName } from './Icon'
import { initials } from '@/lib/format'
import { userById, users } from '@/data/mock'

export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

/* Botão ------------------------------------------------------------------- */
type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'brand'
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: 'sm' | 'md'
  icon?: IconName
  iconRight?: IconName
  children?: ReactNode
}
const variants: Record<Variant, string> = {
  primary: 'bg-accent-500 text-brand-800 hover:bg-accent-400 shadow-[0_6px_16px_-8px_rgb(21_184_166_/_0.8)]',
  brand: 'bg-brand-800 text-white hover:bg-brand-700',
  secondary: 'border border-brand-800/15 bg-white text-brand-800 hover:bg-paper-100',
  ghost: 'text-ink-700 hover:bg-brand-800/6 hover:text-brand-800',
  danger: 'border border-danger-700/20 bg-white text-danger-700 hover:bg-danger-100',
}
export function Button({ variant = 'secondary', size = 'md', icon, iconRight, className, children, ...rest }: ButtonProps) {
  return (
    <button
      type="button"
      className={cx(
        'inline-flex items-center justify-center gap-2 rounded-lg font-display font-semibold whitespace-nowrap transition-colors disabled:opacity-50',
        size === 'sm' ? 'h-8 px-3 text-[13px]' : 'h-10 px-4 text-sm',
        variants[variant],
        className,
      )}
      {...rest}
    >
      {icon && <Icon name={icon} size={size === 'sm' ? 15 : 17} />}
      {children}
      {iconRight && <Icon name={iconRight} size={size === 'sm' ? 15 : 17} />}
    </button>
  )
}

/* Badge --------------------------------------------------------------------- */
type Tone = 'neutral' | 'accent' | 'brand' | 'ok' | 'warn' | 'danger' | 'info' | 'violet'
const tones: Record<Tone, string> = {
  neutral: 'bg-brand-800/6 text-ink-700',
  accent: 'bg-accent-500/15 text-accent-700',
  brand: 'bg-brand-800 text-white',
  ok: 'bg-ok-100 text-ok-600',
  warn: 'bg-warn-100 text-warn-700',
  danger: 'bg-danger-100 text-danger-700',
  info: 'bg-info-100 text-info-700',
  violet: 'bg-[#ede9fe] text-[#5b21b6]',
}
export function Badge({ tone = 'neutral', icon, children, className }: { tone?: Tone; icon?: IconName; children: ReactNode; className?: string }) {
  return (
    <span className={cx('inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11.5px] font-semibold whitespace-nowrap', tones[tone], className)}>
      {icon && <Icon name={icon} size={12} />}
      {children}
    </span>
  )
}

/** Mapeia status de domínio para tom + ícone (status nunca só por cor). */
export function statusBadge(status: string) {
  const map: Record<string, { tone: Tone; icon?: IconName }> = {
    'Em andamento': { tone: 'accent', icon: 'zap' },
    'Aguardando decisão': { tone: 'info', icon: 'clock' },
    'Em recurso': { tone: 'violet', icon: 'gavel' },
    Suspenso: { tone: 'warn', icon: 'alert' },
    Encerrado: { tone: 'neutral', icon: 'check' },
    Ativo: { tone: 'ok', icon: 'check' },
    Inativo: { tone: 'neutral' },
    Prospecto: { tone: 'info', icon: 'sparkle' },
    Pago: { tone: 'ok', icon: 'check' },
    'A vencer': { tone: 'info', icon: 'clock' },
    Atrasado: { tone: 'danger', icon: 'alert' },
    Nova: { tone: 'accent', icon: 'sparkle' },
    'Em análise': { tone: 'warn', icon: 'eye' },
    Tratada: { tone: 'ok', icon: 'check' },
    Alta: { tone: 'danger', icon: 'alert' },
    Média: { tone: 'warn' },
    Baixa: { tone: 'neutral' },
    Alto: { tone: 'danger', icon: 'alert' },
    Médio: { tone: 'warn' },
    Baixo: { tone: 'ok' },
  }
  const m = map[status] ?? { tone: 'neutral' as Tone }
  return <Badge tone={m.tone} icon={m.icon}>{status}</Badge>
}

/* Avatar -------------------------------------------------------------------- */
export function Avatar({ userId, size = 28, className }: { userId: string; size?: number; className?: string }) {
  const u = userById(userId)
  return (
    <span
      title={u.name}
      className={cx('inline-flex shrink-0 items-center justify-center rounded-full font-display font-semibold text-white ring-2 ring-white', className)}
      style={{ width: size, height: size, background: u.color, fontSize: size * 0.38 }}
    >
      {initials(u.name)}
    </span>
  )
}

export function AvatarStack({ ids, size = 26 }: { ids: string[]; size?: number }) {
  return (
    <span className="inline-flex -space-x-2">
      {ids.map((id) => <Avatar key={id} userId={id} size={size} />)}
    </span>
  )
}

export function UserName({ id, short }: { id: string; short?: boolean }) {
  const u = userById(id) ?? users[0]
  const n = short ? u.name.replace(/^(Dra?\.)\s+/, '').split(' ').slice(0, 2).join(' ') : u.name
  return <span className="inline-flex items-center gap-2"><Avatar userId={id} size={22} />{n}</span>
}

/* Cartão e títulos ---------------------------------------------------------- */
export function Card({ className, children, title, action, subtitle }: { className?: string; children: ReactNode; title?: ReactNode; subtitle?: ReactNode; action?: ReactNode }) {
  return (
    <section className={cx('card min-w-0', className)}>
      {(title || action) && (
        <header className="flex items-start justify-between gap-4 px-5 pt-5 pb-3">
          <div>
            {title && <h3 className="text-[15px] font-semibold text-brand-800">{title}</h3>}
            {subtitle && <p className="mt-0.5 text-[13px] text-ink-500">{subtitle}</p>}
          </div>
          {action}
        </header>
      )}
      {children}
    </section>
  )
}

/* Stat tile ----------------------------------------------------------------- */
export function StatTile({ label, value, hint, icon, tone = 'neutral', trend }: { label: string; value: ReactNode; hint?: ReactNode; icon: IconName; tone?: 'neutral' | 'accent' | 'warn' | 'danger'; trend?: { value: string; up: boolean } }) {
  const ic = { neutral: 'bg-brand-800 text-accent-400', accent: 'bg-accent-500 text-brand-800', warn: 'bg-warn-100 text-warn-700', danger: 'bg-danger-100 text-danger-700' }[tone]
  return (
    <div className="card flex items-start gap-4 p-5">
      <span className={cx('flex h-11 w-11 shrink-0 items-center justify-center rounded-xl', ic)}>
        <Icon name={icon} size={20} />
      </span>
      <div className="min-w-0">
        <p className="label-xs">{label}</p>
        <p className="tabular mt-1 font-serif text-[1.9rem] leading-none font-normal text-brand-800">{value}</p>
        {(hint || trend) && (
          <p className="mt-1.5 flex items-center gap-2 text-[12.5px] text-ink-500">
            {trend && (
              <span className={cx('inline-flex items-center gap-0.5 font-semibold', trend.up ? 'text-ok-600' : 'text-danger-700')}>
                <Icon name="trending-up" size={12} className={trend.up ? '' : 'rotate-180'} />
                {trend.value}
              </span>
            )}
            {hint}
          </p>
        )}
      </div>
    </div>
  )
}

/* Tabela -------------------------------------------------------------------- */
export function Table({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cx('scroll-thin overflow-x-auto', className)}>
      <table className="w-full border-collapse text-[13.5px]">{children}</table>
    </div>
  )
}
export function Th({ children, className, right }: { children?: ReactNode; className?: string; right?: boolean }) {
  return <th className={cx('label-xs border-b border-brand-800/8 px-4 py-2.5 text-left font-semibold whitespace-nowrap', right && 'text-right', className)}>{children}</th>
}
export function Td({ children, className, right, muted }: { children?: ReactNode; className?: string; right?: boolean; muted?: boolean }) {
  return <td className={cx('border-b border-brand-800/6 px-4 py-3 align-middle', right && 'text-right tabular', muted && 'text-ink-500', className)}>{children}</td>
}

/* Tabs ---------------------------------------------------------------------- */
export function Tabs<T extends string>({ tabs, value, onChange }: { tabs: Array<{ id: T; label: string; count?: number }>; value: T; onChange: (v: T) => void }) {
  return (
    <div role="tablist" className="scroll-thin flex min-w-0 gap-1 overflow-x-auto border-b border-brand-800/8">
      {tabs.map((t) => (
        <button
          key={t.id}
          role="tab"
          type="button"
          aria-selected={value === t.id}
          onClick={() => onChange(t.id)}
          className={cx(
            '-mb-px flex items-center gap-2 border-b-2 px-3.5 py-2.5 font-display text-sm font-semibold whitespace-nowrap transition-colors',
            value === t.id ? 'border-accent-500 text-brand-800' : 'border-transparent text-ink-500 hover:text-brand-800',
          )}
        >
          {t.label}
          {t.count !== undefined && <span className={cx('rounded-full px-1.5 text-[11px]', value === t.id ? 'bg-accent-500/15 text-accent-700' : 'bg-brand-800/6 text-ink-500')}>{t.count}</span>}
        </button>
      ))}
    </div>
  )
}

/* Campos de filtro ---------------------------------------------------------- */
export function SearchInput({ placeholder, value, onChange, className }: { placeholder: string; value: string; onChange: (v: string) => void; className?: string }) {
  return (
    <label className={cx('relative block', className)}>
      <Icon name="search" size={16} className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-ink-400" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-10 w-full rounded-lg border border-brand-800/12 bg-white pr-3 pl-9 text-sm text-brand-800 placeholder:text-ink-400 focus:border-accent-500"
      />
    </label>
  )
}

export function Select({ value, onChange, options, label }: { value: string; onChange: (v: string) => void; options: string[]; label: string }) {
  return (
    <label className="relative block">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 appearance-none rounded-lg border border-brand-800/12 bg-white pr-9 pl-3 text-sm font-medium text-brand-800 focus:border-accent-500"
      >
        <option value="">{label}: todos</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      <Icon name="chevron-down" size={14} className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-ink-400" />
    </label>
  )
}

/* Estado vazio e "em breve" ------------------------------------------------- */
export function EmptyState({ icon, title, text }: { icon: IconName; title: string; text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-800/6 text-ink-500"><Icon name={icon} size={22} /></span>
      <p className="mt-4 font-display font-semibold text-brand-800">{title}</p>
      {text && <p className="mt-1 max-w-sm text-sm text-ink-500">{text}</p>}
    </div>
  )
}

/* Toast de protótipo: ações que seriam reais no sistema ---------------------- */
export function useDemoToast() {
  const [msg, setMsg] = useState<string | null>(null)
  const show = (m: string) => {
    setMsg(m)
    window.setTimeout(() => setMsg(null), 2600)
  }
  const node = msg ? (
    <div role="status" className="fixed bottom-5 left-1/2 z-[80] -translate-x-1/2 rounded-xl bg-brand-800 px-4 py-3 text-sm text-white shadow-lift">
      <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent-500 text-brand-800 align-middle"><Icon name="check" size={12} /></span>
      {msg}
    </div>
  ) : null
  return { show, node }
}

/* Linha de progresso -------------------------------------------------------- */
export function Progress({ value, max = 100, tone = 'accent' }: { value: number; max?: number; tone?: 'accent' | 'brand' | 'warn' }) {
  const pct = Math.min(100, Math.round((value / max) * 100))
  const bg = { accent: 'bg-accent-500', brand: 'bg-brand-800', warn: 'bg-warn-700' }[tone]
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-brand-800/8" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
      <div className={cx('h-full rounded-full', bg)} style={{ width: `${pct}%` }} />
    </div>
  )
}
