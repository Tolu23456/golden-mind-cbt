"use strict";
/* Content registry. To add a lesson or quiz topic, drop a .md file in
   /lessons or /questions and add one line here. */
window.GM_DATA = {
  topics: [
    { id: "computer-basics", title: "Computer Basics", emoji: "💻", file: "questions/computer-basics.md", blurb: "What a computer is and what it does." },
    { id: "hardware-software", title: "Hardware & Software", emoji: "🖥️", file: "questions/hardware-software.md", blurb: "Parts you can touch and programs you can't." },
    { id: "keyboard-typing", title: "Keyboard & Typing", emoji: "⌨️", file: "questions/keyboard-typing.md", blurb: "Keys, shortcuts and good typing habits." },
    { id: "mouse-cursor", title: "Mouse & Cursor", emoji: "🖱️", file: "questions/mouse-cursor.md", blurb: "Point, click, drag, scroll and select." },
    { id: "windows-files", title: "Files & Folders", emoji: "📁", file: "questions/windows-files.md", blurb: "Save, name, copy and find your work." },
    { id: "ms-word", title: "Word Processing", emoji: "📝", file: "questions/ms-word.md", blurb: "Typing and formatting documents." },
    { id: "ms-excel", title: "Spreadsheets", emoji: "📊", file: "questions/ms-excel.md", blurb: "Cells, rows, columns and formulas." },
    { id: "internet-email", title: "Internet & Email", emoji: "🌐", file: "questions/internet-email.md", blurb: "Browsers, search and sending email." },
    { id: "internet-safety", title: "Staying Safe Online", emoji: "🛡️", file: "questions/internet-safety.md", blurb: "Passwords, scams and kind behaviour." },
    { id: "cbt-exam-skills", title: "CBT Exam Skills", emoji: "🎯", file: "questions/cbt-exam-skills.md", blurb: "How to sit a computer-based test calmly." }
  ],
  lessons: [
    { id: "what-is-a-computer", title: "What is a computer?", emoji: "💻", file: "lessons/01-what-is-a-computer.md", quiz: "computer-basics" },
    { id: "parts-of-a-computer", title: "Parts of a computer", emoji: "🖥️", file: "lessons/02-parts-of-a-computer.md", quiz: "hardware-software" },
    { id: "the-keyboard", title: "Getting to know the keyboard", emoji: "⌨️", file: "lessons/03-the-keyboard.md", quiz: "keyboard-typing" },
    { id: "the-mouse", title: "The mouse and the cursor", emoji: "🖱️", file: "lessons/04-the-mouse.md", quiz: "mouse-cursor" },
    { id: "touch-typing", title: "How to touch type", emoji: "👐", file: "lessons/05-touch-typing.md", quiz: "keyboard-typing" },
    { id: "files-and-folders", title: "Files and folders", emoji: "📁", file: "lessons/06-files-and-folders.md", quiz: "windows-files" },
    { id: "internet-safety", title: "Staying safe online", emoji: "🛡️", file: "lessons/07-internet-safety.md", quiz: "internet-safety" },
    { id: "taking-a-cbt", title: "Taking a CBT exam", emoji: "🎯", file: "lessons/08-taking-a-cbt.md", quiz: "cbt-exam-skills" }
  ]
};
