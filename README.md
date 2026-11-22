# Site Prediforma Engenharia · Cloudflare Pages

Site estático (HTML, CSS e um JavaScript pequeno), gerado por `node` a partir do design system e do copy. **Sem banco de dados, sem back-end, sem formulário.** A pasta `public/` é o que vai para o Cloudflare Pages.

**Estado:** pronto para **pré-visualização** (`noindex`). **Não está pronto para o go-live**: ver a seção 5.

---

## 1. Estrutura

```
Site/
├── public/                 ← PUBLICAR ESTA PASTA (gerada, não editar à mão)
│   ├── index.html, servicos/, obras/, sobre/ ...   (20 páginas + 404.html)
│   ├── css/  js/  img/  fonts/  favicon.svg
│   ├── _headers  _redirects  robots.txt  sitemap.xml
├── src/
│   ├── lib.js              componentes (marcação do design system) e dados da empresa
│   ├── paginas.js          conteúdo de todas as páginas (fonte: Copy_*.md)
│   ├── build.js            gerador + verificações automáticas
│   ├── imagens.js          gera as imagens otimizadas a partir de ../Mídias (ffmpeg)
│   ├── fontes.js           copia Montserrat e Inter (OFL) para public/fonts
│   ├── extras.css          ajustes do site
│   └── vendor/             tokens.css, componentes.css, pf.js (cópia do design system)
└── package.json
```

## 2. Comandos

| Comando | O que faz |
|---|---|
| `npm run build` | **Produção em preview.** Blocos `[CONFIRMAR]` ficam **fora**. `noindex` ligado |
| `npm run build:revisao` | Mostra os blocos provisórios com contorno tracejado e a etiqueta "PROVISÓRIO", para a Paula revisar o que falta. **Não publicar este** |
| `npm run build:live` | **Go-live.** Remove o `noindex`, abre `robots.txt` e o `sitemap.xml`. Só depois da seção 5 |
| `npm run imagens` | Refaz as imagens (webp 1200 e 640 px, sem EXIF, nomes de condomínio desfocados). Precisa do `ffmpeg` |
| `npm run fontes` | Recopia as fontes do `node_modules` |

`build` roda **verificações automáticas** e falha se houver: link ou imagem inexistente, âncora sem destino, `<img>` sem `alt`, página sem exatamente um `<h1>`, title acima de 65 ou description acima de 165 caracteres, ou marcador provisório sobrando na produção.

Atualizar texto: editar `src/paginas.js` (ou `src/lib.js` para dados da empresa), rodar `npm run build`. Atualizar o visual: mudar `tokens.json` no design system, rodar `node build-tokens.js` lá, copiar `tokens.css` e `componentes.css` para `src/vendor/`.

## 3. Publicar no Cloudflare Pages

> **Publicar é uma ação externa.** Nada foi enviado para o Cloudflare. Estes passos dependem da conta e da decisão da Paula.

**Opção A: arrastar e soltar (mais simples, sem GitHub)**
1. Rodar `npm run build`.
2. No painel do Cloudflare: **Workers e Pages → Criar → Pages → Upload direto**.
3. Dar o nome do projeto (ex.: `prediforma`) e **enviar a pasta `public/`**.
4. O site abre em `prediforma.pages.dev` (já com `noindex`).

**Opção B: Git (recomendada para manter)**
1. Colocar a pasta `Site/` em um repositório privado.
2. Cloudflare Pages → conectar o repositório.
3. Configuração: **Comando de build** `npm run build` · **Diretório de saída** `public` · variável `NODE_VERSION` = `20` ou mais.
4. Atenção: `public/img` e `public/fonts` precisam estar no repositório (são gerados localmente porque dependem do `ffmpeg` e da pasta `Mídias`).

### Domínio `prediformaengenharia.site` (hoje na Hostinger)
- O domínio raiz (sem `www`) no Cloudflare Pages exige que o **DNS do domínio esteja na Cloudflare**. Caminho: adicionar o domínio à Cloudflare, e **trocar os servidores de nomes (nameservers) na Hostinger** pelos que a Cloudflare indicar. O registro continua na Hostinger; só o DNS muda.
- Depois: no projeto Pages → **Domínios personalizados** → `prediformaengenharia.site` (e `www`, com redirecionamento para o raiz).
- **Antes de trocar o DNS**, conferir se existe e-mail no domínio (registros MX) para não perdê-lo.
- **Titularidade:** o domínio foi comprado pela Paula. Definir por escrito se ficará no nome da Prediforma (ver `Manual_SEO_Aplicado_Prediforma.md`, seção 10).

## 4. Rastreamento (já preparado, desligado)

Todo botão de WhatsApp e de telefone tem `data-evento` e `data-posicao`. O script empurra um evento para `window.dataLayer` com `event` (`clique_whatsapp` ou `clique_telefone`), `pagina` e `posicao` (cabecalho, hero, final, flutuante, rodape, etc.). **Nada é enviado a nenhum serviço.** Quando Google Tag Manager, GA4 ou Clarity forem instalados:
1. **Primeiro** aprovar a política de privacidade e o aviso de cookies (`Manual_SEO_Aplicado_Prediforma.md`, seção 8).
2. Atualizar o `Content-Security-Policy` em `_headers` (hoje só permite o próprio domínio).
3. Lembrar: clique em WhatsApp **não** é mensagem enviada.

## 5. Antes do go-live (`npm run build:live`)

O site **hoje não pode ir ao ar de forma pública** por estes motivos. Detalhes e perguntas prontas em `Raio X/Projeto/Pendencias_Personalizacao_Prediforma.md`.

**Bloqueiam (🔴)**
- [ ] **Certificados de NR-35** e **ART**. O site diz "equipes com NR-35" (declarado pelo cliente), sem comprovação em mãos
- [ ] **Garantia por serviço** (hoje "2 a 5 anos, conforme o serviço")
- [ ] **Visita técnica e orçamento: gratuitos?**
- [ ] **Etapas reais da obra** (o bloco "Como a Prediforma faz" está **fora** da produção)
- [ ] **Parcelamento e financiamento**: como divulgar (a taxa não está no site)
- [ ] **Validação técnica do Jefferson** das páginas de lavação, ancoragem, percussão, trincas e retrofit (explicações técnicas estão fora da produção, e as páginas ficam enxutas)
- [ ] **Fotos:** bairro de cada obra e conferência do desfoque dos nomes de condomínio
- [ ] **Política de privacidade revisada** (o texto atual é minuta) e decisão sobre cookies
- [x] **Nome do Perfil no Google:** a Paula decidiu manter, por enquanto, o nome atual do Perfil ("Prediforma Engenharia | Pintura Predial"). O site usa "Prediforma Engenharia". Risco: nome com palavra-chave pode ser questionado pelo Google, e a diferença entre Perfil e site enfraquece a consistência. Rever depois do lançamento. Colocar o link do site no campo "site" do Perfil
- [ ] **Link direto de avaliação do Google** (para o botão "Avaliar no Google")
- [ ] **Titularidade do domínio** e acesso à Cloudflare
- [ ] **Prazo de primeira resposta no WhatsApp** (quem atende)

**Melhoram muito (🟠)**
- [ ] Foto e história do Jefferson, CREA · depoimentos reais · antes e depois de mais obras · logo vetorial · Search Console e Analytics

## 6. O que foi verificado

**Por script, no navegador (21 páginas):**
- Sem rolagem horizontal em 1280, 1024, 981 e 375 px.
- Um `<h1>` por página; fontes próprias carregam; menu de celular alterna com o de desktop.
- Nenhum alvo de toque abaixo de 44 px (após ajuste no menu).
- Links internos, âncoras, imagens e `srcset` existem; todas as imagens têm `alt`.
- Produção sem marcadores `[CONFIRMAR]` nem blocos provisórios; revisão os mostra.
- Peso total do site: cerca de 3,5 MB (imagens em webp de 640 e 1200 px).

**Não verificado:**
- ❌ **Aparência.** O painel do navegador não devolve captura de imagem aqui. Equilíbrio visual, degradês e fotos recortadas **precisam ser vistos por uma pessoa**: abrir `public/index.html` por um servidor local (ex.: `npx serve public`) ou a prévia do Cloudflare.
- ❌ Leitor de tela, Safari, Firefox, aparelhos reais e Lighthouse.
- ❌ O desfoque dos nomes de condomínio foi conferido em miniatura (fotos 7, 8 e 11). Revisar em tamanho real.
- ❌ Dados estruturados (JSON-LD) não foram validados no Teste de Resultados Ricos do Google.
- ❌ O símbolo do WhatsApp é um traçado genérico de domínio público; trocar pelo oficial.
- ❌ Nada foi publicado.

## 7. Decisões tomadas

- **Estático, sem formulário:** um único caminho de conversão (WhatsApp). Menos risco de LGPD.
- **Blocos provisórios ficam fora** da produção, e o `noindex` fica ligado até o `--live`.
- **Sem pop-up.** O botão flutuante de WhatsApp (só ícone, verde padrão) faz o papel da barra fixa.
- **Páginas de cidade (Indaial, Timbó, Gaspar, Pomerode, Brusque) não foram criadas.** Só entram com obra real e conteúdo único; hoje aparecem no hub de áreas.
- **Fontes servidas pelo próprio site** (sem Google Fonts), por privacidade e velocidade.
- **Endereço (decisão de 22/11/2026):** Rua Rio dos Cedros, 40, Boa Vista, Blumenau/SC, **escrito somente no rodapé**, sempre com o aviso de que a Prediforma **não recebe clientes ali: atende no endereço do cliente**. Nas outras páginas só aparece "atende no endereço do cliente". Os dados estruturados (invisíveis, para o Google) mantêm o endereço e as coordenadas, para ficar igual ao Perfil no Google.
- **CNPJ** no rodapé, na política de privacidade e nos dados estruturados. **Crédito** "Site desenvolvido por Z Marketing" no rodapé, com link.
- **Link do Google:** usa o link curto do Perfil (`maps.app.goo.gl`). Não há estrelas nem notas no site, porque a empresa ainda não tem avaliações. Quando houver, trocar o botão "Avaliar no Google" pelo link direto de avaliação do Perfil e, então, mostrar as avaliações.
- **Prazo de retorno do orçamento ("1 a 3 dias")** aparece **só nos FAQs**, não nos botões nem nos textos das páginas.
- **Não há `Person` (Jefferson)** nos dados estruturados, até ele autorizar.
