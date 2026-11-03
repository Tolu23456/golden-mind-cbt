const fs = require("fs"); const { parseQuestions } = require("../js/markdown.js");
let total = 0, bad = 0;
for (const f of fs.readdirSync("questions").filter((x) => x.endsWith(".md"))) {
  const { title, questions } = parseQuestions(fs.readFileSync("questions/" + f, "utf8"));
  questions.forEach((q, i) => {
    const ok = q.options.length === 4 && q.correctIndex >= 0 && q.question;
    const multi = (fs.readFileSync("questions/" + f, "utf8").split("## ")[i + 1].match(/\[x\]/gi) || []).length !== 1;
    if (!ok || multi) { bad++; console.log("BAD", f, i + 1, q.question); }
  });
  total += questions.length; console.log(f.padEnd(26), title.padEnd(22), questions.length);
}
console.log("total", total, "bad", bad); process.exit(bad ? 1 : 0);
