import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { Login } from '@/pages/Login'
import { Dashboard } from '@/pages/Dashboard'
import { Processos } from '@/pages/Processos'
import { ProcessoDetalhe } from '@/pages/ProcessoDetalhe'
import { Clientes } from '@/pages/Clientes'
import { ClienteDetalhe } from '@/pages/ClienteDetalhe'
import { Agenda } from '@/pages/Agenda'
import { Publicacoes } from '@/pages/Publicacoes'
import { Tarefas } from '@/pages/Tarefas'
import { Documentos } from '@/pages/Documentos'
import { Financeiro } from '@/pages/Financeiro'
import { Relatorios } from '@/pages/Relatorios'
import { Configuracoes } from '@/pages/Configuracoes'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/entrar" replace />} />
      <Route path="/entrar" element={<Login />} />
      <Route path="/app" element={<AppShell />}>
        <Route index element={<Navigate to="/app/painel" replace />} />
        <Route path="painel" element={<Dashboard />} />
        <Route path="processos" element={<Processos />} />
        <Route path="processos/:id" element={<ProcessoDetalhe />} />
        <Route path="clientes" element={<Clientes />} />
        <Route path="clientes/:id" element={<ClienteDetalhe />} />
        <Route path="agenda" element={<Agenda />} />
        <Route path="publicacoes" element={<Publicacoes />} />
        <Route path="tarefas" element={<Tarefas />} />
        <Route path="documentos" element={<Documentos />} />
        <Route path="financeiro" element={<Financeiro />} />
        <Route path="relatorios" element={<Relatorios />} />
        <Route path="configuracoes" element={<Configuracoes />} />
      </Route>
      <Route path="*" element={<Navigate to="/entrar" replace />} />
    </Routes>
  )
}
