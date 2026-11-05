# Text, lists and links

Text is the heart of the web. Links are what make it a web instead of a pile of pages.

## Emphasis

```
<p>This is <strong>very important</strong> and this is <em>slightly different</em>.</p>
```

- `<strong>` marks important text. Browsers show it bold.
- `<em>` marks emphasis. Browsers show it italic.

Use them for meaning, not decoration. If you only want bold for style, CSS is the right tool.

## Line breaks and dividers

```
<p>First line<br>Second line</p>
<hr>
```

`<br>` breaks a line without starting a new paragraph. `<hr>` draws a horizontal rule, useful for a change of topic. Both are **empty tags**: they have no closing tag.

## Lists

Unordered lists are for items with no natural order.

```
<ul>
  <li>Rice</li>
  <li>Beans</li>
  <li>Oil</li>
</ul>
```

Ordered lists number themselves.

```
<ol>
  <li>Crack the eggs</li>
  <li>Stir the mixture</li>
  <li>Pour into the pan</li>
</ol>
```

`<ul>` means unordered list, `<ol>` ordered list, and `<li>` list item. Never put text directly inside a `ul`; every item needs its own `li`.

## Links

The `<a>` tag makes a link. "a" stands for anchor.

```
<a href="https://example.com">Visit example.com</a>
```

`href` is the destination. The words between the tags are what the reader clicks.

### Absolute and relative links

An **absolute** link includes the full address and works from anywhere:

```
<a href="https://golden-mind-cbt.github.io/golden-mind-cbt/">Golden Mind CBT</a>
```

A **relative** link points to a file beside the current page:

```
<a href="about.html">About me</a>
<a href="images/logo.png">The logo file</a>
```

Relative links break if you move files without updating the path.

### Opening a new tab

```
<a href="https://example.com" target="_blank" rel="noopener">Open in a new tab</a>
```

`rel="noopener"` is a security habit: it stops the new page from controlling your page.

## Good link text

Write link text that describes the destination.

- Good: "Read the exam rules"
- Bad: "Click here"

People who use screen readers often jump from link to link. "Click here" tells them nothing.

> A link is a promise. If the text says "exam rules", the page had better contain exam rules.

## Try it

Build a page with:

1. An `h1` titled "My favourite foods".
2. A short paragraph explaining why.
3. An ordered list of three foods.
4. An unordered list of ingredients.
5. A link to a recipe site, with clear link text.
