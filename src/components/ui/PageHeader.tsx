import { useState, type ReactNode } from 'react'
import { Icon } from './Icon'
import { cx } from './primitives'

interface PageHeaderProps {
  title: string
  description?: string
  actions?: ReactNode
  /** Explicação da tela para a apresentação do protótipo. */
  explain: {
    what: string
    shows: string[]
    note?: string
  }
}

/**
 * Cabeçalho de página + bloco "Sobre esta tela".
 * O bloco explica o propósito da tela e o que ela demonstra; pode ser recolhido.
 */
export function PageHeader({ title, description, actions, explain }: PageHeaderProps) {
  const [open, setOpen] = useState(true)

  return (
    <div className="page-enter mb-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-serif text-[1.75rem] leading-tight font-normal text-brand-800 sm:text-[2.15rem]">{title}</h1>
          {description && <p className="mt-1 text-[15px] text-ink-500">{description}</p>}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
      </div>

      <section
        aria-label="Sobre esta tela"
        className={cx(
          'mt-5 overflow-hidden rounded-2xl border border-accent-500/30 bg-gradient-to-r from-accent-500/10 to-white',
        )}
      >
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
        >
          <span className="flex items-center gap-2.5 font-display text-sm font-semibold text-accent-700">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-500 text-brand-800">
              <Icon name="info" size={15} />
            </span>
            Sobre esta tela
            <span className="hidden rounded-full bg-brand-800/6 px-2 py-0.5 text-[11px] font-semibold text-ink-500 sm:inline">
              guia da apresentação
            </span>
          </span>
          <Icon name="chevron-down" size={16} className={cx('text-ink-500 transition-transform', open && 'rotate-180')} />
        </button>
        {open && (
          <div className="grid grid-cols-1 gap-4 border-t border-accent-500/20 px-4 py-4 text-[13.5px] leading-relaxed text-ink-700 md:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="label-xs mb-1.5 text-accent-700">O que esta tela faz</p>
              <p>{explain.what}</p>
              {explain.note && (
                <p className="mt-3 flex items-start gap-2 rounded-lg bg-brand-800/5 px-3 py-2 text-[13px] text-ink-700">
                  <Icon name="sparkle" size={14} className="mt-0.5 shrink-0 text-accent-700" />
                  <span>{explain.note}</span>
                </p>
              )}
            </div>
            <div>
              <p className="label-xs mb-1.5 text-accent-700">O que ela demonstra</p>
              <ul className="space-y-1.5">
                {explain.shows.map((s) => (
                  <li key={s} className="flex items-start gap-2">
                    <Icon name="check-circle" size={15} className="mt-0.5 shrink-0 text-accent-600" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
