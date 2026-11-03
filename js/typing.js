"use strict";
GM.chrome("typing.html");
const LESSONS = [
  ["Home row: left", "Index and middle fingers rest on F and D.", "asdf asdf fads sad fad dad add fas sass ads dads fads"],
  ["Home row: right", "Right hand rests on J K L ;", "jkl; jkl; lad ask salad flask all fall lakes jaffa"],
  ["Home row: both hands", "Use both hands together.", "a sad lad asks dad; dad has a flask; all fall as lads ask"],
  ["Top row: E R U I", "Reach up, then come straight back to the home row.", "ride fire sure tire fuse rule rise sure ride true user"],
  ["Top row: Q W T Y O P", "The top row has the most letters.", "water power quiet write pretty today toward wrote tower"],
  ["Bottom row", "Reach down with Z X C V B N M.", "zebra box cave vine bank name mix cabin move zoom nine"],
  ["Common words", "The words you will type most often.", "the and for you are with this that have from they will"],
  ["Capital letters", "Hold Shift with the opposite hand.", "Lagos Abuja Kano Ibadan Enugu Port Harcourt Nigeria Africa"],
  ["Numbers", "Use the number row. Keep your eyes on the screen.", "10 20 30 45 67 89 100 250 1960 2024 2030 12345 67890"],
  ["Punctuation", "Full stops, commas and question marks.", "Yes, I can. Can you? We read, we write, we learn. Well done!"],
  ["Computer words", "Words you will meet in every computer class.", "mouse keyboard screen folder file save print click type cursor"],
  ["Short story", "Put it all together.", "My name is Ada. I go to school in Lagos. Today I learned to type. It was fun, and I want to get faster."]
];
const textEl = GM.$("#text"), kb = GM.$("#kb");
GM.buildKeyboard(kb);
let cur = 0, chars = [], pos = 0, errors = 0, startAt = 0, timer = 0, finished = false;

function drawList() {
  const p = GM.load();
  GM.$("#list").innerHTML = LESSONS.map((l, i) => {
    const t = p.typing[i];
    return `<button type="button" data-i="${i}" ${i === cur ? 'aria-current="true"' : ""}>${i + 1}. ${l[0]}<span class="stars" aria-label="${t ? t.stars : 0} stars">${GM.stars(t ? t.stars : 0)}</span></button>`;
  }).join("");
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
  chars = [...LESSONS[i][2]]; pos = 0; errors = 0; startAt = 0; finished = false;
  GM.$("#tTitle").textContent = `${i + 1}. ${LESSONS[i][0]}`;
  GM.$("#tHelp").textContent = LESSONS[i][1];
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
