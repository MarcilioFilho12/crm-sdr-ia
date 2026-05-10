# Fase 3 — Gerenciamento de Estado

> **Antes de tocar em qualquer arquivo desta fase, leia: `README.md` → `docs/SKILLS.md` → `docs/ARCHITECTURE.md` → este documento.**

## 🎯 Objetivo

Implementar estado **local com Signals** e estado **global com NgRx**.

## 📂 Pastas-alvo

- `src/app/features/cart/` (Signals)
- `src/app/store/todos/` (NgRx)

## 3.1 Signals — Carrinho

```ts
interface Item { id: string; nome: string; preco: number; quantidade: number; }

@Component({
  selector: 'app-carrinho',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<p>Total: {{ total() | currency }}</p>`,
})
export class CarrinhoComponent {
  readonly itens = signal<ReadonlyArray<Item>>([]);
  readonly total = computed(() =>
    this.itens().reduce((acc, i) => acc + i.preco * i.quantidade, 0),
  );
  readonly totalChange = output<number>();

  constructor() {
    effect(() => this.totalChange.emit(this.total()));
  }

  adicionar(item: Item): void {
    this.itens.update((arr) => [...arr, item]);
  }

  remover(id: string): void {
    this.itens.update((arr) => arr.filter((i) => i.id !== id));
  }
}
```

## 3.2 NgRx — Feature `todos`

### Estrutura
```text
src/app/store/todos/
├── todos.actions.ts
├── todos.reducer.ts
├── todos.selectors.ts
├── todos.effects.ts
└── todos.model.ts
```

### Actions
```ts
export const loadTodos = createAction('[Todos] Load');
export const loadTodosSuccess = createAction('[Todos] Load Success', props<{ todos: Todo[] }>());
export const loadTodosError = createAction('[Todos] Load Error', props<{ error: string }>());
export const toggleTodoComplete = createAction('[Todos] Toggle', props<{ id: string }>());
```

### Reducer
```ts
export interface TodosState {
  readonly items: ReadonlyArray<Todo>;
  readonly loading: boolean;
  readonly error: string | null;
}
export const initialState: TodosState = { items: [], loading: false, error: null };

export const todosReducer = createReducer(
  initialState,
  on(loadTodos, (s) => ({ ...s, loading: true, error: null })),
  on(loadTodosSuccess, (s, { todos }) => ({ ...s, loading: false, items: todos })),
  on(loadTodosError, (s, { error }) => ({ ...s, loading: false, error })),
  on(toggleTodoComplete, (s, { id }) => ({
    ...s,
    items: s.items.map((t) => t.id === id ? { ...t, completed: !t.completed } : t),
  })),
);
```

### Selectors
```ts
export const selectTodosState = createFeatureSelector<TodosState>('todos');
export const selectAllTodos = createSelector(selectTodosState, (s) => s.items);
export const selectPendingTodos = createSelector(selectAllTodos, (items) => items.filter((t) => !t.completed));
```

### Effect
```ts
loadTodos$ = createEffect(() => this.actions$.pipe(
  ofType(loadTodos),
  switchMap(() => this.http.get<Todo[]>('/api/todos').pipe(
    map((todos) => loadTodosSuccess({ todos })),
    catchError((err: HttpErrorResponse) => of(loadTodosError({ error: err.message }))),
  )),
));
```

## ✅ Checklist

- [ ] Estado tipado e imutável.
- [ ] Selectors memoizados.
- [ ] Effects com `catchError` para nunca quebrar a stream.
- [ ] Sem mistura desnecessária entre Signals e NgRx para a mesma fonte.
