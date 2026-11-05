# Debugging

A **bug** is a mistake in a program. **Debugging** is the process of finding and fixing it. Professional programmers spend more time debugging than writing new code, so it is a core skill, not a failure.

## The three kinds of bug

1. **Syntax errors** — the code breaks the language rules. The program will not run. Examples: a missing bracket, a missing colon, a misspelled keyword.
2. **Runtime errors** — the program starts but crashes. Examples: dividing by zero, opening a missing file, using an undefined variable.
3. **Logic errors** — the program runs but gives the wrong answer. These are the hardest, because nothing complains.

## Read the error message

Errors are your friends. They usually tell you:

- The type of error.
- A description.
- The file and line number.

Read the **last line first**, then find the line it points to. Do not scroll to the top.

```
ValueError: invalid literal for int() with base 10: 'ten'
```

This says: you tried to convert the text `'ten'` to an integer. No mystery.

## Use print statements

When the answer is wrong but nothing crashes, show your values.

```python
print("score is", score)
print("type is", type(score))
```

Print before the line that goes wrong, then move the print closer until you find the exact step. Remove the prints when you are done, or use a proper debugger.

In JavaScript:

```javascript
console.log("score", score);
console.log(typeof score);
```

## Work backwards

Start from the wrong result and ask: "What would make this value?" Then check the step that produces it. Keep moving one step back until you find where reality and expectation separate.

## Break the problem in half

If 100 lines are suspect, put a print in the middle. If the value is correct there, the bug is after it. If not, it is before. Repeat. This is binary search applied to debugging.

## The rubber duck

Explain the code out loud, line by line, to a rubber duck, a friend or an empty chair. The act of saying "and here it adds one because..." often reveals the mistake. You do not need an answer from the duck.

## Check your assumptions

Most bugs come from believing something that is not true:

- "This variable is a number." It is text.
- "This list has items." It is empty.
- "The button exists." The script ran before the HTML loaded.
- "This runs once." It is inside a loop.
- "The names match." One has a capital letter.

Log the value and the type. Do not trust memory.

## Simplify

Comment out sections until the program works, then add them back one at a time. Build a tiny example that reproduces the problem. A bug you can reproduce is a bug you can fix.

## Test the edges

Check:

- Empty input.
- Zero.
- A very large number.
- Text where a number is expected.
- A missing file.
- The first and last items.
- Clicking a button twice.

## Keep a debugging log

Write down what you tried. It stops you repeating the same failed idea and helps you see the pattern. Update your notes when you learn something new.

> The bug is never where you are certain it is. Certainty is what stopped you looking there.

## Try it

Take this code and find the bug:

```python
scores = [72, 85, 49]
total = 0

for score in scores:
    total = score

print(total / len(scores))
```

It runs without an error. Explain why the answer is wrong, then fix it.
