# Problem solving

Programming is problem solving with a computer as the tool. The same habits work for maths, school projects and everyday life.

## Step 1: Understand the problem

Before writing anything, answer:

- What is the input?
- What is the output?
- What are the rules and limits?
- What counts as a correct answer?
- What should happen in unusual cases?

A surprising number of bugs are solutions to the wrong problem.

## Step 2: Break it down

**Decomposition** means splitting a big problem into smaller ones you know how to solve.

"Build a quiz app" becomes:

1. Store the questions.
2. Show one question.
3. Read the answer.
4. Check the answer.
5. Keep the score.
6. Show the result.

Each piece is small enough to test on its own. When the pieces work, join them.

## Step 3: Look for patterns

**Pattern recognition** means noticing that a new problem is like one you have already solved.

- Counting votes and counting words both need a dictionary of counts.
- Finding the highest score and finding the lowest score differ by one comparison.
- Every form needs validation and a clear error message.

Reuse the idea, not blindly the code. The details may differ.

## Step 4: Ignore what does not matter

**Abstraction** means hiding detail so you can think at the right level. A map does not show every tree. A function called `is_pass(score)` hides the comparison inside a meaningful name.

Good abstractions make a program read like a story:

```python
score = run_quiz(questions)
show_result(score, len(questions))
```

You can understand that without knowing how `run_quiz` works.

## Step 5: Write the steps

Use pseudocode or a flowchart. Include the awkward cases:

- What if the list is empty?
- What if the user types letters?
- What if two items are equal?
- What if the file is missing?

## Step 6: Build small, test often

Write the smallest version that does something. Run it. Then add one piece and run again. A bug is easy to find when you changed one thing.

Testing is not the last step. It runs alongside building.

## Step 7: Improve

Once it works, make it clearer, faster or safer. Working code that nobody can read is a future problem.

Questions to ask:

- Can I rename something to make it obvious?
- Can I remove duplication?
- Is there an edge case I ignored?
- Is the output friendly to a real person?

## A worked example

Problem: a shop gives a 10% discount when a customer spends N20,000 or more. Calculate the total.

1. **Input**: the prices of the items.
2. **Output**: the final amount.
3. **Rule**: sum the prices; if the sum is at least 20,000, take off 10%.
4. **Edge cases**: no items; exactly 20,000; a negative price.
5. **Steps**:

```
SET total = sum of prices
IF total >= 20000 THEN
    SET discount = total * 0.10
    SET total = total - discount
END IF
RETURN total
```

6. **Test**: 15,000 gives 15,000. 20,000 gives 18,000. 25,000 gives 22,500.
7. **Improve**: reject negative prices with a clear message.

## Habits that help

- Read the problem twice.
- Write the expected result before the code.
- Test one change at a time.
- Explain your solution out loud.
- When stuck, take a short break and come back.
- Ask a precise question: "Why is this value None?" not "It doesn't work".

> A programmer is not someone who never gets stuck. A programmer is someone who has a method for getting unstuck.

## Try it

Plan a program that takes a list of exam scores and reports the highest, lowest and average, plus how many students passed. Write the input, output, rules and edge cases first. Then write pseudocode. Only then write real code.
