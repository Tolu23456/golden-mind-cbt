# JavaScript variables

HTML and CSS make a page. **JavaScript** makes it think.

A **variable** is a named box that stores a value.

```
let score = 0;
const name = "Ada";
```

- `let` creates a variable whose value can change.
- `const` creates a variable that cannot be reassigned.
- Use `const` by default, and `let` only when you need to change the value.

## Values and types

```
let age = 16;              // number
let title = "Student";     // string
let passed = true;         // boolean
let nothing = null;        // empty on purpose
let unknown;               // undefined
```

JavaScript is **dynamically typed**: a variable can hold any type, and you do not declare the type. The type belongs to the value.

## Strings

A string is text inside quotes. Single and double quotes both work.

```
let first = "Ada";
let last = 'Okafor';
let full = first + " " + last;
```

**Template literals** use backticks and let you insert values with `${}`.

```
let greeting = `Hello, ${first}! You are ${age} years old.`;
```

This is usually clearer than gluing strings with `+`.

## Numbers and maths

```
let total = 10 + 5;      // 15
let change = 20 - 7;     // 13
let groups = 12 / 3;     // 4
let remainder = 10 % 3;  // 1
```

`%` is the remainder, not a percentage. It is useful for checking even and odd numbers.

## Changing a value

```
let score = 0;
score = score + 10;
score += 5;      // same as score = score + 5
score++;         // add one
```

`const` would refuse all of those reassignments.

## Naming

- Use camelCase: `firstName`, `totalScore`.
- Start with a letter, `_` or `$`.
- Be descriptive: `examScore` is better than `x`.
- JavaScript is case-sensitive: `score` and `Score` are different.

## Seeing your values

```
console.log("score is", score);
```

Open the browser console with [kbd:F12] and choose Console. `console.log` is the programmer's torch.

> If a value surprises you, log it. Guessing is slower than looking.

## Scope in one minute

A variable created inside a block `{ ... }` with `let` or `const` exists only inside that block. Avoid `var`; it has old, confusing rules.

## Try it

In the Code Lab JavaScript tab, create `const name`, `let score = 0`, add 10 and then 5, and log a template literal such as `Ada has 15 points`. Check the console and the preview.
