# Guia de autoria — "30 Estratégias de Maquiavel para o seu Provedor de Internet"

Produto: PDF A4 infográfico em estilo renascentista (pergaminho, ouro, selo de cera, xadrez de bronze, Florença),
como o anúncio "30 Estratégias de Maquiavel explicadas em mapas mentais", mas APLICADO a um provedor de internet
(ISP) brasileiro com **cerca de 2.200 clientes** (fibra FTTH, cidade(s) pequenas/médias), que enfrenta os 4 desafios:
**concorrência forte** (operadoras nacionais e provedores vizinhos), **cancelamentos/inadimplência (churn)**,
**crescer e vender mais** e **gestão da equipe** (técnicos, vendedores, atendimento).

## ⚠ VERSÃO 2 DO DESIGN — "Ouro sobre azul-noite" (renascentista premium)
O cliente reprovou a V1 (pergaminho sépia, ilustrações fracas, não parecia mapa mental). A V2 é OBRIGATÓRIA:
fundo azul-noite com moldura dourada, gravuras em traço dourado (como folha de ouro), mapa mental com
medalhão central grande e 6 ramos dourados afunilados com ícones em anel dourado, POUCO texto por ramo,
cartão marfim para a ferramenta pronta.

Página-modelo V2 OBRIGATÓRIA: `src/pages/p1-01-raposa-leao.html` — copie a estrutura exatamente.
Veja: `node build.js --check --only=p1-01 --shots=true` e abra `build/shots-p1_01/*.png` com Read;
alta resolução: `node tools/zoom.js dist/preview-p1_01.html e01 build/z.png "" 1.3`.

Conteúdo da V1 (texto já escrito, aprovado): `src/v1/pages/*.html`. REAPROVEITE o conteúdo (números,
exemplos, alertas, ferramentas), mas CONDENSE para caber no novo formato. Não copie o HTML/visual da V1.

### Estrutura da página-estratégia V2
1. `<svg class="frame" …><use href="#frame"/></svg>` (moldura) — primeira linha da section.
2. `.head`: medalhão do número (`numring` + `<text>` com `fill="url(#gl)"`), `.kicker`, `.title` (1 linha se
   possível; `.title.sm` se longo), `.sub` (1 linha, ≤ 70 caracteres).
3. `.quote`: paráfrase fiel + `<cite>O PRÍNCIPE · CAPÍTULO X · PARÁFRASE</cite>` (≤ 2 linhas).
4. `.mm` (mapa mental): 3 `.node.l` (grid-row 1–3) + `.hub` + 3 `.node.r`. Cada node: `svg.orb` (`#orb` + ícone
   `#i-…` em x=27 y=27 w=46 h=46) + `.txt` com `.nt` (título) e `.nb` (texto). Ramos: O que Maquiavel ensina ·
   No seu provedor · Como aplicar (4 passos curtos ①②③④) · Exemplo · 2.200 clientes · Indicadores (`.kpis` com
   2–3 `<span>valor<small>legenda</small></span>`) · Alerta de uso (`.node.r.warnode` + ícone `#i-warn`).
   LIMITE: cada `.nb` com no máximo ~45 palavras (o Exemplo pode ter até ~55).
5. `.hub`: `svg.medallion` com `<use href="#medallion"/>`, um `<clipPath>` próprio (id único, ex. `clip-e07`,
   círculo cx=100 cy=100 r=74), a CENA da estratégia dentro do clip, depois `<use href="#medallion-top"/>`;
   e `.hubcap` (2–4 palavras em caixa-alta).
   A CENA é o coração visual: gravura em traço dourado (stroke `url(#gl)`/`url(#gl-u)`, preenchimento dourado
   translúcido `fill="#c9a44f" fill-opacity=".14"`), fundo `url(#p-goldhatch)` e halo `url(#rg-halo)`.
   Use as gravuras do sprite (`g-lion`, `g-fox`, `g-king`, `g-fortress`, `g-florence`, `g-radio`) e os ícones
   `i-*` ampliados, e DESENHE elementos próprios no mesmo estilo (mapa com rotas de fibra, dique e onda, balança,
   arqueiro, escada, máscara, espelho, ampulheta, coroa de louros, aperto de mãos, casas, CTO, OLT…).
   Composição centrada, legível, com 1 ideia forte. Rótulos curtos em Cinzel 8px `fill="#e6c97a"` se ajudar.
6. `.moves`: 4 movimentos (I DISCERNIR · II PLANEJAR · III AGIR · IV CONQUISTAR), 1 frase curta cada.
7. `.tool` (cartão marfim): `.th` com ícone + título + `<small>` + tabela (1 linha exemplo + 1 linha em branco
   `<td class="fill">____</td>`) OU `.script` (mensagem) OU lista/checklist curta (use `.cols2` para 2 colunas).
8. `.maxim`: frase da parede entre dois `#fleuron`.
Sem `.foot` na V2 (a pergunta de reflexão/erro comum podem virar 1 linha dentro da ferramenta, se couber).

### Biblioteca V2 (src/sprite.svg)
Estrutura: `frame` (210×297), `orb` 100, `numring` 100, `medallion` 200, `medallion-top` 200, `fleuron` 60×20.
Ícones dourados 48×48: `i-quill i-scroll i-fiber i-house i-chart i-shield i-warn i-compass i-crown i-key i-scales
i-hourglass i-coins i-people i-headset i-tower i-router i-olt i-cto i-van i-pin i-eye i-target i-hand i-castle
i-wave i-sword i-book i-flag i-bolt i-heart i-mask i-gear i-laurel i-megaphone i-calendar i-check i-knight i-lion i-fox`.
Gravuras: `g-florence` 200×110, `g-lion` 120, `g-fox` 120, `g-king` 60×120, `g-fortress` 160×110, `g-radio` 80×140.
Gradientes/padrões: `gl` (ouro vertical), `gl-h` (ouro horizontal), `gl-u` (ouro em userSpace 0–200), `rg-ring`,
`rg-night`, `rg-halo`, `p-goldhatch`; filtro `f-glow`. Cores de destaque por Livro: var(--mod)/(--modd).
Classes extras para páginas gerais/aberturas: `.card` (marfim), `.dcard` (escuro com borda dourada), `.grid` +
`.s3…s12`, `table.tb`, `.lbl`, `.gold`, `.k`, `.small`, `.cols2`. Mapa genérico: container `.mapx` com um
elemento `.hubx` e vários `.nodex` → o mmap.js desenha ramos dourados do hub até cada nodex.

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
