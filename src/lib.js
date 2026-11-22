// lib.js · dados do site, ajudantes e componentes (marcação do design system Prediforma, prefixo pf-)
const fs = require('fs');
const path = require('path');

const ARGV = process.argv.slice(2);
const MODO = { revisao: ARGV.includes('--revisao'), live: ARGV.includes('--live') };

const SITE = {
  nome: 'Prediforma Engenharia',
  razao: 'Prediforma Engenharia LTDA',
  cnpj: '50.281.691/0001-17',
  credito: { nome: 'Z Marketing', url: 'https://agenciazmarketing.com.br/' },
  url: 'https://prediformaengenharia.site',
  telExibe: '(47) 98825-9089',
  telE164: '+55 47 98825-9089',
  telHref: 'tel:+5547988259089',
  waNumero: '5547988259089',
  instagram: 'https://www.instagram.com/prediformaengenharia/',
  cidades: ['Blumenau', 'Indaial', 'Timbó', 'Gaspar', 'Pomerode', 'Brusque'],
  bairros: ['Vila Nova', 'Victor Konder', 'Itoupava Seca', 'Centro', 'Ponta Aguda'],
  horario: 'segunda a sexta, das 7h às 17h',
  frase: 'Conhecimento técnico para conservar. Confiança para realizar.',
  rua: 'Rua Rio dos Cedros, 40',
  bairro: 'Boa Vista',
  cidadeUF: 'Blumenau/SC',
  cep: null,
  geo: { lat: -26.9013137, lng: -49.0679169 },
  maps: 'https://maps.app.goo.gl/dFjQh2DerAw314oA8',
};
SITE.enderecoTxt = `${SITE.rua} · ${SITE.bairro} · ${SITE.cidadeUF}`;
const CIDADES_TXT = 'Blumenau, Indaial, Timbó, Gaspar, Pomerode e Brusque';

const WAPATH = 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z';
const GI = (d, fill) => '<svg class="pf-i" viewBox="0 0 24 24" ' + (fill ? 'fill="currentColor"' : 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"') + ' aria-hidden="true">' + d + '</svg>';
const GLIF = {
  instagram: GI('<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none"/>'),
  google: GI('<path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>', true),
  pin: GI('<path d="M12 21s7-6.2 7-11a7 7 0 0 0-14 0c0 4.8 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/>'),
  relogio: GI('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
  telefone: GI('<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/>'),
  whatsapp: '<svg class="pf-i" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="' + WAPATH + '"/></svg>',
};
const IMGS = JSON.parse(fs.readFileSync(path.join(__dirname, 'imagens.json'), 'utf8'));

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const waLink = (msg) => `https://wa.me/${SITE.waNumero}?text=${encodeURIComponent(msg)}`;

// Bloco provisório: só aparece no build de revisão (com contorno tracejado). Em produção, some.
const prov = (html) => (MODO.revisao ? `<div data-status="provisorio">${html}</div>` : '');
const provInline = (html) => (MODO.revisao ? html : '');

const WA = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="${WAPATH}"/></svg>`;
const IC = (d) => `<svg class="pf-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const ICON = {
  rolo: IC('<rect x="3" y="3" width="14" height="6" rx="1"/><path d="M17 6h3v5H11v3"/><rect x="9" y="14" width="4" height="7" rx="1"/>'),
  gota: IC('<path d="M12 3s6 6.2 6 10.5A6 6 0 0 1 6 13.5C6 9.2 12 3 12 3Z"/><path d="M9.5 14a2.5 2.5 0 0 0 2.5 2.5"/>'),
  ancora: IC('<circle cx="12" cy="5" r="2"/><path d="M12 7v13M6 12H3a9 9 0 0 0 18 0h-3M8 12h8"/>'),
  predio: IC('<rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2M11 21v-3h2v3"/>'),
  escudo: IC('<path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6l7-3Z"/><path d="M9 12l2 2 4-4"/>'),
  capacete: IC('<path d="M4 16a8 8 0 0 1 16 0"/><path d="M3 16h18v2H3zM12 8V5M9 9l-1-3M15 9l1-3"/>'),
  prancheta: IC('<rect x="6" y="4" width="12" height="17" rx="1"/><path d="M9 4h6v3H9zM9 12l2 2 4-4M9 18h6"/>'),
  trinca: IC('<path d="M5 4l4 6-3 3 5 3-2 5M15 4l-2 5 4 2-3 4 3 5"/>'),
  fachada: IC('<path d="M3 21V9l9-6 9 6v12M9 21v-6h6v6M3 21h18"/>'),
};

// ---------- imagens ----------
function img(n, o = {}) {
  const k = String(n).padStart(2, '0');
  const m = IMGS[n];
  const sizes = o.sizes || '(max-width: 880px) 100vw, 560px';
  const eager = o.eager ? ' fetchpriority="high"' : ' loading="lazy"';
  const style = o.pos ? ` style="object-position:${o.pos}"` : '';
  return `<img src="/img/obra-${k}-1200.webp" srcset="/img/obra-${k}-640.webp 640w, /img/obra-${k}-1200.webp 1200w" sizes="${sizes}" width="${m.w}" height="${m.h}" alt="${esc(o.alt)}"${eager} decoding="async"${style}${o.cls ? ` class="${o.cls}"` : ''}>`;
}

// ---------- componentes ----------
const btn = (txt, msg, posicao, o = {}) =>
  `<a class="pf-btn${o.lg ? ' pf-btn--lg' : ''}${o.inverse ? ' pf-btn--inverse' : ''}${o.secondary ? ' pf-btn--secondary' : ''}" href="${waLink(msg)}" rel="noopener" data-evento="clique_whatsapp" data-posicao="${posicao}">${WA}${txt}</a>`;
const btnLink = (txt, href, o = {}) => `<a class="pf-btn${o.secondary ? ' pf-btn--secondary' : ''}${o.inverse ? ' pf-btn--inverse' : ''}${o.lg ? ' pf-btn--lg' : ''}" href="${href}">${txt}</a>`;
const modules = '<div class="pf-modules" aria-hidden="true"><i></i><i></i><i></i></div>';
const link = (txt, href) => `<a class="pf-link pf-link--arrow" href="${href}">${txt}</a>`;
const chips = (arr) => `<div class="pf-chips">${arr.map(([t, h]) => `<a class="pf-chip" href="${h}">${t}</a>`).join('')}</div>`;
const chipsStatic = (arr) => `<div class="pf-chips">${arr.map((t) => `<span class="pf-chip pf-chip--static">${t}</span>`).join('')}</div>`;
const callout = (titulo, html, o = {}) => `<div class="pf-callout${o.alerta ? ' pf-callout--alerta' : ''}"><strong>${titulo}</strong>${html}</div>`;
const card = (icone, h, p, l) => `<article class="pf-card">${ICON[icone]}<h3>${h}</h3><p>${p}</p>${l ? link(l[0], l[1]) : ''}</article>`;
const reason = (n, t) => `<div class="pf-reason"><b>${n}</b>${t}</div>`;
const credential = (b, t) => `<div class="pf-credential"><b>${b}</b>${t}</div>`;
const steps = (arr) => `<ol class="pf-steps">${arr.map(([t, d]) => `<li class="pf-step"><strong>${t}</strong>${d}</li>`).join('')}</ol>`;
const faq = (items) => `<div class="pf-faq">${items.map(([q, a], i) => `<details${i === 0 ? ' open' : ''}><summary>${q}</summary><div class="pf-faq__answer"><p>${a}</p></div></details>`).join('')}</div>`;
const section = (inner, o = {}) => !String(inner).trim() ? '' : `<section class="pf-section${o.subtle ? ' pf-section--subtle' : ''}"${o.id ? ` id="${o.id}"` : ''}><div class="pf-container">${inner}</div></section>`;
const split = (a, b) => `<div class="pf-split"><div>${a}</div><div>${b}</div></div>`;
const band = (inner, o = {}) => `<div class="pf-band${o.cta ? ' pf-band--cta' : ''}"${o.id ? ` id="${o.id}"` : ''}><div class="pf-container">${inner}</div></div>`;
const caption = (t) => `<p class="pf-caption">${t}</p>`;

const BA_POS = { 7: '50% 30%', 8: '18% 50%' }; // enquadramento de cada foto, para o prédio aparecer inteiro
// Lado a lado (padrão): cada foto com o seu enquadramento. o.slider = comparador deslizante, só para pares com o MESMO enquadramento.
const ba = (a, b, leg, altA, altB, o = {}) => `<div><div class="pf-ba${o.slider ? '' : ' pf-ba--lado'}"${o.slider ? ' data-slider data-label="Antes e depois da fachada"' : ''}>
  <figure>${img(a, { alt: altA, pos: BA_POS[a] || 'center', sizes: '(max-width: 600px) 100vw, 280px' })}<span class="pf-badge">Antes</span></figure>
  <figure>${img(b, { alt: altB, pos: BA_POS[b] || 'center', sizes: '(max-width: 600px) 100vw, 280px' })}<span class="pf-badge">Depois</span></figure>
  ${o.slider ? '<span class="pf-ba__handle" aria-hidden="true">⇆</span>' : ''}
</div>${caption(leg)}</div>`;

const credentials = (extra) => `<div class="pf-container"><div class="pf-credentials">
  ${credential('Engenheiro civil', 'responsável pela obra')}
  ${credential('NR-35', 'equipes treinadas para altura')}
  ${credential('2 a 5 anos', 'de garantia, conforme o serviço')}
  ${credential('Blumenau', 'e região')}
</div></div>`;

function hero({ h1, lead, msg, ctaTxt, micro, foto, selo, eyebrow, sec }) {
  const fotoHtml = foto
    ? `<div class="pf-photo">${foto}${selo ? `<div class="pf-seal"><b>Engenheiro civil à frente</b>Especialização em patologias das construções</div>` : ''}</div>`
    : '';
  const secBtn = sec === null ? '' : `<a class="pf-btn pf-btn--secondary pf-btn--lg" href="${(sec || ['', '/obras/'])[1]}">${(sec || ['Ver obras realizadas'])[0]}</a>`;
  return `<div class="pf-hero${foto ? '' : ' pf-hero--solo'}">
  <div class="pf-container pf-hero__grid"><div>${eyebrow ? `<span class="pf-eyebrow">${eyebrow}</span>` : modules}<h1>${h1}</h1><p class="pf-lead">${lead}</p>
  <div class="pf-btns">${btn(ctaTxt || 'Quero pedir um orçamento', msg, 'hero', { lg: true })}${secBtn}</div>
  <p class="pf-micro" style="margin-top:var(--pf-space-3)">${micro || 'Você fala direto pelo WhatsApp. Sem compromisso.'}</p></div>${fotoHtml}</div>
  ${credentials()}
</div>`;
}

const mapsBtn = (posicao, o = {}) => `<a class="pf-btn ${o.ghost ? 'pf-btn--ghost-inverse' : 'pf-btn--secondary'} pf-btn--lg" href="${SITE.maps}" target="_blank" rel="noopener" data-evento="clique_maps" data-posicao="${posicao}">${GLIF.pin}Ver no Google Maps</a>`;

const ctaFinal = (titulo, texto, ctaTxt, msg) => band(`<h2>${titulo}</h2><p>${texto}</p><div class="pf-btns pf-btns--center">${btn(ctaTxt, msg, 'final', { inverse: true, lg: true })}${mapsBtn('final', { ghost: true })}</div>
  <p class="pf-micro" style="margin-top:var(--pf-space-3)">Atendimento em ${CIDADES_TXT}, de ${SITE.horario}. Sem compromisso.</p>`, { cta: true, id: 'orcamento' });

// bloco "Encontre a Prediforma no Google" (sem estrelas nem notas: a empresa ainda não tem avaliações)
const googleBlock = () => `<div class="pf-google"><div class="pf-google__icon">${GLIF.google}</div><div>
  <h2>Encontre a Prediforma no Google</h2>
  <p class="pf-measure">A Prediforma atende no endereço do cliente.</p>
  <p class="pf-measure">Já foi atendido pela Prediforma? Conte como foi no Google: a sua avaliação ajuda outros síndicos a escolher.</p>
  <div class="pf-btns"><a class="pf-btn" href="${SITE.maps}" target="_blank" rel="noopener" data-evento="clique_maps" data-posicao="bloco-google">${GLIF.google}Abrir no Google Maps</a><a class="pf-btn pf-btn--secondary" href="${SITE.maps}" target="_blank" rel="noopener" data-evento="clique_avaliar_google" data-posicao="bloco-google">Avaliar no Google</a></div></div></div>`;

const breadcrumb = (trail) => `<div class="pf-container"><nav class="pf-breadcrumb" aria-label="Você está em"><ol>${trail
  .map(([t, h], i) => (i === trail.length - 1 ? `<li aria-current="page">${t}</li>` : `<li><a href="${h}">${t}</a></li>`)).join('')}</ol></nav></div>`;

const NAV = [['Serviços', '/servicos/'], ['Para síndicos', '/para-sindicos-e-administradoras/'], ['Obras', '/obras/'], ['Sobre', '/sobre/'], ['Áreas atendidas', '/areas-atendidas/'], ['Contato', '/contato/']];
const navLinks = (atual) => NAV.map(([t, h]) => `<li><a href="${h}"${atual && atual.startsWith(h) ? ' aria-current="page"' : ''}>${t}</a></li>`).join('');

const header = (atual) => `<a class="pf-skip" href="#conteudo">Pular para o conteúdo</a>
<header class="pf-header"><div class="pf-container pf-header__bar">
  <a class="pf-logo" href="/" aria-label="Prediforma Engenharia, página inicial"><img src="/favicon.svg" alt="" width="30" height="34"><span class="pf-logo__text"><b>PREDIFORMA</b><small>Engenharia</small></span></a>
  <nav class="pf-nav pf-nav--desktop" aria-label="Principal"><ul>${navLinks(atual)}</ul></nav>
  <a class="pf-btn pf-btn--header" href="${waLink('Olá! Gostaria de solicitar um orçamento para manutenção ou pintura predial.')}" rel="noopener" data-evento="clique_whatsapp" data-posicao="cabecalho">${WA}Pedir orçamento</a>
  <details class="pf-menu"><summary aria-label="Abrir menu">☰</summary><nav aria-label="Principal (celular)"><ul>${navLinks(atual)}</ul></nav></details>
</div></header>`;

const SERVICOS = [
  ['Pintura predial', '/servicos/pintura-predial/'],
  ['Lavação predial', '/servicos/lavacao-predial/'],
  ['Pontos de ancoragem', '/servicos/pontos-de-ancoragem/'],
  ['Manutenção de fachadas', '/servicos/manutencao-de-fachadas/'],
  ['Reparo de trincas e fissuras', '/servicos/reparo-de-trincas-e-fissuras/'],
  ['Teste de percussão', '/servicos/teste-de-percussao/'],
  ['Revitalização e retrofit', '/servicos/revitalizacao-e-retrofit-de-fachadas/'],
  ['Pintura e lavação industrial', '/servicos/pintura-industrial/'],
];

const footer = () => `<footer class="pf-footer"><div class="pf-container">
  <div class="pf-footer__grid">
    <div class="pf-footer__brand">
      <a class="pf-footer__logo" href="/" aria-label="Prediforma Engenharia, página inicial"><span class="pf-footer__mark"><img src="/favicon.svg" alt="" width="30" height="34"></span><span class="pf-logo__text"><b>PREDIFORMA</b><small>Engenharia</small></span></a>
      <p class="pf-footer__tag">${SITE.frase}</p>
      <ul class="pf-social" aria-label="Redes e canais">
        <li><a href="${waLink('Olá! Gostaria de falar com a Prediforma Engenharia.')}" rel="noopener" aria-label="WhatsApp" title="WhatsApp" data-evento="clique_whatsapp" data-posicao="rodape-social">${GLIF.whatsapp}</a></li>
        <li><a href="${SITE.instagram}" target="_blank" rel="noopener" aria-label="Instagram da Prediforma" title="Instagram" data-evento="clique_instagram" data-posicao="rodape">${GLIF.instagram}</a></li>
        <li><a href="${SITE.maps}" target="_blank" rel="noopener" aria-label="Prediforma no Google" title="Google" data-evento="clique_maps" data-posicao="rodape-social">${GLIF.google}</a></li>
      </ul>
    </div>
    <nav aria-label="Serviços"><h2 class="pf-footer__h">Serviços</h2><ul class="pf-footer__list">${SERVICOS.map(([t, h]) => `<li><a href="${h}">${t}</a></li>`).join('')}</ul></nav>
    <nav aria-label="Empresa"><h2 class="pf-footer__h">Empresa</h2><ul class="pf-footer__list"><li><a href="/sobre/">Sobre</a></li><li><a href="/obras/">Obras</a></li><li><a href="/para-sindicos-e-administradoras/">Para síndicos e administradoras</a></li><li><a href="/como-contratar-pintura-predial/">Como contratar</a></li><li><a href="/areas-atendidas/">Áreas atendidas</a></li><li><a href="/perguntas-frequentes/">Perguntas frequentes</a></li><li><a href="/contato/">Contato</a></li></ul></nav>
    <div><h2 class="pf-footer__h">Contato</h2><ul class="pf-footer__contact">
      <li>${GLIF.pin}<span><strong>${SITE.rua}</strong><br>${SITE.bairro}, ${SITE.cidadeUF}<br><small>Endereço da empresa. A Prediforma não recebe clientes aqui: atende no endereço do cliente.</small></span></li>
      <li>${GLIF.relogio}<span>${SITE.horario.charAt(0).toUpperCase() + SITE.horario.slice(1)}<br><small>Sábados, domingos e feriados: fechado</small></span></li>
      <li>${GLIF.whatsapp}<a href="${waLink('Olá! Gostaria de falar com a Prediforma Engenharia.')}" rel="noopener" data-evento="clique_whatsapp" data-posicao="rodape">WhatsApp ${SITE.telExibe}</a></li>
      <li>${GLIF.telefone}<a href="${SITE.telHref}" data-evento="clique_telefone" data-posicao="rodape">Ligar ${SITE.telExibe}</a></li>
      <li>${GLIF.instagram}<a href="${SITE.instagram}" target="_blank" rel="noopener" data-evento="clique_instagram" data-posicao="rodape">@prediformaengenharia</a></li>
      <li>${GLIF.google}<a href="${SITE.maps}" target="_blank" rel="noopener" data-evento="clique_maps" data-posicao="rodape">Ver no Google Maps</a></li>
    </ul></div>
  </div>
  <div class="pf-footer__bottom"><p>© ${new Date().getFullYear()} ${SITE.razao} · CNPJ ${SITE.cnpj}</p><p class="pf-footer__cidades">Atendimento em ${CIDADES_TXT}</p><p><a href="/politica-de-privacidade/">Política de privacidade</a></p><p class="pf-footer__credito">Site desenvolvido por <a href="${SITE.credito.url}" target="_blank" rel="noopener">${SITE.credito.nome}</a></p></div>
</div></footer>
<a class="pf-wa-float" href="${waLink('Olá! Gostaria de solicitar um orçamento para manutenção ou pintura predial.')}" rel="noopener" aria-label="Pedir orçamento pelo WhatsApp" title="Pedir orçamento pelo WhatsApp" data-evento="clique_whatsapp" data-posicao="flutuante">${WA}</a>`;

// ---------- dados estruturados ----------
const ldNegocio = () => ({
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  '@id': SITE.url + '/#negocio',
  name: SITE.nome,
  legalName: SITE.razao,
  taxID: SITE.cnpj,
  url: SITE.url + '/',
  telephone: SITE.telE164,
  address: { '@type': 'PostalAddress', streetAddress: SITE.rua, addressLocality: 'Blumenau', addressRegion: 'SC', addressCountry: 'BR' },
  geo: { '@type': 'GeoCoordinates', latitude: SITE.geo.lat, longitude: SITE.geo.lng },
  hasMap: SITE.maps,
  image: SITE.url + '/img/og-padrao.jpg',
  logo: SITE.url + '/favicon.svg',
  description: 'Manutenção predial especializada em fachadas: pintura predial, lavação, pontos de ancoragem com laudo, reparo de trincas e teste de percussão, para condomínios em Blumenau e região.',
  areaServed: SITE.cidades.map((c) => ({ '@type': 'City', name: c, containedInPlace: { '@type': 'State', name: 'Santa Catarina' } })),
  openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '07:00', closes: '17:00' }],
  sameAs: [SITE.instagram, SITE.maps],
  foundingDate: '2023-04-12',
});
const ldServico = (nome, desc, url) => ({
  '@context': 'https://schema.org', '@type': 'Service', name: nome, description: desc, url: SITE.url + url,
  provider: { '@id': SITE.url + '/#negocio' }, areaServed: SITE.cidades.map((c) => ({ '@type': 'City', name: c })),
});
const ldFaq = (items) => ({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });
const ldCrumbs = (trail) => ({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: trail.map(([t, h], i) => ({ '@type': 'ListItem', position: i + 1, name: t, item: SITE.url + h })) });

module.exports = { GLIF, googleBlock, mapsBtn, MODO, SITE, CIDADES_TXT, esc, waLink, prov, provInline, WA, ICON, img, btn, btnLink, modules, link, chips, chipsStatic, callout, card, reason, credential, steps, faq, section, split, band, caption, ba, credentials, hero, ctaFinal, breadcrumb, header, footer, SERVICOS, ldNegocio, ldServico, ldFaq, ldCrumbs };
