import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { PageHeader } from '@/components/ui/PageHeader'
import { Icon } from '@/components/ui/Icon'
import { Badge, Button, Card, EmptyState, SearchInput, Select, StatTile, Table, Td, Th, UserName, statusBadge, useDemoToast } from '@/components/ui/primitives'
import { cases, clients, receivables } from '@/data/mock'
import { fmtDate, money } from '@/lib/format'

export function Clientes() {
  const [q, setQ] = useState('')
  const [kind, setKind] = useState('')
  const [status, setStatus] = useState('')
  const toast = useDemoToast()

  const list = useMemo(
    () => clients.filter((c) => (!q || `${c.name} ${c.doc} ${c.city}`.toLowerCase().includes(q.toLowerCase())) && (!kind || (kind === 'Pessoa jurídica' ? c.kind === 'PJ' : c.kind === 'PF')) && (!status || c.status === status)),
    [q, kind, status],
  )

  const activeCases = (id: string) => cases.filter((c) => c.clientId === id && c.status !== 'Encerrado').length
  const openValue = (id: string) => receivables.filter((r) => r.clientId === id && r.status !== 'Pago').reduce((a, b) => a + b.value, 0)

  return (
    <>
      <PageHeader
        title="Clientes"
        description="Pessoas físicas e jurídicas atendidas pelo escritório"
        actions={<Button icon="plus" variant="primary" onClick={() => toast.show('Cadastro de cliente com validação de CPF/CNPJ abriria aqui.')}>Novo cliente</Button>}
        explain={{
          what: 'Cadastro central de clientes e prospectos. De cada cliente partem os processos, contratos de honorários, documentos e cobranças, por isso o cadastro é a base de todo o sistema.',
          shows: [
            'Distinção entre pessoa física e jurídica, com documento e responsável',
            'Quantidade de processos ativos e valores em aberto por cliente',
            'Status de relacionamento (ativo, prospecto, inativo)',
            'Ficha completa ao clicar, com histórico e documentos',
          ],
          note: 'Dados sensíveis (CPF) aparecem mascarados conforme o perfil de acesso.',
        }}
      />

      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatTile icon="users" label="Clientes ativos" value={clients.filter((c) => c.status === 'Ativo').length} hint={`${clients.filter((c) => c.status === 'Ativo' && c.kind === 'PJ').length} PJ · ${clients.filter((c) => c.status === 'Ativo' && c.kind === 'PF').length} PF`} />
        <StatTile icon="sparkle" tone="accent" label="Prospectos" value={clients.filter((c) => c.status === 'Prospecto').length} hint="1 reunião agendada" />
        <StatTile icon="wallet" tone="warn" label="Em aberto" value={money(receivables.filter((r) => r.status !== 'Pago').reduce((a, b) => a + b.value, 0), true)} hint="somando todos os clientes" />
      </div>

      <Card>
        <div className="flex flex-col gap-3 border-b border-brand-800/8 p-4 lg:flex-row lg:items-center">
          <SearchInput value={q} onChange={setQ} placeholder="Buscar por nome, documento ou cidade…" className="lg:max-w-md lg:flex-1" />
          <div className="flex flex-wrap gap-2">
            <Select label="Tipo" value={kind} onChange={setKind} options={['Pessoa jurídica', 'Pessoa física']} />
            <Select label="Status" value={status} onChange={setStatus} options={['Ativo', 'Prospecto', 'Inativo']} />
          </div>
        </div>
        {list.length === 0 ? (
          <EmptyState icon="users" title="Nenhum cliente encontrado" />
        ) : (
          <Table>
            <thead><tr><Th>Cliente</Th><Th>Contato</Th><Th>Responsável</Th><Th>Status</Th><Th right>Processos ativos</Th><Th right>Em aberto</Th><Th>Desde</Th><Th /></tr></thead>
            <tbody>
              {list.map((c) => (
                <tr key={c.id} className="group hover:bg-paper-100/70">
                  <Td>
                    <Link to={`/app/clientes/${c.id}`} className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-800/6 text-brand-800"><Icon name={c.kind === 'PJ' ? 'building' : 'user'} size={16} /></span>
                      <span className="min-w-0">
                        <span className="block truncate font-medium text-brand-800 group-hover:text-accent-700">{c.name}</span>
                        <span className="block text-xs text-ink-500">{c.kind === 'PJ' ? 'CNPJ' : 'CPF'} {c.doc}{c.segment && ` · ${c.segment}`}</span>
                      </span>
                    </Link>
                  </Td>
                  <Td><span className="block text-[13px]">{c.email}</span><span className="text-xs text-ink-500">{c.phone} · {c.city}</span></Td>
                  <Td><UserName id={c.responsible} short /></Td>
                  <Td>{statusBadge(c.status)}</Td>
                  <Td right>{activeCases(c.id) || <span className="text-ink-400">0</span>}</Td>
                  <Td right>{openValue(c.id) ? <Badge tone={receivables.some((r) => r.clientId === c.id && r.status === 'Atrasado') ? 'danger' : 'info'}>{money(openValue(c.id), true)}</Badge> : <span className="text-ink-400">—</span>}</Td>
                  <Td muted>{fmtDate(c.since)}</Td>
                  <Td><Link to={`/app/clientes/${c.id}`} className="text-ink-400 group-hover:text-accent-700" aria-label="Abrir"><Icon name="chevron-right" /></Link></Td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>
      {toast.node}
    </>
  )
}
