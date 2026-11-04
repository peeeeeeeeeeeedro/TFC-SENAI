/* ==========================================================================
   Banco de perguntas do quiz — Outubro Rosa & Novembro Azul
   Para adicionar perguntas, copie um objeto e ajuste os campos.
   - tema: "rosa" | "azul" | "geral"  (define a etiqueta colorida)
   - correta: índice (começa em 0) da alternativa correta em "alternativas"
   - explicacao: texto exibido após a resposta
   ========================================================================== */

window.QUIZ_PERGUNTAS = [
  {
    tema: "rosa",
    pergunta: "O Outubro Rosa é uma campanha dedicada à conscientização sobre qual doença?",
    alternativas: [
      "Câncer de colo do útero",
      "Câncer de mama",
      "Câncer de ovário",
      "Diabetes"
    ],
    correta: 1,
    explicacao:
      "O Outubro Rosa nasceu para estimular a prevenção e o diagnóstico precoce do câncer de mama, o tipo de câncer mais comum entre as mulheres no Brasil."
  },
  {
    tema: "rosa",
    pergunta: "Qual exame é considerado o principal método de rastreamento do câncer de mama?",
    alternativas: [
      "Mamografia",
      "Ultrassom de abdome",
      "Hemograma completo",
      "Ressonância da coluna"
    ],
    correta: 0,
    explicacao:
      "A mamografia é capaz de identificar alterações antes de serem percebidas ao toque. No SUS, o rastreamento costuma ser indicado para mulheres de 50 a 69 anos, a cada dois anos."
  },
  {
    tema: "rosa",
    pergunta: "Qual destas situações NÃO é um sinal de alerta para o câncer de mama?",
    alternativas: [
      "Nódulo endurecido e geralmente indolor",
      "Pele da mama avermelhada ou com aspecto de casca de laranja",
      "Saída de líquido anormal pelo mamilo",
      "Dor passageira e igual nos dois seios antes da menstruação"
    ],
    correta: 3,
    explicacao:
      "Dor cíclica e simétrica costuma estar relacionada a alterações hormonais benignas. Já nódulos fixos, alterações na pele, retração do mamilo e secreções anormais merecem avaliação médica."
  },
  {
    tema: "rosa",
    pergunta: "Homens podem desenvolver câncer de mama?",
    alternativas: [
      "Sim, embora seja raro",
      "Não, apenas mulheres",
      "Somente se tiverem câncer de próstata",
      "Sim, e é o câncer mais comum entre eles"
    ],
    correta: 0,
    explicacao:
      "Homens também têm tecido mamário e podem ter câncer de mama, ainda que represente cerca de 1% dos casos. Histórico familiar e alterações genéticas aumentam o risco."
  },
  {
    tema: "rosa",
    pergunta: "O autoexame das mamas substitui a mamografia?",
    alternativas: [
      "Não: conhecer o próprio corpo ajuda, mas não substitui os exames de rastreamento",
      "Sim, desde que seja feito todos os dias",
      "Sim, a partir dos 40 anos",
      "Só substitui em mulheres sem histórico familiar"
    ],
    correta: 0,
    explicacao:
      "O autoexame ajuda a reconhecer o que é normal para cada corpo e a perceber mudanças. Porém, ele não detecta lesões pequenas e não substitui a mamografia nem a avaliação médica."
  },
  {
    tema: "azul",
    pergunta: "O Novembro Azul tem como foco principal a saúde de quem?",
    alternativas: [
      "Das mulheres, com foco no câncer de mama",
      "Dos homens, com destaque para o câncer de próstata",
      "Das crianças, com foco na vacinação",
      "Das pessoas idosas, com foco na audição"
    ],
    correta: 1,
    explicacao:
      "O Novembro Azul é uma campanha de conscientização sobre a saúde do homem. O câncer de próstata é o tema mais conhecido, mas a campanha também aborda saúde mental, cardiovascular e prevenção em geral."
  },
  {
    tema: "azul",
    pergunta:
      "Em homens sem fatores de risco, a conversa sobre rastreamento do câncer de próstata costuma começar a partir de qual idade?",
    alternativas: ["30 anos", "40 anos", "50 anos", "70 anos"],
    correta: 2,
    explicacao:
      "Em geral, a discussão sobre rastreamento começa aos 50 anos. Quem tem histórico familiar ou outros fatores de risco pode iniciar mais cedo, aos 45, sempre com avaliação médica."
  },
  {
    tema: "azul",
    pergunta: "Qual é a função do toque retal na avaliação da próstata?",
    alternativas: [
      "Substituir o exame de PSA",
      "Avaliar tamanho, consistência e possíveis alterações da próstata",
      "Diagnosticar apenas hemorroidas",
      "Não tem utilidade médica"
    ],
    correta: 1,
    explicacao:
      "O toque retal é rápido e permite ao médico sentir a glândula e identificar nódulos ou áreas endurecidas. Ele complementa o exame de PSA — um não substitui o outro."
  },
  {
    tema: "azul",
    pergunta: "O câncer de próstata em fase inicial costuma se manifestar como?",
    alternativas: [
      "Com muitos sintomas urinários",
      "De forma silenciosa, sem sintomas",
      "Com febre alta e manchas na pele",
      "Apenas com dor lombar intensa"
    ],
    correta: 1,
    explicacao:
      "Na fase inicial, o câncer de próstata geralmente não causa sintomas. Por isso, a conversa com o médico e os exames de rastreamento são importantes, especialmente após os 50 anos."
  },
  {
    tema: "azul",
    pergunta: "Qual destas afirmações sobre o exame de PSA é correta?",
    alternativas: [
      "PSA alto confirma câncer de próstata",
      "PSA é um exame de imagem",
      "PSA pode se alterar por outras causas, como infecções e aumento benigno da próstata",
      "PSA só pode ser feito após os 70 anos"
    ],
    correta: 2,
    explicacao:
      "O PSA é uma proteína produzida pela próstata e pode aumentar em situações benignas, como inflamações. Resultados alterados precisam ser interpretados pelo médico, com outros exames."
  },
  {
    tema: "geral",
    pergunta: "Qual hábito está associado à redução do risco de vários tipos de câncer?",
    alternativas: [
      "Fumar cigarros de palha em vez de industrializados",
      "Consumir bebida alcoólica diariamente",
      "Manter alimentação equilibrada e praticar atividade física",
      "Dormir menos de cinco horas por noite"
    ],
    correta: 2,
    explicacao:
      "Alimentação equilibrada, atividade física regular, controle do peso e redução do álcool e do tabaco ajudam a prevenir vários tipos de câncer — não só o de mama e o de próstata."
  },
  {
    tema: "geral",
    pergunta: "Ao perceber um nódulo ou qualquer alteração suspeita, o mais indicado é:",
    alternativas: [
      "Esperar alguns meses para ver se desaparece sozinho",
      "Procurar um serviço de saúde o quanto antes",
      "Iniciar tratamento por conta própria",
      "Pesquisar sintomas na internet e se autodiagnosticar"
    ],
    correta: 1,
    explicacao:
      "A avaliação profissional é o caminho mais seguro. A maioria dos nódulos é benigna, mas somente um exame médico pode confirmar — e o diagnóstico precoce aumenta muito as chances de tratamento bem-sucedido."
  },
  {
    tema: "geral",
    pergunta: "O que a ciência diz sobre a relação entre desodorante e câncer de mama?",
    alternativas: [
      "Desodorante comprovadamente causa câncer de mama",
      "Não há evidência científica consistente de que desodorante cause câncer de mama",
      "Apenas antitranspirantes causam câncer",
      "Só causa câncer em homens"
    ],
    correta: 1,
    explicacao:
      "Essa é uma crença popular, mas não há evidência científica consistente ligando o uso de desodorantes ao câncer de mama. Desconfie de informações alarmistas sem fonte confiável."
  }
];
