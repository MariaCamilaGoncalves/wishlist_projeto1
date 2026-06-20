export const priceHistoryView = {
    abrirModal(item, registros) {
        const precos = registros.map(r => Number(r.price))
        const atual = Number(item.price)
        const menor = precos.length ? Math.min(...precos) : atual
        const maior = precos.length ? Math.max(...precos) : atual
        const variacao = precos.length > 1 ? atual - precos[precos.length - 1] : 0
        const pct = precos.length > 1 ? ((variacao / precos[precos.length - 1]) * 100).toFixed(0) : 0
        const fmt = v => Number(v).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

        document.getElementById('hist-item-nome').textContent = item.name
        document.getElementById('hist-resumo').innerHTML = `
      <div class="hist-resumo-grid">
        <div><div class="hist-label">Atual</div><div class="hist-val">${fmt(atual)}</div></div>
        <div><div class="hist-label">Menor</div><div class="hist-val verde">${fmt(menor)}</div></div>
        <div><div class="hist-label">Maior</div><div class="hist-val">${fmt(maior)}</div></div>
        <div><div class="hist-label">Variação total</div>
          <div class="hist-val ${variacao <= 0 ? 'verde' : 'vermelho'}">
            ${variacao <= 0 ? '' : '+'}${fmt(variacao)} (${pct}%)
          </div>
        </div>
      </div>`

        document.getElementById('hist-lista').innerHTML = registros.length
            ? registros.map(r => `
          <div class="hist-row">
            <span class="hist-preco">${fmt(r.price)}</span>
            <span class="hist-data">${new Date(r.recorded_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
          </div>`).join('')
            : '<p class="text-muted text-center py-3">Nenhum registro ainda.</p>'

        new bootstrap.Modal(document.getElementById('modalHistorico')).show()
    },
}