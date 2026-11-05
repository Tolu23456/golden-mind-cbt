"use strict";
GM.chrome("learn.html");
const D = GM_DATA;
const params = new URLSearchParams(location.search);
const COURSE = D.courses.find((c) => c.id === params.get("course")) || D.courses.find((c) => c.id === "computer");
const byId = {};
D.lessons.forEach((l) => { byId[l.id] = l; });

/* Flatten the course units into one reading order, keeping unit titles for
   the sidebar. Missing ids are skipped so a typo never breaks the page. */
const UNITS = (COURSE.units || []).map((u) => ({
  title: u.title,
  quiz: u.quiz,
  lessons: (u.lessons || []).map((id) => byId[id]).filter(Boolean)
})).filter((u) => u.lessons.length);
const L = UNITS.reduce((all, u) => all.concat(u.lessons), []);
let idx = Math.max(0, L.findIndex((l) => l.id === location.hash.slice(1)));

function nav() {
  const p = GM.load();
  GM.$("#lessonNav").innerHTML = UNITS.map((u) => {
    const start = L.indexOf(u.lessons[0]);
    const items = u.lessons.map((l) => {
      const i = start + u.lessons.indexOf(l);
      return `<button type="button" data-i="${i}" ${i === idx ? 'aria-current="true"' : ""}>${GMI(l.icon)} ${l.title}${p.lessons[l.id] ? '<span class="tick" aria-label="done">' + GMI("check") + "</span>" : ""}</button>`;
    }).join("");
    return `<span class="nav-group">${u.title}</span>${items}`;
  }).join("");
}
async function show(i) {
  if (!L.length) { GM.$("#lessonBody").innerHTML = "<p>This course has no lessons yet.</p>"; return; }
  idx = Math.max(0, Math.min(i, L.length - 1));
  const l = L[idx];
  history.replaceState(null, "", "?course=" + encodeURIComponent(COURSE.id) + "#" + l.id);
  nav();
  GM.$("#crumbs").innerHTML = `<a href="courses.html">Courses</a> / <a href="course.html?course=${encodeURIComponent(COURSE.id)}">${COURSE.title}</a> / ${l.title}`;
  GM.$("#lessonBody").innerHTML = "Loading lesson…";
  try { GM.$("#lessonBody").innerHTML = GMMD.mdToHtml(await GM.text(l.file)); }
  catch (e) { GM.$("#lessonBody").innerHTML = "<p>Could not load this lesson. Start the site with <code>node server.js</code> (opening the file directly will not work).</p>"; }
  GM.$("#prevBtn").disabled = idx === 0;
  GM.$("#nextBtn").disabled = idx === L.length - 1;
  GM.$("#quizLink").href = "quiz.html?topic=" + l.quiz;
  const done = !!GM.load().lessons[l.id];
  GM.$("#doneBtn").textContent = done ? "Done" : "Mark as done";
  window.scrollTo({ top: 0 });
}
GM.$("#lessonNav").addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) show(+b.dataset.i); });
GM.$("#prevBtn").onclick = () => show(idx - 1);
GM.$("#nextBtn").onclick = () => show(idx + 1);
GM.$("#doneBtn").onclick = () => { GM.update((p) => { p.lessons[L[idx].id] = true; }); GM.$("#doneBtn").textContent = "Done"; nav(); };
show(idx);
