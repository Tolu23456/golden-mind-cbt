"use strict";
GM.chrome("typing.html");
const LESSONS = GM_DATA.typingLessons;
const textEl = GM.$("#text"), kb = GM.$("#kb");
GM.buildKeyboard(kb);
let cur = 0, chars = [], pos = 0, errors = 0, startAt = 0, timer = 0, finished = false;

function drawList() {
  const p = GM.load();
  let group = "";
  const out = [];
  LESSONS.forEach((l, i) => {
    if (l.group !== group) {
      group = l.group;
      out.push(`<span class="nav-group">${group}</span>`);
    }
    const t = p.typing[i];
    out.push(`<button type="button" data-i="${i}" ${i === cur ? 'aria-current="true"' : ""}>${i + 1}. ${l.title}<span class="stars" aria-label="${t ? t.stars : 0} stars">${GM.stars(t ? t.stars : 0)}</span></button>`);
  });
  GM.$("#list").innerHTML = out.join("");
}
function render() {
  textEl.innerHTML = chars.map((c, i) => `<span class="${i < pos ? "ok" : i === pos ? "cur" : ""}">${c === " " ? "&nbsp;" : GMMD.esc(c)}</span>`).join("");
}
function mark() {
  GM.$$(".key.next", kb).forEach((k) => k.classList.remove("next"));
  if (pos >= chars.length) return;
  const { key, shift } = GM.keyFor(chars[pos]);
  GM.keyEls(kb, key).forEach((k) => k.classList.add("next"));
  if (shift) GM.keyEls(kb, "shift").forEach((k) => k.classList.add("next"));
}
function stats() {
  const secs = startAt ? (Date.now() - startAt) / 1000 : 0;
  const correct = pos;
  const wpm = secs > 1 ? Math.round(correct / 5 / (secs / 60)) : 0;
  const acc = correct + errors ? Math.round((correct / (correct + errors)) * 100) : 100;
  GM.$("#sWpm").textContent = wpm; GM.$("#sAcc").textContent = acc + "%"; GM.$("#sTime").textContent = Math.round(secs) + "s";
  return { wpm, acc };
}
function start(i) {
  cur = i; clearInterval(timer);
  chars = [...LESSONS[i].text]; pos = 0; errors = 0; startAt = 0; finished = false;
  GM.$("#tTitle").textContent = `${i + 1}. ${LESSONS[i].title}`;
  GM.$("#tHelp").textContent = LESSONS[i].help;
  GM.$("#tMsg").textContent = "Press the glowing key to begin."; GM.$("#nextT").hidden = true;
  stats(); drawList(); render(); mark(); textEl.focus();
}
function finish() {
  finished = true; clearInterval(timer);
  const { wpm, acc } = stats();
  const s = acc >= 97 ? 3 : acc >= 90 ? 2 : acc >= 75 ? 1 : 0;
  GM.update((p) => { const o = p.typing[cur]; if (!o || s > o.stars || (s === o.stars && wpm > o.wpm)) p.typing[cur] = { stars: s, wpm, acc }; });
  GM.$("#tMsg").textContent = `${GM.stars(s)}  ${wpm} words per minute at ${acc}% accuracy. ` + (s === 3 ? "Excellent!" : s ? "Good work — try again for more stars." : "Slow down and aim for accuracy first.");
  if (cur < LESSONS.length - 1) GM.$("#nextT").hidden = false;
  drawList(); mark();
}
document.addEventListener("keydown", (e) => {
  if (finished || e.ctrlKey || e.metaKey || e.altKey || e.key.length !== 1) return;
  if (e.target.closest && e.target.closest("button")) return;
  e.preventDefault();
  if (!startAt) { startAt = Date.now(); timer = setInterval(stats, 500); GM.$("#tMsg").textContent = ""; }
  if (e.key === chars[pos]) {
    pos++; GM.flash(kb, GM.keyFor(e.key).key, "hit"); render(); mark();
    if (pos === chars.length) finish();
  } else {
    errors++; GM.flash(kb, GM.keyFor(e.key).key, "miss");
    textEl.classList.add("shake"); setTimeout(() => textEl.classList.remove("shake"), 150);
  }
  stats();
});
GM.$("#list").addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) start(+b.dataset.i); });
GM.$("#again").onclick = () => start(cur);
GM.$("#nextT").onclick = () => start(cur + 1);
start(0);
