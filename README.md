# Projeto-teste

Repositório de trabalho com documentação do CRM em **`crm-sdr-ia/docs/`** e a **aplicação entregável do desafio Attus** em **`crm-sdr-ia/desafio-attus/`** (SPA Angular com dados mock em memória).

---

## Visão geral da aplicação (Desafio Attus)

| Item | Detalhe |
|------|---------|
| **Stack** | Angular 19, Angular Material, RxJS, componentes standalone |
| **Dados** | Serviço mock (`UsuariosService`); estado reposto ao recarregar a página |
| **Rotas** | `/` e qualquer rota desconhecida redirecionam para **`/usuarios`** |
| **Porta dev** | **4200** (predefinição do `ng serve`) |

Funcionalidades implementadas: listagem de utilizadores em cards, pesquisa por nome com debounce, estado de carregamento e erro, FAB para criar utilizador, edição via ícone em cada card, modal com validações (e-mail, nome, CPF, telefone e tipo de telefone para o contexto brasileiro).

---

## Pré-requisitos

- **Node.js** 18 ou superior (LTS recomendado)
- **npm** 9 ou superior

Confirme no terminal:

```bash
node -v
npm -v
```

---

## Como colocar o sistema a funcionar (desenvolvimento local)

Toda a instalação e os comandos `npm` devem ser executados **dentro da pasta da aplicação Angular**:

```bash
cd crm-sdr-ia/desafio-attus
npm install
```

Depois, suba o servidor de desenvolvimento com **um** dos comandos abaixo.

### Comando normal

```bash
npm start
```

Equivale a `ng serve`. Quando o arranque concluir com sucesso, o terminal indica o endereço local (em geral `http://localhost:4200/`).

### Windows: quando usar `npm run start:local`

Se no seu perfil de utilizador existir **`%USERPROFILE%\.pnp.cjs`** (Yarn Berry / Plug’n’Play), o `npm start` pode falhar com erros a mencionar `Plug'n'Play` e `zone.js` / `@angular/material`. Nesse caso, use:

```bash
npm run start:local
```

Este script (`scripts/start-local.ps1`) afasta temporariamente o `.pnp.cjs` do perfil **apenas durante** o `ng serve`, tenta libertar a porta **4200** se estiver ocupada e **restaura** o ficheiro ao terminar com **Ctrl+C** no terminal.

Se fechar o terminal de forma abrupta e ficar um ficheiro **`.pnp.cjs.__desafio_attus_hold`** na sua pasta de utilizador (no mesmo sítio onde costuma estar `.pnp.cjs`), renomeie-o de volta para **`.pnp.cjs`**.

### Parar o servidor

**Ctrl+C** no terminal onde o `ng serve` está a correr.

---

## Como aceder à aplicação

1. Garanta que o servidor está em execução (`npm start` ou `npm run start:local`).
2. Abra o navegador em:

   **http://localhost:4200/**

3. Será redirecionado automaticamente para:

   **http://localhost:4200/usuarios**

Não existe fluxo de login: a listagem é a entrada principal da SPA.

### Ambiente remoto (SSH, Dev Container, etc.)

O processo `ng serve` escuta na máquina **onde o comando foi executado**. No seu computador cliente, encaminhe a porta **4200** (painel **Ports** no Cursor/VS Code ou equivalente) e use o URL local que o editor indicar para o túnel.

### Verificação rápida (HTTP 200)

Com o servidor ativo, noutro terminal (ex.: PowerShell):

```powershell
Invoke-WebRequest -Uri "http://localhost:4200/" -UseBasicParsing -TimeoutSec 15
```

Esperável: código de estado **200**.

---

## Scripts npm (`crm-sdr-ia/desafio-attus`)

| Comando | Função |
|---------|--------|
| `npm start` | Servidor de desenvolvimento |
| `npm run start:local` | Windows com mitigação do Yarn PnP no perfil |
| `npm run build` | Build de produção |
| `npm test` | Testes unitários (Karma, interactivo) |
| `npm run test:cov` | Testes com cobertura (headless) |
| `npm run lint` | ESLint |

O executável `ng` reside em `node_modules/.bin`. Se o comando `ng` não for reconhecido no PATH, use `npm start` ou `npx ng …` a partir de `desafio-attus`.

---

## Estrutura relevante no código

| Caminho | Conteúdo |
|---------|----------|
| `crm-sdr-ia/desafio-attus/src/app/features/users/` | Listagem, cartões, diálogo de formulário, rotas da feature |
| `crm-sdr-ia/desafio-attus/src/app/features/users/data-access/` | Modelo, mock e `UsuariosService` |
| `crm-sdr-ia/desafio-attus/src/app/core/http/` | Interceptor de erros HTTP (preparado para API real) |
| `crm-sdr-ia/desafio-attus/src/app/shared/validators/` | Validadores de CPF e telefone (Brasil) |
| `crm-sdr-ia/desafio-attus/scripts/start-local.ps1` | Arranque assistido no Windows (PnP no `USERPROFILE`) |
| `crm-sdr-ia/docs/` | Documentação de fases e convenções do CRM |

---

## Resolução de problemas

- **Build / `ng serve` e mensagens Yarn PnP (`.pnp.cjs`)**: consulte [crm-sdr-ia/desafio-attus/TROUBLESHOOTING.md](crm-sdr-ia/desafio-attus/TROUBLESHOOTING.md). Para validar TypeScript sem o bundler, dentro de `desafio-attus`: `npx tsc --noEmit -p tsconfig.app.json`.
- **Porta 4200 ocupada**: encerre o outro processo ou use `npm run start:local` no Windows (o script tenta libertar a porta antes de subir o servidor).

---

## Documentação complementar

- Fases e guias de desenvolvimento: **`crm-sdr-ia/docs/`**

