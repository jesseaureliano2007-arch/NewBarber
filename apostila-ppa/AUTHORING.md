# Guia de autoria — Apostila Infográfica PPA

Leia este guia inteiro antes de escrever. A página-modelo obrigatória é
`src/pages/met-11-metar.html` (2 páginas). Abra-a e copie o padrão.

## 1. Como a apostila é montada

- Cada arquivo em `src/pages/` contém uma ou mais páginas `<section class="page mod-XXX" ...>`.
- Cada `<section class="page">` = **exatamente 1 folha A4** (210 × 297 mm, `overflow:hidden`).
  Conteúdo que não couber é CORTADO — por isso a verificação automática é obrigatória.
- A ordem vem de `src/order.txt` (curingas por prefixo, ordem alfabética do nome do arquivo).
- Módulos: `mod-reg` (azul), `mod-met` (turquesa), `mod-nav` (verde), `mod-tv` (vermelho),
  `mod-cta` (roxo), `mod-c172` (laranja), `mod-gen` (azul-marinho).
- Número de página, rodapé e sumário são gerados automaticamente. NÃO escreva número de página.
- Atributos da section:
  - `id="reg-espaco-aereo"` (único, sem acento),
  - `data-toc="Título no sumário"` (toda página de conteúdo deve ter),
  - `data-toc-level="1"` só na página de abertura do módulo (vira marcador-pai no PDF).
- NÃO use `<h1>`…`<h6>`. Use as classes abaixo.

## 2. Verificação (obrigatória antes de concluir)

```bash
cd /home/user/NewBarber/apostila-ppa
node build.js --check --only=reg- --shots=true     # troque reg- pelo seu prefixo
```

- Saída "✔ Nenhum estouro de layout detectado." é o objetivo. Qualquer "conteúdo cortado",
  "ultrapassa", "colunas de questões transbordaram" ou "fonte < 7 pt" deve ser corrigido.
- As capturas ficam em `build/shots-<prefixo>/NNN-id.png`. **Abra as PNG com a ferramenta Read e
  olhe cada página**: ilustração coerente com o texto? rótulos sobrepostos? espaço em branco
  exagerado no fim da página (> ~25 mm)? Se sobrar espaço, acrescente conteúdo útil
  (exemplo, pegadinha, tabela) — nada de enchimento.
- Para corrigir estouro: encurte frases, troque parágrafo por tabela, reduza ilustração,
  divida em duas páginas quando o assunto realmente pedir (ex.: "Espaço aéreo (1/2)").

## 3. Estrutura de cada página de conteúdo

```html
<section class="page mod-reg" id="reg-vmc" data-toc="Regras VFR, VMC e alturas mínimas">
  <div class="hero">  <!-- .hero (40 mm) | .hero.tall (52) | .hero.short (30) | .hero.mini (22) -->
    <svg class="scene" viewBox="0 0 800 170" preserveAspectRatio="xMidYMid slice"><use href="#scene-airport"/></svg>
    <div class="ht">
      <span class="kicker">Regulamentos · Regras do Ar</span>
      <div class="title">VFR e VMC</div>          <!-- .title.sm / .title.xs para títulos longos -->
      <div class="sub">Subtítulo curto</div>
    </div>
    <div class="def">Definição curta em 1–2 linhas.</div>
    <div class="postit"><div class="pt">Ordem mental</div><ol><li>…</li></ol></div> <!-- opcional -->
  </div>

  <div class="grid"> <!-- 12 colunas; blocos com s3..s12, r2 para ocupar 2 linhas -->
    <div class="blk c-blue s6">
      <div class="bh"><span class="n">1</span>Título do bloco</div>
      <div class="bb"> …conteúdo… </div>
    </div>
    …6 a 10 blocos…
  </div>

  <div class="foot">  <!-- rodapé de revisão: SEMPRE presente nas páginas de conteúdo -->
    <div class="f-trap"><div class="fh">⚠ Pegadinha</div>…</div>
    <div class="f-conv"><div class="fh">⇄ Conversão</div>…</div>
    <div class="f-mem"><div class="fh">🧠 Memorize</div>…</div>
    <div class="f-q"><div class="fh">⚡ Questão relâmpago</div>Pergunta…<div class="ans">Resposta comentada…</div></div>
  </div>
</section>
```

Opcional antes do `.foot`: `<div class="resumo"><span class="rt">Resumo</span><div class="ri"><span>item</span>…</div></div>`.

### Cenários de cabeçalho disponíveis (`<use href="#...">` dentro de `svg.scene`)
`scene-airport` (pôr do sol, torre, jato) · `scene-storm` (CB, raio) · `scene-map` (carta, rosa dos ventos) ·
`scene-flight` (céu diurno, avião em voo com linhas de fluxo) · `scene-hangar` (hangar, hélice) ·
`scene-cockpit` (pista + instrumentos). Varie o cenário conforme o assunto.

### Cores de bloco
`c-blue c-orange c-red c-green c-purple c-teal c-pink c-yellow c-navy c-gray`; `solid` = cabeçalho cheio.
Alterne as cores como na referência (blocos vizinhos com cores diferentes).

### Componentes de texto
- Listas: `<ul class="l">`, `<ol class="l">`, `<ul class="chk">` (✔), `<ul class="chk x">` (✘).
- `.small` (8,6 pt) — use com moderação. Nunca use fonte menor que 8 pt em HTML.
- `.code` (código curto inline, não quebra linha) · `.msg` (mensagem completa METAR/TAF/NOTAM, quebra linha).
- `.hl` realce amarelo · `.k` palavra-chave colorida · `.lbl` rótulo pequeno em caixa-alta · `.sub-t` subtítulo.
- `.formula` (caixa azul-marinho) com `<span class="fx">T = D ÷ V</span><small>legenda</small>`.
- `.ex` exemplo resolvido: `<div class="ex"><span class="et">Exemplo resolvido</span><ol><li>passo…</li></ol></div>`.
- `.trap` (pegadinha) · `.mem` (memorize) · `.tip` (dica) · `.rel` (relação/causa-efeito) ·
  `.warn` (**"CONFIRME NA FONTE:"** — use quando o valor depende de publicação/aeronave/espaço aéreo).
- `.cause`: `<div class="cause"><span>↑ temperatura</span><i>→</i><span>↓ densidade</span><i>→</i><span>↓ desempenho</span></div>`.
- Tokens coloridos (estilo METAR): `<div class="tokrow"><span class="tok t-blue"><b>SBGR</b><em>1</em><small>legenda</small></span>…</div>`
  cores `t-blue t-pink t-yellow t-green t-purple t-orange t-teal t-red t-gray`.
- `.chip` etiqueta; `.row` / `.f1` / `.f2` / `.none` para colocar ilustração ao lado do texto.
- Tabelas: `<table class="tb">` (cabeçalho herda a cor do bloco; ou `style="--c:var(--green)"`).

## 4. Ilustrações (a parte mais importante)

Cada bloco relevante precisa de uma ilustração que **ensine** o conceito (não ícone decorativo).
Desenhe SVG inline, colorido, com rótulos, setas e legendas. Exemplos: forças com vetores
proporcionais; curva com sustentação inclinada e componentes; pista com marcas reais;
espaço aéreo em corte lateral com alturas; triângulo do vento com vetores e ângulos;
cilindros nos 4 tempos com válvulas abertas/fechadas; instrumento com ponteiro e fonte de pressão.

Biblioteca pronta em `src/sprite.svg` (use com `<use href="#id" x y width height/>` dentro do seu `<svg>`):

| id | o que é | viewBox |
|---|---|---|
| `plane-top` | Cessna asa alta visto de cima, nariz para cima | 120×120 |
| `plane-side` | Cessna de lado, nariz para a direita | 200×80 |
| `plane-front` | Cessna de frente | 160×80 |
| `jet-side` | jato comercial de lado | 220×70 |
| `tower`, `windsock` (aponta para +x), `runway-persp`, `terminal`, `hangar`, `city`, `tree`, `mountain` | aeródromo/paisagem | ver arquivo |
| `cloud`, `cloud-dark`, `cb`, `tcu`, `stratus`, `cirrus`, `rain`, `bolt`, `sun`, `snow`, `hail`, `fog`, `drop` | meteorologia | ver arquivo |
| `thermo` (vermelho), `thermo-blue` | termômetros | 30×100 |
| `compass-rose`, `chart`, `globe`, `pin` | navegação | ver arquivo |
| `bezel` (aro vazio p/ desenhar ponteiros), `alt-face`, `ai-face`, `hdg-face`, `dial-ticks` | instrumentos | 100×100 |
| `propeller`, `piston`, `battery`, `fuel-pump`, `checklist`, `clock`, `eye`, `radio`, `book` | sistemas / ícones | ver arquivo |

Marcadores de seta prontos: `marker-end="url(#arr)"` (cor do traço), `#arr-k` preto, `#arr-r` vermelho,
`#arr-b` azul, `#arr-g` verde, `#arr-o` laranja, `#arr-p` roxo. Hachura: `fill="url(#p-hatch)"`.
Gradientes: `g-sky-blue`, `g-earth` (horizonte), `g-cloud`, `g-metal`, `g-glass`, `g-day`, `g-sunset`.

Classes de texto SVG: `class="t"` (9px), `tb` (10px negrito), `tw` (branco), `th` (título 13px), `ts` (7,5px — evite).
**Atenção à escala**: o texto dentro do SVG é reduzido junto com o SVG. Se o viewBox tem 400 de largura e o
SVG ocupa 95 mm, 9px viram ~6 pt (reprovado pelo verificador). Use `style="font-size:13px"` ou mais nesses casos.
Regra prática: texto SVG final ≥ 7 pt. Sempre dê `width`/`height` ou `width="100%"` ao `<svg>`.

## 5. Regras de conteúdo (de cada assunto)

Para cada assunto, cubra (distribuído entre blocos e rodapé): o que é · como funciona · para que serve ·
como cai na prova · como interpretar · causa-efeito · fórmulas e unidades · exemplo resolvido ·
erros frequentes · pegadinha · regra de memorização · questão rápida com resposta comentada.

- Português do Brasil correto, com acentos. Termos técnicos com a sigla em inglês entre parênteses quando útil.
- Números: separador de milhar com ponto (1.500 ft), decimal com vírgula (1013,2 hPa).
- **Nunca invente** mínimos, velocidades, prazos ou limitações. Quando depender de publicação, classe de
  espaço aéreo, aeródromo ou aeronave, diga isso (bloco `.warn`). Use os FATOS DE REFERÊNCIA abaixo
  para manter a apostila consistente entre matérias.
- Não atribua questões à ANAC. As questões são inéditas, "no estilo da prova".
- Não use emojis além dos já presentes nos componentes (⚠ ⇄ 🧠 ⚡ ✔ ★).

## 6. Questões (páginas de exercícios e gabarito)

```html
<section class="page mod-reg" id="reg-questoes-1" data-toc="REG — 30 questões (1/4)">
  <div class="hero mini">…<div class="title">Questões · Regulamentos</div>…</div>
  <div class="qgrid">
    <div class="q"><span class="qn">01</span><span class="qt">Conceito</span>
      <div>Enunciado…</div>
      <div class="qfig"><svg …>…</svg></div>   <!-- opcional: figura/diagrama/METAR -->
      <ol class="op"><li>alternativa</li><li>…</li><li>…</li><li>…</li></ol>
    </div>
    …
  </div>
</section>
```
- `qgrid` = 2 colunas; se transbordar, o verificador acusa → mova questões para a próxima página.
- Tipos (`.qt`): Conceito · Interpretação · Cálculo · Figura · METAR/TAF · Carta · Instrumento · Gráfico.
- 4 alternativas (a–d), só uma correta, distratores plausíveis. Distribua as letras corretas de forma
  equilibrada (≈ 7–8 de cada letra em 30).
- Gabarito em páginas separadas: primeiro a grade rápida
  `<div class="anskey"><div><span>01</span>C</div>…</div>` e depois comentários
  `<div class="gab"><span class="gn">01 — C</span> <span class="ok">Correta:</span> por que está certa.
  <span class="no">a) erro… b) erro… d) erro…</span></div>` dentro de `<div class="qgrid">`.
- Páginas de questões/gabarito não precisam de `.foot`.

## 7. FATOS DE REFERÊNCIA (use exatamente estes valores; se discordar de algum, sinalize ao coordenador)

**Prova**: PPA tem 5 matérias; cada uma com 20 questões de múltipla escolha; aprovação exige ≥ 70 % em cada
matéria (14/20). Conteúdo programático: IS 00-003H (Apêndice D = objetivos de aprendizagem).
Oriente o aluno a confirmar formato/duração no agendamento oficial.

**Órgãos**: OACI/ICAO (Convenção de Chicago, 1944; Anexos, SARPs) · ANAC (agência reguladora — licenças,
CMA, RBAC, aeronavegabilidade, registro via RAB) · DECEA (Comando da Aeronáutica — espaço aéreo, ATS, AIS,
meteorologia aeronáutica, publica ICA/MCA/AIP) · CENIPA (SIPAER — investigação e prevenção; investigação
não busca culpados) · CBAer = Lei 7.565/1986.
RBAC 61 (licenças/habilitações) · RBAC 67 (CMA) · RBAC 91 (regras gerais de operação) · RBAC 45 (marcas) ·
RBAC 43 (manutenção). ICA 100-12 (Regras do Ar) · ICA 100-11 (plano de voo) · ICA 100-37 (serviços de tráfego
aéreo) · MCA 100-16 (fraseologia). AIP Brasil (GEN/ENR/AD) · ROTAER · SUP AIP · AIC · NOTAM · AISWEB · REDEMET.

**PP**: idade mínima 17 anos; CMA de 2ª classe. Validade CMA 2ª classe (RBAC 67): 60 meses se < 40 anos;
24 meses de 40 a < 50; 12 meses a partir de 50 (confirmar emenda vigente). PP não pode ser remunerado nem
atuar em transporte aéreo público. Experiência recente para levar passageiros: 3 decolagens e 3 pousos nos
últimos 90 dias na categoria/classe (noite: pousos noturnos) — "confirme RBAC 61 vigente".
Marcas de nacionalidade do Brasil: PP, PR, PS, PT, PU.

**VFR/VMC (ICA 100-12)**:
- Classes B, C, D, E, F, G acima de 3.000 ft AMSL ou 1.000 ft sobre o terreno (o maior): visibilidade
  8 km no/acima do FL100 e 5 km abaixo do FL100; distância de nuvens 1.500 m horizontal e 300 m (1.000 ft) vertical.
- Classes F e G no/abaixo de 3.000 ft AMSL ou 1.000 ft sobre o terreno (o maior): visibilidade 5 km,
  livre de nuvens e com a superfície à vista.
- VFR não pousa, decola, entra na ATZ ou no circuito de aeródromo controlado com teto < 1.500 ft (450 m)
  ou visibilidade no solo < 5 km, salvo autorização ATC (VFR especial).
- VFR especial: só em CTR/ATZ com autorização ATC; teto ≥ 1.000 ft e visibilidade ≥ 3.000 m.
- VFR somente abaixo do FL150 (último nível VFR: FL145). Velocidade máxima 250 kt IAS abaixo do FL100
  (exceto quando autorizado/classe A-B conforme publicação).
- Níveis de cruzeiro VFR (acima de 3.000 ft de altura), pelo RUMO MAGNÉTICO: 000°–179° → ímpares + 500
  (FL035, 055, 075…135); 180°–359° → pares + 500 (FL045, 065…145).
- Alturas mínimas: sobre cidades/povoados/aglomerações: 1.000 ft acima do obstáculo mais alto num raio de
  600 m; demais lugares: 500 ft acima do solo ou água (exceto pouso/decolagem).
**Classes de espaço aéreo**: A só IFR · B IFR+VFR, todos separados · C IFR separado de IFR e VFR; VFR separado
de IFR e recebe informação sobre VFR · D IFR separado de IFR; todos recebem informação de tráfego · E IFR
separado de IFR; VFR não precisa de autorização · F assessoramento IFR (não controlado) · G só informação de voo.
A–E controlados; F e G não controlados. FIRs do Brasil: Amazônica, Brasília, Curitiba, Recife e Atlântico.
Órgãos: ACC (controla CTA/aerovias/FIR), APP (TMA/CTR), TWR (ATZ/circuito/pista), AFIS (aeródromo não
controlado — só informação). ATZ, CTR, TMA: dimensões variam — sempre "conforme publicado na AIP/cartas".

**Direito de passagem**: aeronave em emergência tem prioridade absoluta. Ordem geral de prioridade
(ICA 100-12/Anexo 2): aerodinos motorizados cedem a dirigíveis, planadores e balões; dirigíveis cedem a planadores e balões; planadores cedem a balões; TODA aeronave motorizada (inclusive dirigível) cede à aeronave que está rebocando outra aeronave/objeto.
Aproximação de frente: ambas guinam para a DIREITA. Convergência (mesmo nível): quem vê a outra à sua
DIREITA cede passagem. Ultrapassagem: a ultrapassada tem preferência; a que ultrapassa desvia para a
DIREITA. Pouso: aeronave mais baixa tem prioridade (sem cortar a frente de outra na final); aeronave em
pouso tem prioridade sobre as que estão no solo.

**Sinais luminosos da TWR** (em voo / no solo): verde contínuo = autorizado pousar / autorizado decolar ·
verde intermitente = regresse para pousar / autorizado taxiar · vermelho contínuo = ceda passagem e continue
circulando / pare · vermelho intermitente = aeródromo impraticável, não pouse / afaste-se da área de pouso ·
branco intermitente = pouse neste aeródromo e dirija-se ao pátio / regresse ao ponto de partida no aeródromo ·
pirotécnico vermelho = não pouse por enquanto (apesar de instruções anteriores).
Transponder: 7500 interferência ilícita · 7600 falha de comunicação · 7700 emergência.
Circuito de tráfego padrão: curvas à ESQUERDA, salvo publicação; pernas: decolagem (saída), través (de
través), perna do vento, base, final. Entrada preferencial a 45° na perna do vento. Altura do circuito:
"conforme publicado (tipicamente 1.000 ft AGL para aviões convencionais)".

**Plano de voo (ICA 100-11)**: PVC apresentado com antecedência mínima de 45 min da EOBT (30 min quando
apresentado pela internet/AISWEB — confirmar na ICA vigente). EOBT = hora estimada de calços fora; EET =
tempo estimado em rota; autonomia em HHMM. Combustível VFR (RBAC 91): diurno = até o destino + 30 min;
noturno = + 45 min (confirmar RBAC 91 vigente).

**Pista**: designador = rumo magnético ÷ 10 arredondado (ex.: 087° → 09). Cabeceiras opostas diferem
de 18. Paralelas L/C/R. Luzes: borda branca, cabeceira verde, fim de pista vermelho, borda de táxi azul,
eixo de táxi verde. PAPI: 2 brancas + 2 vermelhas = na rampa; todas brancas = muito alto; todas vermelhas =
muito baixo. Ponto de espera de pista: 2 faixas contínuas + 2 tracejadas amarelas (contínuas do lado da
espera). X = pista/trecho interditado.

**ISA**: 15 °C e 1013,25 hPa (29,92 inHg) ao nível médio do mar; densidade 1,225 kg/m³; gradiente
≈ 2 °C/1.000 ft (1,98) ou 0,65 °C/100 m até a tropopausa (11 km ≈ 36.089 ft, −56,5 °C).
1 hPa ≈ 30 ft perto do nível do mar (valor didático; exato ≈ 27 ft). QNH → altitude; QFE → altura (zero na
pista); QNE/1013,2 → nível de voo/altitude-pressão. "De ALTA para BAIXA (pressão ou temperatura), cuidado:
o altímetro indica MAIS do que a altitude real." Altitude de transição (TA) e nível de transição (TL):
publicados por TMA/aeródromo; subindo, ajusta 1013,2 ao passar a TA; descendo, ajusta QNH ao passar o TL.
Gradiente adiabático seco ≈ 3 °C/1.000 ft; saturado ≈ 1,5 °C/1.000 ft (varia); ponto de orvalho ≈ 0,5 °C/1.000 ft.
Base de nuvem cumuliforme ≈ (T − Td) × 400 ft (ou × 125 m).
Hemisfério Sul: baixa pressão (ciclone) gira no sentido HORÁRIO; alta (anticiclone) ANTI-HORÁRIO;
Coriolis desvia para a ESQUERDA. No Brasil, frente fria avança de SW/S para NE/N.
CB — fases: cumulus (só ascendentes) → maturidade (ascendentes + descendentes, chuva, granizo, raios — mais
perigosa) → dissipação (predominam descendentes). Ingredientes: umidade, instabilidade, mecanismo de levantamento.
SIGMET: validade até 4 h (6 h para cinzas vulcânicas/ciclone tropical). TAF: BECMG, TEMPO, FM, PROB30/40,
TX/TN. Visibilidade FG < 1.000 m; BR 1.000–5.000 m.

**Navegação**: 1 NM = 1.852 m; 1 ft = 0,3048 m; 1 m ≈ 3,28 ft; 1 kt = 1,852 km/h; 1 SM = 1.609 m;
1' de latitude = 1 NM; 1° de latitude = 60 NM ≈ 111 km; 1° de longitude = 60 × cos(lat) NM.
15° de longitude = 1 h; 1° = 4 min. Fusos brasileiros: UTC−2 (Fernando de Noronha), UTC−3 (Brasília),
UTC−4 (AM, MT, MS, RO, RR…), UTC−5 (Acre); o Brasil não adota horário de verão desde 2019.
Declinação no Brasil é majoritariamente OESTE (W). Verdadeiro → magnético: W soma, E subtrai
("Oeste é Mais, lEste é mEnos"). Magnético → bússola: aplica o desvio (cartão de desvios).
Proa = para onde aponta o nariz; rumo = direção pretendida (linha na carta); rota/trajetória = caminho real
sobre o solo; deriva = ângulo entre proa e trajetória. IAS → CAS (erros de instalação) → TAS (densidade;
≈ +2 % por 1.000 ft) → GS (vento). Regra dos 60: 1° de erro ≈ 1 NM de afastamento a cada 60 NM.
Combustível: Avgas 100LL ≈ 0,72 kg/L (≈ 6 lb/US gal); 1 US gal = 3,785 L.

**Teoria de voo**: L = CL · ½ρV² · S. Fator de carga n = 1/cos(inclinação): 30° → 1,15; 45° → 1,41;
60° → 2,0. Vs em curva = Vs × √n (60° → +41 %). Arrasto induzido ∝ 1/V²; parasita ∝ V²; arrasto total
mínimo onde são iguais (≈ L/D máx = melhor planeio). Estol ocorre sempre no MESMO ângulo de ataque crítico,
em qualquer velocidade/atitude. Eixo longitudinal → rolagem (ailerons); eixo lateral → arfagem (profundor);
eixo vertical → guinada (leme). Estabilidade LONGITUDINAL = em torno do eixo LATERAL (arfagem).
Hélice girando no sentido horário visto do piloto: torque (rola à esquerda), esteira helicoidal, fator P
e precessão → tendência de guinar/rolar à esquerda. Precessão: a força age 90° adiante no sentido de rotação.
CG dianteiro: mais estável, Vs maior, mais força no profundor. CG traseiro: menos estável, Vs menor,
recuperação de parafuso/estol mais difícil. Categorias: normal +3,8 g/−1,52 g; utilidade +4,4/−1,76;
acrobática +6/−3. Arcos: branco (Vs0 → Vfe), verde (Vs1 → Vno), amarelo (Vno → Vne), linha vermelha Vne.
Va NÃO é marcada no velocímetro e diminui com a redução do peso.

**CTA**: 4 tempos: admissão, compressão, combustão/expansão (único tempo motor), escape; 2 voltas do
virabrequim por ciclo. Dupla ignição (2 magnetos, 2 velas por cilindro); magneto independe do sistema
elétrico. Detonação = queima explosiva da mistura após a centelha (motor quente, mistura pobre, octanagem
baixa); pré-ignição = queima antes da centelha (pontos quentes). Gelo de carburador: queda de RPM (passo
fixo); ao aplicar ar quente a RPM cai mais e depois sobe se havia gelo; risco alto entre ≈ −7 °C e +21 °C
com umidade alta (possível até ≈ 38 °C). Motores injetados não têm gelo de carburador (mas há gelo de
indução/filtro). Pitot-estático: velocímetro (pitot + estática), altímetro e VSI (só estática).
Pitot obstruído com dreno livre → velocímetro vai a zero; pitot e dreno obstruídos → velocímetro age como
altímetro (aumenta na subida). Estática obstruída → altímetro congela, VSI zero, velocímetro indica menos
na subida e mais na descida. Fonte estática alternada (dentro da cabine, pressão menor) → altímetro e
velocímetro indicam a mais. Giroscópios: rigidez (horizonte, direcional) e precessão (coordenador de curva).
Direcional deve ser realinhado com a bússola (≈ a cada 15 min). Erros da bússola de inclinação magnética
(aceleração e curva) se INVERTEM no Hemisfério Sul em relação às regras do Hemisfério Norte.
Momento = peso × braço; CG = Σ momentos ÷ Σ pesos.

**Cessna 172R (PT-WVR)**: NUNCA apresente números como "do PT-WVR". Quando citar valores, apresente-os como
"referência do modelo Cessna 172R (POH) — confirme no POH/AFM, suplementos e checklist do PT-WVR" e deixe
um campo "PT-WVR: ____" para o aluno conferir. Valores de referência do modelo permitidos: motor Lycoming
IO-360-L2A (injeção, 160 hp a 2.400 rpm), hélice de passo fixo; Vne 163 KIAS; Vno 129 KIAS; Vfe 110 KIAS
(flape 10°) e 85 KIAS (flape > 10°); Va 105 KIAS a 2.450 lb (diminui com o peso); Vx 60 KIAS; Vy 79 KIAS;
melhor planeio 65 KIAS; vento cruzado máximo demonstrado 15 kt; peso máximo de decolagem 2.450 lb
(categoria normal); combustível 56 US gal totais / 53 utilizáveis (tanques padrão); óleo 8 qt;
sistema elétrico 28 V; trem triciclo fixo; flapes elétricos 0°–30°; seletora LEFT/BOTH/RIGHT e válvula
de corte separada; bomba auxiliar elétrica. Velocidades de estol: deixe em branco para o aluno preencher
do POH. Qualquer outro número: campo em branco "confirme no POH".
