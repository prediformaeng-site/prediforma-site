// Gera as imagens otimizadas (webp, sem EXIF) a partir de ../Mídias e desfoca nomes de condomínio.
// Roda: npm run imagens   (precisa do ffmpeg no PATH)
const { execFileSync } = require('child_process');
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
const origem = path.join(root, '..', 'Mídias');
const saida = path.join(root, 'public', 'img');
fs.mkdirSync(saida, { recursive: true });

// regiões a desfocar (pixels da imagem original): nomes de condomínio e número de portaria
const desfoque = {
  7: [[755, 925, 165, 90]],
  8: [[690, 735, 130, 80]],
  11: [[720, 2820, 820, 170], [1390, 3020, 180, 170]],
};
const meta = {};
function filtro(n, largura) {
  const regs = desfoque[n] || [];
  if (!regs.length) return { args: ['-vf', `scale=${largura}:-2`], tipo: 'vf' };
  let g = '[0:v]';
  let idx = 0, ult = '[0:v]';
  regs.forEach(([x, y, w, h], i) => {
    const r = Math.max(2, Math.floor(Math.min(w, h) / 8));
    g += '';
    idx++;
  });
  // cadeia: para cada região, split -> crop+blur -> overlay
  let partes = [], atual = '[0:v]';
  regs.forEach(([x, y, w, h], i) => {
    const r = Math.max(2, Math.floor(Math.min(w, h) / 8));
    const a = `a${i}`, b = `b${i}`, c = `c${i}`, o = `o${i}`;
    partes.push(`${atual}split=2[${a}][${b}]`);
    partes.push(`[${b}]crop=${w}:${h}:${x}:${y},boxblur=${r}:3[${c}]`);
    partes.push(`[${a}][${c}]overlay=${x}:${y}[${o}]`);
    atual = `[${o}]`;
  });
  partes.push(`${atual}scale=${largura}:-2[out]`);
  return { args: ['-filter_complex', partes.join(';'), '-map', '[out]'], tipo: 'fc' };
}
for (let n = 1; n <= 12; n++) {
  const entrada = path.join(origem, `pintura_predial (${n}).jpg`);
  for (const largura of [1200, 640]) {
    const f = path.join(saida, `obra-${String(n).padStart(2, '0')}-${largura}.webp`);
    const { args } = filtro(n, largura);
    execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', entrada, ...args, '-c:v', 'libwebp', '-quality', '78', '-map_metadata', '-1', f]);
  }
  const g = execFileSync('ffprobe', ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'csv=p=0', path.join(saida, `obra-${String(n).padStart(2, '0')}-1200.webp`)]).toString().trim().split(',');
  const p = execFileSync('ffprobe', ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'csv=p=0', path.join(saida, `obra-${String(n).padStart(2, '0')}-640.webp`)]).toString().trim().split(',');
  meta[n] = { w: +g[0], h: +g[1], sw: +p[0], sh: +p[1] };
  console.log('obra', n, meta[n]);
}
// imagem de compartilhamento (Open Graph) 1200x630, a partir da foto 11 (sem texto de condomínio: já desfocado)
execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', path.join(saida, 'obra-11-1200.webp'), '-vf', 'crop=1200:630:0:ih*0.30', '-q:v', '4', '-map_metadata', '-1', path.join(saida, 'og-padrao.jpg')]);
fs.writeFileSync(path.join(__dirname, 'imagens.json'), JSON.stringify(meta, null, 1));
console.log('ok');
