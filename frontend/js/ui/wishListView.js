export const wishListView = {
    renderAbas(listas, listaAtiva, onSelecionar) {
        const container = document.getElementById('wishlists-abas')
        container.innerHTML = listas.map(l => `
      <button class="aba-lista ${l.id === listaAtiva?.id ? 'aba-ativa' : ''}" data-id="${l.id}">
        ${l.name}
      </button>`).join('')
        container.querySelectorAll('.aba-lista').forEach(btn =>
            btn.addEventListener('click', () => onSelecionar(Number(btn.dataset.id)))
        )
    },

    renderTitulo(lista, onEditar, onExcluir) {
        if (!lista) return
        document.getElementById('lista-titulo').textContent = lista.name
        document.getElementById('lista-subtitulo').textContent = `Lista #${lista.id}`
        document.getElementById('btn-editar-lista').onclick = () => onEditar(lista)
        document.getElementById('btn-excluir-lista').onclick = () => onExcluir(lista.id)
    },
}