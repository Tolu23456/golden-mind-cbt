# Variables and types

A **variable** is a name that points to a value. Create one with `=`.

```python
name = "Ada"
age = 16
height = 1.62
is_student = True
```

Unlike some languages, Python does not make you declare the type. The value knows its own type.

## The basic types

```python
print(type("Ada"))      # <class 'str'>
print(type(16))         # <class 'int'>
print(type(1.62))       # <class 'float'>
print(type(True))       # <class 'bool'>
```

- `str` — text, inside quotes.
- `int` — whole numbers.
- `float` — numbers with a decimal point.
- `bool` — `True` or `False`, with capital letters.
- `None` — the absence of a value.

## Strings

```python
first = "Ada"
last = "Okafor"
full = first + " " + last
print(full)
```

`+` joins strings. To repeat a string, use `*`.

```python
print("-" * 20)
```

Strings can be inside single or double quotes. Use double quotes when the text contains an apostrophe.

```python
message = "It's a good day"
```

## Numbers

```python
a = 10
b = 3

print(a + b)    # 13
print(a - b)    # 7
print(a * b)    # 30
print(a / b)    # 3.333...
print(a // b)   # 3   floor division
print(a % b)    # 1   remainder
print(a ** b)   # 1000  power
```

Division with `/` always gives a float. `//` throws away the decimal part.

## Changing a value

```python
score = 0
score = score + 10
score += 5
print(score)    # 15
```

`+=` is short for "add and assign". There are also `-=`, `*=` and `/=`.

## Naming rules

- Use lowercase words joined by underscores: `first_name`, `exam_score`.
- Start with a letter or underscore, not a number.
- No spaces or hyphens.
- Names are case-sensitive: `Score` and `score` differ.
- Avoid Python keywords such as `if`, `for` and `class`.

A good name explains the value. `total_price` is better than `tp`.

## Converting types

```python
age_text = "16"
age = int(age_text)       # 16, an int
price = float("2.50")     # 2.5, a float
label = str(100)          # "100", a string
```

`int()` refuses text that is not a whole number. `int("2.5")` raises an error; use `float()` first.

## Constants

Python has no true constants, but a name in capitals tells other programmers not to change it.

```python
PASS_MARK = 50
SCHOOL = "Golden Mind"
```

> Choose names that a tired person at midnight would understand.

## Try it

Create variables for your name, age, height and whether you are a student. Print each one with `type()` on the same line. Then calculate your age in months and print it.
