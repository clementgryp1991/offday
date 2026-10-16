const P={
 'cloud-cream':{n:'cloud cream',r:'room 00',p:34,v:'50 ml',img:'img/cloud-cream-sm.webp',url:'room-00.html'},
 'jungle-cleanse':{n:'jungle cleanse',r:'room 01',p:26,v:'120 ml',img:'img/jungle-cleanse-sm.webp',url:'room-01.html'},
 'tropical-mist':{n:'tropical mist',r:'room 02',p:24,v:'100 ml',img:'img/tropical-mist-sm.webp',url:'room-02.html'},
 'wild-glow':{n:'wild glow',r:'room 03',p:38,v:'30 ml',img:'img/wild-glow-sm.webp',url:'room-03.html'},
 'weekend-off':{n:'weekend off kit',r:'room service',p:52,v:'cleanse + cream',img:'img/giftbox-sm.webp',url:'room-service.html'},
 'full-retreat':{n:'the full retreat',r:'room service',p:108,v:'all four rooms',img:'img/giftbox-sm.webp',url:'room-service.html'},
 'night-ritual':{n:'night ritual',r:'room service',p:64,v:'oil + cream',img:'img/giftbox-sm.webp',url:'room-service.html'}};
const GIFT=60,SHIP_FREE=50;
const get=()=>{try{return JSON.parse(localStorage.getItem('offday-wild-cart')||'{}')}catch(e){return{}}};
const put=c=>{localStorage.setItem('offday-wild-cart',JSON.stringify(c));render()};
const eur=n=>'€'+n.toFixed(2).replace('.00','');
const total=c=>Object.entries(c).reduce((s,[k,q])=>s+(P[k]?P[k].p*q:0),0);
const count=c=>Object.values(c).reduce((a,b)=>a+b,0);
function add(id,q=1){const c=get();c[id]=(c[id]||0)+q;put(c);toast(P[id].n+' checked in to your bag')}
function toast(t){let e=document.querySelector('.toast');if(!e){e=document.createElement('div');e.className='toast';e.setAttribute('role','status');document.body.append(e)}e.textContent=t;e.classList.add('show');clearTimeout(e._t);e._t=setTimeout(()=>e.classList.remove('show'),2200)}
function render(){const c=get();document.querySelectorAll('[data-count]').forEach(e=>e.textContent=count(c));if(window.renderCart)renderCart(c)}
document.addEventListener('click',e=>{const b=e.target.closest('[data-add]');if(b){const q=+(document.querySelector('[data-qty]')?.textContent||1);add(b.dataset.add,b.hasAttribute('data-useqty')?q:1);b.classList.add('done');setTimeout(()=>b.classList.remove('done'),1200)}});
// OFFDAY mode
function setOff(on){document.body.classList.toggle('is-off',on);document.querySelectorAll('[data-offbtn]').forEach(t=>{t.setAttribute('aria-pressed',on);const l=document.querySelector('[data-offlabel]');if(l)l.textContent=on?'OFFDAY MODE · ON':'OFFDAY MODE · OFF'});localStorage.setItem('offday-mode',on?'1':'0')}
document.addEventListener('DOMContentLoaded',()=>{
 setOff(localStorage.getItem('offday-mode')==='1');
 document.querySelectorAll('[data-offbtn]').forEach(t=>t.addEventListener('click',()=>{const on=!document.body.classList.contains('is-off');setOff(on);toast(on?'the world can wait. offday mode on.':'welcome back.')}));
 const bg=document.querySelector('.burger'),mn=document.querySelector('.mnav');
 if(bg)bg.addEventListener('click',()=>{const o=mn.classList.toggle('open');bg.setAttribute('aria-expanded',o)});
 const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.12});
 document.querySelectorAll('.rv,section.s').forEach(e=>io.observe(e));
 const q=document.querySelector('[data-qty]');
 document.querySelectorAll('[data-q]').forEach(b=>b.addEventListener('click',()=>{q.textContent=Math.max(1,+q.textContent+ +b.dataset.q)}));
 document.querySelectorAll('.thumbs button').forEach(b=>b.addEventListener('click',()=>{document.querySelector('.gal-main img').src=b.dataset.src;document.querySelectorAll('.thumbs button').forEach(x=>x.setAttribute('aria-current',x===b))}));
 const jar=document.querySelector('.jar');if(jar){const t=()=>{jar.classList.toggle('open');jar.setAttribute('aria-pressed',jar.classList.contains('open'))};jar.addEventListener('click',t);jar.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();t()}})}
 const sa=document.querySelector('.sticky-add'),ba=document.querySelector('.buyrow');
 if(sa&&ba)new IntersectionObserver(([x])=>sa.classList.toggle('show',!x.isIntersecting&&x.boundingClientRect.top<0)).observe(ba);
 document.querySelectorAll('form[data-club]').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();f.innerHTML='<p class="serif" style="font-size:1.6rem">your key is on its way. please do not disturb.</p>'}));
 render();
});
