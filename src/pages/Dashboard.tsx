import { Link } from 'react-router-dom'
import { PageHeader } from '@/components/ui/PageHeader'
import { Icon } from '@/components/ui/Icon'
import { Avatar, Badge, Button, Card, StatTile, cx, statusBadge } from '@/components/ui/primitives'
import { BarChart, StackedBar } from '@/components/ui/charts'
import { caseById, cases, casesByArea, clientById, events, newCasesByMonth, publications, receivables, tasks } from '@/data/mock'
import { daysFromToday, fmtDate, money, relativeDays, toISO, TODAY } from '@/lib/format'

const kindTone: Record<string, 'danger' | 'warn' | 'info' | 'accent' | 'neutral'> = {
  'Prazo fatal': 'danger',
  'Prazo interno': 'warn',
  Audiência: 'info',
  Reunião: 'accent',
  Diligência: 'neutral',
}

export function Dashboard() {
  const today = toISO(TODAY)
  const upcoming = events.filter((e) => !e.done && daysFromToday(e.date) >= 0 && daysFromToday(e.date) <= 14).sort((a, b) => a.date.localeCompare(b.date))
  const todayEvents = events.filter((e) => e.date === today)
  const fatal = upcoming.filter((e) => e.kind === 'Prazo fatal')
  const hearings = upcoming.filter((e) => e.kind === 'Audiência')
  const overdue = receivables.filter((r) => r.status === 'Atrasado').reduce((a, b) => a + b.value, 0)
  const toReceive = receivables.filter((r) => r.status === 'A vencer').reduce((a, b) => a + b.value, 0)
  const newPubs = publications.filter((p) => p.status !== 'Tratada')
  const myTasks = tasks.filter((t) => t.column !== 'Concluído').slice(0, 5)

  return (
    <>
      <PageHeader
        title={`Bom dia, ${'Helena'}.`}
        description={`Quinta-feira, ${fmtDate(today, 'long')} · visão geral do escritório`}
        actions={
          <>
            <Button icon="plus" variant="primary">Novo processo</Button>
            <Button icon="calendar">Novo compromisso</Button>
          </>
        }
        explain={{
          what: 'O painel é a primeira tela do dia. Reúne, em uma só visão, o que exige atenção imediata: prazos fatais, audiências, publicações não tratadas, recebimentos em atraso e as tarefas da equipe.',
          shows: [
            'Indicadores calculados automaticamente a partir dos dados do sistema',
            'Agenda do dia e prazos dos próximos 14 dias com responsável',
            'Gráfico de novos processos por mês e distribuição da carteira por área',
            'Atalhos para as ações mais frequentes',
          ],
          note: 'Cada escritório pode definir quais indicadores aparecem aqui e para quais perfis.',
        }}
      />

      {/* indicadores */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile icon="briefcase" label="Processos ativos" value={casesByArea.reduce((a, b) => a + b.active, 0)} trend={{ value: '+3', up: true }} hint="neste mês" />
        <StatTile icon="alert" tone="danger" label="Prazos fatais · 14 dias" value={fatal.length} hint={fatal[0] ? `próximo ${relativeDays(fatal[0].date)}` : 'nenhum'} />
        <StatTile icon="gavel" tone="accent" label="Audiências · 14 dias" value={hearings.length} hint={hearings[0] ? `${fmtDate(hearings[0].date)} · ${hearings[0].time}` : 'nenhuma'} />
        <StatTile icon="wallet" tone="warn" label="A receber · 30 dias" value={money(toReceive, true)} hint={<span className="text-danger-700">{money(overdue, true)} em atraso</span>} />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-3">
        {/* agenda de hoje + prazos */}
        <Card className="xl:col-span-1" title="Hoje" subtitle={`${todayEvents.length} compromissos`} action={<Link to="/app/agenda" className="text-sm font-semibold text-accent-700 hover:underline">Agenda</Link>}>
          <ul className="divide-y divide-brand-800/6 px-5 pb-4">
            {todayEvents.map((e) => (
              <li key={e.id} className="flex items-start gap-3 py-3">
                <span className="tabular w-12 shrink-0 pt-0.5 font-display text-sm font-semibold text-brand-800">{e.time ?? '—'}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-[13.5px] leading-snug font-medium text-brand-800">{e.title}</p>
                  <p className="mt-1 flex flex-wrap items-center gap-2 text-xs text-ink-500">
                    <Badge tone={kindTone[e.kind]}>{e.kind}</Badge>
                    {e.location && <span>{e.location}</span>}
                  </p>
                </div>
                <Avatar userId={e.assignee} size={24} />
              </li>
            ))}
          </ul>
          <div className="border-t border-brand-800/8 px-5 py-4">
            <p className="label-xs mb-3">Próximos prazos</p>
            <ul className="space-y-2.5">
              {upcoming.filter((e) => e.kind.startsWith('Prazo') || e.kind === 'Audiência').slice(0, 5).map((e) => {
                const d = daysFromToday(e.date)
                const c = e.caseId ? caseById(e.caseId) : undefined
                return (
                  <li key={e.id} className="flex items-center gap-3">
                    <span className={cx('flex h-9 w-9 shrink-0 flex-col items-center justify-center rounded-lg font-display leading-none', d <= 2 ? 'bg-danger-100 text-danger-700' : 'bg-brand-800/6 text-brand-800')}>
                      <span className="text-[14px] font-bold">{d}</span>
                      <span className="text-[8.5px] font-semibold uppercase">dias</span>
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13px] font-medium text-brand-800">{e.title}</p>
                      <p className="truncate text-xs text-ink-500">{c ? clientById(c.clientId).name : 'Interno'} · {fmtDate(e.date)}</p>
                    </div>
                    <Avatar userId={e.assignee} size={22} />
                  </li>
                )
              })}
            </ul>
          </div>
        </Card>

        {/* gráficos */}
        <div className="grid grid-cols-1 gap-5 xl:col-span-2">
          <Card title="Novos processos por mês" subtitle="Últimos 12 meses" action={<Badge tone="accent" icon="trending-up">+22% vs. ano anterior</Badge>}>
            <div className="px-5 pb-5">
              <BarChart labels={newCasesByMonth.map((m) => m.month)} series={[{ name: 'Novos processos', values: newCasesByMonth.map((m) => m.value) }]} height={190} />
            </div>
          </Card>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Card title="Carteira ativa por área" subtitle={`${casesByArea.reduce((a, b) => a + b.active, 0)} processos`}>
              <div className="px-5 pb-5">
                <StackedBar items={casesByArea.slice(0, 4).map((a) => ({ label: a.area, value: a.active }))} />
              </div>
            </Card>
            <Card title="Publicações a tratar" subtitle="Capturadas nos diários oficiais" action={<Link to="/app/publicacoes" className="text-sm font-semibold text-accent-700 hover:underline">Ver todas</Link>}>
              <ul className="space-y-2 px-5 pb-5">
                {newPubs.slice(0, 3).map((p) => {
                  const c = p.caseId ? caseById(p.caseId) : undefined
                  return (
                    <li key={p.id} className="rounded-xl border border-brand-800/8 p-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-semibold text-ink-500">{p.source} · {fmtDate(p.date)}</span>
                        {statusBadge(p.status)}
                      </div>
                      <p className="mt-1.5 line-clamp-2 text-[13px] leading-snug text-brand-800">{p.excerpt}</p>
                      {c && <p className="mt-1 truncate text-xs text-ink-500">{c.title}</p>}
                    </li>
                  )
                })}
              </ul>
            </Card>
          </div>
        </div>
      </div>

      {/* tarefas e processos recentes */}
      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card title="Tarefas em aberto" subtitle="Equipe · ordenadas por vencimento" action={<Link to="/app/tarefas" className="text-sm font-semibold text-accent-700 hover:underline">Quadro</Link>}>
          <ul className="divide-y divide-brand-800/6 px-5 pb-3">
            {myTasks.sort((a, b) => (a.due ?? '').localeCompare(b.due ?? '')).map((t) => (
              <li key={t.id} className="flex items-center gap-3 py-2.5">
                <span className={cx('h-2 w-2 shrink-0 rounded-full', t.priority === 'Alta' ? 'bg-danger-700' : t.priority === 'Média' ? 'bg-warn-700' : 'bg-brand-800/30')} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13.5px] font-medium text-brand-800">{t.title}</p>
                  <p className="text-xs text-ink-500">{t.column} · vence {t.due ? relativeDays(t.due) : '—'}</p>
                </div>
                <Avatar userId={t.assignee} size={24} />
              </li>
            ))}
          </ul>
        </Card>
        <Card title="Movimentações recentes" subtitle="Processos com atualização nos últimos dias" action={<Link to="/app/processos" className="text-sm font-semibold text-accent-700 hover:underline">Processos</Link>}>
          <ul className="divide-y divide-brand-800/6 px-5 pb-3">
            {[...cases].sort((a, b) => b.lastMove.localeCompare(a.lastMove)).slice(0, 5).map((c) => (
              <li key={c.id} className="py-2.5">
                <Link to={`/app/processos/${c.id}`} className="group flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-800/6 text-brand-800"><Icon name="briefcase" size={15} /></span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13.5px] font-medium text-brand-800 group-hover:text-accent-700">{c.title}</p>
                    <p className="truncate text-xs text-ink-500">{c.nextAction ?? c.phase} · {relativeDays(c.lastMove)}</p>
                  </div>
                  {statusBadge(c.status)}
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  )
}
