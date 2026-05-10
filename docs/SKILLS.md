# SKILLS — Habilidades, Boas Práticas e Checklists

> Documento obrigatório de leitura antes de qualquer alteração de código. Define **o que** o agente precisa dominar e **como** aplicar.

## 🎓 Skills Técnicas Exigidas

### TypeScript
- Tipagem estrita (`strict: true`), **zero `any`**.
- Generics, tipos utilitários (`Partial`, `Pick`, `Omit`, `Record`, `ReturnType`).
- Discriminated unions, type guards, `readonly`, `as const`.
- Nunca usar `==`; sempre `===`.

### Angular 17+
- **Componentes standalone** (sem `NgModule` quando possível).
- `inject()` ao invés de constructor injection quando apropriado.
- `@for`, `@if`, `@switch` (control flow nativo).
- `ChangeDetectionStrategy.OnPush` por padrão.
- `takeUntilDestroyed()` para encerrar streams.
- Lazy loading por feature.

### RxJS
- Operadores de combinação: `switchMap`, `mergeMap`, `concatMap`, `exhaustMap`, `forkJoin`, `combineLatest`.
- Operadores de UX: `debounceTime`, `distinctUntilChanged`, `catchError`, `retry`, `shareReplay`.
- **Nunca** `subscribe` dentro de `subscribe`.
- Sempre gerenciar memory leak: `takeUntilDestroyed`, `take(1)`, `async pipe`.

### Estado
- **Signals** para estado local de componente: `signal`, `computed`, `effect`, `output()`.
- **NgRx** para estado global: `createAction`, `createReducer`, `createSelector`, `createEffect`.
- Estado imutável, tipado, com selectors memoizados.

### Angular Material
- `MatDialog`, `MatFormField`, `MatInput`, `MatButton`, `MatIcon`, `MatProgressSpinner`, `MatCard`.
- Theming customizado quando necessário.

### Testes
- **Vitest** ou **Jest** (preferência: Vitest).
- Cobertura ≥ 60% na Fase 4.
- Testar **comportamento**, não implementação.
- `TestBed`, `HttpTestingController`, `MarbleTesting` quando aplicável.

## 🧱 Princípios de Código

| Princípio | Aplicação prática |
|-----------|-------------------|
| **SOLID** | Componentes pequenos com responsabilidade única; serviços por domínio. |
| **DRY** | Compartilhar via `shared/` ou libs Nx. |
| **KISS** | Preferir o simples ao "esperto". |
| **YAGNI** | Não implementar antes de ser pedido. |
| **Clean Code** | Funções < 20 linhas; nomes que revelam intenção. |
| **Imutabilidade** | Spread/`structuredClone`, nunca mutar arrays/objetos do estado. |
| **Early return** | Reduz aninhamento, aumenta leitura. |

## 🎨 Convenções

- **Arquivos**: `kebab-case` (`user-card.component.ts`).
- **Classes/Tipos**: `PascalCase`.
- **Variáveis/Funções**: `camelCase`.
- **Constantes**: `SCREAMING_SNAKE_CASE`.
- **Domínio**: PT-BR. **Infra/técnico**: EN.
- **Commits**: [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `refactor:`, `test:`, `docs:`, `chore:`).

## 🛡️ Antipadrões Proibidos

- ❌ `any` (use `unknown` + type guard).
- ❌ `subscribe` aninhado.
- ❌ Lógica de negócio em template.
- ❌ Mutar `@Input()` direto.
- ❌ `setTimeout`/`setInterval` sem cleanup.
- ❌ Estado duplicado entre Signals e NgRx para a mesma fonte.
- ❌ `console.log` em código entregue.
- ❌ Componentes com mais de uma responsabilidade.

## ✅ Checklist antes de cada commit

- [ ] Li o `README.md` e o `docs/fase-XX.md` da pasta alterada.
- [ ] Tipagem completa (sem `any`).
- [ ] Lint passando (`npm run lint`).
- [ ] Testes passando (`npm test`).
- [ ] Sem `console.log` ou TODOs órfãos.
- [ ] Subscriptions gerenciadas.
- [ ] Componentes `OnPush` quando aplicável.
- [ ] Mensagem de commit no padrão Conventional Commits.

## 🧠 Regras para o Cursor

1. **Sempre** começar lendo `README.md` → doc da fase → este arquivo.
2. **Nunca** propor mudança sem mapear o impacto nas demais fases.
3. **Documentar decisões** não óbvias no doc da fase.
4. **Em dúvida**, perguntar antes de codar.
