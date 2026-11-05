import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { PageHeader } from '@/components/ui/PageHeader'
import { Icon } from '@/components/ui/Icon'
import { Avatar, Badge, Button, Card, Progress, Select, cx, statusBadge, useDemoToast } from '@/components/ui/primitives'
import { caseById, tasks as seed, users, type Task, type TaskColumn } from '@/data/mock'
import { daysFromToday, fmtDate } from '@/lib/format'

const columns: TaskColumn[] = ['A fazer', 'Em andamento', 'Em revisão', 'Concluído']

export function Tarefas() {
  const [tasks, setTasks] = useState<Task[]>(seed)
  const [who, setWho] = useState('')
  const toast = useDemoToast()

  const list = useMemo(() => tasks.filter((t) => !who || users.find((u) => u.id === t.assignee)?.name === who), [tasks, who])
  const move = (id: string, dir: 1 | -1) =>
    setTasks((ts) =>
      ts.map((t) => {
        if (t.id !== id) return t
        const i = columns.indexOf(t.column) + dir
        return { ...t, column: columns[Math.max(0, Math.min(columns.length - 1, i))] }
      }),
    )

  return (
    <>
      <PageHeader
        title="Tarefas"
        description="Quadro de trabalho da equipe, vinculado aos processos"
        actions={
          <>
            <Select label="Responsável" value={who} onChange={setWho} options={users.filter((u) => u.role !== 'Administrativo').map((u) => u.name)} />
            <Button icon="plus" variant="primary" onClick={() => toast.show('Nova tarefa com checklist, prazo, responsável e vínculo a processo.')}>Nova tarefa</Button>
          </>
        }
        explain={{
          what: 'Organiza o trabalho interno em um quadro por etapa. Cada tarefa tem responsável, prioridade, prazo, checklist e vínculo ao processo, para que sócios acompanhem a produção sem perguntar a cada um o que está fazendo.',
          shows: [
            'Quadro por etapa com movimentação dos cartões (use as setas)',
            'Filtro por responsável',
            'Prioridade e atraso sinalizados com ícone e cor',
            'Checklist com progresso por tarefa',
          ],
          note: 'Etapas do quadro são configuráveis (por exemplo, "Aguardando cliente" ou "Protocolado").',
        }}
      />

      <div className="scroll-thin grid grid-cols-1 gap-4 overflow-x-auto pb-2 lg:grid-cols-4">
        {columns.map((col, ci) => {
          const items = list.filter((t) => t.column === col)
          return (
            <section key={col} className="min-w-[260px] rounded-2xl bg-brand-800/4 p-2.5" aria-label={col}>
              <header className="flex items-center justify-between px-2 py-2">
                <h2 className="flex items-center gap-2 font-display text-sm font-bold text-brand-800">
                  <span className={cx('h-2.5 w-2.5 rounded-full', ci === 0 ? 'bg-brand-800/30' : ci === 1 ? 'bg-info-700' : ci === 2 ? 'bg-warn-700' : 'bg-accent-500')} />
                  {col}
                </h2>
                <span className="rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-ink-500">{items.length}</span>
              </header>
              <ul className="space-y-2.5">
                {items.map((t) => {
                  const c = t.caseId ? caseById(t.caseId) : undefined
                  const late = t.due && col !== 'Concluído' && daysFromToday(t.due) < 0
                  return (
                    <li key={t.id}>
                      <Card className="p-3.5">
                        <div className="flex items-start justify-between gap-2">
                          <p className={cx('text-[13.5px] leading-snug font-medium', col === 'Concluído' ? 'text-ink-500' : 'text-brand-800')}>{t.title}</p>
                          {statusBadge(t.priority)}
                        </div>
                        {c && <Link to={`/app/processos/${c.id}`} className="mt-1.5 block truncate text-xs text-accent-700 hover:underline">{c.title}</Link>}
                        {t.checklist && (
                          <div className="mt-2.5 flex items-center gap-2 text-[11.5px] text-ink-500">
                            <Progress value={t.checklist.done} max={t.checklist.total} tone={t.checklist.done === t.checklist.total ? 'accent' : 'brand'} />
                            <span className="tabular shrink-0">{t.checklist.done}/{t.checklist.total}</span>
                          </div>
                        )}
                        <div className="mt-3 flex items-center justify-between gap-2">
                          <span className={cx('inline-flex items-center gap-1 text-[11.5px]', late ? 'font-semibold text-danger-700' : 'text-ink-500')}>
                            <Icon name={late ? 'alert' : 'clock'} size={12} />
                            {t.due ? fmtDate(t.due).slice(0, 5) : 'sem prazo'}
                            {late && <Badge tone="danger">atrasada</Badge>}
                          </span>
                          <span className="flex items-center gap-1">
                            <Avatar userId={t.assignee} size={22} />
                            <button type="button" aria-label="Mover para a etapa anterior" disabled={ci === 0} onClick={() => move(t.id, -1)} className="rounded p-1 text-ink-400 hover:bg-brand-800/6 hover:text-brand-800 disabled:opacity-30"><Icon name="chevron-left" size={14} /></button>
                            <button type="button" aria-label="Mover para a próxima etapa" disabled={ci === columns.length - 1} onClick={() => move(t.id, 1)} className="rounded p-1 text-ink-400 hover:bg-brand-800/6 hover:text-brand-800 disabled:opacity-30"><Icon name="chevron-right" size={14} /></button>
                          </span>
                        </div>
                      </Card>
                    </li>
                  )
                })}
                {items.length === 0 && <li className="rounded-xl border border-dashed border-brand-800/15 px-3 py-6 text-center text-xs text-ink-500">Nada aqui</li>}
              </ul>
            </section>
          )
        })}
      </div>
      {toast.node}
    </>
  )
}
