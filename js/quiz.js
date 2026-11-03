"use strict";
GM.chrome("quiz.html");
const T = GM_DATA.topics;
const $ = GM.$;
const show = (id) => ["setup", "run", "result"].forEach((s) => $("#" + s).classList.toggle("hidden", s !== id));
let qs = [], answers = [], flags = [], i = 0, mode = "practice", timer = 0, left = 0, titles = "", lastTopics = [];

/* ---------- setup ---------- */
const wanted = new URLSearchParams(location.search).get("topic");
const bests = GM.load().quizzes;
$("#topicList").innerHTML = T.map((t) => `<label class="card topic-pick"><input type="checkbox" value="${t.id}" ${t.id === wanted ? "checked" : ""}/><span><strong>${t.emoji} ${t.title}</strong><br /><small>${t.blurb}</small>${bests[t.id] ? `<br /><span class="pill done">Best ${bests[t.id].best}%</span>` : ""}</span></label>`).join("") +
  `<label class="card topic-pick"><input type="checkbox" id="allBox"/><span><strong>🎲 Everything</strong><br /><small>Mix all topics together.</small></span></label>`;
$("#allBox").addEventListener("change", (e) => GM.$$("#topicList input[value]").forEach((c) => (c.checked = e.target.checked)));

$("#startBtn").onclick = async () => {
  const picked = GM.$$("#topicList input[value]:checked").map((c) => c.value);
  if (!picked.length) { $("#setupMsg").textContent = "Choose at least one topic first."; return; }
  $("#setupMsg").textContent = "Loading questions…";
  try {
    const all = [];
    for (const id of picked) {
      const t = T.find((x) => x.id === id);
      const { questions } = GMMD.parseQuestions(await GM.text(t.file));
      questions.forEach((q) => all.push({ ...q, topic: id }));
    }
    lastTopics = picked;
    begin(all, picked);
  } catch (e) {
    $("#setupMsg").textContent = "Could not load the questions. Run the site with node server.js (opening the file directly will not work).";
  }
};

function begin(all, picked) {
  mode = $("#mode").value;
  const n = Math.min(+$("#count").value, all.length);
  qs = GM.shuffle(all).slice(0, n).map((q) => {
    const order = GM.shuffle(q.options.map((_, k) => k));
    return { ...q, options: order.map((k) => q.options[k]), correctIndex: order.indexOf(q.correctIndex) };
  });
  answers = qs.map(() => -1); flags = qs.map(() => false); i = 0;
  titles = picked.length === 1 ? T.find((t) => t.id === picked[0]).title : `${picked.length} topics`;
  $("#runTitle").textContent = titles + (mode === "exam" ? " — Exam" : " — Practice");
  clearInterval(timer);
  $("#clock").classList.toggle("hidden", mode !== "exam");
  $("#flag").classList.toggle("hidden", mode !== "exam");
  $("#navgrid").classList.toggle("hidden", mode !== "exam");
  $("#submit").classList.toggle("hidden", mode !== "exam");
  if (mode === "exam") { left = n * 45; tick(); timer = setInterval(tick, 1000); }
  show("run"); draw();
}
function tick() {
  const c = $("#clock");
  c.textContent = `${String(Math.floor(left / 60)).padStart(2, "0")}:${String(left % 60).padStart(2, "0")}`;
  c.classList.toggle("low", left <= 30);
  if (left-- <= 0) finish(true);
}

/* ---------- run ---------- */
function draw() {
  const q = qs[i];
  $("#qCount").textContent = `Question ${i + 1} of ${qs.length}`;
  $("#qText").textContent = q.question;
  const locked = mode === "practice" && answers[i] >= 0;
  $("#qOpts").innerHTML = q.options.map((o, k) => {
    let cls = "opt";
    if (locked) cls += k === q.correctIndex ? " right" : k === answers[i] ? " wrong" : "";
    else if (answers[i] === k) cls += " sel";
    return `<button type="button" class="${cls}" role="radio" aria-checked="${answers[i] === k}" data-k="${k}" ${locked ? "disabled" : ""}><span class="letter">${"ABCD"[k]}</span><span>${GMMD.esc(o)}</span></button>`;
  }).join("");
  const fb = $("#fb");
  fb.classList.toggle("hidden", !locked);
  if (locked) fb.innerHTML = `<strong>${answers[i] === q.correctIndex ? "✔ Correct!" : "✘ Not quite."}</strong> ${GMMD.esc(q.tip || "")}`;
  $("#prev").disabled = i === 0;
  $("#next").textContent = i === qs.length - 1 ? (mode === "practice" ? "Finish" : "Last question") : "Next";
  $("#next").disabled = mode === "exam" && i === qs.length - 1;
  $("#flag").textContent = flags[i] ? "Unflag" : "Flag";
  $("#prev").classList.toggle("hidden", mode === "practice");
  $("#next").disabled = $("#next").disabled || (mode === "practice" && answers[i] < 0);
  if (mode === "exam") {
    $("#navgrid").innerHTML = qs.map((_, k) => `<button type="button" data-n="${k}" class="${answers[k] >= 0 ? "answered" : ""} ${k === i ? "current" : ""} ${flags[k] ? "flagged" : ""}" aria-label="Question ${k + 1}${answers[k] >= 0 ? ", answered" : ""}${flags[k] ? ", flagged" : ""}">${k + 1}</button>`).join("");
  }
}
$("#qOpts").addEventListener("click", (e) => {
  const b = e.target.closest(".opt"); if (!b || b.disabled) return;
  answers[i] = +b.dataset.k; draw();
});
$("#navgrid").addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) { i = +b.dataset.n; draw(); } });
$("#prev").onclick = () => { if (i > 0) { i--; draw(); } };
$("#next").onclick = () => { if (i < qs.length - 1) { i++; draw(); } else finish(false); };
$("#flag").onclick = () => { flags[i] = !flags[i]; draw(); };
$("#submit").onclick = () => {
  const open = answers.filter((a) => a < 0).length;
  if (!open || confirm(`You have ${open} unanswered question${open > 1 ? "s" : ""}. Submit anyway?`)) finish(false);
};
document.addEventListener("keydown", (e) => {
  if ($("#run").classList.contains("hidden") || e.ctrlKey || e.metaKey || e.altKey) return;
  const k = "abcd".indexOf(e.key.toLowerCase());
  if (k >= 0 && k < qs[i].options.length && e.key.length === 1) { const b = $(`.opt[data-k="${k}"]`); if (b && !b.disabled) b.click(); }
  else if (e.key === "ArrowRight" && !$("#next").disabled) $("#next").click();
  else if (e.key === "ArrowLeft" && !$("#prev").disabled && mode === "exam") $("#prev").click();
});

/* ---------- result ---------- */
function finish(timeUp) {
  clearInterval(timer);
  const score = qs.filter((q, k) => answers[k] === q.correctIndex).length;
  const pct = Math.round((score / qs.length) * 100);
  const byTopic = {};
  qs.forEach((q, k) => { const t = (byTopic[q.topic] ||= { c: 0, n: 0 }); t.n++; if (answers[k] === q.correctIndex) t.c++; });
  GM.update((p) => Object.entries(byTopic).forEach(([id, t]) => {
    const pc = Math.round((t.c / t.n) * 100), o = p.quizzes[id];
    p.quizzes[id] = { best: Math.max(pc, o ? o.best : 0), attempts: (o ? o.attempts : 0) + 1 };
  }));
  const name = GM.load().name;
  $("#resScore").textContent = `${score}/${qs.length}`;
  $("#resEmoji").textContent = pct >= 80 ? "🏆" : pct >= 50 ? "👏" : "💪";
  $("#resMsg").textContent = (pct >= 80 ? "Excellent work" : pct >= 50 ? "Good effort" : "Keep practising") + (name ? ", " + name + "!" : "!");
  $("#resDetail").textContent = `${pct}% correct in ${titles}.` + (timeUp ? " Time ran out, so the test was submitted for you." : "");
  $("#review").innerHTML = qs.map((q, k) => {
    const ok = answers[k] === q.correctIndex;
    return `<div class="review-item ${ok ? "" : "bad"}"><p class="q-text">${k + 1}. ${GMMD.esc(q.question)}</p>
      <p>${ok ? "✔" : "✘"} Your answer: <strong>${answers[k] >= 0 ? GMMD.esc(q.options[answers[k]]) : "No answer"}</strong>${ok ? "" : `<br />Correct answer: <strong>${GMMD.esc(q.options[q.correctIndex])}</strong>`}</p>
      ${q.tip ? `<p><em>${GMMD.esc(q.tip)}</em></p>` : ""}</div>`;
  }).join("");
  show("result"); window.scrollTo({ top: 0 });
}
$("#again").onclick = () => { $("#startBtn").click(); };
$("#home").onclick = () => { show("setup"); };
$("#print").onclick = () => window.print();
