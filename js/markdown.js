"use strict";
/* Tiny markdown helpers: lessons -> HTML, question files -> objects.
   Works in the browser (window.GMMD) and in Node (module.exports). */
(function (root) {
  function esc(s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  function inline(s) {
    s = esc(s);
    s = s.replace(/`([^`]+)`/g, "<code>$1</code>");
    s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    s = s.replace(/(^|[^*])\*([^*\s][^*]*)\*/g, "$1<em>$2</em>");
    s = s.replace(/\[kbd:([^\]]+)\]/g, "<kbd>$1</kbd>");
    return s;
  }

  const isBlock = (l) => /^(#{1,4}\s|>\s?|[-*]\s+|\d+\.\s+|---+$)/.test(l);

  function mdToHtml(md) {
    const lines = md.replace(/\r/g, "").split("\n");
    const out = [];
    let i = 0;
    while (i < lines.length) {
      const l = lines[i];
      if (!l.trim()) { i++; continue; }
      let m;
      if ((m = l.match(/^(#{1,4})\s+(.*)/))) { out.push(`<h${m[1].length}>${inline(m[2])}</h${m[1].length}>`); i++; continue; }
      if (/^---+$/.test(l.trim())) { out.push("<hr>"); i++; continue; }
      if (/^>\s?/.test(l)) {
        const b = [];
        while (i < lines.length && /^>\s?/.test(lines[i])) { b.push(lines[i].replace(/^>\s?/, "")); i++; }
        out.push(`<blockquote>${inline(b.join(" "))}</blockquote>`); continue;
      }
      if (/^[-*]\s+/.test(l)) {
        const b = [];
        while (i < lines.length && /^[-*]\s+/.test(lines[i])) { b.push(`<li>${inline(lines[i].replace(/^[-*]\s+/, ""))}</li>`); i++; }
        out.push(`<ul>${b.join("")}</ul>`); continue;
      }
      if (/^\d+\.\s+/.test(l)) {
        const b = [];
        while (i < lines.length && /^\d+\.\s+/.test(lines[i])) { b.push(`<li>${inline(lines[i].replace(/^\d+\.\s+/, ""))}</li>`); i++; }
        out.push(`<ol>${b.join("")}</ol>`); continue;
      }
      const p = [];
      while (i < lines.length && lines[i].trim() && !isBlock(lines[i])) { p.push(lines[i]); i++; }
      out.push(`<p>${inline(p.join(" "))}</p>`);
    }
    return out.join("\n");
  }

  /* Question file format:
       # Topic title
       ## The question text?
       - [ ] wrong answer
       - [x] right answer
       > Tip shown after answering
  */
  function parseQuestions(md) {
    const title = (md.match(/^#\s+(.+)$/m) || [])[1] || "";
    const blocks = md.replace(/\r/g, "").split(/^##\s+/m).slice(1);
    const questions = [];
    for (const b of blocks) {
      const lines = b.split("\n");
      const q = [lines[0].trim()];
      const options = [];
      const tip = [];
      let correct = -1;
      for (const ln of lines.slice(1)) {
        let m;
        if ((m = ln.match(/^\s*-\s*\[( |x|X)\]\s+(.*)$/))) {
          if (m[1] !== " ") correct = options.length;
          options.push(m[2].trim());
        } else if (/^>\s?/.test(ln)) tip.push(ln.replace(/^>\s?/, "").trim());
        else if (ln.trim() && !options.length) q.push(ln.trim());
      }
      questions.push({ question: q.join(" "), options, correctIndex: correct, tip: tip.join(" ") });
    }
    return { title, questions };
  }

  const api = { mdToHtml, parseQuestions, esc, inline };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.GMMD = api;
})(typeof window !== "undefined" ? window : globalThis);
