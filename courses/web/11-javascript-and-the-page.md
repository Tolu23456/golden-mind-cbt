# JavaScript and the page

JavaScript becomes powerful when it can read and change the page. The browser turns your HTML into the **DOM**: a tree of objects you can select and edit.

## Selecting elements

```
const title = document.getElementById("title");
const firstCard = document.querySelector(".card");
const allCards = document.querySelectorAll(".card");
```

- `getElementById("title")` finds `id="title"`.
- `querySelector(".card")` returns the first match for a CSS selector.
- `querySelectorAll(".card")` returns a list of every match.

You can use any CSS selector: `.card`, `#title`, `nav a`, `input[type="text"]`.

## Reading and changing text

```
const title = document.querySelector("h1");
console.log(title.textContent);      // read
title.textContent = "New heading";   // change
```

`textContent` is safe: it treats the value as plain text. `innerHTML` parses it as HTML. Only use `innerHTML` with content you trust.

## Changing style and classes

```
title.classList.add("done");
title.classList.remove("hidden");
title.classList.toggle("active");
```

Changing a class is better than setting many inline styles, because the design stays in CSS. You can also use `element.style.color = "red"` for one-off changes.

## Listening for events

```
const button = document.querySelector("#go");

button.addEventListener("click", () => {
  document.querySelector("#out").textContent = "You clicked!";
});
```

The first argument is the event name. The second is a function that runs when the event happens. Common events: `click`, `input`, `submit`, `keydown`, `change`.

## Reading an input

```
const input = document.querySelector("#name");
const button = document.querySelector("#go");
const out = document.querySelector("#out");

button.addEventListener("click", () => {
  const value = input.value.trim();
  out.textContent = value ? `Hello, ${value}!` : "Please type a name.";
});
```

`input.value` is always a string, even when the user types a number. Use `Number(input.value)` when you need maths.

## Creating elements

```
const li = document.createElement("li");
li.textContent = "New task";
document.querySelector("#list").append(li);
```

Create the element, set its content, then add it to the page.

## Forms

```
form.addEventListener("submit", (event) => {
  event.preventDefault();   // stop the page reloading
  // handle the form here
});
```

`preventDefault()` is essential when you want JavaScript to handle a form.

## A warning about timing

The script must run after the HTML it needs exists. Put your `<script>` at the end of `<body>`, or wait for `DOMContentLoaded`.

> If you get "Cannot read properties of null", the element was not found. Check the selector, the spelling and whether the HTML loaded first.

## Try it

In the Code Lab, add an input, a button and a paragraph. When the button is clicked, copy the input value into the paragraph. If the input is empty, show a friendly message instead.
