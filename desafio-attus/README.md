# Desafio Attus — app Angular (usuários)

SPA com **Angular 19**, **Angular Material** e dados **mockados** em memória, alinhada ao PDF do desafio (listagem, busca com debounce, FAB, modal criar/editar com validações).

## Requisitos

- **Node.js** 18+ (LTS recomendado)
- **npm** 9+

## Rodar localmente

```bash
cd desafio-attus
npm install
npm start
```

Abra `http://localhost:4200/` (redireciona para `/usuarios`).

## Scripts úteis

| Comando            | Descrição                                      |
|--------------------|------------------------------------------------|
| `npm start`        | Servidor de desenvolvimento (`ng serve`)       |
| `npm run build`    | Build de produção                              |
| `npm test`         | Testes unitários (Karma) em modo interativo   |
| `npm run test:cov` | Testes + cobertura (headless)                 |
| `npm run lint`     | ESLint (`ng lint`)                            |

## Estrutura da feature

- `src/app/features/users/` — listagem, diálogo, serviço mock
- `src/app/core/http/api-error.interceptor.ts` — interceptor de erro HTTP
- `src/app/shared/validators/` — CPF e telefone (Brasil)

## Problemas de build no Windows (Yarn PnP)

Se `ng build` falhar com mensagem de **Plug'n'Play** e `.pnp.cjs`, veja [TROUBLESHOOTING.md](./TROUBLESHOOTING.md). O `npm start` costuma funcionar; o `npx tsc --noEmit -p tsconfig.app.json` valida o TypeScript sem o bundler.
