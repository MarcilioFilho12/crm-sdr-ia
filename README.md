# Desafio Técnico Front-End — Angular (Attus)

> **Mapa central do projeto.** Este README é a **fonte da verdade** para qualquer agente (humano ou IA, especialmente o **Cursor**) que for trabalhar neste repositório. Ele descreve o objetivo, a stack obrigatória, a arquitetura, as fases do desafio e as regras de execução. Cada fase tem um documento próprio em [`docs/`](./docs) que **deve ser lido antes** de qualquer alteração na pasta correspondente.

---

## 📌 Regra de Ouro para o Cursor (e qualquer agente de IA)

**Antes de criar, editar, mover ou deletar qualquer arquivo/pasta, o agente DEVE:**

1. **Ler este `README.md` por inteiro** — para entender escopo, stack, arquitetura e convenções.
2. **Ler o arquivo `docs/fase-XX-*.md`** correspondente à pasta/funcionalidade que será alterada.
3. **Ler o `docs/SKILLS.md`** — contém as habilidades técnicas exigidas, padrões de código, boas práticas e checklists de qualidade.
4. **Ler o `docs/ARCHITECTURE.md`** quando a alteração envolver estrutura de pastas, módulos, libs ou camadas.
5. Só então propor/aplicar mudanças, **respeitando 100% da documentação**.

> Se houver conflito entre uma instrução pontual e a documentação, **a documentação vence**. Em caso de dúvida, parar e perguntar — nunca improvisar.

### Fluxo obrigatório de trabalho

```text
Pedido recebido
   │
   ▼
[1] Ler README.md ──► [2] Identificar a fase ──► [3] Ler docs/fase-XX.md
                                                       │
                                                       ▼
                                            [4] Ler docs/SKILLS.md
                                                       │
                                                       ▼
                                       [5] Ler docs/ARCHITECTURE.md (se aplicável)
                                                       │
                                                       ▼
                                            [6] Planejar a mudança
                                                       │
                                                       ▼
                                  [7] Implementar respeitando convenções
                                                       │
                                                       ▼
                                  [8] Rodar lint + testes + build local
                                                       │
                                                       ▼
                                            [9] Atualizar a doc se necessário
```

---

## 🎯 Objetivo

Avaliar conhecimentos práticos em **Angular 17+**, **RxJS**, **NgRx/Signals**, **Angular Material**, **testes unitários**, **TypeScript** e **integração com APIs REST**, por meio de quatro fases progressivas.

## 🧰 Stack Obrigatória

- **Angular 17+** (componentes standalone)
- **TypeScript** (strict, sem `any`)
- **RxJS**
- **NgRx** *ou* **Signals** (gerenciamento de estado)
- **Angular Material**
- **Vitest** *ou* **Jest** (testes)
- **ESLint + Prettier** (qualidade)

## 🗂️ Estrutura de Documentação

```text
.
├── README.md                       ◄── Você está aqui (mapa central)
└── docs/
    ├── ARCHITECTURE.md             Arquitetura, camadas, organização de pastas
    ├── SKILLS.md                   Habilidades, boas práticas e checklists
    ├── CONVENTIONS.md              Convenções de código, commits e nomes
    ├── fase-01-typescript.md       Fase 1 — TypeScript e Qualidade de Código
    ├── fase-02-angular-rxjs.md     Fase 2 — Angular: Fundamentos e Reatividade
    ├── fase-03-estado.md           Fase 3 — Gerenciamento de Estado
    └── fase-04-app-pratica.md      Fase 4 — Aplicação Angular (Desafio Prático)
```

> **Cada pasta de código futura (ex.: `src/app/features/users`) também terá um `README.md` local** apontando para a fase correspondente em `docs/`.

---

## 🚦 Fases do Projeto

| # | Fase | Documento | Pasta-alvo |
|---|------|-----------|------------|
| 1 | TypeScript e Qualidade de Código | [`docs/fase-01-typescript.md`](./docs/fase-01-typescript.md) | `src/app/core/`, `src/app/shared/` |
| 2 | Angular — Fundamentos e Reatividade | [`docs/fase-02-angular-rxjs.md`](./docs/fase-02-angular-rxjs.md) | `src/app/shared/`, exemplos isolados |
| 3 | Gerenciamento de Estado (Signals + NgRx) | [`docs/fase-03-estado.md`](./docs/fase-03-estado.md) | `src/app/store/`, `src/app/features/` |
| 4 | Aplicação Prática — Listagem de Usuários | [`docs/fase-04-app-pratica.md`](./docs/fase-04-app-pratica.md) | `src/app/features/users/` |

> **Antes de mexer em qualquer pasta-alvo, leia o documento da fase correspondente.**

---

## 🏛️ Princípios de Engenharia (não-negociáveis)

1. **Boas práticas**: Clean Code, SOLID, DRY, KISS, YAGNI.
2. **Lógica clara**: funções pequenas, puras quando possível, early-return.
3. **Semântica**: nomes que revelam intenção (PT-BR no domínio, EN em infra).
4. **Arquitetura em camadas**: `core` (singletons), `shared` (UI reutilizável), `features` (domínios), `store` (estado).
5. **Sintaxe moderna**: TS estrito, sem `any`, sem `var`, sem `==`.
6. **Escalabilidade**: standalone components, lazy loading por feature, tree-shakable.
7. **Metodologia sistemática**: TDD/BDD onde fizer sentido, PRs pequenos, commits convencionais.
8. **Reatividade correta**: nunca `subscribe` aninhado, sempre gerenciar memory leaks.
9. **Acessibilidade e i18n**: labels, ARIA, foco visível.
10. **Testes**: cobertura ≥ 60% (Fase 4), com foco em comportamento.

## ✅ Definition of Done (por fase)

- [ ] Documento da fase lido e seguido à risca
- [ ] Código com tipagem completa (zero `any`)
- [ ] Lint e formatação passando
- [ ] Testes unitários verdes
- [ ] Sem `console.log` ou código morto
- [ ] Subscriptions gerenciadas (sem memory leak)
- [ ] README/doc atualizado se a estrutura mudou

---

## 🚀 Instalação e Execução

> A aplicação prática (Fase 4) ficará na raiz ou em um workspace Nx (a definir em `docs/ARCHITECTURE.md`).

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm start          # http://localhost:4200

# Rodar testes
npm test
npm run test:cov   # com cobertura

# Lint
npm run lint

# Build de produção
npm run build
```

## 📦 Entrega

- Repositório público no GitHub com este README na raiz.
- Documento do desafio respondido (referenciando os arquivos `docs/fase-XX.md`).
- Prazo: **4 dias corridos** após o recebimento.

---

## 🧭 Como o Cursor deve raciocinar a cada tarefa

1. **Identifique a fase** pela pasta/feature pedida.
2. **Abra o doc da fase** e verifique requisitos, restrições e exemplos.
3. **Confira `SKILLS.md`** para o checklist técnico aplicável.
4. **Implemente em pequenos passos** verificáveis (build/lint/test a cada passo).
5. **Documente decisões** no doc da fase (seção "Decisões").
6. **Nunca pule a leitura da documentação** — mesmo para mudanças "pequenas".

---

## ❓ Questionamentos Obrigatórios (antes de codar)

> O Cursor **DEVE** responder mentalmente (e registrar no PR/commit quando relevante) cada bloco abaixo **antes** de escrever qualquer linha de código. Se alguma resposta for "não sei", **pare e pergunte ao humano** — não improvise.

### 1. Contexto e Escopo
- [ ] Qual **fase** (1–4) esta tarefa pertence? Qual `docs/fase-XX.md` rege a mudança?
- [ ] Qual o **objetivo de negócio** (não técnico) desta alteração?
- [ ] Esta mudança **já existe** no código? Estou duplicando algo de `shared/` ou `core/`?
- [ ] O que **NÃO** está no escopo? (evitar scope creep / YAGNI)

### 2. Arquitetura e Impacto
- [ ] A pasta-alvo está correta segundo `docs/ARCHITECTURE.md` (`core` / `shared` / `features` / `store`)?
- [ ] Este código é **smart** (container) ou **dumb** (apresentação)? Está na pasta certa (`feature/` vs `ui/`)?
- [ ] A mudança quebra contratos públicos (tipos, rotas, selectors, APIs)? Quem consome?
- [ ] Preciso de **lazy loading**? A feature está isolada o suficiente para escalar?

### 3. Modelagem e Tipos
- [ ] Os tipos do domínio estão definidos e **imutáveis** (`readonly`, `as const`)?
- [ ] Existe algum `any` implícito? Posso usar `unknown` + type guard?
- [ ] Generics fazem sentido aqui (reuso real) ou estou super-engenhando?
- [ ] Os nomes revelam **intenção** (PT-BR no domínio, EN em infra)?

### 4. Estado e Reatividade
- [ ] Este estado é **local** (Signals) ou **global** (NgRx)? Justifico em 1 linha.
- [ ] Há risco de **estado duplicado** entre Signals e NgRx para a mesma fonte?
- [ ] As streams têm **cleanup** (`takeUntilDestroyed`, `async pipe`, `take(1)`)?
- [ ] Estou usando o operador RxJS correto? (`switchMap` p/ cancelar, `mergeMap` p/ paralelo, `concatMap` p/ ordem, `exhaustMap` p/ ignorar enquanto ocupado)
- [ ] Há `subscribe` aninhado escondido? (proibido)

### 5. UI, UX e Acessibilidade
- [ ] Componentes estão `OnPush`? Há `trackBy` em loops?
- [ ] Há estados de **loading**, **erro** e **vazio** tratados?
- [ ] Inputs têm **labels**, **aria-***, mensagens de erro por campo?
- [ ] Foco visível, navegação por teclado, contraste adequado?
- [ ] Formulários: validações reativas, `Salvar` desabilitado se `invalid`?

### 6. Performance e Escalabilidade
- [ ] Há `debounceTime` / `distinctUntilChanged` em entradas do usuário?
- [ ] Listas grandes: virtualização ou paginação server-side?
- [ ] Selectors NgRx **memoizados**? Computeds Signals puros?
- [ ] Bundle: imports tree-shakable, sem barrels gigantes?

### 7. Testes e Qualidade
- [ ] Quais cenários de teste cobrem este código (happy path, erro, edge cases)?
- [ ] Testo **comportamento** ou implementação? (preferir comportamento)
- [ ] HTTP testado com `HttpTestingController`? Streams complexas com marbles?
- [ ] Cobertura da Fase 4 segue ≥ 60%?

### 8. Segurança e Robustez
- [ ] Erros HTTP tratados via `HttpInterceptor` central?
- [ ] Dados de usuário sanitizados antes de exibir/persistir?
- [ ] Variáveis de ambiente / segredos **fora** do bundle client?

### 9. Entrega e Versionamento
- [ ] O commit segue **Conventional Commits**?
- [ ] Atualizei a doc da fase (seção "Decisões") se mudei algo não óbvio?
- [ ] `lint`, `test` e `build` passam localmente?
- [ ] O PR é pequeno e focado (uma responsabilidade)?

---

## 🔁 Fluxo Assertivo de Decisão

```text
Tarefa recebida
   │
   ▼
Bloco 1 (Contexto) ──► escopo claro? ── não ──► PERGUNTAR
   │ sim
   ▼
Bloco 2 (Arquitetura) ──► pasta/camada certa? ── não ──► consultar ARCHITECTURE.md
   │ sim
   ▼
Bloco 3–4 (Tipos + Estado) ──► modelo definido? ── não ──► modelar primeiro
   │ sim
   ▼
Escrever TESTE primeiro (quando aplicável) ──► ver falhar
   │
   ▼
Implementar mínimo viável ──► teste passa? ── não ──► ajustar
   │ sim
   ▼
Bloco 5–6 (UX + Performance) ──► refinar
   │
   ▼
Bloco 7–8 (Qualidade + Segurança) ──► revisar
   │
   ▼
Bloco 9 (Entrega) ──► commit + doc + PR
```

## 🧪 Heurísticas de Decisão Rápida

| Dúvida | Pergunta-chave | Default |
|--------|----------------|---------|
| Signals ou NgRx? | "Outros componentes/efeitos precisam disso?" | Não → Signals · Sim → NgRx |
| `switchMap` ou `mergeMap`? | "Posso descartar a request anterior?" | Sim → `switchMap` · Não → `mergeMap` |
| Componente novo ou reuso? | "Existe algo 80% igual em `shared/`?" | Sim → estender · Não → criar em `ui/` |
| Validador inline ou compartilhado? | "Vai ser usado em ≥ 2 forms?" | Sim → `shared/validators/` · Não → inline |
| Teste unitário ou integração? | "Estou testando 1 unidade isolada?" | Sim → unitário · Não → integração |

## 🚧 Quando PARAR e Perguntar

- Requisito ambíguo ou contraditório com a doc.
- Mudança que afeta **múltiplas fases** simultaneamente.
- Necessidade de adicionar **dependência nova** não listada na stack.
- Refatoração que altera **contratos públicos** (rotas, tipos exportados, selectors).
- Qualquer escolha entre **NgRx vs Signals** quando ambos parecem válidos.

> Lembre-se: **este README é o mapa; os arquivos em `docs/` são as rotas; os questionamentos acima são a bússola.** Sem mapa, sem rota e sem bússola, não se anda no projeto.
