# JavaScript decisions

Programs become useful when they can choose. JavaScript chooses with `if`, `else if` and `else`.

## Comparisons

```
5 > 3        // true
5 < 3        // false
5 >= 5       // true
5 === 5      // true
5 !== 3      // true
```

Use `===` and `!==` (three characters) for equality. They compare value **and** type. The older `==` converts types first and causes surprises such as `"5" == 5` being true. Avoid it.

## The if statement

```
let score = 72;

if (score >= 50) {
  console.log("Pass");
} else {
  console.log("Try again");
}
```

The condition goes in parentheses. The code to run goes in braces. If the condition is true, the first block runs; otherwise the `else` block runs.

## Several choices

```
if (score >= 70) {
  grade = "A";
} else if (score >= 60) {
  grade = "B";
} else if (score >= 50) {
  grade = "C";
} else {
  grade = "F";
}
```

JavaScript checks from top to bottom and stops at the first true condition. Order matters: put the highest score first.

## Combining conditions

```
if (age >= 18 && hasId) {
  console.log("You may enter");
}
if (isWeekend || isHoliday) {
  console.log("No school today");
}
if (!isLoggedIn) {
  console.log("Please log in");
}
```

- `&&` means **and**; both sides must be true.
- `||` means **or**; at least one side must be true.
- `!` means **not**; it flips a boolean.

## Truthiness

Some values behave like false in a condition: `false`, `0`, `""`, `null`, `undefined` and `NaN`. Everything else is truthy, including the string `"0"`.

```
if (name) {
  console.log("Hello, " + name);
}
```

This is a neat way to check that a value exists. Be careful: `0` is a valid number but falsy, so check `score !== 0` when zero matters.

## The switch statement

When you compare one value with many fixed options, `switch` can be clearer.

```
switch (day) {
  case "Saturday":
  case "Sunday":
    console.log("Weekend");
    break;
  default:
    console.log("School day");
}
```

Do not forget `break`, or the code falls through to the next case.

## Ternary operator

A short if/else can be an expression.

```
const status = score >= 50 ? "Pass" : "Fail";
```

Use it for simple choices only. Nested ternaries are hard to read.

> A condition should be a yes/no question. If you cannot say it out loud simply, split it into two conditions.

## Try it

Write a program that stores a score and logs a grade. Then add a condition that logs "Excellent" when the score is 90 or more. Test with several values.
