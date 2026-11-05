# Functions

A **function** is a named block of code that does one job. Define it once, call it whenever you need it.

## Defining and calling

```python
def greet():
    print("Hello!")

greet()
greet()
```

`def` starts the definition. The name is followed by parentheses and a colon. The body is indented. Defining a function does not run it; calling it with `greet()` does.

## Parameters and arguments

```python
def greet(name):
    print(f"Hello, {name}!")

greet("Ada")
greet("Bola")
```

`name` is a **parameter** inside the definition. `"Ada"` is an **argument** passed at the call. The function runs once for each call, with a different value.

## Return values

`print()` shows something. `return` sends a value back to the caller.

```python
def add(a, b):
    return a + b

total = add(3, 4)
print(total)      # 7
```

A function without `return` gives back `None`.

```python
def show(message):
    print(message)

result = show("Hi")   # prints Hi
print(result)         # None
```

## Default and keyword arguments

```python
def area(width, height=1):
    return width * height

print(area(4, 5))    # 20
print(area(4))       # 4
print(area(height=3, width=2))  # 6
```

Arguments with defaults must come after arguments without them.

## Several return paths

```python
def grade(score):
    if score >= 70:
        return "A"
    if score >= 60:
        return "B"
    if score >= 50:
        return "C"
    return "F"
```

When a `return` runs, the function ends. No `else` is needed after a return.

## Local and global scope

Variables created inside a function are **local**. They disappear when the function ends.

```python
def calculate():
    bonus = 5
    return bonus

calculate()
print(bonus)     # NameError
```

A function can read a global variable, but changing it needs care. Prefer passing values in and returning results out. That makes functions predictable and easy to test.

## Docstrings

A string on the first line of a function documents it.

```python
def average(numbers):
    """Return the mean of a list of numbers."""
    return sum(numbers) / len(numbers)
```

## Small is good

A good function:

- Has one clear job.
- Uses descriptive names.
- Returns a value instead of printing when the result will be used elsewhere.
- Handles simple edge cases, such as an empty list.

```python
def average(numbers):
    if not numbers:
        return 0
    return sum(numbers) / len(numbers)
```

> If you cannot name a function without "and", split it into two functions.

## Try it

Write `is_pass(score)` that returns `True` or `False`. Then write `report(name, score)` that uses it to return a full sentence. Call `report` for three different students and print each result.
