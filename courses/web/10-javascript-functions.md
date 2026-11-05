# JavaScript functions

A **function** is a reusable block of code with a name. Write it once, use it many times.

## Declaring a function

```
function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet("Ada"));   // Hello, Ada!
console.log(greet("Bola"));  // Hello, Bola!
```

- `function` starts the declaration.
- `greet` is the name.
- `name` is a **parameter**, a placeholder for a value.
- `"Ada"` is an **argument**, the real value you pass in.
- `return` sends a result back to whoever called the function.

A function without `return` gives back `undefined`.

## Arrow functions

A shorter syntax:

```
const greet = (name) => `Hello, ${name}!`;
const double = (n) => n * 2;
```

With one parameter, the parentheses are optional. With one expression, the braces and `return` are optional.

Arrow functions are common when passing a function to another function:

```
const numbers = [1, 2, 3];
const doubled = numbers.map((n) => n * 2);
```

## Parameters and defaults

```
function area(width, height = width) {
  return width * height;
}

area(4, 5);  // 20
area(4);     // 16, a square
```

Default values keep a function working when an argument is missing.

## A function with a decision

```
function grade(score) {
  if (score >= 70) return "A";
  if (score >= 60) return "B";
  if (score >= 50) return "C";
  return "F";
}
```

Once a `return` runs, the function stops. You do not need an `else` after a return.

## Scope

Variables created inside a function are **local**. They exist only while the function runs.

```
let total = 0;

function add(points) {
  let bonus = 5;      // local
  total = total + points + bonus;  // changes the outer variable
}

add(10);
console.log(total);   // 15
console.log(bonus);   // error: bonus is not defined
```

A function can read outside variables. Changing them is powerful and risky: prefer returning a value and letting the caller decide.

## Pure functions

A good function:

- Does one job.
- Depends only on its parameters.
- Returns a result.
- Does not secretly change other things.

```
function priceWithTax(price, rate) {
  return price * (1 + rate);
}
```

Same inputs, same output. Easy to test.

> If a function name needs the word "and", it probably does two jobs. Split it.

## Try it

Write a function `greet(name)` that returns a greeting. Call it three times with different names and log the results. Then write `isPass(score)` that returns `true` or `false`, and use it inside an `if`.
