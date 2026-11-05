import { useNavigate } from 'react-router-dom'
import { Icon } from '@/components/ui/Icon'
import { Button } from '@/components/ui/primitives'
import { currentUser, office } from '@/data/mock'
import { Logo } from '@/components/ui/Logo'

export function Login() {
  const navigate = useNavigate()

  return (
    <div className="grid min-h-dvh grid-cols-1 lg:grid-cols-[1.1fr_1fr]">
      {/* painel de marca */}
      <section className="relative hidden overflow-hidden bg-brand-800 p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgb(255 255 255 / 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255 / 0.05) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(ellipse 70% 70% at 40% 40%, black, transparent)',
          }}
        />
        <div className="absolute -top-32 -right-20 h-[26rem] w-[26rem] rounded-full bg-accent-500/20 blur-[120px]" />
        <div className="relative"><Logo tone="light" size={46} /></div>

        <div className="relative max-w-lg">
          <p className="inline-flex items-center gap-2 rounded-full border border-accent-500/30 bg-accent-500/10 px-3 py-1 text-[11px] font-semibold tracking-[0.14em] text-accent-300 uppercase">
            <Icon name="sparkle" size={12} /> Protótipo de apresentação
          </p>
          <h1 className="mt-6 font-serif text-[2.9rem] leading-[1.08] font-normal">
            A rotina do escritório,
            <br />
            <span className="text-accent-400">em um só lugar.</span>
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-white/75">
            Processos, prazos, publicações, tarefas, documentos e financeiro conectados em um sistema
            desenvolvido sob medida para a rotina do escritório.
          </p>
          <ul className="mt-8 grid grid-cols-2 gap-3 text-sm text-white/80">
            {[
              ['Prazos e audiências com alertas', 'calendar'],
              ['Publicações capturadas e vinculadas', 'newspaper'],
              ['Honorários, horas e fluxo de caixa', 'wallet'],
              ['Perfis de acesso por função', 'shield'],
            ].map(([t, i]) => (
              <li key={t} className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5">
                <Icon name={i as 'calendar'} size={16} className="shrink-0 text-accent-400" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-sm text-white/50">{office.name} · {office.city}</p>
      </section>

      {/* formulário */}
      <section className="flex items-center justify-center bg-paper-100 p-6 sm:p-12">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden"><Logo size={40} /></div>

          <h2 className="font-serif text-[2rem] font-normal text-brand-800">Entrar</h2>
          <p className="mt-1 text-sm text-ink-500">{office.name}</p>

          <form
            className="mt-7 space-y-4"
            onSubmit={(e) => {
              e.preventDefault()
              navigate('/app/painel')
            }}
          >
            <label className="block">
              <span className="label-xs">E-mail</span>
              <input
                type="email"
                defaultValue={currentUser.email}
                className="mt-1.5 h-11 w-full rounded-lg border border-brand-800/12 bg-white px-3 text-sm focus:border-accent-500"
              />
            </label>
            <label className="block">
              <span className="label-xs">Senha</span>
              <input
                type="password"
                defaultValue="••••••••••"
                className="mt-1.5 h-11 w-full rounded-lg border border-brand-800/12 bg-white px-3 text-sm focus:border-accent-500"
              />
            </label>
            <div className="flex items-center justify-between text-sm">
              <label className="inline-flex items-center gap-2 text-ink-700">
                <input type="checkbox" defaultChecked className="accent-accent-500" /> Manter conectado
              </label>
              <span className="text-accent-700">Esqueci a senha</span>
            </div>
            <Button type="submit" variant="primary" className="h-11 w-full text-[15px]" iconRight="arrow-right">
              Entrar
            </Button>
          </form>

          <div className="mt-6 rounded-xl border border-accent-500/30 bg-accent-500/8 p-4 text-[13px] leading-relaxed text-ink-700">
            <p className="flex items-center gap-2 font-display font-semibold text-accent-700">
              <Icon name="info" size={15} /> Sobre esta tela
            </p>
            <p className="mt-1.5">
              Acesso com e-mail e senha, perfis por função (sócio, advogado, estagiário, financeiro) e autenticação em
              duas etapas opcional. No protótipo, qualquer credencial entra como <strong>{currentUser.name}</strong>.
            </p>
          </div>

          <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-ink-400">
            <Icon name="lock" size={12} /> Dados fictícios para demonstração
          </p>
        </div>
      </section>
    </div>
  )
}
