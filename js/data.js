"use strict";
/* Content registry. To add a lesson or quiz topic, drop a .md file in
   /lessons or /questions and add one line here. Every item uses an icon name
   from js/icons.js instead of an emoji. */
window.GM_DATA = {
  topics: [
    { id: "computer-basics", title: "Computer Basics", icon: "computer", file: "questions/computer-basics.md", blurb: "What a computer is and what it does." },
    { id: "hardware-software", title: "Hardware & Software", icon: "monitor", file: "questions/hardware-software.md", blurb: "Parts you can touch and programs you can't." },
    { id: "keyboard-typing", title: "Keyboard & Typing", icon: "keyboard", file: "questions/keyboard-typing.md", blurb: "Keys, shortcuts and good typing habits." },
    { id: "mouse-cursor", title: "Mouse & Cursor", icon: "mouse", file: "questions/mouse-cursor.md", blurb: "Point, click, drag, scroll and select." },
    { id: "windows-files", title: "Files & Folders", icon: "folder", file: "questions/windows-files.md", blurb: "Save, name, copy and find your work." },
    { id: "ms-word", title: "Word Processing", icon: "document", file: "questions/ms-word.md", blurb: "Typing and formatting documents." },
    { id: "ms-excel", title: "Spreadsheets", icon: "spreadsheet", file: "questions/ms-excel.md", blurb: "Cells, rows, columns and formulas." },
    { id: "internet-email", title: "Internet & Email", icon: "globe", file: "questions/internet-email.md", blurb: "Browsers, search and sending email." },
    { id: "internet-safety", title: "Staying Safe Online", icon: "shield", file: "questions/internet-safety.md", blurb: "Passwords, scams and kind behaviour." },
    { id: "cbt-exam-skills", title: "CBT Exam Skills", icon: "target", file: "questions/cbt-exam-skills.md", blurb: "How to sit a computer-based test calmly." }
  ],
  lessons: [
    { id: "what-is-a-computer", title: "What is a computer?", icon: "computer", file: "lessons/01-what-is-a-computer.md", quiz: "computer-basics" },
    { id: "parts-of-a-computer", title: "Parts of a computer", icon: "monitor", file: "lessons/02-parts-of-a-computer.md", quiz: "hardware-software" },
    { id: "the-keyboard", title: "Getting to know the keyboard", icon: "keyboard", file: "lessons/03-the-keyboard.md", quiz: "keyboard-typing" },
    { id: "the-mouse", title: "The mouse and the cursor", icon: "mouse", file: "lessons/04-the-mouse.md", quiz: "mouse-cursor" },
    { id: "touch-typing", title: "How to touch type", icon: "hand", file: "lessons/05-touch-typing.md", quiz: "keyboard-typing" },
    { id: "files-and-folders", title: "Files and folders", icon: "folder", file: "lessons/06-files-and-folders.md", quiz: "windows-files" },
    { id: "internet-safety", title: "Staying safe online", icon: "shield", file: "lessons/07-internet-safety.md", quiz: "internet-safety" },
    { id: "taking-a-cbt", title: "Taking a CBT exam", icon: "target", file: "lessons/08-taking-a-cbt.md", quiz: "cbt-exam-skills" }
  ],
  /* Mouse Lab levels. Groups keep the level picker tidy; the run() code for
     each id lives in js/mouse.js. */
  mouseLevels: [
    { id: "move", group: "Basics", title: "Move the cursor", help: "Slide the mouse pointer over each gold circle. You don't need to click!", icon: "pointer" },
    { id: "click", group: "Basics", title: "Click", help: "Press the left mouse button once on each circle.", icon: "mouse" },
    { id: "dblclick", group: "Basics", title: "Double-click", help: "Click twice very fast on each circle. Double-click opens files and folders.", icon: "file" },
    { id: "rightclick", group: "Basics", title: "Right-click", help: "Press the RIGHT mouse button on each circle. Right-click opens a menu of options.", icon: "menu" },
    { id: "drag", group: "Basics", title: "Drag and drop", help: "Hold the left button on an item, move it to the matching box, then let go.", icon: "drag" },
    { id: "scroll", group: "Basics", title: "Scroll", help: "Move the mouse over the box and roll the wheel to read further down. Find the gift!", icon: "scroll" },
    { id: "select", group: "Basics", title: "Select text", help: "Selecting text is how you copy, bold or delete words.", icon: "select" },

    { id: "move-small", group: "Aiming", title: "Move to tiny targets", help: "Small targets need a steady hand. Slide the pointer over each little star.", icon: "star" },
    { id: "click-many", group: "Aiming", title: "Click many targets", help: "Click twelve targets without losing your place.", icon: "click" },
    { id: "click-tiny", group: "Aiming", title: "Click tiny targets", help: "These targets are small. Slow down and click the middle.", icon: "check" },
    { id: "find-mouse", group: "Aiming", title: "Find the mouse", help: "Click only the mouse icons. Ignore the folders, keyboards and globes.", icon: "mouse" },
    { id: "click-order", group: "Aiming", title: "Click in order", help: "Click the numbers from 1 to 5, in order.", icon: "target" },

    { id: "dblclick-open", group: "More clicks", title: "Double-click to open", help: "Double-click each file to open it. Two quick clicks, not one.", icon: "file" },
    { id: "context-menu", group: "More clicks", title: "Right-click menu", help: "Right-click the file, then choose Rename from the menu.", icon: "menu" },
    { id: "hover-reveal", group: "More clicks", title: "Hover to reveal", help: "Move the pointer over each hidden star to light it up.", icon: "eye" },

    { id: "drag-shapes", group: "Drag & drop", title: "Drag the shapes", help: "Drag each shape into the box with the same shape.", icon: "circle" },
    { id: "drag-colours", group: "Drag & drop", title: "Drag the colours", help: "Match each coloured chip to the box with the same colour word.", icon: "palette" },
    { id: "drag-io", group: "Drag & drop", title: "Input or output?", help: "Drag each device to Input or Output. Input sends information in; output gives information out.", icon: "keyboard" },
    { id: "drag-files", group: "Drag & drop", title: "Sort the files", help: "Put each file in the right folder: documents, pictures or music.", icon: "folder" },
    { id: "drag-goal", group: "Drag & drop", title: "Drag to the folder", help: "Drag the file all the way into the folder and let go.", icon: "folder" },
    { id: "resize", group: "Drag & drop", title: "Resize a window", help: "Drag the bottom-right corner to make the window bigger.", icon: "resize" },

    { id: "scroll-long", group: "Scrolling", title: "Scroll a long page", help: "Use the mouse wheel to scroll all the way down and click the button at the bottom.", icon: "arrowDown" },
    { id: "scroll-thumb", group: "Scrolling", title: "Drag the scrollbar", help: "Drag the scrollbar thumb down to reach the bottom of the page.", icon: "scroll" },

    { id: "select-words", group: "Selecting", title: "Select words", help: "Double-click a word to select it. Try each word.", icon: "select" },
    { id: "select-sentence", group: "Selecting", title: "Select a sentence", help: "Drag from the start of the sentence to the end to select the whole sentence.", icon: "select" },
    { id: "copy-paste", group: "Selecting", title: "Copy and paste", help: "Select the sentence, click Copy, then click Paste.", icon: "copy" },

    { id: "hold-click", group: "Interface", title: "Click and hold", help: "Press the left button and keep holding it until the bar fills.", icon: "mouse" },
    { id: "toolbar", group: "Interface", title: "Use a toolbar", help: "Click Bold and Underline to change the word, then click Save.", icon: "bold" },
    { id: "checklist", group: "Interface", title: "Tick the boxes", help: "Tick every animal in the list, then click Check.", icon: "checkbox" },
    { id: "radio", group: "Interface", title: "Choose one answer", help: "Pick the correct answer with the round radio button, then click Check.", icon: "radio" },
    { id: "dropdown", group: "Interface", title: "Use a drop-down", help: "Open the list and choose the folder where photos belong.", icon: "chevronDown" },
    { id: "tooltip", group: "Interface", title: "Hover for help", help: "Hover each icon to read its tooltip, then click the folder.", icon: "eye" },
    { id: "colour-match", group: "Interface", title: "Match the colour", help: "Click the circle with the colour named in the clue.", icon: "palette" },

    { id: "exact-click", group: "Precision", title: "Count your clicks", help: "Click the circle six times, then click Stop. Extra clicks restart the count.", icon: "target" },
    { id: "dblclick-words", group: "Precision", title: "Double-click words", help: "Double-click each word to select it.", icon: "select" },
    { id: "drag-knob", group: "Precision", title: "Precision drag", help: "Drag the small knob into the tiny target. Slow and steady.", icon: "target" },
    { id: "click-shapes", group: "Precision", title: "Click the right shape", help: "Click only the triangles. Ignore the circles and squares.", icon: "triangle" }
  ]
};
