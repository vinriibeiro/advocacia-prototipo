import { PageHeader } from '@/components/ui/PageHeader'
import { Badge, Button, Card, Progress, Table, Td, Th, UserName, useDemoToast } from '@/components/ui/primitives'
import { BarChart, HBarList, StackedBar } from '@/components/ui/charts'
import { casesByArea, newCasesByMonth, outcomes, productivity, revenueByArea, userById } from '@/data/mock'
import { hours, money } from '@/lib/format'

export function Relatorios() {
  const toast = useDemoToast()
  const totalOutcomes = outcomes.reduce((a, b) => a + b.value, 0)
  const success = Math.round(((outcomes[0].value + outcomes[1].value + outcomes[2].value) / totalOutcomes) * 100)

  return (
    <>
      <PageHeader
        title="Relatórios e indicadores"
        description="Carteira, resultados, produtividade e receita · últimos 12 meses"
        actions={
          <>
            <Button icon="calendar" onClick={() => toast.show('Seleção de período e comparação com período anterior.')}>Últimos 12 meses</Button>
            <Button icon="download" variant="primary" onClick={() => toast.show('Exportaria os relatórios em PDF ou Excel.')}>Exportar</Button>
          </>
        }
        explain={{
          what: 'Indicadores de gestão calculados a partir dos dados operacionais, sem montar planilhas. Mostra como está a carteira, quais áreas dão resultado, como a equipe distribui o tempo e de onde vem a receita.',
          shows: [
            'Processos ativos × encerrados por área',
            'Resultados dos processos encerrados (êxito, acordo, improcedência)',
            'Produtividade por profissional: horas, faturáveis e processos',
            'Receita por área de atuação',
          ],
          note: 'Os indicadores são definidos com o escritório. Exemplos comuns: tempo médio de tramitação, taxa de conversão de prospectos, inadimplência.',
        }}
      />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <Card title="Carteira por área" subtitle="Processos ativos e encerrados no período">
          <div className="px-5 pb-5">
            <BarChart
              labels={casesByArea.map((a) => a.area)}
              series={[
                { name: 'Ativos', values: casesByArea.map((a) => a.active) },
                { name: 'Encerrados', values: casesByArea.map((a) => a.closed) },
              ]}
              height={230}
              labelLast={false}
            />
          </div>
        </Card>

        <Card title="Resultados dos processos encerrados" subtitle={`${totalOutcomes} processos`} action={<Badge tone="accent">{success}% favoráveis</Badge>}>
          <div className="px-5 pb-5">
            <StackedBar items={outcomes} />
            <p className="mt-4 text-[13px] leading-relaxed text-ink-700">
              Êxito total, parcial e acordos somados representam <strong className="text-brand-800">{success}%</strong> dos encerramentos. O indicador pode ser recortado por área, responsável ou período.
            </p>
          </div>
        </Card>

        <Card title="Novos processos por mês" subtitle="Entrada de casos">
          <div className="px-5 pb-5">
            <BarChart labels={newCasesByMonth.map((m) => m.month)} series={[{ name: 'Novos processos', values: newCasesByMonth.map((m) => m.value) }]} height={200} />
          </div>
        </Card>

        <Card title="Receita por área" subtitle="Últimos 12 meses">
          <div className="px-5 pb-5">
            <HBarList items={revenueByArea.map((r) => ({ label: r.area, value: r.value }))} format={(v) => money(v, true)} />
          </div>
        </Card>

        <Card className="xl:col-span-2" title="Produtividade da equipe" subtitle="Últimos 30 dias">
          <Table>
            <thead><tr><Th>Profissional</Th><Th>Função</Th><Th right>Horas lançadas</Th><Th>Faturáveis</Th><Th right>Processos</Th><Th right>Horas / processo</Th></tr></thead>
            <tbody>
              {productivity.map((p) => {
                const u = userById(p.userId)
                const pct = Math.round((p.billable / p.hours) * 100)
                return (
                  <tr key={p.userId}>
                    <Td><UserName id={p.userId} /></Td>
                    <Td muted>{u.role}</Td>
                    <Td right className="font-semibold">{hours(p.hours)}</Td>
                    <Td>
                      <div className="flex items-center gap-3">
                        <div className="w-28"><Progress value={pct} tone={pct >= 75 ? 'accent' : 'warn'} /></div>
                        <span className="tabular text-[13px] text-ink-700">{pct}% · {hours(p.billable)}</span>
                      </div>
                    </Td>
                    <Td right>{p.cases}</Td>
                    <Td right muted>{(p.hours / p.cases).toFixed(1)}h</Td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </Card>
      </div>
      {toast.node}
    </>
  )
}
