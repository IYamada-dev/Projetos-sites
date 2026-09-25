
const destinos=[
{nome:"Tóquio, Japão",flag:"🇯🇵",resumo:"Metrópole futurista com templos e neon.",historia:"Japão arquipélago com 126M hab. Tóquio 37M. Akihabara bairro otaku, sakura primavera.",pontos:["Shibuya Crossing","Senso-ji","Akihabara"],pratos:[{emoji:"🍣",nome:"Sushi",desc:"Arroz avinagrado com peixe cru."},{emoji:"🍜",nome:"Ramen",desc:"Caldo tonkotsu 18h com chashu."},{emoji:"🐙",nome:"Takoyaki",desc:"Bolinha com polvo e maionese japonesa."},{emoji:"🍵",nome:"Matcha",desc:"Chá verde em pó."}],melhor:"Mar-Mar"},
{nome:"Helsinki, Finlândia",flag:"🇫🇮",resumo:"Capital design nórdico, Báltico.",historia:"Finlândia 7x país mais feliz. Helsinki 650 mil hab. Sauna patrimônio.",pontos:["Catedral Helsinki","Suomenlinna","Löyly Sauna"],pratos:[{emoji:"🐟",nome:"Lohikeitto",desc:"Sopa cremosa salmão e batata."},{emoji:"🥟",nome:"Karjalanpiirakka",desc:"Pastel centeio com arroz."},{emoji:"☕",nome:"Korvapuusti",desc:"Rolo canela finlandês."}],melhor:"Dez-Mar"},
{nome:"Reine, Noruega",flag:"🇳🇴",resumo:"Vilarejo rorbuer vermelhos fiorde Ártico.",historia:"Lofoten acima Círculo Polar. Reine 300 hab. vila mais bonita Noruega.",pontos:["Reine Fjord","Kvalvika","Tromsø"],pratos:[{emoji:"🐑",nome:"Fårikål",desc:"Cordeiro repolho pimenta 3h."},{emoji:"🧀",nome:"Brunost",desc:"Queijo marrom caramelizado."},{emoji:"🐟",nome:"Tørrfisk",desc:"Bacalhau seco vento ártico."}],melhor:"Set-Mar"},
{nome:"Paris, França",flag:"🇫🇷",resumo:"Cidade luz, moda gastronomia.",historia:"Paris 2,1M intramuros, 12M metrópole. Fundada século III a.C.",pontos:["Torre Eiffel","Louvre","Montmartre"],pratos:[{emoji:"🥐",nome:"Croissant",desc:"27 camadas manteiga."},{emoji:"🥩",nome:"Steak Tartare",desc:"Carne crua alcaparras gema."},{emoji:"🍰",nome:"Macaron",desc:"Amêndoas ganache."}],melhor:"Abr-Jun"},
{nome:"Nova York, EUA",flag:"🇺🇸",resumo:"Cidade nunca dorme, 8,8M 200 línguas.",historia:"Nova Amsterdã holandesa até 1664. Centro financeiro cultural.",pontos:["Times Square","Central Park","Brooklyn Bridge"],pratos:[{emoji:"🥯",nome:"Bagel",desc:"Pão anel cream cheese."},{emoji:"🍎",nome:"Cheesecake",desc:"Torta cream cheese densa."},{emoji:"🌭",nome:"Hot Dog",desc:"Salsicha chucrute."}],melhor:"Set-Nov"},
{nome:"Dubai, EAU",flag:"🇦🇪",resumo:"Metrópole deserto prédio mais alto.",historia:"Vila pescadores pérolas até 1960. Hoje 3,6M 85% expats.",pontos:["Burj Khalifa","Deserto 4x4","Dubai Mall"],pratos:[{emoji:"🥙",nome:"Shawarma",desc:"Carne vertical pão sírio."},{emoji:"🧆",nome:"Hummus",desc:"Grão-de-bico tahine limão."},{emoji:"🍯",nome:"Knafeh",desc:"Queijo quente pistache rosas."}],melhor:"Nov-Mar"}
];
const hoteis=[{nome:"Park Hyatt Tokyo",flag:"🇯🇵",cidade:"Tóquio",preco:890,nota:"9.2"},{nome:"Klaus K Helsinki",flag:"🇫🇮",cidade:"Helsinki",preco:410,nota:"9.0"},{nome:"Reine Rorbuer",flag:"🇳🇴",cidade:"Reine",preco:620,nota:"9.6"},{nome:"Le Meurice Paris",flag:"🇫🇷",cidade:"Paris",preco:780,nota:"9.4"},{nome:"The Pierre NYC",flag:"🇺🇸",cidade:"Nova York",preco:920,nota:"9.1"},{nome:"Burj Al Arab",flag:"🇦🇪",cidade:"Dubai",preco:1450,nota:"9.8"}];
function goTo(id){
  const cur=document.querySelector('.page.active');
  const nxt=document.getElementById(id);
  if(!nxt)return;
  if(cur===nxt)return;
  const layer=document.getElementById('plane-layer');
  layer.classList.add('playing');
  gsap.fromTo("#plane",{x:"-30vw",y:"20vh",rotate:-8},{x:"130vw",y:"-25vh",rotate:-28,duration:1.2,ease:"power3.inOut"});
  gsap.fromTo("#cloud",{x:"-35vw",opacity:0},{x:"90vw",opacity:1,duration:1.2,ease:"power2.out",onComplete:()=>gsap.to("#cloud",{opacity:0,duration:.2})});
  gsap.to(cur,{y:-40,opacity:0,duration:.4,onComplete:()=>{
    cur.classList.remove('active');
    document.querySelectorAll('#menu a').forEach(a=>a.classList.toggle('active',a.dataset.target===id || a.textContent.toLowerCase().includes(id.substring(0,4))));
    nxt.classList.add('active');
    gsap.fromTo(nxt,{y:40,opacity:0},{y:0,opacity:1,duration:.55});
    gsap.fromTo(nxt.querySelectorAll('.card,h2,table,.hero,.search-box'),{y:24,opacity:0},{y:0,opacity:1,stagger:.06,duration:.5,delay:.1});
    setTimeout(()=>layer.classList.remove('playing'),1150);
  }});
}
document.addEventListener('DOMContentLoaded',()=>{
  const gd=document.getElementById('grid-dest');
  destinos.forEach(d=>{
    const c=document.createElement('div');c.className='card';
    c.innerHTML=`<span class="flag">${d.flag}</span><span class="badge">${d.melhor}</span><h3>${d.nome}</h3><p style="font-size:13px;color:#64748b;margin:8px 0">${d.resumo}</p><div style="margin-top:8px"><b style="font-size:12px">🍜 Pratos:</b><br>${d.pratos.map(p=>`<span class="dish"><b>${p.emoji}</b> ${p.nome}</span>`).join('')}</div><div class="price">a partir de R$ 2.890</div><button class="btn" style="margin-top:12px;width:100%">Ver completo + gastronomia</button>`;
    c.querySelector('button').onclick=()=>openModal(d.nome);
    gd.appendChild(c);
  });
  function renderHoteis(){
    const gh=document.getElementById('grid-hoteis');gh.innerHTML='';
    hoteis.forEach(h=>{
      const c=document.createElement('div');c.className='card';
      c.innerHTML=`<div style="display:flex;justify-content:space-between"><span class="flag" style="font-size:48px">${h.flag}</span><span style="background:#F8FAFC;border:1px solid var(--border);padding:6px 10px;border-radius:100px;font-size:12px">⭐ ${h.nota}</span></div><h3 style="margin-top:8px">${h.nome}</h3><p style="font-size:12px;color:#64748b">${h.cidade}</p><div class="price">R$ ${h.preco}/noite</div><button class="btn" style="width:100%;margin-top:10px">Reservar</button>`;
      const b=c.querySelector('button');const k='res_'+h.nome;
      if(localStorage.getItem(k)){b.textContent='Reservado ✓';b.style.background='#10b981'}
      b.onclick=()=>{localStorage.setItem(k,'1');b.textContent='Reservado ✓';b.style.background='#10b981';renderReservas()};
      gh.appendChild(c);
    });
  }
  window.renderReservas=()=>{
    const div=document.getElementById('minhas-reservas');
    const keys=Object.keys(localStorage).filter(k=>k.startsWith('res_'));
    if(!keys.length){div.textContent='Nenhuma ainda.';return}
    div.innerHTML=keys.map(k=>`<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #f1f5f9"><span><b>${k.replace('res_','')}</b></span><button onclick="localStorage.removeItem('${k}');renderReservas();document.getElementById('grid-hoteis').innerHTML='';location.reload()" style="border:none;background:none;color:red;cursor:pointer">x</button></div>`).join('');
  }
  window.openModal=(nome)=>{
    const d=destinos.find(x=>x.nome===nome);if(!d)return;
    document.getElementById('modal-box').innerHTML=`<div style="padding:28px"><span style="font-size:72px">${d.flag}</span><h2 style="font-size:32px;margin-top:10px">${d.nome}</h2><p style="color:#64748b;margin:10px 0">${d.resumo}</p><div style="background:#F8FAFC;border:1px solid var(--border);border-radius:16px;padding:16px;margin:16px 0"><b>📖 Sobre:</b><p style="font-size:13px;margin-top:6px;line-height:1.6">${d.historia}</p></div><p><b>📍 Visitar:</b> ${d.pontos.join(' • ')}</p><div style="margin-top:18px"><b>🍜 Pratos explicados:</b><div style="margin-top:10px;display:grid;gap:10px">${d.pratos.map(p=>`<div style="border:1px solid var(--border);border-radius:12px;padding:12px"><b>${p.emoji} ${p.nome}</b><p style="font-size:12px;color:#64748b">${p.desc}</p></div>`).join('')}</div></div><div style="margin-top:20px;display:flex;gap:10px"><button class="btn" onclick="goTo('valores');document.getElementById('modal').classList.remove('open')">Comprar passagem</button><button class="btn" style="background:#fff;color:var(--navy);border:1px solid var(--border)" onclick="document.getElementById('modal').classList.remove('open')">Fechar</button></div></div>`;
    document.getElementById('modal').classList.add('open');
    gsap.fromTo("#modal-box",{y:30,opacity:0},{y:0,opacity:1,duration:.4});
  }
  document.getElementById('modal').addEventListener('click',e=>{if(e.target.id==='modal'){document.getElementById('modal').classList.remove('open')}});
  renderHoteis();renderReservas();
});
