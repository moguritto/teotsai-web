import os, re, shutil, sys
REPO = "/home/claude/teotsai-web/docs"
S = "/tmp/claude-0/-home-claude/3e78da10-e2fd-5d5b-b161-d1db544604ec/scratchpad"
WA = "https://wa.me/34644632663"
MAIL = "info@teotsai.com"

CSS = """:root{--lila:#8680CD;--lila-osc:#5f59a8;--negro:#1d1d1f;--texto:#4a4a4a;--gris:#F4F4F4;--crema:#FDF0C3;--ouro:#E0B22D;--branco:#fff;
--fuente:"Nunito Sans",sans-serif;--titulos:"Nunito Sans",sans-serif;--ancho:1140px}
*,*::before,*::after{box-sizing:border-box}html{scroll-behavior:smooth}
body{margin:0;font-family:var(--fuente);color:var(--texto);background:#fff;font-size:17px;line-height:1.7}
img{max-width:100%;height:auto;display:block}a{color:var(--lila-osc)}
.ancho{max-width:var(--ancho);margin:0 auto;padding:0 22px}
header{position:sticky;top:0;z-index:10;background:rgba(255,255,255,.96);border-bottom:1px solid #eee}
header .ancho{display:flex;align-items:center;justify-content:space-between;gap:16px;min-height:78px}
.marca{display:flex;align-items:center;gap:10px;text-decoration:none;color:var(--negro)}
.marca img{height:50px;width:auto}.marca span{font-weight:300;letter-spacing:.32em;font-size:15px;color:var(--lila);border-left:1px solid #ccc;padding-left:10px}
nav ul{list-style:none;margin:0;padding:0;display:flex;gap:26px;flex-wrap:wrap}
nav a{font-size:14px;text-transform:uppercase;letter-spacing:.06em;color:var(--lila);text-decoration:none;font-weight:600}
nav a:hover{color:var(--negro)}
.heroe{position:relative;min-height:560px;display:flex;align-items:center;background:#333 center/cover no-repeat;color:#fff}
.heroe::before{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(29,29,31,.72),rgba(134,128,205,.35))}
.heroe .ancho{position:relative}
.heroe .antetitulo{font-size:14px;letter-spacing:.3em;text-transform:uppercase;opacity:.9}
.heroe h1{font-family:var(--titulos);font-weight:300;font-size:58px;line-height:1.1;margin:.3em 0 .4em;max-width:760px}
.heroe p{font-size:20px;max-width:640px;margin:0 0 28px}
.boton{display:inline-block;padding:13px 28px;border-radius:40px;background:var(--lila);color:#fff;text-decoration:none;font-weight:700;font-size:15px;letter-spacing:.04em}
.boton:hover{background:var(--lila-osc)}.boton.claro{background:#fff;color:var(--lila-osc)}
.bloque{padding:84px 0}.bloque.gris{background:var(--gris)}.bloque.crema{background:#FBF7EA}
.bloque h2{font-family:var(--titulos);font-weight:300;font-size:38px;color:var(--negro);margin:0 0 18px;line-height:1.2}
.bloque h2 b{color:var(--lila);font-weight:600}
.entradilla{font-size:19px;max-width:760px}
.dos{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center}
.dos img{border-radius:6px;box-shadow:0 18px 40px rgba(0,0,0,.12)}
.tarxetas{display:grid;grid-template-columns:repeat(3,1fr);gap:26px;margin-top:38px}
.tarxeta{background:#fff;border-radius:8px;padding:30px 28px;box-shadow:0 6px 24px rgba(0,0,0,.06);border-top:4px solid var(--lila)}
.tarxeta h3{margin:0 0 10px;font-size:20px;color:var(--negro);font-weight:700}
.tarxeta p{margin:0;font-size:16px}
.numero{font-size:13px;color:var(--ouro);font-weight:800;letter-spacing:.2em}
.lista-principios{display:grid;grid-template-columns:repeat(2,1fr);gap:22px 48px;margin-top:30px}
.lista-principios div{border-left:3px solid var(--lila);padding-left:18px}
.lista-principios h3{margin:0 0 6px;color:var(--negro);font-size:19px}
.lista-principios p{margin:0;font-size:16px}
.cita{text-align:center;font-size:26px;font-weight:300;color:var(--negro);max-width:820px;margin:0 auto;line-height:1.5}
.cita small{display:block;margin-top:14px;font-size:14px;color:var(--lila);letter-spacing:.2em;text-transform:uppercase}
.irmans{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;margin-top:30px}
.irmans a{display:block;background:#fff;border-radius:8px;padding:22px;text-decoration:none;color:var(--texto);box-shadow:0 4px 18px rgba(0,0,0,.05)}
.irmans strong{display:block;color:var(--lila-osc);font-size:17px;margin-bottom:6px}
.irmans span{font-size:14.5px;line-height:1.55}
.contacto{background:var(--lila);color:#fff;text-align:center}
.contacto h2{color:#fff}.contacto p{max-width:640px;margin:0 auto 26px;font-size:18px}
.contacto .botons{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
footer{background:var(--negro);color:#bbb;font-size:14.5px;padding:44px 0}
footer .ancho{display:flex;justify-content:space-between;gap:24px;flex-wrap:wrap}
footer a{color:#ddd;text-decoration:none}footer a:hover{color:#fff}
.legal h1{font-family:var(--titulos);font-weight:300;font-size:40px;color:var(--negro)}
.legal{padding:60px 0 80px}
@media(max-width:900px){.dos,.lista-principios{grid-template-columns:1fr}.tarxetas{grid-template-columns:1fr}.irmans{grid-template-columns:1fr 1fr}
.heroe h1{font-size:38px}.heroe{min-height:480px}.bloque{padding:58px 0}.bloque h2{font-size:30px}nav ul{gap:14px}}
@media(max-width:560px){header .ancho{flex-direction:column;align-items:flex-start;padding-top:10px;padding-bottom:10px}.marca img{height:40px}
.irmans{grid-template-columns:1fr}.cita{font-size:21px}.heroe p{font-size:18px}}
"""

def page(rel, title, desc, body, active=""):
    nav = [("", "Inicio"), ("#que-e", "Que é"), ("#servizos", "Que facemos"), ("#principios", "Principios"), ("#contacto", "Contacto")]
    navh = "".join(f'<li><a href="{rel}{h}">{t}</a></li>' for h, t in nav)
    return f"""<!doctype html>
<html lang="gl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{title}</title><meta name="description" content="{desc}">
<link rel="canonical" href="https://teotsai.com/{active}">
<link rel="icon" href="{rel}img/favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="{rel}estilo.css"></head><body>
<header><div class="ancho"><a class="marca" href="{rel}"><img src="{rel}img/logo-teots.png" alt="TEOTS" width="488" height="150"><span>AI</span></a>
<nav><ul>{navh}</ul></nav></div></header>
{body}
<footer><div class="ancho"><div><strong style="color:#fff">TEOTS AI</strong><br>Intelixencia artificial para proxectos de consciencia.<br>Un proxecto da familia TEOTS · Galicia</div>
<div><a href="{rel}aviso-legal/">Aviso legal</a> · <a href="{rel}politica-de-privacidad/">Política de privacidade</a><br><a href="mailto:{MAIL}">{MAIL}</a><br>© 2026 TEOTS AI</div></div></footer>
</body></html>"""

INDEX = f"""<section class="heroe" style="background-image:url(img/portada.webp)"><div class="ancho">
<div class="antetitulo">TEOTS AI · The Essence of the Soul</div>
<h1>Intelixencia artificial ao servizo da consciencia</h1>
<p>Acompañamos a terapeutas, facilitadores e proxectos de crecemento persoal e colectivo a usar a tecnoloxía con calma, con sentido e sen perder o humano.</p>
<a class="boton" href="#contacto">Falemos do teu proxecto</a></div></section>

<section class="bloque" id="que-e"><div class="ancho dos">
<div><h2>Que é <b>TEOTS AI</b></h2>
<p class="entradilla">TEOTS AI é a rama tecnolóxica de TEOTS. Nace dunha pregunta sinxela: como pode a intelixencia artificial axudar a quen acompaña procesos de transformación, sen converterse no centro?</p>
<p>Cremos que a tecnoloxía pode liberar tempo e atención para o esencial: a presenza, a escoita e o encontro. Por iso deseñamos ferramentas pequenas, claras e feitas á medida, que se adaptan á forma de traballar de cada proxecto e non ao revés.</p>
<p>Traballamos desde a psicoloxía humanista e transpersoal, coa convicción de que todo proceso de crecemento é, ante todo, unha experiencia humana.</p></div>
<img src="img/sala.webp" alt="Sala de traballo de Espacio TEOTS" width="1200" height="900" loading="lazy"></div></section>

<section class="bloque gris" id="servizos"><div class="ancho">
<h2>Que <b>facemos</b></h2>
<p class="entradilla">Ferramentas e acompañamento para que a túa enerxía vaia ao que importa.</p>
<div class="tarxetas">
<div class="tarxeta"><div class="numero">01</div><h3>Documentación de procesos</h3><p>Axuda para ordenar notas de sesións, grupos e retiros nun formato propio, sempre revisado e aprobado por ti.</p></div>
<div class="tarxeta"><div class="numero">02</div><h3>Bibliotecas vivas</h3><p>Os teus textos, meditacións, audios e recursos organizados para atopar en segundos o que necesitas en cada momento.</p></div>
<div class="tarxeta"><div class="numero">03</div><h3>Retiros e encontros</h3><p>Organización de inscricións, materiais e comunicación de retiros e talleres, cun ton coidado e coherente co teu proxecto.</p></div>
<div class="tarxeta"><div class="numero">04</div><h3>Webs sinxelas e conscientes</h3><p>Páxinas lixeiras, rápidas e fáciles de manter, sen capas innecesarias nin custos ocultos.</p></div>
<div class="tarxeta"><div class="numero">05</div><h3>Formación en IA</h3><p>Sesións prácticas para profesionais do acompañamento: que pode facer a IA, que non debe facer e como usala con criterio.</p></div>
<div class="tarxeta"><div class="numero">06</div><h3>Asesoramento ético</h3><p>Revisamos contigo como protexer a intimidade das persoas que acompañas antes de incorporar calquera ferramenta.</p></div>
</div></div></section>

<section class="bloque"><div class="ancho"><p class="cita">«A tecnoloxía ten sentido cando nos devolve tempo para estar presentes.»<small>A mirada de TEOTS AI</small></p></div></section>

<section class="bloque crema" id="principios"><div class="ancho dos">
<img src="img/natureza.webp" alt="Paisaxe de outono vista desde o aire" width="1280" height="719" loading="lazy">
<div><h2>Os nosos <b>principios</b></h2>
<div class="lista-principios" style="grid-template-columns:1fr">
<div><h3>A persoa no centro</h3><p>A IA acompaña; a escoita, o criterio e as decisións seguen sendo humanos.</p></div>
<div><h3>Intimidade coidada</h3><p>A información sensible trátase co mínimo imprescindible e, sempre que se pode, sen saír do teu equipo.</p></div>
<div><h3>Revisión humana</h3><p>Nada chega a outra persoa sen que ti o leas e o aprobes.</p></div>
<div><h3>Sinxeleza</h3><p>Preferimos o pequeno que funciona hoxe ao grande que complica mañá.</p></div>
</div></div></div></section>

<section class="bloque gris"><div class="ancho"><h2>A familia <b>TEOTS</b></h2>
<p class="entradilla">TEOTS AI forma parte dun ecosistema de proxectos dedicados ao desenvolvemento da consciencia.</p>
<div class="irmans">
<a href="https://teots.org/"><strong>TEOTS</strong><span>Psicoloxía humanista e transpersoal.</span></a>
<a href="https://espacioteots.org/"><strong>Espacio TEOTS</strong><span>Salas para terapias e actividades conscientes en Lugo e A Coruña.</span></a>
<a href="https://apder.org/"><strong>APDER</strong><span>Divulgación, educación e investigación psicodélica.</span></a>
<a href="https://ianivillage.com/"><strong>Iani Village</strong><span>Retiros de consciencia na natureza.</span></a>
</div></div></section>

<section class="bloque contacto" id="contacto"><div class="ancho"><h2>Falemos</h2>
<p>Se tes un proxecto de consciencia e queres saber como pode axudarche a tecnoloxía, escríbenos. Respondemos persoalmente.</p>
<div class="botons"><a class="boton claro" href="{WA}" target="_blank" rel="noopener">Escríbenos por WhatsApp</a>
<a class="boton claro" href="mailto:{MAIL}">Escríbenos por correo</a></div></div></section>"""

def legal_main(path):
    h = open(os.path.join(REPO, path, "index.html"), encoding="utf-8").read()
    m = re.search(r"<main>(.*?)</main>", h, re.S)
    inner = m.group(1)
    inner = re.sub(r'\sstyle="[^"]*"', "", inner)
    inner = inner.replace('class="como-h2"', "")
    return f'<main class="legal"><div class="ancho">{re.sub(r"<section[^>]*>|</section>|<div class=\"ancho\">", "", inner)}</div></main>'

legal_aviso = legal_main("aviso-legal")
legal_priv = legal_main("politica-de-privacidad")

# escribir
for d in ["gemini", "deepmind", "_rev"]:
    shutil.rmtree(os.path.join(REPO, d), ignore_errors=True)
for f in os.listdir(os.path.join(REPO, "img")):
    if f != "favicon.png":
        os.remove(os.path.join(REPO, "img", f))
for n in ["portada", "sala", "natureza"]:
    shutil.copy(f"{S}/{n}.webp", f"{REPO}/img/{n}.webp")
shutil.copy(f"{S}/logo_teots.png", f"{REPO}/img/logo-teots.png")
open(f"{REPO}/estilo.css", "w").write(CSS)
open(f"{REPO}/index.html", "w").write(page("", "TEOTS AI · Intelixencia artificial para proxectos de consciencia",
     "TEOTS AI acompaña a terapeutas e proxectos de consciencia a usar a intelixencia artificial con sentido e sen perder o humano.", INDEX))
open(f"{REPO}/aviso-legal/index.html", "w").write(page("../", "Aviso legal | TEOTS AI", "Aviso legal de teotsai.com", legal_aviso, "aviso-legal/"))
open(f"{REPO}/politica-de-privacidad/index.html", "w").write(page("../", "Política de privacidade | TEOTS AI", "Política de privacidade de teotsai.com", legal_priv, "politica-de-privacidad/"))
redir = lambda: '<!doctype html><html lang="gl"><head><meta charset="utf-8"><title>TEOTS AI</title><meta http-equiv="refresh" content="0; url=../"><link rel="canonical" href="https://teotsai.com/"></head><body><a href="../">TEOTS AI</a></body></html>'
for d in ["gemini", "deepmind"]:
    os.makedirs(f"{REPO}/{d}", exist_ok=True); open(f"{REPO}/{d}/index.html", "w").write(redir())
open(f"{REPO}/404.html", "w").write(page("/", "Páxina non atopada | TEOTS AI", "", '<main class="legal"><div class="ancho"><h1>Páxina non atopada</h1><p>Esta páxina xa non existe. <a href="/">Volver ao inicio</a>.</p></div></main>'))
open(f"{REPO}/sitemap.xml", "w").write('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + "".join(f"<url><loc>https://teotsai.com/{p}</loc></url>" for p in ["", "aviso-legal/", "politica-de-privacidad/"]) + "</urlset>\n")
open(f"{REPO}/CNAME", "w").write("teotsai.com\n")
print("ok")
