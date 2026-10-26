// Compara la página original (ventana actual) con la copia (cargada en iframe same-origin vía srcdoc)
const sleep = ms => new Promise(r => setTimeout(r, ms));
function name(e) {
  const t = e.tagName;
  if (t === 'IMG') return (e.currentSrc || e.src).split('/').pop().split('?')[0].replace(/-\d+x\d+(?=\.)/, '').replace(/-scaled(?=\.)/, '').slice(0, 30);
  if (t === 'VIDEO' || t === 'IFRAME') return (e.currentSrc || e.src || '').split('/').pop().slice(0, 24);
  return e.innerText.trim().replace(/\s+/g, ' ').slice(0, 24);
}
async function sig(win) {
  const d = win.document;
  d.getElementById('wpadminbar')?.remove();
  d.documentElement.style.setProperty('margin-top', '0px', 'important');
  for (let y = 0; y < d.body.scrollHeight; y += 600) { win.scrollTo(0, y); await sleep(90); }
  win.scrollTo(0, 0); await sleep(1500);
  const vis = e => { const r = e.getBoundingClientRect(); const s = win.getComputedStyle(e);
    return r.width > 2 && r.height > 2 && s.visibility !== 'hidden' && s.display !== 'none' && +s.opacity > 0.05; };
  return [...d.querySelectorAll('h1,h2,h3,h4,h5,h6,p,li,img,video,iframe,.elementor-button,.elementor-icon')].filter(vis).map(e => {
    const r = e.getBoundingClientRect(); const s = win.getComputedStyle(e); const t = e.tagName.toLowerCase();
    const hd = e.closest('[data-elementor-type="header"], header'); const top = hd ? hd.getBoundingClientRect().top + win.scrollY : 0;
    return { k: t + ':' + name(e), y: Math.round(r.top + win.scrollY - top) + (hd ? 'H' : ''), x: Math.round(r.left), w: Math.round(r.width), h: Math.round(r.height),
      st: /^(img|video|iframe)$/.test(t) ? '' : `${s.fontFamily.split(',')[0].replace(/"/g, '')} ${s.fontSize} ${s.fontWeight} ${s.color} ${s.textAlign}`,
      bg: s.backgroundColor };
  });
}
export async function compare(copyUrl) {
  const html = await (await fetch(copyUrl, { cache: 'no-store' })).text();
  const f = document.createElement('iframe');
  f.style.cssText = `position:fixed;left:0;top:0;width:${innerWidth}px;height:${innerHeight}px;border:0;z-index:-1;opacity:0;pointer-events:none`;
  f.srcdoc = html.replace(/<head([^>]*)>/i, `<head$1><base href="${copyUrl}">`);
  document.body.appendChild(f);
  await new Promise(r => f.onload = r); await sleep(2500);
  const [A, B] = [await sig(window), await sig(f.contentWindow)];
  const hA = document.documentElement.scrollHeight, hB = f.contentDocument.documentElement.scrollHeight;
  f.remove();
  // emparejar por clave en orden
  const out = []; let j = 0; const usedB = new Set();
  for (const a of A) {
    let m = -1;
    for (let k = j; k < Math.min(B.length, j + 25); k++) if (!usedB.has(k) && B[k].k === a.k) { m = k; break; }
    if (m < 0) { out.push('FALTA ' + a.k + '@' + a.y); continue; }
    usedB.add(m); j = m + 1; const b = B[m]; const dif = [];
    if (String(a.y) !== String(b.y) && Math.abs(parseInt(a.y) - parseInt(b.y)) > 3) dif.push(`y ${a.y}→${b.y}`);
    if (Math.abs(a.x - b.x) > 3) dif.push(`x ${a.x}→${b.x}`);
    if (Math.abs(a.w - b.w) > 3) dif.push(`w ${a.w}→${b.w}`);
    if (Math.abs(a.h - b.h) > 3) dif.push(`h ${a.h}→${b.h}`);
    if (a.st !== b.st) dif.push(`st ${a.st} → ${b.st}`);
    if (dif.length) out.push(a.k + '@' + a.y + ': ' + dif.join('; '));
  }
  B.forEach((b, k) => { if (!usedB.has(k)) out.push('SOBRA ' + b.k + '@' + b.y); });
  return `alto ${hA}→${hB} · ${A.length}/${B.length} elementos · ${out.length} diferencias\n` + out.slice(0, 60).join('\n');
}
