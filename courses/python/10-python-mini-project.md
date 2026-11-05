# Mini project: a quiz game

Let us combine everything from this course into one small program. It asks questions, checks answers and keeps a score.

## Step 1: Store the questions

A list of dictionaries keeps each question with its answer.

```python
questions = [
    {
        "question": "What does HTML do?",
        "answer": "structure"
    },
    {
        "question": "Which symbol starts a CSS rule?",
        "answer": "."
    },
    {
        "question": "What keyword creates a function in Python?",
        "answer": "def"
    }
]
```

## Step 2: Ask and score

```python
score = 0

for item in questions:
    print(item["question"])
    reply = input("Your answer: ").strip().lower()

    if reply == item["answer"]:
        print("Correct!")
        score += 1
    else:
        print(f"Not quite. The answer is {item['answer']}.")

    print()
```

`.strip()` removes spaces from the ends. `.lower()` makes the comparison ignore capitals, so "Structure" and "structure" both count.

## Step 3: Show the result

```python
total = len(questions)
print(f"Your score: {score}/{total}")

if score == total:
    print("Perfect score!")
elif score >= total / 2:
    print("Good work. Keep practising.")
else:
    print("Read the lessons again and try once more.")
```

## Step 4: Make it reusable with functions

Long programs become easier when each job has a name.

```python
def ask(item):
    """Ask one question and return 1 for correct, 0 for wrong."""
    print(item["question"])
    reply = input("Your answer: ").strip().lower()

    if reply == item["answer"]:
        print("Correct!")
        return 1

    print(f"Not quite. The answer is {item['answer']}.")
    return 0


def run_quiz(questions):
    score = 0
    for item in questions:
        score += ask(item)
        print()
    return score


def show_result(score, total):
    print(f"Your score: {score}/{total}")
    if score == total:
        print("Perfect score!")
    elif score >= total / 2:
        print("Good work. Keep practising.")
    else:
        print("Read the lessons again and try once more.")


score = run_quiz(questions)
show_result(score, len(questions))
```

Read `run_quiz`: for each question, add the result of `ask` to the score. The function returns the total. `show_result` only prints.

## Step 5: Improve it

Pick one improvement and finish it.

1. **Shuffle the questions** so the order changes each time. Import `random` and use `random.shuffle(questions)`.
2. **Allow two attempts** before revealing the answer.
3. **Save the best score** to a file called `best.txt`. Read it at the start and write it only when the new score is higher.
4. **Add more questions**, including some from the other courses on this site.
5. **Give feedback** such as "Close" when the answer is one letter away.

## Step 6: Test it

- Answer everything correctly.
- Answer everything wrongly.
- Type spaces before and after an answer.
- Type capitals when the answer is lowercase.
- Run it twice to check that it starts cleanly.

> A project is finished when a stranger can run it without you. Clear names and short functions get you there.

## Challenge

Rewrite the quiz so the questions come from `questions.txt`, one line per question in the form `question|answer`. Handle a missing file with `try`/`except` and print a helpful message.
