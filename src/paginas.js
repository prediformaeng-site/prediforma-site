// paginas.js · conteúdo das páginas (fonte: Copy_*.md). Blocos [CONFIRMAR] ficam em prov(): só no build de revisão.
const L = require('./lib');
const { googleBlock, GLIF, prov, provInline, img, btn, btnLink, modules, link, chips, chipsStatic, callout, card, reason, steps, faq, section, split, band, caption, ba, hero, ctaFinal, SITE, CIDADES_TXT, ldServico, ldFaq, SERVICOS } = L;

const ALT = {
  11: 'Edifício residencial de quatro andares com fachada pintada em dois tons de cinza, em Blumenau',
  8: 'Edifício residencial com fachada pintada em tons de cinza com faixas brancas',
  7: 'Fachada de edifício residencial antes da obra, com manchas escuras de umidade e mofo',
  6: 'Equipe em corda pintando a fachada de um edifício bege',
  5: 'Fachada escura com marcas brancas de reparo antes da pintura',
  10: 'Duas pessoas em corda preparando a superfície da fachada de um edifício alto',
  2: 'Profissional em corda trabalhando ao lado de uma abertura de ventilação na fachada',
  9: 'Edifício alto com manchas escuras na fachada antes da obra, com um profissional em corda',
  4: 'Ponto de ancoragem fixado na parede da fachada ao lado de equipamento de ensaio com manômetro',
  12: 'Detalhe do ponto de ancoragem e do equipamento de ensaio com manômetro em kgf e lacre numerado',
  1: 'Profissional de capacete e cinto na fachada de um edifício com revestimento cerâmico',
  3: 'Profissional em corda, de capacete e cinto, na fachada envidraçada de um edifício',
};
const foto = (n, o = {}) => img(n, { alt: ALT[n], ...o });

const FAQ_PAGTO = ['Dá para parcelar a obra?', 'Sim. Além de Pix e boleto, há parcelamento em até 10 vezes sem juros no boleto e financiamento próprio para obras maiores, sujeito a análise. As condições vão na proposta.'];
const FAQ_CIDADES = ['Em quais cidades vocês atuam?', `Atendemos ${CIDADES_TXT}.`];
const FAQ_NR35 = ['A equipe é treinada para trabalho em altura?', 'Sim. As equipes têm treinamento NR-35.'];
const FAQ_GARANTIA = ['Qual é a garantia dos serviços?', 'De 2 a 5 anos, conforme o serviço contratado. O prazo e a cobertura ficam descritos na proposta.'];
const MSG_GERAL = 'Olá! Gostaria de solicitar um orçamento para manutenção ou pintura predial.';

const ST_PROCESSO = [
  ['Avaliação da fachada', 'Entender o estado real da superfície e o serviço adequado.'],
  ['Proposta clara', 'Escopo, materiais, prazo, garantia e valores no mesmo documento.'],
  ['Preparação', 'Lavação e tratamento de trincas, quando necessário.'],
  ['Execução', 'Equipe treinada, com o responsável acompanhando.'],
  ['Entrega', 'Obra conferida com o síndico.'],
];
const blocoProcesso = (h) => prov(`<h2>${h || 'Como a Prediforma faz'}</h2>${steps(ST_PROCESSO)}<p class="pf-micro" style="margin-top:var(--pf-space-4)">Etapas provisórias: só vão ao ar depois de o Jefferson confirmar o processo real.</p>`);

const obrasPintura = () => split(
  ba(7, 8, 'Pintura predial externa, edifício residencial. Antes e depois.', ALT[7], ALT[8]),
  `<div class="pf-thumbs">${foto(6, { sizes: '(max-width: 880px) 50vw, 270px' })}${foto(5, { sizes: '(max-width: 880px) 50vw, 270px' })}${foto(2, { sizes: '(max-width: 880px) 50vw, 270px' })}${foto(1, { sizes: '(max-width: 880px) 50vw, 270px' })}</div><p style="margin-top:var(--pf-space-4)">${link('Ver todas as obras', '/obras/')}</p>`
);

// ============================ PÁGINAS DE SERVIÇO ============================
const SV = {};

SV['pintura-predial'] = {
  nome: 'Pintura predial', title: 'Pintura Predial em Blumenau para Condomínios | Prediforma',
  desc: 'Pintura predial externa e interna para condomínios em Blumenau. Engenheiro civil à frente, equipes com NR-35 e garantia conforme o serviço. Peça orçamento.',
  h1: 'Pintura Predial em <span class="pf-hl">Blumenau</span> para Condomínios Residenciais e Comerciais',
  lead: 'Pintura de fachada e de áreas internas, com preparação da superfície, equipes treinadas para trabalho em altura e um engenheiro civil acompanhando a obra.',
  msg: 'Olá! Gostaria de solicitar um orçamento de pintura predial para o nosso condomínio.', cta: 'Pedir orçamento de pintura predial', foto: 11,
  corpo: () => section(split(
    `${modules}<h2>Pintura predial externa e interna, para quem administra o patrimônio do condomínio</h2>
    <p class="pf-measure">A pintura predial é a renovação e a proteção das superfícies de um edifício: fachadas, áreas comuns, garagens, estruturas metálicas e fachadas comerciais.</p>
    <ul class="pf-measure"><li>Pintura de fachada de edifícios residenciais e comerciais</li><li>Pintura predial interna de áreas comuns</li><li>Pintura comercial</li><li>Repintura de fachadas já pintadas</li></ul>
    <p class="pf-measure">O serviço é feito para síndicos, administradoras de condomínios e gestores de edificações comerciais.</p>`,
    callout('Nem todo sinal se resolve só com tinta', `<p>Trincas, infiltrações e pastilhas soltas pedem avaliação antes da pintura. Pintar sobre o problema esconde por um tempo e não resolve. Por isso a Prediforma começa avaliando a fachada.</p><p>${link('Reparo de trincas e fissuras', '/servicos/reparo-de-trincas-e-fissuras/')} · ${link('Lavação predial', '/servicos/lavacao-predial/')} · ${link('Teste de percussão', '/servicos/teste-de-percussao/')}</p>`, { alerta: true }))) +
    section(`${blocoProcesso()}<h2 style="margin-top:var(--pf-space-6)">Qual tinta para cada superfície</h2><div class="pf-grid pf-grid--3">${reason('01', 'Fachadas: tinta emborrachada')}${reason('02', 'Áreas internas: tinta com proteção antimofo')}${reason('03', 'Superfícies metálicas: tinta anticorrosiva')}</div><p class="pf-micro" style="margin-top:var(--pf-space-3)">A escolha final depende da avaliação de cada superfície.</p>`, { subtle: true }) +
    section(`<h2>Por que contratar a Prediforma</h2><div class="pf-grid pf-grid--3">
      ${card('capacete', 'Engenheiro civil à frente', 'Jefferson da Silva é engenheiro civil com especialização em patologias das construções, a área que estuda por que os edifícios se deterioram.')}
      ${card('ancora', 'Segurança em altura', 'Equipes com NR-35 e instalação de pontos de ancoragem, com laudo.', ['Pontos de ancoragem', '/servicos/pontos-de-ancoragem/'])}
      ${card('escudo', 'Dono presente', 'O responsável acompanha as operações no dia a dia e mantém comunicação com o síndico durante a obra.')}</div><p style="margin-top:var(--pf-space-5)">${link('Como contratar uma empresa de pintura predial: guia para síndicos', '/como-contratar-pintura-predial/')} · ${link('Para síndicos e administradoras', '/para-sindicos-e-administradoras/')}</p>`) +
    section(`<h2>Pinturas executadas em Blumenau</h2>${obrasPintura()}`, { subtle: true }),
  faq: [
    ['Quanto custa a pintura predial de um condomínio?', 'Não existe preço único por metro quadrado. O valor depende da área, da altura, do estado da superfície, do acesso e dos materiais. Por isso a Prediforma avalia a fachada para depois enviar uma proposta com escopo e valores.'],
    ['Que tinta é usada na fachada?', 'Em fachadas, tintas emborrachadas. Em áreas internas, tintas com proteção antimofo. Em superfícies metálicas, tinta anticorrosiva. A escolha final depende da avaliação de cada superfície.'],
    ['A pintura resolve trincas e infiltrações?', 'A tinta sozinha não. Trincas, fissuras e sinais de infiltração precisam ser avaliados e tratados antes. A Prediforma faz reparo de trincas, fissuras e vedações.'],
    FAQ_PAGTO, FAQ_GARANTIA, FAQ_NR35, FAQ_CIDADES,
  ],
  rel: ['lavacao-predial', 'manutencao-de-fachadas', 'reparo-de-trincas-e-fissuras', 'revitalizacao-e-retrofit-de-fachadas', 'pontos-de-ancoragem', 'pintura-industrial'],
};

SV['lavacao-predial'] = {
  nome: 'Lavação predial', title: 'Lavação Predial em Blumenau | Prediforma Engenharia',
  desc: 'Lavação predial para condomínios em Blumenau: remoção de sujeira, fungos e poluição da fachada, com equipamento adequado e equipes com NR-35. Peça orçamento.',
  h1: 'Lavação Predial em <span class="pf-hl">Blumenau</span> para Condomínios',
  lead: 'Remoção de sujeira, fungos e poluição de fachadas, com equipamento adequado e equipes treinadas para trabalho em altura.',
  msg: 'Olá! Gostaria de solicitar um orçamento de lavação predial para o nosso condomínio.', cta: 'Pedir orçamento de lavação', foto: 9,
  corpo: () => section(split(
    `${modules}<h2>A fachada suja diz alguma coisa sobre o condomínio</h2>
    <p class="pf-measure">Com o tempo, a fachada acumula sujeira e poeira, poluição que escurece a superfície, mofo, limo e fungos, e manchas de escorrimento de água. Isso envelhece a aparência do prédio.</p>
    <p class="pf-measure">A lavação predial é a limpeza de fachadas e superfícies externas de edifícios com equipamento adequado, para remover o que se acumulou sobre o revestimento: sujidades, poluição, mofo e fungos. A Prediforma também executa lavação industrial.</p>
    ${prov('<p class="pf-measure">A Prediforma usa equipamentos que preservam a integridade do revestimento. [Afirmação do cliente: validar com o Jefferson antes de ir ao ar.]</p>')}`,
    callout('Lavar ou pintar?', `<p>A resposta depende do estado da superfície: por isso a Prediforma avalia a fachada antes de indicar o serviço. Quando a obra inclui pintura, a lavação costuma ser parte da preparação.</p><p>${link('Pintura predial', '/servicos/pintura-predial/')} · ${link('Teste de percussão', '/servicos/teste-de-percussao/')}</p>`, { alerta: true }))) +
    section(`${prov(`<h2>Lavação ou pintura: qual o caminho?</h2><table class="pf-table"><thead><tr><th>Situação</th><th>Caminho provável</th></tr></thead><tbody>
      <tr><td data-label="Situação">Sujeira e mofo, com a tinta ainda firme</td><td data-label="Caminho provável">Lavação</td></tr>
      <tr><td data-label="Situação">Tinta descascando ou se soltando</td><td data-label="Caminho provável">Preparação e pintura</td></tr>
      <tr><td data-label="Situação">Trincas ou sinais de infiltração</td><td data-label="Caminho provável">Avaliação e reparo antes de qualquer acabamento</td></tr>
      <tr><td data-label="Situação">Pastilha soltando ou som oco</td><td data-label="Caminho provável">Teste de percussão</td></tr></tbody></table><p class="pf-micro">Tabela orientativa, a validar com o Jefferson.</p>`)}${blocoProcesso('Como a Prediforma faz')}`, { subtle: true }) +
    section(`<h2>Por que a Prediforma</h2><div class="pf-grid pf-grid--3">
      ${card('capacete', 'Engenheiro civil à frente', 'Especialização em patologias das construções: ajuda a diferenciar o que é só sujeira do que é sinal de um problema na fachada.')}
      ${card('ancora', 'Equipes preparadas para altura', 'Treinamento NR-35 e experiência em trabalho em altura.', ['Pontos de ancoragem', '/servicos/pontos-de-ancoragem/'])}
      ${card('rolo', 'Lavação e pintura na mesma empresa', 'Se a fachada precisar de pintura, reparo ou manutenção, é a mesma equipe, com o mesmo responsável técnico.', ['Pintura predial', '/servicos/pintura-predial/'])}</div>`) +
    section(`<h2>Fachadas antes da obra</h2><div class="pf-split"><div>${ba(7, 8, 'Edifício residencial: fachada antes e depois da pintura.', ALT[7], ALT[8])}</div><div><div class="pf-thumbs">${foto(9, { sizes: '(max-width: 880px) 50vw, 270px' })}${foto(10, { sizes: '(max-width: 880px) 50vw, 270px' })}</div>${caption('Fachadas antes da obra, com manchas escuras.')}<p>${link('Ver todas as obras', '/obras/')}</p></div></div>`, { subtle: true }),
  faq: [
    ['Qual a diferença entre lavação e pintura?', 'A lavação limpa a superfície: remove sujeira, poluição, mofo e fungos. A pintura renova e protege o acabamento. A Prediforma avalia a fachada e indica o que o prédio precisa.'],
    ['A lavação remove mofo e fungos?', 'Sim, o serviço inclui a remoção de sujidades, fungos e poluição da fachada. Se a causa for umidade ou infiltração, a Prediforma avalia o problema.'],
    ['Quanto custa a lavação de fachada?', 'O valor depende da área, da altura, do tipo de revestimento, do nível de sujeira e do acesso. O orçamento é feito depois da avaliação.'],
    FAQ_PAGTO, FAQ_NR35, ['Vocês fazem lavação industrial?', 'Sim. Veja a página de pintura e lavação industrial.'], FAQ_CIDADES,
  ],
  rel: ['pintura-predial', 'manutencao-de-fachadas', 'reparo-de-trincas-e-fissuras', 'teste-de-percussao', 'pontos-de-ancoragem', 'pintura-industrial'],
};

SV['pontos-de-ancoragem'] = {
  nome: 'Pontos de ancoragem', title: 'Ponto de Ancoragem com Laudo em Blumenau | Prediforma',
  desc: 'Instalação de ponto de ancoragem com laudo para trabalho em altura em condomínios de Blumenau. Equipes com NR-35. Peça seu orçamento.',
  h1: 'Ponto de Ancoragem com Laudo para Trabalho em Altura em <span class="pf-hl">Blumenau</span>',
  lead: 'Fornecimento e instalação de pontos de ancoragem para condomínios e edifícios, por uma empresa de engenharia com equipes treinadas em NR-35.',
  msg: 'Olá! Gostaria de solicitar um orçamento de pontos de ancoragem com laudo para o nosso condomínio.', cta: 'Pedir orçamento de ancoragem', foto: 4,
  corpo: () => section(split(
    `${modules}<h2>Quem trabalha na fachada precisa de onde se prender</h2>
    <p class="pf-measure">Pintar, lavar ou fazer manutenção na fachada de um prédio é trabalho em altura. Quem executa precisa de um ponto onde o equipamento de segurança seja preso.</p>
    <p class="pf-measure">Ponto de ancoragem é o elemento fixado na estrutura do edifício onde o trabalhador em altura prende o cinto e o equipamento de proteção contra quedas.</p>
    <p class="pf-measure">A Prediforma <strong>fornece e instala</strong> pontos de ancoragem para trabalho em altura e entrega o <strong>laudo</strong> do serviço.</p>
    ${prov('<p class="pf-measure">O que o serviço inclui (avaliação, fornecimento, instalação, laudo, orientação) e o que o laudo é (tipo, quem assina, ART): a confirmar com o Jefferson.</p>')}`,
    callout('Para quem é', `<ul><li>Condomínios residenciais e comerciais que fazem manutenção de fachada</li><li>Administradoras que querem a carteira com a documentação em dia</li><li>Gestores de edificações comerciais e industriais</li></ul><p>O laudo é do serviço de ponto de ancoragem. A Prediforma não promete laudo para pintura ou lavação.</p>`))) +
    section(`${blocoProcesso('Do levantamento ao laudo')}`, { subtle: true }) +
    section(`<h2>Por que a Prediforma</h2><div class="pf-grid pf-grid--3">
      ${card('capacete', 'Quem instala executa fachada todos os dias', 'A Prediforma trabalha com pintura, lavação e manutenção de fachadas e conhece o que a equipe que sobe no prédio precisa ter à mão.')}
      ${card('prancheta', 'Laudo do serviço', 'O fornecimento e a instalação de pontos de ancoragem são entregues com laudo para trabalho em altura.')}
      ${card('escudo', 'Equipes com NR-35', 'Todas as equipes têm treinamento em NR-35, a norma de trabalho em altura.')}</div>`) +
    section(`<h2>Instalação e ensaio</h2><div class="pf-split"><div><div class="pf-thumbs">${foto(4, { sizes: '(max-width: 880px) 50vw, 270px' })}${foto(12, { sizes: '(max-width: 880px) 50vw, 270px' })}</div>${caption('Ponto de ancoragem fixado na fachada, com equipamento de ensaio.')}</div><div><p>Veja também ${link('equipes em altura', '/obras/#altura')} e as ${link('obras de pintura', '/servicos/pintura-predial/')}.</p></div></div>`, { subtle: true }),
  faq: [
    ['O que é um ponto de ancoragem?', 'É o ponto fixado na estrutura do edifício onde o trabalhador em altura prende o cinto de segurança e o equipamento de proteção contra quedas.'],
    ['A Prediforma entrega laudo?', 'Sim. O serviço de fornecimento e instalação de pontos de ancoragem é entregue com laudo.'],
    ['Quanto custa instalar pontos de ancoragem?', 'O valor depende do tipo de edifício, da quantidade e da posição dos pontos e do acesso. O orçamento é feito depois da avaliação.'],
    FAQ_PAGTO, FAQ_NR35, FAQ_CIDADES,
  ],
  rel: ['pintura-predial', 'lavacao-predial', 'manutencao-de-fachadas', 'teste-de-percussao'],
};

SV['manutencao-de-fachadas'] = {
  nome: 'Manutenção de fachadas', title: 'Manutenção de Fachadas em Blumenau | Prediforma Engenharia',
  desc: 'Manutenção de fachadas preventiva e corretiva para condomínios em Blumenau, com engenheiro civil à frente e equipes com NR-35. Peça seu orçamento.',
  h1: 'Manutenção de Fachadas em <span class="pf-hl">Blumenau</span>: Preventiva e Corretiva',
  lead: 'Conservação de fachadas de condomínios residenciais e comerciais, por uma empresa de engenharia com acompanhamento de perto da obra.',
  msg: 'Olá! Gostaria de solicitar um orçamento de manutenção de fachada para o nosso condomínio.', cta: 'Pedir avaliação da fachada', foto: 5,
  corpo: () => section(split(
    `${modules}<h2>Fachada precisa de cuidado antes de dar problema</h2>
    <p class="pf-measure">A fachada protege o edifício da chuva, do sol e da umidade. Com o tempo, ela envelhece: a tinta se desgasta, aparecem manchas, fissuras e pontos de infiltração.</p>
    <h3 style="margin-top:var(--pf-space-4)">O que a Prediforma faz</h3>
    <ul class="pf-measure"><li>Manutenção preventiva e corretiva de fachadas</li><li>Tratamento de trincas e fissuras e vedações em geral → ${link('Reparo de trincas e fissuras', '/servicos/reparo-de-trincas-e-fissuras/')}</li><li>Lavação → ${link('Lavação predial', '/servicos/lavacao-predial/')}</li><li>Pintura → ${link('Pintura predial', '/servicos/pintura-predial/')}</li><li>Teste de percussão em pastilhas e reboco, com relatório técnico → ${link('Teste de percussão', '/servicos/teste-de-percussao/')}</li><li>Revitalização e retrofit → ${link('Revitalização e retrofit', '/servicos/revitalizacao-e-retrofit-de-fachadas/')}</li></ul>`,
    callout('Infiltração por água da chuva', `<p>A Prediforma atende chamados de manutenção por infiltração de água da chuva em prédios, de segunda a sexta, das 7h às 17h, exceto feriados. Não há plantão fora desse horário.</p>`, { alerta: true }))) +
    section(`${prov(`<h2>Preventiva e corretiva: qual a diferença?</h2><table class="pf-table"><thead><tr><th></th><th>Preventiva</th><th>Corretiva</th></tr></thead><tbody><tr><td data-label="">Quando</td><td data-label="Preventiva">A fachada está em bom estado</td><td data-label="Corretiva">Já existe um problema visível</td></tr><tr><td data-label="">Para que</td><td data-label="Preventiva">Conservar e evitar o problema</td><td data-label="Corretiva">Tratar o problema e recuperar a superfície</td></tr></tbody></table><p class="pf-micro">A validar com o Jefferson.</p>`)}${blocoProcesso('Como a Prediforma faz')}`, { subtle: true }) +
    section(`<h2>Por que a Prediforma</h2><div class="pf-grid pf-grid--3">
      ${card('capacete', 'Engenheiro civil à frente', 'Especialização em patologias das construções: o olhar vai à causa, não só à superfície.')}
      ${card('fachada', 'Um fornecedor para o ciclo completo', 'Avalia, trata, limpa e pinta, com o mesmo responsável técnico.')}
      ${card('escudo', 'Dono presente', 'O responsável acompanha as operações do dia a dia.')}</div>`),
  faq: [
    ['Qual a diferença entre manutenção e reforma?', 'Manutenção conserva e recupera o que existe. A Prediforma não faz ampliação nem construção.'],
    ['A Prediforma atende infiltração por chuva?', 'Atendemos chamados de infiltração de água da chuva em prédios, de segunda a sexta, das 7h às 17h, exceto feriados. Não há plantão fora desse horário.'],
    FAQ_PAGTO, FAQ_GARANTIA, FAQ_CIDADES,
  ],
  rel: ['pintura-predial', 'lavacao-predial', 'reparo-de-trincas-e-fissuras', 'teste-de-percussao', 'revitalizacao-e-retrofit-de-fachadas', 'pontos-de-ancoragem'],
};

SV['reparo-de-trincas-e-fissuras'] = {
  nome: 'Reparo de trincas e fissuras', title: 'Reparo de Trincas e Fissuras em Fachadas | Prediforma',
  desc: 'Reparo de trincas, fissuras e vedações em fachadas de condomínios em Blumenau. Engenheiro civil especialista em patologias das construções. Peça orçamento.',
  h1: 'Reparo de Trincas e Fissuras em Fachadas em <span class="pf-hl">Blumenau</span>',
  lead: 'Avaliação e tratamento de trincas, fissuras e vedações por uma empresa liderada por engenheiro civil especialista em patologias das construções.',
  msg: 'Olá! Gostaria de solicitar uma avaliação e um orçamento para reparo de trincas e fissuras na fachada do nosso condomínio.', cta: 'Pedir avaliação de trinca', foto: 2,
  corpo: () => section(split(
    `${modules}<h2>Apareceu uma trinca na fachada. E agora?</h2>
    <p class="pf-measure">Trincas e fissuras assustam o síndico, e com razão: nem sempre dá para saber, olhando, se é só da superfície ou sinal de algo mais. Pintar por cima esconde o problema por um tempo, mas não resolve.</p>
    <p class="pf-measure">A Prediforma começa <strong>avaliando</strong> a fachada e só depois indica o tratamento.</p>
    <h3 style="margin-top:var(--pf-space-4)">O que a Prediforma faz</h3>
    <ul class="pf-measure"><li>Reparo de trincas e fissuras</li><li>Vedação e reparos em geral</li><li>Restauração da superfície e pintura, quando necessário</li></ul>`,
    callout('Por que a avaliação vem primeiro', `<p>A Prediforma tem especialização em patologias das construções, a área da engenharia que estuda por que os edifícios se deterioram. Cada caso é avaliado antes de qualquer tratamento.</p><p>${link('Manutenção de fachadas', '/servicos/manutencao-de-fachadas/')} · ${link('Teste de percussão', '/servicos/teste-de-percussao/')} · ${link('Pintura predial', '/servicos/pintura-predial/')}</p>`))) +
    section(`${blocoProcesso('Como a Prediforma faz')}${prov('<p class="pf-measure">Diferença entre trinca e fissura, e quando chamar um engenheiro: a validar com o Jefferson.</p>')}`, { subtle: true }),
  faq: [
    ['Posso só pintar por cima?', 'Não resolve. Trincas e fissuras pedem avaliação e tratamento antes da tinta.'],
    ['Quanto custa o reparo?', 'Depende da extensão, da altura e do acesso. O orçamento sai depois da avaliação.'],
    FAQ_PAGTO, FAQ_GARANTIA, FAQ_CIDADES,
  ],
  rel: ['manutencao-de-fachadas', 'teste-de-percussao', 'pintura-predial', 'lavacao-predial'],
};

SV['teste-de-percussao'] = {
  nome: 'Teste de percussão', title: 'Teste de Percussão em Fachadas com Relatório | Prediforma',
  desc: 'Teste de percussão em pastilhas e reboco de fachadas em Blumenau, com emissão de relatório técnico. Engenheiro civil especialista. Peça orçamento.',
  h1: 'Teste de Percussão em Pastilhas e Reboco, com Relatório Técnico',
  lead: 'Verificação do estado do revestimento da fachada, com relatório técnico para o condomínio decidir com informação.',
  msg: 'Olá! Gostaria de solicitar um orçamento de teste de percussão com relatório técnico para o nosso condomínio.', cta: 'Pedir teste de percussão', foto: 1,
  corpo: () => section(split(
    `${modules}<h2>Como saber o que está por trás do revestimento?</h2>
    <p class="pf-measure">Pastilhas e reboco podem estar soltos por dentro sem que isso apareça por fora. A Prediforma faz o <strong>teste de percussão em pastilhas e reboco</strong> e emite <strong>relatório técnico</strong> com o resultado.</p>
    ${prov('<p class="pf-measure">Descrição do método (bater e ouvir para achar áreas descoladas), se danifica a fachada, conteúdo do relatório, quem assina e ART: a validar com o Jefferson.</p>')}
    <p class="pf-measure">O relatório técnico é associado ao teste de percussão. A Prediforma não promete laudo para pintura ou outros serviços.</p>`,
    callout('Para quem é', `<p>Síndicos e administradoras que querem conhecer o estado real da fachada antes de investir em obra, ou que viram pastilha soltando ou som oco.</p><p>${link('Manutenção de fachadas', '/servicos/manutencao-de-fachadas/')} · ${link('Revitalização e retrofit', '/servicos/revitalizacao-e-retrofit-de-fachadas/')}</p>`))) +
    section(`<h2>Por que a Prediforma</h2><div class="pf-grid pf-grid--3">
      ${card('capacete', 'Engenheiro civil', 'Especialização em patologias das construções.')}
      ${card('prancheta', 'Relatório técnico', 'O resultado do teste vem em relatório, que ajuda a apresentar a decisão em assembleia.')}
      ${card('escudo', 'Equipes com NR-35', 'Acesso à fachada com equipe treinada para trabalho em altura.')}</div>`, { subtle: true }),
  faq: [['Quanto custa o teste de percussão?', 'Depende da área e da altura. O orçamento sai depois da avaliação.'], FAQ_PAGTO, FAQ_NR35, FAQ_CIDADES],
  rel: ['manutencao-de-fachadas', 'reparo-de-trincas-e-fissuras', 'revitalizacao-e-retrofit-de-fachadas', 'pontos-de-ancoragem'],
};

SV['revitalizacao-e-retrofit-de-fachadas'] = {
  nome: 'Revitalização e retrofit', title: 'Revitalização de Fachadas e Retrofit em Blumenau | Prediforma',
  desc: 'Revitalização de fachadas e retrofit para condomínios em Blumenau: recuperação, proteção e renovação, com engenheiro civil à frente. Peça orçamento.',
  h1: 'Revitalização de Fachadas e Retrofit em <span class="pf-hl">Blumenau</span>',
  lead: 'Recuperação, proteção e renovação da fachada do condomínio, com avaliação técnica e acompanhamento da obra.',
  msg: 'Olá! Gostaria de solicitar um orçamento de revitalização de fachada para o nosso condomínio.', cta: 'Pedir orçamento de revitalização', foto: 8,
  corpo: () => section(split(
    `${modules}<h2>Quando a fachada precisa de mais do que pintura</h2>
    <p class="pf-measure">Quando o prédio reúne desgaste, trincas, manchas e revestimento comprometido, a solução costuma ser um projeto de revitalização de fachadas: recuperar a superfície, tratar os problemas e renovar o acabamento, em etapas.</p>
    <p class="pf-measure">A Prediforma não realiza ampliação nem construção: trabalha com a conservação e a renovação de fachadas existentes.</p>
    ${prov('<p class="pf-measure">Definição de retrofit e escopo da revitalização: a validar com o Jefferson.</p>')}`,
    callout('Serviços que costumam compor a obra', `<ul><li>${link('Teste de percussão', '/servicos/teste-de-percussao/')}</li><li>${link('Reparo de trincas, fissuras e vedações', '/servicos/reparo-de-trincas-e-fissuras/')}</li><li>${link('Lavação', '/servicos/lavacao-predial/')}</li><li>${link('Pintura', '/servicos/pintura-predial/')}</li></ul>`))) +
    section(`<h2>Por que a Prediforma</h2><div class="pf-grid pf-grid--3">
      ${card('capacete', 'Um responsável técnico', 'Engenheiro civil à frente de toda a obra.')}
      ${card('fachada', 'Etapas que se conversam', 'Avaliação, tratamento, limpeza e pintura na mesma empresa.')}
      ${card('escudo', 'Obra acompanhada de perto', 'Comunicação com o síndico durante a execução.')}</div>`, { subtle: true }),
  faq: [['Posso parcelar uma obra maior?', 'Sim. Parcelamento em até 10 vezes sem juros no boleto e financiamento próprio para obras maiores, sujeito a análise. As condições vão na proposta.'], FAQ_GARANTIA, FAQ_CIDADES],
  rel: ['teste-de-percussao', 'reparo-de-trincas-e-fissuras', 'lavacao-predial', 'pintura-predial', 'manutencao-de-fachadas'],
};

SV['pintura-industrial'] = {
  nome: 'Pintura e lavação industrial', title: 'Pintura Industrial e Lavação Industrial | Prediforma', noindex: true,
  desc: 'Pintura industrial e lavação industrial em Blumenau e região, com equipes treinadas em NR-35. Peça seu orçamento.',
  h1: 'Pintura Industrial e Lavação Industrial em Blumenau e Região',
  lead: 'Pintura e lavação de estruturas industriais, com equipes treinadas para trabalho em altura.',
  msg: 'Olá! Gostaria de solicitar um orçamento de pintura/lavação industrial.', cta: 'Pedir orçamento industrial', foto: null,
  corpo: () => section(split(
    `${modules}<h2>O que a Prediforma faz</h2><ul class="pf-measure"><li>Pintura industrial</li><li>Lavação industrial</li></ul><p class="pf-measure">Para gestores de edificações comerciais e responsáveis por estruturas industriais.</p>
    ${prov('<p class="pf-measure">Tipos de obra industrial já executados, porte e tinta anticorrosiva: a confirmar com o cliente.</p>')}`,
    callout('Por que a Prediforma', `<ul><li>Engenheiro civil à frente</li><li>Equipes com NR-35 para trabalho em altura</li><li>Experiência de origem em grandes construtoras, com rigor técnico e compromisso com prazos</li></ul>`))),
  faq: [['Existe garantia?', 'De 2 a 5 anos, conforme o serviço. O prazo e a cobertura constam na proposta.'], FAQ_CIDADES],
  rel: ['pintura-predial', 'lavacao-predial', 'manutencao-de-fachadas'],
};

function paginaServico(slug) {
  const d = SV[slug];
  const url = `/servicos/${slug}/`;
  const trail = [['Início', '/'], ['Serviços', '/servicos/'], [d.nome, url]];
  const rel = chips(d.rel.map((s) => [SV[s].nome, `/servicos/${s}/`]));
  const body = L.breadcrumb(trail) +
    hero({ eyebrow: d.nome, h1: d.h1, lead: d.lead, msg: d.msg, ctaTxt: 'Quero pedir um orçamento', foto: d.foto ? foto(d.foto, { eager: true, sizes: '(max-width: 880px) 100vw, 560px' }) : '', selo: !!d.foto }) +
    d.corpo() +
    section(split(`<h2>Perguntas frequentes</h2>${faq(d.faq)}`, `<h2>Serviços relacionados</h2>${rel}`)) +
    ctaFinal('Vamos avaliar a fachada do seu condomínio?', 'Conte pelo WhatsApp o que o prédio precisa. A Prediforma indica o serviço adequado e envia uma proposta clara, pronta para apresentar em assembleia.', d.cta, d.msg);
  return { path: url, title: d.title, desc: d.desc, noindex: d.noindex, atual: '/servicos/', trail, body, ld: [ldServico(d.nome, d.desc, url), ldFaq(d.faq)], og: true };
}

// ============================ HUB DE SERVIÇOS ============================
function paginaHubServicos() {
  const trail = [['Início', '/'], ['Serviços', '/servicos/']];
  const c = (s, ic, p) => card(ic, SV[s].nome, p, ['Ver ' + SV[s].nome.toLowerCase(), `/servicos/${s}/`]);
  const body = L.breadcrumb(trail) + hero({ h1: 'Serviços de manutenção predial em <span class="pf-hl">Blumenau</span> e região', lead: 'Pintura, lavação, pontos de ancoragem e manutenção de fachadas para condomínios, com engenheiro civil à frente.', msg: MSG_GERAL, ctaTxt: 'Quero pedir um orçamento' }) +
    section(`<h2>Os três serviços principais</h2><div class="pf-grid pf-grid--3">
      ${c('pintura-predial', 'rolo', 'Externa e interna, com preparação da superfície e o produto certo para cada área.')}
      ${c('lavacao-predial', 'gota', 'Remove sujeira, fungos e poluição da fachada, com equipamento adequado.')}
      ${c('pontos-de-ancoragem', 'ancora', 'Fornecimento e instalação para trabalho em altura, com laudo.')}</div>`) +
    section(`<h2>Manutenção e recuperação de fachadas</h2><div class="pf-grid pf-grid--3">
      ${c('manutencao-de-fachadas', 'fachada', 'Preventiva e corretiva, para conservar o edifício.')}
      ${c('reparo-de-trincas-e-fissuras', 'trinca', 'Avaliação e tratamento de trincas, fissuras e vedações.')}
      ${c('teste-de-percussao', 'prancheta', 'Teste em pastilhas e reboco, com relatório técnico.')}
      ${c('revitalizacao-e-retrofit-de-fachadas', 'predio', 'Recuperação, proteção e renovação da fachada.')}
      ${c('pintura-industrial', 'capacete', 'Pintura e lavação de estruturas industriais.')}</div>
      <p class="pf-micro" style="margin-top:var(--pf-space-5)">A Prediforma não realiza ampliação nem construção. É especialista em conservar o que já existe.</p>`, { subtle: true }) +
    ctaFinal('Não sabe qual serviço o prédio precisa?', 'Sem problema. Conte o que você vê na fachada, e a Prediforma indica o caminho.', 'Pedir orçamento pelo WhatsApp', MSG_GERAL);
  return { path: '/servicos/', title: 'Serviços de Manutenção Predial em Blumenau | Prediforma', desc: 'Pintura predial, lavação, pontos de ancoragem, reparo de trincas, teste de percussão e manutenção de fachadas para condomínios em Blumenau e região.', atual: '/servicos/', trail, body, ld: [], og: true };
}

// ============================ HOME ============================
function paginaHome() {
  const FAQH = [
    ['Como saber se a fachada precisa só de pintura?', 'Trincas, fissuras, pastilhas soltando, manchas e sinais de infiltração pedem avaliação antes da tinta, porque pintar sobre um problema não resolve o problema. A Prediforma avalia a fachada e indica o serviço adequado.'],
    ['Quanto custa pintar a fachada de um condomínio?', 'O valor depende da área, da altura, do estado da superfície, do tipo de acesso e dos materiais. Por isso o orçamento é feito depois de entender a fachada, e não por um preço único por metro quadrado.'],
    FAQ_GARANTIA, FAQ_NR35,
    ['A Prediforma atende administradoras?', 'Sim. Síndicos e administradoras são o público principal da empresa.'],
    FAQ_CIDADES,
    ['Como a obra afeta a rotina dos moradores?', 'O responsável acompanha a execução e mantém comunicação com o síndico durante o serviço, para que a obra seja organizada e as informações cheguem aos moradores.'],
  ];
  const body = hero({ eyebrow: 'Manutenção predial e fachadas', sec: ['Conhecer os serviços', '/servicos/'], h1: 'Pintura Predial e Manutenção de Fachadas em <span class="pf-hl">Blumenau</span>', lead: 'Serviços para condomínios residenciais e comerciais, conduzidos por um engenheiro civil especializado em patologias das construções e com acompanhamento de perto, do primeiro dia à entrega.', msg: MSG_GERAL, foto: foto(11, { eager: true, sizes: '(max-width: 880px) 100vw, 560px' }), selo: true }) +
    section(`<h2>Contratar obra de fachada é decisão sua. E o resultado também é cobrado de você.</h2><p class="pf-lead">Quem é síndico ou administra condomínios conhece o cenário:</p>
      <div class="pf-grid pf-grid--4"><div class="pf-card"><p>A fachada mostra o desgaste, e ninguém sabe ao certo se basta pintar ou se há um problema por baixo da tinta.</p></div><div class="pf-card"><p>Os orçamentos chegam diferentes, com escopos diferentes, e é difícil explicar a escolha em assembleia.</p></div><div class="pf-card"><p>A obra mexe com a rotina dos moradores, e qualquer falha de organização vira reclamação.</p></div><div class="pf-card"><p>Trabalho em altura exige preparo. Contratar uma equipe que não está treinada é um risco que ninguém quer assumir.</p></div></div>`, { subtle: true }) +
    section(split(`${modules}<h2>A Prediforma cuida da conservação de fachadas com responsabilidade técnica</h2><p class="pf-measure">A Prediforma Engenharia é especializada em manutenção predial, pintura, lavação e revitalização de fachadas em Blumenau e região.</p><p class="pf-measure">A empresa é liderada por <strong>Jefferson da Silva, engenheiro civil com especialização em patologias das construções</strong>: a área da engenharia que estuda por que os edifícios se deterioram. Na prática, isso significa olhar para a fachada como quem entende a causa do problema, e não só a superfície.</p><p class="pf-measure">A liderança tem cerca de 15 anos de experiência no segmento, começando em acabamento e pintura para grandes construtoras e hoje voltada à conservação de edifícios e condomínios.</p>${btnLink('Conheça a Prediforma', '/sobre/', { secondary: true })}`,
      `${prov('<p>Foto do Jefferson em obra: pendente do cliente.</p>')}${callout('Sem promessas vazias', '<p>A Prediforma não realiza ampliação nem construção. É especialista em conservar o que já existe, e diz com clareza o que o prédio precisa.</p>')}`)) +
    section(`<h2>O que a Prediforma executa</h2><div class="pf-grid pf-grid--3">
      ${card('rolo', 'Pintura predial', 'Externa e interna, com preparação da superfície e o produto certo para cada área.', ['Ver pintura predial', '/servicos/pintura-predial/'])}
      ${card('gota', 'Lavação predial', 'Remove sujeira, fungos e poluição da fachada, com equipamento adequado.', ['Ver lavação predial', '/servicos/lavacao-predial/'])}
      ${card('ancora', 'Pontos de ancoragem, com laudo', 'Fornecimento e instalação para trabalho em altura.', ['Ver pontos de ancoragem', '/servicos/pontos-de-ancoragem/'])}</div>
      <div style="margin-top:var(--pf-space-5)">${chips(SERVICOS.slice(3).map(([t, h]) => [t, h]))}</div>
      <p class="pf-micro" style="margin-top:var(--pf-space-3)">A Prediforma não realiza ampliação nem construção.</p>`, { subtle: true }) +
    section(`<h2>Cinco razões que você pode apresentar em assembleia</h2><div class="pf-grid pf-grid--5">${reason('01', 'Responsável técnico engenheiro')}${reason('02', 'Especialização em fachadas e condomínios')}${reason('03', 'Equipes preparadas para trabalho em altura')}${reason('04', 'Acompanhamento próximo da obra')}${reason('05', 'Garantia por escrito')}</div>
      <p class="pf-micro" style="margin-top:var(--pf-space-4)">Garantia de 2 a 5 anos, conforme o serviço. O prazo e a cobertura constam na proposta.</p>`) +
    (MODO_PROC(blocoProcesso('Do primeiro contato à entrega da obra'))) +
    section(`<h2>Veja o trabalho antes de decidir</h2>${obrasPintura()}`, { subtle: true }) +
    band(`<div class="pf-bars" aria-hidden="true"><i style="height:16px"></i><i style="height:28px"></i><i style="height:40px"></i><i style="height:48px"></i></div><h2>Feito para quem decide a manutenção do prédio</h2><p>Escopo claro, garantia por escrito, responsável técnico identificado e comunicação durante a obra.</p><div class="pf-btns">${btnLink('Ver página para síndicos e administradoras', '/para-sindicos-e-administradoras/', { inverse: true })}<a class="pf-btn pf-btn--ghost-inverse" href="/como-contratar-pintura-predial/">Como contratar uma empresa de pintura predial</a></div>`) +
    section(split(`<h2>Blumenau e região</h2>${chipsStatic(SITE.cidades)}<p class="pf-micro" style="margin-top:var(--pf-space-3)">Atendimento de segunda a sexta, das 7h às 17h.</p><p>${link('Ver áreas atendidas', '/areas-atendidas/')}</p>`, `<h2>Perguntas frequentes</h2>${faq(FAQH)}<p style="margin-top:var(--pf-space-4)">${link('Ver todas as perguntas frequentes', '/perguntas-frequentes/')}</p>`), { subtle: true }) +
    section(googleBlock()) +
    ctaFinal('Vamos olhar a fachada do seu condomínio?', 'Conte pelo WhatsApp o que o prédio precisa. A Prediforma indica o serviço adequado e envia uma proposta clara, pronta para apresentar em assembleia.', 'Pedir orçamento pelo WhatsApp', MSG_GERAL);
  return { path: '/', title: 'Pintura Predial e Fachadas em Blumenau | Prediforma Engenharia', desc: 'Pintura, lavação e manutenção de fachadas para condomínios em Blumenau. Engenheiro civil à frente e equipes com NR-35. Peça seu orçamento pelo WhatsApp.', atual: '', trail: null, body, ld: [L.ldNegocio(), ldFaq(FAQH)], og: true };
}
const MODO_PROC = (html) => (html ? section(html) : '');

// ============================ PARA SÍNDICOS ============================
function paginaSindicos() {
  const FAQS = [
    ['Como apresento a proposta em assembleia?', 'A proposta da Prediforma é escrita para isso: escopo, materiais, prazo, garantia e valores no mesmo documento.'],
    ['Preciso de mais de um orçamento?', 'É uma prática comum e a Prediforma não vê problema. Por isso a proposta é detalhada: assim você compara escopos iguais, e não só valores.'],
    FAQ_PAGTO,
    ['Como saber se a fachada precisa só de pintura?', 'Trincas, fissuras, pastilhas soltas e sinais de infiltração pedem avaliação antes da tinta. A Prediforma avalia a fachada e indica o serviço adequado.'],
    FAQ_NR35, FAQ_GARANTIA,
    ['Quanto tempo leva para receber o orçamento?', 'O retorno costuma ser de 1 a 3 dias.'], FAQ_CIDADES,
  ];
  const trail = [['Início', '/'], ['Para síndicos e administradoras', '/para-sindicos-e-administradoras/']];
  const msg = 'Olá! Sou síndico(a) e gostaria de solicitar um orçamento de manutenção de fachada para o nosso condomínio.';
  const body = L.breadcrumb(trail) + hero({ h1: 'Manutenção de Fachadas para Síndicos e Administradoras em <span class="pf-hl">Blumenau</span>', lead: 'Uma obra conduzida por engenheiro civil, com proposta clara para apresentar em assembleia e comunicação com você do início ao fim.', msg }) +
    section(`${modules}<h2>Você responde pelo condomínio. A escolha da empresa precisa se sustentar.</h2><p class="pf-lead">Escolher quem vai mexer na fachada do prédio é uma decisão que o síndico leva para a assembleia e que o conselho cobra depois. Por isso a Prediforma trabalha para tornar a decisão fácil de justificar: escopo claro, responsável técnico identificado, garantia por escrito e uma obra que não vira reclamação de morador.</p><p class="pf-measure">A seguir, as três dúvidas que mais fazem um síndico pensar duas vezes antes de contratar, e o que a Prediforma responde a cada uma.</p>`) +
    section(`<div class="pf-grid pf-grid--3">
      <article class="pf-card">${L.ICON.prancheta}<h3>“O preço é justo?”</h3><p>Comparar orçamentos de fachada é difícil quando cada empresa escreve um escopo diferente. A Prediforma entrega uma proposta com escopo, materiais, prazo, garantia e valores no mesmo documento, para você comparar item a item.</p><p>Pagamento por Pix e boleto, com parcelamento em até 10 vezes sem juros no boleto e financiamento próprio para obras maiores, sujeito a análise.</p></article>
      <article class="pf-card">${L.ICON.escudo}<h3>“Posso confiar nessa empresa?”</h3><p>Confiança se prova com fatos: engenheiro civil à frente, com especialização em patologias das construções; cerca de 15 anos de experiência da liderança no segmento; equipes com NR-35; instalação de pontos de ancoragem com laudo; garantia de 2 a 5 anos conforme o serviço; e obras reais para você ver.</p></article>
      <article class="pf-card">${L.ICON.capacete}<h3>“E o transtorno na obra?”</h3><p>É a dúvida que mais pesa na rotina do síndico. O responsável acompanha as operações no dia a dia e mantém comunicação direta com o síndico durante a execução. Os clientes elogiam a organização das equipes e a educação dos profissionais.</p><p><strong>A Prediforma não promete obra sem incômodo.</strong> Obra incomoda. Promete organização, informação e alguém responsável por perto.</p></article></div>
      <p style="margin-top:var(--pf-space-5)">${btn('Pedir um orçamento para o meu condomínio', msg, 'tres-duvidas')}</p>`, { subtle: true }) +
    section(`<h2>O que você recebe na proposta</h2>${prov('<ul class="pf-measure"><li>O que será feito, em quais áreas e com quais materiais</li><li>Quem executa e quem responde tecnicamente pela obra</li><li>Prazo estimado e forma de comunicação durante a execução</li><li>Garantia por escrito</li><li>Valores e condições de pagamento</li></ul><p class="pf-micro">Conteúdo real da proposta: a confirmar com o Jefferson.</p>')}<p class="pf-measure">A proposta é feita para ser apresentada em assembleia, com escopo, prazo, garantia e valores no mesmo documento.</p>
      <h2 style="margin-top:var(--pf-space-6)">Serviços para condomínios</h2><div class="pf-chips">${SERVICOS.map(([t, h]) => `<a class="pf-chip" href="${h}">${t}</a>`).join('')}</div><p class="pf-micro" style="margin-top:var(--pf-space-3)">Atende condomínios residenciais e comerciais. A Prediforma não realiza ampliação nem construção.</p><p style="margin-top:var(--pf-space-4)">${link('Como contratar uma empresa de pintura predial', '/como-contratar-pintura-predial/')} · ${link('Conheça a Prediforma', '/sobre/')} · ${link('Ver obras', '/obras/')}</p>`) +
    band(`<h2>Para administradoras</h2><p>Você administra vários condomínios. A Prediforma atende administradoras com a mesma proposta clara e o mesmo acompanhamento da obra. Fale sobre a manutenção da sua carteira.</p>${btn('Falar sobre a minha carteira de condomínios', 'Olá! Sou da administradora e gostaria de falar sobre a manutenção de fachadas dos condomínios que administro.', 'administradoras', { inverse: true })}`) +
    section(split(`<h2>Veja o padrão de trabalho antes de levar à assembleia</h2>${obrasPintura()}`, `<h2>Perguntas frequentes do síndico</h2>${faq(FAQS)}`), { subtle: true }) +
    ctaFinal('Vamos avaliar a fachada do seu condomínio?', 'Conte pelo WhatsApp o que o prédio precisa. A Prediforma indica o serviço adequado e envia uma proposta clara, pronta para apresentar em assembleia.', 'Pedir orçamento pelo WhatsApp', msg);
  return { path: '/para-sindicos-e-administradoras/', title: 'Manutenção de Fachadas para Síndicos e Condomínios | Prediforma', desc: 'Manutenção de fachadas para síndicos e administradoras em Blumenau. Proposta clara para assembleia, engenheiro civil à frente e acompanhamento da obra.', atual: '/para-sindicos', trail, body, ld: [ldFaq(FAQS)], og: true };
}

// ============================ COMO CONTRATAR ============================
function paginaComoContratar() {
  const trail = [['Início', '/'], ['Como contratar pintura predial', '/como-contratar-pintura-predial/']];
  const msg = 'Olá! Li o guia de como contratar pintura predial e gostaria de solicitar um orçamento para o nosso condomínio.';
  const resp = (t) => callout('Como a Prediforma responde', t);
  const alerta = (t) => callout('Sinal de alerta', `<p>${t}</p>`, { alerta: true });
  const FAQC = [
    ['Quantos orçamentos devo pedir?', 'É uma prática comum pedir mais de um. O importante é que todos cubram o mesmo escopo, para a comparação ser justa.'],
    ['O mais barato é o melhor?', 'Nem sempre. Compare o que está incluído: preparação, materiais, garantia e responsável técnico. Um preço baixo com escopo vago pode custar mais depois.'],
    ['Como apresentar a proposta em assembleia?', 'Leve o escopo, o prazo, a garantia, o responsável técnico e as fotos de obras anteriores. A proposta da Prediforma é escrita para isso.'],
    ['Quanto tempo leva para receber a proposta?', 'A Prediforma retorna em 1 a 3 dias.'], FAQ_CIDADES,
  ];
  const A = (id, titulo, html) => `<section><h2 id="${id}">${titulo}</h2>${html}</section>`;
  const toc = `<aside class="pf-toc" aria-label="Neste guia"><strong>Neste guia</strong><ol>
    <li><a href="#a1">A proposta</a></li><li><a href="#a2">Quem responde pela obra</a></li><li><a href="#a3">Segurança em altura</a></li><li><a href="#a4">Preparação da superfície</a></li><li><a href="#a5">Materiais</a></li><li><a href="#a6">Garantia</a></li><li><a href="#a7">Comunicação durante a obra</a></li><li><a href="#a8">Prova de trabalho anterior</a></li><li><a href="#a9">Preço e pagamento</a></li><li><a href="#a10">Checklist</a></li></ol></aside>`;
  const corpo = `<div class="pf-article__body">
    ${A('a1', '1. A proposta: compare escopos, não só valores', `<p>O erro mais comum é comparar o preço final de duas propostas que cobrem coisas diferentes. Confira se a proposta traz: áreas e superfícies incluídas, preparação da superfície, materiais, número de demãos, prazo estimado, garantia (com prazo e cobertura), valores e forma de pagamento.</p>${alerta('Proposta de uma linha, sem escopo. Impossível comparar e difícil de cobrar depois.')}`)}
    ${A('a2', '2. Quem responde pela obra', `<p>Pergunte: quem é o responsável técnico? Ele acompanha a obra? Em fachada, a causa do problema importa tanto quanto a tinta. Uma empresa com engenheiro civil à frente consegue avaliar se o que aparece é só desgaste ou sinal de algo mais.</p>${resp('<p>Jefferson da Silva, engenheiro civil com especialização em patologias das construções, acompanha as operações no dia a dia.</p>')}`)}
    ${A('a3', '3. Segurança em altura', `<p>Quem sobe no prédio precisa ser treinado para isso. Pergunte: a equipe tem treinamento em NR-35? Como será feita a ancoragem do equipamento de segurança? Quem responde se houver acidente?</p>${resp(`<p>As equipes têm NR-35 e a empresa instala pontos de ancoragem com laudo. ${link('Pontos de ancoragem', '/servicos/pontos-de-ancoragem/')}</p>`)}`)}
    ${A('a4', '4. Preparação da superfície', `<p>A tinta é a última etapa. O que vem antes decide quanto a pintura dura. Pergunte: a fachada será avaliada antes? Trincas, fissuras e áreas soltas serão tratadas antes de pintar?</p>${alerta('Empresa que orça sem olhar a fachada e promete “pintar tudo igual”.')}<p>${link('Lavação predial', '/servicos/lavacao-predial/')} · ${link('Reparo de trincas e fissuras', '/servicos/reparo-de-trincas-e-fissuras/')}</p>`)}
    ${A('a5', '5. Materiais', `<p>Pergunte qual tinta será usada em cada superfície. Cada área pede um produto. Referência da Prediforma: fachadas, tinta emborrachada; áreas internas, tinta com proteção antimofo; superfícies metálicas, tinta anticorrosiva.</p>${alerta('Proposta que só diz “tinta de primeira linha”, sem especificar.')}`)}
    ${A('a6', '6. Garantia', `<p>Peça a garantia por escrito, com prazo, o que está coberto e o que não está, e as condições para a garantia valer.</p>${resp('<p>Garantia de 2 a 5 anos, conforme o serviço. O prazo e a cobertura constam na proposta.</p>')}`)}
    ${A('a7', '7. Comunicação durante a obra', `<p>Obra de fachada mexe com a rotina dos moradores. Pergunte: quem será o contato do síndico durante a obra? Como serão passados os avisos aos moradores? Haverá cronograma? Como será a entrega?</p>${resp('<p>O responsável acompanha a execução e mantém comunicação com o síndico durante o serviço. A Prediforma não promete obra sem incômodo: promete organização, informação e alguém responsável por perto.</p>')}`)}
    ${A('a8', '8. Prova de trabalho anterior', `<p>Peça fotos de obras anteriores. Desconfie de quem só mostra imagens genéricas: uma empresa que faz o trabalho tem registro do que fez.</p>${resp(`<p>Veja obras reais em ${link('Obras', '/obras/')}.</p>`)}`)}
    ${A('a9', '9. Preço e pagamento', `<p>O menor preço nem sempre é o melhor, mas o maior também não garante nada. O que protege o condomínio é escopo claro, garantia por escrito e responsável técnico. Peça o valor por etapa ou item, a forma de pagamento e o que acontece se o escopo mudar durante a obra.</p>${resp('<p>Pix e boleto, com parcelamento em até 10 vezes sem juros no boleto e financiamento próprio para obras maiores, sujeito a análise.</p>')}`)}
    ${A('a10', 'Checklist para levar à reunião com o conselho', `<table class="pf-table"><thead><tr><th>Item</th><th>Empresa A</th><th>Empresa B</th><th>Empresa C</th></tr></thead><tbody>${['Proposta com escopo detalhado', 'Responsável técnico identificado', 'Treinamento NR-35 comprovado', 'Avaliação da fachada antes de orçar', 'Preparação da superfície descrita', 'Tinta especificada por superfície', 'Garantia por escrito, com prazo e cobertura', 'Contato único para o síndico', 'Cronograma e vistoria de entrega', 'Obras anteriores comprovadas', 'Condições de pagamento claras'].map((i) => `<tr><td data-label="Item">${i}</td><td data-label="Empresa A">☐</td><td data-label="Empresa B">☐</td><td data-label="Empresa C">☐</td></tr>`).join('')}</tbody></table>${btn('Pedir a proposta da Prediforma e comparar', msg, 'checklist')}`)}
  </div>`;
  const body = L.breadcrumb(trail) + hero({ h1: 'Como Contratar uma Empresa de Pintura Predial: Guia para Síndicos', lead: 'O que verificar antes de fechar, para comparar propostas com segurança e levar uma decisão que se sustenta em assembleia.', msg, ctaTxt: 'Pedir orçamento à Prediforma' }) +
    section(`<p class="pf-lead">Você vai pedir três orçamentos. Eles vão chegar com valores, escopos e linguagens diferentes, e você vai ter que explicar a escolha ao conselho e aos moradores. Este guia reúne o que um síndico deve conferir antes de assinar. Serve para avaliar qualquer empresa, inclusive a Prediforma.</p><div class="pf-article">${toc}${corpo}</div>`) +
    section(`<h2>Perguntas frequentes</h2>${faq(FAQC)}`, { subtle: true }) +
    ctaFinal('Quer comparar com a proposta da Prediforma?', 'Peça pelo WhatsApp. A Prediforma avalia a fachada e envia uma proposta clara, pronta para apresentar em assembleia.', 'Pedir orçamento pelo WhatsApp', msg);
  return { path: '/como-contratar-pintura-predial/', title: 'Como Contratar Empresa de Pintura Predial: Guia', desc: 'O que verificar antes de contratar pintura predial para o condomínio: proposta, equipe, segurança em altura, garantia e comunicação. Guia para síndicos.', atual: '/como-contratar', trail, body, ld: [ldFaq(FAQC)], og: true };
}

// ============================ OBRAS ============================
function paginaObras() {
  const trail = [['Início', '/'], ['Obras', '/obras/']];
  const fig = (n, leg) => `<figure>${foto(n, { sizes: '(max-width: 880px) 50vw, 280px' })}<figcaption class="pf-caption">${leg}</figcaption></figure>`;
  const grupo = (id, h, figs) => `<h2 id="${id}" style="margin-top:var(--pf-space-7)">${h}</h2><div class="pf-gallery">${figs.join('')}</div>`;
  const body = L.breadcrumb(trail) + hero({ sec: ['Conhecer os serviços', '/servicos/'], h1: 'Obras realizadas pela Prediforma em <span class="pf-hl">Blumenau</span>', lead: 'Fotos reais de equipes, fachadas e serviços executados em condomínios. Veja o padrão de trabalho antes de levar à assembleia.', msg: 'Olá! Vi as obras no site da Prediforma e gostaria de solicitar um orçamento para o nosso condomínio.', ctaTxt: 'Quero um orçamento como esses' }) +
    section(`<p class="pf-measure">Todas as imagens são de obras da Prediforma. Cada legenda informa o serviço e o tipo de edifício.</p>${chips([['Pintura', '#pintura'], ['Preparação da fachada', '#preparacao'], ['Antes da obra', '#antes'], ['Pontos de ancoragem', '#ancoragem'], ['Equipes em altura', '#altura']])}
      <h2 style="margin-top:var(--pf-space-6)">Antes e depois</h2><div style="max-width:560px">${ba(7, 8, 'Pintura predial externa, edifício residencial. Fachada antes e depois da obra.', ALT[7], ALT[8])}</div>
      ${grupo('pintura', 'Pintura', [fig(11, 'Pintura predial externa, edifício residencial.'), fig(8, 'Pintura predial externa, edifício residencial.'), fig(6, 'Pintura de fachada em execução, edifício residencial.')])}
      ${grupo('preparacao', 'Preparação da fachada', [fig(5, 'Reparo e tratamento da superfície antes da pintura.'), fig(10, 'Preparação da superfície, edifício alto.'), fig(2, 'Reparo em fachada, edifício residencial.')])}
      ${grupo('antes', 'Antes da obra', [fig(7, 'Fachada antes da obra, com manchas e mofo.'), fig(9, 'Fachada antes da obra, com manchas de umidade.')])}
      ${grupo('ancoragem', 'Pontos de ancoragem', [fig(4, 'Ponto de ancoragem fixado na fachada, com equipamento de ensaio.'), fig(12, 'Ponto de ancoragem e equipamento de ensaio, em detalhe.')])}
      ${grupo('altura', 'Equipes em altura', [fig(1, 'Equipe em trabalho em altura, Blumenau.'), fig(3, 'Equipe em trabalho em altura, Blumenau.')])}
      <p class="pf-micro" style="margin-top:var(--pf-space-6)">As equipes têm treinamento NR-35. ${link('Ver pontos de ancoragem', '/servicos/pontos-de-ancoragem/')}</p>`) +
    ctaFinal('Quer ver o seu condomínio nesta galeria?', 'Conte pelo WhatsApp o que o prédio precisa. A Prediforma avalia e envia uma proposta clara.', 'Pedir orçamento pelo WhatsApp', 'Olá! Vi as obras no site da Prediforma e gostaria de solicitar um orçamento para o nosso condomínio.');
  return { path: '/obras/', title: 'Obras de Pintura e Fachadas em Blumenau | Prediforma', desc: 'Veja obras reais da Prediforma Engenharia em Blumenau: pintura predial, preparação de fachadas e pontos de ancoragem. Fotos de equipes e antes e depois.', atual: '/obras', trail, body, ld: [], og: true };
}

// ============================ SOBRE ============================
function paginaSobre() {
  const FAQSB = [
    ['Quem é o responsável técnico da Prediforma?', 'Jefferson da Silva, engenheiro civil com especialização em patologias das construções.'],
    ['Há quanto tempo a Prediforma atua?', 'A empresa foi aberta em abril de 2023. A liderança tem cerca de 15 anos de experiência no segmento, a maior parte em acabamento e pintura para grandes construtoras.'],
    FAQ_NR35, ['A Prediforma faz construção ou ampliação?', 'Não. A empresa faz manutenção e conservação de edifícios existentes.'], FAQ_CIDADES,
  ];
  const trail = [['Início', '/'], ['Sobre', '/sobre/']];
  const msg = 'Olá! Conheci a Prediforma pelo site e gostaria de solicitar um orçamento de manutenção para o nosso condomínio.';
  const body = L.breadcrumb(trail) + hero({ h1: 'Prediforma Engenharia: manutenção predial com responsabilidade técnica', lead: 'Uma empresa de Blumenau especializada em conservar fachadas de condomínios, conduzida por um engenheiro civil e com o responsável presente na obra.', msg, ctaTxt: 'Falar com a Prediforma', micro: 'Você fala direto pelo WhatsApp. Sem compromisso.' }) +
    section(`${modules}<h2>Uma empresa de engenharia focada em fachadas e condomínios</h2><p class="pf-lead">A <strong>Prediforma Engenharia</strong> é uma empresa de Blumenau, especializada em manutenção predial: pintura, lavação, manutenção e revitalização de fachadas. Conserva edifícios com conhecimento técnico, e acompanha cada obra de perto.</p><p class="pf-measure">Atende síndicos e administradoras de condomínios residenciais e comerciais em ${CIDADES_TXT}.</p>`) +
    section(`<h2>Nossa história</h2><p class="pf-lead">Do acabamento em grandes obras à conservação de condomínios.</p><ol class="pf-timeline">
      <li><span class="pf-timeline__n" aria-hidden="true">1</span><h3>Acabamento e pintura para grandes construtoras</h3><p>Foi o começo. Dessa experiência vieram o rigor técnico e o compromisso com prazos que a empresa aplica em cada projeto.</p></li>
      <li><span class="pf-timeline__n" aria-hidden="true">2</span><h3>Um mercado que precisava de conservação</h3><p>A liderança percebeu que faltavam empresas qualificadas e confiáveis para conservar edifícios já existentes.</p></li>
      <li><span class="pf-timeline__n" aria-hidden="true">3</span><h3>Foco em condomínios e fachadas</h3><p>Hoje a Prediforma trabalha com manutenção predial, com foco em fachadas de condomínios.</p></li></ol>
      ${prov('<p>História pessoal do Jefferson (por que migrou, por que se especializou em patologias, uma obra marcante): pendente do cliente.</p>')}`, { subtle: true }) +
    section(`<h2>Quem está à frente</h2><div class="pf-profile"><div class="pf-profile__id">${L.ICON.capacete}<b>Jefferson da Silva</b><span>Engenheiro civil</span>${prov('<small>Foto dele em obra: pendente</small>')}</div>
      <div class="pf-profile__txt"><p class="pf-lead">Especialista em patologias das construções, a área da engenharia que estuda por que os edifícios se deterioram e como tratar cada problema.</p><p>Na prática, isso significa olhar para uma fachada como quem entende a causa do problema, não só a superfície.</p>
      <ul class="pf-checks"><li>Engenheiro civil com especialização em patologias das construções</li><li>Acompanha as operações no dia a dia</li><li>Equipes com treinamento NR-35</li></ul>
      <p>É essa presença que os clientes elogiam, junto com a organização das equipes e a educação dos profissionais.</p>${prov('<p>Número do CREA e formação: a autorizar pelo Jefferson.</p>')}</div></div>`) +
    section(`<h2>Segurança em altura</h2><p class="pf-measure">As equipes da Prediforma têm treinamento <strong>NR-35</strong>, a norma de trabalho em altura. A empresa também fornece e instala pontos de ancoragem, com laudo. ${link('Ver pontos de ancoragem', '/servicos/pontos-de-ancoragem/')}</p>
      <h2 style="margin-top:var(--pf-space-6)">O que fazemos</h2>${chips(SERVICOS)}<p class="pf-micro" style="margin-top:var(--pf-space-3)">A Prediforma não faz ampliação nem construção. É especialista em conservar o que já existe.</p>`) +
    section(`<h2>Perguntas frequentes</h2>${faq(FAQSB)}`, { subtle: true }) +
    ctaFinal('Quer conhecer o trabalho da Prediforma?', 'Conte pelo WhatsApp o que o seu condomínio precisa. A Prediforma avalia e envia uma proposta clara, pronta para apresentar em assembleia.', 'Pedir orçamento pelo WhatsApp', msg);
  return { path: '/sobre/', title: 'Sobre a Prediforma Engenharia | Manutenção Predial', desc: 'Conheça a Prediforma Engenharia: manutenção de fachadas em Blumenau, liderada por engenheiro civil com especialização em patologias das construções.', atual: '/sobre', trail, body, ld: [ldFaq(FAQSB)], og: true };
}

// ============================ ORÇAMENTO ============================
function paginaOrcamento() {
  const trail = [['Início', '/'], ['Orçamento', '/orcamento/']];
  const FAQO = [
    ['Em quanto tempo recebo a proposta?', 'O retorno costuma ser de 1 a 3 dias.'],
    ['Preciso saber qual serviço quero?', 'Não. Conte o que o prédio apresenta, e a Prediforma avalia e indica o serviço adequado.'],
    ['A Prediforma vai até o condomínio?', 'Sim. A empresa atende no endereço do cliente.'],
    FAQ_PAGTO, ['A proposta serve para apresentar em assembleia?', 'Sim. Ela é feita com escopo, materiais, prazo, garantia e valores no mesmo documento.'], FAQ_CIDADES,
  ];
  const msg = MSG_GERAL;
  const body = L.breadcrumb(trail) + hero({ h1: 'Peça o orçamento do seu condomínio', lead: 'Conte o que o prédio precisa. A Prediforma avalia e envia uma proposta clara, pronta para apresentar em assembleia.', msg, ctaTxt: 'Pedir orçamento pelo WhatsApp', micro: `Você fala direto pelo WhatsApp, de ${SITE.horario}. Sem compromisso.`, sec: null }) +
    section(split(`${modules}<h2>O que ajuda no orçamento</h2><p class="pf-measure">Se tiver à mão, envie junto. Se não tiver, tudo bem. Quanto mais a Prediforma souber, mais rápido sai a proposta.</p><ul class="pf-measure"><li><strong>Tipo de serviço:</strong> pintura, lavação, reparo de trincas, manutenção, ancoragem ou “não sei, preciso de avaliação”</li><li><strong>Tipo de prédio:</strong> residencial ou comercial</li><li><strong>Bairro e cidade</strong></li><li><strong>Número de andares</strong> (e, se souber, a área aproximada)</li><li><strong>Fotos da fachada</strong>, principalmente dos pontos com problema (trincas, manchas, tinta soltando)</li><li><strong>Prazo desejado</strong> e se a obra depende de assembleia</li></ul>${btn('Enviar essas informações pelo WhatsApp', msg, 'checklist')}`,
      `${callout('Não sabe qual serviço precisa?', '<p>Diga isso. Avaliar é exatamente o trabalho da Prediforma.</p>')}${prov(`<h3>O que acontece depois do seu contato</h3>${steps([['Você conta o que o prédio precisa', 'Pelo WhatsApp.'], ['A Prediforma avalia', 'O estado da fachada e o serviço adequado.'], ['Você recebe a proposta', 'Escopo, materiais, prazo, garantia e valores.'], ['Vocês decidem', 'Sem pressão.']])}<p class="pf-micro">Etapas provisórias, a confirmar com o Jefferson.</p>`)}`)) +
    section(`<h2>Perguntas frequentes</h2>${faq(FAQO)}`, { subtle: true }) +
    ctaFinal('Pronto para começar?', 'Peça pelo WhatsApp. A Prediforma indica o serviço adequado e envia uma proposta clara.', 'Pedir orçamento pelo WhatsApp', msg);
  return { path: '/orcamento/', title: 'Orçamento de Pintura e Manutenção Predial | Prediforma', desc: 'Peça orçamento de pintura predial, lavação ou manutenção de fachada em Blumenau. Fale pelo WhatsApp.', atual: '/orcamento', trail, body, ld: [ldFaq(FAQO)], og: true };
}

// ============================ CONTATO ============================
function paginaContato() {
  const trail = [['Início', '/'], ['Contato', '/contato/']];
  const body = L.breadcrumb(trail) + hero({ h1: 'Fale com a Prediforma', lead: `Atendimento em ${CIDADES_TXT}, de ${SITE.horario}.`, msg: 'Olá! Gostaria de falar com a Prediforma Engenharia.', ctaTxt: 'Chamar no WhatsApp', micro: 'Sem compromisso.', sec: null }) +
    section(split(`${modules}<h2>Dados de contato</h2><ul class="pf-contact"><li><strong>WhatsApp:</strong> <a href="${L.waLink('Olá! Gostaria de falar com a Prediforma Engenharia.')}" rel="noopener" data-evento="clique_whatsapp" data-posicao="contato">${SITE.telExibe}</a></li><li><strong>Telefone:</strong> <a href="${SITE.telHref}" data-evento="clique_telefone" data-posicao="contato">${SITE.telExibe}</a></li><li><strong>Instagram:</strong> <a href="${SITE.instagram}" rel="noopener">@prediformaengenharia</a></li><li><strong>Horário:</strong> ${SITE.horario}. Sábados, domingos e feriados: fechado.</li><li><strong>Atendimento:</strong> no endereço do cliente</li><li><strong>Área de atendimento:</strong> ${CIDADES_TXT}</li></ul>${prov('<p>E-mail profissional: pendente do cliente.</p>')}`,
      `<h2>Como prefere falar?</h2><div class="pf-stack">${btn('Chamar no WhatsApp', 'Olá! Gostaria de falar com a Prediforma Engenharia.', 'contato-wa', { lg: true })}<a class="pf-btn pf-btn--secondary pf-btn--lg" href="${SITE.telHref}" data-evento="clique_telefone" data-posicao="contato-botao">Ligar agora</a>${btnLink('Pedir orçamento', '/orcamento/', { secondary: true, lg: true })}</div>`)) +
    section(`<h2>Infiltração por água da chuva</h2><p class="pf-measure">A Prediforma atende chamados de manutenção por infiltração de água da chuva em prédios, de segunda a sexta, das 7h às 17h, exceto feriados. Não há plantão fora desse horário.</p>`, { subtle: true }) +
    section(googleBlock());
  return { path: '/contato/', title: 'Contato | Prediforma Engenharia em Blumenau', desc: 'Fale com a Prediforma Engenharia pelo WhatsApp ou por telefone. Atendimento em Blumenau e região, de segunda a sexta, das 7h às 17h.', atual: '/contato', trail, body, ld: [], og: true };
}

// ============================ ÁREAS ATENDIDAS ============================
function paginaAreas() {
  const trail = [['Início', '/'], ['Áreas atendidas', '/areas-atendidas/']];
  const msg = 'Olá! Gostaria de solicitar um orçamento de manutenção de fachada.';
  const body = L.breadcrumb(trail) + hero({ h1: 'Pintura e Manutenção de Fachadas em <span class="pf-hl">Blumenau</span> e Região', lead: `A Prediforma atende condomínios residenciais e comerciais em ${CIDADES_TXT}.`, msg, ctaTxt: 'Pedir orçamento no meu município' }) +
    section(`<h2>Onde a Prediforma atende</h2><p class="pf-measure">Pintura predial, lavação, manutenção e revitalização de fachadas, com o mesmo responsável técnico e o mesmo acompanhamento da obra em todas as cidades.</p><article class="pf-card pf-card--wide"><h3>Blumenau</h3><p>Sede da Prediforma. Atendimento em todos os bairros de Blumenau, inclusive ${SITE.bairros.slice(0, -1).join(', ')} e ${SITE.bairros[SITE.bairros.length - 1]}.</p>${link('Ver Blumenau', '/areas-atendidas/blumenau/')}</article><h3 style="margin-top:var(--pf-space-6)">Também atendemos</h3>${chipsStatic(SITE.cidades.filter((c) => c !== 'Blumenau'))}<p class="pf-micro" style="margin-top:var(--pf-space-4)">A Prediforma atende no endereço do cliente. Atendimento de segunda a sexta, das 7h às 17h.</p>`) +
    ctaFinal('Seu condomínio está em uma dessas cidades?', 'Conte pelo WhatsApp onde fica o prédio e o que ele precisa.', 'Pedir orçamento pelo WhatsApp', msg);
  return { path: '/areas-atendidas/', title: 'Áreas Atendidas | Fachadas em Blumenau e Região', desc: 'A Prediforma atende condomínios em Blumenau, Indaial, Timbó, Gaspar, Pomerode e Brusque. Pintura, lavação e manutenção de fachadas.', atual: '/areas', trail, body, ld: [], og: true };
}
function paginaBlumenau() {
  const trail = [['Início', '/'], ['Áreas atendidas', '/areas-atendidas/'], ['Blumenau', '/areas-atendidas/blumenau/']];
  const msg = 'Olá! Gostaria de solicitar um orçamento de manutenção de fachada em Blumenau.';
  const body = L.breadcrumb(trail) + hero({ h1: 'Pintura Predial e Manutenção de Fachadas em <span class="pf-hl">Blumenau</span>', lead: 'A Prediforma é uma empresa de Blumenau, com atuação em condomínios da cidade, conduzida por engenheiro civil.', msg, foto: foto(11, { eager: true }), selo: true }) +
    section(`<h2>Serviços em Blumenau</h2><div class="pf-chips">${SERVICOS.map(([t, h]) => `<a class="pf-chip" href="${h}">${t}</a>`).join('')}</div>
      <h2 style="margin-top:var(--pf-space-6)">Sede em Blumenau, com atendimento em todos os bairros</h2><p class="pf-measure">A Prediforma atende em todos os bairros de Blumenau, inclusive:</p>${chipsStatic(SITE.bairros)}
      ${prov('<p>Obra real em cada bairro, com foto e legenda: a pedir ao cliente. Conteúdo local sobre o clima e as fachadas: a validar com o Jefferson.</p>')}`) +
    section(`<h2>Obras</h2>${obrasPintura()}`, { subtle: true }) +
    ctaFinal('Vamos avaliar a fachada do seu condomínio em Blumenau?', 'Conte pelo WhatsApp o que o prédio precisa.', 'Pedir orçamento pelo WhatsApp', msg);
  return { path: '/areas-atendidas/blumenau/', title: 'Fachadas em Blumenau: Bairros Atendidos | Prediforma', desc: 'Pintura predial, lavação e manutenção de fachadas em Blumenau, nos bairros Vila Nova, Victor Konder, Itoupava Seca, Centro e Ponta Aguda.', noindex: true, atual: '/areas', trail, body, ld: [], og: true };
}

// ============================ FAQ ============================
function paginaFaq() {
  const trail = [['Início', '/'], ['Perguntas frequentes', '/perguntas-frequentes/']];
  const grupos = [
    ['Sobre a empresa', [['Quem é o responsável técnico?', 'Jefferson da Silva, engenheiro civil com especialização em patologias das construções.'], ['Há quanto tempo a Prediforma atua?', 'Aberta em abril de 2023. A liderança tem cerca de 15 anos de experiência no segmento.'], FAQ_CIDADES, ['A Prediforma faz ampliação ou construção?', 'Não.']]],
    ['Serviços', [['Quais serviços vocês executam?', 'Pintura predial, lavação predial, pontos de ancoragem com laudo, manutenção de fachadas, reparo de trincas e fissuras, teste de percussão com relatório técnico, revitalização e retrofit, pintura e lavação industrial.'], ['Como saber se a fachada precisa só de pintura?', 'Trincas, fissuras, pastilhas soltas e sinais de infiltração pedem avaliação antes da tinta.']]],
    ['Orçamento e pagamento', [['Como peço orçamento?', 'Pelo WhatsApp.'], ['Em quanto tempo recebo?', '1 a 3 dias.'], ['Quais as formas de pagamento?', 'Pix e boleto, com parcelamento em até 10 vezes sem juros no boleto e financiamento próprio para obras maiores, sujeito a análise.']]],
    ['Segurança e garantia', [FAQ_NR35, FAQ_GARANTIA]],
    ['Atendimento', [['Qual o horário?', 'Segunda a sexta, das 7h às 17h. Sem atendimento aos sábados, domingos e feriados.'], ['Vocês atendem infiltração por chuva?', 'Atendemos chamados de infiltração de água da chuva em prédios, em horário comercial. Não há plantão.']]],
  ];
  const todas = grupos.flatMap(([, i]) => i);
  const body = L.breadcrumb(trail) + hero({ sec: null, h1: 'Perguntas frequentes de síndicos e administradoras', lead: 'Respostas às principais dúvidas sobre pintura, lavação e manutenção de fachadas.', msg: 'Olá! Li as perguntas frequentes e gostaria de tirar uma dúvida.', ctaTxt: 'Tirar uma dúvida no WhatsApp' }) +
    section(grupos.map(([t, i]) => `<h2 style="margin-top:var(--pf-space-6)">${t}</h2>${faq(i)}`).join('')) +
    ctaFinal('Ficou com alguma dúvida?', 'Pergunte pelo WhatsApp.', 'Pedir orçamento pelo WhatsApp', MSG_GERAL);
  return { path: '/perguntas-frequentes/', title: 'Perguntas Frequentes | Prediforma Engenharia', noindex: true, desc: 'Respostas às principais dúvidas de síndicos e administradoras sobre pintura, lavação e manutenção de fachadas em Blumenau e região.', atual: '/perguntas', trail, body, ld: [ldFaq(todas)], og: true };
}

// ============================ PRIVACIDADE ============================
function paginaPrivacidade() {
  const trail = [['Início', '/'], ['Política de privacidade', '/politica-de-privacidade/']];
  const body = L.breadcrumb(trail) + `<div class="pf-container pf-article__body" style="padding-block:var(--pf-space-6)"><h1>Política de privacidade</h1>
  ${prov('<div class="pf-callout pf-callout--alerta"><strong>Minuta para revisão jurídica</strong><p>Este texto é um rascunho que descreve o que o site faz hoje. Precisa ser revisado antes de ir ao ar, e atualizado se Analytics ou Clarity forem instalados.</p></div>')}
  <p>Esta política explica como o site da ${SITE.razao} trata dados pessoais.</p>
  <h2>Quem é o responsável</h2><p>${SITE.razao}, CNPJ ${SITE.cnpj}, de Blumenau/SC. Contato: WhatsApp ${SITE.telExibe}.</p>
  <h2>O que o site coleta</h2><p>Este site <strong>não tem formulário</strong> e não pede cadastro. Não coleta nome, e-mail nem telefone diretamente.</p>
  <p>Quando você clica no botão de WhatsApp ou no telefone, seu aparelho abre o aplicativo para você iniciar a conversa. A partir daí, a conversa acontece no WhatsApp, e as informações que você enviar são tratadas pela Prediforma apenas para responder ao seu pedido de orçamento.</p>
  <p>O servidor que hospeda o site (Cloudflare) pode registrar dados técnicos de acesso, como endereço IP e tipo de navegador, para segurança e funcionamento.</p>
  <h2>Cookies e ferramentas de medição</h2><p>Hoje o site não usa cookies de publicidade. ${prov('<em>Se for instalada uma ferramenta de medição (como Google Analytics ou Microsoft Clarity), esta seção deve ser atualizada e o aviso de cookies configurado.</em>')}</p>
  <h2>Para que usamos as informações</h2><p>Para responder pedidos de orçamento, atender clientes e cumprir obrigações legais. Não vendemos dados.</p>
  <h2>Seus direitos</h2><p>Você pode pedir acesso, correção ou exclusão das informações que enviou à Prediforma, pelo WhatsApp acima.</p>
  <h2>Atualizações</h2><p>Esta política pode mudar. A versão vigente fica sempre nesta página.</p></div>`;
  return { path: '/politica-de-privacidade/', title: 'Política de Privacidade | Prediforma Engenharia', noindex: true, desc: 'Como o site da Prediforma Engenharia trata dados pessoais.', atual: '', trail, body, ld: [], og: false };
}

const PAGINAS = () => [
  paginaHome(), paginaHubServicos(),
  ...Object.keys(SV).map(paginaServico),
  paginaSindicos(), paginaComoContratar(), paginaObras(), paginaSobre(), paginaAreas(), paginaBlumenau(), paginaFaq(), paginaOrcamento(), paginaContato(), paginaPrivacidade(),
];
module.exports = { PAGINAS };
