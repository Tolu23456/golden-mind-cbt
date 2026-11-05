# Files and errors

Programs should remember things after they close. **Files** do that. And programs should survive mistakes gracefully. **Errors** are how Python tells you something went wrong.

## Writing a file

```python
with open("notes.txt", "w") as file:
    file.write("First line\n")
    file.write("Second line\n")
```

- `open()` opens a file.
- `"w"` means write. It creates the file or **erases** what was there.
- `with` closes the file automatically, even if an error happens.
- `\n` is a new line.

Use `"a"` to append instead of overwriting.

```python
with open("notes.txt", "a") as file:
    file.write("Another line\n")
```

## Reading a file

```python
with open("notes.txt", "r") as file:
    text = file.read()

print(text)
```

`"r"` means read. For large files, loop line by line:

```python
with open("notes.txt", "r") as file:
    for line in file:
        print(line.strip())
```

`strip()` removes the new line and extra spaces at the ends.

> Always use `with`. Forgetting `close()` can lose data or lock the file.

## Paths

- `"notes.txt"` is in the current folder.
- `"data/notes.txt"` is inside a folder.
- `"../notes.txt"` is one folder up.

If the file is not found, Python raises `FileNotFoundError`.

## Reading errors

```python
number = int("hello")
```

Output:

```
ValueError: invalid literal for int() with base 10: 'hello'
```

The error names the problem and shows the value. Read the last line first, then look at the line number above it.

## try and except

Handle the problem instead of crashing.

```python
try:
    number = int(input("Enter a number: "))
    print(10 / number)
except ValueError:
    print("That was not a whole number.")
except ZeroDivisionError:
    print("You cannot divide by zero.")
```

Python tries the code in `try`. If a matching error happens, the matching `except` block runs and the program continues.

Catch the errors you expect. A bare `except` hides bugs you should see.

```python
# Avoid
try:
    do_something()
except:
    pass
```

## finally

`finally` runs whether there was an error or not. It is useful for cleanup.

```python
try:
    file = open("notes.txt")
    print(file.read())
finally:
    file.close()
```

With `with`, you rarely need this.

## Raising your own errors

```python
def set_score(score):
    if score < 0 or score > 100:
        raise ValueError("Score must be between 0 and 100")
    return score
```

`raise` stops the function and reports the problem. It is better than silently accepting bad data.

## Validating before converting

```python
text = input("Score: ")

try:
    score = int(text)
    print(f"Recorded {score}")
except ValueError:
    print("Please type a whole number.")
```

## Try it

Write a program that asks for three scores, appends them to `scores.txt`, then reads the file and prints the average. Wrap the number conversion in `try`/`except`.
