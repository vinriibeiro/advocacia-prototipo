import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Icon, type IconName } from '@/components/ui/Icon'
import { Avatar, cx } from '@/components/ui/primitives'
import { Logo } from '@/components/ui/Logo'
import { currentUser, notifications, publications } from '@/data/mock'

const nav: Array<{ to: string; label: string; icon: IconName; badge?: number }> = [
  { to: '/app/painel', label: 'Painel', icon: 'dashboard' },
  { to: '/app/processos', label: 'Processos', icon: 'briefcase' },
  { to: '/app/clientes', label: 'Clientes', icon: 'users' },
  { to: '/app/agenda', label: 'Agenda e prazos', icon: 'calendar' },
  { to: '/app/publicacoes', label: 'Publicações', icon: 'newspaper', badge: publications.filter((p) => p.status === 'Nova').length },
  { to: '/app/tarefas', label: 'Tarefas', icon: 'kanban' },
  { to: '/app/documentos', label: 'Documentos', icon: 'folder' },
  { to: '/app/financeiro', label: 'Financeiro', icon: 'wallet' },
  { to: '/app/relatorios', label: 'Relatórios', icon: 'chart' },
  { to: '/app/configuracoes', label: 'Configurações', icon: 'settings' },
]

export function AppShell() {
  const [open, setOpen] = useState(false)
  const [notif, setNotif] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    setOpen(false)
    setNotif(false)
    window.scrollTo(0, 0)
  }, [location.pathname])

  const sidebar = (
    <div className="flex h-full flex-col bg-brand-800 text-white">
      <div className="flex h-16 items-center justify-between px-5">
        <Logo tone="light" size={34} />
        <button type="button" className="rounded-lg p-1 text-white/70 hover:bg-white/10 lg:hidden" onClick={() => setOpen(false)} aria-label="Fechar menu">
          <Icon name="close" size={20} />
        </button>
      </div>

      <div className="mx-4 mb-3 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
        <Icon name="sparkle" size={13} className="text-accent-400" />
        <p className="text-[10.5px] font-semibold tracking-[0.14em] text-white/60 uppercase">Gestão do escritório</p>
      </div>

      <nav aria-label="Principal" className="scroll-thin flex-1 overflow-y-auto px-3">
        <ul className="space-y-0.5">
          {nav.map((n) => (
            <li key={n.to}>
              <NavLink
                to={n.to}
                className={({ isActive }) =>
                  cx(
                    'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] font-medium transition-colors',
                    isActive ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/6 hover:text-white',
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon name={n.icon} size={18} className={isActive ? 'text-accent-400' : 'text-white/60 group-hover:text-accent-300'} />
                    <span className="flex-1">{n.label}</span>
                    {n.badge ? <span className="rounded-full bg-accent-500 px-1.5 py-0.5 text-[10.5px] font-bold text-brand-800">{n.badge}</span> : null}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-white/10 p-4">
        <div className="flex items-center gap-3">
          <Avatar userId={currentUser.id} size={36} className="ring-brand-800" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{currentUser.name}</p>
            <p className="truncate text-xs text-white/55">{currentUser.role} · {currentUser.oab}</p>
          </div>
          <button type="button" onClick={() => navigate('/entrar')} className="rounded-lg p-1.5 text-white/60 hover:bg-white/10 hover:text-white" aria-label="Sair">
            <Icon name="logout" size={18} />
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-dvh lg:grid lg:grid-cols-[264px_1fr]">
      {/* sidebar desktop */}
      <aside className="sticky top-0 hidden h-dvh lg:block">{sidebar}</aside>

      {/* sidebar mobile */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button type="button" aria-label="Fechar menu" className="absolute inset-0 bg-brand-950/60" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-[280px] shadow-lift">{sidebar}</aside>
        </div>
      )}

      <div className="flex min-w-0 flex-col">
        {/* barra superior */}
        <header className="sticky top-0 z-40 flex h-16 items-center gap-3 border-b border-brand-800/8 bg-white/85 px-4 backdrop-blur sm:px-6">
          <button type="button" className="rounded-lg p-2 text-brand-800 hover:bg-brand-800/6 lg:hidden" onClick={() => setOpen(true)} aria-label="Abrir menu">
            <Icon name="menu" size={22} />
          </button>

          <label className="relative hidden flex-1 md:block md:max-w-md">
            <Icon name="search" size={16} className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-ink-400" />
            <input
              type="search"
              placeholder="Buscar processo, cliente, documento…"
              className="h-10 w-full rounded-lg border border-brand-800/10 bg-paper-100 pr-16 pl-9 text-sm placeholder:text-ink-400 focus:border-accent-500 focus:bg-white"
            />
            <kbd className="absolute top-1/2 right-2.5 -translate-y-1/2 rounded border border-brand-800/10 bg-white px-1.5 py-0.5 font-sans text-[10.5px] text-ink-500">Ctrl K</kbd>
          </label>

          <div className="ml-auto flex items-center gap-2">
            <span className="hidden items-center gap-1.5 rounded-full border border-accent-500/30 bg-accent-500/10 px-2.5 py-1 text-[11px] font-semibold text-accent-700 sm:inline-flex">
              <Icon name="sparkle" size={12} /> Dados fictícios
            </span>
            <div className="relative">
              <button
                type="button"
                onClick={() => setNotif((v) => !v)}
                aria-expanded={notif}
                aria-label="Notificações"
                className="relative rounded-lg p-2 text-brand-800 hover:bg-brand-800/6"
              >
                <Icon name="bell" size={20} />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-accent-500 ring-2 ring-white" />
              </button>
              {notif && (
                <div className="absolute right-0 mt-2 w-[340px] max-w-[calc(100vw-2rem)] rounded-2xl border border-brand-800/10 bg-white p-2 shadow-lift">
                  <p className="px-3 py-2 font-display text-sm font-semibold text-brand-800">Notificações</p>
                  <ul>
                    {notifications.map((n) => (
                      <li key={n.id} className="flex gap-3 rounded-xl px-3 py-2.5 hover:bg-paper-100">
                        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-800/6 text-brand-800">
                          <Icon name={n.kind === 'prazo' ? 'clock' : n.kind === 'publicação' ? 'newspaper' : n.kind === 'financeiro' ? 'wallet' : 'kanban'} size={14} />
                        </span>
                        <span>
                          <span className="block text-[13px] leading-snug text-brand-800">{n.text}</span>
                          <span className="text-[11.5px] text-ink-500">{n.time}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <Avatar userId={currentUser.id} size={34} className="ring-paper-200" />
          </div>
        </header>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>

        <footer className="px-4 py-4 text-center text-[12px] text-ink-400 sm:px-6">
          Protótipo de apresentação · todos os dados são fictícios · desenvolvido pela Solvora Soluções Digitais
        </footer>
      </div>
    </div>
  )
}
