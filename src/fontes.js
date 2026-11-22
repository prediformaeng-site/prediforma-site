// Copia as fontes (OFL-1.1) do node_modules para public/fonts. Roda: npm run fontes
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
const out = path.join(root, 'public', 'fonts');
fs.mkdirSync(out, { recursive: true });
const lista = [
  ['montserrat', 'montserrat-latin-600-normal.woff2'],
  ['montserrat', 'montserrat-latin-700-normal.woff2'],
  ['montserrat', 'montserrat-latin-800-normal.woff2'],
  ['inter', 'inter-latin-400-normal.woff2'],
  ['inter', 'inter-latin-500-normal.woff2'],
];
for (const [pkg, f] of lista) {
  fs.copyFileSync(path.join(root, 'node_modules', '@fontsource', pkg, 'files', f), path.join(out, f));
  console.log('fonte:', f);
}
fs.writeFileSync(path.join(out, 'LICENCA.txt'), 'Montserrat e Inter: SIL Open Font License 1.1 (via @fontsource). Uso livre, inclusive comercial.\n');
