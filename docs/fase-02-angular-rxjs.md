# Fase 2 — Angular: Fundamentos e Reatividade

> **Antes de tocar em qualquer arquivo desta fase, leia: `README.md` → `docs/SKILLS.md` → este documento.**

## 🎯 Objetivo

Demonstrar domínio de **Change Detection**, **RxJS** e **performance** em Angular 17+.

## 📋 Tarefas

### 2.1 OnPush sem render

**Problema:** atribuir `this.texto` dentro de um `subscribe` fora da zona/CD não dispara render com `OnPush`.

**Restrições:** não trocar a estratégia, não modificar `PessoaService`, não remover `setInterval`.

**Solução recomendada:** injetar `ChangeDetectorRef` e chamar `markForCheck()` após atribuir.

```ts
constructor(
  private readonly pessoaService: PessoaService,
  private readonly cdr: ChangeDetectorRef,
) {}

ngOnInit(): void {
  this.subscriptionBuscarPessoa = this.pessoaService.buscarPorId(1).subscribe((pessoa) => {
    this.texto = `Nome: ${pessoa.nome}`;
    this.cdr.markForCheck();
  });
  setInterval(() => this.contador++, 1000);
}

ngOnDestroy(): void {
  this.subscriptionBuscarPessoa?.unsubscribe();
}
```

> **Por quê?** `OnPush` só re-renderiza em mudança de `@Input` por referência, eventos do template ou sinais explícitos de CD. `markForCheck` agenda a verificação na próxima passagem.

**Alternativa idiomática:** usar `async pipe` no template (`{{ pessoa$ | async }}`) — elimina `subscribe` manual.

### 2.2 Eliminar subscribes aninhados

```ts
ngOnInit(): void {
  const pessoaId = 1;
  this.pessoaService.buscarPorId(pessoaId).pipe(
    switchMap((pessoa) =>
      this.pessoaService.buscarQuantidadeFamiliares(pessoaId).pipe(
        map((qtd) => `Nome: ${pessoa.nome} | familiares: ${qtd}`),
      ),
    ),
    takeUntilDestroyed(this.destroyRef),
  ).subscribe((texto) => (this.texto = texto));
}
```

**Operador escolhido: `switchMap`** — cancela a busca de familiares anterior se um novo `pessoaId` chegar (race-safe).

### 2.3 Busca com debounce

Componente standalone com `FormControl`:

```ts
readonly termo = new FormControl('', { nonNullable: true });
readonly loading = signal(false);

readonly resultados$ = this.termo.valueChanges.pipe(
  debounceTime(500),
  distinctUntilChanged(),
  tap(() => this.loading.set(true)),
  switchMap((q) =>
    this.api.buscar(q).pipe(catchError(() => of([]))),
  ),
  tap(() => this.loading.set(false)),
  takeUntilDestroyed(),
);
```

Template usa `async pipe`, sem `subscribe` manual.

### 2.4 OnPush + trackBy

- **`trackBy`**: evita recriar nós DOM ao reordenar listas, comparando por id estável.
- **`OnPush`**: o componente lista só checa quando o array muda por referência (imutabilidade!).
- **`Default`**: percorreria o componente a cada tick → degradação O(n) em listas grandes.

```ts
@for (item of itens(); track item.id) { <app-card [item]="item" /> }
```

## ✅ Checklist

- [ ] Nenhum `subscribe` aninhado.
- [ ] Memory leaks gerenciados via `takeUntilDestroyed` ou `async pipe`.
- [ ] Justificativa de cada operador RxJS comentada.
- [ ] OnPush mantido nos componentes.
