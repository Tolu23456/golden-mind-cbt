"use strict";
GM.chrome("lab.html");
const D = GM_DATA;
const $ = GM.$;
const DRAFT_KEY = "goldenMindCBT.labDrafts";
const LEVELS = ["Starter", "Easy", "Medium", "Challenge"];
const challenges = D.labChallenges;
let cur = 0;
let tab = "html";
let code = { html: "", css: "", js: "" };

const params = new URLSearchParams(location.search);
const wanted = params.get("challenge");
if (wanted) {
  const found = challenges.findIndex((c) => c.id === wanted);
  if (found >= 0) cur = found;
}

function drafts() {
  try { return JSON.parse(localStorage.getItem(DRAFT_KEY)) || {}; }
  catch (e) { return {}; }
}
function saveDraft() {
  try {
    const all = drafts();
    all[challenges[cur].id] = code;
    localStorage.setItem(DRAFT_KEY, JSON.stringify(all));
  } catch (e) { /* storage off */ }
}

function drawNav() {
  const p = GM.load();
  const out = [];
  LEVELS.forEach((level) => {
    const items = challenges.filter((c) => c.level === level);
    if (!items.length) return;
    out.push(`<span class="nav-group">${level}</span>`);
    items.forEach((c) => {
      const i = challenges.indexOf(c);
      out.push(`<button type="button" data-i="${i}" ${i === cur ? 'aria-current="true"' : ""}>${GMI(c.icon)} ${c.title}${p.lab[c.id] ? '<span class="tick" aria-label="done">' + GMI("check") + "</span>" : ""}</button>`);
    });
  });
  $("#challengeNav").innerHTML = out.join("");
}

function drawTests(results) {
  const c = challenges[cur];
  $("#testList").innerHTML = c.tests.map((t, i) => {
    const r = results ? results[i] : null;
    const cls = r === true ? "pass" : r === false ? "fail" : "";
    const icon = r === true ? "check" : r === false ? "cross" : "circle";
    return `<div class="test-row ${cls}">${GMI(icon)} <span>${t.label} <small>(${t.tab.toUpperCase()})</small></span></div>`;
  }).join("");
}

function loadChallenge(i) {
  cur = Math.max(0, Math.min(i, challenges.length - 1));
  const c = challenges[cur];
  const saved = drafts()[c.id];
  code = saved ? { html: saved.html, css: saved.css, js: saved.js } : { html: c.html, css: c.css, js: c.js };
  tab = "html";
  history.replaceState(null, "", "?challenge=" + encodeURIComponent(c.id));
  $("#challengeTitle").textContent = c.title;
  $("#challengeBlurb").textContent = c.blurb;
  $("#challengeLevel").textContent = c.level;
  $("#nextBtn").disabled = cur === challenges.length - 1;
  drawNav();
  drawTests(null);
  setTab("html");
  $("#labMsg").textContent = "";
  $("#labMsg").className = "lab-msg";
  run(false);
}

function setTab(name) {
  tab = name;
  GM.$$(".editor-tabs button").forEach((b) => b.setAttribute("aria-selected", String(b.dataset.tab === name)));
  $("#editor").value = code[name] || "";
  $("#editor").focus();
}

function buildDoc() {
  const safeJs = (code.js || "").replace(/<\/script/gi, "<\\/script");
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${code.css || ""}</style></head><body>${code.html || ""}<script>${safeJs}<\/script></body></html>`;
}

function run(mark = true) {
  const c = challenges[cur];
  const results = c.tests.map((t) => {
    try { return new RegExp(t.re, "i").test(code[t.tab] || ""); }
    catch (e) { return false; }
  });
  const passed = results.filter(Boolean).length;
  const all = passed === results.length;
  $("#preview").srcdoc = buildDoc();
  drawTests(results);

  const msg = $("#labMsg");
  if (!mark) {
    msg.textContent = "Press Run to test your code. The preview shows the starting point.";
    msg.className = "lab-msg";
    return;
  }
  if (all) {
    GM.update((p) => { p.lab[c.id] = true; });
    msg.textContent = `Challenge complete — ${passed}/${results.length} checks passed. Well done!`;
    msg.className = "lab-msg good";
    drawNav();
  } else {
    const missing = c.tests.filter((t, i) => !results[i]).map((t) => t.label).join("; ");
    msg.textContent = `${passed}/${results.length} checks passed. Still to do: ${missing}.`;
    msg.className = "lab-msg bad";
  }
}

$("#challengeNav").addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  saveDraft();
  loadChallenge(+b.dataset.i);
});
GM.$$(".editor-tabs button").forEach((b) => {
  b.addEventListener("click", () => { saveDraft(); setTab(b.dataset.tab); });
});
$("#editor").addEventListener("input", () => {
  code[tab] = $("#editor").value;
  saveDraft();
});
$("#editor").addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    e.preventDefault();
    const el = e.target;
    const start = el.selectionStart;
    el.value = el.value.slice(0, start) + "  " + el.value.slice(el.selectionEnd);
    el.selectionStart = el.selectionEnd = start + 2;
    code[tab] = el.value;
    saveDraft();
  }
  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") { e.preventDefault(); run(true); }
});
$("#runBtn").onclick = () => run(true);
$("#resetBtn").onclick = () => {
  const c = challenges[cur];
  code = { html: c.html, css: c.css, js: c.js };
  saveDraft();
  setTab(tab);
  run(false);
};
$("#nextBtn").onclick = () => { saveDraft(); loadChallenge(cur + 1); };

loadChallenge(cur);
