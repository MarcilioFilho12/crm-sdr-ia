# Fase 1 — TypeScript e Qualidade de Código

> **Antes de tocar em qualquer arquivo desta fase, leia: `README.md` → `docs/SKILLS.md` → este documento.**

## 🎯 Objetivo

Demonstrar domínio de **TypeScript estrito**, **boas práticas** e **tipagem genérica**.

## 📂 Pasta-alvo

- `src/app/shared/utils/` (funções puras como `filtrarEPaginar`)
- Exemplos de refatoração em `docs/fase-01-typescript.md` (este arquivo) ou em `examples/fase-01/`.

## 📋 Tarefas

### 1.1 Refatoração da `Verdureira`

Refatorar o código fornecido aplicando:

- Tipagem estrita: substituir todos os `any` por tipos concretos.
- Modelos imutáveis com `readonly` quando aplicável.
- Uso de `Array.prototype.find` em vez de `for` manual.
- Tratamento de caso "produto não encontrado" (`undefined`).
- Template literals em vez de concatenação com `+`.
- Comparação estrita (`===`).
- Métodos puros e expressivos (booleano direto, sem `if/else` redundante).

**Esqueleto esperado:**

```ts
interface Produto {
  readonly id: number;
  readonly descricao: string;
  readonly quantidadeEstoque: number;
}

class Verdureira {
  private readonly produtos: ReadonlyArray<Produto> = [
    { id: 1, descricao: 'Maçã', quantidadeEstoque: 20 },
    { id: 2, descricao: 'Laranja', quantidadeEstoque: 0 },
    { id: 3, descricao: 'Limão', quantidadeEstoque: 20 },
  ];

  private buscarProduto(id: number): Produto {
    const produto = this.produtos.find((p) => p.id === id);
    if (!produto) throw new Error(`Produto ${id} não encontrado`);
    return produto;
  }

  getDescricaoProduto(id: number): string {
    const { id: pid, descricao, quantidadeEstoque } = this.buscarProduto(id);
    return `${pid} - ${descricao} (${quantidadeEstoque}x)`;
  }

  hasEstoqueProduto(id: number): boolean {
    return this.buscarProduto(id).quantidadeEstoque > 0;
  }
}
```

### 1.2 `filtrarEPaginar<T>`

Função genérica, totalmente tipada, sem `any`.

```ts
export interface PaginaParams {
  readonly pagina: number;   // 1-based
  readonly tamanho: number;
}

export interface Pagina<T> {
  readonly itens: ReadonlyArray<T>;
  readonly total: number;
}

export function filtrarEPaginar<T>(
  data: ReadonlyArray<T>,
  filterFn: (item: T) => boolean,
  { pagina, tamanho }: PaginaParams,
): Pagina<T> {
  const filtrados = data.filter(filterFn);
  const inicio = (pagina - 1) * tamanho;
  return {
    itens: filtrados.slice(inicio, inicio + tamanho),
    total: filtrados.length,
  };
}
```

**Exemplo concreto** (incluir nos testes):

```ts
interface Usuario { id: number; nome: string; }

const usuarios: Usuario[] = [/* ... */];
const pagina = filtrarEPaginar(
  usuarios,
  (u) => u.nome.toLowerCase().includes('an'),
  { pagina: 1, tamanho: 10 },
);
```

## ✅ Checklist da Fase

- [ ] Zero `any` no código entregue.
- [ ] Função genérica testada com pelo menos 3 casos (vazio, página fora, filtro).
- [ ] Comentários JSDoc nos contratos públicos.
- [ ] Lint + testes passando.

## 🧠 Decisões

> Registrar aqui qualquer decisão arquitetural tomada durante a fase.
