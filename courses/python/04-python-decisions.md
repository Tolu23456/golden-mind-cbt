# Decisions

Programs make choices with `if`, `elif` and `else`.

## A simple if

```python
score = 72

if score >= 50:
    print("Pass")
```

The condition ends with a colon. The block below is indented. If the condition is true, the block runs; if not, Python skips it.

## if and else

```python
if score >= 50:
    print("Pass")
else:
    print("Try again")
```

Exactly one of the two blocks runs.

## Several branches

```python
if score >= 70:
    grade = "A"
elif score >= 60:
    grade = "B"
elif score >= 50:
    grade = "C"
else:
    grade = "F"

print(f"Grade: {grade}")
```

Python checks from top to bottom and stops at the first true condition. Put the highest score first, or `score >= 50` would catch everything and the later branches would never run.

`elif` is short for "else if". You can have as many as you need.

## Comparison operators

```python
5 > 3       # True
5 < 3       # False
5 >= 5      # True
5 <= 4      # False
5 == 5      # True
5 != 3      # True
```

`==` compares; `=` assigns. Mixing them up is a common beginner bug.

## Combining conditions

```python
age = 20
has_id = True

if age >= 18 and has_id:
    print("You may enter")

if is_weekend or is_holiday:
    print("No school")

if not is_logged_in:
    print("Please log in")
```

- `and` — both must be true.
- `or` — at least one must be true.
- `not` — reverses a boolean.

Python also allows this readable form:

```python
if 18 <= age < 60:
    print("Adult")
```

## Truthiness

These values count as false: `False`, `0`, `0.0`, `""`, `[]`, `{}` and `None`. Everything else counts as true.

```python
name = input("Name: ")

if name:
    print(f"Hello, {name}")
else:
    print("You did not type a name")
```

## Nesting

You can put an `if` inside another `if`, but deep nesting is hard to read.

```python
if is_student:
    if score >= 50:
        print("Pass")
```

Often `and` is clearer:

```python
if is_student and score >= 50:
    print("Pass")
```

## Match

Modern Python has `match` for comparing one value with fixed options.

```python
match day:
    case "Saturday" | "Sunday":
        print("Weekend")
    case _:
        print("School day")
```

`_` is the default case.

> Write conditions as clear yes/no questions. If you cannot explain one out loud, break it into smaller pieces.

## Try it

Write a program that asks for a score and prints a grade using `if`/`elif`/`else`. Then add a rule: a score above 100 is invalid.
