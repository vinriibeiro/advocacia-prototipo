/**
 * Dados fictícios do protótipo. Nomes, números de processo, valores e datas
 * foram inventados para demonstração e não correspondem a pessoas ou casos reais.
 */

export type Role = 'Sócio(a)' | 'Advogado(a)' | 'Estagiário(a)' | 'Financeiro' | 'Administrativo'

export interface User {
  id: string
  name: string
  role: Role
  oab?: string
  email: string
  color: string
}

export const office = {
  name: 'Albuquerque & Prado Advogados',
  short: 'A&P Advogados',
  cnpj: '00.000.000/0001-00',
  city: 'Brasília, DF',
}

export const users: User[] = [
  { id: 'u1', name: 'Dra. Helena Prado', role: 'Sócio(a)', oab: 'OAB/DF 00.001', email: 'helena@exemplo.adv.br', color: '#7f6534' },
  { id: 'u2', name: 'Dr. Rafael Albuquerque', role: 'Sócio(a)', oab: 'OAB/DF 00.002', email: 'rafael@exemplo.adv.br', color: '#2f6bb0' },
  { id: 'u3', name: 'Dra. Camila Nogueira', role: 'Advogado(a)', oab: 'OAB/DF 00.003', email: 'camila@exemplo.adv.br', color: '#6b5ba6' },
  { id: 'u4', name: 'Dr. Tiago Ferraz', role: 'Advogado(a)', oab: 'OAB/DF 00.004', email: 'tiago@exemplo.adv.br', color: '#c75b39' },
  { id: 'u5', name: 'Júlia Mendes', role: 'Estagiário(a)', email: 'julia@exemplo.adv.br', color: '#3a5a82' },
  { id: 'u6', name: 'Marcos Lima', role: 'Financeiro', email: 'marcos@exemplo.adv.br', color: '#b45309' },
]

export const currentUser = users[0]

export const userById = (id: string) => users.find((u) => u.id === id) ?? users[0]

/* Clientes ----------------------------------------------------------------- */
export type ClientKind = 'PF' | 'PJ'

export interface Client {
  id: string
  name: string
  kind: ClientKind
  doc: string
  email: string
  phone: string
  city: string
  since: string
  segment?: string
  status: 'Ativo' | 'Inativo' | 'Prospecto'
  responsible: string
  notes?: string
}

export const clients: Client[] = [
  { id: 'c1', name: 'Construtora Horizonte Ltda.', kind: 'PJ', doc: '11.111.111/0001-11', email: 'juridico@horizonte.exemplo', phone: '(61) 3000-0001', city: 'Brasília, DF', since: '2022-03-14', segment: 'Construção civil', status: 'Ativo', responsible: 'u2' },
  { id: 'c2', name: 'Beatriz Carvalho', kind: 'PF', doc: '***.111.222-**', email: 'beatriz@exemplo.com', phone: '(61) 99000-0002', city: 'Taguatinga, DF', since: '2024-08-02', status: 'Ativo', responsible: 'u3' },
  { id: 'c3', name: 'Mercado Bom Preço Ltda.', kind: 'PJ', doc: '22.222.222/0001-22', email: 'contato@bompreco.exemplo', phone: '(61) 3000-0003', city: 'Ceilândia, DF', since: '2021-11-20', segment: 'Varejo', status: 'Ativo', responsible: 'u4' },
  { id: 'c4', name: 'Eduardo Siqueira', kind: 'PF', doc: '***.333.444-**', email: 'eduardo@exemplo.com', phone: '(61) 99000-0004', city: 'Águas Claras, DF', since: '2025-02-10', status: 'Ativo', responsible: 'u1' },
  { id: 'c5', name: 'Clínica Vitalis Saúde', kind: 'PJ', doc: '33.333.333/0001-33', email: 'adm@vitalis.exemplo', phone: '(61) 3000-0005', city: 'Brasília, DF', since: '2023-06-01', segment: 'Saúde', status: 'Ativo', responsible: 'u1' },
  { id: 'c6', name: 'Transportadora Rota Sul', kind: 'PJ', doc: '44.444.444/0001-44', email: 'juridico@rotasul.exemplo', phone: '(62) 3000-0006', city: 'Goiânia, GO', since: '2020-09-15', segment: 'Logística', status: 'Ativo', responsible: 'u2' },
  { id: 'c7', name: 'Ana Paula Ferreira', kind: 'PF', doc: '***.555.666-**', email: 'anapaula@exemplo.com', phone: '(61) 99000-0007', city: 'Sobradinho, DF', since: '2025-10-22', status: 'Prospecto', responsible: 'u3' },
  { id: 'c8', name: 'Tech Nova Sistemas', kind: 'PJ', doc: '55.555.555/0001-55', email: 'legal@technova.exemplo', phone: '(61) 3000-0008', city: 'Brasília, DF', since: '2024-01-08', segment: 'Tecnologia', status: 'Ativo', responsible: 'u4' },
  { id: 'c9', name: 'Padaria Pão da Serra', kind: 'PJ', doc: '66.666.666/0001-66', email: 'paodaserra@exemplo.com', phone: '(61) 3000-0009', city: 'Planaltina, DF', since: '2019-04-30', segment: 'Alimentação', status: 'Inativo', responsible: 'u4' },
]

export const clientById = (id: string) => clients.find((c) => c.id === id)!

/* Processos ---------------------------------------------------------------- */
export type Area = 'Cível' | 'Trabalhista' | 'Família' | 'Tributário' | 'Empresarial' | 'Consumidor'
export type CaseStatus = 'Em andamento' | 'Aguardando decisão' | 'Em recurso' | 'Suspenso' | 'Encerrado'

export interface Case {
  id: string
  number: string
  title: string
  clientId: string
  area: Area
  status: CaseStatus
  phase: string
  court: string
  unit: string
  role: 'Autor' | 'Réu' | 'Requerente' | 'Requerido' | 'Reclamante' | 'Reclamada'
  opponent: string
  value: number
  responsible: string
  team: string[]
  opened: string
  lastMove: string
  nextAction?: string
  risk: 'Baixo' | 'Médio' | 'Alto'
  tags: string[]
}

export const cases: Case[] = [
  { id: 'p1', number: '0801234-55.2025.8.07.0001', title: 'Ação de cobrança · Construtora Horizonte × Incorporadora Alfa', clientId: 'c1', area: 'Cível', status: 'Em andamento', phase: 'Instrução', court: 'TJDFT', unit: '3ª Vara Cível de Brasília', role: 'Autor', opponent: 'Incorporadora Alfa S.A.', value: 1_250_000, responsible: 'u2', team: ['u2', 'u5'], opened: '2025-03-18', lastMove: '2026-11-03', nextAction: 'Juntar laudo pericial complementar', risk: 'Médio', tags: ['Perícia', 'Contrato'] },
  { id: 'p2', number: '0000456-12.2026.5.10.0007', title: 'Reclamação trabalhista · Souza × Mercado Bom Preço', clientId: 'c3', area: 'Trabalhista', status: 'Em andamento', phase: 'Audiência una', court: 'TRT-10', unit: '7ª Vara do Trabalho de Brasília', role: 'Reclamada', opponent: 'J. P. Souza', value: 86_400, responsible: 'u4', team: ['u4', 'u5'], opened: '2026-02-04', lastMove: '2026-11-02', nextAction: 'Preparar preposto e testemunhas', risk: 'Alto', tags: ['Horas extras', 'Audiência'] },
  { id: 'p3', number: '0802211-30.2024.8.07.0016', title: 'Divórcio consensual · Carvalho', clientId: 'c2', area: 'Família', status: 'Aguardando decisão', phase: 'Sentença', court: 'TJDFT', unit: '1ª Vara de Família de Taguatinga', role: 'Requerente', opponent: 'M. R. Carvalho', value: 320_000, responsible: 'u3', team: ['u3'], opened: '2024-09-12', lastMove: '2026-10-28', nextAction: 'Aguardar homologação', risk: 'Baixo', tags: ['Partilha'] },
  { id: 'p4', number: '1003377-88.2025.4.01.3400', title: 'Mandado de segurança · Clínica Vitalis × Receita Federal', clientId: 'c5', area: 'Tributário', status: 'Em recurso', phase: 'Apelação', court: 'TRF-1', unit: '5ª Vara Federal Cível da SJDF', role: 'Autor', opponent: 'União (Fazenda Nacional)', value: 540_000, responsible: 'u1', team: ['u1', 'u3'], opened: '2025-06-25', lastMove: '2026-10-30', nextAction: 'Contrarrazões de apelação', risk: 'Médio', tags: ['PIS/COFINS', 'Recurso'] },
  { id: 'p5', number: '0805566-10.2026.8.07.0001', title: 'Dissolução parcial de sociedade · Tech Nova', clientId: 'c8', area: 'Empresarial', status: 'Em andamento', phase: 'Conhecimento', court: 'TJDFT', unit: '2ª Vara Cível de Brasília', role: 'Autor', opponent: 'L. A. Monteiro', value: 890_000, responsible: 'u4', team: ['u4', 'u2'], opened: '2026-05-07', lastMove: '2026-11-04', nextAction: 'Réplica à contestação', risk: 'Médio', tags: ['Apuração de haveres'] },
  { id: 'p6', number: '0700912-44.2026.8.07.0003', title: 'Ação indenizatória · Siqueira × Companhia Aérea Beta', clientId: 'c4', area: 'Consumidor', status: 'Em andamento', phase: 'Conciliação', court: 'TJDFT', unit: '2º Juizado Especial Cível de Brasília', role: 'Autor', opponent: 'Companhia Aérea Beta', value: 18_500, responsible: 'u3', team: ['u3', 'u5'], opened: '2026-08-19', lastMove: '2026-10-27', nextAction: 'Audiência de conciliação', risk: 'Baixo', tags: ['Danos morais'] },
  { id: 'p7', number: '0000789-21.2025.5.18.0012', title: 'Reclamação trabalhista · Ribeiro × Transportadora Rota Sul', clientId: 'c6', area: 'Trabalhista', status: 'Em recurso', phase: 'Recurso ordinário', court: 'TRT-18', unit: '12ª Vara do Trabalho de Goiânia', role: 'Reclamada', opponent: 'C. Ribeiro', value: 142_000, responsible: 'u2', team: ['u2', 'u4'], opened: '2025-04-02', lastMove: '2026-10-21', nextAction: 'Acompanhar pauta de julgamento', risk: 'Médio', tags: ['Acidente de trabalho'] },
  { id: 'p8', number: '0803344-02.2025.8.07.0001', title: 'Execução de título extrajudicial · Horizonte × Fornecedora Gama', clientId: 'c1', area: 'Cível', status: 'Em andamento', phase: 'Execução', court: 'TJDFT', unit: '5ª Vara Cível de Brasília', role: 'Autor', opponent: 'Fornecedora Gama Ltda.', value: 210_000, responsible: 'u2', team: ['u2', 'u5'], opened: '2025-09-30', lastMove: '2026-10-15', nextAction: 'Pedido de penhora on-line', risk: 'Baixo', tags: ['Execução'] },
  { id: 'p9', number: '0804455-77.2026.8.07.0001', title: 'Ação revisional de contrato · Mercado Bom Preço × Banco Delta', clientId: 'c3', area: 'Cível', status: 'Aguardando decisão', phase: 'Saneamento', court: 'TJDFT', unit: '8ª Vara Cível de Brasília', role: 'Autor', opponent: 'Banco Delta S.A.', value: 460_000, responsible: 'u4', team: ['u4'], opened: '2026-03-11', lastMove: '2026-10-09', risk: 'Médio', tags: ['Juros', 'Contrato bancário'] },
  { id: 'p10', number: '1001122-33.2024.4.01.3400', title: 'Ação anulatória de débito fiscal · Transportadora Rota Sul', clientId: 'c6', area: 'Tributário', status: 'Suspenso', phase: 'Sobrestado', court: 'TRF-1', unit: '2ª Vara Federal Cível da SJDF', role: 'Autor', opponent: 'União (Fazenda Nacional)', value: 1_980_000, responsible: 'u1', team: ['u1'], opened: '2024-02-19', lastMove: '2026-07-02', nextAction: 'Aguardar julgamento de tema repetitivo', risk: 'Alto', tags: ['ICMS', 'Repetitivo'] },
  { id: 'p11', number: '0806677-91.2026.8.07.0001', title: 'Recuperação de crédito · Tech Nova × Cliente Ômega', clientId: 'c8', area: 'Empresarial', status: 'Em andamento', phase: 'Citação', court: 'TJDFT', unit: '1ª Vara Cível de Brasília', role: 'Autor', opponent: 'Ômega Comércio Ltda.', value: 74_300, responsible: 'u4', team: ['u4', 'u5'], opened: '2026-10-14', lastMove: '2026-11-01', nextAction: 'Verificar certidão do oficial de justiça', risk: 'Baixo', tags: ['Cobrança'] },
  { id: 'p12', number: '0801010-20.2023.8.07.0001', title: 'Ação de despejo · Padaria Pão da Serra', clientId: 'c9', area: 'Cível', status: 'Encerrado', phase: 'Arquivado', court: 'TJDFT', unit: '4ª Vara Cível de Brasília', role: 'Réu', opponent: 'Imobiliária Central', value: 48_000, responsible: 'u4', team: ['u4'], opened: '2023-05-22', lastMove: '2025-12-10', risk: 'Baixo', tags: ['Locação'] },
]

export const caseById = (id: string) => cases.find((c) => c.id === id)

/* Andamentos (timeline) ----------------------------------------------------- */
export interface Movement {
  id: string
  caseId: string
  date: string
  kind: 'Andamento' | 'Publicação' | 'Petição' | 'Audiência' | 'Decisão' | 'Interno'
  text: string
  by?: string
}

export const movements: Movement[] = [
  { id: 'm1', caseId: 'p1', date: '2026-11-03', kind: 'Publicação', text: 'Intimação para manifestação sobre laudo pericial no prazo de 15 dias.' },
  { id: 'm2', caseId: 'p1', date: '2026-10-29', kind: 'Andamento', text: 'Juntada de laudo pericial pelo perito judicial.' },
  { id: 'm3', caseId: 'p1', date: '2026-10-10', kind: 'Interno', text: 'Reunião com o cliente para alinhar quesitos complementares.', by: 'u2' },
  { id: 'm4', caseId: 'p1', date: '2026-09-02', kind: 'Petição', text: 'Protocolada petição com quesitos e indicação de assistente técnico.', by: 'u2' },
  { id: 'm5', caseId: 'p1', date: '2026-07-15', kind: 'Decisão', text: 'Deferida a produção de prova pericial contábil.' },
  { id: 'm6', caseId: 'p1', date: '2025-03-18', kind: 'Andamento', text: 'Distribuição por sorteio à 3ª Vara Cível de Brasília.' },
  { id: 'm7', caseId: 'p2', date: '2026-11-02', kind: 'Publicação', text: 'Designada audiência una para 18/11/2026 às 14h30.' },
  { id: 'm8', caseId: 'p2', date: '2026-09-20', kind: 'Petição', text: 'Contestação protocolada com documentos de controle de jornada.', by: 'u4' },
  { id: 'm9', caseId: 'p2', date: '2026-02-04', kind: 'Andamento', text: 'Reclamação distribuída. Notificação da reclamada expedida.' },
  { id: 'm10', caseId: 'p4', date: '2026-10-30', kind: 'Publicação', text: 'Intimação para contrarrazões de apelação. Prazo: 15 dias úteis.' },
  { id: 'm11', caseId: 'p4', date: '2026-10-12', kind: 'Andamento', text: 'Apelação interposta pela União.' },
  { id: 'm12', caseId: 'p4', date: '2026-09-25', kind: 'Decisão', text: 'Sentença concedendo a segurança para afastar a incidência questionada.' },
  { id: 'm13', caseId: 'p5', date: '2026-11-04', kind: 'Andamento', text: 'Contestação juntada aos autos pelo réu.' },
  { id: 'm14', caseId: 'p6', date: '2026-10-27', kind: 'Andamento', text: 'Designada audiência de conciliação para 12/11/2026 às 10h.' },
  { id: 'm15', caseId: 'p3', date: '2026-10-28', kind: 'Andamento', text: 'Autos conclusos para sentença.' },
]

/* Agenda e prazos ----------------------------------------------------------- */
export type EventKind = 'Prazo fatal' | 'Prazo interno' | 'Audiência' | 'Reunião' | 'Diligência'

export interface Event {
  id: string
  date: string
  time?: string
  kind: EventKind
  title: string
  caseId?: string
  clientId?: string
  assignee: string
  done?: boolean
  location?: string
}

export const events: Event[] = [
  { id: 'e1', date: '2026-11-05', time: '09:30', kind: 'Reunião', title: 'Reunião de alinhamento · Construtora Horizonte', caseId: 'p1', clientId: 'c1', assignee: 'u2', location: 'Sala 2' },
  { id: 'e2', date: '2026-11-05', time: '14:00', kind: 'Prazo interno', title: 'Revisar minuta de contrarrazões', caseId: 'p4', assignee: 'u3' },
  { id: 'e3', date: '2026-11-05', time: '16:30', kind: 'Diligência', title: 'Retirar certidão no cartório da 5ª Vara', caseId: 'p8', assignee: 'u5', location: 'Fórum de Brasília' },
  { id: 'e4', date: '2026-11-06', kind: 'Prazo fatal', title: 'Réplica à contestação', caseId: 'p5', assignee: 'u4' },
  { id: 'e5', date: '2026-11-07', time: '11:00', kind: 'Reunião', title: 'Primeira reunião · Ana Paula Ferreira (prospecto)', clientId: 'c7', assignee: 'u3', location: 'Videochamada' },
  { id: 'e6', date: '2026-11-10', kind: 'Prazo fatal', title: 'Manifestação sobre laudo pericial', caseId: 'p1', assignee: 'u2' },
  { id: 'e7', date: '2026-11-12', time: '10:00', kind: 'Audiência', title: 'Audiência de conciliação', caseId: 'p6', assignee: 'u3', location: '2º JEC · sala 4' },
  { id: 'e8', date: '2026-11-13', kind: 'Prazo interno', title: 'Preparar preposto e testemunhas', caseId: 'p2', assignee: 'u4' },
  { id: 'e9', date: '2026-11-18', time: '14:30', kind: 'Audiência', title: 'Audiência una', caseId: 'p2', assignee: 'u4', location: '7ª VT · videoconferência' },
  { id: 'e10', date: '2026-11-20', kind: 'Prazo fatal', title: 'Contrarrazões de apelação', caseId: 'p4', assignee: 'u1' },
  { id: 'e11', date: '2026-11-24', time: '15:00', kind: 'Reunião', title: 'Comitê mensal de carteira', assignee: 'u1', location: 'Sala 1' },
  { id: 'e12', date: '2026-11-27', kind: 'Prazo interno', title: 'Fechamento de timesheet do mês', assignee: 'u6' },
  { id: 'e13', date: '2026-11-03', kind: 'Prazo fatal', title: 'Juntada de procuração atualizada', caseId: 'p11', assignee: 'u5', done: true },
  { id: 'e14', date: '2026-10-30', time: '09:00', kind: 'Audiência', title: 'Audiência de instrução', caseId: 'p9', assignee: 'u4', done: true },
  { id: 'e15', date: '2026-12-02', kind: 'Prazo fatal', title: 'Pedido de penhora on-line', caseId: 'p8', assignee: 'u2' },
  { id: 'e16', date: '2026-11-04', kind: 'Prazo fatal', title: 'Verificar certidão do oficial de justiça', caseId: 'p11', assignee: 'u5' },
]

/* Publicações --------------------------------------------------------------- */
export interface Publication {
  id: string
  date: string
  source: string
  caseId?: string
  excerpt: string
  status: 'Nova' | 'Em análise' | 'Tratada'
  suggestedDeadline?: { title: string; date: string }
  matchedBy: string
}

export const publications: Publication[] = [
  { id: 'pub1', date: '2026-11-05', source: 'DJe TJDFT', caseId: 'p1', excerpt: 'Fica a parte autora intimada para, querendo, manifestar-se sobre o laudo pericial juntado aos autos no prazo de 15 (quinze) dias.', status: 'Nova', suggestedDeadline: { title: 'Manifestação sobre laudo pericial', date: '2026-11-26' }, matchedBy: 'OAB/DF 00.002' },
  { id: 'pub2', date: '2026-11-05', source: 'DEJT TRT-10', caseId: 'p2', excerpt: 'Designo audiência una para o dia 18/11/2026, às 14h30, por videoconferência. Intimem-se as partes para comparecimento com testemunhas.', status: 'Nova', suggestedDeadline: { title: 'Audiência una', date: '2026-11-18' }, matchedBy: 'OAB/DF 00.004' },
  { id: 'pub3', date: '2026-11-04', source: 'DJe TJDFT', caseId: 'p5', excerpt: 'Vista à parte autora da contestação e documentos, pelo prazo legal.', status: 'Em análise', suggestedDeadline: { title: 'Réplica à contestação', date: '2026-11-26' }, matchedBy: 'OAB/DF 00.004' },
  { id: 'pub4', date: '2026-11-04', source: 'DJe TJDFT', excerpt: 'Intimação de advogado homônimo em processo não cadastrado. Verificar se pertence ao escritório.', status: 'Em análise', matchedBy: 'Nome: Tiago Ferraz' },
  { id: 'pub5', date: '2026-10-30', source: 'DJe TRF-1', caseId: 'p4', excerpt: 'Intime-se a parte apelada para apresentar contrarrazões no prazo de 15 (quinze) dias úteis.', status: 'Tratada', suggestedDeadline: { title: 'Contrarrazões de apelação', date: '2026-11-20' }, matchedBy: 'OAB/DF 00.001' },
  { id: 'pub6', date: '2026-10-28', source: 'DJe TJDFT', caseId: 'p3', excerpt: 'Autos conclusos para sentença.', status: 'Tratada', matchedBy: 'OAB/DF 00.003' },
  { id: 'pub7', date: '2026-10-27', source: 'DJe TJDFT', caseId: 'p6', excerpt: 'Designada audiência de conciliação para 12/11/2026 às 10h, na sala 4 do 2º Juizado Especial Cível.', status: 'Tratada', suggestedDeadline: { title: 'Audiência de conciliação', date: '2026-11-12' }, matchedBy: 'OAB/DF 00.003' },
]

/* Tarefas ------------------------------------------------------------------- */
export type TaskColumn = 'A fazer' | 'Em andamento' | 'Em revisão' | 'Concluído'

export interface Task {
  id: string
  title: string
  column: TaskColumn
  caseId?: string
  assignee: string
  due?: string
  priority: 'Baixa' | 'Média' | 'Alta'
  checklist?: { done: number; total: number }
}

export const tasks: Task[] = [
  { id: 't1', title: 'Elaborar réplica à contestação', column: 'Em andamento', caseId: 'p5', assignee: 'u4', due: '2026-11-06', priority: 'Alta', checklist: { done: 3, total: 5 } },
  { id: 't2', title: 'Analisar laudo pericial contábil', column: 'Em andamento', caseId: 'p1', assignee: 'u2', due: '2026-11-08', priority: 'Alta', checklist: { done: 1, total: 4 } },
  { id: 't3', title: 'Minuta de contrarrazões de apelação', column: 'Em revisão', caseId: 'p4', assignee: 'u3', due: '2026-11-14', priority: 'Alta', checklist: { done: 6, total: 6 } },
  { id: 't4', title: 'Levantar jurisprudência sobre horas extras em escala 12×36', column: 'A fazer', caseId: 'p2', assignee: 'u5', due: '2026-11-11', priority: 'Média' },
  { id: 't5', title: 'Atualizar planilha de cálculo de haveres', column: 'A fazer', caseId: 'p5', assignee: 'u5', due: '2026-11-12', priority: 'Média' },
  { id: 't6', title: 'Enviar relatório mensal · Construtora Horizonte', column: 'A fazer', assignee: 'u2', due: '2026-11-10', priority: 'Baixa' },
  { id: 't7', title: 'Conferir certidão de citação', column: 'Concluído', caseId: 'p11', assignee: 'u5', due: '2026-11-04', priority: 'Média', checklist: { done: 2, total: 2 } },
  { id: 't8', title: 'Protocolar procuração atualizada', column: 'Concluído', caseId: 'p11', assignee: 'u5', due: '2026-11-03', priority: 'Alta' },
  { id: 't9', title: 'Preparar roteiro de perguntas para testemunhas', column: 'A fazer', caseId: 'p2', assignee: 'u4', due: '2026-11-13', priority: 'Alta' },
  { id: 't10', title: 'Revisar proposta de honorários · Ana Paula Ferreira', column: 'Em revisão', assignee: 'u1', due: '2026-11-07', priority: 'Média' },
  { id: 't11', title: 'Conciliar recebimentos de outubro', column: 'Em andamento', assignee: 'u6', due: '2026-11-07', priority: 'Média', checklist: { done: 8, total: 12 } },
]

/* Documentos ---------------------------------------------------------------- */
export interface Doc {
  id: string
  name: string
  type: 'pdf' | 'docx' | 'xlsx' | 'img'
  caseId?: string
  clientId: string
  size: string
  updated: string
  by: string
  version: number
  signed?: boolean
}

export const docs: Doc[] = [
  { id: 'd1', name: 'Petição inicial.pdf', type: 'pdf', caseId: 'p1', clientId: 'c1', size: '1,8 MB', updated: '2025-03-17', by: 'u2', version: 3, signed: true },
  { id: 'd2', name: 'Contrato de empreitada.pdf', type: 'pdf', caseId: 'p1', clientId: 'c1', size: '4,2 MB', updated: '2025-03-10', by: 'u5', version: 1 },
  { id: 'd3', name: 'Laudo pericial contábil.pdf', type: 'pdf', caseId: 'p1', clientId: 'c1', size: '6,1 MB', updated: '2026-10-29', by: 'u5', version: 1 },
  { id: 'd4', name: 'Quesitos complementares.docx', type: 'docx', caseId: 'p1', clientId: 'c1', size: '84 KB', updated: '2026-11-04', by: 'u2', version: 2 },
  { id: 'd5', name: 'Contestação.docx', type: 'docx', caseId: 'p2', clientId: 'c3', size: '312 KB', updated: '2026-09-19', by: 'u4', version: 4, signed: true },
  { id: 'd6', name: 'Controles de jornada 2025.xlsx', type: 'xlsx', caseId: 'p2', clientId: 'c3', size: '940 KB', updated: '2026-09-15', by: 'u5', version: 1 },
  { id: 'd7', name: 'Contrarrazões de apelação (minuta).docx', type: 'docx', caseId: 'p4', clientId: 'c5', size: '201 KB', updated: '2026-11-04', by: 'u3', version: 5 },
  { id: 'd8', name: 'Procuração ad judicia.pdf', type: 'pdf', clientId: 'c8', caseId: 'p11', size: '220 KB', updated: '2026-11-03', by: 'u5', version: 1, signed: true },
  { id: 'd9', name: 'Contrato de honorários.pdf', type: 'pdf', clientId: 'c8', size: '310 KB', updated: '2026-01-08', by: 'u1', version: 1, signed: true },
  { id: 'd10', name: 'Comprovantes de passagem.pdf', type: 'pdf', caseId: 'p6', clientId: 'c4', size: '1,1 MB', updated: '2026-08-18', by: 'u3', version: 1 },
  { id: 'd11', name: 'Réplica (rascunho).docx', type: 'docx', caseId: 'p5', clientId: 'c8', size: '156 KB', updated: '2026-11-05', by: 'u4', version: 2 },
]

export const templates = [
  { id: 'tp1', name: 'Petição inicial · ação de cobrança', area: 'Cível', uses: 42 },
  { id: 'tp2', name: 'Contestação trabalhista', area: 'Trabalhista', uses: 31 },
  { id: 'tp3', name: 'Contrato de honorários (êxito + fixo)', area: 'Administrativo', uses: 118 },
  { id: 'tp4', name: 'Procuração ad judicia et extra', area: 'Administrativo', uses: 203 },
  { id: 'tp5', name: 'Notificação extrajudicial', area: 'Empresarial', uses: 27 },
  { id: 'tp6', name: 'Relatório mensal ao cliente', area: 'Administrativo', uses: 64 },
]

/* Financeiro ---------------------------------------------------------------- */
export interface Contract {
  id: string
  clientId: string
  caseId?: string
  model: 'Fixo' | 'Mensal' | 'Êxito' | 'Por hora'
  value: number
  description: string
}

export const contracts: Contract[] = [
  { id: 'ct1', clientId: 'c1', caseId: 'p1', model: 'Êxito', value: 0.15, description: '15% sobre o valor recuperado + R$ 25.000 fixo' },
  { id: 'ct2', clientId: 'c1', model: 'Mensal', value: 9_500, description: 'Assessoria jurídica mensal' },
  { id: 'ct3', clientId: 'c3', model: 'Mensal', value: 6_800, description: 'Contencioso trabalhista e cível' },
  { id: 'ct4', clientId: 'c5', caseId: 'p4', model: 'Fixo', value: 38_000, description: 'Mandado de segurança + recursos' },
  { id: 'ct5', clientId: 'c8', caseId: 'p5', model: 'Por hora', value: 450, description: 'R$ 450/hora · sócio; R$ 280/hora · advogado' },
  { id: 'ct6', clientId: 'c6', model: 'Mensal', value: 7_200, description: 'Assessoria trabalhista e tributária' },
  { id: 'ct7', clientId: 'c2', caseId: 'p3', model: 'Fixo', value: 12_000, description: 'Divórcio consensual com partilha' },
  { id: 'ct8', clientId: 'c4', caseId: 'p6', model: 'Êxito', value: 0.3, description: '30% sobre a indenização' },
]

export interface Receivable {
  id: string
  clientId: string
  description: string
  due: string
  value: number
  status: 'Pago' | 'A vencer' | 'Atrasado'
  paidOn?: string
}

export const receivables: Receivable[] = [
  { id: 'r1', clientId: 'c1', description: 'Assessoria mensal · novembro', due: '2026-11-10', value: 9_500, status: 'A vencer' },
  { id: 'r2', clientId: 'c3', description: 'Assessoria mensal · novembro', due: '2026-11-10', value: 6_800, status: 'A vencer' },
  { id: 'r3', clientId: 'c6', description: 'Assessoria mensal · novembro', due: '2026-11-15', value: 7_200, status: 'A vencer' },
  { id: 'r4', clientId: 'c5', description: 'Parcela 3/4 · mandado de segurança', due: '2026-10-25', value: 9_500, status: 'Atrasado' },
  { id: 'r5', clientId: 'c8', description: 'Horas de outubro (31h)', due: '2026-11-08', value: 11_340, status: 'A vencer' },
  { id: 'r6', clientId: 'c2', description: 'Parcela 4/4 · divórcio', due: '2026-10-20', value: 3_000, status: 'Pago', paidOn: '2026-10-19' },
  { id: 'r7', clientId: 'c1', description: 'Assessoria mensal · outubro', due: '2026-10-10', value: 9_500, status: 'Pago', paidOn: '2026-10-10' },
  { id: 'r8', clientId: 'c3', description: 'Assessoria mensal · outubro', due: '2026-10-10', value: 6_800, status: 'Pago', paidOn: '2026-10-14' },
  { id: 'r9', clientId: 'c6', description: 'Assessoria mensal · outubro', due: '2026-10-15', value: 7_200, status: 'Atrasado' },
  { id: 'r10', clientId: 'c8', description: 'Horas de setembro (24h)', due: '2026-10-08', value: 8_760, status: 'Pago', paidOn: '2026-10-07' },
  { id: 'r11', clientId: 'c5', description: 'Parcela 4/4 · mandado de segurança', due: '2026-11-25', value: 9_500, status: 'A vencer' },
]

export interface Payable {
  id: string
  description: string
  category: string
  due: string
  value: number
  status: 'Pago' | 'A vencer'
}

export const payables: Payable[] = [
  { id: 'py1', description: 'Aluguel do escritório', category: 'Estrutura', due: '2026-11-05', value: 8_900, status: 'A vencer' },
  { id: 'py2', description: 'Folha e pró-labore', category: 'Pessoas', due: '2026-11-05', value: 46_200, status: 'A vencer' },
  { id: 'py3', description: 'Custas · penhora on-line (p8)', category: 'Custas processuais', due: '2026-11-12', value: 640, status: 'A vencer' },
  { id: 'py4', description: 'Assinatura de pesquisa jurisprudencial', category: 'Software', due: '2026-11-15', value: 1_290, status: 'A vencer' },
  { id: 'py5', description: 'Perito assistente técnico (p1)', category: 'Honorários de terceiros', due: '2026-10-28', value: 4_500, status: 'Pago' },
  { id: 'py6', description: 'Contabilidade', category: 'Serviços', due: '2026-11-20', value: 1_800, status: 'A vencer' },
]

export const cashflow = [
  { month: 'mai', revenue: 71_200, expenses: 58_400 },
  { month: 'jun', revenue: 68_900, expenses: 57_100 },
  { month: 'jul', revenue: 84_300, expenses: 60_200 },
  { month: 'ago', revenue: 79_600, expenses: 59_800 },
  { month: 'set', revenue: 92_100, expenses: 63_500 },
  { month: 'out', revenue: 88_750, expenses: 64_900 },
]

export interface TimeEntry {
  id: string
  date: string
  userId: string
  caseId?: string
  clientId: string
  hours: number
  description: string
  billable: boolean
}

export const timesheet: TimeEntry[] = [
  { id: 'ts1', date: '2026-11-05', userId: 'u4', caseId: 'p5', clientId: 'c8', hours: 2.5, description: 'Redação da réplica · tópicos 1 a 3', billable: true },
  { id: 'ts2', date: '2026-11-05', userId: 'u2', caseId: 'p1', clientId: 'c1', hours: 1.5, description: 'Reunião com o cliente sobre laudo', billable: true },
  { id: 'ts3', date: '2026-11-04', userId: 'u3', caseId: 'p4', clientId: 'c5', hours: 3, description: 'Minuta de contrarrazões', billable: true },
  { id: 'ts4', date: '2026-11-04', userId: 'u5', caseId: 'p2', clientId: 'c3', hours: 2, description: 'Pesquisa de jurisprudência', billable: false },
  { id: 'ts5', date: '2026-11-03', userId: 'u4', caseId: 'p5', clientId: 'c8', hours: 4, description: 'Análise da contestação e documentos', billable: true },
  { id: 'ts6', date: '2026-11-03', userId: 'u1', caseId: 'p10', clientId: 'c6', hours: 1, description: 'Acompanhamento do tema repetitivo', billable: true },
]

/* Relatórios ---------------------------------------------------------------- */
export const newCasesByMonth = [
  { month: 'dez', value: 4 }, { month: 'jan', value: 6 }, { month: 'fev', value: 5 }, { month: 'mar', value: 8 },
  { month: 'abr', value: 7 }, { month: 'mai', value: 9 }, { month: 'jun', value: 6 }, { month: 'jul', value: 10 },
  { month: 'ago', value: 8 }, { month: 'set', value: 11 }, { month: 'out', value: 9 }, { month: 'nov', value: 3 },
]

export const casesByArea: Array<{ area: Area; active: number; closed: number }> = [
  { area: 'Cível', active: 28, closed: 41 },
  { area: 'Trabalhista', active: 19, closed: 33 },
  { area: 'Tributário', active: 11, closed: 9 },
  { area: 'Empresarial', active: 9, closed: 12 },
  { area: 'Família', active: 7, closed: 15 },
  { area: 'Consumidor', active: 6, closed: 22 },
]

export const outcomes = [
  { label: 'Êxito total', value: 58 },
  { label: 'Êxito parcial', value: 24 },
  { label: 'Acordo', value: 31 },
  { label: 'Improcedente', value: 19 },
]

export const productivity = [
  { userId: 'u1', hours: 118, billable: 96, cases: 14 },
  { userId: 'u2', hours: 132, billable: 110, cases: 19 },
  { userId: 'u3', hours: 141, billable: 118, cases: 17 },
  { userId: 'u4', hours: 149, billable: 121, cases: 22 },
  { userId: 'u5', hours: 126, billable: 48, cases: 24 },
]

export const revenueByArea = [
  { area: 'Cível', value: 212_400 },
  { area: 'Trabalhista', value: 158_900 },
  { area: 'Tributário', value: 141_200 },
  { area: 'Empresarial', value: 96_300 },
  { area: 'Família', value: 38_600 },
  { area: 'Consumidor', value: 21_100 },
]

/* Notificações -------------------------------------------------------------- */
export const notifications = [
  { id: 'n1', text: '2 publicações novas aguardando tratamento', time: 'há 12 min', kind: 'publicação' },
  { id: 'n2', text: 'Prazo fatal amanhã: réplica à contestação (Tech Nova)', time: 'há 1 h', kind: 'prazo' },
  { id: 'n3', text: 'Dra. Camila enviou a minuta de contrarrazões para revisão', time: 'há 3 h', kind: 'tarefa' },
  { id: 'n4', text: 'Recebimento em atraso: Clínica Vitalis · parcela 3/4', time: 'ontem', kind: 'financeiro' },
]
