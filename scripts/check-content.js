/* Validate the content registry against the files on disk. Run with:
     node scripts/check-content.js
   Exits non-zero when anything is missing or inconsistent. */
const fs = require("fs");
const path = require("path");
const { parseQuestions } = require("../js/markdown.js");

const root = path.join(__dirname, "..");
const read = (p) => fs.readFileSync(path.join(root, p), "utf8");
const exists = (p) => fs.existsSync(path.join(root, p));
const errors = [];
const notes = [];

global.window = global;
require(path.join(root, "js/data.js"));
const D = global.GM_DATA;

const iconSource = read("js/icons.js");
const iconKeys = new Set();
for (const m of iconSource.matchAll(/^\s{4}([A-Za-z]+):\s*'/gm)) iconKeys.add(m[1]);

function icon(name, where) {
  if (!iconKeys.has(name)) errors.push(`${where}: unknown icon "${name}"`);
}

function unique(list, label) {
  const seen = new Set();
  list.forEach((item) => {
    if (seen.has(item)) errors.push(`Duplicate ${label}: ${item}`);
    seen.add(item);
  });
}

/* ---- topics ---- */
const topicIds = new Set();
const questionFiles = new Set();
D.topics.forEach((t) => {
  topicIds.add(t.id);
  icon(t.icon, `topic ${t.id}`);
  if (!t.group) errors.push(`Topic ${t.id} has no group`);
  if (!exists(t.file)) { errors.push(`Topic ${t.id}: missing ${t.file}`); return; }
  questionFiles.add(t.file);
  const parsed = parseQuestions(read(t.file));
  if (!parsed.questions.length) errors.push(`Topic ${t.id}: no questions in ${t.file}`);
  if (!parsed.title) errors.push(`Topic ${t.id}: missing # title in ${t.file}`);
  parsed.questions.forEach((q, i) => {
    if (!q.question) errors.push(`${t.file} Q${i + 1}: empty question`);
    if (q.options.length !== 4) errors.push(`${t.file} Q${i + 1}: ${q.options.length} options, expected 4`);
    if (q.correctIndex < 0) errors.push(`${t.file} Q${i + 1}: no [x] answer`);
    const block = read(t.file).split(/^##\s+/m)[i + 1] || "";
    const marked = (block.match(/\[x\]/gi) || []).length;
    if (marked !== 1) errors.push(`${t.file} Q${i + 1}: ${marked} [x] answers, expected 1`);
  });
});
unique(D.topics.map((t) => t.id), "topic id");

/* ---- lessons ---- */
const lessonIds = new Set();
const lessonFiles = new Set();
D.lessons.forEach((l) => {
  lessonIds.add(l.id);
  icon(l.icon, `lesson ${l.id}`);
  if (!l.title) errors.push(`Lesson ${l.id} has no title`);
  if (!l.course) errors.push(`Lesson ${l.id} has no course`);
  if (!l.quiz) errors.push(`Lesson ${l.id} has no quiz`);
  else if (!topicIds.has(l.quiz)) errors.push(`Lesson ${l.id}: quiz "${l.quiz}" is not a topic`);
  if (!exists(l.file)) { errors.push(`Lesson ${l.id}: missing ${l.file}`); return; }
  lessonFiles.add(l.file);
  const md = read(l.file).trim();
  if (!/^#\s+\S/.test(md)) errors.push(`Lesson ${l.id}: ${l.file} must start with a # heading`);
  if (md.length < 200) errors.push(`Lesson ${l.id}: ${l.file} looks too short`);
});
unique(D.lessons.map((l) => l.id), "lesson id");
unique(D.lessons.map((l) => l.file), "lesson file");

/* ---- courses ---- */
unique(D.courses.map((c) => c.id), "course id");
const courseIds = new Set(D.courses.map((c) => c.id));
const referenced = new Set();
D.courses.forEach((c) => {
  icon(c.icon, `course ${c.id}`);
  if (!c.title || !c.blurb) errors.push(`Course ${c.id}: missing title or blurb`);
  if (!Array.isArray(c.units) || !c.units.length) { errors.push(`Course ${c.id}: no units`); return; }
  if (c.quiz && !topicIds.has(c.quiz)) errors.push(`Course ${c.id}: quiz "${c.quiz}" is not a topic`);
  c.units.forEach((u, ui) => {
    if (!u.title) errors.push(`Course ${c.id} unit ${ui + 1}: no title`);
    if (u.quiz && !topicIds.has(u.quiz)) errors.push(`Course ${c.id} unit "${u.title}": quiz "${u.quiz}" is not a topic`);
    if (!Array.isArray(u.lessons) || !u.lessons.length) errors.push(`Course ${c.id} unit "${u.title}": no lessons`);
    (u.lessons || []).forEach((id) => {
      if (!lessonIds.has(id)) errors.push(`Course ${c.id} unit "${u.title}": unknown lesson "${id}"`);
      else referenced.add(id);
    });
  });
});
D.lessons.forEach((l) => {
  if (!referenced.has(l.id)) errors.push(`Lesson ${l.id} is not used by any course`);
  if (!courseIds.has(l.course)) errors.push(`Lesson ${l.id}: unknown course "${l.course}"`);
});
D.courses.forEach((c) => {
  const ids = [];
  (c.units || []).forEach((u) => (u.lessons || []).forEach((id) => ids.push(id)));
  unique(ids, `lesson in course ${c.id}`);
});

/* ---- typing ---- */
if (!Array.isArray(D.typingLessons) || D.typingLessons.length < 12) errors.push("typingLessons must keep at least the original 12 lessons");
D.typingLessons.forEach((t, i) => {
  if (!t.group || !t.title || !t.help || !t.text) errors.push(`Typing lesson ${i + 1}: missing group, title, help or text`);
  if (typeof t.text === "string" && t.text.length < 8) errors.push(`Typing lesson ${i + 1}: text too short`);
});

/* ---- code lab ---- */
unique(D.labChallenges.map((c) => c.id), "lab challenge id");
D.labChallenges.forEach((c) => {
  icon(c.icon, `lab challenge ${c.id}`);
  if (!c.title || !c.blurb || !c.level) errors.push(`Lab challenge ${c.id}: missing title, blurb or level`);
  ["html", "css", "js"].forEach((key) => {
    if (typeof c[key] !== "string") errors.push(`Lab challenge ${c.id}: missing ${key} starter code`);
  });
  if (!Array.isArray(c.tests) || !c.tests.length) { errors.push(`Lab challenge ${c.id}: no tests`); return; }
  c.tests.forEach((t, i) => {
    if (!["html", "css", "js"].includes(t.tab)) errors.push(`Lab ${c.id} test ${i + 1}: bad tab "${t.tab}"`);
    if (!t.label) errors.push(`Lab ${c.id} test ${i + 1}: no label`);
    try { new RegExp(t.re, "i"); }
    catch (e) { errors.push(`Lab ${c.id} test ${i + 1}: invalid regex (${e.message})`); }
  });
});

/* ---- orphans on disk ---- */
const diskLessons = fs.readdirSync(path.join(root, "lessons")).filter((f) => f.endsWith(".md")).map((f) => "lessons/" + f);
diskLessons.forEach((f) => { if (!lessonFiles.has(f)) errors.push(`Unused lesson file: ${f}`); });
const courseDir = path.join(root, "courses");
if (fs.existsSync(courseDir)) {
  fs.readdirSync(courseDir).forEach((dir) => {
    const full = path.join(courseDir, dir);
    if (!fs.statSync(full).isDirectory()) return;
    fs.readdirSync(full).filter((f) => f.endsWith(".md")).forEach((f) => {
      const rel = `courses/${dir}/${f}`;
      if (!lessonFiles.has(rel)) errors.push(`Unused lesson file: ${rel}`);
    });
    if (!courseIds.has(dir)) errors.push(`Course folder has no course entry: courses/${dir}`);
  });
}
const diskQuestions = fs.readdirSync(path.join(root, "questions")).filter((f) => f.endsWith(".md")).map((f) => "questions/" + f);
diskQuestions.forEach((f) => { if (!questionFiles.has(f)) errors.push(`Unused question file: ${f}`); });

notes.push(`${D.topics.length} topics`);
notes.push(`${D.courses.length} courses`);
notes.push(`${D.lessons.length} lessons`);
notes.push(`${D.typingLessons.length} typing lessons`);
notes.push(`${D.labChallenges.length} lab challenges`);
notes.push(`${diskQuestions.length} question files`);

if (errors.length) {
  console.log("Content check FAILED\n");
  errors.forEach((e) => console.log("  - " + e));
  process.exit(1);
}
console.log("Content check passed: " + notes.join(", ") + ".");
