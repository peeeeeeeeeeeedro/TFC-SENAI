/* ==========================================================================
   Laço de Cuidado — JavaScript compartilhado por todas as páginas
   - Menu mobile acessível
   - Ano automático no rodapé
   - Animação de entrada das seções (respeita prefers-reduced-motion)
   - Marcação do link ativo quando o HTML não define aria-current
   ========================================================================== */

(function () {
  "use strict";

  /* ---------------------------------------------------------------------- */
  /* 1. Menu mobile                                                         */
  /* ---------------------------------------------------------------------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("menu-principal");

  function setMenu(open) {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
    var label = toggle.querySelector(".sr-only");
    if (label) label.textContent = open ? "Fechar menu" : "Abrir menu";
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });

    // Fecha ao clicar em um link (navegação por âncora)
    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) setMenu(false);
    });

    // Fecha com Esc e devolve o foco ao botão
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        toggle.focus();
      }
    });

    // Fecha ao clicar fora
    document.addEventListener("click", function (event) {
      if (!nav.contains(event.target) && !toggle.contains(event.target)) {
        setMenu(false);
      }
    });

    // Volta ao estado fechado em telas grandes
    var desktop = window.matchMedia("(min-width: 761px)");
    var onChange = function (event) {
      if (event.matches) setMenu(false);
    };
    if (desktop.addEventListener) desktop.addEventListener("change", onChange);
    else if (desktop.addListener) desktop.addListener(onChange);
  }

  /* ---------------------------------------------------------------------- */
  /* 2. Ano atual no rodapé                                                 */
  /* ---------------------------------------------------------------------- */
  document.querySelectorAll("[data-ano]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* ---------------------------------------------------------------------- */
  /* 3. Animação de entrada                                                 */
  /* ---------------------------------------------------------------------- */
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealItems = document.querySelectorAll(".reveal");

  if (prefersReduced || !("IntersectionObserver" in window)) {
    revealItems.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    revealItems.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---------------------------------------------------------------------- */
  /* 4. Link ativo (fallback)                                               */
  /* ---------------------------------------------------------------------- */
  var current = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".site-nav a").forEach(function (link) {
    if (!link.hasAttribute("aria-current") && link.getAttribute("href") === current) {
      link.setAttribute("aria-current", "page");
    }
  });
})();
