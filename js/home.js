"use strict";
GM.chrome("index.html");
const D = GM_DATA;
function render() {
  const p = GM.load();
  const g = GM.$("#greeting");
  if (p.name) { g.hidden = false; g.textContent = `Welcome back, ${p.name}! Pick up where you stopped.`; GM.$("#nameInput").value = p.name; }
  const lessonsDone = D.lessons.filter((l) => p.lessons[l.id]).length;
  const mouseDone = Object.keys(p.mouse).length;
  const typingDone = Object.values(p.typing).filter((t) => t.stars > 0).length;
  const quizzesDone = D.topics.filter((t) => p.quizzes[t.id]).length;
  const MOUSE_TOTAL = D.mouseLevels.length, TYPING_TOTAL = 12;
  const items = [
    ["Lessons read", lessonsDone, D.lessons.length],
    ["Mouse levels", mouseDone, MOUSE_TOTAL],
    ["Typing lessons", typingDone, TYPING_TOTAL],
    ["Quiz topics tried", quizzesDone, D.topics.length],
    ["Best shortcut score", p.shortcuts.best || 0, 10]
  ];
  GM.$("#journey").innerHTML = items.map(([t, a, b]) => `<div class="card"><strong>${a}/${b}</strong>${t}</div>`).join("");
  const parts = items.slice(0, 4).reduce((s, [, a, b]) => s + Math.min(a / b, 1), 0) / 4;
  const pct = Math.round(parts * 100);
  const o = GM.$("#overall");
  o.setAttribute("aria-valuenow", pct);
  o.firstElementChild.style.width = pct + "%";
  GM.$("#topics").innerHTML = D.topics.map((t) => {
    const q = p.quizzes[t.id];
    return `<a class="card" href="quiz.html?topic=${t.id}"><span class="card-icon">${GMI(t.icon)}</span><h3>${t.title}</h3><p>${t.blurb}</p>${q ? `<span class="pill done">Best ${q.best}%</span>` : '<span class="pill">Not tried</span>'}</a>`;
  }).join("");
}
GM.$("#nameForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const v = GM.$("#nameInput").value.trim();
  if (!v) { GM.$("#nameInput").focus(); return; }
  GM.update((p) => { p.name = v; });
  location.href = "learn.html";
});
render();
