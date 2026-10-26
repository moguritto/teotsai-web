// Firma de maquetación para comparar original y copia (temporal)
const vis = e => { const r = e.getBoundingClientRect(); const s = getComputedStyle(e);
  return r.width > 2 && r.height > 2 && s.visibility !== 'hidden' && s.display !== 'none' && +s.opacity > 0.05; };
function name(e) {
  if (e.tagName === 'IMG') return (e.currentSrc || e.src).split('/').pop().split('?')[0].replace(/-\d+x\d+(?=\.)/, '').replace(/-scaled(?=\.)/, '').slice(0, 30);
  if (e.tagName === 'VIDEO' || e.tagName === 'IFRAME') return (e.currentSrc || e.src || '').split('/').pop().slice(0, 24);
  return e.innerText.trim().replace(/\s+/g, ' ').slice(0, 24);
}
export async function sig() {
  document.getElementById('wpadminbar')?.remove();
  document.documentElement.style.setProperty('margin-top', '0px', 'important');
  await new Promise(r => setTimeout(r, 1500));
  for (let y = 0; y < document.body.scrollHeight; y += 600) { scrollTo(0, y); await new Promise(r => setTimeout(r, 90)); }
  document.querySelectorAll('.elementor-invisible').forEach(e => e.classList.remove('elementor-invisible'));
  scrollTo(0, 0); await new Promise(r => setTimeout(r, 1500));
  const els = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,li,img,video,iframe,.elementor-button,.elementor-icon')].filter(vis);
  const H = els.map(e => { const r = e.getBoundingClientRect(); const s = getComputedStyle(e);
    const t = e.tagName.toLowerCase();
    const hd = e.closest('[data-elementor-type="header"], header'); const top = hd ? hd.getBoundingClientRect().top + scrollY : 0;
    const st = /^(img|video|iframe)$/.test(t) ? '' : `|${s.fontFamily.split(',')[0].replace(/"/g, '')} ${s.fontSize} ${s.fontWeight} ${s.color}`;
    return `${t}:${name(e)}@${hd ? 'H' : ''}${Math.round(r.top + scrollY - top)},${Math.round(r.left)},${Math.round(r.width)}x${Math.round(r.height)}${st}`; });
  window.__H = H;
  let x = 0; for (const c of H.join('\n')) x = (x * 31 + c.charCodeAt(0)) | 0;
  return `${document.documentElement.scrollHeight}/${H.length}`;
}
