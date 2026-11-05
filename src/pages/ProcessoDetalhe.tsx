import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { PageHeader } from '@/components/ui/PageHeader'
import { Icon, type IconName } from '@/components/ui/Icon'
import { Avatar, AvatarStack, Badge, Button, Card, Progress, Tabs, Table, Td, Th, UserName, cx, statusBadge, useDemoToast } from '@/components/ui/primitives'
import { caseById, clientById, contracts, docs, events, movements, tasks, timesheet } from '@/data/mock'
import { fmtDate, hours, money, relativeDays } from '@/lib/format'

type Tab = 'andamentos' | 'prazos' | 'documentos' | 'tarefas' | 'financeiro' | 'partes'

const kindIcon: Record<string, IconName> = { Andamento: 'history', Publicação: 'newspaper', Petição: 'file-text', Audiência: 'gavel', Decisão: 'scale', Interno: 'message' }

export function ProcessoDetalhe() {
  const { id } = useParams()
  const c = id ? caseById(id) : undefined
  const [tab, setTab] = useState<Tab>('andamentos')
  const toast = useDemoToast()
  if (!c) return <Navigate to="/app/processos" replace />

  const client = clientById(c.clientId)
  const moves = movements.filter((m) => m.caseId === c.id).sort((a, b) => b.date.localeCompare(a.date))
  const evs = events.filter((e) => e.caseId === c.id).sort((a, b) => a.date.localeCompare(b.date))
  const ds = docs.filter((d) => d.caseId === c.id)
  const ts = tasks.filter((t) => t.caseId === c.id)
  const ct = contracts.find((k) => k.caseId === c.id) ?? contracts.find((k) => k.clientId === c.clientId)
  const hrs = timesheet.filter((t) => t.caseId === c.id)
  const totalH = hrs.reduce((a, b) => a + b.hours, 0)

  return (
    <>
      <Link to="/app/processos" className="mb-3 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-accent-700">
        <Icon name="arrow-left" size={15} /> Processos
      </Link>
      <PageHeader
        title={c.title}
        description={`${c.number} · ${c.unit} · ${c.court}`}
        actions={
          <>
            <Button icon="external" onClick={() => toast.show('Abriria a consulta pública no site do tribunal.')}>Consultar no tribunal</Button>
            <Button icon="plus" variant="primary" onClick={() => toast.show('Registro de andamento manual abriria aqui.')}>Registrar andamento</Button>
          </>
        }
        explain={{
          what: 'A ficha do processo concentra tudo o que a equipe precisa: dados do caso, partes, histórico de andamentos, prazos, documentos, tarefas e o financeiro vinculado. Cada aba mostra um recorte do mesmo processo.',
          shows: [
            'Linha do tempo unificando andamentos do tribunal, petições e anotações internas',
            'Prazos e audiências do processo com responsável e situação',
            'Documentos versionados e tarefas vinculadas',
            'Horas lançadas e contrato de honorários do caso',
          ],
          note: 'A captura automática de andamentos depende do tribunal e é avaliada por projeto.',
        }}
      />

      {/* resumo */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <div className="flex flex-wrap items-center gap-2">
            {statusBadge(c.status)}
            <Badge tone="brand">{c.area}</Badge>
            <Badge>{c.phase}</Badge>
            {c.tags.map((t) => <Badge key={t} icon="tag">{t}</Badge>)}
            <span className="ml-auto inline-flex items-center gap-1.5 text-xs text-ink-500">Risco {statusBadge(c.risk)}</span>
          </div>
          <dl className="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ['Cliente', <Link to={`/app/clientes/${client.id}`} className="font-medium text-accent-700 hover:underline">{client.name}</Link>],
              ['Posição do cliente', c.role],
              ['Parte contrária', c.opponent],
              ['Valor da causa', money(c.value)],
              ['Distribuído em', fmtDate(c.opened)],
              ['Última movimentação', `${fmtDate(c.lastMove)} · ${relativeDays(c.lastMove)}`],
            ].map(([k, v]) => (
              <div key={String(k)}>
                <dt className="label-xs">{k}</dt>
                <dd className="mt-0.5 text-[14px] text-brand-800">{v}</dd>
              </div>
            ))}
          </dl>
          {c.nextAction && (
            <div className="mt-5 flex items-center gap-3 rounded-xl border border-accent-500/30 bg-accent-500/8 px-4 py-3">
              <Icon name="zap" className="shrink-0 text-accent-700" />
              <div className="min-w-0 flex-1">
                <p className="label-xs text-accent-700">Próxima ação</p>
                <p className="text-[14px] font-medium text-brand-800">{c.nextAction}</p>
              </div>
              <UserName id={c.responsible} short />
            </div>
          )}
        </Card>

        <Card className="p-5">
          <p className="label-xs">Equipe</p>
          <ul className="mt-3 space-y-2.5">
            {c.team.map((u, i) => (
              <li key={u} className="flex items-center justify-between gap-3 text-sm">
                <UserName id={u} />
                <span className="text-xs text-ink-500">{i === 0 ? 'Responsável' : 'Apoio'}</span>
              </li>
            ))}
          </ul>
          <p className="label-xs mt-5">Horas no caso</p>
          <p className="tabular mt-1 font-display text-2xl font-bold text-brand-800">{hours(totalH)}</p>
          <Progress value={totalH} max={40} />
          <p className="mt-1 text-xs text-ink-500">{hrs.filter((h) => h.billable).length} lançamentos faturáveis</p>
          {ct && (
            <>
              <p className="label-xs mt-5">Honorários</p>
              <p className="mt-1 text-[13.5px] text-brand-800">{ct.description}</p>
              <Badge tone="accent" className="mt-1.5">{ct.model}</Badge>
            </>
          )}
        </Card>
      </div>

      {/* abas */}
      <Card className="mt-5">
        <div className="px-5 pt-3">
          <Tabs<Tab>
            value={tab}
            onChange={setTab}
            tabs={[
              { id: 'andamentos', label: 'Andamentos', count: moves.length },
              { id: 'prazos', label: 'Prazos e audiências', count: evs.length },
              { id: 'documentos', label: 'Documentos', count: ds.length },
              { id: 'tarefas', label: 'Tarefas', count: ts.length },
              { id: 'financeiro', label: 'Horas e honorários', count: hrs.length },
              { id: 'partes', label: 'Partes' },
            ]}
          />
        </div>

        {tab === 'andamentos' && (
          <ol className="relative px-5 py-5">
            <span className="absolute top-6 bottom-6 left-[2.35rem] w-px bg-brand-800/10" aria-hidden="true" />
            {moves.map((m) => (
              <li key={m.id} className="relative flex gap-4 py-3">
                <span className={cx('relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ring-4 ring-white', m.kind === 'Publicação' ? 'bg-accent-500 text-brand-800' : m.kind === 'Decisão' ? 'bg-brand-800 text-accent-400' : 'bg-brand-800/8 text-brand-800')}>
                  <Icon name={kindIcon[m.kind]} size={14} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-ink-500">
                    <span className="tabular font-semibold text-brand-800">{fmtDate(m.date)}</span>
                    <Badge>{m.kind}</Badge>
                    {m.by && <span className="inline-flex items-center gap-1"><Avatar userId={m.by} size={16} /> registrado internamente</span>}
                  </div>
                  <p className="mt-1 text-[14px] leading-relaxed text-brand-800">{m.text}</p>
                </div>
              </li>
            ))}
          </ol>
        )}

        {tab === 'prazos' && (
          <Table>
            <thead><tr><Th>Data</Th><Th>Tipo</Th><Th>Compromisso</Th><Th>Responsável</Th><Th>Situação</Th></tr></thead>
            <tbody>
              {evs.map((e) => (
                <tr key={e.id}>
                  <Td><span className="tabular font-medium">{fmtDate(e.date)}</span>{e.time && <span className="text-ink-500"> · {e.time}</span>}</Td>
                  <Td><Badge tone={e.kind === 'Prazo fatal' ? 'danger' : e.kind === 'Audiência' ? 'info' : e.kind === 'Prazo interno' ? 'warn' : 'neutral'}>{e.kind}</Badge></Td>
                  <Td>{e.title}{e.location && <span className="block text-xs text-ink-500">{e.location}</span>}</Td>
                  <Td><UserName id={e.assignee} short /></Td>
                  <Td>{e.done ? <Badge tone="ok" icon="check">Concluído</Badge> : <span className="text-xs text-ink-500">{relativeDays(e.date)}</span>}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        {tab === 'documentos' && (
          <Table>
            <thead><tr><Th>Documento</Th><Th>Versão</Th><Th>Atualizado</Th><Th>Por</Th><Th>Tamanho</Th><Th /></tr></thead>
            <tbody>
              {ds.map((d) => (
                <tr key={d.id} className="hover:bg-paper-100/70">
                  <Td><span className="inline-flex items-center gap-2 font-medium"><Icon name={d.type === 'docx' ? 'file-text' : d.type === 'xlsx' ? 'sheet' : 'file'} size={16} className="text-ink-500" />{d.name}{d.signed && <Badge tone="ok" icon="shield">assinado</Badge>}</span></Td>
                  <Td muted>v{d.version}</Td>
                  <Td muted>{fmtDate(d.updated)}</Td>
                  <Td><UserName id={d.by} short /></Td>
                  <Td muted>{d.size}</Td>
                  <Td right><Button size="sm" variant="ghost" icon="download" onClick={() => toast.show('Download iniciaria no sistema real.')} /></Td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        {tab === 'tarefas' && (
          <ul className="divide-y divide-brand-800/6 px-5 py-2">
            {ts.map((t) => (
              <li key={t.id} className="flex items-center gap-3 py-3">
                <span className={cx('flex h-5 w-5 items-center justify-center rounded-md border', t.column === 'Concluído' ? 'border-accent-500 bg-accent-500 text-brand-800' : 'border-brand-800/20')}>{t.column === 'Concluído' && <Icon name="check" size={12} />}</span>
                <div className="min-w-0 flex-1">
                  <p className={cx('text-[14px] font-medium', t.column === 'Concluído' ? 'text-ink-500 line-through' : 'text-brand-800')}>{t.title}</p>
                  <p className="text-xs text-ink-500">{t.column} · vence {t.due ? fmtDate(t.due) : '—'}</p>
                </div>
                {statusBadge(t.priority)}
                <Avatar userId={t.assignee} size={24} />
              </li>
            ))}
          </ul>
        )}

        {tab === 'financeiro' && (
          <div className="grid grid-cols-1 gap-5 p-5 lg:grid-cols-[1fr_280px]">
            <Table className="rounded-xl border border-brand-800/8">
              <thead><tr><Th>Data</Th><Th>Profissional</Th><Th>Descrição</Th><Th right>Horas</Th><Th>Faturável</Th></tr></thead>
              <tbody>
                {hrs.map((h) => (
                  <tr key={h.id}>
                    <Td muted>{fmtDate(h.date)}</Td>
                    <Td><UserName id={h.userId} short /></Td>
                    <Td>{h.description}</Td>
                    <Td right>{hours(h.hours)}</Td>
                    <Td>{h.billable ? <Badge tone="ok" icon="check">sim</Badge> : <Badge>não</Badge>}</Td>
                  </tr>
                ))}
                {hrs.length === 0 && <tr><Td className="text-center text-ink-500">Nenhuma hora lançada neste processo.</Td></tr>}
              </tbody>
            </Table>
            <div className="rounded-xl bg-brand-800 p-5 text-white">
              <p className="text-[10.5px] font-semibold tracking-wider text-white/60 uppercase">Contrato vinculado</p>
              <p className="mt-2 font-display text-lg font-semibold">{ct?.model ?? '—'}</p>
              <p className="mt-1 text-sm text-white/75">{ct?.description}</p>
              <p className="mt-5 text-[10.5px] font-semibold tracking-wider text-white/60 uppercase">Horas faturáveis</p>
              <p className="tabular mt-1 font-display text-2xl font-bold text-accent-400">{hours(hrs.filter((h) => h.billable).reduce((a, b) => a + b.hours, 0))}</p>
              <Button variant="primary" size="sm" className="mt-4 w-full" icon="send" onClick={() => toast.show('Geraria a fatura das horas para o cliente.')}>Gerar fatura</Button>
            </div>
          </div>
        )}

        {tab === 'partes' && (
          <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-2">
            {[
              { label: c.role, name: client.name, sub: `${client.kind === 'PJ' ? 'CNPJ' : 'CPF'} ${client.doc} · ${client.city}`, ours: true },
              { label: c.role === 'Autor' || c.role === 'Requerente' || c.role === 'Reclamante' ? 'Parte contrária' : 'Parte contrária (autora)', name: c.opponent, sub: 'Advogado(a) da parte: não informado no protótipo', ours: false },
            ].map((p) => (
              <div key={p.name} className={cx('rounded-xl border p-4', p.ours ? 'border-accent-500/30 bg-accent-500/6' : 'border-brand-800/10')}>
                <p className="label-xs">{p.label}</p>
                <p className="mt-1 font-display text-base font-semibold text-brand-800">{p.name}</p>
                <p className="mt-0.5 text-xs text-ink-500">{p.sub}</p>
                {p.ours && <div className="mt-3"><AvatarStack ids={c.team} /></div>}
              </div>
            ))}
            <div className="rounded-xl border border-brand-800/10 p-4 md:col-span-2">
              <p className="label-xs">Juízo</p>
              <p className="mt-1 text-[14px] text-brand-800">{c.unit} · {c.court}</p>
            </div>
          </div>
        )}
      </Card>
      {toast.node}
    </>
  )
}
