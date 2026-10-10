(() => {
  "use strict";
  const D = window.PORTFOLIO;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (s = "") => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const fullName = `${D.firstName} ${D.lastName}`;

  const ICONS = {
    github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.6.2 2.8.1 3.2.8.8 1.3 1.9 1.3 3.1 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zM7.1 20.5H3.6V9h3.5v11.5zM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0z"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.2 2.3h3.4l-7.4 8.4L23 21.7h-6.8l-5.3-7-6.1 7H1.4l7.9-9L.9 2.3h7l4.8 6.4 5.5-6.4zm-1.2 17.4h1.9L7 4.2H5l12 15.5z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17 17 7M8 7h9v9"/></svg>',
    whatsapp: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="${window.SOCIAL_ICONS?.whatsapp || ""}"/></svg>`,
    gmail: '<svg viewBox="52 42 88 66"><path fill="#4285F4" d="M58 108h14V74L52 59v43c0 3.32 2.69 6 6 6"/><path fill="#34A853" d="M120 108h14c3.32 0 6-2.69 6-6V59l-20 15"/><path fill="#FBBC04" d="M120 48v26l20-15v-8c0-7.42-8.47-11.65-14.4-7.2"/><path fill="#EA4335" d="M72 74V48l24 18 24-18v26L96 92"/><path fill="#C5221F" d="M52 51v8l20 15V48l-5.6-4.2c-5.94-4.45-14.4-.22-14.4 7.2"/></svg>',
  };

  // Stroke icons for the skill group cards
  const GROUP_ICONS = {
    layout: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 9h18M9 21V9"/>',
    server: '<rect x="3" y="4" width="18" height="7" rx="2"/><rect x="3" y="13" width="18" height="7" rx="2"/><path d="M7 7.5h.01M7 16.5h.01"/>',
    spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/>',
    tool: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.5-2.5z"/>',
  };
  const groupIcon = (g, i) => `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${GROUP_ICONS[g.ic] || Object.values(GROUP_ICONS)[i % 4]}</svg>`;

  // Brand icons from icons.js; near-black logos follow the text colour so they show in dark mode
  const BRAND = window.BRAND_ICONS || {}, ALIAS = window.BRAND_ALIASES || {};
  const DARK_BRANDS = ["#000000", "#181717", "#191919"];
  function brandIcon(name, size = 18) {
    const k = String(name).toLowerCase(), b = BRAND[ALIAS[k] || k];
    if (!b) return "";
    return `<svg class="bi" width="${size}" height="${size}" viewBox="0 0 24 24" fill="${DARK_BRANDS.includes(b.c) ? "currentColor" : b.c}" aria-hidden="true"><path d="${b.p}"/></svg>`;
  }
  const techIcon = (it, size) =>
    brandIcon(it.name, size) || (it.icon ? `<i class="${esc(it.icon)} colored"></i>` : `<span class="skill__letter">${esc(it.name[0])}</span>`);
  // Hexagon badge drawn in SVG for certs that have no badge image
  function hexBadge(ct) {
    const words = (ct.badgeTitle || ct.name).split(" ");
    const mid = Math.ceil(words.length / 2);
    const lines = words.length > 2 ? [words.slice(0, mid).join(" "), words.slice(mid).join(" ")] : [words.join(" ")];
    const col = ct.badgeColor || "#334155";
    const logo = BRAND[ALIAS[String(ct.issuer).toLowerCase()] || String(ct.issuer).toLowerCase()];
    return `<svg viewBox="0 0 130 150" role="img" aria-label="${esc(ct.name)} badge">
      <polygon points="65,4 125,39 125,111 65,146 5,111 5,39" fill="${col}" stroke="#e2e8f0" stroke-width="5" stroke-linejoin="round"/>
      <polygon points="65,14 116,44 116,106 65,136 14,106 14,44" fill="none" stroke="rgba(255,255,255,.18)" stroke-width="1.5"/>
      ${logo ? `<svg x="49" y="20" width="32" height="32" viewBox="0 0 24 24"><path fill="#fff" d="${logo.p}"/></svg>` : ""}
      <line x1="30" y1="60" x2="100" y2="60" stroke="rgba(255,255,255,.4)" stroke-width="1"/>
      ${lines.map((l, i) => `<text x="65" y="${(lines.length > 1 ? 78 : 86) + i * 15}" text-anchor="middle" font-family="Inter, sans-serif" font-weight="800" font-size="12.5" fill="#fff">${esc(l)}</text>`).join("")}
      ${ct.level ? `<text x="65" y="118" text-anchor="middle" font-family="Inter, sans-serif" font-weight="700" font-size="7" letter-spacing="1.6" fill="rgba(255,255,255,.85)">${esc(ct.level.toUpperCase())}</text>` : ""}
    </svg>`;
  }
  const mailHref = (email) => (finePointer ? `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(email)}` : `mailto:${email}`);

  /* ---------------------------------------------------------------------
     Render content
     --------------------------------------------------------------------- */
  function render() {
    document.title = `${fullName} — ${D.roles[0]}`;
    const logo = `${esc(D.initials)}<b>.</b>`;
    $("#navLogo").innerHTML = logo;
    $("#footLogo").innerHTML = logo;
    $("#footCredit").innerHTML = `Designed &amp; built with <span class="accent">♥</span> by ${esc(fullName)}`;
    $("#year").textContent = new Date().getFullYear();
    $("#loaderMono").textContent = D.initials;

    // Availability
    const av = $("#availability");
    if (D.available) av.lastElementChild.textContent = D.availabilityText;
    else av.remove();

    // Hero name: split into chars per line for the reveal
    const h1 = $("#heroName");
    h1.setAttribute("aria-label", fullName);
    let i = 0;
    const line = (word, n) =>
      `<span class="line line--${n}" aria-hidden="true">${[...word]
        .map((c) => `<span class="char" style="transition-delay:${(i++ * 0.035).toFixed(3)}s">${c === " " ? "&nbsp;" : esc(c)}</span>`)
        .join("")}<span class="char" style="transition-delay:${(i++ * 0.035).toFixed(3)}s">${n === 2 ? '<span class="accent">.</span>' : ""}</span></span>`;
    h1.innerHTML = line(D.firstName, 1) + line(D.lastName, 2);

    $("#tagline").textContent = D.tagline;
    const cv = $("#cvBtn");
    if (D.resume) cv.href = D.resume;
    else cv.remove();

    // Avatar
    $("#avatar").innerHTML = D.photo
      ? `<img src="${esc(D.photo)}" alt="Portrait of ${esc(fullName)}" />`
      : `<span class="avatar__mono">${esc(D.initials)}</span>`;
    $("#badgeText").textContent = `${D.roles[0].toUpperCase()} • ${D.available ? "OPEN TO WORK" : D.location.toUpperCase()} • `;

    // Socials
    const socialHTML = D.socials
      .map((s) => `<a class="social" href="${esc(s.url)}" target="_blank" rel="noopener" aria-label="${esc(s.label)}" data-magnetic>${ICONS[s.icon] || ICONS.arrow}</a>`)
      .join("") + `<a class="social" href="${esc(mailHref(D.email))}" target="_blank" rel="noopener" aria-label="Email" data-magnetic>${ICONS.gmail}</a>`;
    $("#heroSocials").innerHTML = socialHTML;
    $("#contactSocials").innerHTML = socialHTML;

    // Line icons for hero chips + stat cards (any other name falls back to a brand icon)
    const LINE_ICONS = {
      code: '<path d="m8 8-4 4 4 4M16 8l4 4-4 4"/>',
      layers: '<path d="m12 3 9 5-9 5-9-5 9-5z"/><path d="m3 13 9 5 9-5"/>',
      award: '<circle cx="12" cy="9" r="6"/><path d="m8.5 14-1.5 7 5-3 5 3-1.5-7"/>',
      rocket: '<path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2c.8-.8.8-2.2 0-3s-2.2-.8-3 0z"/><path d="M12 15 9 12a15 15 0 0 1 11-9 15 15 0 0 1-9 11z"/>',
      spark: GROUP_ICONS.spark,
      cap: '<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/>',
    };
    const tile = (name, cls, size = 20) =>
      LINE_ICONS[name]
        ? `<span class="${cls} ${cls}--${name}"><svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${LINE_ICONS[name]}</svg></span>`
        : `<span class="${cls}">${brandIcon(name, size + 2)}</span>`;

    // Stats
    const STAT_DEFAULTS = ["code", "layers", "award", "rocket"];
    $("#stats").innerHTML = D.stats
      .map((s, idx) => `<div class="stat reveal" style="--d:${idx * 0.08}s">${tile(s.icon || STAT_DEFAULTS[idx % 4], "stat__ic", 24)}<span class="stat__num"><span data-count="${s.value}">0</span>${esc(s.suffix)}</span><span class="stat__label">${esc(s.label)}</span></div>`)
      .join("");

    // Marquee (duplicated for seamless loop)
    const all = D.skills.flatMap((g) => g.items);
    const mItems = all.map((s) => `<span class="marquee__item">${techIcon(s, 26)} ${esc(s.name)}</span>`).join("");

    // Orbiting brand icons around the avatar (only skills that have a brand icon)
    const orbitNames = all.filter((s) => brandIcon(s.name)).map((s) => s.name);
    const ring = (names, offset) => names.map((n, i) => `<span class="o-ic" style="--a:${offset + (i * 360) / names.length}deg" title="${esc(n)}"><span>${brandIcon(n, 20)}</span></span>`).join("");
    const half = Math.ceil(Math.min(orbitNames.length, 12) / 2);
    $("#orbit1").innerHTML = ring(orbitNames.slice(0, half), 0);
    $("#orbit2").innerHTML = ring(orbitNames.slice(half, 12), 30);
    const chip = (c) => {
      if (!c) return "";
      return `${tile(c.icon, "chip__ic")}<span class="chip__txt"><b>${esc(c.title)}</b><small>${esc(c.sub)}</small></span>`;
    };
    const fromStat = (s) => s && { icon: "code", title: `${s.value}${s.suffix}`, sub: s.label };
    const chips = D.heroChips || [fromStat(D.stats[0]), fromStat(D.stats[D.stats.length - 1])];
    $("#chip1").innerHTML = chip(chips[0]);
    $("#chip2").innerHTML = chip(chips[1]);
    $("#marquee").innerHTML = mItems + mItems;

    // Manifesto: one span per word, *word* → highlighted
    $("#manifesto").innerHTML = (D.statement || D.about[0])
      .split(/\s+/)
      .map((w) => {
        const m = w.match(/^\*(.+?)\*(\W*)$/);
        return m ? `<span class="w w--em">${esc(m[1])}</span><span class="w">${esc(m[2])}</span>` : `<span class="w">${esc(w)}</span>`;
      })
      .join(" ");

    $("#footBig span").textContent = D.lastName;

    // About
    $("#aboutText").innerHTML = D.about.map((p) => `<p>${esc(p)}</p>`).join("");
    $("#focus").innerHTML = D.focus.map((f) => `<span class="tag">${esc(f)}</span>`).join("");
    $("#location").textContent = D.location;
    const c = D.currently;
    $("#currently").innerHTML = `${c.logo ? `<span class="now__logo"><img src="${esc(c.logo)}" alt="${esc(c.company)} logo" /></span>` : ""}<div class="now__txt"><div class="now__role">${esc(c.role)} <span class="muted">@</span> <span class="now__co">${esc(c.company)}</span></div><div class="now__meta">${esc(c.companyTagline)} · ${esc(c.mode)}</div></div>${c.description ? `<p class="now__desc">${esc(c.description)}</p>` : ""}`;

    // Config code block
    const k = (t) => `<span class="tk-k">${t}</span>`, v = (t) => `<span class="tk-v">${t}</span>`, s = (t) => `<span class="tk-s">"${esc(t)}"</span>`, p = (t) => `<span class="tk-p">${t}</span>`, n = (t) => `<span class="tk-n">${t}</span>`;
    const cfg = D.config || {};
    const slug = cfg.name || D.firstName.toLowerCase().replace(/[^a-z0-9]/g, "") || "me";
    $("#configName").textContent = `${slug}.config.ts`;
    // Each group is printed as a block of properties, groups separated by a blank line
    const groups = cfg.groups || [{ name: fullName, role: D.roles[0], company: c.company, location: D.location }];
    const lit = (x) => (typeof x === "string" ? s(x) : n(esc(String(x))));
    const value = (x) =>
      !Array.isArray(x) ? lit(x)
      : x.length <= 2 ? `${p("[")}${x.map(lit).join(p(", "))}${p("]")}`
      : `${p("[")}\n${x.map((i) => `    ${lit(i)}${p(",")}`).join("\n")}\n  ${p("]")}`;
    $("#codeBlock").innerHTML = [
      `<span class="tk-c">// ${esc(cfg.comment || "hey there, recruiter 👋")}</span>`,
      ``,
      `${k("const")} ${v(slug)} ${p("=")} ${p("{")}`,
      groups.map((g) => Object.entries(g).map(([key, val]) => `  ${key}${p(":")} ${value(val)}${p(",")}`).join("\n")).join("\n\n"),
      `${p("}")};`,
      ``,
      `${k("export default")} ${v(slug)};`,
    ].join("\n");

    // Skills
    $("#skillsGrid").innerHTML = D.skills
      .map(
        (g, gi) => `<div class="card skill-group reveal" data-spot style="--d:${gi * 0.08}s">
          <div class="skill-group__head"><span class="skill-group__ic">${groupIcon(g, gi)}</span><span class="label-sm">0${gi + 1}</span></div>
          <h3>${esc(g.group)}</h3>
          <div class="skill-list">${g.items
            .map((it) => `<div class="skill">${techIcon(it, 20)}${esc(it.name)}</div>`)
            .join("")}</div>
        </div>`
      )
      .join("");

    // Projects + filters
    const cats = ["All", ...new Set(D.projects.map((pr) => pr.category))];
    $("#filters").innerHTML = cats.map((ct, idx) => `<button class="filter${idx ? "" : " active"}" role="tab" aria-selected="${!idx}" data-filter="${esc(ct)}">${esc(ct)}</button>`).join("");
    $("#projectsGrid").innerHTML = D.projects
      .map((pr, idx) => {
        const url = [pr.live, pr.code].find((u) => u && u !== "#");
        const visual = url ? `a href="${esc(url)}" target="_blank" rel="noopener" data-cursor="View" aria-label="Open ${esc(pr.title)}"` : "div";
        return `<article class="card project" data-spot data-cat="${esc(pr.category)}" style="--h:${pr.hue ?? 260}; --i:${idx}">
          <${visual} class="project__visual">
            <span class="project__num" aria-hidden="true">${String(idx + 1).padStart(2, "0")}</span>
            <div class="mock${pr.image ? " mock--shot" : ""}"><div class="mock__bar"><i></i><i></i><i></i>${pr.image && pr.live ? `<span>${esc(pr.live.replace(/^https?:\/\//, "").replace(/\/$/, ""))}</span>` : ""}</div>
              ${pr.image
                ? `<img src="${esc(pr.image)}" alt="${esc(pr.title)} screenshot" loading="lazy" />`
                : '<div class="mock__body"><div class="mock__line mock__line--accent"></div><div class="mock__line" style="width:85%"></div><div class="mock__line" style="width:65%"></div><div class="mock__row"><div class="mock__box"></div><div class="mock__box"></div><div class="mock__box"></div></div></div>'}
            </div>
          </${url ? "a" : "div"}>
          <div class="project__body">
            <div class="project__top">
              <span class="project__cat">${String(idx + 1).padStart(2, "0")} / ${esc(pr.category)} ${pr.featured ? '<span class="featured-badge">Featured</span>' : ""}</span>
              <div class="project__links">
                ${pr.code ? `<a class="code-link" href="${esc(pr.code)}" target="_blank" rel="noopener" aria-label="Source code of ${esc(pr.title)}">${ICONS.github}</a>` : ""}
                ${pr.live ? `<a href="${esc(pr.live)}" target="_blank" rel="noopener" aria-label="Live demo of ${esc(pr.title)}">${ICONS.arrow}</a>` : ""}
              </div>
            </div>
            <h3>${esc(pr.title)}</h3>
            <p>${esc(pr.description)}</p>
            <div class="project__tags">${pr.tags.map((t) => `<span class="tag">${brandIcon(t, 12)}${esc(t)}</span>`).join("")}</div>
          </div>
        </article>`;
      })
      .join("");

    // Experience
    const SHOWN = 3;
    $("#timeline").innerHTML = D.experience
      .map((e, idx) => {
        const mark = e.logo ? `<img src="${esc(e.logo)}" alt="${esc(e.company.split(/[,·]/)[0].trim())} logo" />` : esc(e.company.replace(/[^A-Za-z]/g, "").slice(0, 2));
        const chips = [e.current ? '<span class="xp__chip xp__chip--now"><i></i>Current</span>' : "", ...(e.meta || []).map((m) => `<span class="xp__chip">${esc(m)}</span>`)].join("");
        const extra = e.points.length - SHOWN;
        return `<li class="tl reveal" style="--d:${idx * 0.08}s"><span class="tl__dot"></span>
          <div class="card xp" data-spot>
            <div class="xp__head">
              <span class="xp__logo">${mark}</span>
              <div class="xp__who"><h3 class="xp__role">${esc(e.role)}</h3><div class="xp__co">${esc(e.company)}</div></div>
              <span class="xp__period">${esc(e.period)}</span>
            </div>
            ${chips ? `<div class="xp__chips">${chips}</div>` : ""}
            <ul class="xp__points">${e.points.map((pt, i) => `<li${i >= SHOWN ? ' class="xp__more"' : ""}>${esc(pt)}</li>`).join("")}</ul>
            ${extra > 0 ? `<button class="xp__toggle" type="button" aria-expanded="false" data-more="${extra}"><span>Show ${extra} more</span><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg></button>` : ""}
            ${e.tags?.length ? `<div class="tags">${e.tags.map((t) => `<span class="tag">${brandIcon(t, 12)}${esc(t)}</span>`).join("")}</div>` : ""}
          </div></li>`;
      })
      .join("");

    // Education
    $("#educationList").innerHTML = D.education
      .map((ed, idx) => `<div class="card edu reveal" data-spot style="--d:${idx * 0.08}s">
          ${ed.logo ? `<span class="edu__logo"><img src="${esc(ed.logo)}" alt="${esc(ed.school)} logo" /></span>` : ""}
          <div class="edu__body"><h3>${esc(ed.degree)}</h3><div class="edu__school">${esc(ed.school)}</div>
            <div class="edu__chips">${[ed.period, ed.place].filter(Boolean).map((x) => `<span class="xp__chip">${esc(x)}</span>`).join("")}</div></div>
          ${ed.grade ? `<div class="edu__grade"><span class="label-sm">${esc(ed.gradeLabel || "Grade")}</span><b>${esc(ed.grade)}</b></div>` : ed.note ? `<span class="mono muted">${esc(ed.note)}</span>` : ""}
        </div>`)
      .join("");

    // Certifications
    $("#certList").innerHTML = D.certifications
      .map((ct, idx) => {
        const badge = ct.badge ? `<img src="${esc(ct.badge)}" alt="${esc(ct.name)} badge" />` : hexBadge(ct);
        return `<a class="card cert reveal" data-spot href="${esc(ct.url || "#")}" target="_blank" rel="noopener" style="--d:${idx * 0.08}s">
          <div class="cert__top"><span class="cert__badge">${badge}</span>${ct.level ? `<span class="cert__lvl">${esc(ct.level)}</span>` : ""}</div>
          <h3>${esc(ct.name)}</h3>
          <div class="cert__meta">${esc(ct.issuer)}</div>
          <div class="cert__foot">
            <span>Issued <b>${esc(ct.issued || ct.year || "")}</b></span>
            ${ct.expires ? `<span>Valid to <b>${esc(ct.expires)}</b></span>` : '<span class="cert__arrow">↗</span>'}
          </div></a>`;
      })
      .join("");

    // Contact
    const mb = $("#mailBtn");
    mb.href = mailHref(D.email);
    if (finePointer) { mb.target = "_blank"; mb.rel = "noopener"; }
    $("#emailText").textContent = D.email;
  }

  /* ---------------------------------------------------------------------
     Preloader
     --------------------------------------------------------------------- */
  function preload(done) {
    const loader = $("#loader");
    let seen = false;
    try { seen = sessionStorage.getItem("loaded") === "1"; sessionStorage.setItem("loaded", "1"); } catch (e) {}
    if (reduced || seen || location.search.includes("noloader")) { loader.remove(); return done(); }
    document.body.classList.add("is-loading");
    const count = $("#loaderCount"), bar = $("#loaderBar");
    const start = performance.now(), dur = 1400;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      count.textContent = Math.round(e * 100);
      bar.style.width = e * 100 + "%";
      if (p < 1) return requestAnimationFrame(tick);
      setTimeout(() => {
        loader.classList.add("done");
        document.body.classList.remove("is-loading");
        done();
        setTimeout(() => loader.remove(), 1100);
      }, 150);
    };
    requestAnimationFrame(tick);
  }

  /* ---------------------------------------------------------------------
     Effects
     --------------------------------------------------------------------- */
  function revealOnScroll() {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.add("in");
        $$("[data-count]", en.target).forEach(countUp);
        io.unobserve(en.target);
      }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    $$(".reveal").forEach((el) => io.observe(el));
  }

  function countUp(el) {
    const to = +el.dataset.count;
    if (reduced) return (el.textContent = to);
    const start = performance.now(), dur = 1600;
    const step = (t) => {
      const p = Math.min(1, (t - start) / dur);
      el.textContent = Math.round(to * (1 - Math.pow(1 - p, 4)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  // Text scramble: random glyphs resolve into the target text
  const GLYPHS = "!<>-_\\/[]{}—=+*^?#01";
  function scramble(el, to, speed = 14) {
    const token = (el._scramble = (el._scramble || 0) + 1);
    const from = el.textContent, len = Math.max(from.length, to.length);
    const q = [...Array(len)].map((_, i) => ({ from: from[i] || "", to: to[i] || "", start: Math.floor(Math.random() * speed), end: Math.floor(Math.random() * speed) + speed }));
    let frame = 0;
    const run = () => {
      if (token !== el._scramble) return;
      let out = "", complete = 0;
      q.forEach((c) => {
        if (frame >= c.end) { complete++; out += c.to; }
        else if (frame >= c.start) out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        else out += c.from;
      });
      el.textContent = out;
      if (complete === q.length) return;
      frame++; requestAnimationFrame(run);
    };
    run();
  }

  function roleRotator() {
    const el = $("#roleText");
    let idx = 0;
    el.textContent = D.roles[0];
    if (reduced || D.roles.length < 2) return;
    setInterval(() => { idx = (idx + 1) % D.roles.length; scramble(el, D.roles[idx]); }, 3200);
  }

  function navScramble() {
    if (reduced) return;
    $$(".nav__links a").forEach((a) => {
      const text = a.textContent;
      a.addEventListener("pointerenter", () => scramble(a, text, 8));
    });
  }

  /* ---------------------------------------------------------------------
     Smooth scroll (Lenis, falls back to native)
     --------------------------------------------------------------------- */
  let lenis = null;
  function smoothScroll() {
    if (!reduced && window.Lenis) {
      lenis = new window.Lenis({ lerp: 0.1, smoothWheel: true });
      const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
    document.addEventListener("click", (e) => {
      const a = e.target.closest('a[href^="#"]');
      const id = a?.getAttribute("href");
      if (!id || id.length < 2) return;
      const el = $(id);
      if (!el) return;
      e.preventDefault();
      scrollToEl(el);
      history.replaceState(null, "", id);
    });
  }
  function scrollToEl(el) {
    if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1.4 });
    else el.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  }

  /* ---------------------------------------------------------------------
     Hero: interactive dot field + proximity font weight
     --------------------------------------------------------------------- */
  function heroField() {
    const canvas = $("#field");
    if (reduced) return canvas.remove();
    const ctx = canvas.getContext("2d");
    const hero = canvas.parentElement;
    const GAP = 26, R = 150;
    let w = 0, h = 0, dots = [], mx = -1e4, my = -1e4, running = false, dim, lit;

    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      dim = cs.getPropertyValue("--muted").trim();
      lit = cs.getPropertyValue("--accent").trim();
    };
    const resize = () => {
      const dpr = Math.min(2, devicePixelRatio || 1);
      w = hero.clientWidth; h = hero.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      for (let y = GAP / 2; y < h; y += GAP) for (let x = GAP / 2; x < w; x += GAP) dots.push({ ox: x, oy: y, x, y, vx: 0, vy: 0 });
    };
    const frame = (t) => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      const time = t * 0.001;
      for (const d of dots) {
        const dx = d.x - mx, dy = d.y - my, dist2 = dx * dx + dy * dy;
        if (dist2 < R * R) {
          const dist = Math.sqrt(dist2) || 1, f = (1 - dist / R) * 2.4;
          d.vx += (dx / dist) * f; d.vy += (dy / dist) * f;
        }
        d.vx = (d.vx + (d.ox - d.x) * 0.06) * 0.82;
        d.vy = (d.vy + (d.oy - d.y) * 0.06) * 0.82;
        d.x += d.vx; d.y += d.vy;
        const disp = Math.min(1, Math.hypot(d.x - d.ox, d.y - d.oy) / 16);
        const wave = 0.5 + 0.5 * Math.sin(time * 1.3 + d.ox * 0.011 + d.oy * 0.017);
        ctx.globalAlpha = 0.1 + wave * 0.2 + disp * 0.7;
        ctx.fillStyle = disp > 0.12 ? lit : dim;
        const s = 1.5 + disp * 1.8;
        ctx.fillRect(d.x - s / 2, d.y - s / 2, s, s);
      }
      requestAnimationFrame(frame);
    };

    readColors();
    new MutationObserver(readColors).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    new ResizeObserver(resize).observe(hero);
    hero.addEventListener("pointermove", (e) => { const r = canvas.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; });
    hero.addEventListener("pointerleave", () => { mx = my = -1e4; });
    new IntersectionObserver(([en]) => {
      const was = running;
      running = en.isIntersecting;
      if (running && !was) requestAnimationFrame(frame);
    }).observe(hero);
  }

  function heroNameFX() {
    if (!finePointer || reduced) return;
    const chars = $$("#heroName .char");
    let mx = -1e4, my = -1e4, raf = 0;
    const apply = () => {
      raf = 0;
      chars.forEach((c) => {
        const r = c.getBoundingClientRect();
        const k = Math.max(0, 1 - Math.hypot(r.left + r.width / 2 - mx, r.top + r.height / 2 - my) / 280);
        c.style.fontWeight = Math.round(800 - k * 600);
      });
    };
    addEventListener("pointermove", (e) => {
      if (scrollY > innerHeight) return;
      mx = e.clientX; my = e.clientY;
      if (!raf) raf = requestAnimationFrame(apply);
    }, { passive: true });
  }

  /* ---------------------------------------------------------------------
     Velocity marquee: speeds up + skews with scroll, flips with direction
     --------------------------------------------------------------------- */
  function velocityMarquee() {
    if (reduced) return;
    const rows = ["#marquee"].map((s) => ({ el: $(s), x: 0, dir: -1, half: 0 }));
    const measure = () => rows.forEach((r) => (r.half = r.el.scrollWidth / 2));
    let lastY = scrollY, vel = 0, scrollDir = 1, running = false;
    const loop = () => {
      if (!running) return;
      const d = scrollY - lastY; lastY = scrollY;
      vel += (d - vel) * 0.12;
      if (Math.abs(d) > 0.5) scrollDir = d > 0 ? 1 : -1;
      const skew = Math.max(-10, Math.min(10, -vel * 0.35));
      rows.forEach((r) => {
        if (!r.half) return;
        r.x += r.dir * scrollDir * (0.7 + Math.min(Math.abs(vel), 60) * 0.3);
        if (r.x <= -r.half) r.x += r.half;
        if (r.x > 0) r.x -= r.half;
        r.el.style.transform = `translate3d(${r.x.toFixed(2)}px,0,0) skewX(${skew.toFixed(2)}deg)`;
      });
      requestAnimationFrame(loop);
    };
    measure();
    addEventListener("resize", measure);
    document.fonts?.ready.then(measure);
    new IntersectionObserver(([en]) => {
      const was = running;
      running = en.isIntersecting;
      if (running && !was) { lastY = scrollY; requestAnimationFrame(loop); }
    }).observe($(".marquee"));
  }

  /* ---------------------------------------------------------------------
     Scroll scenes: manifesto words, stacking project cards, timeline fill
     --------------------------------------------------------------------- */
  const clamp01 = (n) => Math.min(1, Math.max(0, n));
  function scrollScenes() {
    const words = $$("#manifesto .w"), text = $("#manifesto");
    const grid = $("#projectsGrid"), wide = matchMedia("(min-width: 861px)");
    const tl = $("#timeline");

    const manifesto = () => {
      if (reduced) return;
      const vh = innerHeight, r = text.getBoundingClientRect();
      const lit = clamp01((vh * 0.85 - r.top) / (vh * 0.4 + r.height)) * words.length;
      words.forEach((w, i) => {
        const o = (0.12 + clamp01(lit - i) * 0.88).toFixed(2);
        if (w._o !== o) { w.style.opacity = o; w._o = o; }
      });
    };

    const stack = () => {
      const cards = $$(".project:not(.is-hidden)", grid);
      cards.forEach((c, i) => {
        c.style.setProperty("--i", i);
        const next = cards[i + 1];
        let p = 0;
        if (next && wide.matches && !reduced) {
          const a = c.getBoundingClientRect(), b = next.getBoundingClientRect();
          p = clamp01(1 - (b.top - a.top) / a.height);
        }
        c.style.setProperty("--s", (1 - p * 0.06).toFixed(4));
        c.style.setProperty("--dim", (p * 0.55).toFixed(3));
      });
    };

    const timeline = () => {
      if (reduced) return;
      const mark = innerHeight * 0.6, r = tl.getBoundingClientRect();
      tl.style.setProperty("--tp", clamp01((mark - r.top) / r.height).toFixed(4));
      $$(".tl", tl).forEach((li) => li.classList.toggle("lit", $(".tl__dot", li).getBoundingClientRect().top < mark));
    };

    let queued = false;
    const run = () => { queued = false; manifesto(); stack(); timeline(); };
    const request = () => { if (!queued) { queued = true; requestAnimationFrame(run); } };
    addEventListener("scroll", request, { passive: true });
    addEventListener("resize", request);
    request();
    return request;
  }

  /* ---------------------------------------------------------------------
     Footer: giant name fitted to width, glow follows the pointer
     --------------------------------------------------------------------- */
  function footerBig() {
    const box = $("#footBig"), span = $("span", box);
    let lastW = 0;
    const fit = (force) => {
      if (force !== true && box.clientWidth === lastW) return;
      lastW = box.clientWidth;
      span.style.fontSize = "100px";
      span.style.fontSize = (100 * box.clientWidth) / span.offsetWidth + "px";
    };
    fit();
    document.fonts?.ready.then(() => fit(true));
    new ResizeObserver(fit).observe(box);
    box.addEventListener("pointermove", (e) => {
      const r = span.getBoundingClientRect();
      span.style.setProperty("--fx", e.clientX - r.left + "px");
      span.style.setProperty("--fy", e.clientY - r.top + "px");
    });
    box.addEventListener("pointerleave", () => { span.style.removeProperty("--fx"); span.style.removeProperty("--fy"); });
  }

  function clock() {
    const el = $("#clock");
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false, timeZone: D.timezone });
    const zone = new Intl.DateTimeFormat("en-US", { timeZone: D.timezone, timeZoneName: "short" }).formatToParts(new Date()).find((x) => x.type === "timeZoneName")?.value;
    $("#clockZone").textContent = `${D.timezone.split("/").pop().replace("_", " ")} · ${zone || ""}`;
    const tick = () => {
      const [h, m, s] = fmt.format(new Date()).split(":");
      el.innerHTML = `${h}:${m}<span class="sec">:${s}</span>`;
    };
    tick(); setInterval(tick, 1000);
  }

  function pointerFX() {
    if (!finePointer || reduced) return;
    const cursor = $("#cursor"), spot = $("#spot"), label = $("#cursorLabel");
    let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y;
    addEventListener("pointermove", (e) => {
      x = e.clientX; y = e.clientY;
      spot.style.setProperty("--x", x + "px"); spot.style.setProperty("--y", y + "px");
    });
    const loop = () => { cx += (x - cx) * 0.2; cy += (y - cy) * 0.2; cursor.style.transform = `translate(${cx}px, ${cy}px)`; requestAnimationFrame(loop); };
    loop();
    document.addEventListener("pointerover", (e) => {
      const lab = e.target.closest("[data-cursor]");
      if (lab) label.textContent = lab.dataset.cursor;
      cursor.classList.toggle("label", !!lab);
      cursor.classList.toggle("hover", !lab && !!e.target.closest("a, button, [data-tilt]"));
    });

    // Card spotlight
    document.addEventListener("pointermove", (e) => {
      const card = e.target.closest("[data-spot]");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", e.clientX - r.left + "px");
      card.style.setProperty("--my", e.clientY - r.top + "px");
    });

    // Magnetic buttons
    $$("[data-magnetic]").forEach((el) => {
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px, ${(e.clientY - r.top - r.height / 2) * 0.35}px)`;
      });
      el.addEventListener("pointerleave", () => (el.style.transform = ""));
    });

    // 3D tilt
    $$("[data-tilt]").forEach((el) => {
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(1000px) rotateX(${-py * 6}deg) rotateY(${px * 6}deg)`;
      });
      el.addEventListener("pointerleave", () => (el.style.transform = ""));
    });
  }

  function navFX() {
    const nav = $("#nav"), progress = $("#progress");
    let last = scrollY;
    const onScroll = () => {
      const y = scrollY;
      nav.classList.toggle("scrolled", y > 20);
      nav.classList.toggle("hidden", y > last && y > 400 && $("#cmd").hidden);
      last = y;
      const h = document.documentElement.scrollHeight - innerHeight;
      progress.style.transform = `scaleX(${h > 0 ? y / h : 0})`;
    };
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const links = $$(".nav__links a");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (!en.isIntersecting) return;
        links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id));
      }),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ["about", "skills", "projects", "experience", "contact"].forEach((id) => io.observe($("#" + id)));
  }

  function projectFilter(onChange) {
    $("#filters").addEventListener("click", (e) => {
      const btn = e.target.closest(".filter");
      if (!btn) return;
      $$(".filter").forEach((b) => { b.classList.toggle("active", b === btn); b.setAttribute("aria-selected", b === btn); });
      const f = btn.dataset.filter;
      $$(".project").forEach((p) => {
        const show = f === "All" || p.dataset.cat === f;
        p.classList.toggle("is-hidden", !show);
      });
      onChange();
    });
  }

  /* ---------------------------------------------------------------------
     Theme, toast, copy
     --------------------------------------------------------------------- */
  function toggleTheme() {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    const apply = () => { root.dataset.theme = next; try { localStorage.setItem("theme", next); } catch (e) {} };
    if (document.startViewTransition && !reduced) document.startViewTransition(apply);
    else apply();
  }

  let toastT;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg; t.classList.add("show");
    clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("show"), 2200);
  }

  async function copyEmail() {
    try { await navigator.clipboard.writeText(D.email); toast("✓ Email copied to clipboard"); }
    catch (e) { location.href = `mailto:${D.email}`; }
  }

  /* ---------------------------------------------------------------------
     Command palette (⌘K / Ctrl+K)
     --------------------------------------------------------------------- */
  function commandPalette() {
    const cmd = $("#cmd"), input = $("#cmdInput"), list = $("#cmdList");
    const go = (id) => () => scrollToEl($(id));
    const actions = [
      { group: "Navigate", label: "Home", ic: "⌂", run: go("#top") },
      { group: "Navigate", label: "About", ic: "☺", run: go("#about") },
      { group: "Navigate", label: "Tech stack", ic: "⚙", run: go("#skills") },
      { group: "Navigate", label: "Projects", ic: "◆", run: go("#projects") },
      { group: "Navigate", label: "Experience", ic: "↗", run: go("#experience") },
      { group: "Navigate", label: "Education & certifications", ic: "🎓", run: go("#education") },
      { group: "Navigate", label: "Contact", ic: "✉", run: go("#contact") },
      { group: "Actions", label: "Copy email address", ic: "⧉", run: copyEmail },
      ...(D.resume ? [{ group: "Actions", label: "Download CV", ic: "↓", run: () => window.open(D.resume, "_blank") }] : []),
      { group: "Actions", label: "Toggle light / dark theme", ic: "◐", run: toggleTheme },
      ...D.socials.map((s) => ({ group: "Socials", label: `Open ${s.label}`, ic: "↗", run: () => window.open(s.url, "_blank", "noopener") })),
    ];
    let filtered = actions, sel = 0;

    const draw = () => {
      const q = input.value.trim().toLowerCase();
      filtered = actions.filter((a) => a.label.toLowerCase().includes(q));
      sel = Math.min(sel, Math.max(0, filtered.length - 1));
      if (!filtered.length) { list.innerHTML = `<li class="cmd__empty">No results for “${esc(q)}”</li>`; return; }
      let html = "", g = "";
      filtered.forEach((a, i) => {
        if (a.group !== g) { g = a.group; html += `<li class="cmd__group" role="presentation">${esc(g)}</li>`; }
        html += `<li class="cmd__item" role="option" data-i="${i}" aria-selected="${i === sel}"><span class="ic">${a.ic}</span>${esc(a.label)}</li>`;
      });
      list.innerHTML = html;
      $(`[aria-selected="true"]`, list)?.scrollIntoView({ block: "nearest" });
    };
    const open = () => { cmd.hidden = false; lenis?.stop(); input.value = ""; sel = 0; draw(); input.focus(); };
    const close = () => { cmd.hidden = true; lenis?.start(); };
    const exec = (i) => { const a = filtered[i]; if (!a) return; close(); setTimeout(a.run, 60); };

    $("#cmdOpen").addEventListener("click", open);
    cmd.addEventListener("click", (e) => { if (e.target.dataset.close !== undefined) close(); });
    list.addEventListener("click", (e) => { const it = e.target.closest(".cmd__item"); if (it) exec(+it.dataset.i); });
    list.addEventListener("pointermove", (e) => { const it = e.target.closest(".cmd__item"); if (it && +it.dataset.i !== sel) { sel = +it.dataset.i; draw(); } });
    input.addEventListener("input", () => { sel = 0; draw(); });
    input.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") { e.preventDefault(); sel = (sel + 1) % filtered.length; draw(); }
      else if (e.key === "ArrowUp") { e.preventDefault(); sel = (sel - 1 + filtered.length) % filtered.length; draw(); }
      else if (e.key === "Enter") { e.preventDefault(); exec(sel); }
    });
    addEventListener("keydown", (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); cmd.hidden ? open() : close(); }
      else if (e.key === "Escape" && !cmd.hidden) close();
      else if (e.key === "/" && cmd.hidden && !/input|textarea/i.test(document.activeElement.tagName)) { e.preventDefault(); open(); }
    });
    if (!/Mac|iPhone|iPad/.test(navigator.platform)) $("#cmdOpen").innerHTML = "<span>Ctrl</span>&nbsp;K";
  }

  /* ---------------------------------------------------------------------
     Boot
     --------------------------------------------------------------------- */
  render();
  $("#themeToggle").addEventListener("click", toggleTheme);
  $("#copyBtn").addEventListener("click", copyEmail);
  $("#timeline").addEventListener("click", (e) => {
    const btn = e.target.closest(".xp__toggle");
    if (!btn) return;
    const open = btn.getAttribute("aria-expanded") !== "true";
    btn.setAttribute("aria-expanded", open);
    btn.closest(".xp").classList.toggle("open", open);
    $("span", btn).textContent = open ? "Show less" : `Show ${btn.dataset.more} more`;
    lenis?.resize();
  });
  clock();
  navFX();
  navScramble();
  const refreshScenes = scrollScenes();
  projectFilter(refreshScenes);
  commandPalette();
  pointerFX();
  heroField();
  footerBig();
  preload(() => {
    $("#heroName").classList.add("in");
    smoothScroll();
    revealOnScroll();
    roleRotator();
    heroNameFX();
    velocityMarquee();
  });

  console.log(
    "%c" + fullName + " %c— thanks for peeking under the hood. Let's talk: " + D.email,
    "font:800 16px system-ui;background:linear-gradient(90deg,#a78bfa,#22d3ee);-webkit-background-clip:text;color:transparent",
    "color:#8d8da3"
  );
})();
