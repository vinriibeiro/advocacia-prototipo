import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { PageHeader } from '@/components/ui/PageHeader'
import { AvatarStack, Badge, Button, Card, EmptyState, SearchInput, Select, Table, Td, Th, statusBadge, useDemoToast } from '@/components/ui/primitives'
import { cases, casesByArea, clientById, events, userById } from '@/data/mock'
import { fmtDate, money, relativeDays } from '@/lib/format'

const totalActive = casesByArea.reduce((a, b) => a + b.active, 0)
const totalAll = casesByArea.reduce((a, b) => a + b.active + b.closed, 0)

export function Processos() {
  const [q, setQ] = useState('')
  const [area, setArea] = useState('')
  const [status, setStatus] = useState('')
  const [resp, setResp] = useState('')
  const toast = useDemoToast()

  const list = useMemo(
    () =>
      cases.filter((c) => {
        const client = clientById(c.clientId).name
        const text = `${c.title} ${c.number} ${client} ${c.opponent}`.toLowerCase()
        return (
          (!q || text.includes(q.toLowerCase())) &&
          (!area || c.area === area) &&
          (!status || c.status === status) &&
          (!resp || userById(c.responsible).name === resp)
        )
      }),
    [q, area, status, resp],
  )

  const nextDeadline = (id: string) => events.filter((e) => e.caseId === id && !e.done && e.kind !== 'Reunião').sort((a, b) => a.date.localeCompare(b.date))[0]

  return (
    <>
      <PageHeader
        title="Processos"
        description={`${totalActive} ativos · ${totalAll} no total · exibindo os ${cases.length} com movimentação recente`}
        actions={
          <>
            <Button icon="upload" onClick={() => toast.show('Importação por número CNJ: o sistema consultaria o tribunal e preencheria a ficha.')}>Importar por número</Button>
            <Button icon="plus" variant="primary" onClick={() => toast.show('Formulário de novo processo (ficha completa) abriria aqui.')}>Novo processo</Button>
          </>
        }
        explain={{
          what: 'A carteira completa do escritório. Cada linha é um processo com cliente, área, fase, responsável, valor da causa, risco e o próximo prazo. Filtros e busca funcionam de verdade sobre os dados fictícios.',
          shows: [
            'Busca por número, título, cliente ou parte contrária',
            'Filtros combinados por área, status e responsável',
            'Próximo prazo calculado a partir da agenda do processo',
            'Clique em uma linha para abrir a ficha completa',
          ],
          note: 'Campos, áreas e status são configuráveis conforme a atuação do escritório.',
        }}
      />

      <Card>
        <div className="flex flex-col gap-3 border-b border-brand-800/8 p-4 lg:flex-row lg:items-center">
          <SearchInput value={q} onChange={setQ} placeholder="Buscar por número, título, cliente ou parte…" className="lg:max-w-md lg:flex-1" />
          <div className="flex flex-wrap gap-2">
            <Select label="Área" value={area} onChange={setArea} options={[...new Set(cases.map((c) => c.area))]} />
            <Select label="Status" value={status} onChange={setStatus} options={[...new Set(cases.map((c) => c.status))]} />
            <Select label="Responsável" value={resp} onChange={setResp} options={[...new Set(cases.map((c) => userById(c.responsible).name))]} />
            {(q || area || status || resp) && (
              <Button variant="ghost" icon="close" onClick={() => { setQ(''); setArea(''); setStatus(''); setResp('') }}>Limpar</Button>
            )}
          </div>
        </div>

        {list.length === 0 ? (
          <EmptyState icon="search" title="Nenhum processo encontrado" text="Ajuste a busca ou os filtros." />
        ) : (
          <Table className="text-[13px]">
            <thead>
              <tr>
                <Th>Processo</Th>
                <Th>Cliente</Th>
                <Th>Área · fase</Th>
                <Th>Status</Th>
                <Th className="hidden 2xl:table-cell">Equipe</Th>
                <Th>Próximo prazo</Th>
                <Th right>Valor da causa</Th>
              </tr>
            </thead>
            <tbody>
              {list.map((c) => {
                const nd = nextDeadline(c.id)
                return (
                  <tr key={c.id} className="group hover:bg-paper-100/70">
                    <Td>
                      <Link to={`/app/processos/${c.id}`} className="block max-w-[260px]">
                        <span className="block truncate font-medium text-brand-800 group-hover:text-accent-700">{c.title}</span>
                        <span className="tabular mt-0.5 block font-mono text-[11.5px] text-ink-500">{c.number}</span>
                      </Link>
                    </Td>
                    <Td><span className="block max-w-[160px] truncate">{clientById(c.clientId).name}</span></Td>
                    <Td>
                      <span className="block">{c.area}</span>
                      <span className="text-xs text-ink-500">{c.phase} · {c.court}</span>
                    </Td>
                    <Td>{statusBadge(c.status)}</Td>
                    <Td className="hidden 2xl:table-cell"><AvatarStack ids={c.team} /></Td>
                    <Td>
                      {nd ? (
                        <span className="flex items-center gap-1.5 whitespace-nowrap">
                          <Badge tone={nd.kind === 'Prazo fatal' ? 'danger' : nd.kind === 'Audiência' ? 'info' : 'warn'}>{fmtDate(nd.date)}</Badge>
                          <span className="text-xs text-ink-500">{relativeDays(nd.date)}</span>
                        </span>
                      ) : (
                        <span className="text-xs text-ink-400">—</span>
                      )}
                    </Td>
                    <Td right>{money(c.value, true)}</Td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        )}
        <div className="flex items-center justify-between px-4 py-3 text-xs text-ink-500">
          <span>Mostrando 1–{list.length} de {totalAll}</span>
          <span className="inline-flex gap-1">
            <Button size="sm" variant="ghost" icon="chevron-left" aria-label="Página anterior" disabled />
            <Button size="sm" variant="ghost" icon="chevron-right" aria-label="Próxima página" onClick={() => toast.show('Paginação: carregaria os próximos processos.')} />
          </span>
        </div>
      </Card>
      {toast.node}
    </>
  )
}
