# Golden Mind CBT

A friendly website where students learn computer skills and practise computer-based tests (CBT).

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
| `index.html` | Enter their name, see progress, jump to topics |
| `learn.html` | Read 8 short lessons (from `lessons/*.md`) |
| `mouse.html` | Mouse Lab: move, click, double-click, right-click, drag and drop, scroll, select text |
| `keyboard.html` | Keyboard Explorer + 10-question shortcut challenge |
| `typing.html` | 12 typing lessons with WPM, accuracy, stars and an on-screen keyboard |
| `quiz.html` | Practice mode (tips) or timed Exam mode (navigator, flags, auto-submit) |

Progress is saved in the browser (localStorage) on each student's device.

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
Register a new file by adding one line in `js/data.js` (`topics`). Run `node scripts/check-questions.js` to validate every file.

## Adding lessons

Add a `.md` file in `lessons/` and one line in `js/data.js` (`lessons`).
Lesson markdown supports headings, **bold**, *italic*, `code`, lists, `> tips`, and `[kbd:Ctrl]` for keyboard keys.

## Folder map

```
index.html learn.html mouse.html keyboard.html typing.html quiz.html
css/styles.css
js/   app.js  data.js  markdown.js  home.js learn.js mouse.js keyboard.js typing.js quiz.js
lessons/*.md      questions/*.md
server.js  package.json  scripts/check-questions.js
```
