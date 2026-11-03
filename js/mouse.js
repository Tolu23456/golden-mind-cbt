"use strict";
GM.chrome("mouse.html");
const arena = GM.$("#arena"), msg = GM.$("#msg"), bar = GM.$("#bar"), nextBtn = GM.$("#nextLv");
let level = 0, token = 0;

/* A level: { id, title, help, run(ctx) }. ctx.progress(done,total) updates the bar, ctx.finish() ends the level. */
function targetLevel(evt, count, emoji) {
  return (ctx) => {
    let n = 0;
    const spawn = () => {
      const b = document.createElement("button");
      b.className = "target"; b.type = "button"; b.textContent = emoji;
      b.setAttribute("aria-label", "Target");
      b.style.left = GM.rand(8, arena.clientWidth - 80) + "px";
      b.style.top = GM.rand(8, arena.clientHeight - 80) + "px";
      b.addEventListener(evt, (e) => {
        e.preventDefault();
        if (b.classList.contains("go")) return;
        b.classList.add("go");
        setTimeout(() => b.remove(), 220);
        n++; ctx.progress(n, count);
        if (n >= count) ctx.finish(); else spawn();
      });
      arena.append(b);
    };
    spawn();
  };
}

function dragLevel(ctx) {
  const items = [["red", "#ffb3a7", "🍎"], ["blue", "#b6d4ff", "🐟"], ["green", "#bdeccd", "🍃"]];
  arena.innerHTML = `<div class="drag-zone"><div style="display:flex;flex-direction:column;gap:1rem" id="src"></div><div style="display:flex;gap:1rem" id="dst"></div></div>`;
  const src = GM.$("#src"), dst = GM.$("#dst");
  GM.shuffle(items).forEach(([c, bg, em]) => {
    const el = document.createElement("div");
    el.className = "chip-drag"; el.style.background = bg; el.textContent = em; el.dataset.c = c;
    el.setAttribute("aria-label", c + " item");
    src.append(el);
  });
  GM.shuffle(items).forEach(([c, bg]) => {
    const d = document.createElement("div");
    d.className = "drop"; d.dataset.c = c; d.style.borderColor = bg.replace("b", "8"); d.textContent = "Drop " + c;
    dst.append(d);
  });
  let done = 0;
  GM.$$(".chip-drag").forEach((el) => {
    let sx = 0, sy = 0, active = false;
    el.addEventListener("pointerdown", (e) => { el.setPointerCapture(e.pointerId); sx = e.clientX; sy = e.clientY; active = true; el.classList.add("drag"); });
    el.addEventListener("pointermove", (e) => { if (active) el.style.transform = `translate(${e.clientX - sx}px,${e.clientY - sy}px)`; });
    el.addEventListener("pointerup", (e) => {
      if (!active) return;
      active = false; el.classList.remove("drag");
      const box = GM.$$(".drop").find((d) => { const r = d.getBoundingClientRect(); return e.clientX > r.left && e.clientX < r.right && e.clientY > r.top && e.clientY < r.bottom; });
      if (box && box.dataset.c === el.dataset.c && !box.classList.contains("filled")) {
        box.classList.add("filled"); box.textContent = el.textContent; el.remove(); done++;
        ctx.progress(done, 3); if (done === 3) ctx.finish();
      } else { el.style.transform = ""; if (box) ctx.say("Not that one — match the colour word. Try again."); }
    });
  });
}

function scrollLevel(ctx) {
  arena.innerHTML = `<div class="scrollbox" tabindex="0"><div class="tall"><strong>Scroll down ↓ with the mouse wheel or the scroll bar</strong><span style="font-size:3rem">⬇️</span><strong>Keep going…</strong><button class="btn btn-primary" id="gift" type="button">🎁 Click to open</button></div></div>`;
  GM.$("#gift").onclick = () => { ctx.progress(1, 1); ctx.finish(); };
}

function selectLevel(ctx) {
  const tasks = [
    ["Double-click the word <b>keyboard</b> to select it.", "The <mark>keyboard</mark> has many keys.", "keyboard"],
    ["Select the whole line below. Try clicking three times quickly!", "<mark>The mouse pointer follows my hand.</mark>", "The mouse pointer follows my hand."],
    ["Click at the start of <b>Lagos is big</b>, hold the button, drag to the end, then let go.", "Today I visited <mark>Lagos is big</mark> in my story.", "Lagos is big"]
  ];
  let t = 0;
  const show = () => {
    const [ins, html] = tasks[t];
    arena.innerHTML = `<div class="select-box"><p><span class="hint-chip">${ins}</span></p><p id="sel" style="font-size:1.6rem;margin-top:2rem">${html}</p></div>`;
    GM.$("#sel").addEventListener("mouseup", () => setTimeout(() => {
      const s = String(getSelection()).trim();
      if (s === tasks[t][2]) {
        getSelection().removeAllRanges(); t++; ctx.progress(t, tasks.length);
        if (t === tasks.length) ctx.finish(); else show();
      } else if (s) ctx.say("Almost — select exactly the highlighted words.");
    }, 0));
  };
  show();
}

const LEVELS = [
  { id: "move", title: "1. Move the cursor", help: "Slide the mouse pointer over each gold circle. You don't need to click!", run: targetLevel("mouseenter", 6, "👆") },
  { id: "click", title: "2. Click", help: "Press the left mouse button once on each circle.", run: targetLevel("click", 8, "🖱️") },
  { id: "dblclick", title: "3. Double-click", help: "Click twice very fast on each circle. Double-click opens files and folders.", run: targetLevel("dblclick", 5, "✌️") },
  { id: "rightclick", title: "4. Right-click", help: "Press the RIGHT mouse button on each circle. Right-click opens a menu of options.", run: targetLevel("contextmenu", 5, "📋") },
  { id: "drag", title: "5. Drag and drop", help: "Hold the left button on an item, move it to the matching box, then let go.", run: dragLevel },
  { id: "scroll", title: "6. Scroll", help: "Move the mouse over the box and roll the wheel to read further down. Find the gift!", run: scrollLevel },
  { id: "select", title: "7. Select text", help: "Selecting text is how you copy, bold or delete words.", run: selectLevel }
];

function drawNav() {
  const p = GM.load();
  GM.$("#levels").innerHTML = LEVELS.map((l, i) =>
    `<button type="button" data-i="${i}" ${i === level ? 'aria-current="true"' : ""}>${l.title}${p.mouse[l.id] ? '<span class="tick">✔</span>' : ""}</button>`).join("");
}
function start(i) {
  level = i; token++;
  const my = token, L = LEVELS[i];
  arena.innerHTML = ""; msg.textContent = ""; bar.style.width = "0"; nextBtn.hidden = true;
  GM.$("#lvTitle").textContent = L.title; GM.$("#lvHelp").textContent = L.help;
  drawNav();
  L.run({
    progress: (a, b) => { if (my === token) bar.style.width = Math.round((a / b) * 100) + "%"; },
    say: (t) => { if (my === token) msg.textContent = t; },
    finish: () => {
      if (my !== token) return;
      GM.update((p) => { p.mouse[L.id] = true; });
      msg.textContent = "🎉 Level complete! Great mouse control.";
      drawNav();
      if (i < LEVELS.length - 1) nextBtn.hidden = false; else msg.textContent += " You finished the Mouse Lab!";
    }
  });
}
GM.$("#levels").addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) start(+b.dataset.i); });
GM.$("#restart").onclick = () => start(level);
nextBtn.onclick = () => start(level + 1);
start(0);
