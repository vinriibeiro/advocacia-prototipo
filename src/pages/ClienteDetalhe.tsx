import { Link, Navigate, useParams } from 'react-router-dom'
import { PageHeader } from '@/components/ui/PageHeader'
import { Icon } from '@/components/ui/Icon'
import { Badge, Button, Card, Table, Td, Th, UserName, statusBadge, useDemoToast } from '@/components/ui/primitives'
import { cases, clients, contracts, docs, events, receivables } from '@/data/mock'
import { fmtDate, money, relativeDays } from '@/lib/format'

export function ClienteDetalhe() {
  const { id } = useParams()
  const c = clients.find((x) => x.id === id)
  const toast = useDemoToast()
  if (!c) return <Navigate to="/app/clientes" replace />

  const cs = cases.filter((p) => p.clientId === c.id)
  const ct = contracts.filter((k) => k.clientId === c.id)
  const rc = receivables.filter((r) => r.clientId === c.id)
  const ds = docs.filter((d) => d.clientId === c.id)
  const ev = events.filter((e) => e.clientId === c.id || cs.some((p) => p.id === e.caseId)).filter((e) => !e.done).sort((a, b) => a.date.localeCompare(b.date)).slice(0, 4)

  return (
    <>
      <Link to="/app/clientes" className="mb-3 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-accent-700"><Icon name="arrow-left" size={15} /> Clientes</Link>
      <PageHeader
        title={c.name}
        description={`${c.kind === 'PJ' ? 'Pessoa jurídica' : 'Pessoa física'} · ${c.kind === 'PJ' ? 'CNPJ' : 'CPF'} ${c.doc} · cliente desde ${fmtDate(c.since)}`}
        actions={
          <>
            <Button icon="message" onClick={() => toast.show('Abriria uma conversa pelo WhatsApp com o contato do cliente.')}>WhatsApp</Button>
            <Button icon="file-text" variant="primary" onClick={() => toast.show('Relatório de acompanhamento gerado a partir de um modelo.')}>Relatório ao cliente</Button>
          </>
        }
        explain={{
          what: 'Visão 360° do cliente: contatos, responsável, processos, contratos de honorários, cobranças e documentos. Tudo que o escritório faz para o cliente aparece aqui, sem precisar procurar em pastas ou planilhas.',
          shows: [
            'Processos do cliente com status e próximo prazo',
            'Contratos de honorários (fixo, mensal, êxito ou por hora)',
            'Histórico de cobranças e recebimentos',
            'Geração de relatório de acompanhamento com um clique',
          ],
        }}
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card className="p-5">
          <p className="label-xs">Contato</p>
          <ul className="mt-3 space-y-2.5 text-[14px] text-brand-800">
            <li className="flex items-center gap-2.5"><Icon name="mail" size={16} className="text-ink-400" />{c.email}</li>
            <li className="flex items-center gap-2.5"><Icon name="phone" size={16} className="text-ink-400" />{c.phone}</li>
            <li className="flex items-center gap-2.5"><Icon name="pin" size={16} className="text-ink-400" />{c.city}</li>
            {c.segment && <li className="flex items-center gap-2.5"><Icon name="tag" size={16} className="text-ink-400" />{c.segment}</li>}
          </ul>
          <p className="label-xs mt-5">Responsável</p>
          <p className="mt-2 text-sm"><UserName id={c.responsible} /></p>
          <p className="label-xs mt-5">Status</p>
          <p className="mt-2">{statusBadge(c.status)}</p>
        </Card>

        <Card className="lg:col-span-2" title="Processos" subtitle={`${cs.filter((p) => p.status !== 'Encerrado').length} ativos`}>
          {cs.length === 0 ? (
            <p className="px-5 pb-5 text-sm text-ink-500">Nenhum processo vinculado. {c.status === 'Prospecto' && 'Proposta de honorários em revisão.'}</p>
          ) : (
            <Table>
              <thead><tr><Th>Processo</Th><Th>Área</Th><Th>Status</Th><Th>Próximo prazo</Th><Th right>Valor</Th></tr></thead>
              <tbody>
                {cs.map((p) => {
                  const nd = events.filter((e) => e.caseId === p.id && !e.done).sort((a, b) => a.date.localeCompare(b.date))[0]
                  return (
                    <tr key={p.id} className="hover:bg-paper-100/70">
                      <Td><Link to={`/app/processos/${p.id}`} className="font-medium text-brand-800 hover:text-accent-700">{p.title}</Link><span className="block font-mono text-[11px] text-ink-500">{p.number}</span></Td>
                      <Td>{p.area}</Td>
                      <Td>{statusBadge(p.status)}</Td>
                      <Td>{nd ? <span className="text-[13px]">{fmtDate(nd.date)} <span className="text-xs text-ink-500">· {relativeDays(nd.date)}</span></span> : <span className="text-ink-400">—</span>}</Td>
                      <Td right>{money(p.value, true)}</Td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          )}
        </Card>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card title="Honorários" subtitle={`${ct.length} contrato(s)`}>
          <ul className="space-y-2 px-5 pb-5">
            {ct.map((k) => (
              <li key={k.id} className="rounded-xl border border-brand-800/8 p-3">
                <div className="flex items-center justify-between"><Badge tone="accent">{k.model}</Badge>{k.model !== 'Êxito' && <span className="tabular text-sm font-semibold text-brand-800">{money(k.value)}{k.model === 'Mensal' ? '/mês' : k.model === 'Por hora' ? '/h' : ''}</span>}</div>
                <p className="mt-1.5 text-[13px] text-ink-700">{k.description}</p>
              </li>
            ))}
            {ct.length === 0 && <li className="text-sm text-ink-500">Nenhum contrato cadastrado.</li>}
          </ul>
        </Card>

        <Card title="Cobranças" subtitle="Últimos lançamentos">
          <Table>
            <thead><tr><Th>Descrição</Th><Th>Venc.</Th><Th right>Valor</Th></tr></thead>
            <tbody>
              {rc.map((r) => (
                <tr key={r.id}>
                  <Td><span className="block text-[13px]">{r.description}</span>{statusBadge(r.status)}</Td>
                  <Td muted>{fmtDate(r.due)}</Td>
                  <Td right>{money(r.value)}</Td>
                </tr>
              ))}
              {rc.length === 0 && <tr><Td className="text-center text-ink-500">Sem cobranças.</Td></tr>}
            </tbody>
          </Table>
        </Card>

        <div className="grid grid-cols-1 gap-5">
          <Card title="Próximos compromissos">
            <ul className="divide-y divide-brand-800/6 px-5 pb-3">
              {ev.map((e) => (
                <li key={e.id} className="flex items-center gap-3 py-2.5 text-[13px]">
                  <span className="tabular w-14 font-semibold text-brand-800">{fmtDate(e.date).slice(0, 5)}</span>
                  <span className="min-w-0 flex-1 truncate">{e.title}</span>
                  <Badge tone={e.kind === 'Prazo fatal' ? 'danger' : e.kind === 'Audiência' ? 'info' : 'neutral'}>{e.kind}</Badge>
                </li>
              ))}
              {ev.length === 0 && <li className="py-2 text-sm text-ink-500">Nada agendado.</li>}
            </ul>
          </Card>
          <Card title="Documentos" subtitle={`${ds.length} arquivos`}>
            <ul className="divide-y divide-brand-800/6 px-5 pb-3">
              {ds.slice(0, 4).map((d) => (
                <li key={d.id} className="flex items-center gap-2.5 py-2 text-[13px]"><Icon name="file" size={15} className="text-ink-400" /><span className="min-w-0 flex-1 truncate">{d.name}</span><span className="text-xs text-ink-500">v{d.version}</span></li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
      {toast.node}
    </>
  )
}
