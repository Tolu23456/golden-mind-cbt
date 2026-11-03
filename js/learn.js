"use strict";
GM.chrome("learn.html");
const L = GM_DATA.lessons;
let idx = Math.max(0, L.findIndex((l) => l.id === location.hash.slice(1)));

function nav() {
  const p = GM.load();
  GM.$("#lessonNav").innerHTML = L.map((l, i) =>
    `<button type="button" data-i="${i}" ${i === idx ? 'aria-current="true"' : ""}>${l.emoji} ${l.title}${p.lessons[l.id] ? '<span class="tick" aria-label="done">✔</span>' : ""}</button>`).join("");
}
async function show(i) {
  idx = i;
  const l = L[i];
  history.replaceState(null, "", "#" + l.id);
  nav();
  GM.$("#lessonBody").innerHTML = "Loading lesson…";
  try { GM.$("#lessonBody").innerHTML = GMMD.mdToHtml(await GM.text(l.file)); }
  catch (e) { GM.$("#lessonBody").innerHTML = "<p>Could not load this lesson. Start the site with <code>node server.js</code> (opening the file directly will not work).</p>"; }
  GM.$("#prevBtn").disabled = i === 0;
  GM.$("#nextBtn").disabled = i === L.length - 1;
  GM.$("#quizLink").href = "quiz.html?topic=" + l.quiz;
  const done = !!GM.load().lessons[l.id];
  GM.$("#doneBtn").textContent = done ? "Done ✔" : "Mark as done";
  window.scrollTo({ top: 0 });
}
GM.$("#lessonNav").addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) show(+b.dataset.i); });
GM.$("#prevBtn").onclick = () => show(idx - 1);
GM.$("#nextBtn").onclick = () => show(idx + 1);
GM.$("#doneBtn").onclick = () => { GM.update((p) => { p.lessons[L[idx].id] = true; }); GM.$("#doneBtn").textContent = "Done ✔"; nav(); };
show(idx);
