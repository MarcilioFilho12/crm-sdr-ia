# CONVENTIONS — Convenções de Código, Commits e Branches

## 🏷️ Nomenclatura

| Elemento | Convenção | Exemplo |
|----------|-----------|---------|
| Arquivos | kebab-case | `user-card.component.ts` |
| Componentes | `*.component.ts` | `UserCardComponent` |
| Serviços | `*.service.ts` | `UsersService` |
| Modelos | `*.model.ts` ou `*.types.ts` | `User`, `PaginaParams` |
| Stores NgRx | `*.actions.ts`, `*.reducer.ts`, `*.selectors.ts`, `*.effects.ts` | `todos.actions.ts` |
| Testes | `*.spec.ts` | `user-card.component.spec.ts` |

## ✍️ Estilo

- Aspas simples em TS, duplas em HTML.
- Ponto e vírgula obrigatório.
- 2 espaços de indentação.
- Largura máxima 100 colunas.
- `prettier` + `eslint --fix` antes do commit.

## 🌱 Branches

- `main` — estável.
- `feat/<fase>-<descricao>` — features.
- `fix/<descricao>` — correções.
- `refactor/<descricao>` — refatorações.
- `docs/<descricao>` — documentação.

## 📝 Commits (Conventional Commits)

```text
<tipo>(<escopo opcional>): <mensagem curta no imperativo>

[corpo opcional]

[rodapé opcional]
```

Tipos: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`, `perf`, `style`, `ci`.

Exemplos:
- `feat(users): adiciona modal de cadastro reativo`
- `refactor(shared): tipa filtrarEPaginar com generics`
- `test(store): cobre selectors de todos`

## 🔁 Pull Requests

- Pequenos e focados.
- Descrição com: contexto, fase, checklist do `SKILLS.md`.
- CI verde (lint + testes + build) antes do merge.
