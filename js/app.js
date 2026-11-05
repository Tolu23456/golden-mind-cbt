"use strict";
/* Shared: header/footer, progress storage, on-screen keyboard. */
const GM = (() => {
  const KEY = "goldenMindCBT.v1";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  const blank = () => ({ name: "", lessons: {}, quizzes: {}, typing: {}, mouse: {}, lab: {}, shortcuts: { best: 0 } });
  function load() {
    try { return Object.assign(blank(), JSON.parse(localStorage.getItem(KEY)) || {}); }
    catch (e) { return blank(); }
  }
  function save(p) { try { localStorage.setItem(KEY, JSON.stringify(p)); } catch (e) { /* storage off */ } }
  function update(fn) { const p = load(); fn(p); save(p); return p; }

  const NAV = [
    ["index.html", "Home"], ["courses.html", "Courses"], ["code.html", "Programming"],
    ["mouse.html", "Mouse Lab"], ["keyboard.html", "Keyboard"], ["typing.html", "Typing"],
    ["quiz.html", "Practice Test"]
  ];

  function chrome(page) {
    const header = document.createElement("header");
    header.className = "site-header";
    header.innerHTML = `<div class="shell header-inner">
      <a class="brand" href="index.html"><svg viewBox="0 0 100 100" aria-hidden="true"><g stroke="currentColor" stroke-width="6" stroke-linecap="round"><path d="M50 6v10M50 84v10M6 50h10M84 50h10M19 19l7 7M74 74l7 7M81 19l-7 7M26 74l-7 7"/></g><circle cx="50" cy="50" r="25" fill="currentColor"/><circle cx="43" cy="47" r="2.6" fill="#5A3A12"/><circle cx="57" cy="47" r="2.6" fill="#5A3A12"/><path d="M43 56q7 7 14 0" fill="none" stroke="#5A3A12" stroke-width="3" stroke-linecap="round"/></svg>Golden Mind</a>
      <nav class="nav" aria-label="Main">${NAV.map(([h, t]) => `<a href="${h}"${h === page ? ' aria-current="page"' : ""}>${t}</a>`).join("")}</nav></div>`;
    document.body.prepend(header);
    const footer = document.createElement("footer");
    footer.className = "site-footer";
    footer.innerHTML = `<div class="shell"><p><strong>Golden Mind CBT</strong> — computer skills, programming paths, typing practice and exam preparation for students.</p><p>Your progress is saved on this device only.</p></div>`;
    document.body.append(footer);
    if (window.GMI) $$("[data-icon]").forEach((el) => { el.innerHTML = GMI(el.dataset.icon); });
  }

  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const rand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
  async function text(url) { const r = await fetch(url); if (!r.ok) throw new Error(url + " " + r.status); return r.text(); }

  /* ---- on-screen keyboard ---- */
  const ROWS = [
    [..."`1234567890-=".split("").map((k) => [k]), ["backspace", "Backspace", "w2"]],
    [["tab", "Tab", "w15"], ..."qwertyuiop[]".split("").map((k) => [k]), ["\\", "\\", "w1"]],
    [["capslock", "Caps", "w2"], ..."asdfghjkl;'".split("").map((k) => [k]), ["enter", "Enter", "w225"]],
    [["shift", "Shift", "w225"], ..."zxcvbnm,./".split("").map((k) => [k]), ["shift", "Shift", "w225"]],
    [["control", "Ctrl", "w15"], ["alt", "Alt", "w15"], [" ", "Space", "w6"], ["alt", "Alt", "w15"], ["control", "Ctrl", "w15"]]
  ];
  const FINGER_OF = {};
  [["`1qaz", 0], ["2wsx", 1], ["3edc", 2], ["4rfv5tgb", 3], ["6yhn7ujm", 4], ["8ik,", 5], ["9ol.", 6], ["0p;/-=[]'\\", 7]]
    .forEach(([ks, f]) => [...ks].forEach((k) => (FINGER_OF[k] = f)));
  FINGER_OF[" "] = 8;
  const SHIFTED = { "!": "1", "@": "2", "#": "3", "$": "4", "%": "5", "^": "6", "&": "7", "*": "8", "(": "9", ")": "0", "_": "-", "+": "=", "{": "[", "}": "]", "|": "\\", ":": ";", '"': "'", "<": ",", ">": ".", "?": "/", "~": "`" };

  function buildKeyboard(el, colour = true) {
    el.classList.add("kb");
    el.setAttribute("aria-hidden", "true");
    el.innerHTML = ROWS.map((row) => `<div class="kb-row">${row.map(([k, label, cls]) =>
      `<span class="key ${cls || ""} ${colour && FINGER_OF[k] !== undefined ? "f" + FINGER_OF[k] : ""}" data-key="${k}">${label || k}</span>`).join("")}</div>`).join("");
  }
  const keyEls = (el, k) => $$(`.key[data-key="${CSS.escape(k)}"]`, el);
  function flash(el, k, cls) { keyEls(el, k).forEach((e) => { e.classList.add(cls); setTimeout(() => e.classList.remove(cls), 220); }); }
  function keyFor(ch) {
    if (ch === " ") return { key: " ", shift: false };
    if (SHIFTED[ch]) return { key: SHIFTED[ch], shift: true };
    if (ch !== ch.toLowerCase()) return { key: ch.toLowerCase(), shift: true };
    return { key: ch, shift: false };
  }

  const stars = (n) => "★".repeat(n) + "☆".repeat(3 - n);

  /* ---- course helpers (shared by the catalogue, course and lesson pages) ---- */
  const lessonsOf = (course) => {
    const ids = [];
    (course && course.units ? course.units : []).forEach((u) => (u.lessons || []).forEach((id) => {
      if (!ids.includes(id)) ids.push(id);
    }));
    return ids;
  };
  const courseProgress = (course, p) => {
    const ids = lessonsOf(course);
    const done = ids.filter((id) => p.lessons[id]).length;
    return { done, total: ids.length, pct: ids.length ? Math.round((done / ids.length) * 100) : 0 };
  };
  const xp = (p) => {
    const D = window.GM_DATA || { lessons: [], mouseLevels: [], typingLessons: [] };
    return D.lessons.filter((l) => p.lessons[l.id]).length * 10 +
      Object.keys(p.quizzes || {}).length * 20 +
      Object.keys(p.mouse || {}).length * 5 +
      Object.values(p.typing || {}).reduce((s, t) => s + (t.stars || 0) * 5, 0) +
      Object.keys(p.lab || {}).length * 15;
  };
  const levelOf = (score) => Math.floor(score / 100) + 1;

  return { $, $$, load, save, update, chrome, shuffle, rand, text, buildKeyboard, keyEls, flash, keyFor, stars, FINGER_OF, lessonsOf, courseProgress, xp, levelOf };
})();
