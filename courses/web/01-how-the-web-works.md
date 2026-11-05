# How the web works

When you open a page, two computers have a short conversation.

- Your device is the **client**.
- The computer holding the page is the **server**.

The client asks for a file. The server answers with the file. That exchange is a **request** and a **response**.

## The three languages

Every website is built from three jobs:

1. **HTML** gives the page its structure: headings, paragraphs, links and images.
2. **CSS** gives it style: colour, size, spacing and layout.
3. **JavaScript** gives it behaviour: respond to clicks, check answers, change the page.

A useful comparison: HTML is the skeleton, CSS is the clothes, JavaScript is the muscles.

## What happens when you visit a page

1. You type an address such as `https://example.com/page`.
2. The browser finds the server using **DNS**, the internet's address book.
3. It sends a request: "please give me `/page`".
4. The server replies with **HTML**.
5. The browser reads the HTML and finds links to CSS and JavaScript files.
6. It requests those files too.
7. It builds the page, a step called **rendering**.

> Views in the browser's DevTools (press [kbd:F12]) show you the HTML, the CSS and the console. They are the programmer's microscope.

## The building blocks

A web page lives in a **file** on the server. Other files sit beside it:

```
index.html
styles.css
script.js
images/logo.png
```

The `index.html` is usually the first page of a folder.

## Front end and back end

- **Front end** is everything in the browser: HTML, CSS and JavaScript.
- **Back end** runs on the server: storing users, saving orders, checking a password.
- An **API** lets the front end ask the back end for data without reloading the page.

This course starts with the front end, because it is the part you can see and change immediately.

## Your tools

You need only two things:

1. A text editor. Notepad works; VS Code is nicer.
2. A browser.

No account, no installation of a web server, no build step. You will use the **Code Lab** on this site to run your pages inside the browser.

## Try it

Open the Code Lab and choose "Your first page". Press **Run**. Look at the preview, then change one word and run it again. You have just edited a web page.
