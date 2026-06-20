export const userView = {
  mostrarTelaLogin(users, onSelecionar, onCriar) {
    document.getElementById('app').innerHTML = `
      <div class="login-overlay">
        <div class="login-card">
          <div class="login-logo"><i class="bi bi-star-fill"></i></div>
          <h2 class="login-title">WishList</h2>
          <p class="login-sub">Suas listas de desejos, organizadas</p>
          ${users.length ? `
            <div class="login-section-title">Selecionar usuário</div>
            <div class="user-list">
              ${users.map(u => `
                <button class="user-item" data-id="${u.id}" data-name="${u.name}" data-email="${u.email}">
                  <div class="user-avatar">${u.name.slice(0, 2).toUpperCase()}</div>
                  <div><div class="user-item-name">${u.name}</div><div class="user-item-email">${u.email}</div></div>
                </button>`).join('')}
            </div>
            <div class="login-divider">ou</div>` : ''}
          <div class="login-section-title">Criar novo usuário</div>
          <input type="text"  id="login-name"  class="form-control mb-2" placeholder="Seu nome" />
          <input type="email" id="login-email" class="form-control mb-3" placeholder="Seu e-mail" />
          <button class="btn-primary-full" id="btn-criar-user">Criar e entrar</button>
        </div>
      </div>`

    document.querySelectorAll('.user-item').forEach(btn =>
      btn.addEventListener('click', () => onSelecionar({
        id: Number(btn.dataset.id), name: btn.dataset.name, email: btn.dataset.email,
      }))
    )

    document.getElementById('btn-criar-user').addEventListener('click', () =>
      onCriar({
        name: document.getElementById('login-name').value,
        email: document.getElementById('login-email').value,
      })
    )
  },

  mostrarUserNavbar(user) {
    const initials = user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    document.getElementById('user-avatar').textContent = initials
    document.getElementById('user-name-nav').textContent = user.name
    document.getElementById('user-email-nav').textContent = user.email
  },
}