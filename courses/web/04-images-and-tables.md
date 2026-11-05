# Images and tables

Images make a page human. Tables make numbers readable, when used correctly.

## Adding an image

```
<img src="images/school.jpg" alt="Students working in the computer room" width="400">
```

- `src` is the file path.
- `alt` is the text shown if the image fails and read aloud by screen readers.
- `width` and `height` keep the page from jumping while the image loads.

`<img>` is an empty tag. It has no closing tag.

## Writing good alt text

Describe what matters in the image, not every detail.

- Good: "A chart showing pass rates rising from 60% to 87%."
- Bad: "image1.jpg".
- If an image is purely decorative, use `alt=""` so screen readers skip it.

## File paths

- `photo.jpg` — in the same folder.
- `images/photo.jpg` — inside a folder called images.
- `../photo.jpg` — one folder up.

Paths are case-sensitive on many servers. `Photo.JPG` and `photo.jpg` are different files.

## Sizing

Set a sensible size in HTML or CSS. Never stretch a small image into a large space; it becomes blurry. Use a large original and shrink it.

```
<img src="images/logo.png" alt="Golden Mind logo" class="logo">
```

## Tables

A table has rows and cells.

```
<table>
  <tr>
    <th>Subject</th>
    <th>Score</th>
  </tr>
  <tr>
    <td>Computer</td>
    <td>87</td>
  </tr>
  <tr>
    <td>Maths</td>
    <td>74</td>
  </tr>
</table>
```

- `<table>` wraps the whole table.
- `<tr>` is a table row.
- `<th>` is a heading cell.
- `<td>` is a normal data cell.

Always include a header row with `th`. It helps screen readers announce each cell and makes the table easier to scan.

## When not to use a table

Do **not** use tables to lay out a page. Tables are for data that belongs in rows and columns. Page layout belongs in CSS.

> A table of exam scores is data. A table holding the whole page design is a headache.

## Captions

```
<table>
  <caption>Term 1 results</caption>
  ...
</table>
```

The caption sits above the table and explains what it contains.

## Try it

Add a photo with useful alt text to your page. Below it, build a table of three subjects and their scores with a header row and a caption.
