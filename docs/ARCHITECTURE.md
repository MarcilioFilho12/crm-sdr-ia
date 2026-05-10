# ARCHITECTURE — Arquitetura do Projeto

> Leitura obrigatória antes de criar/mover pastas, módulos ou bibliotecas.

## 🧭 Visão Geral

A aplicação Angular adota arquitetura **em camadas por feature**, com componentes **standalone** e separação clara entre **apresentação**, **estado** e **acesso a dados**.

```text
src/
├── app/
│   ├── core/                 # Singletons (interceptors, guards, config)
│   │   ├── http/
│   │   ├── guards/
│   │   └── tokens/
│   ├── shared/               # UI/utilitários reutilizáveis (sem estado de domínio)
│   │   ├── ui/               # Componentes apresentacionais
│   │   ├── pipes/
│   │   ├── directives/
│   │   └── utils/            # Funções puras (ex.: filtrarEPaginar)
│   ├── store/                # NgRx global (se usado)
│   │   └── todos/            # Feature state: actions, reducer, selectors, effects
│   ├── features/             # Domínios da aplicação
│   │   └── users/
│   │       ├── data-access/  # Serviços HTTP, modelos, mocks
│   │       ├── feature/      # Páginas/containers (smart components)
│   │       ├── ui/           # Cards, formulários (dumb components)
│   │       └── README.md     # Aponta para docs/fase-04
│   ├── app.component.ts
│   ├── app.config.ts
│   └── app.routes.ts
├── assets/
└── styles/
```

## 🧩 Camadas

| Camada | Responsabilidade | Pode importar de |
|--------|------------------|------------------|
| `core` | Infraestrutura singleton | — |
| `shared` | UI e utils sem domínio | `core` |
| `store` | Estado global NgRx | `core`, `shared` |
| `features/<x>/data-access` | HTTP + modelos do domínio | `core`, `shared` |
| `features/<x>/ui` | Componentes "burros" | `shared` |
| `features/<x>/feature` | Páginas/containers | tudo da própria feature + `store` + `shared` |

> **Features não importam umas das outras.** Comunicação entre features ocorre via `store/` ou rotas.

## 🔌 Roteamento

- Standalone routing com `loadComponent` para lazy loading.
- Rotas declaradas em `app.routes.ts` e em `<feature>.routes.ts`.

## 📦 Possível Evolução para Nx (diferencial)

```text
apps/
└── attus-frontend/
libs/
├── feature-users/
├── data-access-users/
├── ui/
└── util/
```

Se adotado, atualizar este documento e o `README.md` raiz.

## 🧪 Testes

- Co-localizados: `componente.spec.ts` ao lado do `componente.ts`.
- Mocks em `__mocks__/` ou `data-access/mocks/`.

## 📝 Regra de alteração estrutural

Toda mudança nesta arquitetura exige:
1. Atualização deste arquivo.
2. Atualização do `README.md` raiz se a tabela de fases mudar.
3. PR com label `arch` e justificativa.
