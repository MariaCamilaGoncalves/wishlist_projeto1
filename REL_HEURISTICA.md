# Relatório de Avaliação Heurística — Projeto 1
Autor: Maria Camila
Data: 12/07/2026
Score Lighthouse (Acessibilidade): 88 / 100

---

## Problema 1
- **Onde:** Tela principal — badges de prioridade e textos secundários
- **O que observei:** Algumas cores de texto sobre fundo claro não têm contraste suficiente (ex: badge "Média" em amarelo claro, textos em cinza sobre fundo branco)
- **Heurística violada:** #4 Consistência e padrões / Acessibilidade
- **Gravidade:** 3
- **Correção proposta:** Escurecer as cores de texto dos badges e textos secundários para atingir taxa de contraste mínima de 4.5:1 (WCAG AA)
- **Evidência:** verificação automática via Lighthouse — contraste insuficiente detectado

---

## Problema 2
- **Onde:** `index.html` — estrutura geral da página
- **O que observei:** A página não tem um elemento `<main>` como ponto de referência principal, dificultando a navegação por leitores de tela
- **Heurística violada:** #6 Reconhecer em vez de lembrar / Acessibilidade
- **Gravidade:** 3
- **Correção proposta:** Envolver o conteúdo principal da tela em uma tag `<main>` dentro do template
- **Evidência:** verificação automática via Lighthouse — "O documento não tem um ponto de referência principal"

---

## Problema 3
- **Onde:** Botões de criar item, criar lista, salvar perfil
- **O que observei:** Durante o `fetch`, a tela fica sem resposta visual — o botão não muda, não aparece spinner nem mensagem "Salvando..."
- **Heurística violada:** #1 Visibilidade do status do sistema
- **Gravidade:** 3
- **Correção proposta:** Desabilitar o botão e trocar o texto para "Salvando..." durante a requisição, reativando após a resposta
- **Evidência:** verificação manual — comportamento observado ao criar item e lista

---

## Problema 4
- **Onde:** Tela de login — campos de nome e e-mail
- **O que observei:** Os campos usam apenas `placeholder` para indicar o que preencher, sem `<label>` associado. Se o usuário começar a digitar, perde a referência do que é cada campo
- **Heurística violada:** #5 Prevenção de erros
- **Gravidade:** 2
- **Correção proposta:** Adicionar `<label>` visível acima de cada campo, como já é feito nos modais internos do sistema
- **Evidência:** verificação manual — inspecionado via DevTools (F12 → Elements)

---

## Problema 5
- **Onde:** Grid de itens — atualização via JavaScript
- **O que observei:** Quando o JS atualiza a lista de itens no DOM (ao criar, editar ou excluir), leitores de tela não são notificados da mudança pois não há `aria-live`
- **Heurística violada:** #1 Visibilidade do status do sistema (específico de SPA)
- **Gravidade:** 3
- **Correção proposta:** Adicionar `aria-live="polite"` no elemento `#items-grid` para que leitores de tela anunciem as mudanças automaticamente
- **Evidência:** verificação manual — inspecionado via DevTools (F12 → Elements → #items-grid sem atributo aria-live)

---

## Problema 6
- **Onde:** Ação de excluir item
- **O que observei:** Após excluir um item, o foco do teclado some ou volta para o topo da página, desorientando usuários que navegam por teclado
- **Heurística violada:** #3 Controle e liberdade / Acessibilidade SPA
- **Gravidade:** 3
- **Correção proposta:** Após excluir, reposicionar o foco com `.focus()` em um elemento coerente, como o botão "Adicionar item" ou o primeiro card da lista
- **Evidência:** verificação manual — testado com navegação por teclado (Tab)

---

## Problema 7
- **Onde:** Tela principal — ausência de atalhos
- **O que observei:** Não há atalhos de teclado para ações frequentes como adicionar item ou criar lista. Usuários avançados precisam sempre usar o mouse
- **Heurística violada:** #7 Flexibilidade e eficiência de uso
- **Gravidade:** 1
- **Correção proposta:** Adicionar atalho de teclado (ex: `N` para novo item, `L` para nova lista) para usuários frequentes
- **Evidência:** verificação manual — nenhum atalho de teclado disponível

---

## Resumo
- **Total de problemas encontrados:** 7
- **Problemas de gravidade 3–4 (prioritários):** 5
- **Score de acessibilidade Lighthouse:** 88 / 100
- **Os 3 que vou corrigir primeiro no E7:**
  1. Problema 2 — Adicionar `<main>` na estrutura da página
  2. Problema 3 — Feedback visual durante requisições (loading state)
  3. Problema 5 — Adicionar `aria-live="polite"` no grid de itens