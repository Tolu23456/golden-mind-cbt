# Meet Python

**Python** is a programming language built for readable code. It is used for websites, data science, automation, artificial intelligence and teaching. Its syntax looks close to English, which makes it a friendly first language.

## Your first program

```python
print("Hello, world!")
```

`print()` shows a value on the screen. The text inside the quotes is a **string**. The parentheses call the function.

Run it and the output is:

```
Hello, world!
```

## Comments

A comment explains code to humans. Python ignores it.

```python
# This line is a comment.
print("Learning Python")  # Comments can sit after code too.
```

Use comments to explain **why**, not to repeat what the code already says.

## Where to write Python

- **A `.py` file** — the normal way. Save `hello.py` and run `python hello.py`.
- **The interactive shell (REPL)** — type `python` in a terminal and Python answers each line immediately. Great for experiments.
- **An online editor** — useful when you cannot install anything.

This site teaches the language. To run the examples, use any Python 3 environment.

## Numbers and text

```python
print(2 + 3)          # 5
print(10 / 4)         # 2.5
print("2" + "3")      # 23
```

Notice the last line. Quotes make text, so `+` joins the strings instead of adding numbers. Types matter.

## Indentation is part of the language

Python uses indentation to group code. Four spaces is the standard.

```python
if 5 > 2:
    print("Five is greater than two")
```

The indented line belongs to the `if`. If you remove the indentation, Python raises an error. Consistency is not a style preference here; it is syntax.

> Never mix tabs and spaces. Choose four spaces and let your editor insert them.

## Reading errors

Errors are normal. Read the last line first.

- `SyntaxError` — Python could not understand the code. Check quotes, brackets and colons.
- `NameError` — you used a name that does not exist. Check spelling.
- `IndentationError` — the spacing is wrong.
- `TypeError` — you mixed types in a way Python cannot handle.

The line number in the message points to the problem. Start there, not at the top of the file.

## Your first useful program

```python
name = "Ada"
print("Hello, " + name)
print("Welcome to Python.")
```

`name` is a variable. We will meet variables properly in the next lesson.

## Try it

Write a program with three `print()` lines: your name, your school and one thing you want to build. Add a comment above each line explaining it.
