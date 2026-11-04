/* ==========================================================================
   Laço de Cuidado — Lógica do quiz interativo
   Fluxo: tela inicial -> perguntas (com feedback imediato) -> resultado
   Recursos: embaralhamento, progresso, leitura acessível, melhor pontuação
   ========================================================================== */

(function () {
  "use strict";

  var CHAVE_RECORDE = "laco-de-cuidado:recorde-quiz";
  var LETRAS = ["A", "B", "C", "D", "E"];

  var el = {
    inicio: document.getElementById("tela-inicio"),
    pergunta: document.getElementById("tela-pergunta"),
    resultado: document.getElementById("tela-resultado"),
    btnComecar: document.getElementById("btn-comecar"),
    btnProxima: document.getElementById("btn-proxima"),
    progressoTexto: document.getElementById("progresso-texto"),
    progressoPct: document.getElementById("progresso-pct"),
    progressoWrap: document.getElementById("progresso-barra-wrap"),
    progressoBarra: document.getElementById("progresso-barra"),
    tema: document.getElementById("pergunta-tema"),
    texto: document.getElementById("pergunta-texto"),
    opcoes: document.getElementById("pergunta-opcoes"),
    feedback: document.getElementById("feedback"),
    dica: document.getElementById("quiz-dica"),
    melhor: document.getElementById("melhor-pontuacao"),
    resultadoTitulo: document.getElementById("resultado-titulo"),
    resultadoMensagem: document.getElementById("resultado-mensagem"),
    resultadoAnel: document.getElementById("resultado-anel"),
    resultadoAcertos: document.getElementById("resultado-acertos"),
    resultadoTotal: document.getElementById("resultado-total"),
    revisaoTitulo: document.getElementById("revisao-titulo"),
    revisao: document.getElementById("revisao-lista"),
    btnRefazer: document.getElementById("btn-refazer")
  };

  if (!el.inicio) return; // O script só age na página do quiz.

  var perguntas = [];
  var indice = 0;
  var acertos = 0;
  var respondedores = [];
  var respostas = [];
  var bloqueado = false;

  var TEMAS = {
    rosa: { rotulo: "Outubro Rosa", classe: "quiz-tag--rosa" },
    azul: { rotulo: "Novembro Azul", classe: "quiz-tag--azul" },
    geral: { rotulo: "Prevenção e saúde", classe: "quiz-tag--geral" }
  };

  var ICONE_OK =
    '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';
  var ICONE_ERRO =
    '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="m9 9 6 6M15 9l-6 6"/></svg>';

  /* ---------------------------------------------------------------------- */
  /* Utilidades                                                             */
  /* ---------------------------------------------------------------------- */
  function embaralhar(lista) {
    var copia = lista.slice();
    for (var i = copia.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = copia[i];
      copia[i] = copia[j];
      copia[j] = temp;
    }
    return copia;
  }

  function mostrar(tela) {
    [el.inicio, el.pergunta, el.resultado].forEach(function (secao) {
      secao.hidden = secao !== tela;
    });
  }

  function salvarRecorde(nota, total) {
    try {
      window.localStorage.setItem(CHAVE_RECORDE, JSON.stringify({ nota: nota, total: total }));
    } catch (erro) {
      /* localStorage indisponível: o quiz continua funcionando normalmente. */
    }
  }

  function recordeValido() {
    try {
      var bruto = window.localStorage.getItem(CHAVE_RECORDE);
      if (!bruto) return null;
      var dados = JSON.parse(bruto);
      if (typeof dados === "number") return { nota: dados, total: 0 };
      return dados;
    } catch (erro) {
      return null;
    }
  }

  function atualizarRecordeNaTela() {
    if (!el.melhor) return;
    var recorde = recordeValido();
    if (!recorde) {
      el.melhor.hidden = true;
      return;
    }
    el.melhor.hidden = false;
    el.melhor.innerHTML =
      "Seu melhor resultado: <strong>" +
      recorde.nota +
      " acerto" +
      (recorde.nota === 1 ? "" : "s") +
      "</strong>" +
      (recorde.total ? " em " + recorde.total : "") +
      ".";
  }

  /* ---------------------------------------------------------------------- */
  /* Início e reinício                                                      */
  /* ---------------------------------------------------------------------- */
  function iniciar() {
    var base = window.QUIZ_PERGUNTAS || [];
    if (!base.length) {
      el.inicio.innerHTML =
        "<h2>Quiz indisponível</h2><p>Não foi possível carregar as perguntas. Verifique o arquivo <code>js/perguntas.js</code>.</p>";
      return;
    }

    // Embaralha perguntas e alternativas; guarda o texto correto para conferir.
    perguntas = embaralhar(base).map(function (item) {
      var corretaTexto = item.alternativas[item.correta];
      var opcoes = embaralhar(item.alternativas).map(function (texto) {
        return { texto: texto, correta: texto === corretaTexto };
      });
      return {
        tema: item.tema,
        pergunta: item.pergunta,
        explicacao: item.explicacao,
        opcoes: opcoes
      };
    });

    indice = 0;
    acertos = 0;
    respostas = [];
    mostrar(el.pergunta);
    renderizarPergunta();
  }

  /* ---------------------------------------------------------------------- */
  /* Renderização da pergunta                                              */
  /* ---------------------------------------------------------------------- */
  function renderizarPergunta() {
    var pergunta = perguntas[indice];
    var total = perguntas.length;
    var numero = indice + 1;
    var pct = Math.round((indice / total) * 100);

    bloqueado = false;
    el.feedback.textContent = "";
    el.feedback.className = "quiz-feedback";
    el.btnProxima.hidden = true;
    el.btnProxima.textContent =
      indice === total - 1 ? "Ver meu resultado" : "Próxima pergunta";
    el.dica.textContent = "Selecione uma alternativa.";

    // Progresso
    el.progressoTexto.textContent = "Pergunta " + numero + " de " + total;
    el.progressoPct.textContent = pct + "%";
    el.progressoBarra.style.width = pct + "%";
    el.progressoWrap.setAttribute("aria-valuenow", String(pct));
    el.progressoWrap.setAttribute(
      "aria-valuetext",
      "Pergunta " + numero + " de " + total
    );

    // Etiqueta do tema
    var tema = TEMAS[pergunta.tema] || TEMAS.geral;
    el.tema.textContent = tema.rotulo;
    el.tema.className = "quiz-tag " + tema.classe;

    // Pergunta
    el.texto.textContent = pergunta.pergunta;

    // Alternativas
    el.opcoes.innerHTML = "";
    pergunta.opcoes.forEach(function (opcao, i) {
      var li = document.createElement("li");
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "option-btn";
      btn.dataset.indice = String(i);
      btn.innerHTML =
        '<span class="option-letter" aria-hidden="true">' +
        LETRAS[i] +
        "</span>" +
        "<span>" +
        opcao.texto +
        "</span>";
      btn.addEventListener("click", function () {
        responder(i, btn);
      });
      li.appendChild(btn);
      el.opcoes.appendChild(li);
    });

    // Move o foco para a pergunta, sem rolar a página
    el.texto.focus({ preventScroll: true });
  }

  /* ---------------------------------------------------------------------- */
  /* Resposta                                                               */
  /* ---------------------------------------------------------------------- */
  function responder(indiceOpcao, botao) {
    if (bloqueado) return;
    bloqueado = true;

    var pergunta = perguntas[indice];
    var correta = pergunta.opcoes[indiceOpcao].correta;
    var botoes = el.opcoes.querySelectorAll(".option-btn");

    botoes.forEach(function (btn, i) {
      btn.disabled = true;
      if (pergunta.opcoes[i].correta) {
        btn.classList.add("is-correct");
      } else if (i === indiceOpcao) {
        btn.classList.add("is-wrong");
      } else {
        btn.classList.add("is-muted");
      }
    });

    if (correta) {
      acertos++;
      el.feedback.className = "quiz-feedback is-correct";
      el.feedback.innerHTML =
        "<strong>" +
        ICONE_OK +
        "Resposta correta!</strong><p>" +
        pergunta.explicacao +
        "</p>";
      el.dica.textContent = "Boa! Continue assim.";
    } else {
      var textoCorreto = pergunta.opcoes.filter(function (o) {
        return o.correta;
      })[0].texto;
      el.feedback.className = "quiz-feedback is-wrong";
      el.feedback.innerHTML =
        "<strong>" +
        ICONE_ERRO +
        "Não foi essa.</strong><p>A resposta correta é: <strong>" +
        textoCorreto +
        "</strong>. " +
        pergunta.explicacao +
        "</p>";
      el.dica.textContent = "Tudo bem errar — o importante é aprender.";
    }

    respostas.push({
      pergunta: pergunta.pergunta,
      acertou: correta,
      corretaTexto: pergunta.opcoes.filter(function (o) {
        return o.correta;
      })[0].texto,
      explicacao: pergunta.explicacao,
      tema: pergunta.tema
    });

    el.btnProxima.hidden = false;
    el.btnProxima.focus();
  }

  /* ---------------------------------------------------------------------- */
  /* Navegação                                                              */
  /* ---------------------------------------------------------------------- */
  el.btnComecar.addEventListener("click", iniciar);

  el.btnProxima.addEventListener("click", function () {
    if (indice < perguntas.length - 1) {
      indice++;
      renderizarPergunta();
    } else {
      mostrarResultado();
    }
  });

  el.btnRefazer.addEventListener("click", function () {
    mostrar(el.inicio);
    atualizarRecordeNaTela();
    el.btnComecar.focus();
  });

  /* ---------------------------------------------------------------------- */
  /* Resultado                                                              */
  /* ---------------------------------------------------------------------- */
  function mostrarResultado() {
    var total = perguntas.length;
    var pct = Math.round((acertos / total) * 100);

    mostrar(el.resultado);
    el.resultadoAnel.style.setProperty("--pct", String(pct));
    el.resultadoAcertos.textContent = String(acertos);
    el.resultadoTotal.textContent = String(total);

    var titulo, mensagem;
    if (pct === 100) {
      titulo = "Perfeito! Você é um multiplicador da prevenção.";
      mensagem =
        "Acertou tudo. Agora compartilhe o que aprendeu: informação de qualidade também salva vidas.";
    } else if (pct >= 70) {
      titulo = "Muito bem! Você está no caminho certo.";
      mensagem =
        "Você já domina os pontos principais. Revise as questões abaixo e ajude a espalhar essa informação.";
    } else if (pct >= 40) {
      titulo = "Bom começo! Vale reforçar alguns pontos.";
      mensagem =
        "Aprender sobre prevenção é um processo. Releia as explicações, visite as áreas das campanhas e tente novamente.";
    } else {
      titulo = "Vamos aprender juntos?";
      mensagem =
        "Sem problema: este quiz é uma oportunidade de aprender. Explore as áreas do site e refaça o teste quando quiser.";
    }

    el.resultadoTitulo.textContent = titulo;
    el.resultadoMensagem.textContent = mensagem;

    // Revisão das questões erradas
    var erradas = respostas.filter(function (r) {
      return !r.acertou;
    });

    el.revisao.innerHTML = "";
    if (!erradas.length) {
      el.revisaoTitulo.textContent = "Você acertou todas as questões!";
      el.revisaoTitulo.hidden = false;
    } else {
      el.revisaoTitulo.hidden = false;
      el.revisaoTitulo.textContent =
        "Revise o que ficou para trás (" + erradas.length + ")";
      erradas.forEach(function (r) {
        var li = document.createElement("li");
        li.innerHTML =
          ICONE_ERRO.replace('class="ico"', 'class="ico no"') +
          "<span><strong>" +
          r.pergunta +
          "</strong><br>Resposta correta: " +
          r.corretaTexto +
          "</span>";
        el.revisao.appendChild(li);
      });
    }

    // Recorde
    var recorde = recordeValido();
    if (!recorde || acertos > recorde.nota) {
      salvarRecorde(acertos, total);
    }

    var tituloFoco = el.resultadoTitulo;
    tituloFoco.setAttribute("tabindex", "-1");
    tituloFoco.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ---------------------------------------------------------------------- */
  /* Inicialização                                                          */
  /* ---------------------------------------------------------------------- */
  atualizarRecordeNaTela();
})();
