import { userService } from './services/userService.js'
import { wishListService } from './services/wishListService.js'
import { itemService } from './services/itemService.js'
import { categoryService } from './services/categoryService.js'
import { priceHistoryService } from './services/priceHistoryService.js'
import { userView } from './ui/userView.js'
import { wishListView } from './ui/wishListView.js'
import { itemView } from './ui/itemView.js'
import { priceHistoryView } from './ui/priceHistoryView.js'

let usuarioAtivo = null
let listas = []
let listaAtiva = null
let itens = []
let categorias = []
let itemParaExcluir = null
let listaParaExcluir = null
let eventoController = null
let modalItemBS = null
let modalConfirmBS = null
let modalConfirmListaBS = null
let modalConfirmContaBS = null
let modalListaBS = null
let modalPerfilBS = null

function toast(msg, tipo = 'ok') {
    let container = document.getElementById('toast-container')
    if (!container) {
        container = document.createElement('div')
        container.id = 'toast-container'
        container.className = 'toast-container'
        document.body.appendChild(container)
    }
    const el = document.createElement('div')
    el.className = 'toast-custom'
    el.innerHTML = `<i class="bi bi-${tipo === 'ok' ? 'check-circle' : 'exclamation-circle'}"></i> ${msg}`
    container.appendChild(el)
    setTimeout(() => el.remove(), 3000)
}

function limparModais() {
    document.querySelectorAll('.modal-backdrop').forEach(el => el.remove())
    document.body.classList.remove('modal-open')
    document.body.style.removeProperty('overflow')
    document.body.style.removeProperty('padding-right')
}

async function iniciarLogin() {
    if (eventoController) eventoController.abort()
    limparModais()
    try {
        const users = await userService.listar()
        userView.mostrarTelaLogin(users, selecionarUser, criarEEntrar)
    } catch {
        userView.mostrarTelaLogin([], selecionarUser, criarEEntrar)
    }
}

async function criarEEntrar({ name, email }) {
    try {
        const user = await userService.criar({ name, email })
        if (!user || !user.id) { toast('Erro ao criar usuário', 'erro'); return }
        await selecionarUser(user)
    } catch (err) { toast(err.message, 'erro') }
}

async function selecionarUser(user) {
    usuarioAtivo = user
    const template = document.getElementById('tela-principal')
    const app = document.getElementById('app')
    app.innerHTML = ''
    app.appendChild(template.content.cloneNode(true))
    inicializarEventos()
    userView.mostrarUserNavbar(user)
    await carregarTudo()
}

function inicializarEventos() {
    if (eventoController) eventoController.abort()
    eventoController = new AbortController()
    const signal = eventoController.signal

    modalItemBS = new bootstrap.Modal(document.getElementById('modalItem'))
    modalConfirmBS = new bootstrap.Modal(document.getElementById('modalConfirm'))
    modalConfirmListaBS = new bootstrap.Modal(document.getElementById('modalConfirmLista'))
    modalConfirmContaBS = new bootstrap.Modal(document.getElementById('modalConfirmConta'))
    modalListaBS = new bootstrap.Modal(document.getElementById('modalLista'))
    modalPerfilBS = new bootstrap.Modal(document.getElementById('modalPerfil'))

    document.getElementById('btn-confirm-excluir').addEventListener('click', confirmarExclusao, { signal })
    document.getElementById('btn-confirm-excluir-lista').addEventListener('click', confirmarExclusaoLista, { signal })
    document.getElementById('btn-confirm-excluir-conta').addEventListener('click', confirmarExclusaoConta, { signal })
    document.querySelector('.btn-adicionar').addEventListener('click', salvarItem, { signal })
    document.getElementById('btn-nova-lista').addEventListener('click', () => abrirModalLista(), { signal })
    document.getElementById('btn-novo-item').addEventListener('click', abrirModalNovo, { signal })
    document.getElementById('btn-salvar-lista').addEventListener('click', salvarLista, { signal })
    document.getElementById('btn-salvar-perfil').addEventListener('click', salvarPerfil, { signal })
    document.getElementById('btn-excluir-perfil').addEventListener('click', excluirPerfil, { signal })
    document.getElementById('filtro-categoria').addEventListener('change', aplicarFiltros, { signal })
    document.getElementById('filtro-prioridade').addEventListener('change', aplicarFiltros, { signal })
    document.getElementById('filtro-busca').addEventListener('input', aplicarFiltros, { signal })

    document.getElementById('user-chip').addEventListener('click', (e) => {
        e.stopPropagation()
        document.getElementById('perfil-dropdown').classList.toggle('show')
    }, { signal })

    document.addEventListener('click', () => {
        document.getElementById('perfil-dropdown')?.classList.remove('show')
    }, { signal })

    document.getElementById('btn-abrir-perfil').addEventListener('click', () => {
        document.getElementById('perfil-dropdown').classList.remove('show')
        document.getElementById('perfil-name').value = usuarioAtivo.name
        document.getElementById('perfil-email').value = usuarioAtivo.email
        modalPerfilBS.show()
    }, { signal })
}

async function carregarTudo() {
    try {
        categorias = await categoryService.listar()
        itemView.preencherCategorias(categorias)
        await carregarListas()
    } catch (err) {
        toast('Erro ao carregar dados', 'erro')
    }
}

async function carregarListas() {
    try {
        listas = await wishListService.listar(usuarioAtivo.id)
        if (!listas.length) {
            document.getElementById('lista-titulo').textContent = 'Nenhuma lista ainda'
            document.getElementById('lista-subtitulo').textContent = 'Clique em "+ Nova lista" para começar'
            document.getElementById('items-grid').innerHTML = ''
            document.getElementById('empty-state').classList.remove('d-none')
            wishListView.renderAbas([], null, selecionarLista)
            itemView.renderStats(0, 0, 0)
            return
        }
        if (!listaAtiva || !listas.find(l => l.id === listaAtiva.id)) listaAtiva = listas[0]
        wishListView.renderAbas(listas, listaAtiva, selecionarLista)
        wishListView.renderTitulo(listaAtiva, editarLista, excluirLista)
        await carregarItens()
    } catch (err) {
        toast('Erro ao carregar listas', 'erro')
    }
}

async function selecionarLista(id) {
    listaAtiva = listas.find(l => l.id === id)
    wishListView.renderAbas(listas, listaAtiva, selecionarLista)
    wishListView.renderTitulo(listaAtiva, editarLista, excluirLista)
    await carregarItens()
}

function abrirModalLista(lista = null) {
    document.getElementById('modal-lista-title').textContent = lista ? 'Editar lista' : 'Nova lista'
    document.getElementById('lista-id').value = lista?.id || ''
    document.getElementById('lista-nome').value = lista?.name || ''
    modalListaBS.show()
}

function editarLista(lista) { abrirModalLista(lista) }

async function salvarLista() {
    const id = document.getElementById('lista-id').value
    const name = document.getElementById('lista-nome').value.trim()
    if (!name) { document.getElementById('lista-nome').focus(); return }
    try {
        if (id) {
            const atualizada = await wishListService.atualizar(id, { name })
            listaAtiva = atualizada
            toast('Lista atualizada!')
        } else {
            const nova = await wishListService.criar({ name, user_id: usuarioAtivo.id })
            listaAtiva = nova
            toast('Lista criada!')
        }
        modalListaBS.hide()
        await carregarListas()
    } catch (err) { toast(err.message, 'erro') }
}

function excluirLista(id) {
    listaParaExcluir = id
    modalConfirmListaBS.show()
}

async function confirmarExclusaoLista() {
    if (!listaParaExcluir) return
    try {
        modalConfirmListaBS.hide()
        await wishListService.remover(listaParaExcluir)
        listaParaExcluir = null
        listaAtiva = null
        toast('Lista excluída!')
        await carregarListas()
    } catch (err) { toast(err.message, 'erro') }
}

async function carregarItens() {
    if (!listaAtiva) return
    try {
        itens = await itemService.listar(listaAtiva.id)
        const { total } = await itemService.totalEstimado(listaAtiva.id)
        const alta = itens.filter(i => i.priority === 'alta').length
        itemView.renderStats(total, itens.length, alta)
        itemView.renderGrid(itens, categorias, marcarComprado, abrirEditar, confirmarExcluirItem, abrirHistorico)
        document.getElementById('items-count').textContent = `${itens.length} ${itens.length === 1 ? 'item' : 'itens'}`
    } catch (err) {
        toast('Erro ao carregar itens', 'erro')
    }
}

function aplicarFiltros() {
    const cat = document.getElementById('filtro-categoria').value
    const pri = document.getElementById('filtro-prioridade').value
    const busca = document.getElementById('filtro-busca').value.toLowerCase()
    const filtrados = itens.filter(i => {
        if (cat && i.category_id != cat) return false
        if (pri && i.priority !== pri) return false
        if (busca && !i.name.toLowerCase().includes(busca)) return false
        return true
    })
    itemView.renderGrid(filtrados, categorias, marcarComprado, abrirEditar, confirmarExcluirItem, abrirHistorico)
    document.getElementById('items-count').textContent = `${filtrados.length} ${filtrados.length === 1 ? 'item' : 'itens'}`
}

async function marcarComprado(id) {
    const item = itens.find(i => i.id === id)
    if (!item) return
    try {
        await itemService.atualizar(id, { status: item.status === 'comprado' ? 'desejado' : 'comprado' })
        await carregarItens()
    } catch (err) { toast(err.message, 'erro') }
}

function abrirModalNovo() {
    if (!listaAtiva) { toast('Crie uma lista primeiro!', 'erro'); return }
    document.getElementById('modal-title').textContent = 'Novo item'
    document.getElementById('modal-subtitle').textContent = 'Adicione um item à sua lista.'
    document.querySelector('.btn-adicionar').textContent = 'Adicionar'
    document.getElementById('item-id').value = ''
    document.getElementById('item-name').value = ''
    document.getElementById('item-price').value = ''
    document.getElementById('item-link').value = ''
    document.getElementById('item-priority').value = 'media'
    document.getElementById('item-status').value = 'desejado'
    if (categorias.length) document.getElementById('item-category').value = categorias[0].id
    modalItemBS.show()
}

function abrirEditar(id) {
    const item = itens.find(i => i.id === id)
    if (!item) return
    document.getElementById('modal-title').textContent = 'Editar item'
    document.getElementById('modal-subtitle').textContent = 'Atualize as informações.'
    document.querySelector('.btn-adicionar').textContent = 'Salvar'
    document.getElementById('item-id').value = item.id
    document.getElementById('item-name').value = item.name
    document.getElementById('item-price').value = item.price
    document.getElementById('item-link').value = item.link || ''
    document.getElementById('item-priority').value = item.priority
    document.getElementById('item-status').value = item.status
    document.getElementById('item-category').value = item.category_id || ''
    modalItemBS.show()
}

async function salvarItem() {
    const id = document.getElementById('item-id').value
    const name = document.getElementById('item-name').value.trim()
    if (!name) { document.getElementById('item-name').focus(); return }
    const link = document.getElementById('item-link').value.trim()
    if (link && !link.match(/^https?:\/\/.+/)) { toast('Link inválido!', 'erro'); return }
    const novoPreco = parseFloat(document.getElementById('item-price').value) || 0
    const body = {
        name, link: link || null,
        price: novoPreco,
        category_id: parseInt(document.getElementById('item-category').value) || null,
        wish_list_id: listaAtiva?.id || null,
        priority: document.getElementById('item-priority').value,
        status: document.getElementById('item-status').value,
    }
    try {
        if (id) {
            const itemAtual = itens.find(i => i.id === Number(id))
            await itemService.atualizar(id, body)
            if (itemAtual && novoPreco !== Number(itemAtual.price)) {
                await priceHistoryService.registrar({ item_id: Number(id), price: novoPreco })
            }
            toast('Item atualizado!')
        } else {
            const novo = await itemService.criar(body)
            if (novoPreco > 0) {
                await priceHistoryService.registrar({ item_id: novo.id, price: novoPreco })
            }
            toast('Item adicionado!')
        }
        modalItemBS.hide()
        await carregarItens()
        aplicarFiltros()
    } catch (err) { toast(err.message, 'erro') }
}

function confirmarExcluirItem(id) {
    itemParaExcluir = id
    modalConfirmBS.show()
}

async function confirmarExclusao() {
    if (!itemParaExcluir) return
    try {
        modalConfirmBS.hide()
        await itemService.remover(itemParaExcluir)
        itemParaExcluir = null
        toast('Item excluído!')
        await carregarItens()
        aplicarFiltros()
    } catch (err) { toast(err.message, 'erro') }
}

async function abrirHistorico(id) {
    const item = itens.find(i => i.id === id)
    if (!item) return
    try {
        const registros = await priceHistoryService.listarPorItem(id)
        priceHistoryView.abrirModal(item, registros)
    } catch (err) { toast(err.message, 'erro') }
}

async function salvarPerfil() {
    const name = document.getElementById('perfil-name').value.trim()
    const email = document.getElementById('perfil-email').value.trim()
    if (!name || !email) { toast('Preencha todos os campos', 'erro'); return }
    try {
        const atualizado = await userService.atualizar(usuarioAtivo.id, { name, email })
        usuarioAtivo = atualizado
        userView.mostrarUserNavbar(atualizado)
        modalPerfilBS.hide()
        toast('Perfil atualizado!')
    } catch (err) { toast(err.message, 'erro') }
}

function excluirPerfil() {
    modalPerfilBS.hide()
    setTimeout(() => modalConfirmContaBS.show(), 300)
}

async function confirmarExclusaoConta() {
    try {
        modalConfirmContaBS.hide()
        await new Promise(resolve => setTimeout(resolve, 300))
        await userService.remover(usuarioAtivo.id)
        limparModais()
        usuarioAtivo = null
        listaAtiva = null
        listas = []
        itens = []
        toast('Conta excluída!')
        await iniciarLogin()
    } catch (err) { toast(err.message, 'erro') }
}

document.addEventListener('DOMContentLoaded', iniciarLogin)