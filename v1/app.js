const THRESHOLD=60;
const P={
 'cloud-cream':{n:'cloud cream',s:'50 ml',d:'deeply hydrating, calming. lets your skin breathe.',p:34,img:'img/pot.jpg',url:'room-00.html'},
 'reset-mist':{n:'reset mist',s:'100 ml',d:'refreshes, balances and brings you back to now.',p:28,img:'img/lijn.jpg'},
 'radiance-serum':{n:'radiance serum',s:'30 ml',d:'adds glow and lets your natural radiance shine.',p:36,img:'img/plank.jpg'},
 'late-check-out':{n:'late check-out kit',s:'kit',d:'extra care for longer offdays.',p:42,img:'img/koffer.jpg'},
 'weekend-reset':{n:'weekend reset',s:'kit',d:'don\'t wait for later, start today.',p:58,img:'img/giftbox.jpg'},
 'room-00-set':{n:'room 00 set',s:'set',d:'the complete routine for a softer morning.',p:79,img:'img/box-sleutel.jpg'}
};
const eur=v=>'€'+v.toFixed(2);
const get=()=>JSON.parse(localStorage.getItem('offday-cart')||'{}');
const put=c=>{localStorage.setItem('offday-cart',JSON.stringify(c));render()};
const count=c=>Object.values(c).reduce((a,b)=>a+b,0);
const sub=c=>Object.entries(c).reduce((a,[k,q])=>a+(P[k]?P[k].p*q:0),0);
function add(id,btn){const c=get();c[id]=(c[id]||0)+1;put(c);if(btn){const t=btn.innerHTML;btn.innerHTML='added ✓';setTimeout(()=>btn.innerHTML=t,1300)}}
const bag='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 8h14l-1 13H6L5 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>';
document.addEventListener('DOMContentLoaded',()=>{
 const h=document.getElementById('hdr');
 if(h)h.outerHTML=`<header class="hdr"><div class="wrap">
  <button class="burger" aria-label="menu" onclick="document.querySelector('.mnav').classList.toggle('open')"><svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.6"><path d="M3 6h18M3 12h18M3 18h18"/></svg></button>
  <a href="index.html" class="logo">offday</a>
  <nav class="nav"><a href="index.html#rooms">rooms</a><a href="index.html#roomservice">room service</a><a href="index.html#reception">reception</a><a href="index.html#club">do not disturb club</a></nav>
  <div class="hdr-r"><a href="check-in.html" class="btn sm ci">check-in</a><a href="check-in.html" class="bag" aria-label="bag">${bag}<span class="badge"></span></a></div></div>
  <nav class="mnav"><a href="index.html#rooms">rooms</a><a href="index.html#roomservice">room service</a><a href="index.html#reception">reception</a><a href="index.html#club">do not disturb club</a><a href="check-in.html">check-in</a></nav></header>`;
 const f=document.getElementById('ftr');
 if(f)f.outerHTML=`<footer class="ftr" id="reception"><div class="wrap"><a href="index.html" class="logo">offday</a><span>a hotel for softer mornings</span>
  <nav><a href="#">faq</a><a href="#">shipping &amp; returns</a><a href="#">contact</a><a href="#">about offday</a></nav>
  <p class="note">all prices are sample prices. spend ${eur(THRESHOLD)} and the room 00 key is our gift.</p></div></footer>`;
 document.querySelectorAll('[data-add]').forEach(b=>b.addEventListener('click',e=>{e.preventDefault();add(b.dataset.add,b)}));
 document.querySelectorAll('[data-price]').forEach(e=>e.textContent=eur(P[e.dataset.price].p));
 document.querySelectorAll('[data-threshold]').forEach(e=>e.textContent=eur(THRESHOLD));
 const t=document.querySelector('.tgl');
 if(t){if(localStorage.getItem('offday-off')==='1'){t.setAttribute('aria-pressed','true');document.body.classList.add('is-off')}
  t.addEventListener('click',()=>{const on=t.getAttribute('aria-pressed')!=='true';t.setAttribute('aria-pressed',on);document.body.classList.toggle('is-off',on);localStorage.setItem('offday-off',on?'1':'0');const l=t.querySelector('.lbl');if(l&&l.dataset.on)l.innerHTML=on?l.dataset.on:l.dataset.off})}
 document.querySelectorAll('.thumbs button').forEach(b=>b.addEventListener('click',()=>{document.querySelector('.gal-main img').src=b.querySelector('img').src;document.querySelectorAll('.thumbs button').forEach(x=>x.classList.toggle('on',x===b))}));
 const cf=document.querySelector('.club form');
 if(cf)cf.addEventListener('submit',e=>{e.preventDefault();cf.insertAdjacentHTML('afterend','<p class="ok">you\'re on the list. we\'ll knock softly.</p>');cf.remove()});
 document.querySelectorAll('input[name=ship]').forEach(r=>r.addEventListener('change',render));
 render();
});
function render(){
 const c=get(),n=count(c),s=sub(c);
 document.querySelectorAll('.badge').forEach(b=>b.textContent=n||'');
 const L=document.getElementById('lines');if(!L)return;
 document.getElementById('cnt').textContent=n+(n===1?' item':' items')+' in your bag';
 L.innerHTML=n?Object.entries(c).map(([k,q])=>{const p=P[k];return`<div class="line"><img src="${p.img}" alt="${p.n}"><div><h3>${p.n} <small style="font:14px DM Sans">${p.s}</small></h3><p>${p.d}</p><button class="rm" onclick="setQ('${k}',0)">remove</button></div>
  <div class="ctl"><div class="qty"><button onclick="setQ('${k}',${q-1})" aria-label="less">−</button><span>${q}</span><button onclick="setQ('${k}',${q+1})" aria-label="more">+</button></div><span class="lp price">${eur(p.p*q)}</span></div></div>`}).join(''):'<div class="empty"><p>your room is still empty.</p><p style="margin-top:14px"><a class="btn" href="room-00.html">see room 00 →</a></p></div>';
 const rest=Math.max(0,THRESHOLD-s);
 document.getElementById('gift-t').textContent=rest?'your secret gift is waiting.':'your room 00 key is ready. you\'re officially off duty.';
 document.getElementById('gift-p').innerHTML=rest?`just <b>${eur(rest)}</b> more until you receive the room 00 key.`:'we\'ll tuck the key into your box for free.';
 document.querySelector('.bar i').style.width=Math.min(100,s/THRESHOLD*100)+'%';
 document.getElementById('bar-now').textContent=eur(s);
 const exp=document.querySelector('input[name=ship]:checked')?.value==='express';
 const ship=!n?0:exp?9.95:(s>=50?0:4.95);
 document.getElementById('s-sub').textContent=eur(s);document.getElementById('s-n').textContent=n;
 document.getElementById('s-ship').textContent=n&&ship===0?'free':eur(ship);
 document.getElementById('s-tot').textContent=eur(s+ship);
}
function setQ(k,q){const c=get();if(q<=0)delete c[k];else c[k]=q;put(c)}
