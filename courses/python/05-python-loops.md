# Loops

A **loop** repeats code. Without loops, printing the numbers 1 to 100 would take a hundred lines.

## for and range

```python
for number in range(5):
    print(number)
```

Output: `0 1 2 3 4`. `range(5)` gives five values, starting at 0 and stopping before 5.

```python
for number in range(1, 6):
    print(number)       # 1 2 3 4 5
```

Two arguments mean start and stop. A third argument is the step.

```python
for number in range(2, 11, 2):
    print(number)       # 2 4 6 8 10
```

`range(10, 0, -1)` counts down.

## Looping over text

```python
for letter in "Python":
    print(letter)
```

A string is a sequence of characters, so you can loop over it directly.

## Looping over a list

```python
fruits = ["mango", "orange", "guava"]

for fruit in fruits:
    print(f"I like {fruit}")
```

## while

`while` repeats as long as a condition is true.

```python
count = 0

while count < 5:
    print(count)
    count += 1
```

Do not forget to change the variable. Otherwise the loop never ends.

```python
while True:
    answer = input("Type 'quit' to stop: ")
    if answer == "quit":
        break
    print(f"You typed {answer}")
```

`break` leaves the loop immediately. A `while True` loop with a clear `break` is a common and readable pattern for menus.

## continue

`continue` skips the rest of the current round and moves to the next one.

```python
for number in range(1, 8):
    if number % 2 == 0:
        continue
    print(number)
```

This prints only the odd numbers.

## else on a loop

Python allows an `else` after a loop. It runs when the loop finishes without hitting `break`.

```python
for name in names:
    if name == "Ada":
        print("Found Ada")
        break
else:
    print("Ada is not in the list")
```

It is handy, but use it only when the meaning is obvious to a reader.

## Nested loops

```python
for row in range(1, 4):
    for column in range(1, 4):
        print(f"{row * column:3}", end=" ")
    print()
```

This prints a small multiplication table. The inner loop finishes completely for each round of the outer loop.

## Choosing the right loop

- Know how many times? Use `for` with `range`.
- Loop over items? Use `for` over the collection.
- Repeat until something happens? Use `while`.
- Searching and want to stop early? Use `break`.

> If a loop runs forever, look for the line that should change the condition. In a `while` loop, that line is often missing.

## Try it

Write a loop that prints the 7 times table from 1 to 12. Then change it so it skips the answer 35 and stops after 84.
