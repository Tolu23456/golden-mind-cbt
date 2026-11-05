# Your first HTML page

HTML uses **tags** to label pieces of content. A tag is a name inside angle brackets.

```
<h1>Hello, world!</h1>
<p>This is my first page.</p>
```

Most tags come in pairs: an **opening tag** `<h1>` and a **closing tag** `</h1>` with a slash. The content goes between them.

## The skeleton

Every page has the same basic shape.

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My first page</title>
</head>
<body>
  <h1>Hello, world!</h1>
  <p>This is my first page.</p>
</body>
</html>
```

Line by line:

- `<!DOCTYPE html>` tells the browser this is modern HTML.
- `<html>` wraps the whole document. `lang="en"` says the language is English.
- `<head>` holds information about the page. It is not shown on screen.
- `<meta charset="UTF-8">` lets the page show letters and symbols correctly.
- `<title>` is the name in the browser tab.
- `<body>` holds everything the visitor sees.

## Headings and paragraphs

There are six heading levels:

```
<h1>Main title</h1>
<h2>Section</h2>
<h3>Smaller section</h3>
<p>A paragraph of text.</p>
```

Use only **one** `h1` per page. Then move down the levels in order. Headings are not just big text; they tell screen readers and search engines how the page is organised.

## Attributes

Some tags carry extra information called **attributes**.

```
<html lang="en">
<img src="photo.jpg" alt="A student at a desk">
```

`lang`, `src` and `alt` are attributes. They sit in the opening tag and usually have `name="value"`.

## Whitespace and indentation

The browser ignores extra spaces and line breaks in your HTML. We indent children inside their parent so the file is easy to read. Good indentation is for humans; the browser does not care.

## Saving a file

Name the file with `.html` at the end, for example `index.html`. Double-click it and the browser opens it. In the Code Lab, the HTML tab is already your page.

> HTML is forgiving: a missing closing tag may still display. Do not rely on it. Broken structure causes strange bugs later.

## Try it

In the Code Lab HTML tab, write:

```
<h1>My name is Ada</h1>
<p>I am learning HTML at Golden Mind CBT.</p>
```

Run it, then add an `h2` section and two paragraphs.
