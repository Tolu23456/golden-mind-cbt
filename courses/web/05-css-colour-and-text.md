# CSS colour and text

**CSS** means Cascading Style Sheets. HTML says what something is; CSS says what it looks like.

## A rule

```
h1 {
  color: #1d2b4f;
  font-size: 2.5rem;
}
```

A rule has three parts:

- **Selector** — `h1`, the element to style.
- **Property** — `color`, the thing to change.
- **Value** — `#1d2b4f`, the setting.
- Property and value are separated by a colon, and each declaration ends with a semicolon.

## Three ways to add CSS

1. **Inline**: `<h1 style="color: red">`. Quick, but hard to maintain.
2. **Internal**: a `<style>` block in the `<head>`.
3. **External**: a separate `.css` file linked with `<link rel="stylesheet" href="styles.css">`.

External is best for real projects: one file styles every page, and the browser can cache it.

## Selectors

```
p { color: #333; }              /* every paragraph */
.card { background: white; }    /* class="card" */
#title { font-size: 3rem; }     /* id="title", used once */
```

- A **class** starts with a dot and can be reused many times.
- An **id** starts with a hash and should be unique on the page.

You can combine them: `p.note` selects paragraphs with `class="note"`.

## Colours

```
h2 { color: #c98a0c; }          /* hex */
p  { color: rgb(29, 43, 79); }  /* red, green, blue */
a  { background: #f5b93b; }
```

Hex codes use `#` and six characters. `#000000` is black and `#ffffff` is white. `rgb()` uses values from 0 to 255.

Make sure text has enough contrast with its background. Light grey on white looks elegant on your screen and invisible on a projector.

## Text properties

```
body {
  font-family: "Nunito", sans-serif;
  font-size: 17px;
  line-height: 1.6;
  color: #1d2b4f;
}
h1 {
  font-weight: 800;
  letter-spacing: 0.01em;
  text-align: center;
}
```

- `font-family` chooses the typeface. Always end with a generic fallback such as `sans-serif`.
- `font-size` sets the size. `rem` is relative to the root font size.
- `line-height` controls the space between lines. 1.5 to 1.7 is comfortable.
- `text-align` can be `left`, `center`, `right` or `justify`.

## The cascade

When two rules set the same property, the more specific one wins. An id beats a class, and a class beats an element selector. A rule later in the file wins over an earlier rule with equal specificity.

This is why a stylesheet can feel like it is ignoring you: something else is more specific.

> Use classes for almost everything. They are predictable and reusable. Keep ids for links and JavaScript.

## Try it

In the Code Lab CSS tab, style the body with a font and a background colour. Make the `h1` a different colour, centre it, and give paragraphs a comfortable line height.
