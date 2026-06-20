import { API_URL } from './config.js'

async function request(path, options = {}) {
    const resp = await fetch(`${API_URL}${path}`, {
        headers: { 'Content-Type': 'application/json' },
        ...options,
    })
    if (!resp.ok) {
        let msg = `Erro ${resp.status}`
        try { const b = await resp.json(); if (b.error) msg = b.error } catch (_) { }
        throw new Error(msg)
    }
    if (resp.status === 204) return null
    return resp.json()
}

export const api = {
    getUsers: () => request('/users'),
    criarUser: (d) => request('/users', { method: 'POST', body: JSON.stringify(d) }),
    atualizarUser: (id, d) => request(`/users/${id}`, { method: 'PUT', body: JSON.stringify(d) }),
    removerUser: (id) => request(`/users/${id}`, { method: 'DELETE' }),

    getWishLists: (user_id) => request(`/wishlists?user_id=${user_id}`),
    criarWishList: (d) => request('/wishlists', { method: 'POST', body: JSON.stringify(d) }),
    atualizarWishList: (id, d) => request(`/wishlists/${id}`, { method: 'PUT', body: JSON.stringify(d) }),
    removerWishList: (id) => request(`/wishlists/${id}`, { method: 'DELETE' }),

    getCategories: () => request('/categories'),

    getItems: (qs = '') => request(`/items${qs}`),
    getTotalEstimado: (wid) => request(`/items/total${wid ? `?wish_list_id=${wid}` : ''}`),
    criarItem: (d) => request('/items', { method: 'POST', body: JSON.stringify(d) }),
    atualizarItem: (id, d) => request(`/items/${id}`, { method: 'PUT', body: JSON.stringify(d) }),
    removerItem: (id) => request(`/items/${id}`, { method: 'DELETE' }),

    getPriceHistory: (item_id) => request(`/price-history/item/${item_id}`),
    registrarPreco: (d) => request('/price-history', { method: 'POST', body: JSON.stringify(d) }),
}