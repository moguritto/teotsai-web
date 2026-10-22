const SIG = (
() => {
  const vw = document.documentElement.clientWidth;
  const norm = s => (s||'').normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().replace(/[^a-z0-9ñ]+/g,' ').trim();
  const imgKey = u => { if(!u) return ''; try{u=decodeURIComponent(u)}catch(e){}; let b=u.split('?')[0].split('#')[0].split('/').pop().toLowerCase();
    b=b.replace(/\.(jpe?g|png|webp|gif|svg|avif)$/,'').replace(/-\d+x\d+$/,'').replace(/-(scaled|e\d+)$/,'').replace(/-\d+x\d+$/,'').replace(/[^a-z0-9]+/g,'');
    return b.slice(0,40); };
  const skip = e => e.closest('header,footer,nav,.elementor-location-header,.elementor-location-footer,#wpadminbar,.joinchat,[class*="cookie"],.cabecera,.pie,.menu');
  const vis = e => { const r=e.getBoundingClientRect(); if(r.width<2||r.height<2) return false; let p=e; while(p&&p!==document.body){const cs=getComputedStyle(p); if(cs.display==='none'||cs.visibility==='hidden'||parseFloat(cs.opacity)===0) return false; p=p.parentElement;} return true; };
  const out = [];
  const els = document.body.querySelectorAll('h1,h2,h3,h4,img,iframe,video,a,button,[style*="background-image"],section,div');
  for (const e of els) {
    if (skip(e)) continue;
    const t = e.tagName;
    if (/^H[1-4]$/.test(t)) { if(!vis(e)) continue; const s=norm(e.textContent).slice(0,50); if(!s) continue; const cs=getComputedStyle(e); out.push({k:'H',v:s,fs:Math.round(parseFloat(cs.fontSize)),c:cs.color,ff:cs.fontFamily.split(',')[0].replace(/["']/g,'').trim(),fw:cs.fontWeight,tt:cs.textTransform,ta:cs.textAlign}); }
    else if (t==='IMG') { if(!vis(e)) continue; const r=e.getBoundingClientRect(); if(r.width<40) continue; const src=e.currentSrc||e.getAttribute('src')||e.getAttribute('data-src'); out.push({k:'I',v:imgKey(src),w:Math.round(r.width)}); }
    else if (t==='IFRAME'||t==='VIDEO') { if(!vis(e)) continue; const s=e.getAttribute('src')||e.getAttribute('data-src')||(e.querySelector('source')||{}).src||''; const m=s.match(/(?:embed\/|v=|youtu\.be\/)([\w-]{11})/); out.push({k:'V',v:m?m[1]:(s.split('/')[2]||'')+':'+imgKey(s)}); }
    else if (t==='A'||t==='BUTTON') { if(!vis(e)) continue; const cs=getComputedStyle(e); const bg=cs.backgroundColor; const btn=(bg&&bg!=='rgba(0, 0, 0, 0)'&&bg!=='transparent')||parseFloat(cs.borderTopWidth)>0; const s=norm(e.textContent); if(btn&&s&&s.length<40) out.push({k:'B',v:s}); }
    else { const bi=getComputedStyle(e).backgroundImage; if(bi&&bi.includes('url(')){ const r=e.getBoundingClientRect(); if(r.width>150&&r.height>80&&vis(e)){ const m=bi.match(/url\(["']?([^"')]+)/); if(m){ const ovl=[]; const b4=getComputedStyle(e,'::before'); if(b4.content!=='none'&&b4.backgroundColor!=='rgba(0, 0, 0, 0)') ovl.push(b4.backgroundColor+'@'+b4.opacity); const oc=[...e.children].find(x=>/overlay|capa|velo/.test(x.className)); if(oc){const oc2=getComputedStyle(oc); if(oc2.backgroundColor!=='rgba(0, 0, 0, 0)'||oc2.backgroundImage!=='none') ovl.push(oc2.backgroundColor+'@'+oc2.opacity+(oc2.backgroundImage!=='none'?' '+oc2.backgroundImage.slice(0,90):''));} out.push({k:'I',v:imgKey(m[1]),bg:1,h:Math.round(r.height),ov:ovl.join('|'),bp:getComputedStyle(e).backgroundPosition}); } } } }
  }
  // dedupe consecutive duplicates
  const res=[]; for(const o of out){ const l=res[res.length-1]; if(l&&l.k===o.k&&l.v===o.v) continue; res.push(o);}
  return res;
}
);
const REPO = {'espacioteots.org':'espacioteots-web','apder.org':'apder-web','teots.org':'teots-web','ianivillage.com':'ianivillage-web','teotsai.com':'teotsai-web'};
let DATA = null;
const rgb = c => (c.match(/[\d.]+/g)||[0,0,0]).slice(0,3).map(Number);
const hex = c => '#'+rgb(c).map(x=>Math.round(x).toString(16).padStart(2,'0')).join('');
const cdist = (a,b) => { const x=rgb(a),y=rgb(b); return Math.hypot(x[0]-y[0],x[1]-y[1],x[2]-y[2]); };
export async function run(tag, forcePath) {
  if (!DATA) DATA = await fetch('https://moguritto.github.io/teotsai-web/_rev/sigs.json?'+Date.now()).then(r=>r.json());
  const host = location.hostname.replace(/^www\./,''); const repo = REPO[host];
  let path = forcePath || decodeURIComponent(location.pathname); if(!path.endsWith('/')) path+='/';
  const cp = DATA[repo] && DATA[repo][path];
  if (!cp) return JSON.stringify({p:path,err:'sin copia'});
  for (let y=0; y<document.body.scrollHeight; y+=1500) { window.scrollTo(0,y); await new Promise(r=>setTimeout(r,40)); }
  await new Promise(r=>setTimeout(r,400)); window.scrollTo(0,0);
  const o = SIG(), c = cp[tag] || [];
  const R = {p:path, t:tag, H:[], G:[], miss:{}};
  const used = new Set();
  for (const h of o.filter(x=>x.k==='H')) {
    const i = c.findIndex((x,j)=>!used.has(j) && x.k==='H' && x.v.slice(0,22)===h.v.slice(0,22)); if (i<0) continue; used.add(i); const m=c[i];
    const d=[];
    if (Math.abs(m.fs-h.fs)>2) d.push('fs');
    if (cdist(h.c,m.c)>30) d.push('c');
    if ((h.ff||'').toLowerCase()!==(m.ff||'').toLowerCase()) d.push('ff');
    if (Math.abs(parseInt(h.fw)-parseInt(m.fw))>=200) d.push('fw');
    if (h.tt!==m.tt) d.push('tt');
    if (d.length) R.H.push(h.v.slice(0,20)+'~'+h.fs+(d.includes('c')?'~c'+hex(h.c):'')+(d.includes('ff')?'~f'+h.ff:'')+(d.includes('fw')?'~w'+h.fw:'')+(d.includes('tt')?'~t'+h.tt:''));
  }
  for (const g of o.filter(x=>x.k==='I'&&x.bg)) {
    const m = c.find(x=>x.k==='I'&&x.bg&&x.v.slice(0,14)===g.v.slice(0,14));
    if (!m) { R.G.push(g.v.slice(0,24)+'~nobg~'+g.h); continue; }
    const d=[]; if (g.ov!==m.ov) d.push('ov'); if (m.h/g.h<0.85||m.h/g.h>1.18) d.push('h');
    if (d.length) R.G.push(g.v.slice(0,24)+'~'+g.h+'~'+g.ov+'~'+g.bp+'~c'+m.h);
  }
  const has = (arr,k,v,n) => arr.some(x=>x.k===k && (x.v===v || (x.v && v && x.v.slice(0,n)===v.slice(0,n))));
  for (const k of ['I','B','V']) { const n=k==='I'?14:12; const miss=[...new Set(o.filter(x=>x.k===k&&!x.bg&&x.v&&!has(c,k,x.v,n)).map(x=>x.v.slice(0,30)))]; if(miss.length) R.miss[k]=miss; }
  let out=path+' '+tag; if(R.H.length) out+='\nH '+R.H.join(';'); if(R.G.length) out+='\nG '+R.G.join(';'); for(const k in R.miss) out+='\nM'+k+' '+R.miss[k].join('|'); return out;
}
