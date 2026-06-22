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
- User → WishList     | **Associação** (1:N) | Um usuário pode ter várias listas 
- WishList → Item     | **Agregação** (1:N)  | Uma lista contém vários itens 
- Item → Category     | **Associação** (N:1) | Vários itens pertencem a uma categoria 
- Item → PriceHistory | **Composição** (1:N) | Um item pode ter vários registros de preço 

## Tecnologias
| Camada        | Tecnologia                            | 
|---------------|---------------------------------------| 
| Backend       | Node.js + Express                     |
| Banco de dados| SQLite                                |
| Frontend      | HTML + CSS + Bootstrap 5 + Vanilla JS |


## Pré-requisitos
- [Node.js 22+](https://nodejs.org/)
- npm (já vem com o Node.js)
- http-server (para o frontend)

```bash
node --version   # precisa ser 22+
npm install -g http-server    # somente caso não tenha
```

## Como instalar e rodar
**1. Clone o repositório:**
```bash
git clone https://github.com/MariaCamilaGoncalves/wishlist_projeto1.git
cd wishlist_projeto1
```

**2. Instale as dependências do backend:**
```bash
cd backend
npm install
```

**3. Suba o backend** (Terminal 1):
```bash
cd backend
npm run dev
```
A API sobe em `http://localhost:3000`. O banco `banco.db` é criado automaticamente.

**4. Suba o frontend** (Terminal 2):
```bash
cd frontend
http-server -p 5500 -c-1
```
Acesse em `http://localhost:5500`.

## Rotas da API
### `/users`
| Método | Rota         | Descrição       |
|--------|--------------|-----------------|
| GET    | `/users`     | Listar usuários |
| GET    | `/users/:id` | Buscar por ID   |
| POST   | `/users`     | Criar usuário   |
| PUT    | `/users/:id` | Editar usuário  |
| DELETE | `/users/:id` | Remover usuário |

### `/wishlists`
| Método | Rota             | Descrição     |
|--------|------------------|---------------|
| GET    | `/wishlists`     | Listar listas |
| GET    | `/wishlists/:id` | Buscar por ID |
| POST   | `/wishlists`     | Criar lista   |
| PUT    | `/wishlists/:id` | Editar lista  |
| DELETE | `/wishlists/:id` | Remover lista |

### `/items`
| Método | Rota           | Descrição      |
|--------|----------------|----------------|
| GET    | `/items`       | Listar itens   |
| GET    | `/items/:id`   | Buscar por ID  |
| GET    | `/items/total` | Total estimado |
| POST   | `/items`       | Criar item     |
| PUT    | `/items/:id`   | Editar item    |
| DELETE | `/items/:id`   | Remover item   |

### `/categories`
| Método | Rota              | Descrição         |
|--------|-------------------|-------------------|
| GET    | `/categories`     | Listar categorias |
| GET    | `/categories/:id` | Buscar por ID     |
| POST   | `/categories`     | Criar categoria   |
| PUT    | `/categories/:id` | Editar categoria  |
| DELETE | `/categories/:id` | Remover categoria |

### `/price-history`
| Método | Rota                           | Descrição            |
|--------|--------------------------------|----------------------|
| GET    | `/price-history/item/:item_id` | Histórico de um item |
| GET    | `/price-history/:id`           | Buscar por ID        |
| POST   | `/price-history`               | Registrar preço      |
| DELETE | `/price-history/:id`           | Remover registro     |

## Estrutura de Pastas
```
wishlist_projeto1/
├── backend/
│   ├── src/
│   │   ├── database/
│   │   │   └── db.js                    
│   │   ├── models/
│   │   │   ├── category.js
│   │   │   ├── item.js
│   │   │   ├── priceHistory.js
│   │   │   ├── user.js
│   │   │   └── wishList.js
│   │   ├── services/
│   │   │   ├── categoryService.js
│   │   │   ├── itemService.js
│   │   │   ├── priceHistoryService.js
│   │   │   ├── userService.js
│   │   │   └── wishListService.js
│   │   ├── controllers/
│   │   │   ├── categoryController.js
│   │   │   ├── itemController.js
│   │   │   ├── priceHistoryController.js
│   │   │   ├── userController.js
│   │   │   └── wishListController.js
│   │   ├── routes/
│   │   │   ├── categories.js
│   │   │   ├── items.js
│   │   │   ├── priceHistory.js
│   │   │   ├── users.js
│   │   │   └── wishLists.js
│   │   ├── middleware/
│   │   │   ├── errorHandler.js
│   │   │   └── logger.js
│   │   ├── app.js
│   │   └── server.js
│   ├── banco.db                            # Banco SQLite (gerado automaticamente)
│   └── package.json
├── frontend/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── services/
│   │   │   ├── categoryService.js
│   │   │   ├── itemService.js
│   │   │   ├── priceHistoryService.js
│   │   │   ├── userService.js
│   │   │   └── wishListService.js
│   │   ├── ui/
│   │   │   ├── itemView.js
│   │   │   ├── priceHistoryView.js
│   │   │   ├── userView.js
│   │   │   └── wishListView.js
│   │   ├── api.js
│   │   ├── config.js
│   │   └── main.js
│   └── index.html
├── Modelagem/
│   └── modelagem.pdf
├── .gitignore
└── README.md
```

## Autor
Maria Camila
Desenvolvido como Projeto 1 da disciplina de Desenvolvimento Web — UEPB 2026.1