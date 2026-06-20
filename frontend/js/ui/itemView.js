export const itemView = {
    renderStats(total, count, alta) {
        document.getElementById('stat-total').textContent =
            Number(total).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
        document.getElementById('stat-count').textContent = count
        document.getElementById('stat-alta').textContent = alta
    },

    preencherCategorias(categorias) {
        ['item-category', 'filtro-categoria'].forEach(id => {
            const el = document.getElementById(id)
            if (!el) return
            const primeiro = id === 'filtro-categoria'
                ? '<option value="">Todas as categorias</option>'
                : '<option value="">Sem categoria</option>'
            el.innerHTML = primeiro + categorias.map(c =>
                `<option value="${c.id}">${c.icon || ''} ${c.name}</option>`
            ).join('')
        })
    },

    renderGrid(itens, categorias, onMarcar, onEditar, onExcluir, onHistorico) {
        const grid = document.getElementById('items-grid')
        const empty = document.getElementById('empty-state')
        document.getElementById('items-count').textContent =
            `${itens.length} ${itens.length === 1 ? 'item' : 'itens'}`

        if (!itens.length) { grid.innerHTML = ''; empty.classList.remove('d-none'); return }
        empty.classList.add('d-none')

        grid.innerHTML = itens.map(item => {
            const cat = categorias.find(c => c.id === item.category_id)
            const preco = Number(item.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
            const comprado = item.status === 'comprado'
            const prioClass = { alta: 'badge-alta', media: 'badge-media', baixa: 'badge-baixa' }[item.priority] || ''
            const prioLabel = { alta: 'Alta', media: 'Média', baixa: 'Baixa' }[item.priority] || ''
            return `
        <div class="item-card" id="card-${item.id}">
          <div class="item-card-top">
            <span class="cat-pill">${cat?.icon || '📦'} ${cat?.name || 'Sem categoria'}</span>
            <span class="badge-prio ${prioClass}">${prioLabel}</span>
          </div>
          <div class="item-nome ${comprado ? 'riscado' : ''}">${item.name}</div>
          <div class="item-preco-row">
            <span class="item-preco">${preco}</span>
          </div>
          <div class="item-footer">
            <span class="status-pill ${comprado ? 'status-comprado' : ''}">${comprado ? 'Comprado' : 'Desejado'}</span>
            <button class="btn-historico" data-id="${item.id}"><i class="bi bi-graph-up"></i> Histórico</button>
          </div>
          <div class="item-acoes">
            <button class="acao-btn" data-id="${item.id}" data-action="marcar" title="Marcar comprado"><i class="bi bi-check-circle"></i></button>
            <button class="acao-btn" data-id="${item.id}" data-action="editar" title="Editar"><i class="bi bi-pencil"></i></button>
            <button class="acao-btn danger" data-id="${item.id}" data-action="excluir" title="Excluir"><i class="bi bi-trash"></i></button>
          </div>
        </div>`
        }).join('')

        grid.querySelectorAll('[data-action="marcar"]').forEach(b => b.addEventListener('click', () => onMarcar(Number(b.dataset.id))))
        grid.querySelectorAll('[data-action="editar"]').forEach(b => b.addEventListener('click', () => onEditar(Number(b.dataset.id))))
        grid.querySelectorAll('[data-action="excluir"]').forEach(b => b.addEventListener('click', () => onExcluir(Number(b.dataset.id))))
        grid.querySelectorAll('.btn-historico').forEach(b => b.addEventListener('click', () => onHistorico(Number(b.dataset.id))))
    },
}