# Build a quiz page

Time to combine HTML, CSS and JavaScript into one small project: a one-question quiz that gives instant feedback.

## Step 1: The HTML

```
<h1>Computer Quiz</h1>
<p id="question">What does HTML do?</p>
<div id="answers">
  <button class="answer" data-ok="no">It styles the page.</button>
  <button class="answer" data-ok="yes">It gives the page structure.</button>
</div>
<p id="feedback">Choose an answer.</p>
```

Each button carries `data-ok`. A data attribute stores extra information on an element, and JavaScript can read it with `element.dataset.ok`.

## Step 2: The CSS

```
body {
  font-family: sans-serif;
  max-width: 540px;
  margin: 40px auto;
  padding: 0 20px;
}
.answer {
  display: block;
  width: 100%;
  margin: 8px 0;
  padding: 12px 16px;
  border: 2px solid #1d2b4f;
  border-radius: 10px;
  background: white;
  font: inherit;
  cursor: pointer;
}
.answer:hover { background: #fff1cc; }
```

The buttons are blocks so they stack. `width: 100%` makes them easy to tap on a phone. `font: inherit` stops buttons from using the browser's tiny default font.

## Step 3: The JavaScript

```
const feedback = document.querySelector("#feedback");
const answers = document.querySelectorAll(".answer");

answers.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.ok === "yes") {
      feedback.textContent = "Correct!";
      button.style.background = "#dff6ea";
    } else {
      feedback.textContent = "Not quite. Try again.";
      button.style.background = "#ffe3dd";
    }
  });
});
```

`querySelectorAll` returns a list, and `forEach` runs the same code for each button. Inside the listener, `button` is the one that was clicked.

## Step 4: Improve it

A real quiz should:

- Move to the next question after an answer.
- Keep a score.
- Show the result at the end.
- Stop a question being answered twice.

Here is one way to track score:

```
let score = 0;

function answer(isCorrect) {
  if (isCorrect) score += 1;
  document.querySelector("#score").textContent = `Score: ${score}`;
}
```

## Step 5: Test like a user

- Click every button, not just the right one.
- Type strange input if there is an input box.
- Resize the preview to a phone width.
- Reload and check the starting state.
- Read the console for errors.

## Step 6: Make it yours

Change the question, add a second question, or use a different colour. Then add one feature: a "Next question" button, a progress line, or a final message that changes with the score.

> Building tiny projects is how programming sticks. Reading about functions is useful; using one to fix a real bug is what teaches you.

## Challenge

Open the Code Lab and complete **One-question quiz**. All four checks must pass. Then extend it with a score that updates when the correct answer is clicked.
