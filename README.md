# Golden Mind CBT

A friendly learning site where students build computer confidence, learn to program, practise typing and sit computer-based test (CBT) practice.

**Live site:** https://tolu23456.github.io/golden-mind-cbt/

## Run it

```
node server.js
```

Then open http://localhost:3000. (Needs Node.js 16 or newer. No packages to install.)
Python alternative: `python3 -m http.server 3000`.
Opening `index.html` by double-clicking will NOT work, because the lessons and questions are loaded from markdown files.

## What is inside

| Page | What students do |
|---|---|
| `index.html` | Enter their name, see progress, jump to a course or activity |
| `courses.html` | Browse all courses: Computer Skills, Digital Life, Web, Python and CS |
| `course.html?course=web` | See the units, lessons and checkpoints for one course |
| `learn.html?course=python#meet-python` | Read a lesson. Progress, Back/Next and quizzes stay inside the chosen course |
| `code.html` | Programming hub with Web, Python and CS tracks, XP and levels |
| `lab.html` | Code Lab: write HTML, CSS and JavaScript with a live preview and saved challenge checks |
| `mouse.html` | Mouse Lab: 37 levels covering aiming, clicking, dragging, scrolling, selecting and interface controls |
| `keyboard.html` | Keyboard Explorer + 10-question shortcut challenge |
| `typing.html` | 42 typing lessons with WPM, accuracy, stars and an on-screen keyboard |
| `quiz.html` | Practice mode (tips) or timed Exam mode (navigator, flags, auto-submit) |

Progress is saved in the browser (localStorage) on each student's device. The original computer-skills lessons and numeric typing progress keys still work.

## Courses

| Course | Contents |
|---|---|
| Computer Skills | 11 lessons: parts of a computer, mouse, keyboard, typing, files, word processing, spreadsheets, internet and email, safety, CBT |
| Digital Life | 8 lessons: presentations, images, cloud storage, cyber security, AI, online communication, digital money, study and career |
| Web Foundations | 12 lessons: HTML, CSS, responsive design, JavaScript and a quiz-page project |
| Python Foundations | 10 lessons: variables, input/output, decisions, loops, lists, functions, dictionaries, files, errors and a mini project |
| Computer Science & Logic | 8 lessons: binary, algorithms, pseudocode, debugging, data, networks and problem solving |

Courses are defined in `js/data.js` (`courses`) and point to lesson ids in the flat `lessons` registry. The lesson reader flattens the units so Back and Next stay inside one course.

## Code Lab

The Code Lab runs student code in a sandboxed iframe. Each challenge stores starter HTML, CSS and JavaScript in `js/data.js` (`labChallenges`) together with regex checks. Passing every check marks the challenge done and awards XP. Drafts are saved in localStorage under `goldenMindCBT.labDrafts`.

## Adding questions (markdown)

Edit or add a file in `questions/`:

```
# Topic title

## The question goes here?
- [ ] Wrong answer
- [x] Right answer
- [ ] Wrong answer
- [ ] Wrong answer
> Tip shown after the student answers.
```

Rules: exactly 4 options, exactly one `[x]`. Options are shuffled automatically.
Register a new file by adding one line in `js/data.js` (`topics`). Topics are grouped on the practice-test page by their `group` field.

## Adding lessons

Add a `.md` file in `lessons/` or `courses/<course>/`, then add one line to `js/data.js` (`lessons`) and list its id in a course unit. Lesson markdown supports headings, **bold**, *italic*, `code`, fenced code blocks, lists, `> tips`, and `[kbd:Ctrl]` for keyboard keys.

## Checks

```
npm run check
```

This validates every question file (4 options, one correct answer), every lesson and quiz path, course lesson ids, icons, typing lessons, Code Lab regexes and unused markdown files.

## Hosting

The site is published with GitHub Pages from the `main` branch. The `.nojekyll` file is required: it stops GitHub from processing the lesson and question markdown files, so the browser can fetch them as raw text.

## Folder map

```
index.html courses.html course.html code.html lab.html
learn.html mouse.html keyboard.html typing.html quiz.html
css/styles.css
js/   app.js  icons.js  data.js  markdown.js  home.js
      courses.js course.js code.js lab.js learn.js
      mouse.js keyboard.js typing.js quiz.js
lessons/*.md                Computer Skills and Digital Life lessons
courses/web/*.md            Web Foundations lessons
courses/python/*.md         Python Foundations lessons
courses/cs/*.md             Computer Science & Logic lessons
questions/*.md              Quiz topics
scripts/check-questions.js  Quiz validator
scripts/check-content.js    Registry and content validator
server.js  package.json
```
