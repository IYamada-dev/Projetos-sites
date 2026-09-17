(function () {
  var itemsData = [
    {
      name: "Saia Godê Mídi em Linho",
      price: "R$ 380,00",
      stockText: "Apenas 2 peças",
      stockClass: "low",
      meta: "Edição Limitada",
      svg: `<svg class="sketch-svg" viewBox="0 0 100 120" stroke="var(--wine-deep)" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M 35 20 L 65 20 L 80 95 C 60 102, 40 102, 20 95 Z" />
              <path d="M 35 20 C 45 23, 55 23, 65 20" />
              <path d="M 50 22 L 50 98" stroke-dasharray="2 3" opacity="0.6" />
              <path d="M 38 50 C 45 55, 55 55, 62 50" opacity="0.5" />
            </svg>`
    },
    {
      name: "Colete de Alfaiataria Dupla",
      price: "R$ 420,00",
      stockText: "Disponível",
      stockClass: "",
      meta: "Lã Fria e Seda",
      svg: `<svg class="sketch-svg" viewBox="0 0 100 120" stroke="var(--wine-deep)" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M 30 20 L 42 35 L 50 20 L 58 35 L 70 20 L 78 50 L 72 90 L 50 100 L 28 90 L 22 50 Z" />
              <path d="M 50 35 L 50 98" />
              <circle cx="43" cy="55" r="1.5" fill="var(--wine-deep)" />
              <circle cx="43" cy="70" r="1.5" fill="var(--wine-deep)" />
              <circle cx="57" cy="55" r="1.5" fill="var(--wine-deep)" />
              <circle cx="57" cy="70" r="1.5" fill="var(--wine-deep)" />
            </svg>`
    },
    {
      name: "Camisa de Seda com Gola Laço",
      price: "R$ 490,00",
      stockText: "Esgotado",
      stockClass: "out",
      meta: "Sob Encomenda",
      svg: `<svg class="sketch-svg" viewBox="0 0 100 120" stroke="var(--wine-deep)" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M 35 20 L 50 30 L 65 20 L 80 35 L 75 90 L 25 90 L 20 35 Z" />
              <path d="M 50 30 L 50 90" />
              <path d="M 50 28 C 40 18, 30 32, 48 30 C 50 30, 60 18, 70 32 C 52 30, 50 28, 50 28 Z" fill="var(--paper-alt)" />
              <path d="M 46 30 L 40 55" />
              <path d="M 54 30 L 60 55" />
            </svg>`
    }
  ];

  var currentIndex = 0;
  var track = document.getElementById('track');
  var dotsContainer = document.getElementById('dots');
  var catalogList = document.getElementById('catalogList');
  var prevBtn = document.getElementById('prevBtn');
  var nextBtn = document.getElementById('nextBtn');
  var inkOverlay = document.getElementById('inkOverlay');

  function init() {
    track.innerHTML = '';
    dotsContainer.innerHTML = '';
    catalogList.innerHTML = '';

    itemsData.forEach(function (item, index) {
      var card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <div class="sketch-wrap">
          <svg class="corner" viewBox="0 0 24 24"><path d="M 2 22 L 2 2 L 22 2"/></svg>
          ${item.svg}
        </div>
        <div>
          <h3 class="product-name">${item.name}</h3>
          <p class="product-price">${item.price}</p>
          <span class="stock-tag ${item.stockClass}">${item.stockText}</span>
        </div>
      `;
      track.appendChild(card);

      var dot = document.createElement('button');
      dot.className = 'dot';
      dot.setAttribute('aria-label', 'Ir para o item ' + (index + 1));
      if (index === 0) dot.setAttribute('aria-current', 'true');
      dot.addEventListener('click', function () {
        goToSlide(index);
      });
      dotsContainer.appendChild(dot);

      var row = document.createElement('div');
      row.className = 'row';
      row.innerHTML = `
        <span>${item.name} <span class="meta">— ${item.meta}</span></span>
        <span class="price">${item.price}</span>
      `;
      catalogList.appendChild(row);
    });

    updateCarousel();
  }

  function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
  }

  function updateCarousel() {
    track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
    
    var dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach(function (dot, i) {
      if (i === currentIndex) {
        dot.setAttribute('aria-current', 'true');
      } else {
        dot.removeAttribute('aria-current');
      }
    });

    var svgs = track.querySelectorAll('.sketch-svg');
    svgs.forEach(function (svg, i) {
      if (i === currentIndex) {
        setTimeout(function () { svg.classList.add('reveal'); }, 100);
      } else {
        svg.classList.remove('reveal');
      }
    });
  }

  prevBtn.addEventListener('click', function () {
    currentIndex = (currentIndex - 1 + itemsData.length) % itemsData.length;
    updateCarousel();
  });

  nextBtn.addEventListener('click', function () {
    currentIndex = (currentIndex + 1) % itemsData.length;
    updateCarousel();
  });

  var navButtons = document.querySelectorAll('nav button, .cta');
  var pages = document.querySelectorAll('.page');

  navButtons.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      var targetPage = btn.getAttribute('data-page');
      if (!targetPage) return;

      var rect = btn.getBoundingClientRect();
      var ox = rect.left + rect.width / 2;
      var oy = rect.top + rect.height / 2;

      inkOverlay.style.setProperty('--ox', ox + 'px');
      inkOverlay.style.setProperty('--oy', oy + 'px');

      inkOverlay.classList.add('animate', 'cover');

      setTimeout(function () {
        pages.forEach(function (p) { p.classList.remove('active'); });
        var activePage = document.getElementById('page-' + targetPage);
        if (activePage) activePage.classList.add('active');

        document.querySelectorAll('nav button').forEach(function (nb) {
          if (nb.getAttribute('data-page') === targetPage) {
            nb.setAttribute('aria-current', 'page');
          } else {
            nb.removeAttribute('aria-current');
          }
        });

        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 300);

      setTimeout(function () {
        inkOverlay.classList.remove('cover');
        setTimeout(function () {
          inkOverlay.classList.remove('animate');
        }, 550);
      }, 350);
    });
  });

  document.getElementById('brandLink').addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector('nav button[data-page="home"]').click();
  });

  init();
})();
                                   
