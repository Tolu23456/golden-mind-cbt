"use strict";
GM.chrome("course.html");
const D = GM_DATA;
const $ = GM.$;
const params = new URLSearchParams(location.search);
const C = D.courses.find((c) => c.id === params.get("course")) || D.courses[0];
const p = GM.load();
const byId = {};
D.lessons.forEach((l) => { byId[l.id] = l; });

const ids = GM.lessonsOf(C);
const pr = GM.courseProgress(C, p);
const firstUndone = ids.find((id) => !p.lessons[id]) || ids[0];
const reader = (id) => `learn.html?course=${encodeURIComponent(C.id)}#${id}`;

document.title = C.title + " — Golden Mind CBT";
$("#crumbs").innerHTML = `<a href="courses.html">Courses</a> / ${C.title}`;
$("#courseHero").innerHTML = `<section class="course-hero">
  <div class="big-icon">${GMI(C.icon)}</div>
  <div>
    <span class="level-pill ${C.kind === "programming" ? "programming" : ""}">${C.kind === "programming" ? "Programming path" : "Digital skills"} · ${C.level}</span>
    <h1>${C.title}</h1>
    <p>${C.blurb}</p>
    <div class="course-meta">
      <span>${GMI("book")} ${ids.length} lessons</span>
      <span>${GMI("route")} ${(C.units || []).length} units</span>
      <span>${GMI("check")} ${pr.done}/${ids.length} done</span>
    </div>
    <div class="mini-meter" style="margin-top:.7rem" role="progressbar" aria-label="Course progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pr.pct}"><span style="width:${pr.pct}%"></span></div>
    <div class="course-actions">
      <a class="btn btn-primary" href="${firstUndone ? reader(firstUndone) : "#"}">${pr.done ? "Continue learning" : "Start first lesson"}</a>
      ${C.quiz ? `<a class="btn btn-secondary" href="quiz.html?topic=${C.quiz}">Course checkpoint</a>` : ""}
    </div>
  </div>
</section>`;

$("#units").innerHTML = (C.units || []).map((u, ui) => {
  const lessons = (u.lessons || []).map((id) => byId[id]).filter(Boolean);
  const done = lessons.filter((l) => p.lessons[l.id]).length;
  const allDone = lessons.length && done === lessons.length;
  const rows = lessons.map((l, i) => `
    <a class="lesson-row ${p.lessons[l.id] ? "done" : ""}" href="${reader(l.id)}">
      <span class="lesson-index">${p.lessons[l.id] ? GMI("check") : i + 1}</span>
      <span class="lesson-title">${l.title}</span>
      <span class="lesson-meta">${GMI("clock")} ${l.minutes || 6} min${p.lessons[l.id] ? '<span class="tick">' + GMI("check") + "</span>" : ""}</span>
    </a>`).join("");
  const quiz = u.quiz ? `<a class="btn btn-secondary" href="quiz.html?topic=${u.quiz}">${allDone ? "Unit checkpoint" : "Practise this unit"}</a>` : "";
  return `<article class="unit-card">
    <div class="unit-head">
      <div><small class="unit-count">Unit ${ui + 1}</small><h2>${u.title}</h2></div>
      <span class="level-pill ${allDone ? "done" : ""}">${done}/${lessons.length} done</span>
    </div>
    ${rows}
    <div class="course-actions">${quiz}</div>
  </article>`;
}).join("");

if (C.lab) {
  $("#labCta").innerHTML = `<div class="lab-banner">
    <div>
      <h2>Practise in the Code Lab</h2>
      <p>Write real HTML, CSS and JavaScript. The preview updates as you type, and each challenge has a checklist.</p>
      <a class="btn btn-primary" href="lab.html">${GMI("terminal")} Open Code Lab</a>
    </div>
    <div class="challenge-chips">${D.labChallenges.slice(0, 6).map((c) => `<span>${c.title}</span>`).join("")}</div>
  </div>`;
}
