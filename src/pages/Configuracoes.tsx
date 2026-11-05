import { useState } from 'react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Icon, type IconName } from '@/components/ui/Icon'
import { Badge, Button, Card, Table, Tabs, Td, Th, UserName, cx, useDemoToast } from '@/components/ui/primitives'
import { office, users, type Role } from '@/data/mock'

type Tab = 'usuarios' | 'escritorio' | 'integracoes' | 'automacoes'

const roles: Role[] = ['Sócio(a)', 'Advogado(a)', 'Estagiário(a)', 'Financeiro', 'Administrativo']
const permissions: Array<{ name: string; roles: Record<Role, boolean> }> = [
  { name: 'Ver todos os processos', roles: { 'Sócio(a)': true, 'Advogado(a)': true, 'Estagiário(a)': false, Financeiro: false, Administrativo: true } },
  { name: 'Editar processos', roles: { 'Sócio(a)': true, 'Advogado(a)': true, 'Estagiário(a)': false, Financeiro: false, Administrativo: false } },
  { name: 'Ver dados completos do cliente (CPF)', roles: { 'Sócio(a)': true, 'Advogado(a)': true, 'Estagiário(a)': false, Financeiro: true, Administrativo: true } },
  { name: 'Tratar publicações e criar prazos', roles: { 'Sócio(a)': true, 'Advogado(a)': true, 'Estagiário(a)': true, Financeiro: false, Administrativo: false } },
  { name: 'Ver financeiro', roles: { 'Sócio(a)': true, 'Advogado(a)': false, 'Estagiário(a)': false, Financeiro: true, Administrativo: false } },
  { name: 'Lançar e baixar cobranças', roles: { 'Sócio(a)': true, 'Advogado(a)': false, 'Estagiário(a)': false, Financeiro: true, Administrativo: false } },
  { name: 'Ver relatórios de produtividade', roles: { 'Sócio(a)': true, 'Advogado(a)': false, 'Estagiário(a)': false, Financeiro: false, Administrativo: false } },
  { name: 'Gerenciar usuários e integrações', roles: { 'Sócio(a)': true, 'Advogado(a)': false, 'Estagiário(a)': false, Financeiro: false, Administrativo: false } },
]

const integrations: Array<{ name: string; desc: string; icon: IconName; status: 'Ativa' | 'Disponível' | 'Em avaliação' }> = [
  { name: 'Captura de publicações', desc: 'Monitoramento dos diários oficiais (DJe, DEJT) por OAB e nome.', icon: 'newspaper', status: 'Ativa' },
  { name: 'E-mail do escritório', desc: 'Envio de lembretes de prazo, cobranças e relatórios ao cliente.', icon: 'mail', status: 'Ativa' },
  { name: 'WhatsApp', desc: 'Lembretes de audiência e cobrança para clientes, com modelos aprovados.', icon: 'message', status: 'Disponível' },
  { name: 'Consulta processual nos tribunais', desc: 'Atualização automática de andamentos. Cobertura varia por tribunal.', icon: 'scale', status: 'Em avaliação' },
  { name: 'Assinatura digital', desc: 'Assinatura de contratos e procurações com validade jurídica.', icon: 'shield', status: 'Em avaliação' },
  { name: 'Armazenamento em nuvem', desc: 'Sincronização de documentos com Google Drive ou OneDrive.', icon: 'folder', status: 'Disponível' },
  { name: 'Boleto e Pix', desc: 'Emissão de cobranças e baixa automática por conciliação bancária.', icon: 'wallet', status: 'Em avaliação' },
  { name: 'Agenda (Google / Outlook)', desc: 'Espelhamento de audiências e reuniões na agenda pessoal.', icon: 'calendar', status: 'Disponível' },
]

const automations = [
  { when: 'Nova publicação vinculada a processo', then: 'Criar prazo sugerido e notificar o responsável', on: true },
  { when: 'Prazo fatal em 3 dias sem tarefa concluída', then: 'Alertar responsável e sócio por e-mail e WhatsApp', on: true },
  { when: 'Cobrança vence em 5 dias', then: 'Enviar lembrete ao cliente com link de pagamento', on: true },
  { when: 'Cobrança atrasada há 10 dias', then: 'Criar tarefa para o financeiro e sinalizar no cliente', on: true },
  { when: 'Processo sem movimentação há 60 dias', then: 'Criar tarefa de verificação para o responsável', on: false },
  { when: 'Audiência marcada', then: 'Enviar confirmação ao cliente e bloquear agenda do advogado', on: true },
]

export function Configuracoes() {
  const [tab, setTab] = useState<Tab>('usuarios')
  const [auto, setAuto] = useState(automations)
  const toast = useDemoToast()

  return (
    <>
      <PageHeader
        title="Configurações"
        description="Usuários, perfis de acesso, dados do escritório, integrações e automações"
        explain={{
          what: 'Área de administração do sistema. Define quem acessa o quê, como o escritório aparece nos documentos, quais integrações estão ligadas e quais automações rodam sozinhas.',
          shows: [
            'Perfis por função com matriz de permissões (sócio, advogado, estagiário, financeiro)',
            'Integrações com status real: ativas, disponíveis ou dependentes de avaliação',
            'Automações em linguagem simples ("quando… então…") que podem ser ligadas e desligadas',
            'Dados do escritório usados em modelos e relatórios',
          ],
          note: 'Cada integração é avaliada quanto à viabilidade técnica antes de entrar no escopo do projeto.',
        }}
      />

      <Tabs<Tab>
        value={tab}
        onChange={setTab}
        tabs={[
          { id: 'usuarios', label: 'Usuários e perfis', count: users.length },
          { id: 'integracoes', label: 'Integrações', count: integrations.length },
          { id: 'automacoes', label: 'Automações', count: auto.length },
          { id: 'escritorio', label: 'Escritório' },
        ]}
      />

      {tab === 'usuarios' && (
        <div className="mt-5 grid grid-cols-1 gap-5">
          <Card title="Usuários" subtitle="Acesso individual com autenticação em duas etapas opcional" action={<Button size="sm" icon="plus" variant="primary" onClick={() => toast.show('Convite por e-mail com definição de perfil.')}>Convidar usuário</Button>}>
            <Table>
              <thead><tr><Th>Usuário</Th><Th>Função</Th><Th>OAB</Th><Th>E-mail</Th><Th>2FA</Th><Th>Status</Th></tr></thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <Td><UserName id={u.id} /></Td>
                    <Td><Badge tone={u.role === 'Sócio(a)' ? 'brand' : 'neutral'}>{u.role}</Badge></Td>
                    <Td muted>{u.oab ?? '—'}</Td>
                    <Td muted>{u.email}</Td>
                    <Td>{['u1', 'u2', 'u6'].includes(u.id) ? <Badge tone="ok" icon="shield">ativo</Badge> : <Badge>pendente</Badge>}</Td>
                    <Td><Badge tone="ok" icon="check">Ativo</Badge></Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
          <Card title="Matriz de permissões" subtitle="O que cada perfil pode fazer">
            <Table>
              <thead><tr><Th>Permissão</Th>{roles.map((r) => <Th key={r} className="text-center">{r}</Th>)}</tr></thead>
              <tbody>
                {permissions.map((p) => (
                  <tr key={p.name}>
                    <Td className="font-medium">{p.name}</Td>
                    {roles.map((r) => (
                      <Td key={r} className="text-center">
                        <span className={cx('inline-flex h-6 w-6 items-center justify-center rounded-full', p.roles[r] ? 'bg-accent-500/15 text-accent-700' : 'bg-brand-800/5 text-ink-400')} aria-label={p.roles[r] ? 'permitido' : 'não permitido'}>
                          <Icon name={p.roles[r] ? 'check' : 'close'} size={13} />
                        </span>
                      </Td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </div>
      )}

      {tab === 'integracoes' && (
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {integrations.map((i) => (
            <Card key={i.name} className="flex flex-col p-5">
              <div className="flex items-start justify-between gap-3">
                <span className={cx('flex h-10 w-10 items-center justify-center rounded-xl', i.status === 'Ativa' ? 'bg-accent-500 text-brand-800' : 'bg-brand-800/6 text-brand-800')}><Icon name={i.icon} size={18} /></span>
                <Badge tone={i.status === 'Ativa' ? 'ok' : i.status === 'Disponível' ? 'info' : 'warn'} icon={i.status === 'Ativa' ? 'check' : i.status === 'Disponível' ? 'plus' : 'eye'}>{i.status}</Badge>
              </div>
              <h3 className="mt-4 font-display text-[15px] font-semibold text-brand-800">{i.name}</h3>
              <p className="mt-1 flex-1 text-[13px] leading-relaxed text-ink-700">{i.desc}</p>
              <Button size="sm" className="mt-4 self-start" variant={i.status === 'Ativa' ? 'secondary' : 'ghost'} onClick={() => toast.show(i.status === 'Em avaliação' ? 'Esta integração depende de avaliação técnica junto ao fornecedor.' : 'Tela de configuração da integração.')}>
                {i.status === 'Ativa' ? 'Configurar' : i.status === 'Disponível' ? 'Ativar' : 'Saiba mais'}
              </Button>
            </Card>
          ))}
        </div>
      )}

      {tab === 'automacoes' && (
        <Card className="mt-5" title="Regras automáticas" subtitle="Rotinas que o sistema executa sozinho" action={<Button size="sm" icon="plus" onClick={() => toast.show('Criação de nova regra com gatilho, condição e ação.')}>Nova regra</Button>}>
          <ul className="divide-y divide-brand-800/6">
            {auto.map((a, i) => (
              <li key={a.when} className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center">
                <div className="min-w-0 flex-1 text-[14px]">
                  <p className="text-brand-800"><span className="label-xs mr-2 text-accent-700">Quando</span>{a.when}</p>
                  <p className="mt-1 text-ink-700"><span className="label-xs mr-2 text-accent-700">Então</span>{a.then}</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={a.on}
                  onClick={() => setAuto((as) => as.map((x, j) => (j === i ? { ...x, on: !x.on } : x)))}
                  className={cx('relative h-7 w-12 shrink-0 rounded-full transition-colors', a.on ? 'bg-accent-500' : 'bg-brand-800/15')}
                >
                  <span className={cx('absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-[left]', a.on ? 'left-6' : 'left-1')} />
                  <span className="sr-only">{a.on ? 'Ligada' : 'Desligada'}</span>
                </button>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {tab === 'escritorio' && (
        <Card className="mt-5 p-6">
          <form className="grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2" onSubmit={(e) => { e.preventDefault(); toast.show('Dados do escritório salvos.') }}>
            {[
              ['Razão social', office.name],
              ['Nome de exibição', office.short],
              ['CNPJ', office.cnpj],
              ['Cidade', office.city],
              ['E-mail de contato', 'contato@exemplo.adv.br'],
              ['Telefone', '(61) 3000-0000'],
            ].map(([k, v]) => (
              <label key={k} className="block">
                <span className="label-xs">{k}</span>
                <input defaultValue={v} className="mt-1.5 h-10 w-full rounded-lg border border-brand-800/12 bg-white px-3 text-sm focus:border-accent-500" />
              </label>
            ))}
            <label className="block sm:col-span-2">
              <span className="label-xs">Rodapé dos documentos</span>
              <textarea defaultValue={`${office.name} · ${office.city} · OAB/DF`} rows={2} className="mt-1.5 w-full rounded-lg border border-brand-800/12 bg-white px-3 py-2 text-sm focus:border-accent-500" />
            </label>
            <div className="sm:col-span-2"><Button type="submit" variant="primary" icon="check">Salvar</Button></div>
          </form>
        </Card>
      )}
      {toast.node}
    </>
  )
}
