# Fase 4 — Aplicação Prática (Listagem de Usuários)

> **Antes de tocar em qualquer arquivo desta fase, leia, NESTA ORDEM:**
> 1. `README.md`
> 2. `docs/SKILLS.md`
> 3. `docs/ARCHITECTURE.md`
> 4. `docs/CONVENTIONS.md`
> 5. Este documento.

## 🎯 Objetivo

Construir uma aplicação Angular para **listagem, criação e edição de usuários** seguindo o protótipo descrito no desafio.

## 🧰 Stack obrigatória

Angular 17+ · Angular Material · NgRx **ou** Signals · RxJS · Vitest **ou** Jest.

## 📂 Pasta-alvo

```text
src/app/features/users/
├── data-access/
│   ├── users.service.ts        # HttpClient + mocks
│   ├── users.api.ts            # Tipos do contrato
│   └── users.mock.ts           # Dados estáticos / MSW
├── feature/
│   ├── users-list.page.ts      # Container (smart)
│   └── users.routes.ts
├── ui/
│   ├── user-card.component.ts
│   ├── user-form-dialog.component.ts
│   └── search-field.component.ts
├── store/                      # se NgRx (senão usar Signals em feature/)
└── README.md                   # Aponta de volta para este arquivo
```

## 📋 Funcionalidades

### Listagem
- Cards com **nome**, **e-mail** e botão **editar**.
- Filtro por nome com **debounce de 300ms**.
- Estado de **loading** + tratamento de **erro**.
- Botão **vermelho (FAB)** para abrir modal de cadastro.
- (Diferencial) **Paginação**.

### Modal Criar/Editar
- **Reactive Forms** com campos:
  - `email` *(obrigatório, validador de e-mail)*
  - `nome` *(obrigatório)*
  - `cpf` *(obrigatório, validador de CPF)*
  - `telefone` *(obrigatório, validador de formato)*
  - `tipoTelefone` (`'celular' | 'fixo' | 'comercial'`)
- Mensagens de erro **por campo**.
- Botão **Salvar desabilitado** enquanto `form.invalid`.
- Em **edição**, formulário pré-preenchido (`patchValue`).

## 🧪 Requisitos técnicos

- Pelo menos **2 operadores RxJS** além de `map`/`tap` (sugeridos: `switchMap`, `debounceTime`, `catchError`, `forkJoin`).
- **Componentes standalone**.
- **Subscriptions** sem memory leaks (`takeUntilDestroyed` / `async pipe`).
- **Cobertura de testes ≥ 60%** (Vitest preferencialmente).

## 🏗️ Padrões aplicados

- Smart vs Dumb components (`feature/` vs `ui/`).
- `OnPush` em todos os componentes.
- Validações reaproveitáveis em `shared/validators/` (`cpfValidator`, `phoneValidator`).
- Erros HTTP centralizados via `HttpInterceptor` em `core/http/`.

## 🧭 Fluxo de busca (exemplo)

```ts
readonly termo = new FormControl('', { nonNullable: true });
readonly state = signal<{ loading: boolean; users: User[]; error: string | null }>({
  loading: false, users: [], error: null,
});

constructor() {
  this.termo.valueChanges.pipe(
    startWith(''),
    debounceTime(300),
    distinctUntilChanged(),
    tap(() => this.state.update((s) => ({ ...s, loading: true, error: null }))),
    switchMap((q) => this.api.list(q).pipe(
      catchError((err) => {
        this.state.update((s) => ({ ...s, loading: false, error: err.message }));
        return EMPTY;
      }),
    )),
    takeUntilDestroyed(),
  ).subscribe((users) => this.state.set({ loading: false, users, error: null }));
}
```

## 🧪 Testes mínimos

- `users.service.spec.ts` — chamadas HTTP com `HttpTestingController`.
- `user-card.component.spec.ts` — renderização e click de editar.
- `user-form-dialog.component.spec.ts` — validações e submit.
- `users-list.page.spec.ts` — debounce, loading, erro.

## ✅ Definition of Done

- [ ] Todos os requisitos do 4.1 e 4.2 implementados.
- [ ] README raiz atualizado com instruções de execução real.
- [ ] `npm test -- --coverage` ≥ 60%.
- [ ] Lint e build de produção passam.
- [ ] Sem `any`, sem `subscribe` aninhado, sem memory leak.
- [ ] Acessibilidade básica (labels, foco, aria-*).

## 🌟 Diferenciais (opcionais)

- Nx Monorepo (`feature-users`, `data-access-users`, `ui`, `util`).
- Paginação server-side.
- Validações de formato (e-mail, CPF, telefone).
- Melhorias visuais sobre o protótipo.

## 🧠 Decisões

> Registrar aqui escolhas técnicas (NgRx vs Signals, MSW vs JSON Server, etc.).
