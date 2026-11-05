import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { PageHeader } from '@/components/ui/PageHeader'
import { Icon } from '@/components/ui/Icon'
import { Avatar, Badge, Button, Card, Select, cx, useDemoToast } from '@/components/ui/primitives'
import { caseById, clientById, events, type EventKind } from '@/data/mock'
import { daysFromToday, fmtDate, relativeDays, toISO, TODAY } from '@/lib/format'

const kinds: EventKind[] = ['Prazo fatal', 'Prazo interno', 'Audiência', 'Reunião', 'Diligência']
const dot: Record<EventKind, string> = {
  'Prazo fatal': 'bg-danger-700',
  'Prazo interno': 'bg-warn-700',
  Audiência: 'bg-info-700',
  Reunião: 'bg-accent-500',
  Diligência: 'bg-brand-800/40',
}
const tone: Record<EventKind, 'danger' | 'warn' | 'info' | 'accent' | 'neutral'> = {
  'Prazo fatal': 'danger',
  'Prazo interno': 'warn',
  Audiência: 'info',
  Reunião: 'accent',
  Diligência: 'neutral',
}

export function Agenda() {
  const [kind, setKind] = useState('')
  const [view, setView] = useState<'mes' | 'lista'>('mes')
  const [selected, setSelected] = useState<string>(toISO(TODAY))
  const toast = useDemoToast()

  const year = 2026
  const month = 10 // novembro
  const first = new Date(year, month, 1)
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const startWeekday = first.getDay()

  const list = useMemo(() => events.filter((e) => !kind || e.kind === kind), [kind])
  const byDate = useMemo(() => {
    const m = new Map<string, typeof events>()
    for (const e of list) m.set(e.date, [...(m.get(e.date) ?? []), e])
    return m
  }, [list])

  const cells: Array<string | null> = [
    ...Array.from({ length: startWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => toISO(new Date(year, month, i + 1))),
  ]
  while (cells.length % 7) cells.push(null)

  const dayEvents = (byDate.get(selected) ?? []).sort((a, b) => (a.time ?? '').localeCompare(b.time ?? ''))
  const upcoming = list.filter((e) => !e.done && daysFromToday(e.date) >= 0).sort((a, b) => a.date.localeCompare(b.date) || (a.time ?? '').localeCompare(b.time ?? ''))

  const EventRow = ({ e, compact }: { e: (typeof events)[number]; compact?: boolean }) => {
    const c = e.caseId ? caseById(e.caseId) : undefined
    const client = e.clientId ? clientById(e.clientId) : c ? clientById(c.clientId) : undefined
    return (
      <li className={cx('flex items-start gap-3', compact ? 'py-2.5' : 'py-3')}>
        <span className={cx('mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full', dot[e.kind])} />
        <div className="min-w-0 flex-1">
          <p className={cx('text-[13.5px] leading-snug font-medium', e.done ? 'text-ink-500 line-through' : 'text-brand-800')}>{e.title}</p>
          <p className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-ink-500">
            <Badge tone={tone[e.kind]}>{e.kind}</Badge>
            {e.time && <span className="tabular">{e.time}</span>}
            {e.location && <span>{e.location}</span>}
            {client && <span className="truncate">{client.name}</span>}
            {c && <Link to={`/app/processos/${c.id}`} className="text-accent-700 hover:underline">ver processo</Link>}
          </p>
        </div>
        <Avatar userId={e.assignee} size={24} />
      </li>
    )
  }

  return (
    <>
      <PageHeader
        title="Agenda e prazos"
        description="Prazos fatais, audiências, reuniões e diligências da equipe"
        actions={
          <>
            <div className="inline-flex rounded-lg border border-brand-800/12 bg-white p-0.5">
              {(['mes', 'lista'] as const).map((v) => (
                <button key={v} type="button" onClick={() => setView(v)} className={cx('rounded-md px-3 py-1.5 font-display text-sm font-semibold', view === v ? 'bg-brand-800 text-white' : 'text-ink-700')}>
                  {v === 'mes' ? 'Mês' : 'Lista'}
                </button>
              ))}
            </div>
            <Button icon="plus" variant="primary" onClick={() => toast.show('Novo compromisso com vínculo a processo e lembretes por e-mail/WhatsApp.')}>Novo compromisso</Button>
          </>
        }
        explain={{
          what: 'Calendário único do escritório. Prazos fatais, prazos internos, audiências, reuniões e diligências ficam na mesma visão, com cor por tipo, responsável e vínculo ao processo. Clique em um dia para ver os detalhes.',
          shows: [
            'Calendário mensal com indicadores por tipo de compromisso',
            'Filtro por tipo e alternância entre mês e lista',
            'Prazos vinculados ao processo e ao responsável',
            'Base para alertas automáticos (e-mail, WhatsApp) antes do vencimento',
          ],
          note: 'A contagem de prazos em dias úteis, com feriados forenses, é parametrizável por tribunal.',
        }}
      />

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Select label="Tipo" value={kind} onChange={setKind} options={kinds} />
        <ul className="ml-1 flex flex-wrap gap-3 text-xs text-ink-700">
          {kinds.map((k) => (
            <li key={k} className="inline-flex items-center gap-1.5"><span className={cx('h-2 w-2 rounded-full', dot[k])} />{k}</li>
          ))}
        </ul>
      </div>

      {view === 'mes' ? (
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_360px]">
          <Card className="overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4">
              <h2 className="font-display text-lg font-bold text-brand-800">Novembro de 2026</h2>
              <div className="flex gap-1">
                <Button size="sm" variant="ghost" icon="chevron-left" aria-label="Mês anterior" onClick={() => toast.show('Navegação entre meses (protótipo fixo em novembro).')} />
                <Button size="sm" variant="ghost" onClick={() => setSelected(toISO(TODAY))}>Hoje</Button>
                <Button size="sm" variant="ghost" icon="chevron-right" aria-label="Próximo mês" onClick={() => toast.show('Navegação entre meses (protótipo fixo em novembro).')} />
              </div>
            </div>
            <div className="grid grid-cols-7 border-t border-brand-800/8 text-center">
              {['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'].map((d) => (
                <div key={d} className="label-xs border-b border-brand-800/8 py-2">{d}</div>
              ))}
              {cells.map((iso, i) => {
                if (!iso) return <div key={i} className="min-h-[88px] border-b border-r border-brand-800/6 bg-paper-100/60" />
                const evs = byDate.get(iso) ?? []
                const isToday = iso === toISO(TODAY)
                const isSel = iso === selected
                return (
                  <button
                    key={iso}
                    type="button"
                    onClick={() => setSelected(iso)}
                    className={cx('flex min-h-[88px] flex-col items-start gap-1 border-r border-b border-brand-800/6 p-1.5 text-left transition-colors hover:bg-paper-100', isSel && 'bg-accent-500/8 ring-1 ring-accent-500/40 ring-inset')}
                  >
                    <span className={cx('tabular flex h-6 w-6 items-center justify-center rounded-full text-[12.5px] font-semibold', isToday ? 'bg-brand-800 text-white' : 'text-brand-800')}>{Number(iso.slice(-2))}</span>
                    <span className="flex w-full flex-col gap-0.5">
                      {evs.slice(0, 3).map((e) => (
                        <span key={e.id} className={cx('hidden truncate rounded px-1 text-[10.5px] leading-4 text-white sm:block', dot[e.kind], e.done && 'opacity-50')}>{e.time ? `${e.time} ` : ''}{e.title}</span>
                      ))}
                      <span className="flex gap-0.5 sm:hidden">{evs.map((e) => <span key={e.id} className={cx('h-1.5 w-1.5 rounded-full', dot[e.kind])} />)}</span>
                      {evs.length > 3 && <span className="hidden text-[10.5px] text-ink-500 sm:block">+{evs.length - 3}</span>}
                    </span>
                  </button>
                )
              })}
            </div>
          </Card>

          <Card title={fmtDate(selected, 'weekday')} subtitle={`${dayEvents.length} compromisso(s) · ${relativeDays(selected)}`}>
            <ul className="divide-y divide-brand-800/6 px-5 pb-4">
              {dayEvents.map((e) => <EventRow key={e.id} e={e} />)}
              {dayEvents.length === 0 && <li className="py-6 text-center text-sm text-ink-500"><Icon name="calendar" className="mx-auto mb-2 text-ink-400" />Nenhum compromisso neste dia.</li>}
            </ul>
          </Card>
        </div>
      ) : (
        <Card title="Próximos compromissos" subtitle="A partir de hoje, em ordem cronológica">
          <ul className="divide-y divide-brand-800/6 px-5 pb-4">
            {upcoming.map((e) => (
              <li key={e.id} className="flex gap-4">
                <span className="tabular w-16 shrink-0 pt-3 text-[12.5px] font-semibold text-ink-500">{fmtDate(e.date).slice(0, 5)}</span>
                <ul className="min-w-0 flex-1"><EventRow e={e} compact /></ul>
              </li>
            ))}
          </ul>
        </Card>
      )}
      {toast.node}
    </>
  )
}
