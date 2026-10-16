const P={
'cloud-cream':{n:'cloud cream',r:'room 00',p:34,v:'50 ml',img:'img2/cloud-cream-480.webp',u:'room-00.html'},
'jungle-cleanse':{n:'jungle cleanse',r:'room 01',p:26,v:'120 ml',img:'img2/jungle-cleanse-480.webp',u:'room-01.html'},
'tropical-mist':{n:'tropical mist',r:'room 02',p:24,v:'100 ml',img:'img2/tropical-mist-480.webp',u:'room-02.html'},
'wild-glow':{n:'wild glow',r:'room 03',p:38,v:'30 ml',img:'img2/wild-glow-480.webp',u:'room-03.html'},
'weekend-off':{n:'weekend off kit',r:'room service',p:52,v:'cleanse + cream',img:'img2/giftbox-480.webp',u:'room-service.html'},
'full-retreat':{n:'the full retreat',r:'room service',p:108,v:'all four rooms',img:'img2/giftbox-480.webp',u:'room-service.html'},
'night-ritual':{n:'night ritual',r:'room service',p:64,v:'oil + cream',img:'img2/giftbox-480.webp',u:'room-service.html'}};
const GIFT=60,FREE=50,K='offday-v3-cart',$=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const get=()=>{try{return JSON.parse(localStorage.getItem(K)||'{}')}catch(e){return{}}};
const put=c=>{localStorage.setItem(K,JSON.stringify(c));render()};
const eur=n=>'€'+(Math.round(n*100)/100).toFixed(2).replace('.00','');
const sum=c=>Object.entries(c).reduce((s,[k,q])=>s+(P[k]?P[k].p*q:0),0);
const cnt=c=>Object.values(c).reduce((a,b)=>a+b,0);
function toast(t){let e=$('.toast');if(!e){e=document.createElement('div');e.className='toast';e.setAttribute('role','status');document.body.append(e)}e.textContent=t;e.classList.add('on');clearTimeout(e._t);e._t=setTimeout(()=>e.classList.remove('on'),2200)}
function add(id,q=1){const c=get();c[id]=(c[id]||0)+q;put(c);$$('.bagbtn b').forEach(b=>{b.classList.add('bump');setTimeout(()=>b.classList.remove('bump'),400)});if(!$('[data-checkout]'))openDrawer()}
window.chg=(k,d)=>{const c=get();c[k]=(c[k]||0)+d;if(c[k]<=0)delete c[k];put(c)};
function linesHTML(c){const ks=Object.keys(c).filter(k=>P[k]);return ks.length?ks.map((k,i)=>`<div class="line" style="animation-delay:${i*60}ms"><img src="${P[k].img}" alt="" width="76" height="95"><div><h4>${P[k].n}</h4><small>${P[k].r} · ${P[k].v}</small><br><span class="qty"><button onclick="chg('${k}',-1)" aria-label="one less ${P[k].n}">−</button><span>${c[k]}</span><button onclick="chg('${k}',1)" aria-label="one more ${P[k].n}">+</button></span></div><b class="disp" style="font-size:1.3rem;font-weight:400">${eur(P[k].p*c[k])}</b></div>`).join(''):'<p class="empty">your room is still empty.<br><a href="index.html#rooms" class="tlink" style="font-family:var(--sans);font-size:.75rem">explore the rooms</a></p>'}
function giftTxt(t){const r=GIFT-t;return r>0?`add <b>${eur(r)}</b> more to unlock your secret copper room key.`:'your secret copper room key is included. you are officially off duty.'}
function render(){const c=get(),t=sum(c);$$('[data-count]').forEach(e=>e.textContent=cnt(c));$$('[data-lines]').forEach(e=>e.innerHTML=linesHTML(c));$$('[data-gift]').forEach(e=>e.innerHTML=giftTxt(t));$$('[data-bar]').forEach(e=>e.style.width=Math.min(100,t/GIFT*100)+'%');const sh=t===0||t>=FREE?0:4.95;$$('[data-sub]').forEach(e=>e.textContent=eur(t));$$('[data-ship]').forEach(e=>e.textContent=sh?eur(sh):'free');$$('[data-total]').forEach(e=>e.textContent=eur(t+sh))}
function openDrawer(){$('.drawer').classList.add('on');$('.scrim').classList.add('on');document.body.classList.add('lock');$('.drawer').setAttribute('aria-hidden','false');setTimeout(()=>$('.drawer .xbtn').focus(),300)}
function closeDrawer(){$('.drawer').classList.remove('on');$('.scrim').classList.remove('on');document.body.classList.remove('lock');$('.drawer').setAttribute('aria-hidden','true')}
// OFFDAY mode
function setMode(on,silent){document.body.classList.toggle('is-off',on);localStorage.setItem('offday-mode',on?'1':'0');$$('[data-mode]').forEach(b=>b.setAttribute('aria-pressed',on));$$('[data-modelabel]').forEach(l=>l.textContent=on?'OFFDAY MODE · ON':'OFFDAY MODE · OFF');if(!silent)toast(on?'the world can wait. offday mode on.':'welcome back.')}
// intro doors
function openDoors(){const d=$('.doors');if(!d||d.classList.contains('open'))return;d.classList.add('open');document.body.classList.remove('lock');document.body.classList.add('revealed');sessionStorage.setItem('offday-intro','1');clearTimeout(window._auto)}
function closeDoors(){const d=$('.doors');if(!d){location.href='index.html?intro';return}window.scrollTo({top:0});d.classList.remove('open');document.body.classList.remove('revealed');void d.offsetWidth;window._auto=setTimeout(openDoors,4000)}
document.addEventListener('DOMContentLoaded',()=>{
 setMode(localStorage.getItem('offday-mode')==='1',true);
 const d=$('.doors');const force=location.search.includes('intro');
 if(d){if(!force&&(sessionStorage.getItem('offday-intro')||RM)){d.classList.add('open');document.body.classList.add('revealed')}else{document.body.classList.add('lock');window._auto=setTimeout(openDoors,location.search.includes('hold')?1e9:4200);
  addEventListener('wheel',openDoors,{once:true,passive:true});addEventListener('touchmove',openDoors,{once:true,passive:true});addEventListener('keydown',e=>{if(['Escape','ArrowDown',' ','PageDown'].includes(e.key))openDoors()})}}
 else document.body.classList.add('revealed');
 $$('[data-open]').forEach(b=>b.addEventListener('click',()=>{openDoors();if(b.hasAttribute('data-mode'))setMode(true,true)}));
 $$('.navoff').forEach(b=>b.addEventListener('click',()=>{const on=!document.body.classList.contains('is-off');setMode(on);if(on)closeDoors()}));
 $$('.modecard').forEach(b=>b.addEventListener('click',()=>{const on=!document.body.classList.contains('is-off');setMode(on);const j=$('.jar');if(j){j.classList.toggle('open',on)}}));
 // header
 const h=$('.hdr');let ly=0;const onS=()=>{const y=scrollY;h.classList.toggle('solid',y>60||!$('.hero'));h.classList.toggle('hide',y>ly&&y>500&&!$('.drawer.on'));ly=y};onS();addEventListener('scroll',onS,{passive:true});
 const bg=$('.burger'),mn=$('.mnav');bg&&bg.addEventListener('click',()=>{const o=mn.classList.toggle('open');bg.setAttribute('aria-expanded',o);document.body.classList.toggle('lock',o)});$$('.mnav a').forEach(a=>a.addEventListener('click',()=>{mn.classList.remove('open');bg.setAttribute('aria-expanded',false);document.body.classList.remove('lock')}));
 // drawer
 $$('.bagbtn').forEach(b=>b.addEventListener('click',openDrawer));$('.scrim').addEventListener('click',closeDrawer);$('.drawer .xbtn').addEventListener('click',closeDrawer);addEventListener('keydown',e=>{if(e.key==='Escape')closeDrawer()});
 document.addEventListener('click',e=>{const b=e.target.closest('[data-add]');if(!b)return;const q=b.hasAttribute('data-useqty')?+$('[data-qty]').textContent:1;add(b.dataset.add,q)});
 // reveal
 const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.15,rootMargin:'0px 0px -6% 0px'});$$('.rv,.s,.frame,.kick').forEach(e=>io.observe(e));
 // parallax
 const par=$$('[data-par]');const tick=()=>{const vh=innerHeight;par.forEach(e=>{const r=e.parentElement.getBoundingClientRect();if(r.bottom<-200||r.top>vh+200)return;const k=+e.dataset.par;e.style.transform=`translate3d(0,${((r.top+r.height/2)-vh/2)*k}px,0)`});
  const hs=$('.hs.pin');if(hs&&innerWidth>=1000){const tr=$('.track',hs),max=tr.scrollWidth-innerWidth;hs.style.setProperty('--h',(innerHeight+max)+'px');const r=hs.getBoundingClientRect();const p=Math.min(1,Math.max(0,-r.top/(hs.offsetHeight-innerHeight)));tr.style.transform=`translate3d(${-p*max}px,0,0)`;hs.querySelector('.progress').style.setProperty('--p',p)}else if(hs){$('.track',hs).style.transform=''}};
 if(!RM){let raf;addEventListener('scroll',()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(tick)},{passive:true});addEventListener('resize',tick)}tick();
 // track mobile progress
 $$('.track').forEach(t=>t.addEventListener('scroll',()=>{const p=t.scrollLeft/(t.scrollWidth-t.clientWidth||1);const pr=t.parentElement.querySelector('.progress');pr&&pr.style.setProperty('--p',p)},{passive:true}));
 if(matchMedia('(hover:hover) and (min-width:900px)').matches&&!RM){
  const g=document.createElement('div');g.className='glow';document.body.append(g);let gx=0,gy=0,tx=0,ty=0;addEventListener('mousemove',e=>{tx=e.clientX;ty=e.clientY});(function lp(){gx+=(tx-gx)*.09;gy+=(ty-gy)*.09;g.style.transform=`translate3d(${gx}px,${gy}px,0)`;requestAnimationFrame(lp)})();
  $$('.btn,.qadd,.bigoff').forEach(b=>{b.addEventListener('mousemove',e=>{const r=b.getBoundingClientRect();b.style.setProperty('--mx',(e.clientX-r.left-r.width/2)*.25+'px');b.style.setProperty('--my',(e.clientY-r.top-r.height/2)*.3+'px');if(!b.classList.contains('btn'))b.style.transform=`translate(var(--mx),var(--my))`});b.addEventListener('mouseleave',()=>{b.style.setProperty('--mx','0px');b.style.setProperty('--my','0px')})});
  $$('.card .ph').forEach(c=>{c.addEventListener('mousemove',e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform=`rotateY(${x*8}deg) rotateX(${-y*8}deg)`});c.addEventListener('mouseleave',()=>c.style.transform='')});}
 // product
 const q=$('[data-qty]');$$('[data-q]').forEach(b=>b.addEventListener('click',()=>{q.textContent=Math.max(1,+q.textContent+ +b.dataset.q)}));
 $$('.thumbs button').forEach(b=>b.addEventListener('click',()=>{const m=$('.gal .main img');m.style.opacity=0;setTimeout(()=>{m.srcset=b.dataset.srcset;m.src=b.dataset.src;m.style.objectPosition=b.dataset.pos||'50% 50%';m.style.opacity=1},250);$$('.thumbs button').forEach(x=>x.setAttribute('aria-current',x===b))}));
 const jar=$('.jar');if(jar){const t=()=>{jar.classList.toggle('open');jar.setAttribute('aria-pressed',jar.classList.contains('open'))};jar.addEventListener('click',t);jar.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();t()}});new IntersectionObserver(([x])=>{if(x.isIntersecting&&!jar.dataset.auto){jar.dataset.auto=1;setTimeout(()=>jar.classList.add('open'),900)}},{threshold:.6}).observe(jar)}
 const st=$('.sticky'),br=$('.buyrow');if(st&&br)new IntersectionObserver(([x])=>st.classList.toggle('on',!x.isIntersecting&&x.boundingClientRect.top<0)).observe(br);
 $$('form[data-club]').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();f.innerHTML='<p class="disp" style="font-size:1.8rem">your key is on its way. please do not disturb.</p>'}));
 // page transitions (fallback where no view transitions)
 if(!('onpagereveal' in window)&&!RM){const pt=document.createElement('div');pt.className='pt';document.body.append(pt);$$('a[href$=".html"],a[href*=".html#"]').forEach(a=>a.addEventListener('click',e=>{if(e.metaKey||e.ctrlKey||a.target)return;const u=new URL(a.href);if(u.pathname===location.pathname)return;e.preventDefault();pt.classList.add('go');setTimeout(()=>location.href=a.href,550)}));addEventListener('pageshow',()=>pt.classList.remove('go'))}
 render();
});
