# Responsive design

People visit websites on phones, tablets, laptops and televisions. **Responsive design** means one page works well on all of them.

## Start with the viewport

Put this in the `<head>` of every page:

```
<meta name="viewport" content="width=device-width, initial-scale=1">
```

Without it, a phone pretends to be a wide desktop and shrinks the whole page until the text is unreadable.

## Flexible widths

Prefer relative units.

```
.container {
  width: min(1120px, 100% - 2rem);
  margin-inline: auto;
}
```

- `px` is fixed.
- `%` is relative to the parent.
- `rem` is relative to the root font size.
- `vw` and `vh` are relative to the viewport.
- `min()` and `max()` choose whichever value suits the screen.

Use `max-width` instead of a fixed `width` so the layout can shrink.

## Media queries

A media query applies CSS only when a condition is true.

```
@media (max-width: 700px) {
  .grid { grid-template-columns: 1fr; }
  h1 { font-size: 2rem; }
}
```

This says: on screens 700px wide or narrower, use one column and smaller headings.

You can also target dark mode and reduced motion:

```
@media (prefers-color-scheme: dark) {
  body { background: #121a2c; color: #eef1f9; }
}
```

## Mobile first

Write the phone layout first, then add larger-screen rules with `min-width`. This keeps the simple layout simple and avoids overriding desktop styles.

```
.cards { display: grid; gap: 12px; }
@media (min-width: 700px) {
  .cards { grid-template-columns: repeat(3, 1fr); }
}
```

## Responsive images

```
img {
  max-width: 100%;
  height: auto;
}
```

This stops images from overflowing their box and keeps their shape.

## Test it

Open DevTools with [kbd:F12], click the device toolbar and drag the width. Watch where the layout breaks. Common problems:

- A fixed width wider than the phone.
- A long word that cannot wrap.
- Navigation that will not fit.
- Text too small to tap.

## Tap targets

Buttons and links need space. Aim for at least 44 by 44 pixels, with a gap between them. A link that is easy to click with a mouse can be impossible with a thumb.

> Responsive design is not a separate mobile site. It is one site that adapts.

## Try it

Take the three-card grid from the last lesson. Add a media query so it becomes one column below 700px. Resize the Code Lab preview and check that nothing overflows.
