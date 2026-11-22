#!/usr/bin/env node
/**
 * build.js · gera o site estático em ../public
 *   node src/build.js              -> produção em preview (noindex): blocos [CONFIRMAR] ficam FORA
 *   node src/build.js --revisao    -> mostra os blocos provisórios com contorno tracejado (para a Paula revisar)
 *   node src/build.js --live       -> release: indexável (sem noindex), robots e sitemap abertos
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const L = require('./lib');
const { PAGINAS } = require('./paginas');
const { MODO, SITE, esc } = L;

const root = path.join(__dirname, '..');
const pub = path.join(root, 'public');
const vendor = path.join(__dirname, 'vendor');
const write = (rel, content) => { const f = path.join(pub, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, content); };

// limpa tudo, exceto img e fonts (gerados por outros scripts)
for (const e of fs.readdirSync(pub)) { if (e === 'img' || e === 'fonts') continue; fs.rmSync(path.join(pub, e), { recursive: true, force: true }); }

// ---------- CSS e JS (com hash no nome, para cache longo) ----------
const fontFace = (fam, peso, arq) => `@font-face{font-family:${fam};font-style:normal;font-weight:${peso};font-display:swap;src:url(/fonts/${arq}) format("woff2")}`;
const fontes = [
  fontFace('Montserrat', 600, 'montserrat-latin-600-normal.woff2'), fontFace('Montserrat', 700, 'montserrat-latin-700-normal.woff2'), fontFace('Montserrat', 800, 'montserrat-latin-800-normal.woff2'),
  fontFace('Inter', 400, 'inter-latin-400-normal.woff2'), fontFace('Inter', 500, 'inter-latin-500-normal.woff2'),
].join('\n');
const css = [fontes, fs.readFileSync(path.join(vendor, 'tokens.css'), 'utf8'), fs.readFileSync(path.join(vendor, 'componentes.css'), 'utf8'), fs.readFileSync(path.join(__dirname, 'extras.css'), 'utf8')].join('\n');
const track = `
/* rastreamento: dispara evento no dataLayer. Não envia nada a ninguém até uma ferramenta (GTM/GA4) ser instalada com consentimento. */
document.addEventListener('click', function (e) {
  var a = e.target.closest && e.target.closest('[data-evento]'); if (!a) return;
  var d = { event: a.getAttribute('data-evento'), pagina: location.pathname, posicao: a.getAttribute('data-posicao') || '' };
  (window.dataLayer = window.dataLayer || []).push(d);
  document.dispatchEvent(new CustomEvent('pf:evento', { detail: d }));
});`;
const js = fs.readFileSync(path.join(vendor, 'pf.js'), 'utf8') + '\n' + track + '\n';
const h8 = (s) => crypto.createHash('md5').update(s).digest('hex').slice(0, 8);
const cssName = `site.${h8(css)}.css`, jsName = `site.${h8(js)}.js`;
write(`css/${cssName}`, css);
write(`js/${jsName}`, js);
for (const f of ['favicon.svg', 'favicon.ico', 'apple-touch-icon.png', 'icon-192.png']) write(f, fs.readFileSync(path.join(vendor, f)));

// ---------- layout ----------
function layout(p) {
  const url = SITE.url + p.path;
  const ld = (p.ld || []).map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n');
  const crumbs = p.trail ? `<script type="application/ld+json">${JSON.stringify(L.ldCrumbs(p.trail))}</script>` : '';
  const og = SITE.url + '/img/og-padrao.jpg';
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(p.title)}</title>
<meta name="description" content="${esc(p.desc)}">
<link rel="canonical" href="${url}">
${!MODO.live ? '<meta name="robots" content="noindex, nofollow">\n' : p.noindex ? '<meta name="robots" content="noindex, follow">\n' : ''}<meta name="theme-color" content="#1F3B67">
<meta property="og:type" content="website"><meta property="og:locale" content="pt_BR"><meta property="og:site_name" content="${SITE.nome}">
<meta property="og:title" content="${esc(p.title)}"><meta property="og:description" content="${esc(p.desc)}"><meta property="og:url" content="${url}">
<meta property="og:image" content="${og}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="preload" as="font" type="font/woff2" href="/fonts/montserrat-latin-700-normal.woff2" crossorigin>
<link rel="preload" as="font" type="font/woff2" href="/fonts/inter-latin-400-normal.woff2" crossorigin>
<link rel="stylesheet" href="/css/${cssName}">
${ld}
${crumbs}
</head>
<body${MODO.revisao ? ' class="pf-revisao"' : ''}>
${L.header(p.atual)}
<main id="conteudo">
${p.body}
</main>
${L.footer()}
<script src="/js/${jsName}" defer></script>
</body>
</html>
`;
}

const paginas = PAGINAS();
for (const p of paginas) write(p.path.replace(/^\//, '') + 'index.html', layout(p));

// 404
const p404 = { path: '/404.html', title: 'Página não encontrada | Prediforma Engenharia', desc: 'Página não encontrada.', atual: '', trail: null, ld: [],
  body: `<div class="pf-container" style="padding-block:var(--pf-space-8)"><h1>Página não encontrada</h1><p class="pf-lead">O endereço que você abriu não existe ou mudou de lugar.</p><div class="pf-chips"><a class="pf-chip" href="/">Início</a><a class="pf-chip" href="/servicos/">Serviços</a><a class="pf-chip" href="/obras/">Obras</a><a class="pf-chip" href="/contato/">Contato</a></div><p style="margin-top:var(--pf-space-5)">${L.btn('Falar no WhatsApp', 'Olá! Gostaria de falar com a Prediforma Engenharia.', '404')}</p></div>` };
fs.writeFileSync(path.join(pub, '404.html'), layout(p404).replace('<link rel="canonical" href="' + SITE.url + '/404.html">\n', '').replace('<meta name="robots" content="noindex, nofollow">\n', '').replace('<meta name="theme-color"', '<meta name="robots" content="noindex">\n<meta name="theme-color"'));

// ---------- SEO e Cloudflare Pages ----------
const hoje = new Date().toISOString().slice(0, 10);
const urls = paginas.filter((p) => !p.noindex).map((p) => `  <url><loc>${SITE.url}${p.path}</loc><lastmod>${hoje}</lastmod></url>`).join('\n');
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
write('robots.txt', MODO.live ? `User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}/sitemap.xml\n` : `# Pré-publicação: bloqueado até o go-live (build com --live).\nUser-agent: *\nDisallow: /\n`);
const csp = "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'; font-src 'self'; connect-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'";
write('_headers', `/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  X-Frame-Options: DENY
  Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()
  Content-Security-Policy: ${csp}
${MODO.live ? '' : '  X-Robots-Tag: noindex, nofollow\n'}
/img/*
  Cache-Control: public, max-age=31536000, immutable

/fonts/*
  Cache-Control: public, max-age=31536000, immutable

/css/*
  Cache-Control: public, max-age=31536000, immutable

/js/*
  Cache-Control: public, max-age=31536000, immutable
`);
write('_redirects', `# Cloudflare Pages. Formato: origem destino status\n/index.html / 301\n/servicos/pintura /servicos/pintura-predial/ 301\n/servicos/lavacao /servicos/lavacao-predial/ 301\n/servicos/ancoragem /servicos/pontos-de-ancoragem/ 301\n/sindicos /para-sindicos-e-administradoras/ 301\n/como-contratar /como-contratar-pintura-predial/ 301\n`);

// ---------- verificações ----------
const problemas = [];
const todas = [...paginas.map((p) => ({ f: p.path.replace(/^\//, '') + 'index.html', p })), { f: '404.html', p: p404 }];
const existe = (href) => {
  let h = href.split('#')[0].split('?')[0];
  if (!h) return true;
  const alvo = path.join(pub, h.replace(/^\//, ''));
  if (h.endsWith('/')) return fs.existsSync(path.join(alvo, 'index.html'));
  return fs.existsSync(alvo);
};
for (const { f, p } of todas) {
  const html = fs.readFileSync(path.join(pub, f), 'utf8');
  const h1s = (html.match(/<h1[ >]/g) || []).length;
  if (h1s !== 1) problemas.push(`${f}: ${h1s} <h1>`);
  if (p.title.length > 65) problemas.push(`${f}: title com ${p.title.length} caracteres`);
  if (p.desc.length > 165) problemas.push(`${f}: description com ${p.desc.length} caracteres`);
  if (!MODO.revisao && /\[CONFIRMAR|\[bairro\]|PROVISÓRIO|data-status="provisorio"/.test(html)) problemas.push(`${f}: sobrou marcador provisório na produção`);
  for (const m of html.matchAll(/(?:href|src)="(\/[^"]*)"/g)) if (!/^\/\//.test(m[1]) && !existe(m[1])) problemas.push(`${f}: link/arquivo inexistente ${m[1]}`);
  for (const m of html.matchAll(/srcset="([^"]+)"/g)) for (const part of m[1].split(',')) { const u = part.trim().split(' ')[0]; if (u.startsWith('/') && !existe(u)) problemas.push(`${f}: srcset inexistente ${u}`); }
  for (const m of html.matchAll(/<img\b[^>]*>/g)) if (!/ alt="/.test(m[0])) problemas.push(`${f}: <img> sem alt`);
  for (const m of html.matchAll(/href="#([^"]+)"/g)) if (!new RegExp(`id="${m[1]}"`).test(html)) problemas.push(`${f}: âncora #${m[1]} sem destino`);
}
const modoTxt = MODO.live ? 'LIVE (indexável)' : MODO.revisao ? 'REVISÃO (blocos provisórios visíveis, noindex)' : 'PRODUÇÃO em preview (noindex)';
console.log(`Site gerado em public/  | modo: ${modoTxt}`);
console.log(`páginas: ${paginas.length} + 404 | css: ${cssName} | js: ${jsName}`);
console.log(problemas.length ? 'PROBLEMAS:\n - ' + problemas.join('\n - ') : 'verificações: nenhum problema (links, âncoras, imagens, alt, h1, títulos, marcadores).');
process.exit(problemas.length ? 1 : 0);
