"use strict";
GM.chrome("code.html");
const D = GM_DATA;
const $ = GM.$;
const p = GM.load();
const score = GM.xp(p);
const level = GM.levelOf(score);

const paths = D.courses.filter((c) => c.kind === "programming");
const trackLessons = paths.reduce((n, c) => n + GM.lessonsOf(c).length, 0);

$("#heroStats").innerHTML = [
  ["Your level", level],
  ["XP", score],
  ["Tracks", paths.length],
  ["Lessons", trackLessons]
].map(([label, value]) => `<div class="hero-stat"><b>${value}</b><small>${label}</small></div>`).join("");

$("#paths").innerHTML = paths.map((c) => {
  const pr = GM.courseProgress(c, p);
  const firstUndone = GM.lessonsOf(c).find((id) => !p.lessons[id]) || GM.lessonsOf(c)[0];
  const units = (c.units || []).map((u, i) => `<span>${i + 1}. ${u.title}</span>`).join("");
  return `<article class="card path-card ${c.colour || ""}">
    <div class="top"><span class="card-icon">${GMI(c.icon)}</span><div><span class="level-pill ${c.colour === "gold" ? "programming" : ""}">${c.level}</span><h3>${c.title}</h3></div></div>
    <p>${c.blurb}</p>
    <div class="units-strip">${units}</div>
    <div class="path-progress" role="progressbar" aria-label="${c.title} progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pr.pct}"><span style="width:${pr.pct}%"></span></div>
    <div class="course-meta"><span>${GMI("book")} ${pr.total} lessons</span><span>${pr.done} done · ${pr.pct}%</span></div>
    <div class="cta">
      <a class="btn btn-primary" href="course.html?course=${encodeURIComponent(c.id)}">${pr.done ? "Continue" : "Start path"}</a>
      <a class="btn btn-secondary" href="learn.html?course=${encodeURIComponent(c.id)}${firstUndone ? "#" + firstUndone : ""}">Read a lesson</a>
      ${c.lab ? `<a class="btn btn-secondary" href="lab.html">Code Lab</a>` : ""}
    </div>
  </article>`;
}).join("");

$("#challengeChips").innerHTML = D.labChallenges.map((c) => `<span>${GMI(c.icon)} ${c.title}</span>`).join("");
