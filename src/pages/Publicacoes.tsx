import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { PageHeader } from '@/components/ui/PageHeader'
import { Icon } from '@/components/ui/Icon'
import { Badge, Button, Card, StatTile, Tabs, UserName, cx, statusBadge, useDemoToast } from '@/components/ui/primitives'
import { caseById, clientById, publications as seed, type Publication } from '@/data/mock'
import { fmtDate, relativeDays } from '@/lib/format'

type Filter = 'todas' | 'Nova' | 'Em análise' | 'Tratada'

export function Publicacoes() {
  const [pubs, setPubs] = useState<Publication[]>(seed)
  const [filter, setFilter] = useState<Filter>('todas')
  const [sel, setSel] = useState<string>(seed[0].id)
  const toast = useDemoToast()

  const list = useMemo(() => pubs.filter((p) => filter === 'todas' || p.status === filter), [pubs, filter])
  const current = pubs.find((p) => p.id === sel) ?? list[0]
  const update = (id: string, patch: Partial<Publication>) => setPubs((ps) => ps.map((p) => (p.id === id ? { ...p, ...patch } : p)))

  const count = (s: Publication['status']) => pubs.filter((p) => p.status === s).length

  return (
    <>
      <PageHeader
        title="Publicações e intimações"
        description="Capturadas automaticamente nos diários oficiais pelos nomes e números de OAB da equipe"
        actions={<Button icon="search" onClick={() => toast.show('Busca manual nos diários por nome, OAB ou número de processo.')}>Buscar nos diários</Button>}
        explain={{
          what: 'Caixa de entrada das publicações. O sistema monitora os diários oficiais, reconhece as publicações da equipe, vincula ao processo cadastrado e sugere o prazo correspondente. A equipe só precisa confirmar.',
          shows: [
            'Triagem por status: nova, em análise e tratada (as ações funcionam no protótipo)',
            'Vínculo automático ao processo pelo número ou OAB',
            'Prazo sugerido a partir do texto da publicação, com um clique para criar na agenda',
            'Alerta para publicações sem processo cadastrado (homônimos)',
          ],
          note: 'A cobertura dos diários (DJe, DEJT, DOU) e a regra de contagem dependem de avaliação técnica por tribunal.',
        }}
      />

      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatTile icon="newspaper" tone="accent" label="Novas hoje" value={count('Nova')} hint="aguardando triagem" />
        <StatTile icon="eye" tone="warn" label="Em análise" value={count('Em análise')} hint="1 sem processo vinculado" />
        <StatTile icon="check-circle" label="Tratadas · 7 dias" value={count('Tratada')} hint="100% com prazo criado" />
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[420px_1fr]">
        <Card>
          <div className="px-4 pt-3">
            <Tabs<Filter>
              value={filter}
              onChange={setFilter}
              tabs={[
                { id: 'todas', label: 'Todas', count: pubs.length },
                { id: 'Nova', label: 'Novas', count: count('Nova') },
                { id: 'Em análise', label: 'Em análise', count: count('Em análise') },
                { id: 'Tratada', label: 'Tratadas', count: count('Tratada') },
              ]}
            />
          </div>
          <ul className="scroll-thin max-h-[640px] divide-y divide-brand-800/6 overflow-y-auto">
            {list.map((p) => {
              const c = p.caseId ? caseById(p.caseId) : undefined
              return (
                <li key={p.id}>
                  <button type="button" onClick={() => setSel(p.id)} className={cx('w-full px-4 py-3.5 text-left transition-colors hover:bg-paper-100', current?.id === p.id && 'bg-accent-500/8')}>
                    <div className="flex items-center justify-between gap-2 text-xs text-ink-500">
                      <span className="font-semibold">{p.source} · {fmtDate(p.date)}</span>
                      {statusBadge(p.status)}
                    </div>
                    <p className="mt-1.5 line-clamp-2 text-[13.5px] leading-snug text-brand-800">{p.excerpt}</p>
                    <p className="mt-1 truncate text-xs text-ink-500">{c ? c.title : <span className="inline-flex items-center gap-1 text-warn-700"><Icon name="alert" size={12} /> sem processo vinculado</span>}</p>
                  </button>
                </li>
              )
            })}
            {list.length === 0 && <li className="px-4 py-8 text-center text-sm text-ink-500">Nenhuma publicação neste filtro.</li>}
          </ul>
        </Card>

        {current && (
          <Card className="p-5 sm:p-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="brand">{current.source}</Badge>
              <span className="text-sm text-ink-500">{fmtDate(current.date, 'long')} · {relativeDays(current.date)}</span>
              <span className="ml-auto">{statusBadge(current.status)}</span>
            </div>
            <blockquote className="mt-4 rounded-xl border-l-4 border-accent-500 bg-paper-100 p-4 font-serif text-[15px] leading-relaxed text-brand-800">
              {current.excerpt}
            </blockquote>
            <p className="mt-2 text-xs text-ink-500">Identificada por: <strong className="text-brand-800">{current.matchedBy}</strong></p>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-brand-800/10 p-4">
                <p className="label-xs">Processo vinculado</p>
                {current.caseId ? (
                  (() => {
                    const c = caseById(current.caseId)!
                    return (
                      <>
                        <Link to={`/app/processos/${c.id}`} className="mt-1.5 block font-medium text-brand-800 hover:text-accent-700">{c.title}</Link>
                        <p className="font-mono text-[11.5px] text-ink-500">{c.number}</p>
                        <p className="mt-2 text-sm text-ink-700">{clientById(c.clientId).name}</p>
                        <p className="mt-2 text-sm"><UserName id={c.responsible} short /></p>
                      </>
                    )
                  })()
                ) : (
                  <>
                    <p className="mt-1.5 text-sm text-ink-700">Nenhum processo com este número no cadastro.</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Button size="sm" icon="link" onClick={() => toast.show('Abriria a busca para vincular a um processo existente.')}>Vincular</Button>
                      <Button size="sm" icon="plus" onClick={() => toast.show('Criaria um novo processo a partir da publicação.')}>Cadastrar processo</Button>
                      <Button size="sm" variant="ghost" icon="close" onClick={() => { update(current.id, { status: 'Tratada' }); toast.show('Publicação descartada como homônimo.') }}>Não é nosso</Button>
                    </div>
                  </>
                )}
              </div>

              <div className={cx('rounded-xl border p-4', current.suggestedDeadline ? 'border-accent-500/30 bg-accent-500/6' : 'border-brand-800/10')}>
                <p className="label-xs text-accent-700">Prazo sugerido</p>
                {current.suggestedDeadline ? (
                  <>
                    <p className="mt-1.5 font-medium text-brand-800">{current.suggestedDeadline.title}</p>
                    <p className="tabular mt-1 font-display text-2xl font-bold text-brand-800">{fmtDate(current.suggestedDeadline.date)}</p>
                    <p className="text-xs text-ink-500">{relativeDays(current.suggestedDeadline.date)} · contagem em dias úteis a confirmar</p>
                  </>
                ) : (
                  <p className="mt-1.5 text-sm text-ink-700">Esta publicação não gera prazo. Apenas registro no histórico do processo.</p>
                )}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2 border-t border-brand-800/8 pt-5">
              {current.status !== 'Tratada' ? (
                <>
                  {current.suggestedDeadline && (
                    <Button variant="primary" icon="calendar" onClick={() => { update(current.id, { status: 'Tratada' }); toast.show(`Prazo criado na agenda: ${current.suggestedDeadline?.title}.`) }}>Criar prazo e marcar como tratada</Button>
                  )}
                  <Button icon="history" onClick={() => { update(current.id, { status: 'Tratada' }); toast.show('Publicação registrada no histórico do processo.') }}>Só registrar no processo</Button>
                  {current.status === 'Nova' && <Button variant="ghost" icon="eye" onClick={() => update(current.id, { status: 'Em análise' })}>Marcar em análise</Button>}
                </>
              ) : (
                <>
                  <span className="inline-flex items-center gap-2 text-sm text-ok-600"><Icon name="check-circle" size={16} /> Tratada. Registrada no processo e na agenda.</span>
                  <Button size="sm" variant="ghost" onClick={() => update(current.id, { status: 'Nova' })}>Reabrir</Button>
                </>
              )}
              <Button variant="ghost" icon="send" className="ml-auto" onClick={() => toast.show('Encaminharia a publicação a outro membro da equipe.')}>Encaminhar</Button>
            </div>
          </Card>
        )}
      </div>
      {toast.node}
    </>
  )
}
