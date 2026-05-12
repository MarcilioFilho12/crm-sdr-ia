# Problemas comuns

## Build (`ng build`) e Yarn Plug'n'Play no perfil do Windows

Se o build falhar com mensagens como `The Yarn Plug'n'Play manifest forbids importing "@angular/core"` apontando para `../../../../.pnp.cjs`, o resolvedor subiu níveis de diretório até encontrar um arquivo `.pnp.cjs` (por exemplo na pasta do usuário `C:\Users\<você>\`). Isso não vem do projeto Angular em si.

**Opções:**

1. Clonar ou copiar o repositório para um caminho mais profundo **ou** para uma pasta sem `.pnp.cjs` nos ancestrais (por exemplo `C:\temp\desafio-attus`).
2. Ajustar temporariamente o uso do Yarn PnP no seu ambiente (conforme a documentação do Yarn), se você usa Yarn globalmente no perfil.
3. Validar tipos localmente com `npx tsc --noEmit -p tsconfig.app.json`.

Para **`ng serve`** no Windows com `.pnp.cjs` no perfil do utilizador, use **`npm run start:local`** (ver [`README.md`](../../README.md) na raiz do repositório e `scripts/start-local.ps1`). Se não for o caso, o `npm start` costuma funcionar mesmo quando `ng build` acusa esse conflito; se não funcionar, use a mesma estratégia do item 1.
