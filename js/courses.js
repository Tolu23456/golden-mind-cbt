"use strict";
GM.chrome("courses.html");
const D = GM_DATA;
const $ = GM.$;
const p = GM.load();

function courseCard(c) {
  const pr = GM.courseProgress(c, p);
  const units = (c.units || []).map((u) => `<span>${u.title}</span>`).join("");
  const lab = c.lab ? `<a class="btn btn-secondary" href="lab.html">Code Lab</a>` : "";
  return `<article class="card course-card">
    <div class="top">
      <span class="card-icon">${GMI(c.icon)}</span>
      <div>
        <span class="level-pill ${c.kind === "programming" ? "programming" : ""}">${c.kind === "programming" ? "Programming" : "Skills"}</span>
        <h3>${c.title}</h3>
      </div>
    </div>
    <p class="blurb">${c.blurb}</p>
    <div class="course-meta"><span>${GMI("book")} ${pr.total} lessons</span><span>${GMI("clock")} ${c.level}</span></div>
    <div class="mini-meter" role="progressbar" aria-label="${c.title} progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pr.pct}"><span style="width:${pr.pct}%"></span></div>
    <div class="course-meta"><span>${pr.done}/${pr.total} done</span><span>${pr.pct}%</span></div>
    <div class="units-strip">${units}</div>
    <div class="cta"><a class="btn btn-primary" href="course.html?course=${encodeURIComponent(c.id)}">${pr.done ? "Continue" : "Start course"}</a>${lab}</div>
  </article>`;
}

$("#heroStats").innerHTML = [
  ["Courses", D.courses.length],
  ["Lessons", D.lessons.length],
  ["Programming paths", D.courses.filter((c) => c.kind === "programming").length],
  ["Code challenges", D.labChallenges.length]
].map(([label, value]) => `<div class="hero-stat"><b>${value}</b><small>${label}</small></div>`).join("");

$("#programming").innerHTML = D.courses.filter((c) => c.kind === "programming").map(courseCard).join("");
$("#skills").innerHTML = D.courses.filter((c) => c.kind !== "programming").map(courseCard).join("");
$("#challengeChips").innerHTML = D.labChallenges.map((c) => `<span>${GMI(c.icon)} ${c.title}</span>`).join("");
