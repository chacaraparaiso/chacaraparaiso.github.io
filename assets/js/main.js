/* Chácara Paraíso — comportamento do site. Os textos ficam em config.js */
(function () {
  "use strict";
  const C = window.CONFIG;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const isMobile = matchMedia("(max-width: 760px)").matches;
  const calmo = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ================= WhatsApp =================
     Antes o site usava window.open(..., "noopener"), que o celular
     bloqueia como pop-up (principalmente dentro do Instagram/Facebook).
     Agora todo botão é um link de verdade para o wa.me, que funciona
     em qualquer navegador e abre o app direto no celular. */
  const numero = String(C.whatsapp || "").replace(/\D/g, "");
  const waUrl = (msg) => `https://wa.me/${numero}?text=${encodeURIComponent(msg || C.mensagemPadrao)}`;

  // Prévia hospedada no claude.ai: lá pop-ups e mapas embutidos são bloqueados
  const previa = /claude/.test(location.hostname);

  function abrirWhatsApp(msg) {
    if (numero.length < 12) { aviso("Número de WhatsApp não configurado em config.js."); return; }
    const url = waUrl(msg);
    // Botão reserva: se o WhatsApp não abrir sozinho, a pessoa toca nele
    const reserva = $("[data-wa-reserva]");
    if (reserva) { reserva.href = url; reserva.hidden = false; }
    if (previa) { const a = document.createElement("a"); a.href = url; a.target = "_blank"; a.rel = "noopener"; a.click(); return; }
    if (isMobile) { window.location.href = url; return; }       // celular: abre o app
    const w = window.open(url, "_blank");                        // computador: nova aba
    if (w) w.opener = null; else window.location.href = url;     // pop-up bloqueado? abre na mesma aba
  }

  $$("[data-wa]").forEach((a) => {
    a.href = waUrl(a.dataset.waMsg);
    a.target = "_blank";
    a.rel = "noopener";
  });
  if (numero.length < 12) $$("[data-wa]").forEach((a) => a.addEventListener("click", (e) => { e.preventDefault(); aviso("Número de WhatsApp não configurado em config.js."); }));

  // Telefone formatado: 5531997014005 -> (31) 99701-4005
  const fone = numero.replace(/^55(\d{2})(\d{4,5})(\d{4})$/, "($1) $2-$3");
  $$("[data-fone]").forEach((e) => (e.textContent = fone));

  /* ================= Textos ================= */
  $$("[data-status]").forEach((e) => (e.textContent = C.status));
  $$("[data-frase]").forEach((e) => (e.textContent = C.frase));
  $$("[data-cidade]").forEach((e) => (e.textContent = `${C.local.endereco} · ${C.local.cidade}`));
  $$("[data-ano]").forEach((e) => (e.textContent = new Date().getFullYear()));
  if (C.instagram) $$("[data-instagram]").forEach((a) => { a.href = C.instagram; a.hidden = false; });

  /* ================= Cabeçalho e menu ================= */
  const header = $("#header"), menu = $("#menu"), burger = $(".burger"), fab = $(".fab"), mbar = $(".mbar");
  const hero = $(".hero"), contato = $("#contato");
  function onScroll() {
    const y = window.scrollY;
    header.classList.toggle("is-solid", y > 40);
    const ct = contato.getBoundingClientRect();
    const esconder = y < hero.offsetHeight * 0.6 || ct.top < innerHeight * 0.7; // some no topo e do orçamento até o fim
    fab.classList.toggle("is-hidden", esconder);
    if (mbar) mbar.classList.toggle("is-hidden", esconder);
  }
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  function setMenu(open) {
    menu.classList.toggle("is-open", open);
    menu.setAttribute("aria-hidden", !open);
    burger.setAttribute("aria-expanded", open);
    burger.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    document.body.classList.toggle("no-scroll", open);
    document.body.classList.toggle("menu-open", open);
  }
  burger.addEventListener("click", () => setMenu(!menu.classList.contains("is-open")));
  menu.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
  addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

  /* ================= Hero ================= */
  (function () {
    const m = $("[data-hero]"), H = C.hero;
    if (isMobile && H.videoCelular && !calmo) {
      m.innerHTML = `<video autoplay muted loop playsinline preload="metadata" poster="${esc(H.posterCelular)}" aria-hidden="true"><source src="${esc(H.videoCelular)}" type="video/mp4"></video>`;
      const v = $("video", m); v.muted = true; v.play && v.play().catch(() => {});
    } else {
      m.innerHTML = `<img src="${esc(H.imagem)}" alt="" fetchpriority="high">`;
    }
  })();

  /* ================= Números ================= */
  $("[data-numeros]").innerHTML = C.numeros.map((n) =>
    `<li><strong data-count="${esc(n.valor)}">${esc(n.valor)}${n.unidade ? `<small>${esc(n.unidade)}</small>` : ""}</strong><span>${esc(n.rotulo)}</span></li>`).join("");

  /* ================= Ícones ================= */
  const ICON = {
    salao: '<path d="M8 30 32 12l24 18"/><path d="M12 27v25h40V27"/><path d="M27 52V40h10v12"/><path d="M15 31q8.5 5 17 0 8.5 5 17 0"/>',
    gourmet: '<path d="M10 47h44"/><path d="M14 47a18 18 0 0 1 36 0"/><path d="M26 47v-6a6 6 0 0 1 12 0v6"/><path d="M38 31v-9h5v12"/><path d="M32 46c-2.4-2.2-1.2-4.6 0-6 1.2 1.4 2.4 3.8 0 6z"/>',
    suites: '<path d="M8 50V20"/><path d="M8 40h48v10"/><path d="M8 40V32a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v8"/><path d="M28 40V30a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v10"/>',
    sauna: '<path d="M12 52q5-9 11-4 5-8 11-1 6-7 12 0 5-2 6 5z"/><path d="M22 38c-4-4 4-7 0-12s4-8 0-12"/><path d="M32 38c-4-4 4-7 0-12s4-8 0-12"/><path d="M42 38c-4-4 4-7 0-12s4-8 0-12"/>',
    padrao: '<path d="M32 10c-10 11-15 21-15 29a15 15 0 0 0 30 0c0-8-5-18-15-29z"/><path d="M32 54V30"/>'
  };
  const icon = (k) => `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[k] || ICON.padrao}</svg>`;
  const EV = {
    anel: '<circle cx="12" cy="15" r="6"/><path d="M9 6l3-3 3 3-3 3z"/>',
    bolo: '<path d="M4 21h16M5 21v-7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v7"/><path d="M5 16c2 1 3 1 4.5 0s3-1 4.5 0 3 1 5 0"/><path d="M12 12V8"/><path d="M12 5.5c-.8-.8-.8-1.7 0-2.5.8.8.8 1.7 0 2.5z"/>',
    empresa: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/><path d="M3 13h18"/>',
    familia: '<circle cx="8" cy="6" r="2.5"/><circle cx="16" cy="6" r="2.5"/><path d="M4 20v-5a4 4 0 0 1 8 0v5"/><path d="M12 20v-5a4 4 0 0 1 8 0v5"/>',
    amigos: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    estrela: '<path d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.4 6.7 19.4l1.2-6L3.4 9.3l6-.7z"/>'
  };

  /* ================= Estrutura (cards) ================= */
  const fotoIco = '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-9 8"/></svg>';
  $("[data-ambientes]").innerHTML = C.ambientes.map((a) => {
    const fotos = a.fotos || [];
    let media;
    if (fotos.length) {
      const links = fotos.map((src, i) =>
        `<a class="glightbox" href="${esc(src)}" data-gallery="amb-${esc(a.id)}" data-glightbox="description: ${esc(a.nome)}"${i ? " hidden" : ""} aria-label="Ampliar foto: ${esc(a.nome)}">${i ? "" : `<img src="${esc(src)}" alt="${esc(a.nome)}" loading="lazy">`}</a>`).join("");
      media = `<div class="card__media">${links}${fotos.length > 1 ? `<span class="card__count">${fotoIco}${fotos.length} fotos</span>` : ""}</div>`;
    } else {
      media = `<div class="card__media card__media--soon">${icon(a.id)}<span class="card__tag">Fotos em breve</span></div>`;
    }
    return `<article class="card reveal" id="amb-${esc(a.id)}">${media}<div class="card__body"><span class="card__med">${esc(a.medida)}</span><h3>${esc(a.nome)}</h3><p>${esc(a.texto)}</p></div></article>`;
  }).join("");

  // Aviso "arraste para o lado" só aparece quando o carrossel realmente rola
  (function () {
    const cards = $("[data-ambientes]"), dica = $("[data-cards-hint]");
    if (!dica) return;
    const checa = () => { dica.hidden = !(cards.scrollWidth > cards.clientWidth + 4); };
    checa(); addEventListener("resize", checa); addEventListener("load", checa);
  })();

  /* ================= Eventos ================= */
  $("[data-eventos]").innerHTML = C.eventos.map((e) =>
    `<li class="reveal"><span class="ev-ico"><svg viewBox="0 0 24 24" aria-hidden="true">${EV[e.icone] || EV.estrela}</svg></span><div><h3>${esc(e.nome)}</h3><p>${esc(e.texto)}</p></div></li>`).join("");

  /* ================= Galeria ================= */
  // Fotos abrem no GLightbox; vídeos abrem no player próprio (abaixo),
  // que usa os controles nativos do celular e não briga com o arrastar da galeria.
  $("[data-galeria]").innerHTML = C.galeria.map((g) => {
    if (g.video) {
      return `<div class="swiper-slide"><a class="gal-item gal-video" href="${esc(g.src)}" data-video="${esc(g.src)}" data-poster="${esc(g.poster || "")}" data-legenda="${esc(g.legenda)}" aria-label="Assistir vídeo: ${esc(g.legenda)}">
        <img src="${esc(g.poster || "")}" alt="${esc(g.legenda)}" loading="lazy">
        <span class="gal-play"><svg viewBox="0 0 24 24"><path d="M6 4l14 8-14 8z"/></svg></span>
        <figcaption>${esc(g.legenda)}</figcaption></a></div>`;
    }
    return `<div class="swiper-slide"><a class="gal-item glightbox" href="${esc(g.src)}" data-gallery="galeria" data-glightbox="description: ${esc(g.legenda)}">
      <img src="${esc(g.src)}" alt="${esc(g.legenda)}" loading="lazy">
      <figcaption>${esc(g.legenda)}</figcaption></a></div>`;
  }).join("");

  /* ================= Player de vídeo ================= */
  (function () {
    const p = document.createElement("div");
    p.className = "player"; p.hidden = true;
    p.setAttribute("role", "dialog"); p.setAttribute("aria-modal", "true"); p.setAttribute("aria-label", "Vídeo");
    p.innerHTML = `<button class="player__close" type="button" aria-label="Fechar vídeo"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
      <div class="player__box"><video controls playsinline preload="none"></video></div><p class="player__cap"></p>`;
    document.body.appendChild(p);
    const v = $("video", p), cap = $(".player__cap", p);
    let aberto = false, voltar = null;

    function abrir(src, poster, legenda) {
      v.poster = poster; v.src = src; cap.textContent = legenda;
      p.hidden = false; aberto = true; document.body.classList.add("no-scroll");
      voltar = document.activeElement; $(".player__close", p).focus();
      history.pushState({ player: 1 }, "");           // botão "voltar" do celular fecha o vídeo
      const r = v.play(); if (r) r.catch(() => {});
    }
    function fechar(viaHistorico) {
      if (!aberto) return;
      aberto = false; v.pause(); v.removeAttribute("src"); v.load();
      p.hidden = true; document.body.classList.remove("no-scroll");
      if (voltar) voltar.focus({ preventScroll: true });
      if (!viaHistorico && history.state && history.state.player) history.back();
    }
    document.addEventListener("click", (e) => {
      const a = e.target.closest("[data-video]"); if (!a) return;
      e.preventDefault(); abrir(a.dataset.video, a.dataset.poster, a.dataset.legenda);
    });
    $(".player__close", p).addEventListener("click", () => fechar(false));
    p.addEventListener("click", (e) => { if (e.target === p || e.target.classList.contains("player__box")) fechar(false); });
    addEventListener("keydown", (e) => { if (e.key === "Escape") fechar(false); });
    addEventListener("popstate", () => fechar(true));
  })();

  /* ================= FAQ ================= */
  $("[data-faq]").innerHTML = C.perguntas.map((q, i) =>
    `<details${i === 0 ? " open" : ""}><summary>${esc(q.p)}</summary><p>${esc(q.r)}</p></details>`).join("");

  /* ================= Localização ================= */
  (function () {
    const L = C.local, q = encodeURIComponent(L.destino);
    $$("[data-endereco]").forEach((e) => (e.textContent = `${L.endereco}, ${L.cidade}`));
    $$("[data-endereco-completo]").forEach((e) => (e.textContent = `${L.endereco} · ${L.cidade}`));
    $$("[data-referencia]").forEach((e) => (e.textContent = L.referencia));
    $$("[data-maps]").forEach((a) => (a.href = L.mapsUrl || `https://www.google.com/maps/search/?api=1&query=${q}`));
    $$("[data-waze]").forEach((a) => (a.href = `https://waze.com/ul?q=${q}&navigate=yes`));
    if (previa) { $("[data-mapa]").innerHTML = `<a class="map-link" href="${esc(L.mapsUrl || "https://www.google.com/maps/search/?api=1&query=" + q)}" target="_blank" rel="noopener"><img src="fotos/entrada.jpg" alt="Entrada da chácara pela MG-120"><span class="btn btn--dark">Abrir no Google Maps</span></a>`; return; }
    $("[data-mapa]").innerHTML = `<iframe src="https://maps.google.com/maps?q=${q}&z=14&output=embed" title="Mapa da ${esc(C.nome)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>`;
  })();

  /* ================= Formulário -> WhatsApp ================= */
  (function () {
    const f = $("[data-form]"), tipo = $("#f-tipo"), data = $("#f-data"), nome = $("#f-nome");
    tipo.innerHTML = `<option value="">Selecione</option>` + C.eventos.map((e) => `<option>${esc(e.nome)}</option>`).join("") + `<option>Outro</option>`;
    const hoje = new Date(); hoje.setMinutes(hoje.getMinutes() - hoje.getTimezoneOffset());
    data.min = hoje.toISOString().slice(0, 10);
    const fmt = (d) => (d ? d.split("-").reverse().join("/") : "");

    function check(el) {
      let ok = true;
      if (el.required && !el.value.trim()) ok = false;
      if (el === data && el.value && el.value < el.min) ok = false;
      el.closest(".field").classList.toggle("is-invalid", !ok);
      el.setAttribute("aria-invalid", !ok);
      return ok;
    }
    [nome, tipo, data].forEach((el) => el.addEventListener("change", () => check(el)));

    f.addEventListener("submit", (e) => {
      e.preventDefault();
      const ruins = [nome, tipo, data].filter((el) => !check(el));
      if (ruins.length) { ruins[0].focus(); return; }
      const v = Object.fromEntries(new FormData(f));
      const linhas = [
        `Olá! Vim pelo site da ${C.nome} e gostaria de um orçamento.`, "",
        `*Nome:* ${v.nome.trim()}`,
        `*Evento:* ${v.tipo}`,
        v.data && `*Data:* ${fmt(v.data)}`,
        v.pessoas && `*Pessoas:* ${v.pessoas}`,
        v.hosp && `*Hospedagem:* ${v.hosp}`,
        v.msg.trim() && `\n${v.msg.trim()}`
      ].filter((l) => l !== "" && l !== undefined && l !== false);
      linhas.splice(1, 0, "");
      abrirWhatsApp(linhas.join("\n"));
    });
  })();

  /* ================= Aviso ================= */
  const toast = $(".toast"); let tt;
  function aviso(t) { toast.textContent = t; toast.classList.add("is-show"); clearTimeout(tt); tt = setTimeout(() => toast.classList.remove("is-show"), 4000); }

  /* ================= Animação ao rolar ================= */
  if ("IntersectionObserver" in window && !calmo) {
    const io = new IntersectionObserver((ents) => ents.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
    }), { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    $$(".reveal").forEach((el, i) => { el.style.transitionDelay = `${(i % 3) * 70}ms`; io.observe(el); });
  } else {
    $$(".reveal").forEach((el) => el.classList.add("is-in"));
  }

  // Contador dos números
  if ("IntersectionObserver" in window && !calmo) {
    const io2 = new IntersectionObserver((ents) => ents.forEach((en) => {
      if (!en.isIntersecting) return;
      io2.unobserve(en.target);
      const el = en.target, alvo = +el.dataset.count, small = el.querySelector("small"), t0 = performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t - t0) / 1400), val = Math.round(alvo * (1 - Math.pow(1 - p, 3)));
        el.firstChild.nodeValue = val;
        if (p < 1) requestAnimationFrame(tick);
      };
      el.firstChild.nodeValue = "0"; if (small) el.appendChild(small);
      requestAnimationFrame(tick);
    }), { threshold: 0.6 });
    $$("[data-count]").forEach((el) => io2.observe(el));
  }

  /* ================= Bibliotecas (Swiper + GLightbox) ================= */
  if (window.Swiper) {
    new Swiper(".gal", {
      slidesPerView: "auto",
      speed: calmo ? 0 : 300,   // sem animação quando o sistema pede menos movimento
      spaceBetween: 14,
      grabCursor: true,
      pagination: { el: ".gal .swiper-pagination", clickable: true, dynamicBullets: true },
      navigation: { prevEl: ".gal-prev", nextEl: ".gal-next" },
      breakpoints: { 760: { spaceBetween: 20 } }
    });
  }
  if (window.GLightbox) {
    // Com as animações do sistema desligadas, o GLightbox nunca recebia o fim da
    // animação de saída e a página ficava travada. Sem efeito nesses casos:
    const efeito = calmo ? "none" : "fade";
    const lb = GLightbox({ selector: ".glightbox", touchNavigation: true, loop: true,
      openEffect: efeito, closeEffect: efeito, slideEffect: calmo ? "none" : "slide" });

    // Trava de segurança: se não terminar de fechar em 900 ms, fecha à força.
    const fecharOriginal = lb.close.bind(lb);
    lb.close = function () {
      const r = fecharOriginal();
      setTimeout(() => {
        if (!lb.lightboxOpen || !lb.closing) return;
        lb.activeSlide = lb.prevActiveSlide = lb.prevActiveSlideIndex = null;
        lb.built = false;
        if (lb.events) { Object.keys(lb.events).forEach((k) => lb.events[k].destroy()); lb.events = null; }
        document.documentElement.classList.remove("glightbox-open");
        document.body.classList.remove("glightbox-open", "touching", "gdesc-open", "glightbox-touch", "glightbox-mobile", "gscrollbar-fixer");
        if (lb.modal && lb.modal.parentNode) lb.modal.parentNode.removeChild(lb.modal);
        const css = document.querySelector(".gcss-styles"); if (css) css.remove();
        lb.lightboxOpen = false; lb.closing = null;
        lb.trigger && lb.trigger("close");
      }, 900);
      return r;
    };
  }
})();
