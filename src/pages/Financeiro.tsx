import { useState } from 'react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Badge, Button, Card, StatTile, Table, Tabs, Td, Th, UserName, statusBadge, useDemoToast } from '@/components/ui/primitives'
import { BarChart, HBarList } from '@/components/ui/charts'
import { caseById, cashflow, clientById, contracts, payables, receivables, timesheet, users } from '@/data/mock'
import { fmtDate, hours, money } from '@/lib/format'

type Tab = 'visao' | 'receber' | 'pagar' | 'horas' | 'contratos'

export function Financeiro() {
  const [tab, setTab] = useState<Tab>('visao')
  const toast = useDemoToast()

  const open = receivables.filter((r) => r.status !== 'Pago')
  const overdue = receivables.filter((r) => r.status === 'Atrasado')
  const toPay = payables.filter((p) => p.status === 'A vencer')
  const last = cashflow.at(-1)!
  const billableHours = timesheet.filter((t) => t.billable).reduce((a, b) => a + b.hours, 0)

  return (
    <>
      <PageHeader
        title="Financeiro"
        description="Honorários, recebimentos, despesas e horas trabalhadas"
        actions={
          <>
            <Button icon="download" onClick={() => toast.show('Exportação para Excel ou envio à contabilidade.')}>Exportar</Button>
            <Button icon="plus" variant="primary" onClick={() => toast.show('Lançamento de receita ou despesa com vínculo a cliente e processo.')}>Novo lançamento</Button>
          </>
        }
        explain={{
          what: 'Controle financeiro do escritório integrado aos processos: contratos de honorários geram cobranças, horas lançadas viram faturas e custas processuais entram como despesas do caso. O fluxo de caixa é calculado automaticamente.',
          shows: [
            'Receita × despesas dos últimos seis meses e resultado do período',
            'Contas a receber com atraso sinalizado e ações de cobrança',
            'Contas a pagar por categoria, incluindo custas por processo',
            'Timesheet com horas faturáveis por profissional e por cliente',
          ],
          note: 'Emissão de boleto/Pix, conciliação bancária e nota fiscal são integrações avaliadas por projeto.',
        }}
      />

      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile icon="trending-up" tone="accent" label="Receita · outubro" value={money(last.revenue, true)} trend={{ value: '+8%', up: true }} hint="vs. setembro" />
        <StatTile icon="wallet" label="Resultado · outubro" value={money(last.revenue - last.expenses, true)} hint={`margem ${Math.round(((last.revenue - last.expenses) / last.revenue) * 100)}%`} />
        <StatTile icon="alert" tone="danger" label="Em atraso" value={money(overdue.reduce((a, b) => a + b.value, 0), true)} hint={`${overdue.length} cobranças`} />
        <StatTile icon="clock" label="Horas faturáveis · semana" value={hours(billableHours)} hint="de 14h lançadas" />
      </div>

      <Tabs<Tab>
        value={tab}
        onChange={setTab}
        tabs={[
          { id: 'visao', label: 'Visão geral' },
          { id: 'receber', label: 'A receber', count: open.length },
          { id: 'pagar', label: 'A pagar', count: toPay.length },
          { id: 'horas', label: 'Timesheet', count: timesheet.length },
          { id: 'contratos', label: 'Contratos', count: contracts.length },
        ]}
      />

      {tab === 'visao' && (
        <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-3">
          <Card className="xl:col-span-2" title="Receita e despesas" subtitle="Últimos seis meses, em reais">
            <div className="px-5 pb-5">
              <BarChart
                labels={cashflow.map((c) => c.month)}
                series={[
                  { name: 'Receita', values: cashflow.map((c) => c.revenue) },
                  { name: 'Despesas', values: cashflow.map((c) => c.expenses) },
                ]}
                format={(v) => money(v, true)}
                height={230}
              />
            </div>
          </Card>
          <Card title="Receita por modelo de honorários" subtitle="Outubro">
            <div className="px-5 pb-5">
              <HBarList
                items={[
                  { label: 'Mensal (assessoria)', value: 30_700 },
                  { label: 'Fixo por caso', value: 28_500 },
                  { label: 'Por hora', value: 17_550 },
                  { label: 'Êxito', value: 12_000 },
                ]}
                format={(v) => money(v, true)}
              />
            </div>
          </Card>
          <Card className="xl:col-span-3" title="Próximos vencimentos" subtitle="Receber e pagar nos próximos 15 dias">
            <Table>
              <thead><tr><Th>Vencimento</Th><Th>Tipo</Th><Th>Descrição</Th><Th>Cliente / categoria</Th><Th>Status</Th><Th right>Valor</Th></tr></thead>
              <tbody>
                {[
                  ...open.map((r) => ({ id: r.id, due: r.due, type: 'Receber', desc: r.description, who: clientById(r.clientId).name, status: r.status, value: r.value })),
                  ...toPay.map((p) => ({ id: p.id, due: p.due, type: 'Pagar', desc: p.description, who: p.category, status: p.status, value: -p.value })),
                ]
                  .sort((a, b) => a.due.localeCompare(b.due))
                  .slice(0, 8)
                  .map((r) => (
                    <tr key={r.id}>
                      <Td muted>{fmtDate(r.due)}</Td>
                      <Td><Badge tone={r.type === 'Receber' ? 'accent' : 'neutral'}>{r.type}</Badge></Td>
                      <Td>{r.desc}</Td>
                      <Td muted>{r.who}</Td>
                      <Td>{statusBadge(r.status)}</Td>
                      <Td right className={r.value < 0 ? 'text-ink-700' : 'font-semibold text-brand-800'}>{money(r.value)}</Td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Card>
        </div>
      )}

      {tab === 'receber' && (
        <Card className="mt-5">
          <Table>
            <thead><tr><Th>Cliente</Th><Th>Descrição</Th><Th>Vencimento</Th><Th>Status</Th><Th right>Valor</Th><Th /></tr></thead>
            <tbody>
              {[...receivables].sort((a, b) => a.due.localeCompare(b.due)).map((r) => (
                <tr key={r.id} className="hover:bg-paper-100/70">
                  <Td className="font-medium">{clientById(r.clientId).name}</Td>
                  <Td>{r.description}</Td>
                  <Td muted>{fmtDate(r.due)}{r.paidOn && <span className="block text-xs">pago em {fmtDate(r.paidOn)}</span>}</Td>
                  <Td>{statusBadge(r.status)}</Td>
                  <Td right className="font-semibold">{money(r.value)}</Td>
                  <Td right>
                    {r.status !== 'Pago' && (
                      <span className="inline-flex gap-1">
                        <Button size="sm" variant="ghost" icon="send" onClick={() => toast.show('Lembrete de cobrança enviado por e-mail/WhatsApp.')}>Cobrar</Button>
                        <Button size="sm" variant="ghost" icon="check" onClick={() => toast.show('Baixa manual registrada.')}>Baixar</Button>
                      </span>
                    )}
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      )}

      {tab === 'pagar' && (
        <Card className="mt-5">
          <Table>
            <thead><tr><Th>Descrição</Th><Th>Categoria</Th><Th>Vencimento</Th><Th>Status</Th><Th right>Valor</Th></tr></thead>
            <tbody>
              {[...payables].sort((a, b) => a.due.localeCompare(b.due)).map((p) => (
                <tr key={p.id}>
                  <Td className="font-medium">{p.description}</Td>
                  <Td><Badge>{p.category}</Badge></Td>
                  <Td muted>{fmtDate(p.due)}</Td>
                  <Td>{statusBadge(p.status)}</Td>
                  <Td right className="font-semibold">{money(p.value)}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      )}

      {tab === 'horas' && (
        <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[1fr_300px]">
          <Card title="Lançamentos da semana" action={<Button size="sm" icon="plus" onClick={() => toast.show('Lançamento rápido de horas com cronômetro.')}>Lançar horas</Button>}>
            <Table>
              <thead><tr><Th>Data</Th><Th>Profissional</Th><Th>Cliente · processo</Th><Th>Descrição</Th><Th right>Horas</Th><Th>Faturável</Th></tr></thead>
              <tbody>
                {timesheet.map((t) => (
                  <tr key={t.id}>
                    <Td muted>{fmtDate(t.date)}</Td>
                    <Td><UserName id={t.userId} short /></Td>
                    <Td><span className="block text-[13px] font-medium">{clientById(t.clientId).name}</span><span className="block max-w-[220px] truncate text-xs text-ink-500">{t.caseId ? caseById(t.caseId)?.title : '—'}</span></Td>
                    <Td>{t.description}</Td>
                    <Td right className="font-semibold">{hours(t.hours)}</Td>
                    <Td>{t.billable ? <Badge tone="ok" icon="check">sim</Badge> : <Badge>não</Badge>}</Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
          <Card title="Por profissional" subtitle="Semana atual">
            <div className="px-5 pb-5">
              <HBarList
                items={users.filter((u) => timesheet.some((t) => t.userId === u.id)).map((u) => ({ label: u.name.replace(/^(Dra?\.)\s+/, ''), value: timesheet.filter((t) => t.userId === u.id).reduce((a, b) => a + b.hours, 0) }))}
                format={(v) => hours(v)}
                colorIndex={1}
              />
            </div>
          </Card>
        </div>
      )}

      {tab === 'contratos' && (
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {contracts.map((k) => (
            <Card key={k.id} className="p-5">
              <div className="flex items-center justify-between">
                <Badge tone="accent">{k.model}</Badge>
                {k.model !== 'Êxito' && <span className="tabular font-display text-lg font-bold text-brand-800">{money(k.value)}{k.model === 'Mensal' ? '/mês' : k.model === 'Por hora' ? '/h' : ''}</span>}
                {k.model === 'Êxito' && <span className="tabular font-display text-lg font-bold text-brand-800">{Math.round(k.value * 100)}%</span>}
              </div>
              <p className="mt-3 font-display text-[15px] font-semibold text-brand-800">{clientById(k.clientId).name}</p>
              <p className="mt-1 text-[13px] text-ink-700">{k.description}</p>
              {k.caseId && <p className="mt-2 truncate text-xs text-ink-500">{caseById(k.caseId)?.title}</p>}
            </Card>
          ))}
        </div>
      )}
      {toast.node}
    </>
  )
}
