"use strict";
/* Content registry. To add a lesson or quiz topic, drop a .md file in
   /lessons or /courses and add one line here. Every item uses an icon name
   from js/icons.js instead of an emoji. */
window.GM_DATA = {
  /* Quiz topics, grouped on the practice-test page. */
  topics: [
    { id: "computer-basics", title: "Computer Basics", icon: "computer", group: "Computer Skills", file: "questions/computer-basics.md", blurb: "What a computer is and what it does." },
    { id: "hardware-software", title: "Hardware & Software", icon: "monitor", group: "Computer Skills", file: "questions/hardware-software.md", blurb: "Parts you can touch and programs you can't." },
    { id: "keyboard-typing", title: "Keyboard & Typing", icon: "keyboard", group: "Computer Skills", file: "questions/keyboard-typing.md", blurb: "Keys, shortcuts and good typing habits." },
    { id: "mouse-cursor", title: "Mouse & Cursor", icon: "mouse", group: "Computer Skills", file: "questions/mouse-cursor.md", blurb: "Point, click, drag, scroll and select." },
    { id: "windows-files", title: "Files & Folders", icon: "folder", group: "Computer Skills", file: "questions/windows-files.md", blurb: "Save, name, copy and find your work." },
    { id: "ms-word", title: "Word Processing", icon: "document", group: "Computer Skills", file: "questions/ms-word.md", blurb: "Typing and formatting documents." },
    { id: "ms-excel", title: "Spreadsheets", icon: "spreadsheet", group: "Computer Skills", file: "questions/ms-excel.md", blurb: "Cells, rows, columns and formulas." },
    { id: "internet-email", title: "Internet & Email", icon: "mail", group: "Computer Skills", file: "questions/internet-email.md", blurb: "Browsers, search and sending email." },
    { id: "internet-safety", title: "Staying Safe Online", icon: "shield", group: "Computer Skills", file: "questions/internet-safety.md", blurb: "Passwords, scams and kind behaviour." },
    { id: "cbt-exam-skills", title: "CBT Exam Skills", icon: "target", group: "Computer Skills", file: "questions/cbt-exam-skills.md", blurb: "How to sit a computer-based test calmly." },

    { id: "html-basics", title: "HTML Basics", icon: "code", group: "Programming", file: "questions/html-basics.md", blurb: "Tags, headings, links and the structure of a page." },
    { id: "css-basics", title: "CSS Basics", icon: "palette", group: "Programming", file: "questions/css-basics.md", blurb: "Colours, text, spacing and simple layouts." },
    { id: "js-basics", title: "JavaScript Basics", icon: "terminal", group: "Programming", file: "questions/js-basics.md", blurb: "Variables, decisions, functions and the DOM." },
    { id: "python-basics", title: "Python Basics", icon: "terminal", group: "Programming", file: "questions/python-basics.md", blurb: "Read and understand your first Python programs." },
    { id: "cs-logic", title: "CS & Logic", icon: "brain", group: "Programming", file: "questions/cs-logic.md", blurb: "Binary, algorithms, debugging and problem solving." },
    { id: "web-basics", title: "Web Checkpoint", icon: "globe", group: "Programming", file: "questions/web-basics.md", blurb: "A mixed test of HTML, CSS and JavaScript." },

    { id: "presentations", title: "Presentations", icon: "presentation", group: "Digital Life", file: "questions/presentations.md", blurb: "Slides, images and speaking with confidence." },
    { id: "cloud-storage", title: "Cloud Storage", icon: "cloud", group: "Digital Life", file: "questions/cloud-storage.md", blurb: "Save, sync and share work safely online." },
    { id: "digital-images", title: "Photos & Screenshots", icon: "camera", group: "Digital Life", file: "questions/digital-images.md", blurb: "Image files, screenshots and simple edits." },
    { id: "ai-literacy", title: "AI & Chatbots", icon: "sparkles", group: "Digital Life", file: "questions/ai-literacy.md", blurb: "What AI can do, what it cannot, and how to use it well." },
    { id: "cyber-security", title: "Cyber Security", icon: "key", group: "Digital Life", file: "questions/cyber-security.md", blurb: "Strong passwords, two-step checks and scams." },
    { id: "digital-money", title: "Digital Money", icon: "wallet", group: "Digital Life", file: "questions/digital-money.md", blurb: "Mobile banking, transfers and staying safe." },
    { id: "online-communication", title: "Online Communication", icon: "chat", group: "Digital Life", file: "questions/online-communication.md", blurb: "Email, video calls and kind online behaviour." },
    { id: "digital-skills", title: "Digital Life Checkpoint", icon: "layers", group: "Digital Life", file: "questions/digital-skills.md", blurb: "A mixed test of everyday digital skills." },
    { id: "study-skills", title: "Study & Career", icon: "graduation", group: "Digital Life", file: "questions/study-skills.md", blurb: "Use the computer to study, apply and build a future." }
  ],

  /* Courses are the top level. Units hold lesson ids; the lesson reader
     flattens them so Back/Next stay inside the chosen course. */
  courses: [
    {
      id: "computer", title: "Computer Skills", icon: "computer", kind: "skills", level: "Beginner",
      blurb: "Start from zero: use a mouse and keyboard, save files, write documents and sit a CBT with confidence.",
      units: [
        { title: "Meet the computer", quiz: "computer-basics", lessons: ["what-is-a-computer", "parts-of-a-computer", "the-keyboard", "the-mouse"] },
        { title: "Type and save", quiz: "keyboard-typing", lessons: ["touch-typing", "files-and-folders"] },
        { title: "Office skills", quiz: "ms-word", lessons: ["word-processing", "spreadsheets", "internet-and-email"] },
        { title: "Stay safe and pass", quiz: "cbt-exam-skills", lessons: ["internet-safety", "taking-a-cbt"] }
      ]
    },
    {
      id: "digital", title: "Digital Life", icon: "globe", kind: "skills", level: "Everyday",
      blurb: "Presentations, cloud storage, photos, AI, cyber security, digital money and online communication.",
      quiz: "digital-skills",
      units: [
        { title: "Create and share", quiz: "presentations", lessons: ["presentations", "digital-images", "cloud-storage"] },
        { title: "Stay smart online", quiz: "cyber-security", lessons: ["cyber-security", "ai-literacy", "online-communication"] },
        { title: "Money and future", quiz: "digital-money", lessons: ["digital-money", "study-and-career"] }
      ]
    },
    {
      id: "web", title: "Web Foundations", icon: "code", kind: "programming", level: "Beginner",
      blurb: "Build real pages with HTML, make them beautiful with CSS, and bring them to life with JavaScript.",
      quiz: "web-basics", lab: true, colour: "sky",
      units: [
        { title: "HTML: the page skeleton", quiz: "html-basics", lessons: ["how-the-web-works", "your-first-html-page", "text-lists-and-links", "images-and-tables"] },
        { title: "CSS: make it look good", quiz: "css-basics", lessons: ["css-colour-and-text", "css-boxes-and-layout", "responsive-design"] },
        { title: "JavaScript: make it think", quiz: "js-basics", lessons: ["javascript-variables", "javascript-decisions", "javascript-functions"] },
        { title: "Build a project", quiz: "web-basics", lessons: ["javascript-and-the-page", "build-a-quiz-page"] }
      ]
    },
    {
      id: "python", title: "Python Foundations", icon: "terminal", kind: "programming", level: "Beginner",
      blurb: "Learn to read and write Python: variables, decisions, loops, lists, functions and a small project.",
      quiz: "python-basics", colour: "mint",
      units: [
        { title: "First steps", quiz: "python-basics", lessons: ["meet-python", "python-variables", "python-input-output"] },
        { title: "Control the flow", quiz: "python-basics", lessons: ["python-decisions", "python-loops", "python-lists"] },
        { title: "Build with functions", quiz: "python-basics", lessons: ["python-functions", "python-dictionaries", "python-files-errors"] },
        { title: "Mini project", quiz: "python-basics", lessons: ["python-mini-project"] }
      ]
    },
    {
      id: "cs", title: "Computer Science & Logic", icon: "brain", kind: "programming", level: "Intermediate",
      blurb: "Go behind the screen: binary, algorithms, pseudocode, debugging, data, networks and problem solving.",
      quiz: "cs-logic", colour: "gold",
      units: [
        { title: "How computers work", quiz: "cs-logic", lessons: ["how-computers-think", "binary-and-bits"] },
        { title: "Think like a programmer", quiz: "cs-logic", lessons: ["algorithms", "pseudocode", "debugging"] },
        { title: "Data and networks", quiz: "cs-logic", lessons: ["data-and-databases", "networks-and-internet", "problem-solving"] }
      ]
    }
  ],

  /* Every lesson in one list. course + quiz keep the reader and checkpoint
     buttons in sync; minutes are used for the course overview. */
  lessons: [
    { id: "what-is-a-computer", title: "What is a computer?", icon: "computer", course: "computer", quiz: "computer-basics", minutes: 6, file: "lessons/01-what-is-a-computer.md" },
    { id: "parts-of-a-computer", title: "Parts of a computer", icon: "monitor", course: "computer", quiz: "hardware-software", minutes: 7, file: "lessons/02-parts-of-a-computer.md" },
    { id: "the-keyboard", title: "Getting to know the keyboard", icon: "keyboard", course: "computer", quiz: "keyboard-typing", minutes: 7, file: "lessons/03-the-keyboard.md" },
    { id: "the-mouse", title: "The mouse and the cursor", icon: "mouse", course: "computer", quiz: "mouse-cursor", minutes: 6, file: "lessons/04-the-mouse.md" },
    { id: "touch-typing", title: "How to touch type", icon: "hand", course: "computer", quiz: "keyboard-typing", minutes: 7, file: "lessons/05-touch-typing.md" },
    { id: "files-and-folders", title: "Files and folders", icon: "folder", course: "computer", quiz: "windows-files", minutes: 7, file: "lessons/06-files-and-folders.md" },
    { id: "word-processing", title: "Word processing", icon: "document", course: "computer", quiz: "ms-word", minutes: 8, file: "lessons/09-word-processing.md" },
    { id: "spreadsheets", title: "Spreadsheets", icon: "spreadsheet", course: "computer", quiz: "ms-excel", minutes: 8, file: "lessons/10-spreadsheets.md" },
    { id: "internet-and-email", title: "Internet and email", icon: "mail", course: "computer", quiz: "internet-email", minutes: 8, file: "lessons/11-internet-and-email.md" },
    { id: "internet-safety", title: "Staying safe online", icon: "shield", course: "computer", quiz: "internet-safety", minutes: 7, file: "lessons/07-internet-safety.md" },
    { id: "taking-a-cbt", title: "Taking a CBT exam", icon: "target", course: "computer", quiz: "cbt-exam-skills", minutes: 7, file: "lessons/08-taking-a-cbt.md" },

    { id: "presentations", title: "Make a great presentation", icon: "presentation", course: "digital", quiz: "presentations", minutes: 8, file: "lessons/12-presentations.md" },
    { id: "digital-images", title: "Photos, screenshots and image files", icon: "camera", course: "digital", quiz: "digital-images", minutes: 8, file: "lessons/13-digital-images.md" },
    { id: "cloud-storage", title: "Saving work in the cloud", icon: "cloud", course: "digital", quiz: "cloud-storage", minutes: 8, file: "lessons/14-cloud-storage.md" },
    { id: "cyber-security", title: "Passwords and cyber security", icon: "key", course: "digital", quiz: "cyber-security", minutes: 9, file: "lessons/15-cyber-security.md" },
    { id: "ai-literacy", title: "AI and chatbots", icon: "sparkles", course: "digital", quiz: "ai-literacy", minutes: 9, file: "lessons/16-ai-literacy.md" },
    { id: "online-communication", title: "Communicating online", icon: "chat", course: "digital", quiz: "online-communication", minutes: 8, file: "lessons/17-online-communication.md" },
    { id: "digital-money", title: "Digital money and mobile banking", icon: "wallet", course: "digital", quiz: "digital-money", minutes: 9, file: "lessons/18-digital-money.md" },
    { id: "study-and-career", title: "Study and career skills", icon: "graduation", course: "digital", quiz: "study-skills", minutes: 8, file: "lessons/19-study-and-career.md" },

    { id: "how-the-web-works", title: "How the web works", icon: "globe", course: "web", quiz: "html-basics", minutes: 6, file: "courses/web/01-how-the-web-works.md" },
    { id: "your-first-html-page", title: "Your first HTML page", icon: "code", course: "web", quiz: "html-basics", minutes: 7, file: "courses/web/02-your-first-html-page.md" },
    { id: "text-lists-and-links", title: "Text, lists and links", icon: "link", course: "web", quiz: "html-basics", minutes: 7, file: "courses/web/03-text-lists-and-links.md" },
    { id: "images-and-tables", title: "Images and tables", icon: "image", course: "web", quiz: "html-basics", minutes: 7, file: "courses/web/04-images-and-tables.md" },
    { id: "css-colour-and-text", title: "CSS colour and text", icon: "palette", course: "web", quiz: "css-basics", minutes: 7, file: "courses/web/05-css-colour-and-text.md" },
    { id: "css-boxes-and-layout", title: "CSS boxes and layout", icon: "square", course: "web", quiz: "css-basics", minutes: 8, file: "courses/web/06-css-boxes-and-layout.md" },
    { id: "responsive-design", title: "Responsive design", icon: "resize", course: "web", quiz: "css-basics", minutes: 8, file: "courses/web/07-responsive-design.md" },
    { id: "javascript-variables", title: "JavaScript variables", icon: "terminal", course: "web", quiz: "js-basics", minutes: 7, file: "courses/web/08-javascript-variables.md" },
    { id: "javascript-decisions", title: "JavaScript decisions", icon: "branch", course: "web", quiz: "js-basics", minutes: 7, file: "courses/web/09-javascript-decisions.md" },
    { id: "javascript-functions", title: "JavaScript functions", icon: "puzzle", course: "web", quiz: "js-basics", minutes: 8, file: "courses/web/10-javascript-functions.md" },
    { id: "javascript-and-the-page", title: "JavaScript and the page", icon: "click", course: "web", quiz: "js-basics", minutes: 8, file: "courses/web/11-javascript-and-the-page.md" },
    { id: "build-a-quiz-page", title: "Build a quiz page", icon: "rocket", course: "web", quiz: "web-basics", minutes: 10, file: "courses/web/12-build-a-quiz-page.md" },

    { id: "meet-python", title: "Meet Python", icon: "terminal", course: "python", quiz: "python-basics", minutes: 6, file: "courses/python/01-meet-python.md" },
    { id: "python-variables", title: "Variables and types", icon: "file", course: "python", quiz: "python-basics", minutes: 7, file: "courses/python/02-python-variables.md" },
    { id: "python-input-output", title: "Input and output", icon: "chat", course: "python", quiz: "python-basics", minutes: 7, file: "courses/python/03-python-input-output.md" },
    { id: "python-decisions", title: "Decisions", icon: "branch", course: "python", quiz: "python-basics", minutes: 7, file: "courses/python/04-python-decisions.md" },
    { id: "python-loops", title: "Loops", icon: "scroll", course: "python", quiz: "python-basics", minutes: 8, file: "courses/python/05-python-loops.md" },
    { id: "python-lists", title: "Lists", icon: "menu", course: "python", quiz: "python-basics", minutes: 8, file: "courses/python/06-python-lists.md" },
    { id: "python-functions", title: "Functions", icon: "puzzle", course: "python", quiz: "python-basics", minutes: 8, file: "courses/python/07-python-functions.md" },
    { id: "python-dictionaries", title: "Dictionaries", icon: "database", course: "python", quiz: "python-basics", minutes: 8, file: "courses/python/08-python-dictionaries.md" },
    { id: "python-files-errors", title: "Files and errors", icon: "bug", course: "python", quiz: "python-basics", minutes: 8, file: "courses/python/09-python-files-errors.md" },
    { id: "python-mini-project", title: "Mini project: a quiz game", icon: "rocket", course: "python", quiz: "python-basics", minutes: 10, file: "courses/python/10-python-mini-project.md" },

    { id: "how-computers-think", title: "How computers think", icon: "brain", course: "cs", quiz: "cs-logic", minutes: 7, file: "courses/cs/01-how-computers-think.md" },
    { id: "binary-and-bits", title: "Binary and bits", icon: "code", course: "cs", quiz: "cs-logic", minutes: 8, file: "courses/cs/02-binary-and-bits.md" },
    { id: "algorithms", title: "Algorithms", icon: "route", course: "cs", quiz: "cs-logic", minutes: 8, file: "courses/cs/03-algorithms.md" },
    { id: "pseudocode", title: "Pseudocode", icon: "document", course: "cs", quiz: "cs-logic", minutes: 7, file: "courses/cs/04-pseudocode.md" },
    { id: "debugging", title: "Debugging", icon: "bug", course: "cs", quiz: "cs-logic", minutes: 8, file: "courses/cs/05-debugging.md" },
    { id: "data-and-databases", title: "Data and databases", icon: "database", course: "cs", quiz: "cs-logic", minutes: 8, file: "courses/cs/06-data-and-databases.md" },
    { id: "networks-and-internet", title: "Networks and the internet", icon: "network", course: "cs", quiz: "cs-logic", minutes: 8, file: "courses/cs/07-networks-and-internet.md" },
    { id: "problem-solving", title: "Problem solving", icon: "puzzle", course: "cs", quiz: "cs-logic", minutes: 8, file: "courses/cs/08-problem-solving.md" }
  ],

  /* Typing lessons. The first 12 are the original lessons in the original
     order, so saved progress keys (p.typing[index]) keep working. New
     lessons are appended, never inserted. */
  typingLessons: [
    { group: "Home row", title: "Home row: left", help: "Index and middle fingers rest on F and D.", text: "asdf asdf fads sad fad dad add fas sass ads dads fads" },
    { group: "Home row", title: "Home row: right", help: "Right hand rests on J K L ;", text: "jkl; jkl; lad ask salad flask all fall lakes jaffa" },
    { group: "Home row", title: "Home row: both hands", help: "Use both hands together.", text: "a sad lad asks dad; dad has a flask; all fall as lads ask" },
    { group: "All the rows", title: "Top row: E R U I", help: "Reach up, then come straight back to the home row.", text: "ride fire sure tire fuse rule rise sure ride true user" },
    { group: "All the rows", title: "Top row: Q W T Y O P", help: "The top row has the most letters.", text: "water power quiet write pretty today toward wrote tower" },
    { group: "All the rows", title: "Bottom row", help: "Reach down with Z X C V B N M.", text: "zebra box cave vine bank name mix cabin move zoom nine" },
    { group: "Everyday typing", title: "Common words", help: "The words you will type most often.", text: "the and for you are with this that have from they will" },
    { group: "Everyday typing", title: "Capital letters", help: "Hold Shift with the opposite hand.", text: "Lagos Abuja Kano Ibadan Enugu Port Harcourt Nigeria Africa" },
    { group: "Everyday typing", title: "Numbers", help: "Use the number row. Keep your eyes on the screen.", text: "10 20 30 45 67 89 100 250 1960 2024 2030 12345 67890" },
    { group: "Everyday typing", title: "Punctuation", help: "Full stops, commas and question marks.", text: "Yes, I can. Can you? We read, we write, we learn. Well done!" },
    { group: "Everyday typing", title: "Computer words", help: "Words you will meet in every computer class.", text: "mouse keyboard screen folder file save print click type cursor" },
    { group: "Everyday typing", title: "Short story", help: "Put it all together.", text: "My name is Ada. I go to school in Lagos. Today I learned to type. It was fun, and I want to get faster." },

    { group: "Accuracy builders", title: "Home row rhythm", help: "Keep a steady beat. Accuracy first, speed second.", text: "asdf jkl; fdsa ;lkj sad lad ask fall flask salad adds all" },
    { group: "Accuracy builders", title: "Left hand reaches", help: "Reach up and down with the left hand, then return home.", text: "qwert asdfg zxcvb were saw dew car vase wave bear case" },
    { group: "Accuracy builders", title: "Right hand reaches", help: "Reach up and down with the right hand, then return home.", text: "yuiop hjkl; nm,./ you oil put him name move noun join" },
    { group: "Accuracy builders", title: "Shift and capitals", help: "Use the Shift key on the opposite side of the letter.", text: "Ada Lagos Abuja Kano Nigeria Africa Monday Friday School" },
    { group: "Accuracy builders", title: "Question marks", help: "Question marks need Shift and the / key.", text: "Can you type? Yes, I can. Do you like it? I do! Are you ready?" },
    { group: "Accuracy builders", title: "Commas and lists", help: "Commas separate items in a list.", text: "I bought rice, beans, oil, salt, and fish. We need pens, books, and bags." },
    { group: "Accuracy builders", title: "Apostrophes", help: "The apostrophe is beside the Enter key.", text: "It's fun. I can't stop. We're learning. Don't worry. That's great." },
    { group: "Accuracy builders", title: "Quotes and brackets", help: "Use Shift for quotes, brackets and braces.", text: "She said \"hello\" and left. (This is easy.) [Try it.] {Keep going.}" },

    { group: "Numbers and symbols", title: "Number row warm-up", help: "Say each number as you type it.", text: "1 2 3 4 5 6 7 8 9 0 10 25 50 75 100 250 500 1000" },
    { group: "Numbers and symbols", title: "Phone numbers", help: "Spaces make long numbers easier to read.", text: "0803 123 4567 0705 987 6543 0901 222 3333 0812 345 6789" },
    { group: "Numbers and symbols", title: "Dates", help: "Use the / key between the parts of a date.", text: "01/01/2026 15/06/2025 31/12/2030 05/11/2026 28/02/2027" },
    { group: "Numbers and symbols", title: "Money amounts", help: "Commas group thousands. Type them carefully.", text: "N250 N1,000 N5,500 N20,000 N150,000 N2,500,000" },
    { group: "Numbers and symbols", title: "Email addresses", help: "The @ sign is Shift and the 2 key.", text: "ada@example.com tolu@school.edu.ng help@site.org info@shop.com" },
    { group: "Numbers and symbols", title: "Website addresses", help: "Dots, slashes and dashes are common in web addresses.", text: "www.example.com https://school.edu.ng golden-mind-cbt.github.io" },
    { group: "Numbers and symbols", title: "Code punctuation", help: "Programmers use these symbols all the time.", text: "{} [] () <> = ; : , . / \\ | & * + -" },
    { group: "Numbers and symbols", title: "Code words", help: "These keywords appear in JavaScript and Python.", text: "const let function return if else for while true false" },

    { group: "Real-world typing", title: "HTML tags", help: "Tags use angle brackets and slashes.", text: "<h1>Hello</h1> <p>My page</p> <a href=\"#\">Link</a>" },
    { group: "Real-world typing", title: "CSS rules", help: "CSS uses braces, colons and semicolons.", text: "body { color: blue; } h1 { font-size: 2rem; } p { margin: 1rem; }" },
    { group: "Real-world typing", title: "Exam instructions", help: "Read every word before you start.", text: "Read each question carefully. Choose one answer. Check your work before you submit." },
    { group: "Real-world typing", title: "School sentences", help: "Type full sentences with capitals and full stops.", text: "Our teacher asked us to open our books and read page ten. Then we wrote a short story." },
    { group: "Real-world typing", title: "Nigerian cities", help: "Capital letters matter in place names.", text: "Lagos Ibadan Abuja Kano Enugu Port Harcourt Benin City Kaduna" },
    { group: "Real-world typing", title: "Computer safety", help: "Good habits are easy to type and easy to remember.", text: "Use a strong password. Never share it. Log out when you finish. Keep your work safe." },
    { group: "Real-world typing", title: "Email writing", help: "Practise a polite message.", text: "Dear Sir, Thank you for your message. I will send the report today. Yours sincerely, Ada." },
    { group: "Real-world typing", title: "A short paragraph", help: "Keep going even when the text is long.", text: "The computer room is quiet in the morning. Students sit at their desks, open their files, and begin to type. By noon, everyone has finished the lesson." },

    { group: "Speed tests", title: "Speed test: easy words", help: "One minute of common words. Aim for accuracy.", text: "the and you are with this that have from they will come time look make like give most some very when what your" },
    { group: "Speed tests", title: "Speed test: sentences", help: "Capitals and punctuation slow you down. Stay calm.", text: "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump!" },
    { group: "Speed tests", title: "Speed test: numbers", help: "Mix words and numbers without looking down.", text: "There are 24 students in room 12. The exam starts at 09:30 and lasts 45 minutes. Please bring 2 pencils." },
    { group: "Speed tests", title: "Speed test: symbols", help: "A final challenge for your little fingers.", text: "if (score > 5) { return \"win\"; } else { return \"try again\"; } #coding @home" },
    { group: "Speed tests", title: "Speed test: paragraph", help: "Type a full paragraph at your best pace.", text: "Learning to type is like learning to ride a bicycle. At first you watch your hands and move slowly. With practice, your fingers find the keys by themselves and your eyes stay on the screen." },
    { group: "Speed tests", title: "Speed test: champion", help: "The last lesson. Show what you can do.", text: "Golden Mind CBT helps students build real computer confidence. Practise the mouse, learn the keyboard, grow your typing speed, and sit practice tests until you feel ready. Small steps every day become big results." }
  ],

  /* Code Lab challenges. Starter code and simple source checks live here so
     the lab page can load any challenge without a server. */
  labChallenges: [
    {
      id: "hello-page", title: "Your first page", level: "Starter", icon: "code",
      blurb: "Make a personal intro page with a heading, a paragraph and a link.",
      html: "<h1>Hello, I am Ada</h1>\n<p>I am learning to build web pages.</p>\n<a href=\"https://example.com\">My favourite website</a>",
      css: "body { font-family: sans-serif; padding: 2rem; }",
      js: "",
      tests: [
        { label: "A heading with your name", tab: "html", re: "<h1[^>]*>[^<]+</h1>" },
        { label: "A paragraph of text", tab: "html", re: "<p[^>]*>[^<]+</p>" },
        { label: "A working link", tab: "html", re: "<a[^>]+href=[\"'][^\"']+[\"'][^>]*>" }
      ]
    },
    {
      id: "colour-card", title: "Colour card", level: "Starter", icon: "palette",
      blurb: "Use CSS to turn a plain box into a friendly card.",
      html: "<div class=\"card\">\n  <h2>My Card</h2>\n  <p>Make me colourful.</p>\n</div>",
      css: ".card {\n  background: #fff1cc;\n  color: #1d2b4f;\n  padding: 24px;\n  border-radius: 18px;\n}",
      js: "",
      tests: [
        { label: "A background colour", tab: "css", re: "background(-color)?\\s*:" },
        { label: "Padding around the text", tab: "css", re: "padding\\s*:" },
        { label: "Rounded corners", tab: "css", re: "border-radius\\s*:" }
      ]
    },
    {
      id: "list-and-links", title: "List and links", level: "Starter", icon: "menu",
      blurb: "Build a short list and link each item to a page.",
      html: "<h2>My favourite sites</h2>\n<ul>\n  <li><a href=\"https://example.com\">Example</a></li>\n  <li><a href=\"https://wikipedia.org\">Wikipedia</a></li>\n  <li><a href=\"https://github.com\">GitHub</a></li>\n</ul>",
      css: "body { font-family: sans-serif; padding: 2rem; }\nli { margin: 8px 0; }",
      js: "",
      tests: [
        { label: "An unordered list", tab: "html", re: "<ul[^>]*>" },
        { label: "At least three list items", tab: "html", re: "(<li[^>]*>[\\s\\S]*){3,}" },
        { label: "A link inside a list item", tab: "html", re: "<li[^>]*>[\\s\\S]*<a[^>]+href" }
      ]
    },
    {
      id: "greeting-js", title: "Say hello with JavaScript", level: "Easy", icon: "terminal",
      blurb: "Use JavaScript to put a greeting on the page.",
      html: "<h2>Greeting machine</h2>\n<p id=\"out\">Press the button.</p>\n<button id=\"go\">Say hello</button>",
      css: "body { font-family: sans-serif; padding: 2rem; }\nbutton { padding: 10px 16px; border-radius: 10px; border: 0; background: #f5b93b; font-weight: bold; }",
      js: "const out = document.getElementById(\"out\");\nconst button = document.getElementById(\"go\");\nbutton.addEventListener(\"click\", () => {\n  out.textContent = \"Hello, Ada!\";\n});",
      tests: [
        { label: "Find the #out element", tab: "js", re: "getElementById\\([\"']out[\"']\\)" },
        { label: "Listen for a click", tab: "js", re: "addEventListener\\([\"']click[\"']" },
        { label: "Change the text", tab: "js", re: "(textContent|innerHTML)\\s*=" }
      ]
    },
    {
      id: "counter", title: "Click counter", level: "Easy", icon: "click",
      blurb: "Make a button that counts how many times it is clicked.",
      html: "<h2>Click counter</h2>\n<p>Count: <strong id=\"count\">0</strong></p>\n<button id=\"add\">Add one</button>",
      css: "body { font-family: sans-serif; padding: 2rem; }\nbutton { padding: 10px 16px; border-radius: 10px; border: 0; background: #2fb67c; color: white; font-weight: bold; }",
      js: "let count = 0;\nconst countEl = document.getElementById(\"count\");\nconst add = document.getElementById(\"add\");\nadd.addEventListener(\"click\", () => {\n  count += 1;\n  countEl.textContent = count;\n});",
      tests: [
        { label: "Keep a count variable", tab: "js", re: "(let|var)\\s+count\\s*=" },
        { label: "Listen for a click", tab: "js", re: "addEventListener\\([\"']click[\"']" },
        { label: "Add one to the count", tab: "js", re: "count\\s*(\\+\\+|\\+=\\s*1)" },
        { label: "Show the count on the page", tab: "js", re: "textContent\\s*=" }
      ]
    },
    {
      id: "colour-picker", title: "Colour picker", level: "Easy", icon: "palette",
      blurb: "Change the page colour when a button is clicked.",
      html: "<h2>Colour picker</h2>\n<button id=\"blue\">Blue</button>\n<button id=\"gold\">Gold</button>",
      css: "body { font-family: sans-serif; padding: 2rem; }\nbutton { padding: 10px 16px; border-radius: 10px; border: 0; margin-right: 8px; font-weight: bold; }",
      js: "const blue = document.getElementById(\"blue\");\nconst gold = document.getElementById(\"gold\");\nblue.addEventListener(\"click\", () => { document.body.style.background = \"#e6f0ff\"; });\ngold.addEventListener(\"click\", () => { document.body.style.background = \"#fff1cc\"; });",
      tests: [
        { label: "Get two buttons", tab: "js", re: "getElementById" },
        { label: "Listen for clicks", tab: "js", re: "addEventListener\\([\"']click[\"']" },
        { label: "Change the background", tab: "js", re: "style\\.background\\s*=" }
      ]
    },
    {
      id: "responsive-page", title: "Mobile-friendly page", level: "Medium", icon: "resize",
      blurb: "Use a media query so the page looks good on a phone.",
      html: "<header class=\"hero\">\n  <h1>My Site</h1>\n  <p>It should look good on every screen.</p>\n</header>\n<main class=\"grid\">\n  <div class=\"card\">One</div>\n  <div class=\"card\">Two</div>\n  <div class=\"card\">Three</div>\n</main>",
      css: "body { font-family: sans-serif; padding: 1rem; }\n.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }\n.card { background: #e6f0ff; padding: 24px; border-radius: 12px; text-align: center; }\n\n@media (max-width: 600px) {\n  .grid { grid-template-columns: 1fr; }\n}",
      js: "",
      tests: [
        { label: "Use a media query", tab: "css", re: "@media" },
        { label: "Target small screens", tab: "css", re: "max-width\\s*:" },
        { label: "Use a grid or flex layout", tab: "css", re: "(display\\s*:\\s*grid|display\\s*:\\s*flex)" }
      ]
    },
    {
      id: "quiz-card", title: "One-question quiz", level: "Medium", icon: "target",
      blurb: "Build a tiny quiz that tells the learner if they are right.",
      html: "<h2>What does HTML do?</h2>\n<p id=\"feedback\">Choose an answer.</p>\n<button class=\"answer\" data-ok=\"no\">It styles the page.</button>\n<button class=\"answer\" data-ok=\"yes\">It gives the page structure.</button>",
      css: "body { font-family: sans-serif; padding: 2rem; }\n.answer { display: block; margin: 8px 0; padding: 10px 16px; border-radius: 10px; border: 2px solid #1d2b4f; background: white; }",
      js: "const feedback = document.getElementById(\"feedback\");\ndocument.querySelectorAll(\".answer\").forEach((button) => {\n  button.addEventListener(\"click\", () => {\n    feedback.textContent = button.dataset.ok === \"yes\" ? \"Correct!\" : \"Not quite. Try again.\";\n  });\n});",
      tests: [
        { label: "At least two answer buttons", tab: "html", re: "(<button[^>]*>[\\s\\S]*){2,}" },
        { label: "Store the right answer", tab: "html", re: "data-ok=[\"']yes[\"']" },
        { label: "Listen for answer clicks", tab: "js", re: "addEventListener\\([\"']click[\"']" },
        { label: "Show feedback", tab: "js", re: "textContent\\s*=" }
      ]
    },
    {
      id: "todo-list", title: "To-do list", level: "Challenge", icon: "checkbox",
      blurb: "Add new items to a list from an input box.",
      html: "<h2>My to-do list</h2>\n<input id=\"task\" placeholder=\"New task\" />\n<button id=\"add\">Add task</button>\n<ul id=\"list\"></ul>",
      css: "body { font-family: sans-serif; padding: 2rem; }\ninput, button { padding: 10px; border-radius: 10px; border: 2px solid #1d2b4f; }\nbutton { background: #f5b93b; font-weight: bold; }\nli { margin: 8px 0; }",
      js: "const input = document.getElementById(\"task\");\nconst list = document.getElementById(\"list\");\nconst add = document.getElementById(\"add\");\nadd.addEventListener(\"click\", () => {\n  if (!input.value.trim()) return;\n  const li = document.createElement(\"li\");\n  li.textContent = input.value.trim();\n  list.append(li);\n  input.value = \"\";\n});",
      tests: [
        { label: "Find the input and the list", tab: "js", re: "getElementById" },
        { label: "Create a new list item", tab: "js", re: "createElement\\([\"']li[\"']\\)" },
        { label: "Add it to the list", tab: "js", re: "(append|appendChild)\\(" },
        { label: "Listen for the add button", tab: "js", re: "addEventListener\\([\"']click[\"']" }
      ]
    }
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
