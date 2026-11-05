# Input and output

A program that cannot talk to its user is a calculator. **Input** lets the user send values in; **output** shows results.

## print

```python
print("Hello")
print("Score:", 87)
print("A", "B", "C", sep="-")
```

`print()` can take several values and separates them with a space by default. `sep` changes the separator. `end` changes what is printed at the end; normally it is a new line.

```python
print("Loading", end="")
print("...")
```

Output: `Loading...`

## input

```python
name = input("What is your name? ")
print("Hello, " + name)
```

`input()` shows the prompt and waits. Whatever the user types comes back as a **string**. Always.

```python
age = input("Your age: ")
print(age + 1)
```

That last line raises a `TypeError`, because `age` is text. Convert it:

```python
age = int(input("Your age: "))
print(age + 1)
```

For decimals, use `float()`. For text, no conversion is needed.

## f-strings

The clearest way to build output is an f-string. Put `f` before the quotes and insert variables in braces.

```python
name = "Ada"
score = 87
print(f"{name} scored {score}%.")
```

You can format numbers inside the braces.

```python
price = 2500
print(f"Total: N{price:,.2f}")
```

`:,` adds thousands separators and `.2f` shows two decimal places. Output: `Total: N2,500.00`.

## A complete example

```python
name = input("Your name: ")
score = int(input("Your score: "))

if score >= 50:
    result = "Pass"
else:
    result = "Try again"

print(f"{name}, you scored {score}. Result: {result}.")
```

Read it from the top: ask, convert, decide, print.

## Validating input

Users type surprising things. Check before you convert or calculate.

```python
text = input("Enter a number: ")

if text.isdigit():
    number = int(text)
    print(number * 2)
else:
    print("That is not a whole number.")
```

`isdigit()` returns `True` only when every character is a digit. It rejects negative numbers and decimals, so use `try`/`except` for more flexibility (you will meet it later).

> Never trust input. A program should explain the problem instead of crashing.

## Try it

Write a program that asks for a name and a score, then prints a sentence using an f-string. If the score is 50 or more, add "Well done"; otherwise add "Keep practising".
