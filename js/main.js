/* =========================================================================
   La Brace — main.js
   Lenis smooth scroll · GSAP + ScrollTrigger · i18n · rendering · gallery
   ========================================================================= */
(function () {
  "use strict";

  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  if (gsap && ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const IMG = "assets/img/web/";
  const VID = "assets/video/web/";

  /* ----------------------------------------------------------------------
     STATE / LANG
  ---------------------------------------------------------------------- */
  let lang = localStorage.getItem("lb-lang") || "it";

  const t = (key) => (LB.i18n[lang] && LB.i18n[lang][key]) || (LB.i18n.it[key] || key);
  const tv = (obj) => (obj && (obj[lang] || obj.it)) || "";

  function applyStaticI18n() {
    document.documentElement.lang = lang;
    $$("[data-i18n]").forEach((el) => { el.textContent = t(el.getAttribute("data-i18n")); });
    $$("#lang button").forEach((b) => b.classList.toggle("is-active", b.dataset.lang === lang));
  }

  function setLang(next) {
    lang = next;
    localStorage.setItem("lb-lang", lang);
    applyStaticI18n();
    renderAll();
    if (ScrollTrigger) ScrollTrigger.refresh();
  }

  /* ----------------------------------------------------------------------
     RENDERING
  ---------------------------------------------------------------------- */
  function priceHTML(p) {
    if (p == null) return "";
    return `<span class="mitem__price">CHF ${p}</span>`;
  }

  function renderAlaCarte() {
    const wrap = $("#carteList");
    if (!wrap) return;
    wrap.innerHTML = LB.alacarte.map((cat) => {
      const items = cat.items.map((it) => {
        const note = it.note ? `<span class="mitem__note">${tv(it.note)}</span>` : "";
        const desc = tv(it.d) ? `<div class="mitem__desc">${tv(it.d)}</div>` : "";
        const all = it.a ? `<div class="mitem__all">${t("menu.allergens.title")}: ${it.a}</div>` : "";
        return `<div class="mitem">
          <div class="mitem__top">
            <span class="mitem__name">${it.name}${note}</span>
            <span class="mitem__price">CHF ${it.p}</span>
          </div>${desc}${all}</div>`;
      }).join("");

      let sides = "";
      if (cat.sides) {
        sides = `<div class="menu__sides"><span class="menu__sides-title">${tv(cat.sides.title)}</span>` +
          cat.sides.list.map((s) => `<span class="menu__side">${tv(s.name)} <b>CHF ${s.p}</b></span>`).join("") +
          `</div>`;
      }
      const lead = cat.lead ? `<span class="menu__cat-lead">${tv(cat.lead)}</span>` : "";
      const foot = cat.footnote ? `<div class="menu__cat-foot">${tv(cat.footnote)}</div>` : "";

      return `<div class="menu__cat" data-anim>
        <div class="menu__cat-head"><h3 class="menu__cat-title">${tv(cat.title)}</h3>${lead}</div>
        <div class="menu__items">${items}</div>${sides}${foot}</div>`;
    }).join("");
  }

  function renderWine() {
    const note = $("#wineNote");
    const wrap = $("#wineList");
    if (!wrap) return;
    if (note) note.textContent = tv(LB.wine.note);
    wrap.innerHTML = LB.wine.cats.map((cat) => {
      const items = cat.items.map((it) => `
        <div class="mitem">
          <div class="mitem__top">
            <span class="mitem__name">${it.name}</span>
            <span class="mitem__price">CHF ${it.p}</span>
          </div>
          ${tv(it.d) ? `<div class="mitem__desc">${tv(it.d)}</div>` : ""}
        </div>`).join("");
      return `<div class="menu__cat" data-anim>
        <div class="menu__cat-head"><h3 class="menu__cat-title">${tv(cat.title)}</h3></div>
        <div class="menu__items">${items}</div></div>`;
    }).join("");
  }

  function renderDry() {
    const lead = $("#dryLead");
    const from = $("#dryFrom");
    const table = $("#dryTable");
    if (lead) lead.textContent = tv(LB.dryage.intro);
    if (from) from.textContent = tv(LB.dryage.from);
    if (!table) return;
    const h = LB.dryage.head;
    const head = `<div class="dry__row dry__row--head">
      <span>${tv(h.cut)}</span><span>${tv(h.profile)}</span><span>${tv(h.ideal)}</span></div>`;
    const rows = LB.dryage.cuts.map((c) => `
      <div class="dry__row">
        <span class="dry__cut">${c.cut}</span>
        <span class="dry__cell" data-l="${tv(h.profile)}">${tv(c.profile)}</span>
        <span class="dry__cell" data-l="${tv(h.ideal)}">${tv(c.ideal)}</span>
      </div>`).join("");
    table.innerHTML = head + rows;
  }

  function renderEvents() {
    const grid = $("#eventiGrid");
    if (!grid) return;
    grid.innerHTML = LB.events.map((e) => {
      if (e.feature) {
        return `<article class="ecard ecard--feature" data-anim>
          <div class="ecard__img"><img src="assets/img/${e.img}" alt="${tv(e.title)}" loading="lazy"></div>
          <span class="ecard__tag ecard__tag--feature">${tv(e.tag)}</span>
        </article>`;
      }
      const price = e.price ? `<div class="ecard__price">${tv(e.price) || e.price}${e.note ? `<span>${tv(e.note)}</span>` : ""}</div>` : "";
      return `<article class="ecard" data-anim>
        <div class="ecard__img"><img src="${IMG}${e.img}" alt="${tv(e.title)}" loading="lazy"></div>
        <div class="ecard__body">
          <span class="ecard__tag">${tv(e.tag)}</span>
          <h3 class="ecard__title">${tv(e.title)}</h3>
          <p class="ecard__desc">${tv(e.d)}</p>${price}
        </div></article>`;
    }).join("");
  }

  function renderAllergens() {
    const box = $("#allergens");
    if (!box) return;
    const list = LB.allergens[lang] || LB.allergens.it;
    box.innerHTML = `
      <div class="allergens__title">${t("menu.allergens.title")}</div>
      <p class="allergens__text">${t("menu.allergens.text")}</p>
      <ul class="allergens__list">${list.map((a, i) => `<li><b>${i + 1}.</b> ${a}</li>`).join("")}</ul>
      <a class="btn btn--sm" href="docs/ALLERGENI E PROVENIENZE 2026.pdf" download>${t("menu.allergens.download")}</a>`;
  }

  let galleryBuilt = false;
  function renderGallery() {
    const track = $("#galTrack");
    if (!track || galleryBuilt) return;
    track.innerHTML = LB.gallery.map((f) => `
      <div class="gitem"><img src="${IMG}${f}" alt="La Brace" loading="lazy" draggable="false"></div>`).join("");
    galleryBuilt = true;
    // On reduced-motion / no-GSAP, initAnimations never runs → wire the drag
    // fallback here so the gallery is still explorable.
    if (prefersReduced || !gsap || !ScrollTrigger) initGalleryDrag();
  }

  let reelsBuilt = false;
  function renderReels() {
    const wrap = $("#reels");
    if (!wrap || reelsBuilt) return;
    wrap.innerHTML = LB.reels.map((r) => `
      <div class="reel">
        <video muted loop playsinline preload="none"
          poster="${VID}${r}-poster.jpg" data-src="${VID}${r}.mp4"></video>
      </div>`).join("");
    reelsBuilt = true;
    initReels();
  }

  function renderHours() {
    const ul = $("#hours");
    if (!ul) return;
    ul.innerHTML = LB.hours.map((h) => {
      const closed = h.val === "closed";
      const val = closed ? t("contatti.hours.closed") : h.val;
      return `<li class="${closed ? "closed" : ""}"><b>${t(h.key)}</b><span>${val}</span></li>`;
    }).join("");
  }

  function renderAll() {
    renderAlaCarte();
    renderWine();
    renderDry();
    renderEvents();
    renderAllergens();
    renderGallery();
    renderReels();
    renderHours();
  }

  /* ----------------------------------------------------------------------
     REELS — play in view
  ---------------------------------------------------------------------- */
  function initReels() {
    const vids = $$("#reels video");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        const v = en.target;
        if (en.isIntersecting) {
          if (!v.src && v.dataset.src) v.src = v.dataset.src;
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      });
    }, { threshold: 0.4 });
    vids.forEach((v) => io.observe(v));
  }

  /* ----------------------------------------------------------------------
     GALLERY — drag + wheel + scroll parallax
  ---------------------------------------------------------------------- */
  let galleryInited = false;
  function initGalleryDrag() {
    const track = $("#galTrack");
    if (!track || galleryInited) return;
    galleryInited = true;
    let down = false, startX = 0, startScroll = 0;
    const section = $("#galleria");

    // native horizontal scroll via transform driven by pointer
    let x = 0, target = 0, max = 0;
    function measure() { max = Math.max(0, track.scrollWidth - track.clientWidth); }
    measure();
    window.addEventListener("resize", measure);
    // lazy-loaded gallery images change scrollWidth after init → re-measure once
    // everything is loaded, otherwise max stays 0 and nothing moves.
    window.addEventListener("load", measure);
    $$("#galTrack img").forEach((im) => im.addEventListener("load", measure));

    track.addEventListener("pointerdown", (e) => {
      measure();
      down = true; startX = e.clientX; startScroll = target; track.setPointerCapture(e.pointerId);
    });
    track.addEventListener("pointermove", (e) => {
      if (!down) return;
      target = Math.min(max, Math.max(0, startScroll - (e.clientX - startX)));
    });
    const up = () => { down = false; };
    track.addEventListener("pointerup", up);
    track.addEventListener("pointercancel", up);

    track.addEventListener("wheel", (e) => {
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) return;
      e.preventDefault();
      target = Math.min(max, Math.max(0, target + e.deltaX));
    }, { passive: false });

    function loop() {
      x += (target - x) * 0.09;
      track.style.transform = `translate3d(${-x}px,0,0)`;
      requestAnimationFrame(loop);
    }
    loop();

    // scroll-linked drift: as the page scrolls past the section the whole strip
    // glides sideways on its own (skippable, slow, fluid). The drift is RELATIVE
    // — vertical scroll adds the change in scroll-progress to wherever the user
    // last left the strip (drag/wheel), so there is no snap/jump back to an
    // absolute position when you resume scrolling.
    if (gsap && ScrollTrigger && !prefersReduced) {
      let lastP = null;
      ScrollTrigger.create({
        trigger: section, start: "top bottom", end: "bottom top",
        onUpdate: (self) => {
          if (down) { lastP = self.progress; return; }
          if (!max) measure();
          if (lastP === null) { lastP = self.progress; return; }
          target = Math.min(max, Math.max(0, target + (self.progress - lastP) * max));
          lastP = self.progress;
        }
      });
    }
  }

  /* ----------------------------------------------------------------------
     GALLERY SCENE — NOT pinned. The strip is laterally scrollable (drag /
     horizontal wheel) and can be skipped by scrolling vertically: while you
     scroll the page past the section, the photos glide sideways on their own,
     slowly and fluidly. initGalleryDrag handles all of it (drag + wheel +
     scroll-linked drift), so we just delegate to it on every viewport.
  ---------------------------------------------------------------------- */
  function initGalleryScroll() {
    initGalleryDrag();
  }

  /* ----------------------------------------------------------------------
     MENU TABS
  ---------------------------------------------------------------------- */
  function activateTab(name) {
    const tabs = $$(".menu__tab");
    let hit = false;
    tabs.forEach((x) => { const on = x.dataset.tab === name; x.classList.toggle("is-active", on); if (on) hit = true; });
    if (!hit) return false;
    $$(".menu__panel").forEach((p) => p.classList.toggle("is-active", p.dataset.panel === name));
    // Reveal cards in the freshly shown panel (the scroll batch won't fire for
    // elements that were display:none when it was created).
    if (gsap) {
      const active = $(`.menu__panel[data-panel="${name}"]`);
      if (active) gsap.to(active.querySelectorAll("[data-anim]"),
        { opacity: 1, y: 0, rotateX: 0, duration: 0.7, ease: "power3.out", stagger: 0.06, overwrite: true });
    }
    if (ScrollTrigger) ScrollTrigger.refresh();
    return true;
  }

  function initTabs() {
    const tabs = $$(".menu__tab");
    if (!tabs.length) return;
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => activateTab(tab.dataset.tab));
    });
    // open the tab referenced in the URL hash (e.g. menu.html#vini)
    const hash = (location.hash || "").replace("#", "");
    if (hash) activateTab(hash);
  }

  /* ----------------------------------------------------------------------
     NAV — burger overlay + smooth anchors
  ---------------------------------------------------------------------- */
  let lenis = null;
  function scrollToTarget(target) {
    const el = typeof target === "string" ? document.querySelector(target) : target;
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1.2 });
    else el.scrollIntoView({ behavior: "smooth" });
  }

  function initNav() {
    const burger = $("#burger");
    const nav = $("#navover");
    const closeNav = () => document.body.classList.remove("nav-open");
    if (burger) burger.addEventListener("click", () => document.body.classList.toggle("nav-open"));

    $$("[data-scroll]").forEach((a) => {
      a.addEventListener("click", (e) => {
        const href = a.getAttribute("href");
        if (href && href.startsWith("#")) {
          e.preventDefault();
          closeNav();
          setTimeout(() => scrollToTarget(href), document.body.classList.contains("nav-open") ? 0 : 40);
        }
      });
    });

    $$("#lang button").forEach((b) => b.addEventListener("click", () => {
      if (b.dataset.lang !== lang) setLang(b.dataset.lang);
    }));
  }

  /* ----------------------------------------------------------------------
     HEADER solid on scroll past hero
  ---------------------------------------------------------------------- */
  function initHeader() {
    // Header uses mix-blend-mode: difference and auto-adapts to light/dark
    // sections, so no explicit solid/scroll state toggle is needed.
    const header = $("#header");
    if (!header) return;
    let last = 0;
    window.addEventListener("scroll", () => {
      const y = window.scrollY;
      header.style.transform = (y > last && y > 400) ? "translateY(-100%)" : "translateY(0)";
      last = y;
    }, { passive: true });
    header.style.transition = "transform 0.5s var(--ease)";
  }

  /* ----------------------------------------------------------------------
     LENIS SMOOTH SCROLL
  ---------------------------------------------------------------------- */
  function initLenis() {
    if (prefersReduced || !window.Lenis) return;
    lenis = new Lenis({ duration: 1.1, smoothWheel: true, wheelMultiplier: 1, touchMultiplier: 1.4 });
    lenis.on("scroll", () => { if (ScrollTrigger) ScrollTrigger.update(); });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
  }

  /* ----------------------------------------------------------------------
     SCROLL ANIMATIONS — cinematic engine
     directional word reveals · clip-path image opens · curtain wipes ·
     parallax · count-up · hero zoom · kinetic marquee
  ---------------------------------------------------------------------- */
  function splitWords(el) {
    const words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words.map((w) => `<span class="w"><span class="w__i">${w}</span></span>`).join(" ");
    return $$(".w__i", el);
  }

  // reset everything to a visible state (no-gsap / reduced-motion fallback)
  function revealStatic() {
    $$("[data-reveal]").forEach((el) => { el.style.opacity = 1; el.style.transform = "none"; });
    $$("[data-img-reveal]").forEach((el) => { el.style.clipPath = "none"; });
    $$("[data-split]").forEach((el) => { el.style.opacity = 1; }); // CSS hides these; reveal for no-gsap/reduced
    $$(".hero__kicker, .hero__sub, .hero__cta").forEach((e) => { e.style.opacity = 1; e.style.transform = "none"; });
  }

  function initAnimations() {
    if (!gsap || !ScrollTrigger || prefersReduced) { revealStatic(); return; }

    /* ---- pre-hide hero title BEFORE the preloader lifts ----
       heroIntro only runs on preloader complete, so during the 0.9s slide-up
       the plain-text title would flash. Wrap + hide it here (initAnimations
       runs before runPreloader) so it stays masked until heroIntro reveals it. */
    const hLine = $(".hero__line");
    if (hLine && !$(".hero__lineInner")) {
      hLine.innerHTML = `<span class="hero__lineInner">${hLine.textContent}</span>`;
    }
    const hInner = $(".hero__lineInner");
    if (hInner) gsap.set(hInner, { yPercent: 110 });

    /* ---- pinned scenes (create first so pin-spacers offset later triggers) ---- */
    initHeroScene();
    initGalleryScroll();

    /* ---- headings: directional word reveal (data-split="up|left|right") ---- */
    $$("[data-split]").forEach((h) => {
      const dir = h.getAttribute("data-split") || "up";
      const inner = splitWords(h);
      const from = dir === "left" ? { xPercent: -120, opacity: 0 }
                 : dir === "right" ? { xPercent: 120, opacity: 0 }
                 : { yPercent: 118 };
      gsap.set(inner, from);
      gsap.set(h, { opacity: 1 }); // reveal container (CSS keeps [data-split] at opacity:0 to avoid FOUC)
      gsap.to(inner, {
        xPercent: 0, yPercent: 0, opacity: 1, duration: 1.05, ease: "power4.out", stagger: 0.06,
        scrollTrigger: { trigger: h, start: "top 85%", once: true },
      });
    });

    /* ---- plain display headings without split ---- */
    $$(".display:not([data-split])").forEach((h) => {
      if (h.closest(".hero") || h.closest(".footer") || h.closest(".preloader")) return;
      if (h.closest(".menu__panel:not(.is-active)")) return; // skip hidden tab panels
      gsap.from(h, { yPercent: 14, opacity: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: h, start: "top 88%", once: true } });
    });

    /* ---- kickers ---- */
    $$(".kicker").forEach((k) => gsap.from(k, {
      opacity: 0, x: -24, duration: 0.8, ease: "power2.out",
      scrollTrigger: { trigger: k, start: "top 92%", once: true },
    }));

    /* ---- generic reveals ---- */
    $$("[data-reveal]").forEach((el) => gsap.to(el, {
      opacity: 1, y: 0, duration: 1, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    }));

    /* ---- clip-path image "opens" (image reveals from a slit) ---- */
    $$("[data-img-reveal]").forEach((el) => {
      const dir = el.getAttribute("data-img-reveal") || "up";
      const img = el.querySelector("img") || el;
      const start = dir === "left" ? "inset(0 100% 0 0)"
                  : dir === "right" ? "inset(0 0 0 100%)"
                  : "inset(100% 0 0 0)";
      gsap.set(el, { clipPath: start });
      gsap.set(img, { scale: 1.35 });
      gsap.timeline({ scrollTrigger: { trigger: el, start: "top 84%", once: true } })
        .to(el, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.15, ease: "power4.out" })
        .to(img, { scale: 1, duration: 1.5, ease: "power3.out" }, 0);
    });

    /* ---- curtain wipes between sections (bg change on scroll) ---- */
    $$("[data-curtain]").forEach((sec) => {
      const tone = sec.getAttribute("data-curtain") || "dark";
      const c = document.createElement("div");
      c.className = "curtain curtain--" + tone;
      sec.appendChild(c);
      gsap.fromTo(c, { scaleY: 1 }, {
        scaleY: 0, transformOrigin: "top", ease: "none",
        scrollTrigger: { trigger: sec, start: "top bottom", end: "top 25%", scrub: 1.2 },
      });
    });

    /* ---- cards stagger (menu / events) ---- */
    // Hide immediately on init so cards never flash visible before the batch fires.
    gsap.set("[data-anim]", { opacity: 0, y: 60, rotateX: 6 });
    ScrollTrigger.batch("[data-anim]", {
      start: "top 90%",
      once: true,
      onEnter: (els) => gsap.to(els,
        { opacity: 1, y: 0, rotateX: 0, duration: 1, ease: "power3.out", stagger: 0.1, overwrite: true }),
    });

    /* ---- image parallax drift ---- */
    $$("[data-parallax] img").forEach((img) => {
      gsap.fromTo(img, { yPercent: -8 }, { yPercent: 8, ease: "none",
        scrollTrigger: { trigger: img.closest("[data-parallax]"), start: "top bottom", end: "bottom top", scrub: true } });
    });

    /* ---- dry aged bg: zoom + drift ---- */
    const dryBg = $("[data-parallax-bg] img");
    if (dryBg) {
      gsap.fromTo(dryBg, { scale: 1.35, yPercent: -6 }, { scale: 1.05, yPercent: 6, ease: "none",
        scrollTrigger: { trigger: "#dryage", start: "top bottom", end: "bottom top", scrub: true } });
    }

    /* ---- dry aged table rows: staggered slide-in ---- */
    const dryRows = $$("#dryTable .dry__row:not(.dry__row--head)");
    if (dryRows.length) gsap.from(dryRows, {
      opacity: 0, x: -40, duration: 0.8, ease: "power3.out", stagger: 0.06,
      scrollTrigger: { trigger: "#dryTable", start: "top 82%", once: true },
    });

    /* ---- decorative engravings: parallax drift + rotation (3D depth) ---- */
    $$("[data-parallax-graphic]").forEach((graphic, i) => {
      const sec = graphic.closest("section") || graphic.parentElement;
      const dir = i % 2 ? -1 : 1;           // alternate drift direction
      gsap.fromTo(graphic, { yPercent: 10 * dir, rotate: -4 * dir },
        { yPercent: -10 * dir, rotate: 4 * dir, ease: "none",
          scrollTrigger: { trigger: sec, start: "top bottom", end: "bottom top", scrub: true } });
    });

    /* ---- count-up numbers ---- */
    $$("[data-count]").forEach((el) => {
      const raw = el.textContent.trim();
      const num = parseFloat(raw.replace(/[^\d.]/g, ""));
      if (isNaN(num)) return;
      const suffix = raw.replace(/[\d.,\s]/g, "");
      el.textContent = "0" + suffix; // show 0 until scrolled into view (no final-value flash)
      const o = { v: 0 };
      gsap.to(o, { v: num, duration: 1.8, ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        onUpdate: () => { el.textContent = Math.round(o.v) + suffix; } });
    });

    /* ---- kinetic marquee: base loop + scroll-velocity ---- */
    $$(".marquee__track").forEach((tr) => {
      const w = tr.scrollWidth / 3;
      const loop = gsap.to(tr, { x: -w, duration: 18, ease: "none", repeat: -1 });
      if (lenis) lenis.on("scroll", (e) => {
        const v = 1 + Math.min(Math.abs(e.velocity || 0) / 6, 5);
        loop.timeScale(v);
      });
    });

    /* ---- prenota radial pulse drift ---- */
    const prenota = $(".prenota");
    if (prenota) gsap.to(prenota, { backgroundPositionY: "30%", ease: "none",
      scrollTrigger: { trigger: prenota, start: "top bottom", end: "bottom top", scrub: true } });

    /* ---- footer big text drift ---- */
    const fb = $(".footer__big");
    if (fb) gsap.fromTo(fb, { xPercent: -4 }, { xPercent: 4, ease: "none",
      scrollTrigger: { trigger: ".footer", start: "top bottom", end: "bottom top", scrub: true } });
  }

  /* ----------------------------------------------------------------------
     HERO — intro + scroll zoom/parallax
  ---------------------------------------------------------------------- */
  function heroIntro() {
    const hero = $(".hero");
    if (!hero) return;
    const line = $(".hero__line");
    if (line && !$(".hero__lineInner")) { const txt = line.textContent; line.innerHTML = `<span class="hero__lineInner">${txt}</span>`; }
    const inner = $(".hero__lineInner");

    if (!gsap || prefersReduced) {
      $$(".hero__kicker, .hero__sub, .hero__cta").forEach((e) => { e.style.opacity = 1; e.style.transform = "none"; });
      return;
    }

    const tl = gsap.timeline();
    // inner is already pre-hidden (yPercent:110) in initAnimations to avoid a
    // plain-text flash during the preloader slide-up — just reveal it here.
    if (inner) { gsap.set(inner, { yPercent: 110 }); tl.to(inner, { yPercent: 0, duration: 1.15, ease: "power4.out" }, 0.05); }
    tl.to(".hero__kicker", { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.75")
      .to(".hero__sub", { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.6")
      .to(".hero__cta", { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.6");
  }

  /* ----------------------------------------------------------------------
     HERO SCENE — first-scroll auto-open (NOT scrub-controllable).
     The video starts as a framed "window". Scroll is locked at the top; the
     FIRST downward scroll intent plays a fixed timeline that opens the video
     to fullscreen (the user can't control the size). The page stays put until
     the open completes; only afterwards does scroll continue to the next
     section normally.
  ---------------------------------------------------------------------- */
  function initHeroScene() {
    const hero = $(".hero");
    const media = $(".hero__media");
    if (!hero || !media) return;

    const canPin = window.matchMedia("(min-width: 1000px)").matches;
    const deepLink = location.hash && location.hash.length > 1;
    // Mobile, reduced-motion, no GSAP, or deep-link → video full immediately,
    // no scroll lock (deep links must be able to land on their section).
    if (!gsap || !ScrollTrigger || prefersReduced || !canPin || deepLink) {
      media.style.clipPath = "none";
      return;
    }

    // start framed (a video "window"), dark hero bg shows around it
    // NOTE: graphics/tweens are IDENTICAL to the old scrub-pin version — the
    // only change is that this timeline is played on first scroll (fixed,
    // non-scrubbable) instead of being driven gradually by scroll progress.
    // The media clip is a fromTo (immediateRender) so the starting frame is
    // applied at creation and EXACTLY matches the play-start — no jump. (The
    // old scrub version got this "for free" because ScrollTrigger rendered the
    // timeline at time 0 on load.)
    gsap.set(".hero__content", { willChange: "transform" });

    let opened = false;
    let playing = false;

    const openTL = gsap.timeline({
      paused: true,
      onComplete: () => { opened = true; unlock(); },
    });
    // timeScale slows the natural 0.65s timeline to ~1.1s so the auto-open
    // reads as a deliberate reveal (preserves the exact original relative
    // timing, eases and from/to values).
    openTL.timeScale(0.6);
    openTL
      .fromTo(media, { clipPath: "inset(12% 16% 12% 16% round 22px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "power1.inOut" }, 0)
      .fromTo(".hero__video", { scale: 1.14 }, { scale: 1, ease: "none" }, 0)
      .fromTo(".hero__overlay", { opacity: 0.5 }, { opacity: 1, ease: "none" }, 0)
      .fromTo(".hero__content", { scale: 0.94, yPercent: 4 }, { scale: 1, yPercent: 0, ease: "power1.out" }, 0)
      .to(".hero__scroll", { opacity: 0, ease: "none" }, 0.15);

    const trigger = () => {
      if (opened || playing) return;
      playing = true;
      openTL.play();
    };

    const onWheel = (e) => {
      if (opened) return;
      e.preventDefault();
      e.stopPropagation();
      if (e.deltaY > 0) trigger();
    };
    let touchY = null;
    const onTouchStart = (e) => { touchY = e.touches[0].clientY; };
    const onTouchMove = (e) => {
      if (opened) return;
      e.preventDefault();
      e.stopPropagation();
      if (touchY != null && touchY - e.touches[0].clientY > 6) trigger();
    };
    const onKey = (e) => {
      if (opened) return;
      const down = ["ArrowDown", "PageDown", "End", " ", "Spacebar"].includes(e.key);
      const up = ["ArrowUp", "PageUp", "Home"].includes(e.key);
      if (down || up) { e.preventDefault(); if (down) trigger(); }
    };

    const wheelOpts = { passive: false, capture: true };
    function lock() {
      if (lenis) lenis.stop();
      window.scrollTo(0, 0);
      window.addEventListener("wheel", onWheel, wheelOpts);
      window.addEventListener("touchstart", onTouchStart, wheelOpts);
      window.addEventListener("touchmove", onTouchMove, wheelOpts);
      window.addEventListener("keydown", onKey, { capture: true });
    }
    function unlock() {
      window.removeEventListener("wheel", onWheel, wheelOpts);
      window.removeEventListener("touchstart", onTouchStart, wheelOpts);
      window.removeEventListener("touchmove", onTouchMove, wheelOpts);
      window.removeEventListener("keydown", onKey, { capture: true });
      if (lenis) lenis.start();
    }

    lock();
  }

  /* ----------------------------------------------------------------------
     HERO VIDEO — guarantee playback even in battery/low-power mode.
     iOS Low Power Mode (and some data-saver setups) block muted autoplay, and
     with no fallback a tap did nothing. Try to play eagerly, retry when the
     media is ready, and — crucially — start it on the first user gesture
     (tap/click/scroll), which the browser always honours.
  ---------------------------------------------------------------------- */
  function initHeroVideo() {
    const v = $("#heroVideo");
    if (!v) return;
    const tryPlay = () => { const p = v.play(); if (p && p.catch) p.catch(() => {}); };
    tryPlay();
    v.addEventListener("loadeddata", tryPlay);
    v.addEventListener("canplay", tryPlay);
    // direct tap on the video is the most intuitive way to kick it off
    v.addEventListener("click", tryPlay);
    v.addEventListener("touchend", tryPlay);
    // any first interaction on the page also starts it, then unbinds itself
    const onFirst = () => {
      tryPlay();
      window.removeEventListener("pointerdown", onFirst);
      window.removeEventListener("touchstart", onFirst);
      window.removeEventListener("keydown", onFirst);
    };
    window.addEventListener("pointerdown", onFirst, { passive: true });
    window.addEventListener("touchstart", onFirst, { passive: true });
    window.addEventListener("keydown", onFirst);
  }

  /* ----------------------------------------------------------------------
     PRELOADER
  ---------------------------------------------------------------------- */
  function runPreloader(done) {
    const pre = $("#preloader");
    const fill = $("#plFill");
    const words = $$(".pl-word");

    let revealed = false;
    const reveal = () => {
      if (revealed) return;
      revealed = true;
      if (pre) pre.style.display = "none";
      document.body.classList.remove("is-loading");
      done();
    };

    // Deep links / reloads with a hash (e.g. index.html#storia) should land
    // directly on the section — skip the intro entirely and jump there.
    const hash = location.hash && location.hash.length > 1 ? location.hash : "";
    if (!pre || !gsap || prefersReduced || hash) {
      reveal();
      if (hash) {
        // wait for pins/layout, then settle on the target section
        setTimeout(() => { if (ScrollTrigger) ScrollTrigger.refresh(); scrollToTarget(hash); }, 200);
      }
      return;
    }

    // Safety net: if rAF is throttled (e.g. background tab) the timeline may
    // stall — force-reveal the site after a hard timeout so users never get stuck.
    const fallback = setTimeout(reveal, 4200);

    // y:0 clears the CSS `transform: translateY(110%)` baseline so the tween to
    // yPercent:0 lands the words at translateY(0) (visible) — otherwise the CSS y
    // lingers and both words stay pushed down inside their masks (invisible).
    gsap.set(words, { yPercent: 110, y: 0 });
    const finish = () => { clearTimeout(fallback); reveal(); };
    const tl = gsap.timeline({ onComplete: finish });
    tl.to(words, { yPercent: 0, duration: 0.9, ease: "power4.out", stagger: 0.14 })
      .to(".preloader__tag", { opacity: 1, duration: 0.6 }, "-=0.35")
      .to(fill, { width: "100%", duration: 1.1, ease: "power2.inOut" }, "-=0.5")
      .to(".preloader__inner", { opacity: 0, y: -20, duration: 0.5, ease: "power2.in" }, "+=0.2")
      .to(pre, { yPercent: -100, duration: 0.9, ease: "power4.inOut" });
  }

  /* ----------------------------------------------------------------------
     BOOT
  ---------------------------------------------------------------------- */
  /* ----------------------------------------------------------------------
     MAP CONSENT — load Google Maps iframe only after explicit consent
     (no data sent to Google until the user opts in). Choice remembered.
  ---------------------------------------------------------------------- */
  function loadMap(box) {
    const src = box.dataset.mapSrc;
    if (!src || box.querySelector("iframe")) return;
    const ifr = document.createElement("iframe");
    ifr.title = "La Brace — Manno";
    ifr.src = src;
    ifr.loading = "lazy";
    ifr.referrerPolicy = "no-referrer-when-downgrade";
    box.innerHTML = "";
    box.appendChild(ifr);
  }

  function initMapConsent() {
    const box = $("#map");
    if (!box) return;
    if (localStorage.getItem("lb-map-consent") === "yes") { loadMap(box); return; }
    const btn = $("#mapConsentBtn");
    if (btn) btn.addEventListener("click", () => {
      localStorage.setItem("lb-map-consent", "yes");
      loadMap(box);
    });
  }

  function boot() {
    try {
      const y = $("#year"); if (y) y.textContent = new Date().getFullYear();
      applyStaticI18n();
      renderAll();
      initMapConsent();
      initTabs();
      initNav();
      initLenis();
      initHeader();
      initHeroVideo();
      initAnimations();
      runPreloader(heroIntro);
      if (ScrollTrigger) {
        setTimeout(() => ScrollTrigger.refresh(), 400);
        // pin distances depend on media dimensions → recalc once fully loaded
        window.addEventListener("load", () => ScrollTrigger.refresh());
      }
    } catch (err) {
      console.error("LB boot error:", err);
      const pre = $("#preloader"); if (pre) pre.style.display = "none";
      document.body.classList.remove("is-loading");
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
