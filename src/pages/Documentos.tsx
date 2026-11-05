import { useMemo, useState } from 'react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Icon, type IconName } from '@/components/ui/Icon'
import { Badge, Button, Card, SearchInput, Table, Tabs, Td, Th, Avatar, cx, useDemoToast } from '@/components/ui/primitives'
import { caseById, clients, docs, templates } from '@/data/mock'
import { fmtDate } from '@/lib/format'

const typeIcon: Record<string, IconName> = { pdf: 'file', docx: 'file-text', xlsx: 'sheet', img: 'image' }

export function Documentos() {
  const [tab, setTab] = useState<'arquivos' | 'modelos'>('arquivos')
  const [client, setClient] = useState<string>('c1')
  const [q, setQ] = useState('')
  const toast = useDemoToast()

  const list = useMemo(() => docs.filter((d) => d.clientId === client && (!q || d.name.toLowerCase().includes(q.toLowerCase()))), [client, q])
  const byClient = (id: string) => docs.filter((d) => d.clientId === id).length

  return (
    <>
      <PageHeader
        title="Documentos"
        description="Arquivos organizados por cliente e processo, com versões e modelos de peças"
        actions={
          <>
            <Button icon="upload" onClick={() => toast.show('Upload com arrastar e soltar, vinculando ao cliente ou processo.')}>Enviar arquivo</Button>
            <Button icon="sparkle" variant="primary" onClick={() => toast.show('Geraria um documento a partir de um modelo, preenchendo dados do processo.')}>Gerar a partir de modelo</Button>
          </>
        }
        explain={{
          what: 'Repositório de documentos do escritório. Cada arquivo pertence a um cliente e, quando aplicável, a um processo. Modelos de peças geram novos documentos já preenchidos com os dados do cadastro (partes, número, vara, valores).',
          shows: [
            'Navegação por cliente e busca por nome',
            'Controle de versão e indicação de documento assinado',
            'Modelos de peças e documentos administrativos com contagem de uso',
            'Geração de documento preenchido automaticamente',
          ],
          note: 'Assinatura digital e armazenamento em nuvem do escritório (Google Drive, OneDrive) são integrações avaliadas por projeto.',
        }}
      />

      <Tabs value={tab} onChange={setTab} tabs={[{ id: 'arquivos', label: 'Arquivos', count: docs.length }, { id: 'modelos', label: 'Modelos', count: templates.length }]} />

      {tab === 'arquivos' ? (
        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[280px_1fr]">
          <Card className="p-2">
            <p className="label-xs px-3 pt-2 pb-2">Clientes</p>
            <ul className="space-y-0.5">
              {clients.filter((c) => byClient(c.id) > 0).map((c) => (
                <li key={c.id}>
                  <button type="button" onClick={() => setClient(c.id)} className={cx('flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[13.5px] transition-colors', client === c.id ? 'bg-brand-800 text-white' : 'text-brand-800 hover:bg-paper-100')}>
                    <Icon name="folder" size={16} className={client === c.id ? 'text-accent-400' : 'text-ink-400'} />
                    <span className="min-w-0 flex-1 truncate">{c.name}</span>
                    <span className={cx('text-xs', client === c.id ? 'text-white/70' : 'text-ink-500')}>{byClient(c.id)}</span>
                  </button>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <div className="flex flex-col gap-3 border-b border-brand-800/8 p-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="font-display text-base font-bold text-brand-800">{clients.find((c) => c.id === client)?.name}</h2>
              <SearchInput value={q} onChange={setQ} placeholder="Buscar arquivo…" className="sm:w-64" />
            </div>
            <Table>
              <thead><tr><Th className="min-w-[280px]">Arquivo</Th><Th>Processo</Th><Th>Versão</Th><Th>Atualizado</Th><Th>Por</Th><Th /></tr></thead>
              <tbody>
                {list.map((d) => (
                  <tr key={d.id} className="hover:bg-paper-100/70">
                    <Td>
                      <span className="inline-flex items-center gap-2.5 font-medium text-brand-800">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-800/6 text-brand-800"><Icon name={typeIcon[d.type]} size={15} /></span>
                        {d.name}
                        {d.signed && <Badge tone="ok" icon="shield">assinado</Badge>}
                      </span>
                      <span className="ml-[42px] block text-xs text-ink-500">{d.size}</span>
                    </Td>
                    <Td muted><span className="block max-w-[220px] truncate text-[13px]">{d.caseId ? caseById(d.caseId)?.title : 'Pasta do cliente'}</span></Td>
                    <Td muted>v{d.version}</Td>
                    <Td muted>{fmtDate(d.updated)}</Td>
                    <Td><Avatar userId={d.by} size={26} /></Td>
                    <Td right>
                      <span className="inline-flex">
                        <Button size="sm" variant="ghost" icon="eye" aria-label="Visualizar" onClick={() => toast.show('Pré-visualização do documento.')} />
                        <Button size="sm" variant="ghost" icon="download" aria-label="Baixar" onClick={() => toast.show('Download iniciaria no sistema real.')} />
                        <Button size="sm" variant="ghost" icon="history" aria-label="Versões" onClick={() => toast.show(`Histórico: ${d.version} versão(ões) com autor e data.`)} />
                      </span>
                    </Td>
                  </tr>
                ))}
                {list.length === 0 && <tr><Td className="py-8 text-center text-ink-500">Nenhum arquivo encontrado.</Td></tr>}
              </tbody>
            </Table>
          </Card>
        </div>
      ) : (
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {templates.map((t) => (
            <Card key={t.id} className="flex flex-col p-5">
              <div className="flex items-start justify-between gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-800 text-accent-400"><Icon name="file-text" size={18} /></span>
                <Badge>{t.area}</Badge>
              </div>
              <h3 className="mt-4 font-display text-[15px] font-semibold text-brand-800">{t.name}</h3>
              <p className="mt-1 text-xs text-ink-500">Usado {t.uses} vezes · campos preenchidos automaticamente: partes, número, vara, valores</p>
              <div className="mt-4 flex gap-2 border-t border-brand-800/8 pt-4">
                <Button size="sm" variant="primary" icon="sparkle" onClick={() => toast.show(`Gerando "${t.name}" com os dados do processo selecionado.`)}>Gerar</Button>
                <Button size="sm" variant="ghost" icon="edit" onClick={() => toast.show('Editor de modelos com variáveis {{cliente.nome}}, {{processo.numero}}…')}>Editar modelo</Button>
              </div>
            </Card>
          ))}
        </div>
      )}
      {toast.node}
    </>
  )
}
