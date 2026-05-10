# Respostas — Desafio técnico Front-End Angular (Attus)

Este documento complementa o código em `desafio-attus/` para as questões teóricas do PDF `desafio_frontend_attus`.

---

## 1. TypeScript e qualidade de código

### 1.1 Refatoração (`Produto` / `Verdureira`)

**Melhorias aplicadas** (implementação em `desafio-attus/src/app/shared/utils/verdureira.ts`):

- Substituição de `any` por tipos explícitos (`Produto`, números e strings).
- Modelos **imutáveis** no uso (`readonly` nos campos de `Produto` e lista `ReadonlyArray`).
- **`find`** em vez de laço manual para localizar produto por id.
- **Comparação estrita** (`===`) e **template literals** para montar a descrição.
- **`hasEstoqueProduto`** como expressão booleana direta (`quantidadeEstoque > 0`).
- **Produto inexistente**: `buscarProduto` lança erro explícito em vez de acessar propriedades de `undefined`.

### 1.2 Generics — `filtrarEPaginar<T>`

Implementação e testes em:

- `desafio-attus/src/app/shared/utils/filtrar-paginar.ts`
- `desafio-attus/src/app/shared/utils/pagination.model.ts`
- `desafio-attus/src/app/shared/utils/filtrar-paginar.spec.ts`

**Exemplo de uso** (usuários filtrados por nome, conforme PDF):

```typescript
interface Usuario {
  readonly id: number;
  readonly nome: string;
}

const usuarios: Usuario[] = [
  { id: 1, nome: 'Ana' },
  { id: 2, nome: 'João' },
];

const pagina = filtrarEPaginar(
  usuarios,
  (u) => u.nome.toLowerCase().includes('an'),
  { pagina: 1, tamanho: 10 },
);
```

---

## 2. Angular — fundamentos e reatividade

### 2.1 Change Detection e OnPush

**Problema:** Com `OnPush`, o Angular só marca o componente para verificação quando referências de `@Input()` mudam, eventos do template disparam, observables do `async` pipe emitem, ou marcação explícita (`markForCheck` / `detectChanges`), etc. O `subscribe` do serviço atualiza `this.texto`, mas **não há evento** que dispare CD; o `setInterval` altera `contador` mas esse valor **não é usado no template** (o template mostra `texto`), então o intervalo também não força atualização da parte relevante.

**Correção (sem mudar OnPush, sem alterar o serviço, sem remover o `setInterval`):** injetar `ChangeDetectorRef` e chamar `markForCheck()` dentro do `subscribe` após atribuir `this.texto`, ou expor o resultado como `Observable` e usar **`async` pipe** no template (recomendado). Outra opção é `NgZone.run()` em volta da atribuição.

### 2.2 RxJS — eliminar subscribe aninhado

**Ideia:** modelar o fluxo como uma única cadeia com **`switchMap`** (ou `mergeMap` se precisar paralelismo). Exemplo:

```typescript
this.pessoaService
  .buscarPorId(pessoaId)
  .pipe(
    switchMap((pessoa) =>
      this.pessoaService.buscarQuantidadeFamiliares(pessoaId).pipe(
        map((qtd) => `Nome: ${pessoa.nome} | familiares: ${qtd}`),
      ),
    ),
    takeUntilDestroyed(this.destroyRef),
  )
  .subscribe((texto) => {
    this.texto = texto;
  });
```

`switchMap` cancela a busca interna se uma nova emissão externa ocorrer (aqui há um único id; o padrão evita nested subscribe e facilita cleanup com `takeUntilDestroyed`).

### 2.3 Busca com debounce (500 ms)

Implementação de referência na rota **`/demo-busca`** — ver `features/search-demo/` no projeto Angular (serviço mock + `debounceTime(500)` + `distinctUntilChanged` + `switchMap` + indicador de loading + **`async` pipe**).

### 2.4 Performance — `trackBy` e OnPush

- **`trackBy`:** informa ao Angular como identificar cada item da lista; assim o DOM é reutilizado em vez de recriar nós quando a coleção muda por referência mas os itens são os mesmos, reduzindo trabalho de renderização.
- **`OnPush`:** limita ciclos de detecção ao subtree quando inputs/eventos/async pipe marcam o componente; em listas grandes, menos verificações em componentes filhos que não mudaram.
- **Default:** todo componente na árvore é verificado com muito mais frequência, aumentando custo em listas grandes mesmo quando dados efetivos não mudaram.

---

## 3. Gerenciamento de estado

### 3.1 Angular Signals — carrinho (PDF 3.1)

Implementação: [`desafio-attus/src/app/features/cart/carrinho.component.ts`](desafio-attus/src/app/features/cart/carrinho.component.ts).

- **`signal`** para a lista de itens (`itens`).
- **`computed`** para o total (`total()`).
- **`output()`** (`totalChange`) emitindo sempre que o total muda, usando **`effect()`** para observar `total()` e chamar `emit`.
- Métodos **`adicionarExemplo`** e **`removerUltimo`** atualizam a lista de forma imutável (`update`).

Rota opcional: `/carrinho` (ver [`app.routes.ts`](desafio-attus/src/app/app.routes.ts)).

### 3.2 NgRx — feature To-do (PDF 3.2)

Implementação sob [`desafio-attus/src/app/store/todos/`](desafio-attus/src/app/store/todos):

| Peça | Arquivo |
|------|---------|
| Actions | `todos.actions.ts` — `loadTodos`, `loadTodosSuccess`, `loadTodosError`, `toggleTodoComplete` |
| Reducer | `todos.reducer.ts` — `createReducer`, estado `{ items, loading, error }` |
| Selectors | `todos.selectors.ts` — `selectAllTodos`, `selectPendingTodos`, loading/erro |
| Effects | `todos.effects.ts` — ao `loadTodos`, `HttpClient.get('/todos.json')` com `switchMap`, `map` / `catchError` |

Dados estáticos servidos de [`public/todos.json`](desafio-attus/public/todos.json). Registro: `provideStore({ todos: todosReducer })` e `provideEffects(TodosEffects)` em [`app.config.ts`](desafio-attus/src/app/app.config.ts).

Rota: `/todos`.

---

## 4. Desafio prático — aplicação Angular (PDF seção 4)

### 4.1 O que foi construído

| Requisito do PDF | Onde está |
|------------------|-----------|
| Cards com nome, e-mail, botão editar | [`ui/user-card.component.*`](desafio-attus/src/app/features/users/ui/) |
| Filtro por nome com debounce **300 ms** | [`feature/users-list.page.ts`](desafio-attus/src/app/features/users/feature/users-list.page.ts) (`debounceTime(300)`, `distinctUntilChanged`, `switchMap`) |
| Loading e erro | estado `estado()` na mesma página |
| FAB / botão vermelho para novo usuário | `mat-fab` / `mat-mini-fab` `color="warn"` em [`users-list.page.html`](desafio-attus/src/app/features/users/feature/users-list.page.html) |
| Modal criar/editar com reactive forms | [`ui/user-form-dialog.component.*`](desafio-attus/src/app/features/users/ui/user-form-dialog.component.ts) |
| Campos: e-mail, nome, cpf, telefone, tipoTelefone | formulário reativo + [`usuario.model.ts`](desafio-attus/src/app/features/users/data-access/usuario.model.ts) |
| Validações e mensagens por campo | template com `@if` + `mat-error`; validadores [`cpf.validator.ts`](desafio-attus/src/app/shared/validators/cpf.validator.ts), [`telefone.validator.ts`](desafio-attus/src/app/shared/validators/telefone.validator.ts) |
| Salvar desabilitado se inválido | `[disabled]="form.invalid"` no botão Salvar |
| Edição com formulário preenchido | `patchValue` em `ngOnInit` quando `MAT_DIALOG_DATA` tem usuário |
| Dados mockados | [`usuarios.service.ts`](desafio-attus/src/app/features/users/data-access/usuarios.service.ts) + [`usuarios.mock.ts`](desafio-attus/src/app/features/users/data-access/usuarios.mock.ts) |

**Rotas:** raiz redireciona para `/usuarios`; feature lazy em [`users.routes.ts`](desafio-attus/src/app/features/users/users.routes.ts).

### 4.2 Requisitos técnicos do PDF

- **RxJS (≥ 2 operadores além de map/tap):** na listagem, uso de `debounceTime`, `distinctUntilChanged`, `switchMap`, `catchError`, `tap`, `startWith`; nos todos, `switchMap`, `catchError`, etc.
- **Standalone:** componentes com `standalone: true`.
- **Subscriptions:** fluxo principal da lista com `takeUntilDestroyed`; demais fluxos curtos ou encerrados ao fechar diálogo.
- **Interceptor HTTP:** [`core/http/api-error.interceptor.ts`](desafio-attus/src/app/core/http/api-error.interceptor.ts) registrado em `provideHttpClient(withInterceptors([...]))`. A listagem de usuários usa **serviço em memória** (mock); o interceptor cobre chamadas HTTP reais (ex.: to-dos).
- **Testes e cobertura:** Karma + Jasmine; comando `npm run test:cov`. Na última execução local, resumo de cobertura acima de **60%** nos indicadores reportados pelo Karma.

### 4.3 Stack de testes

O PDF cita **Vitest** ou **Jest**; este projeto usa o padrão do Angular CLI (**Karma + Jasmine**), equivalente para **testes unitários automatizados** com relatório de cobertura.
