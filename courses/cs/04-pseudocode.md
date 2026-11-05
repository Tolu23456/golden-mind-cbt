# Pseudocode

**Pseudocode** is a way to write an algorithm in plain language with a little structure. It is not a programming language and does not run. Its job is to let you think clearly before you type real code.

## Why use it?

- You can focus on the logic without fighting syntax.
- Other people can read and check it.
- It works as a plan when you translate to Python, JavaScript or anything else.
- It exposes missing steps early, when fixing them is cheap.

## The basic keywords

```
START
  get input
  IF condition THEN
      do something
  ELSE
      do something else
  END IF
  FOR each item IN list DO
      process item
  END FOR
  WHILE condition DO
      repeat
  END WHILE
  RETURN result
END
```

These words are conventions, not rules. The important thing is that the meaning is clear and the structure is consistent.

## Example: a pass check

```
START
  READ score
  IF score >= 50 THEN
      PRINT "Pass"
  ELSE
      PRINT "Try again"
  END IF
END
```

## Example: average of a list

```
START
  SET total = 0
  FOR each score IN scores DO
      SET total = total + score
  END FOR
  IF scores is empty THEN
      RETURN 0
  END IF
  SET average = total / length of scores
  RETURN average
END
```

Notice the empty-list check. A careful algorithm handles the awkward case, not just the normal one.

## Example: a login check

```
START
  READ username, password
  IF username is empty OR password is empty THEN
      PRINT "Please fill in both fields"
      STOP
  END IF
  LOOK UP user by username
  IF user does not exist THEN
      PRINT "Wrong username or password"
      STOP
  END IF
  IF password does not match THEN
      PRINT "Wrong username or password"
      STOP
  END IF
  PRINT "Welcome"
END
```

The two error messages are deliberately identical, so an attacker cannot learn which usernames exist.

## Flowcharts

A flowchart draws the same logic with shapes:

- Oval — start or end.
- Rectangle — a step.
- Diamond — a decision with yes/no branches.
- Parallelogram — input or output.
- Arrow — the direction of flow.

Flowcharts are good for showing loops and branches to a non-programmer.

## Common mistakes

- **Vague steps**: "handle the data" is not a step.
- **No stopping condition**: the algorithm never ends.
- **Missing cases**: what if the list is empty, or the number is zero?
- **Mixing levels**: one step says "add two numbers" and the next says "build the app".
- **Assuming order**: steps happen in the order written unless you say otherwise.

## From pseudocode to code

```
FOR each score IN scores DO
    SET total = total + score
END FOR
```

becomes Python:

```python
total = 0
for score in scores:
    total += score
```

and JavaScript:

```javascript
let total = 0;
for (const score of scores) {
  total += score;
}
```

The thinking happened in pseudocode. The translation is mechanical.

> Write pseudocode as if you are explaining the solution to a smart friend who is not a programmer. If they can follow it, the computer can too.

## Try it

Write pseudocode for a program that asks for five scores, finds the highest and prints whether it is a pass. Include the case where a user enters something that is not a number.
