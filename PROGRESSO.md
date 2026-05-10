# Acompanhamento — Desafio Attus (Angular)

Marque cada marco quando concluído. Não avance se o gate da linha anterior falhar.

| Ordem | Marco | Validação |
|------:|--------|-----------|
| 0 | Docs na raiz (`docs/`), `README.md` na raiz, `ARCHITECTURE.md` consistente | Links internos OK |
| 1 | `desafio-attus/` criado com Angular + Material + lint + testes | `cd desafio-attus` → `npm run build`, `npm test`, `npm run lint` |
| 2 | Fase 1 — utils + `filtrarEPaginar` + respostas PDF §1 em `DESAFIO_RESPOSTAS.md` | build + test + lint |
| 3 | Fase 2 — RxJS / debounce / exemplos | build + test + lint |
| 4 | Fase 3 — carrinho (Signals) + todos (NgRx) | build + test + lint |
| 5 | Fase 4 — feature `users` completa | cobertura ≥ 60%, build, lint |
| 6 | Entrega — README final, `DESAFIO_RESPOSTAS.md` completo | clone limpo + install + serve |

## Status (última atualização)

- [x] Etapa A–B: `npm run lint` sem erros (`ng lint --fix` aplicável para `array-type`).
- [x] Etapa C–D: `npm run test:cov` — 28 testes OK; cobertura global reportada pelo Karma **> 60%** (statements/lines).
- [ ] Etapa build na pasta Desktop: se aparecer erro **Yarn Plug’n’Play**, ver `desafio-attus/TROUBLESHOOTING.md` ou build a partir de cópia em caminho sem `.pnp.cjs` no diretório pai (ex.: `C:\temp`).
- [x] `DESAFIO_RESPOSTAS.md` — seções 3 e 4 expandidas com referências aos arquivos.
