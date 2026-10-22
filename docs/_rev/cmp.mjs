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
    if (/^H[1-4]$/.test(t)) { if(!vis(e)) continue; const s=norm(e.textContent).slice(0,50); if(!s) continue; const cs=getComputedStyle(e); out.push({k:'H',v:s,fs:Math.round(parseFloat(cs.fontSize)),c:cs.color}); }
    else if (t==='IMG') { if(!vis(e)) continue; const r=e.getBoundingClientRect(); if(r.width<40) continue; const src=e.currentSrc||e.getAttribute('src')||e.getAttribute('data-src'); out.push({k:'I',v:imgKey(src),w:Math.round(r.width)}); }
    else if (t==='IFRAME'||t==='VIDEO') { if(!vis(e)) continue; const s=e.getAttribute('src')||e.getAttribute('data-src')||(e.querySelector('source')||{}).src||''; const m=s.match(/(?:embed\/|v=|youtu\.be\/)([\w-]{11})/); out.push({k:'V',v:m?m[1]:(s.split('/')[2]||'')+':'+imgKey(s)}); }
    else if (t==='A'||t==='BUTTON') { if(!vis(e)) continue; const cs=getComputedStyle(e); const bg=cs.backgroundColor; const btn=(bg&&bg!=='rgba(0, 0, 0, 0)'&&bg!=='transparent')||parseFloat(cs.borderTopWidth)>0; const s=norm(e.textContent); if(btn&&s&&s.length<40) out.push({k:'B',v:s}); }
    else { const bi=getComputedStyle(e).backgroundImage; if(bi&&bi.includes('url(')){ const r=e.getBoundingClientRect(); if(r.width>150&&r.height>80&&vis(e)){ const m=bi.match(/url\(["']?([^"')]+)/); if(m) out.push({k:'I',v:imgKey(m[1]),bg:1}); } } }
  }
  // dedupe consecutive duplicates
  const res=[]; for(const o of out){ const l=res[res.length-1]; if(l&&l.k===o.k&&l.v===o.v) continue; res.push(o);}
  return res;
}
);
const REPO = {'espacioteots.org':'espacioteots-web','apder.org':'apder-web','teots.org':'teots-web','ianivillage.com':'ianivillage-web','teotsai.com':'teotsai-web'};
let DATA = null;
const short = s => (s||'').slice(0,22);
const rgb = c => (c.match(/\d+/g)||[0,0,0]).slice(0,3).map(Number);
const cdist = (a,b) => { const x=rgb(a),y=rgb(b); return Math.hypot(x[0]-y[0],x[1]-y[1],x[2]-y[2]); };
export async function run(tag) {
  if (!DATA) DATA = await fetch('https://moguritto.github.io/teotsai-web/_rev/sigs.json?'+Date.now()).then(r=>r.json());
  const host = location.hostname.replace(/^www\./,''); const repo = REPO[host];
  let path = decodeURIComponent(location.pathname); if(!path.endsWith('/')) path+='/';
  const cp = DATA[repo] && DATA[repo][path];
  if (!cp) return `${host}${path}: SIN COPIA`;
  for (let y=0; y<document.body.scrollHeight; y+=600) { window.scrollTo(0,y); await new Promise(r=>setTimeout(r,60)); }
  await new Promise(r=>setTimeout(r,700)); window.scrollTo(0,0);
  const o = SIG(), c = cp[tag] || [];
  const issues = [];
  const has = (arr,k,v,n) => arr.some(x=>x.k===k && (x.v===v || (x.v && v && x.v.slice(0,n)===v.slice(0,n))));
  for (const k of ['I','H','B','V']) {
    const n = k==='I'?14:(k==='H'?22:12);
    const miss = [...new Set(o.filter(x=>x.k===k && x.v && !has(c,k,x.v,n)).map(x=>short(x.v)))];
    const extra = [...new Set(c.filter(x=>x.k===k && x.v && !has(o,k,x.v,n)).map(x=>short(x.v)))];
    if (miss.length) issues.push(`falta ${k}:${miss.slice(0,6).join('|')}${miss.length>6?' +'+(miss.length-6):''}`);
    if (extra.length) issues.push(`sobra ${k}:${extra.slice(0,4).join('|')}${extra.length>4?' +'+(extra.length-4):''}`);
  }
  const sty=[];
  for (const h of o.filter(x=>x.k==='H')) { const m=c.find(x=>x.k==='H'&&x.v.slice(0,22)===h.v.slice(0,22)); if(!m) continue;
    const r=m.fs/h.fs; if(r<0.75||r>1.33) sty.push(`${short(h.v)} ${h.fs}→${m.fs}px`);
    if(cdist(h.c,m.c)>90) sty.push(`${short(h.v)} color ${h.c}→${m.c}`); }
  if (sty.length) issues.push('estilo: '+sty.slice(0,4).join('; ')+(sty.length>4?' +'+(sty.length-4):''));
  const cnt = k => o.filter(x=>x.k===k).length+'/'+c.filter(x=>x.k===k).length;
  return `${host}${path} [${tag}] I${cnt('I')} H${cnt('H')} B${cnt('B')} V${cnt('V')}` + (issues.length? ' → '+issues.join(' ; ') : ' OK');
}
