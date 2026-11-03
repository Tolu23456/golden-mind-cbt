"use strict";
GM.chrome("keyboard.html");
const kb = GM.$("#kb");
GM.buildKeyboard(kb);

const INFO = {
  enter: ["Enter", "Starts a new line, or confirms a choice."],
  backspace: ["Backspace", "Deletes the letter BEFORE the cursor."],
  delete: ["Delete", "Deletes the letter AFTER the cursor."],
  tab: ["Tab", "Jumps forward: an indent, or the next box in a form."],
  capslock: ["Caps Lock", "Locks capital letters on or off."],
  shift: ["Shift", "Hold it with a letter for a capital, or with a number for a symbol."],
  control: ["Ctrl", "Hold it and press a letter to make a shortcut, like Ctrl + C."],
  alt: ["Alt", "Used in shortcuts, like Alt + Tab to switch windows."],
  " ": ["Space bar", "Puts a space between words."],
  escape: ["Esc", "Cancels or closes something."],
  arrowleft: ["Left arrow", "Moves the cursor one place left."],
  arrowright: ["Right arrow", "Moves the cursor one place right."],
  arrowup: ["Up arrow", "Moves the cursor up."],
  arrowdown: ["Down arrow", "Moves the cursor down."],
  home: ["Home", "Jumps to the start of the line."],
  end: ["End", "Jumps to the end of the line."],
  pageup: ["Page Up", "Scrolls up one screen."],
  pagedown: ["Page Down", "Scrolls down one screen."]
};
const big = GM.$("#bigKey");
let running = false;

document.addEventListener("keydown", (e) => {
  if (running) return;
  const k = e.key.toLowerCase();
  if (["tab", " ", "'", "/"].includes(k)) e.preventDefault();
  GM.flash(kb, k, "hit");
  const i = INFO[k];
  const kind = /^[a-z]$/.test(k) ? "A letter key." : /^[0-9]$/.test(k) ? "A number key." : "A key on your keyboard.";
  big.innerHTML = i ? `${i[0]}<small>${i[1]}</small>` : `${e.key.length === 1 ? e.key.toUpperCase() : e.key}<small>${kind}</small>`;
});

/* ----- shortcut challenge ----- */
const mod = (e) => e.ctrlKey || e.metaKey;
const ctrl = (prompt, letter, label) => [prompt, (e) => mod(e) && !e.shiftKey && e.key.toLowerCase() === letter, label];
const press = (prompt, key, label) => [prompt, (e) => !mod(e) && e.key === key, label];
const CH = [
  ctrl("Copy the selected text", "c", "Ctrl + C"),
  ctrl("Paste what you copied", "v", "Ctrl + V"),
  ctrl("Cut the selected text", "x", "Ctrl + X"),
  ctrl("Undo your last action", "z", "Ctrl + Z"),
  ctrl("Redo what you undid", "y", "Ctrl + Y"),
  ctrl("Select everything", "a", "Ctrl + A"),
  ctrl("Save your work", "s", "Ctrl + S"),
  ctrl("Make text bold", "b", "Ctrl + B"),
  ctrl("Underline text", "u", "Ctrl + U"),
  ctrl("Find a word on the page", "f", "Ctrl + F"),
  ctrl("Print the page", "p", "Ctrl + P"),
  ["Type a capital A", (e) => e.shiftKey && !mod(e) && e.key === "A", "Shift + A"],
  press("Start a new line", "Enter", "Enter"),
  press("Delete the letter before the cursor", "Backspace", "Backspace"),
  press("Go to the start of the line", "Home", "Home"),
  press("Go to the end of the line", "End", "End"),
  press("Cancel or close a menu", "Escape", "Esc"),
  press("Move the cursor one place left", "ArrowLeft", "Left arrow"),
  press("Press the space bar", " ", "Space")
];
let deck = [], pos = 0, score = 0, locked = false;
const ask = GM.$("#chAsk"), cm = GM.$("#chCombo"), cnt = GM.$("#chCount"), startBtn = GM.$("#chStart");

function next() {
  locked = false; cm.textContent = "";
  if (pos >= deck.length) return end();
  ask.textContent = deck[pos][0];
  cnt.textContent = `Question ${pos + 1} of ${deck.length} — score ${score}`;
}
function end() {
  running = false;
  const p = GM.update((p) => { p.shortcuts.best = Math.max(p.shortcuts.best || 0, score); });
  ask.textContent = `You scored ${score} out of ${deck.length}!`;
  cm.textContent = `Best so far: ${p.shortcuts.best}/10`;
  cnt.textContent = "";
  startBtn.hidden = false; startBtn.textContent = "Play again";
}
startBtn.onclick = () => { deck = GM.shuffle(CH).slice(0, 10); pos = 0; score = 0; running = true; startBtn.hidden = true; next(); };

document.addEventListener("keydown", (e) => {
  if (!running || locked) return;
  if (["Control", "Shift", "Alt", "Meta", "CapsLock"].includes(e.key)) return;
  e.preventDefault();
  const [, test, label] = deck[pos];
  locked = true;
  if (test(e)) { score++; cm.textContent = "✔ Correct! " + label; GM.flash(kb, e.key.toLowerCase(), "hit"); }
  else { cm.textContent = "✘ Not quite. The answer is " + label; GM.flash(kb, e.key.toLowerCase(), "miss"); }
  pos++;
  setTimeout(next, 1100);
});
