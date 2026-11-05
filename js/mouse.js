"use strict";
GM.chrome("mouse.html");
const arena = GM.$("#arena"), msg = GM.$("#msg"), bar = GM.$("#bar"), nextBtn = GM.$("#nextLv");
let level = 0, token = 0;

const svg = (name) => (window.GMI ? GMI(name) : "");
const over = (el, e) => {
  const r = el.getBoundingClientRect();
  return e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
};
const place = (el, size) => {
  const maxX = Math.max(8, arena.clientWidth - size - 8);
  const maxY = Math.max(8, arena.clientHeight - size - 8);
  el.style.left = GM.rand(8, maxX) + "px";
  el.style.top = GM.rand(8, maxY) + "px";
};
const up = (s) => s.charAt(0).toUpperCase() + s.slice(1);

/* ---------- pointer drag helper ---------- */
function pointerDrag(el, onDrop) {
  let sx = 0, sy = 0, active = false;
  el.addEventListener("pointerdown", (e) => {
    if (active) return;
    active = true;
    try { el.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
    sx = e.clientX; sy = e.clientY;
    el.classList.add("drag");
  });
  el.addEventListener("pointermove", (e) => {
    if (!active) return;
    el.style.transform = `translate(${e.clientX - sx}px,${e.clientY - sy}px)`;
  });
  const end = (e, cancelled) => {
    if (!active) return;
    active = false;
    el.classList.remove("drag");
    if (cancelled) { el.style.transform = ""; return; }
    onDrop(e);
  };
  el.addEventListener("pointerup", (e) => end(e, false));
  el.addEventListener("pointercancel", (e) => end(e, true));
}

/* ---------- aim: click / move / double-click / right-click ---------- */
function targetLevel(evt, count, iconName, opts) {
  opts = opts || {};
  const size = opts.size || 72;
  return (ctx) => {
    let n = 0;
    const spawn = () => {
      if (!arena.isConnected) return;
      const b = document.createElement("button");
      b.type = "button";
      b.className = "target";
      b.style.width = size + "px";
      b.style.height = size + "px";
      b.innerHTML = svg(iconName);
      b.setAttribute("aria-label", "Target");
      place(b, size);
      b.addEventListener(evt, (e) => {
        e.preventDefault();
        if (b.classList.contains("go")) return;
        b.classList.add("go");
        b.disabled = true;
        setTimeout(() => b.remove(), 220);
        n++;
        ctx.progress(n, count);
        if (n >= count) ctx.finish(); else spawn();
      });
      arena.append(b);
    };
    spawn();
  };
}

/* ---------- find one icon among decoys ---------- */
function findLevel(opts) {
  const target = opts.target, label = opts.label, decoys = opts.decoys, count = opts.count;
  const names = window.GMI_NAMES || {};
  return (ctx) => {
    let n = 0;
    arena.innerHTML = `<div class="find-board" id="board"></div>`;
    const board = GM.$("#board", arena);
    const make = () => {
      if (!arena.isConnected) return;
      board.innerHTML = "";
      let hits = 0;
      const slots = GM.shuffle([target, target, ...GM.shuffle(decoys).slice(0, 4)]);
      slots.forEach((name) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "find-item";
        b.innerHTML = svg(name);
        b.setAttribute("aria-label", names[name] || name);
        b.addEventListener("click", () => {
          if (name === target) {
            if (b.disabled) return;
            b.classList.add("found");
            b.disabled = true;
            n++; hits++;
            ctx.progress(n, count);
            if (n >= count) ctx.finish();
            else if (hits >= 2) setTimeout(make, 260);
          } else {
            ctx.say("That is a " + (names[name] || name) + ". Find the " + label + ".");
          }
        });
        board.append(b);
      });
    };
    make();
  };
}

/* ---------- click the numbers in order ---------- */
function orderLevel(count) {
  return (ctx) => {
    let next = 1;
    arena.innerHTML = `<div class="order-board" id="orderBoard"></div>`;
    const board = GM.$("#orderBoard", arena);
    GM.shuffle(Array.from({ length: count }, (_, k) => k + 1)).forEach((num) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "target";
      b.textContent = String(num);
      b.setAttribute("aria-label", "Number " + num);
      b.addEventListener("click", () => {
        if (b.disabled) return;
        if (num !== next) { ctx.say("Next is " + next + ". Find number " + next + "."); return; }
        b.disabled = true;
        b.classList.add("done");
        next++;
        ctx.progress(next - 1, count);
        if (next > count) ctx.finish();
      });
      board.append(b);
    });
  };
}

/* ---------- hover ---------- */
function hoverLevel(count) {
  return (ctx) => {
    let n = 0;
    const size = 64, cols = 3;
    for (let k = 0; k < count; k++) {
      const b = document.createElement("div");
      b.className = "target hover-target";
      b.style.width = b.style.height = size + "px";
      b.innerHTML = svg("star");
      b.setAttribute("aria-label", "Hidden star");
      b.dataset.ok = "no";
      const cw = arena.clientWidth / cols, ch = arena.clientHeight / Math.ceil(count / cols);
      const col = k % cols, row = Math.floor(k / cols);
      b.style.left = col * cw + (cw - size) / 2 + "px";
      b.style.top = row * ch + (ch - size) / 2 + "px";
      b.addEventListener("mouseenter", () => {
        if (b.dataset.ok === "yes") return;
        b.dataset.ok = "yes";
        b.classList.add("show");
        n++;
        ctx.progress(n, count);
        if (n >= count) ctx.finish();
      });
      arena.append(b);
    }
  };
}

/* ---------- click and hold ---------- */
function holdLevel(ctx) {
  arena.innerHTML = `<div class="hold-wrap">
    <button class="hold-btn" id="holdBtn" type="button">${svg("mouse")}<span>Hold me</span><span class="hold-bar" id="holdBar"></span></button>
    <p class="hint-chip">Keep the left button down until the green bar is full.</p>
  </div>`;
  const b = GM.$("#holdBtn", arena), fill = GM.$("#holdBar", arena);
  let raf = 0, t0 = 0;
  const stop = () => { if (raf) cancelAnimationFrame(raf); raf = 0; fill.style.width = "0"; };
  b.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    if (raf) return;
    t0 = performance.now();
    const step = (now) => {
      if (!arena.contains(b)) return;
      const p = Math.min(1, (now - t0) / 1500);
      fill.style.width = Math.round(p * 100) + "%";
      ctx.progress(p, 1);
      if (p >= 1) { stop(); ctx.finish(); }
      else raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
  });
  b.addEventListener("pointerup", stop);
  b.addEventListener("pointerleave", stop);
  b.addEventListener("pointercancel", stop);
}

/* ---------- drag items into matching boxes ---------- */
function dragSortLevel(groups, items) {
  return (ctx) => {
    arena.innerHTML = `<div class="drag-zone sort-zone">
      <div class="src-col" id="src"><p class="chip-label">Drag each item to its box</p></div>
      <div class="dst-row" id="dst"></div>
    </div>`;
    const src = GM.$("#src", arena), dst = GM.$("#dst", arena);
    groups.forEach((g) => {
      const d = document.createElement("div");
      d.className = "drop";
      d.dataset.g = g.id;
      d.dataset.label = g.label;
      d.innerHTML = `<span>${svg(g.icon)}</span><small>${g.label}</small>`;
      if (g.colour) d.style.borderColor = g.colour;
      dst.append(d);
    });
    let done = 0;
    GM.shuffle(items).forEach((item) => {
      const el = document.createElement("div");
      el.className = "chip-drag";
      el.dataset.g = item.group;
      el.innerHTML = svg(item.icon);
      el.setAttribute("aria-label", item.label || item.group);
      if (item.colour) el.style.background = item.colour;
      else el.style.background = "#ffe9b8";
      src.append(el);
      pointerDrag(el, (e) => {
        const box = GM.$$(".drop", arena).find((d) => over(d, e));
        if (box && box.dataset.g === item.group) {
          const n = (+box.dataset.count || 0) + 1;
          box.dataset.count = String(n);
          box.classList.add("filled");
          box.innerHTML = `<span>${svg("check")}</span><small>${box.dataset.label}${n > 1 ? " ×" + n : ""}</small>`;
          el.remove();
          done++;
          ctx.progress(done, items.length);
          if (done >= items.length) ctx.finish();
        } else {
          el.style.transform = "";
          ctx.say(box ? "Not that box. Match the item to the right group." : "Let go inside one of the boxes.");
        }
      });
    });
  };
}

/* ---------- drag one item into a goal ---------- */
function dragGoalLevel(opts) {
  opts = opts || {};
  const size = opts.size || 58, goalSize = opts.goalSize || 112;
  return (ctx) => {
    arena.innerHTML = `<div class="goal-wrap">
      <div class="goal-item" id="gItem">${svg(opts.icon || "file")}</div>
      <div class="goal-zone" id="gZone">${svg(opts.goalIcon || "folder")}</div>
      <p class="chip-label goal-note">Drag the item into the target</p>
    </div>`;
    const item = GM.$("#gItem", arena), zone = GM.$("#gZone", arena);
    item.style.width = item.style.height = size + "px";
    item.style.marginTop = -(size / 2) + "px";
    zone.style.width = zone.style.height = goalSize + "px";
    pointerDrag(item, (e) => {
      if (over(zone, e)) {
        zone.classList.add("filled");
        zone.innerHTML = svg("check");
        item.remove();
        ctx.progress(1, 1);
        ctx.finish();
      } else {
        item.style.transform = "";
        ctx.say("Keep dragging until the item is inside the target.");
      }
    });
  };
}

/* ---------- resize by dragging a corner ---------- */
function resizeLevel(ctx) {
  arena.innerHTML = `<div class="resize-stage">
    <div class="resize-box" id="rBox">Make this window bigger.<span class="resize-handle" id="rHandle" aria-label="Resize handle"></span></div>
    <p class="hint-chip">Drag the gold corner until the window is at least 240 wide and 170 tall.</p>
  </div>`;
  const box = GM.$("#rBox", arena), handle = GM.$("#rHandle", arena);
  let sx = 0, sy = 0, w0 = 0, h0 = 0, active = false;
  handle.addEventListener("pointerdown", (e) => {
    active = true;
    try { handle.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
    sx = e.clientX; sy = e.clientY;
    w0 = box.offsetWidth; h0 = box.offsetHeight;
  });
  handle.addEventListener("pointermove", (e) => {
    if (!active) return;
    const w = Math.min(520, Math.max(120, w0 + e.clientX - sx));
    const h = Math.min(300, Math.max(100, h0 + e.clientY - sy));
    box.style.width = w + "px";
    box.style.height = h + "px";
  });
  handle.addEventListener("pointerup", () => {
    if (!active) return;
    active = false;
    if (box.offsetWidth >= 240 && box.offsetHeight >= 170) { ctx.progress(1, 1); ctx.finish(); }
    else ctx.say("Almost — keep dragging the corner further. Need 240 wide and 170 tall.");
  });
}

/* ---------- scrolling: wheel or scrollbar ---------- */
function scrollLevel(opts) {
  opts = opts || {};
  const height = opts.height || 1100;
  const gift = opts.gift === false ? "" : `<button class="btn btn-primary" id="gift" type="button">${svg("gift")} Click to open</button>`;
  return (ctx) => {
    arena.innerHTML = `<div class="scrollbox"><div class="tall" style="height:${height}px">
      <strong>Scroll down with the mouse wheel or the scroll bar</strong>
      <span class="scroll-arrow">${svg("arrowDown")}</span>
      <strong>Keep going…</strong>
      ${gift}
    </div></div>`;
    const b = GM.$("#gift", arena);
    if (b) b.addEventListener("click", () => { ctx.progress(1, 1); ctx.finish(); });
  };
}

function scrollbarLevel(ctx) {
  arena.innerHTML = `<div class="scrollwrap">
    <div class="scrollbox" id="sb"><div class="tall" style="height:1900px">
      <strong>Drag the grey scrollbar thumb on the right</strong>
      <span class="scroll-arrow">${svg("arrowDown")}</span>
      <strong>Keep going…</strong>
      <button class="btn btn-primary" id="gift" type="button">${svg("gift")} I reached the bottom</button>
    </div></div>
    <div class="scrollbar" id="track"><span class="thumb" id="thumb"></span></div>
  </div>`;
  const sb = GM.$("#sb", arena), track = GM.$("#track", arena), thumb = GM.$("#thumb", arena);
  const max = () => sb.scrollHeight - sb.clientHeight;
  const trackH = track.clientHeight;
  const thumbH = Math.max(34, Math.round(trackH * sb.clientHeight / sb.scrollHeight));
  thumb.style.height = thumbH + "px";
  const sync = () => {
    const room = Math.max(1, trackH - thumbH);
    thumb.style.top = Math.round((sb.scrollTop / Math.max(1, max())) * room) + "px";
  };
  const move = (clientY) => {
    const r = track.getBoundingClientRect();
    const room = Math.max(1, trackH - thumbH);
    const y = Math.min(Math.max(clientY - r.top - thumbH / 2, 0), room);
    thumb.style.top = y + "px";
    sb.scrollTop = (y / room) * max();
  };
  thumb.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    try { thumb.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
    move(e.clientY);
  });
  thumb.addEventListener("pointermove", (e) => { if (thumb.hasPointerCapture && thumb.hasPointerCapture(e.pointerId)) move(e.clientY); });
  sb.addEventListener("scroll", sync);
  GM.$("#gift", arena).addEventListener("click", () => { ctx.progress(1, 1); ctx.finish(); });
  sync();
}

/* ---------- selecting text ---------- */
function selectLevel(tasks) {
  return (ctx) => {
    let t = 0;
    const show = () => {
      if (!arena.isConnected) return;
      const [ins, html, want] = tasks[t];
      arena.innerHTML = `<div class="select-box"><p><span class="hint-chip">${ins}</span></p><p id="sel" class="select-text">${html}</p></div>`;
      GM.$("#sel", arena).addEventListener("mouseup", () => setTimeout(() => {
        if (!arena.isConnected) return;
        const s = String(getSelection()).trim();
        if (s === want) {
          getSelection().removeAllRanges();
          t++;
          ctx.progress(t, tasks.length);
          if (t >= tasks.length) ctx.finish(); else show();
        } else if (s) {
          ctx.say("Almost — select exactly the highlighted words.");
        }
      }, 0));
    };
    show();
  };
}

function selectWordLevel(ctx) {
  const words = ["keyboard", "mouse", "folder", "screen", "printer", "window"];
  arena.innerHTML = `<div class="select-box"><p><span class="hint-chip">Double-click each word to select it.</span></p><p id="words" class="word-paragraph"></p></div>`;
  const box = GM.$("#words", arena);
  let n = 0;
  GM.shuffle(words).forEach((w) => {
    const span = document.createElement("span");
    span.className = "sel-word";
    span.textContent = w + " ";
    span.addEventListener("dblclick", () => {
      if (span.classList.contains("done")) return;
      span.classList.add("done");
      n++;
      ctx.progress(n, words.length);
      if (n >= words.length) ctx.finish();
    });
    box.append(span);
  });
}

function copyPasteLevel(ctx) {
  arena.innerHTML = `<div class="select-box">
    <p><span class="hint-chip">1. Select the sentence. 2. Click Copy. 3. Click Paste.</span></p>
    <p id="srcLine" class="select-text">The quick brown fox jumps over the lazy dog.</p>
    <div class="tool-row">
      <button class="btn btn-secondary" id="copyBtn" type="button" disabled>${svg("copy")} Copy</button>
      <button class="btn btn-secondary" id="pasteBtn" type="button" disabled>${svg("paste")} Paste</button>
    </div>
    <div class="paste-box" id="pasteBox">Paste here</div>
  </div>`;
  const copy = GM.$("#copyBtn", arena), paste = GM.$("#pasteBtn", arena), out = GM.$("#pasteBox", arena);
  let selected = "";
  GM.$("#srcLine", arena).addEventListener("mouseup", () => setTimeout(() => {
    if (!arena.isConnected) return;
    selected = String(getSelection()).trim();
    if (selected === "The quick brown fox jumps over the lazy dog.") copy.disabled = false;
    else if (selected) ctx.say("Select the whole sentence, then click Copy.");
  }, 0));
  copy.addEventListener("click", () => {
    if (!selected) return;
    copy.disabled = true;
    paste.disabled = false;
    ctx.say("Copied. Now click Paste.");
  });
  paste.addEventListener("click", () => {
    if (!selected) return;
    out.textContent = selected;
    out.classList.add("filled");
    ctx.progress(1, 1);
    ctx.finish();
  });
}

/* ---------- interface controls ---------- */
function toolbarLevel(ctx) {
  arena.innerHTML = `<div class="select-box">
    <p><span class="hint-chip">Make the word “keyboard” bold and underlined, then click Save.</span></p>
    <p id="tbLine" class="select-text">The <span id="tbWord">keyboard</span> has many keys.</p>
    <div class="tool-row">
      <button class="btn btn-secondary" id="tbBold" type="button" aria-pressed="false">${svg("bold")} Bold</button>
      <button class="btn btn-secondary" id="tbUnder" type="button" aria-pressed="false">${svg("underline")} Underline</button>
      <button class="btn btn-primary" id="tbSave" type="button">${svg("check")} Save</button>
    </div>
  </div>`;
  const word = GM.$("#tbWord", arena), bold = GM.$("#tbBold", arena), under = GM.$("#tbUnder", arena);
  let b = false, u = false;
  bold.addEventListener("click", () => { b = !b; word.style.fontWeight = b ? "900" : ""; bold.setAttribute("aria-pressed", String(b)); bold.classList.toggle("on", b); });
  under.addEventListener("click", () => { u = !u; word.style.textDecoration = u ? "underline" : ""; under.setAttribute("aria-pressed", String(u)); under.classList.toggle("on", u); });
  GM.$("#tbSave", arena).addEventListener("click", () => {
    if (b && u) { ctx.progress(1, 1); ctx.finish(); }
    else ctx.say("The word still needs " + (b ? "an underline" : u ? "bold text" : "bold text and an underline") + ".");
  });
}

function checklistLevel(ctx) {
  const items = [
    { t: "Cat", animal: true }, { t: "Dog", animal: true }, { t: "Table", animal: false },
    { t: "Fish", animal: true }, { t: "Chair", animal: false }, { t: "Cloud", animal: false }
  ];
  arena.innerHTML = `<div class="control-board">
    <p class="hint-chip">Tick every animal, then click Check.</p>
    <div class="check-list" id="checks"></div>
    <button class="btn btn-primary" id="checkBtn" type="button">Check my answers</button>
  </div>`;
  const list = GM.$("#checks", arena);
  GM.shuffle(items).forEach((it) => {
    const label = document.createElement("label");
    label.className = "check-row";
    label.innerHTML = `<input type="checkbox" value="${it.t}"/><span>${it.t}</span>`;
    list.append(label);
  });
  GM.$("#checkBtn", arena).addEventListener("click", () => {
    const ticked = GM.$$("input:checked", list).map((c) => c.value);
    const animals = items.filter((i) => i.animal).map((i) => i.t);
    const ok = ticked.length === animals.length && animals.every((a) => ticked.includes(a));
    if (ok) { ctx.progress(1, 1); ctx.finish(); }
    else ctx.say("Not yet. Tick every animal and nothing else. You ticked " + (ticked.length ? ticked.join(", ") : "nothing") + ".");
  });
}

function radioLevel(ctx) {
  arena.innerHTML = `<div class="control-board">
    <p class="hint-chip">Which device do you use to point, click and drag?</p>
    <div class="check-list" id="radios"></div>
    <button class="btn btn-primary" id="radioBtn" type="button">Check my answer</button>
  </div>`;
  const list = GM.$("#radios", arena);
  GM.shuffle([
    ["Monitor", false], ["Mouse", true], ["Keyboard", false], ["Printer", false]
  ]).forEach(([label, ok]) => {
    const row = document.createElement("label");
    row.className = "check-row";
    row.innerHTML = `<input type="radio" name="mouseAnswer" value="${ok ? "1" : "0"}"/><span>${label}</span>`;
    list.append(row);
  });
  GM.$("#radioBtn", arena).addEventListener("click", () => {
    const pick = GM.$('input[name="mouseAnswer"]:checked', list);
    if (!pick) { ctx.say("Choose one answer first."); return; }
    if (pick.value === "1") { ctx.progress(1, 1); ctx.finish(); }
    else ctx.say("That device does something else. Think about pointing and clicking.");
  });
}

function dropdownLevel(ctx) {
  arena.innerHTML = `<div class="control-board">
    <p class="hint-chip">Which folder should your photos go in?</p>
    <label class="drop-field">Folder
      <select id="folderSelect">
        <option value="">Choose a folder…</option>
        <option value="documents">Documents</option>
        <option value="pictures">Pictures</option>
        <option value="music">Music</option>
        <option value="downloads">Downloads</option>
      </select>
    </label>
    <button class="btn btn-primary" id="folderBtn" type="button">Check my answer</button>
  </div>`;
  GM.$("#folderBtn", arena).addEventListener("click", () => {
    const v = GM.$("#folderSelect", arena).value;
    if (!v) { ctx.say("Open the list and choose a folder."); return; }
    if (v === "pictures") { ctx.progress(1, 1); ctx.finish(); }
    else ctx.say("Photos belong in the Pictures folder. Try again.");
  });
}

function tooltipLevel(ctx) {
  const tips = [
    { name: "folder", label: "Folder — saves files together" },
    { name: "keyboard", label: "Keyboard — type letters" },
    { name: "mouse", label: "Mouse — point and click" },
    { name: "globe", label: "Globe — the internet" },
    { name: "shield", label: "Shield — stay safe online" }
  ];
  arena.innerHTML = `<div class="tooltip-board">
    <p class="hint-chip" id="tipAsk">Hover over each icon to read its tooltip.</p>
    <div class="tip-row" id="tipRow"></div>
  </div>`;
  const row = GM.$("#tipRow", arena);
  let seen = 0;
  GM.shuffle(tips).forEach((t) => {
    const b = document.createElement("div");
    b.className = "tip";
    b.tabIndex = 0;
    b.innerHTML = `${svg(t.name)}<span class="tip-text">${t.label}</span>`;
    b.setAttribute("aria-label", t.label);
    const mark = () => {
      if (b.classList.contains("seen")) return;
      b.classList.add("seen");
      seen++;
      if (seen >= tips.length) GM.$("#tipAsk", arena).textContent = "Now click the icon that saves files in one place.";
    };
    b.addEventListener("mouseenter", mark);
    b.addEventListener("focus", mark);
    if (t.name === "folder") b.addEventListener("click", () => {
      if (seen < tips.length) { ctx.say("Hover over every icon first so you know what each one does."); return; }
      ctx.progress(1, 1);
      ctx.finish();
    });
    else b.addEventListener("click", () => ctx.say("Read the tooltip. Which icon saves files together?"));
    row.append(b);
  });
}

function colourMatchLevel(ctx) {
  const colours = [
    { name: "red", css: "#ee5d45" }, { name: "blue", css: "#3b6fd4" },
    { name: "green", css: "#2fb67c" }, { name: "gold", css: "#f5b93b" }
  ];
  let done = 0;
  const total = 5;
  const show = () => {
    if (!arena.isConnected) return;
    arena.innerHTML = `<div class="colour-board">
      <p class="hint-chip" id="colourAsk"></p>
      <div class="colour-row" id="colourRow"></div>
    </div>`;
    const want = colours[GM.rand(0, colours.length - 1)];
    GM.$("#colourAsk", arena).textContent = "Click the " + want.name + " circle.";
    GM.shuffle(colours).forEach((c) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "colour-dot";
      b.style.background = c.css;
      b.setAttribute("aria-label", up(c.name) + " circle");
      b.addEventListener("click", () => {
        if (c.name === want.name) {
          done++;
          ctx.progress(done, total);
          if (done >= total) ctx.finish(); else show();
        } else {
          ctx.say("That is " + c.name + ". Look for the " + want.name + " circle.");
        }
      });
      GM.$("#colourRow", arena).append(b);
    });
  };
  show();
}

/* ---------- precision ---------- */
function exactClickLevel(ctx) {
  arena.innerHTML = `<div class="control-board">
    <p class="hint-chip">Click the big circle exactly 6 times, then click Stop.</p>
    <p class="count-big" id="count">0</p>
    <button class="hold-btn count-btn" id="countBtn" type="button">${svg("target")}</button>
    <button class="btn btn-primary" id="stopBtn" type="button">Stop</button>
  </div>`;
  const count = GM.$("#count", arena);
  let n = 0;
  GM.$("#countBtn", arena).addEventListener("click", () => {
    if (n >= 6) {
      n = 0;
      count.textContent = "0";
      ctx.progress(0, 6);
      ctx.say("Too many clicks! The count restarted at zero.");
      return;
    }
    n++;
    count.textContent = String(n);
    ctx.progress(n, 6);
  });
  GM.$("#stopBtn", arena).addEventListener("click", () => {
    if (n === 6) { ctx.progress(1, 1); ctx.finish(); }
    else ctx.say("Not yet. The circle shows " + n + ". Click until it shows 6, then press Stop.");
  });
}

function dblclickWordsLevel(ctx) {
  const words = ["keyboard", "mouse", "screen", "folder", "window"];
  arena.innerHTML = `<div class="word-board">
    <p class="hint-chip">Double-click each word to select it.</p>
    <div class="word-grid" id="wordGrid"></div>
  </div>`;
  const grid = GM.$("#wordGrid", arena);
  let n = 0;
  GM.shuffle(words).forEach((w) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "word-target";
    b.textContent = w;
    b.addEventListener("dblclick", (e) => {
      e.preventDefault();
      if (b.classList.contains("done")) return;
      b.classList.add("done");
      n++;
      ctx.progress(n, words.length);
      if (n >= words.length) ctx.finish();
    });
    grid.append(b);
  });
}

/* ---------- the level catalogue ---------- */
const RUN = {
  move: targetLevel("mouseenter", 6, "pointer"),
  click: targetLevel("click", 8, "mouse"),
  dblclick: targetLevel("dblclick", 5, "file"),
  rightclick: targetLevel("contextmenu", 5, "menu"),
  drag: dragSortLevel(
    [
      { id: "red", label: "Red", icon: "circle", colour: "#ee5d45" },
      { id: "blue", label: "Blue", icon: "circle", colour: "#3b6fd4" },
      { id: "green", label: "Green", icon: "circle", colour: "#2fb67c" }
    ],
    [
      { group: "red", icon: "circle", colour: "#ffb3a7", label: "Red item" },
      { group: "blue", icon: "circle", colour: "#b6d4ff", label: "Blue item" },
      { group: "green", icon: "circle", colour: "#bdeccd", label: "Green item" }
    ]
  ),
  scroll: scrollLevel({ height: 1100 }),

  select: selectLevel([
    ["Double-click the word <b>keyboard</b> to select it.", "The <mark>keyboard</mark> has many keys.", "keyboard"],
    ["Select the whole line below. Try clicking three times quickly!", "<mark>The mouse pointer follows my hand.</mark>", "The mouse pointer follows my hand."],
    ["Click at the start of <b>Lagos is big</b>, hold the button, drag to the end, then let go.", "Today I visited <mark>Lagos is big</mark> in my story.", "Lagos is big"]
  ]),

  "move-small": targetLevel("mouseenter", 8, "star", { size: 40 }),
  "click-many": targetLevel("click", 12, "target", { size: 60 }),
  "click-tiny": targetLevel("click", 8, "check", { size: 36 }),
  "find-mouse": findLevel({ target: "mouse", label: "mouse", count: 6, decoys: ["folder", "keyboard", "globe", "document", "menu"] }),
  "click-order": orderLevel(5),

  "dblclick-open": targetLevel("dblclick", 6, "file", { size: 60 }),
  "context-menu": contextMenuLevel(),
  "hover-reveal": hoverLevel(6),

  "drag-shapes": dragSortLevel(
    [
      { id: "triangle", label: "Triangle", icon: "triangle" },
      { id: "square", label: "Square", icon: "square" },
      { id: "circle", label: "Circle", icon: "circle" }
    ],
    [
      { group: "triangle", icon: "triangle", label: "Triangle" },
      { group: "square", icon: "square", label: "Square" },
      { group: "circle", icon: "circle", label: "Circle" },
      { group: "triangle", icon: "triangle", label: "Triangle" },
      { group: "square", icon: "square", label: "Square" },
      { group: "circle", icon: "circle", label: "Circle" }
    ]
  ),
  "drag-colours": dragSortLevel(
    [
      { id: "red", label: "Red", icon: "palette", colour: "#ee5d45" },
      { id: "blue", label: "Blue", icon: "palette", colour: "#3b6fd4" },
      { id: "green", label: "Green", icon: "palette", colour: "#2fb67c" }
    ],
    [
      { group: "red", icon: "circle", colour: "#ee5d45", label: "Red chip" },
      { group: "blue", icon: "circle", colour: "#3b6fd4", label: "Blue chip" },
      { group: "green", icon: "circle", colour: "#2fb67c", label: "Green chip" },
      { group: "red", icon: "circle", colour: "#ee5d45", label: "Red chip" },
      { group: "blue", icon: "circle", colour: "#3b6fd4", label: "Blue chip" },
      { group: "green", icon: "circle", colour: "#2fb67c", label: "Green chip" }
    ]
  ),
  "drag-io": dragSortLevel(
    [
      { id: "input", label: "Input", icon: "keyboard" },
      { id: "output", label: "Output", icon: "monitor" }
    ],
    [
      { group: "input", icon: "keyboard", label: "Keyboard" },
      { group: "input", icon: "mouse", label: "Mouse" },
      { group: "output", icon: "monitor", label: "Monitor" },
      { group: "output", icon: "music", label: "Speaker" }
    ]
  ),
  "drag-files": dragSortLevel(
    [
      { id: "documents", label: "Documents", icon: "document" },
      { id: "pictures", label: "Pictures", icon: "image" },
      { id: "music", label: "Music", icon: "music" }
    ],
    [
      { group: "documents", icon: "document", label: "Letter" },
      { group: "documents", icon: "document", label: "Homework" },
      { group: "pictures", icon: "image", label: "Photo" },
      { group: "pictures", icon: "image", label: "Drawing" },
      { group: "music", icon: "music", label: "Song" },
      { group: "music", icon: "music", label: "Drum beat" }
    ]
  ),
  "drag-goal": dragGoalLevel({ icon: "file", goalIcon: "folder", size: 58, goalSize: 116 }),
  resize: resizeLevel,

  "scroll-long": scrollLevel({ height: 2000 }),
  "scroll-thumb": scrollbarLevel,

  "select-words": selectWordLevel,
  "select-sentence": selectLevel([
    ["Drag from the start to the end of the sentence to select it.", "<mark>Our class visits the computer room every Friday.</mark>", "Our class visits the computer room every Friday."],
    ["Select the whole sentence with a triple-click.", "<mark>Always save your work before you close it.</mark>", "Always save your work before you close it."],
    ["Select only the name <b>Ada</b>.", "My friend <mark>Ada</mark> likes typing games.", "Ada"]
  ]),
  "copy-paste": copyPasteLevel,

  "hold-click": holdLevel,
  toolbar: toolbarLevel,
  checklist: checklistLevel,
  radio: radioLevel,
  dropdown: dropdownLevel,
  tooltip: tooltipLevel,
  "colour-match": colourMatchLevel,

  "exact-click": exactClickLevel,
  "dblclick-words": dblclickWordsLevel,
  "drag-knob": dragGoalLevel({ icon: "circle", goalIcon: "target", size: 34, goalSize: 54 }),
  "click-shapes": findLevel({ target: "triangle", label: "triangle", count: 6, decoys: ["circle", "square"] })
};

/* ---------- right-click level kept separate for readability ---------- */
function contextMenuLevel() {
  return (ctx) => {
    arena.innerHTML = `<div class="desk-area" id="desk">
      <button class="desk-file" id="deskFile" type="button">${svg("file")}<small>homework.txt</small></button>
      <p class="hint-chip">Right-click the file, then choose <b>Rename</b>.</p>
    </div>`;
    const file = GM.$("#deskFile", arena);
    file.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      const old = GM.$(".ctx-menu", arena);
      if (old) old.remove();
      const m = document.createElement("div");
      m.className = "ctx-menu";
      [["Open", "folder"], ["Copy", "copy"], ["Rename", "pencil"], ["Delete", "trash"]].forEach(([label, icon]) => {
        const b = document.createElement("button");
        b.type = "button";
        b.innerHTML = svg(icon) + " " + label;
        b.addEventListener("click", () => {
          if (label === "Rename") {
            file.innerHTML = svg("file") + "<small>my-work.txt</small>";
            ctx.progress(1, 1);
            ctx.finish();
          } else {
            m.remove();
            ctx.say("Good right-click! This level needs the Rename option.");
          }
        });
        m.append(b);
      });
      arena.append(m);
      const r = arena.getBoundingClientRect();
      m.style.left = Math.min(e.clientX - r.left, arena.clientWidth - 160) + "px";
      m.style.top = Math.min(e.clientY - r.top, arena.clientHeight - 170) + "px";
    });
  };
}

/* ---------- build the picker and start ---------- */
const LEVELS = (window.GM_DATA.mouseLevels || []).map((l, i) => ({
  ...l,
  title: (i + 1) + ". " + l.title,
  run: RUN[l.id] || targetLevel("click", 5, "target")
}));

function drawNav() {
  const p = GM.load();
  const out = [];
  let group = "";
  LEVELS.forEach((l, i) => {
    if (l.group !== group) {
      group = l.group;
      out.push(`<span class="nav-group">${group}</span>`);
    }
    out.push(`<button type="button" data-i="${i}" ${i === level ? 'aria-current="true"' : ""}>${svg(l.icon)} ${l.title}${p.mouse[l.id] ? '<span class="tick" aria-hidden="true">' + svg("check") + "</span>" : ""}</button>`);
  });
  GM.$("#levels").innerHTML = out.join("");
}

function start(i) {
  level = i;
  token++;
  const my = token, L = LEVELS[i];
  arena.innerHTML = ""; msg.textContent = ""; bar.style.width = "0"; nextBtn.hidden = true;
  GM.$("#lvTitle").textContent = L.title;
  GM.$("#lvHelp").textContent = L.help;
  drawNav();
  L.run({
    progress: (a, b) => { if (my === token) bar.style.width = Math.round((a / b) * 100) + "%"; },
    say: (t) => { if (my === token) msg.textContent = t; },
    finish: () => {
      if (my !== token) return;
      GM.update((p) => { p.mouse[L.id] = true; });
      msg.innerHTML = svg("trophy") + " Level complete! Great mouse control.";
      drawNav();
      if (i < LEVELS.length - 1) nextBtn.hidden = false;
      else msg.innerHTML = svg("trophy") + " You finished the Mouse Lab!";
    }
  });
}
GM.$("#levels").addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) start(+b.dataset.i); });
GM.$("#restart").onclick = () => start(level);
nextBtn.onclick = () => start(level + 1);
start(0);
