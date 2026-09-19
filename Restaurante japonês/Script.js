  const products = [
    { id:'yakisoba', name:'Yakisoba', emoji:'🍜', price:28, desc:'Macarrão salteado com legumes e molho shoyu' },
    { id:'sushi', name:'Sushi', emoji:'🍣', price:34, desc:'Combinado de nigiri e sashimi do dia' },
    { id:'harumaki', name:'Rolinho Primavera', emoji:'🥟', price:19, desc:'Crocante, recheado com legumes frescos' },
    { id:'onigiri', name:'Onigiri', emoji:'🍙', price:15, desc:'Bolinho de arroz envolto em alga nori' },
  ];

  const STORAGE_KEY = 'iyamada-dev-cart';
  let cart = loadCart(); // id -> qty
  let currentView = 'menu';
  let currentMethod = 'card';
  let isPaying = false;

  const fmt = v => 'R$ ' + v.toFixed(2).replace('.', ',');

  function loadCart(){
    try{
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    }catch(e){ return {}; }
  }
  function saveCart(){
    try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); }catch(e){}
  }

  /* ---------- toast ---------- */
  function showToast(msg){
    const wrap = document.getElementById('toast-wrap');
    const t = document.createElement('div');
    t.className = 'toast';
    t.textContent = msg;
    wrap.appendChild(t);
    setTimeout(()=> t.remove(), 2500);
  }

  /* ---------- render menu ---------- */
  function renderMenu(){
    const grid = document.getElementById('menu-grid');
    grid.innerHTML = products.map(p => `
      <div class="dish">
        <div class="plate"><span>${p.emoji}</span></div>
        <h3>${p.name}</h3>
        <p class="desc">${p.desc}</p>
        <div class="price">${fmt(p.price)}</div>
        <button class="add-btn" onclick="addToCart('${p.id}')" aria-label="Adicionar ${p.name} ao carrinho">+</button>
      </div>
    `).join('');
  }

  /* ---------- cart logic ---------- */
  function addToCart(id){
    cart[id] = (cart[id] || 0) + 1;
    saveCart();
    updateBadge();
    renderCart();
    const p = products.find(x=>x.id===id);
    showToast(`${p.name} adicionado`);
  }
  function changeQty(id, delta){
    if(!cart[id]) return;
    cart[id] += delta;
    if(cart[id] <= 0) delete cart[id];
    saveCart();
    updateBadge();
    renderCart();
  }
  function removeItem(id){
    delete cart[id];
    saveCart();
    updateBadge();
    renderCart();
  }
  function cartCount(){
    return Object.values(cart).reduce((a,b)=>a+b,0);
  }
  function cartTotal(){
    return Object.entries(cart).reduce((sum,[id,qty])=>{
      const p = products.find(x=>x.id===id);
      return sum + p.price * qty;
    },0);
  }
  function updateBadge(){
    const badge = document.getElementById('cart-badge');
    const n = cartCount();
    badge.textContent = n;
    badge.style.display = n > 0 ? 'flex' : 'none';
  }

  function renderCart(){
    const body = document.getElementById('cart-body');
    const ids = Object.keys(cart);

    if(ids.length === 0){
      body.innerHTML = `
        <div class="empty-state">
          <div class="plate"><span>🍱</span></div>
          <p>Seu carrinho está vazio</p>
        </div>`;
      return;
    }

    const items = ids.map(id=>{
      const p = products.find(x=>x.id===id);
      const qty = cart[id];
      return `
        <div class="cart-item">
          <div class="cart-emoji">${p.emoji}</div>
          <div class="cart-info">
            <h4>${p.name}</h4>
            <div class="price">${fmt(p.price * qty)}</div>
          </div>
          <div class="cart-actions">
            <div class="stepper">
              <button onclick="changeQty('${id}', -1)" aria-label="Diminuir ${p.name}">–</button>
              <span>${qty}</span>
              <button onclick="changeQty('${id}', 1)" aria-label="Aumentar ${p.name}">+</button>
            </div>
            <button class="remove-btn" onclick="removeItem('${id}')">remover</button>
          </div>
        </div>`;
    }).join('');

    body.innerHTML = `
      <div class="cart-list">${items}</div>
      <div class="total-row">
        <span class="label">Total</span>
        <span class="amount">${fmt(cartTotal())}</span>
      </div>
      <button class="cta" onclick="showView('pay')">Ir para pagamento</button>
    `;
  }

  /* ---------- payment logic ---------- */
  function selectPayment(method){
    currentMethod = method;
    document.querySelectorAll('.pay-methods button').forEach(b=>{
      b.classList.toggle('active', b.dataset.method === method);
    });
    renderPayPanel();
  }

  function renderPayPanel(){
    const panel = document.getElementById('pay-panel');
    if(currentMethod === 'card'){
      panel.innerHTML = `
        <div class="row"><input placeholder="Número do cartão" inputmode="numeric" maxlength="19"></div>
        <div class="row"><input placeholder="Nome impresso no cartão"></div>
        <div class="row row-2">
          <input placeholder="Validade" maxlength="5">
          <input placeholder="CVV" inputmode="numeric" maxlength="4">
        </div>`;
    } else if(currentMethod === 'pix'){
      panel.innerHTML = `
        <div class="qr"></div>
        <p class="pix-hint">Escaneie para pagar ${fmt(cartTotal())}</p>`;
    } else {
      panel.innerHTML = `
        <div class="cash-face">
          <div class="ic">💴</div>
          <input placeholder="Troco para quanto?" style="max-width:220px; text-align:center;">
        </div>`;
    }
  }

  function confirmPayment(){
    const btn = document.getElementById('confirm-btn');
    if(cartCount() === 0){
      btn.classList.remove('shake');
      void btn.offsetWidth;
      btn.classList.add('shake');
      showToast('Adicione itens ao carrinho antes de pagar');
      return;
    }
    if(isPaying) return;
    isPaying = true;

    const label = document.getElementById('confirm-label');
    btn.disabled = true;
    label.innerHTML = '<span class="spinner"></span> Processando…';

    setTimeout(()=>{
      const overlay = document.getElementById('stamp-overlay');
      overlay.classList.add('show');

      setTimeout(()=>{
        overlay.classList.remove('show');
        cart = {};
        saveCart();
        updateBadge();
        renderCart();
        renderPayPanel();
        showView('menu');
        label.textContent = 'Confirmar pagamento';
        btn.disabled = false;
        isPaying = false;
      }, 1500);
    }, 700);
  }

  /* ---------- view switching w/ shoji transition ---------- */
  function showView(name){
    if(name === currentView) return;
    const shoji = document.getElementById('shoji');
    shoji.classList.add('cover');

    setTimeout(()=>{
      document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
      document.getElementById('view-' + name).classList.add('active');

      document.querySelectorAll('nav.tabs button').forEach(b=>b.classList.remove('active'));
      document.getElementById('tab-' + name).classList.add('active');

      currentView = name;
      if(name === 'cart') renderCart();
      if(name === 'pay') renderPayPanel();

      shoji.classList.remove('cover');
    }, 420);
  }

  /* ---------- init ---------- */
  renderMenu();
  renderCart();
  renderPayPanel();
  updateBadge();

  window.addEventListener('load', ()=>{
    setTimeout(()=> document.getElementById('splash').classList.add('hide'), 500);
  });
    
