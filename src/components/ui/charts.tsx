import { useId, useState } from 'react'
import { cx } from './primitives'

/**
 * Gráficos em SVG puro, seguindo o método de visualização:
 * marcas finas, pontas arredondadas ancoradas na base, 2px de respiro entre
 * barras, grade recessiva, texto em tons de texto, tooltip por marca, legenda
 * quando há 2+ séries e tabela acessível oculta.
 */

const SERIES = ['#b9891f', '#2f6bb0', '#c75b39', '#6b5ba6']

interface Series {
  name: string
  values: number[]
}

interface BarChartProps {
  labels: string[]
  series: Series[]
  format?: (v: number) => string
  height?: number
  className?: string
  /** Rótulos diretos apenas no último ponto de cada série. */
  labelLast?: boolean
}

export function BarChart({ labels, series, format = (v) => String(v), height = 200, className, labelLast = true }: BarChartProps) {
  const id = useId()
  const [hover, setHover] = useState<number | null>(null)
  const W = 600
  const H = height
  const max = Math.max(...series.flatMap((s) => s.values)) * 1.1
  const ticks = 4
  const tickLabels = Array.from({ length: ticks + 1 }, (_, i) => format(Math.round((max / ticks) * i)))
  const padL = 14 + Math.max(...tickLabels.map((l) => l.length)) * 6.4
  const padR = 12
  const padT = 18
  const padB = 26
  const innerW = W - padL - padR
  const innerH = H - padT - padB
  const groupW = innerW / labels.length
  const barGap = 2
  const groupPad = Math.min(14, groupW * 0.22)
  const barW = (groupW - groupPad * 2 - barGap * (series.length - 1)) / series.length
  const y = (v: number) => padT + innerH - (v / max) * innerH

  return (
    <figure className={cx('relative', className)}>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-labelledby={`${id}-t`}>
        <title id={`${id}-t`}>{series.map((s) => s.name).join(' e ')} por período</title>
        {/* grade */}
        {Array.from({ length: ticks + 1 }).map((_, i) => {
          const v = (max / ticks) * i
          const yy = y(v)
          return (
            <g key={i}>
              <line x1={padL} x2={W - padR} y1={yy} y2={yy} stroke="rgb(20 40 63 / 0.08)" strokeWidth="1" />
              <text x={padL - 6} y={yy + 3.5} textAnchor="end" fontSize="10" fill="#7f8da0" fontFamily="Inter, sans-serif">
                {tickLabels[i]}
              </text>
            </g>
          )
        })}
        {/* barras */}
        {labels.map((lab, gi) => {
          const gx = padL + gi * groupW
          const isHover = hover === gi
          return (
            <g key={lab} onMouseEnter={() => setHover(gi)} onMouseLeave={() => setHover(null)}>
              <rect x={gx} y={padT} width={groupW} height={innerH} fill={isHover ? 'rgb(20 40 63 / 0.04)' : 'transparent'} />
              {series.map((s, si) => {
                const v = s.values[gi]
                const bx = gx + groupPad + si * (barW + barGap)
                const by = y(v)
                const bh = padT + innerH - by
                const r = Math.min(4, barW / 2)
                return (
                  <path
                    key={s.name}
                    d={`M${bx} ${by + r} a${r} ${r} 0 0 1 ${r} -${r} h${barW - 2 * r} a${r} ${r} 0 0 1 ${r} ${r} v${Math.max(0, bh - r)} h-${barW} z`}
                    fill={SERIES[si]}
                    opacity={hover === null || isHover ? 1 : 0.45}
                  />
                )
              })}
              <text x={gx + groupW / 2} y={H - 8} textAnchor="middle" fontSize="11" fill="#5b6b80" fontFamily="Inter, sans-serif">
                {lab}
              </text>
              {labelLast && gi === labels.length - 1 && series.map((s, si) => (
                <text
                  key={s.name}
                  x={gx + groupPad + si * (barW + barGap) + barW / 2}
                  y={y(s.values[gi]) - 5}
                  textAnchor="middle"
                  fontSize="10.5"
                  fontWeight="600"
                  fill="#14283f"
                  fontFamily="Inter, sans-serif"
                >
                  {format(s.values[gi])}
                </text>
              ))}
            </g>
          )
        })}
      </svg>

      {/* tooltip */}
      {hover !== null && (
        <div
          className="pointer-events-none absolute top-2 z-10 rounded-lg border border-brand-800/10 bg-white px-3 py-2 text-xs shadow-lift"
          style={{ left: `${((padL + hover * groupW + groupW / 2) / W) * 100}%`, transform: 'translateX(-50%)' }}
        >
          <p className="font-semibold text-brand-800">{labels[hover]}</p>
          {series.map((s, si) => (
            <p key={s.name} className="tabular mt-0.5 flex items-center gap-1.5 text-ink-700">
              <span className="h-2 w-2 rounded-sm" style={{ background: SERIES[si] }} />
              {s.name}: <strong>{format(s.values[hover])}</strong>
            </p>
          ))}
        </div>
      )}

      {series.length > 1 && (
        <figcaption className="mt-2 flex flex-wrap gap-4 text-xs text-ink-700">
          {series.map((s, si) => (
            <span key={s.name} className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm" style={{ background: SERIES[si] }} />
              {s.name}
            </span>
          ))}
        </figcaption>
      )}

      {/* tabela acessível */}
      <table className="sr-only">
        <caption>Dados do gráfico</caption>
        <thead><tr><th>Período</th>{series.map((s) => <th key={s.name}>{s.name}</th>)}</tr></thead>
        <tbody>
          {labels.map((l, i) => (
            <tr key={l}><td>{l}</td>{series.map((s) => <td key={s.name}>{format(s.values[i])}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </figure>
  )
}

/** Lista de barras horizontais para distribuição por categoria (uma série). */
export function HBarList({ items, format = (v) => String(v), colorIndex = 0, max }: { items: Array<{ label: string; value: number; sub?: string }>; format?: (v: number) => string; colorIndex?: number; max?: number }) {
  const top = max ?? Math.max(...items.map((i) => i.value))
  return (
    <ul className="space-y-3">
      {items.map((it) => (
        <li key={it.label}>
          <div className="mb-1 flex items-baseline justify-between gap-3 text-[13px]">
            <span className="font-medium text-brand-800">{it.label}</span>
            <span className="tabular text-ink-700">
              <strong className="text-brand-800">{format(it.value)}</strong>
              {it.sub && <span className="ml-1.5 text-ink-500">{it.sub}</span>}
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-brand-800/6">
            <div className="h-full rounded-full" style={{ width: `${(it.value / top) * 100}%`, background: SERIES[colorIndex] }} />
          </div>
        </li>
      ))}
    </ul>
  )
}

/** Barra segmentada (100%) com legenda: composição de um total. */
export function StackedBar({ items, format = (v) => String(v) }: { items: Array<{ label: string; value: number }>; format?: (v: number) => string }) {
  const total = items.reduce((a, b) => a + b.value, 0)
  return (
    <div>
      <div className="flex h-3 w-full gap-[2px] overflow-hidden rounded-full">
        {items.map((it, i) => (
          <div key={it.label} title={`${it.label}: ${format(it.value)}`} style={{ width: `${(it.value / total) * 100}%`, background: SERIES[i % SERIES.length] }} />
        ))}
      </div>
      <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1.5 text-[13px]">
        {items.map((it, i) => (
          <li key={it.label} className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 shrink-0 rounded-sm" style={{ background: SERIES[i % SERIES.length] }} />
            <span className="text-ink-700">{it.label}</span>
            <span className="tabular ml-auto font-semibold text-brand-800">{Math.round((it.value / total) * 100)}%</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
