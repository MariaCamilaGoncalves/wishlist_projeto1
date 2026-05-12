# ⭐ WishList — Lista de Desejos Pessoal
O **WishList** é um sistema web para gerenciar listas de desejos. O usuário cadastra itens que deseja comprar, organiza por categoria, define prioridade e acompanha o status de cada item.

## Funcionalidades previstas
- Cadastrar, listar, editar e excluir itens da lista (CRUD completo)
- Organizar itens por categoria
- Definir prioridade: Alta, Média ou Baixa
- Filtrar itens por categoria ou prioridade
- Exibir total estimado dos itens desejados

## Classes do Domínio
### 1. `User`
Representa o usuário do sistema.
- id, name, email, createdAt, updatedAt
---

### 2. `WishList`
Representa uma lista de desejos pertencente a um usuário.
- id, userId, name, totalEstimado, createdAt
---

### 3. `Item`
Representa um item desejado dentro de uma lista.
- id, wishListId, categoryId, name, price, priority, status, link do produto (opcional) 
---

### 4. `Category`
Representa uma categoria para organizar os itens.
- id, name, icon, createdAt
---

### 5. `PriceHistory`
Registra o histórico de preços de um item ao longo do tempo.
- id, itemId, price, recordedAt
---

## Relações entre as Classes
- User → WishList | **Associação** (1:N) | Um usuário pode ter várias listas 
- WishList → Item | **Agregação** (1:N) | Uma lista contém vários itens 
- Item → Category | **Associação** (N:1) | Vários itens pertencem a uma categoria 
- Item → PriceHistory | **Composição** (1:N) | Um item pode ter vários registros de preço 

## Tecnologias 
- Node.js/Express
- HTML/CSS/Bootstrap 