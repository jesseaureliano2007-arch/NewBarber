# Guia de autoria — "30 Estratégias de Maquiavel para o seu Provedor de Internet"

Produto: PDF A4 infográfico em estilo renascentista (pergaminho, ouro, selo de cera, xadrez de bronze, Florença),
como o anúncio "30 Estratégias de Maquiavel explicadas em mapas mentais", mas APLICADO a um provedor de internet
(ISP) brasileiro com **cerca de 2.200 clientes** (fibra FTTH, cidade(s) pequenas/médias), que enfrenta os 4 desafios:
**concorrência forte** (operadoras nacionais e provedores vizinhos), **cancelamentos/inadimplência (churn)**,
**crescer e vender mais** e **gestão da equipe** (técnicos, vendedores, atendimento).

Página-modelo OBRIGATÓRIA: `src/pages/p1-01-raposa-leao.html`. Copie a estrutura exatamente.
Veja-a renderizada: `node build.js --check --only=p1-01 --shots=true` e abra `build/shots-p1_01/*.png` com Read.

## Montagem e verificação
- Cada `<section class="page mod-pX">` = 1 folha A4. Conteúdo que não couber é cortado.
- Módulos/cores: `mod-p1` Livro I (bordô), `mod-p2` Livro II (verde-oliva), `mod-p3` Livro III (azul real),
  `mod-p4` Livro IV (sépia), `mod-gen` (geral).
- Atributos: `id="e07"` (estratégia nº 07) · `data-toc="07 · Título — subtítulo curto"` · página de abertura de Livro
  com `data-toc-level="1"`.
- Os 4 cantos ornamentais: copie as 4 linhas `<svg class="corner k-tl">…` da página-modelo (classes k-tl/k-tr/k-bl/k-br).
- NÃO use h1–h6. Não escreva número de página. Não edite style.css, sprite.svg, build.js, mmap.js nem arquivos de
  outros prefixos. Estilos extras só inline (`style=""`).
- Verificação: `cd /home/user/NewBarber/maquiavel-provedor && node build.js --check --only=p2- --shots=true`
  (troque o prefixo) até "✔ Nenhum estouro de layout detectado." e revise cada PNG em `build/shots-<prefixo>/`
  com Read. Alta resolução: `node tools/zoom.js dist/preview-p2_.html e09 build/z.png "" 1.3`.

## Estrutura de CADA estratégia (1 página, igual à modelo)
1. `.hero` — cenário (`scene-florence`, `scene-chess` ou `scene-network`) + ilustração à direita (SVG ~64×44 mm,
   combinando símbolos do sprite: animais, peças, fortaleza, torre, CTO, OLT…), `.kicker` (Livro · tema),
   `.num` (dois dígitos), `.title` (2 linhas curtas, use `<br>`; `.title.sm` se longo), `.sub` (≤ 55 caracteres,
   1 linha!), `.quote` (PARÁFRASE fiel de Maquiavel, 1–2 linhas, com `<cite>O PRÍNCIPE · CAP. X (PARÁFRASE)</cite>`
   ou `DISCURSOS · LIVRO I, CAP. X`). Não invente capítulos: use o indicado na lista abaixo.
2. `.mmap` — mapa mental: 3 cartões à esquerda + medalhão central `.hub` (símbolo `medal` + ícones + 2 palavras-chave
   + `.hubtxt` com a ideia central) + 3 cartões à direita. Cartões (`.br` com `.bt`):
   esquerda: **O que Maquiavel ensina** · **No seu provedor** · **Como aplicar** (4 passos numerados);
   direita: **Exemplo · 2.200 clientes** (cenário concreto com números plausíveis) · **Indicadores** (`.kpi` com 2–3
   metas) · **Alerta de uso** (`.warn` — limite ético/legal).
   As linhas curvas são desenhadas automaticamente pelo `mmap.js`. Equilibre o tamanho dos textos esquerda × direita.
3. `.moves` — 4 movimentos: Discernir · Planejar · Agir · Conquistar (1 frase cada, ação concreta).
4. `.tool` — **Ferramenta pronta** (o diferencial prático): uma planilha-modelo (`table.tb` com 1–2 linhas de exemplo +
   1 linha em branco com `<span class="fill">____</span>`), OU um roteiro/script de mensagem (`.script`, ex.: WhatsApp
   para cliente), OU um checklist. Algo que o dono do provedor usa na segunda-feira.
5. `.foot` — Máxima para a parede (frase marcante) · Pergunta de reflexão · Erro comum.

Ícones nos títulos dos cartões: `<svg width="16" height="16" viewBox="…"><use href="#id"/></svg>` com o viewBox do símbolo.

## Biblioteca (src/sprite.svg) — `<use href="#id" x y width height/>`
Ornamentos: `corner` 48×48, `fleur` 40×44, `divider` 200×14, `laurel` 120×120, `seal` 100×100 (selo de cera; escreva
número/texto por cima no centro), `medal` 200×200 (medalhão central; desenhe ícones dentro do círculo r≈60 em 100,96),
`ribbon` 200×40. Xadrez bronze 60×120: `king`, `knight`, `rook`, `pawn`; `crown` 80×56.
Renascença: `fortress` 160×110, `florence` 300×110, `quill` 80×120, `compass` 100×100, `scroll` 120×80,
`hourglass` 60×100, `scales` 100×100, `key` 100×50, `shield` 80×96, `lion` 100×100, `fox` 100×100.
Provedor: `fiber` 120×40, `cto` 60×120, `olt` 100×120, `router` 100×70, `tower` 70×140, `house` 100×90,
`headset` 80×80, `van` 140×70, `coins` 90×70, `chart-up` 100×70, `people` 120×70, `pin` 40×52.
Cenários 800×240: `scene-florence`, `scene-chess`, `scene-network`.
Gradientes: `g-bronze`, `g-bronze-v`, `g-gold`, `rg-gold`, `rg-wax`, `g-stone`, `g-terracotta`, `g-dusk`, `g-hills`,
`g-parch`, `g-fiber`, `g-dark`, `g-glass`, `rg-glow`, `rg-sun`, `rg-lightfiber`. Filtro `f-shadow`. Hachura `p-hatch`.
Você pode (e deve) desenhar ilustrações próprias no mesmo estilo (sépia/bronze/ouro, sombreado, gravura).

## Classes de texto
`.k` destaque na cor do Livro · `.hl` grifo dourado · `.small` · `ol.l`/`ul.l` · `.kpi` · `.warn` · `.ex` · `.script`
· `.code` · `.fill` (campo a preencher) · `table.tb`. Fonte mínima: nada abaixo de 8,5 pt em HTML; texto SVG ≥ 7 pt
na escala final (o verificador acusa).

## Regras de conteúdo
- Português do Brasil, tom de consultor experiente: direto, prático, com números.
- Citações: só paráfrases fiéis (não invente frases atribuídas a Maquiavel nem números de capítulo).
- Realidade de ISP no Brasil: FTTH/GPON, OLT, CTO, ONU/ONT, roteador Wi-Fi, link de trânsito/IP, PTT/IX.br,
  NOC, SCM (licença/autorização da Anatel), SICI/coleta de dados da Anatel, Reclame Aqui, Consumidor.gov.br,
  CDC (Lei 8.078/90), LGPD (Lei 13.709/18), fidelidade com benefício (regras da Anatel), régua de cobrança,
  churn, ARPU/ticket médio, CAC, LTV, NPS, MTTR, inadimplência, rede neutra, Abrint.
- Números de exemplo: plausíveis para 2.200 clientes (ex.: ticket médio R$ 95–110; churn saudável 1–2 %/mês;
  receita ≈ R$ 220 mil/mês). Deixe claro que são exemplos, não dados do provedor do leitor.
- **Ética e lei sempre**: Maquiavel é usado como lente estratégica, NÃO como licença para enganar cliente,
  descumprir CDC/Anatel/LGPD, espionar, difamar concorrente, combinar preços (cartel) ou praticar dumping.
  Toda estratégia "dura" deve vir com o limite no Alerta de uso.

## AS 30 ESTRATÉGIAS (título · fonte · aplicação)
**Livro I — O Território (concorrência) · prefixo `p1-` · mod-p1**
- p1-00 abertura do Livro I (data-toc-level="1", data-toc="LIVRO I — O TERRITÓRIO (CONCORRÊNCIA)")
- 01 A Raposa e o Leão · cap. XVIII · inteligência de mercado + força de rede (PRONTA)
- 02 Conhecer o Terreno · cap. XIV · geomarketing: mapa de casas cobertas (HP), densidade, viabilidade por rua, onde estão rivais e clientes
- 03 A Melhor Fortaleza é não Ser Odiado · cap. XX · fidelidade contratual não segura cliente; satisfação e reputação seguram
- 04 Ver os Males de Longe · cap. III · sinais precoces: concorrente chegando, queda de qualidade, cliente "esfriando"
- 05 Armas Próprias · caps. XII–XIII · equipe e infraestrutura próprias × terceiros/mercenários; dependência de um único fornecedor/link
- 06 Diques contra a Fortuna · cap. XXV · gestão de riscos: redundância de link e energia, rompimento de fibra, caixa de reserva, seguro
- 07 Não Ficar Neutro · cap. XXI · tomar posição e fazer alianças: compras conjuntas, IX.br, associações, parcerias locais
- 08 Quem Fortalece o Outro se Arruína · cap. III · parcerias que dão poder a rivais (rede neutra, revenda, plataformas, dependência)

**Livro II — A Conquista (crescimento e vendas) · prefixo `p2-` · mod-p2**
- p2-00 abertura do Livro II (data-toc-level="1", data-toc="LIVRO II — A CONQUISTA (CRESCIMENTO)")
- 09 Morar no Território Conquistado · cap. III · expandir com presença local: ponto, técnico morador, comércio parceiro
- 10 Colônias em vez de Exércitos · cap. III · expansão por "células" baratas: clusters de rede, embaixadores, indicação premiada
- 11 Virtù e Ocasião · cap. VI · aproveitar janelas: pane do concorrente, loteamentos novos, condomínios, empresas
- 12 Os Benefícios aos Poucos · cap. VIII · upsell e fidelização em doses: upgrades escalonados, clube de vantagens, serviços adicionais
- 13 Mirar Mais Alto, como o Arqueiro · cap. VI · benchmarking com os melhores provedores regionais; metas ambiciosas
- 14 A Fama dos Grandes Feitos · cap. XXI · marca local: patrocínios, eventos, obras visíveis, histórias de clientes
- 15 Liberalidade com Prudência · cap. XVI · preço e promoções sustentáveis: evitar guerra de preço; ARPU, CAC, LTV

**Livro III — A Conservação (clientes e cancelamentos) · prefixo `p3-` · mod-p3**
- p3-00 abertura do Livro III (data-toc-level="1", data-toc="LIVRO III — A CONSERVAÇÃO (CLIENTES)")
- 16 Não Ser Odiado · caps. XVII e XIX · eliminar o que gera ódio: cobrança indevida, multa abusiva, espera, "empurra-empurra"
- 17 Temido ou Amado? · cap. XVII · firmeza com respeito: régua de cobrança e política de bloqueio/desbloqueio justas
- 18 Apoiar-se no Povo · cap. IX · a força do provedor é a base residencial e a comunidade, não poucas contas grandes
- 19 Parecer e Ser · cap. XVIII · qualidade percebida: Wi-Fi do cliente, comunicação de manutenção, transparência
- 20 Evitar o Desprezo · cap. XIX · consistência: cumprir prazo e promessa, não mudar regras toda hora
- 21 Honrar os Antigos Súditos · cap. II · clientes veteranos: não romper costumes, recompensar a antiguidade, não dar o melhor só ao novo
- 22 Os Descontentes do Outro Reino · cap. III · conquistar insatisfeitos dos rivais e reconquistar ex-clientes (win-back)
- 23 Prudência na Tempestade · cap. XXV · gestão de crise em grande pane: comunicação, compensação, aprendizado

**Livro IV — O Governo (equipe e liderança) · prefixo `p4-` · mod-p4**
- p4-00 abertura do Livro IV (data-toc-level="1", data-toc="LIVRO IV — O GOVERNO (EQUIPE)")
- 24 Pelos Ministros se Conhece o Príncipe · cap. XXII · escolher bem os líderes (NOC, comercial, financeiro, atendimento)
- 25 Fugir dos Aduladores · cap. XXIII · cultura de verdade: dados, feedback franco, conselho consultivo
- 26 Honrar Quem Serve Bem · cap. XXII · remuneração variável, carreira de técnico, reconhecimento
- 27 Preparar-se na Paz · cap. XIV · treinamento e simulados de pane, padrão de instalação, plantão
- 28 Grandes Empreitadas Unem o Reino · cap. XXI · metas compartilhadas, OKRs, campanhas internas
- 29 Boas Leis e Boas Armas · cap. XII · processos (POPs, checklists), conformidade Anatel/LGPD, indicadores
- 30 Adaptar-se aos Tempos · cap. XXV · inovação e revisão anual: novos serviços, mesh, TV/streaming, câmeras, empresas

As páginas de abertura de cada Livro: hero alto com cenário e ilustração; um "mapa do Livro" (as estratégias do Livro
como cartões numerados ao redor de um medalhão com o desafio), o diagnóstico do desafio para um provedor de 2.200
clientes (sintomas, custo de não agir com conta simples), os indicadores do Livro e "por onde começar".
