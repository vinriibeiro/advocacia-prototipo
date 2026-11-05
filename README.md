# Albuquerque & Prado Advogados · Sistema de gestão (protótipo)

Protótipo navegável de um sistema de gestão para escritórios de advocacia, construído como peça de
apresentação. Usa um escritório fictício (Albuquerque & Prado Advogados) com identidade própria do
segmento: azul-carvão profundo, dourado sóbrio, off-white e tipografia serifada nos títulos.

**Acesse:** https://vinriibeiro.github.io/advocacia-prototipo/

> Todos os dados (escritório, pessoas, processos, valores) são fictícios. Qualquer credencial entra.

## Telas

| Tela | O que demonstra |
|---|---|
| Entrar | Acesso por e-mail e senha, perfis por função |
| Painel | Indicadores do dia, prazos, publicações, tarefas, gráficos |
| Processos | Carteira com busca e filtros; ficha completa com andamentos, prazos, documentos, tarefas, horas e partes |
| Clientes | Cadastro PF/PJ; visão 360° com processos, contratos, cobranças e documentos |
| Agenda e prazos | Calendário mensal e lista, por tipo e responsável |
| Publicações | Caixa de entrada dos diários oficiais com vínculo ao processo e prazo sugerido (ações funcionam) |
| Tarefas | Quadro por etapa com movimentação, prioridade e checklist |
| Documentos | Arquivos por cliente/processo com versões; modelos de peças |
| Financeiro | Receita × despesas, contas a receber/pagar, timesheet, contratos de honorários |
| Relatórios | Carteira por área, resultados, produtividade, receita por área |
| Configurações | Usuários e matriz de permissões, integrações, automações, dados do escritório |

Cada tela traz um bloco **"Sobre esta tela"**, pensado para a apresentação: explica o propósito da
tela e o que está sendo demonstrado. Ele pode ser recolhido.

## Executar localmente

```bash
npm install
npm run dev       # http://localhost:5181
npm run build     # build de produção em dist/
```

## Publicação

O workflow em `.github/workflows/deploy.yml` publica no GitHub Pages a cada push em `main`.

## Stack

React 19 · TypeScript · Vite 6 · Tailwind CSS 4 · React Router 7. Gráficos em SVG puro, com paleta
validada para daltonismo. Sem backend: todos os dados vêm de `src/data/mock.ts`.

---

Protótipo desenvolvido pela Solvora Soluções Digitais.
