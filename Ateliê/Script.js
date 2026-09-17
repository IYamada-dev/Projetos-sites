(function(){
  // Vetores SVG estilizados representando os croquis de alfaiataria
  var catalogData = [
    {
      id: "saia-linho",
      title: "Saia Godê em Linho Puro",
      price: "R$ 380,00",
      statusClass: "stock-tag",
      statusText: "Em estoque",
      meta: "Edição de outono / Peça nº 04 de 12",
      svg: `<svg viewBox="0 0 300 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#EADCBF"/>
        <!-- Cabide e estrutura -->
        <path d="M150 40 Q150 20 165 25 Q175 30 160 45 L150 60 L100 85 L200 85 Z" fill="none" stroke="#6B2737" stroke-width="2.5" stroke-linecap="round"/>
        <!-- Cós -->
        <rect x="110" y="85" width="80" height="14" rx="2" fill="#6B2737" opacity="0.85"/>
        <line x1="110" y1="92" x2="190" y2="92" stroke="#A9863E" stroke-width="1.5"/>
        <!-- Caimento da Saia -->
        <path d="M110 99 C90 180 50 280 45 330 C90 345 130 340 150 338 C170 340 210 345 255 330 C250 280 210 180 190 99 Z" fill="#F3EAD8" stroke="#3A2B22" stroke-width="2"/>
        <!-- Linhas de Dobra -->
        <path d="M130 99 C125 170 110 260 100 336" fill="none" stroke="#6B5642" stroke-width="1.2" stroke-dasharray="4,2"/>
        <path d="M150 99 C150 180 150 270 150 338" fill="none" stroke="#6B5642" stroke-width="1.5"/>
        <path d="M170 99 C175 170 190 260 200 336" fill="none" stroke="#6B5642" stroke-width="1.2" stroke-dasharray="4,2"/>
        <path d="M110 99 C100 170 80 260 70 332" fill="none" stroke="#A9863E" stroke-width="1"/>
        <path d="M190 99 C200 170 220 260 230 332" fill="none" stroke="#A9863E" stroke-width="1"/>
        <!-- Barra -->
        <path d="M45 330 Q100 350 150 338 Q200 350 255 330" fill="none" stroke="#6B2737" stroke-width="2"/>
      </svg>`
    },
    {
      id: "camisa-seda",
      title: "Camisa de Seda com Gola Laço",
      price: "R$ 490,00",
      statusClass: "stock-tag low",
      statusText: "Últimas unidades",
      meta: "Seda Rústica / Costura Francesa",
      svg: `<svg viewBox="0 0 300 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#EADCBF"/>
        <!-- Cabide -->
        <path d="M150 35 Q150 15 165 20 Q175 25 160 40 L150 50" fill="none" stroke="#6B2737" stroke-width="2.5"/>
        <!-- Silhueta da Camisa -->
        <path d="M100 80 L60 120 L80 140 L105 110 L105 310 L195 310 L195 110 L220 140 L240 120 L200 80 Z" fill="#F3EAD8" stroke="#3A2B22" stroke-width="2"/>
        <!-- Gola e Laço -->
        <path d="M125 80 L150 110 L175 80" fill="none" stroke="#6B2737" stroke-width="2"/>
        <path d="M150 110 C130 125 110 130 120 150 C130 165 150 130 150 110 C150 130 170 165 180 150 C190 130 170 125 150 110 Z" fill="#6B2737" opacity="0.9"/>
        <!-- Fitas do Laço -->
        <path d="M145 125 C140 170 135 210 130 240" fill="none" stroke="#6B2737" stroke-width="3"/>
        <path d="M155 125 C160 170 165 210 170 240" fill="none" stroke="#6B2737" stroke-width="3"/>
        <!-- Botões -->
        <line x1="150" y1="110" x2="150" y2="310" stroke="#A9863E" stroke-width="1.5" stroke-dasharray="2,2"/>
        <circle cx="150" cy="140" r="3" fill="#6B2737"/>
        <circle cx="150" cy="180" r="3" fill="#6B2737"/>
        <circle cx="150" cy="220" r="3" fill="#6B2737"/>
        <circle cx="150" cy="260" r="3" fill="#6B2737"/>
        <!-- Mangas -->
        <path d="M60 120 L80 140" stroke="#3A2B22" stroke-width="1.5"/>
        <path d="M240 120 L220 140" stroke="#3A2B22" stroke-width="1.5"/>
      </svg>`
    },
    {
      id: "colete-la",
      title: "Colete de Lã com Abotoamento Duplo",
      price: "R$ 520,00",
      statusClass: "stock-tag",
      statusText: "Em estoque",
      meta: "Lã Fina / Forro em Algodão Trama Fechada",
      svg: `<svg viewBox="0 0 300 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#EADCBF"/>
        <!-- Corpo do Colete -->
        <path d="M110 70 L75 110 L85 270 L150 310 L215 270 L225 110 L190 70 L150 110 Z" fill="#F3EAD8" stroke="#3A2B22" stroke-width="2"/>
        <!-- Decote V -->
        <path d="M110 70 L150 140 L190 70" fill="none" stroke="#6B2737" stroke-width="2"/>
        <!-- Abotoamento Duplo -->
        <line x1="130" y1="120" x2="130" y2="290" stroke="#A9863E" stroke-width="1.2" stroke-dasharray="3,3"/>
        <line x1="170" y1="120" x2="170" y2="290" stroke="#A9863E" stroke-width="1.2" stroke-dasharray="3,3"/>
        <circle cx="130" cy="150" r="4" fill="#6B2737"/>
        <circle cx="130" cy="190" r="4" fill="#6B2737"/>
        <circle cx="130" cy="230" r="4" fill="#6B2737"/>
        <circle cx="170" cy="150" r="4" fill="#6B2737"/>
        <circle cx="170" cy="190" r="4" fill="#6B2737"/>
        <circle cx="170" cy="230" r="4" fill="#6B2737"/>
        <!-- Bolsos -->
        <rect x="95" y="220" width="25" height="4" fill="#A9863E"/>
        <rect x="180" y="220" width="25" height="4" fill="#A9863E"/>
      </svg>`
    },
    {
      id: "vestido-envelope",
      title: "Vestido Envelope Transpassado",
      price: "R$ 640,00",
      statusClass: "stock-tag out",
      statusText: "Esgotado",
      meta: "Lote Encerrado / Sob Encomenda",
      svg: `<svg viewBox="0 0 300 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#EADCBF"/>
        <!-- Vestido -->
        <path d="M120 60 L80 100 L95 150 L115 150 L65 350 C120 365 180 365 235 350 L185 150 L205 150 L220 100 L180 60 Z" fill="#F3EAD8" stroke="#3A2B22" stroke-width="2"/>
        <!-- Transpasse V -->
        <path d="M120 60 L175 150" stroke="#6B2737" stroke-width="2.5"/>
        <path d="M180 60 L115 140" stroke="#6B2737" stroke-width="2.5"/>
        <!-- Faixa da Cintura -->
        <rect x="110" y="145" width="80" height="12" fill="#6B2737" rx="2"/>
        <path d="M175 150 C185 170 190 200 195 240" stroke="#6B2737" stroke-width="3" fill="none"/>
        <path d="M170 150 C175 180 178 210 180 250" stroke="#6B2737" stroke-width="3" fill="none"/>
        <!-- Linha da Saia -->
        <path d="M120 157 C140 230 180 300 220 353" fill="none" stroke="#3A2B22" stroke-width="1.8"/>
        <path d="M115 157 C125 220 145 290 170 358" fill="none" stroke="#A9863E" stroke-width="1.2" stroke-dasharray="3,2"/>
      </svg>`
    }
  ];

  var currentIndex = 0;
  var track = document.getElementById("track");
  var dotsContainer = document.getElementById("dots");
  var catalogList = document.getElementById("catalogList");
  var inkOverlay = document.getElementById("inkOverlay");

  function renderCatalog() {
    track.innerHTML = "";
    dotsContainer.innerHTML = "";
    catalogList.innerHTML = "";

    catalogData.forEach(function(item, idx) {
      // Slide Card com SVG
      var card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <div class="sketch-wrap">
          <svg class="corner" viewBox="0 0 24 24"><path d="M2 22 V2 H22"/></svg>
          <div class="svg-container" style="width:100%; height:100%;">
            ${item.svg}
          </div>
        </div>
        <div class="product-info">
          <h3 class="product-name">${item.title}</h3>
          <p class="product-price">${item.price}</p>
          <span class="${item.statusClass}">${item.statusText}</span>
          <p style="margin-top:1rem; color:var(--ink-soft); font-size:0.95rem;">${item.meta}</p>
        </div>
      `;
      track.appendChild(card);

      // Pontos indicadores (Dots)
      var dot = document.createElement("button");
      dot.className = "dot";
      dot.setAttribute("aria-label", "Ir para peça " + (idx + 1));
      if(idx === 0) dot.setAttribute("aria-current", "true");
      dot.addEventListener("click", function() { goToSlide(idx); });
      dotsContainer.appendChild(dot);

      // Lista do catálogo
      var row = document.createElement("div");
      row.className = "row";
      row.innerHTML = `
        <span>${item.title} <span class="meta">— ${item.meta}</span></span>
        <span class="price">${item.price}</span>
      `;
      catalogList.appendChild(row);
    });
  }

  function updateCarousel() {
    track.style.transform = "translateX(-" + (currentIndex * 100) + "%)";
    var dots = dotsContainer.querySelectorAll(".dot");
    dots.forEach(function(d, i) {
      if(i === currentIndex) {
        d.setAttribute("aria-current", "true");
      } else {
        d.removeAttribute("aria-current");
      }
    });
  }

  function goToSlide(index) {
    currentIndex = index;
    if(currentIndex < 0) currentIndex = catalogData.length - 1;
    if(currentIndex >= catalogData.length) currentIndex = 0;
    updateCarousel();
  }

  document.getElementById("prevBtn").addEventListener("click", function() {
    goToSlide(currentIndex - 1);
  });

  document.getElementById("nextBtn").addEventListener("click", function() {
    goToSlide(currentIndex + 1);
  });

  // Navegação e Transição com Tinta
  function switchPage(pageId, clickEvent) {
    var targetPage = document.getElementById("page-" + pageId);
    if(!targetPage) return;

    var ox = "50%", oy = "50%";
    if(clickEvent) {
      ox = clickEvent.clientX + "px";
      oy = clickEvent.clientY + "px";
    }

    inkOverlay.style.setProperty("--ox", ox);
    inkOverlay.style.setProperty("--oy", oy);

    inkOverlay.classList.add("animate", "cover");

    setTimeout(function() {
      document.querySelectorAll(".page").forEach(function(p) { p.classList.remove("active"); });
      targetPage.classList.add("active");

      document.querySelectorAll("nav button").forEach(function(btn) {
        if(btn.getAttribute("data-page") === pageId) {
          btn.setAttribute("aria-current", "page");
        } else {
          btn.removeAttribute("aria-current");
        }
      });

      window.scrollTo(0, 0);

      setTimeout(function() {
        inkOverlay.classList.remove("cover");
        setTimeout(function() {
          inkOverlay.classList.remove("animate");
        }, 550);
      }, 100);
    }, 400);
  }

  document.querySelectorAll("[data-page]").forEach(function(btn) {
    btn.addEventListener("click", function(e) {
      var p = btn.getAttribute("data-page");
      switchPage(p, e);
    });
  });

  document.getElementById("brandLink").addEventListener("click", function(e) {
    e.preventDefault();
    switchPage("home", e);
  });

  // Suporte a gesto Swipe no Carrossel
  var stage = document.querySelector(".stage");
  var startX = 0;

  stage.addEventListener("touchstart", function(e) {
    startX = e.touches[0].clientX;
  }, {passive: true});

  stage.addEventListener("touchend", function(e) {
    var endX = e.changedTouches[0].clientX;
    var diff = startX - endX;
    if(Math.abs(diff) > 40) {
      if(diff > 0) goToSlide(currentIndex + 1);
      else goToSlide(currentIndex - 1);
    }
  }, {passive: true});

  renderCatalog();
})();
        
