# Algorithms

An **algorithm** is a finite set of clear steps that solves a problem. It is the idea behind the code, independent of the language.

A recipe is an algorithm: ingredients in, cake out. A directions app uses an algorithm to find a short route.

## What makes a good algorithm

1. **Clear** — each step has one meaning.
2. **Finite** — it stops after a limited number of steps.
3. **Correct** — it produces the right result for valid input.
4. **General** — it works for many inputs, not just one example.
5. **Efficient** — it does not waste time or memory.

## A first example: linear search

Problem: find a name in a list.

```
For each name in the list:
    If the name matches the target:
        Return its position
Move to the next name
If the list ends with no match:
    Return "not found"
```

This checks items one by one. It is simple and always works. With a list of a million names, it may take a million checks.

## A better example: binary search

If the list is **sorted**, you can do much better.

```
Look at the middle item
If it is the target, stop
If the target is smaller, search the left half
If the target is larger, search the right half
Repeat until found or the half is empty
```

Each check removes half the remaining items. A million names take about 20 checks instead of a million. That is the difference between a good algorithm and a bad one.

The catch: binary search needs sorted data. Sorting has its own cost.

## Sorting

Sorting is a classic problem. A simple method is **selection sort**:

```
Find the smallest item
Swap it with the first item
Find the smallest of the rest
Swap it with the second item
Continue until the list is sorted
```

It is easy to understand but slow on large lists. Faster algorithms such as merge sort divide the list in half, sort each half and merge them.

## Measuring efficiency

We often describe cost with **Big O notation**, which shows how work grows as the input grows.

- **O(1)** — constant. Finding the first item.
- **O(log n)** — halving each time. Binary search.
- **O(n)** — one step per item. Linear search.
- **O(n²)** — a loop inside a loop. Selection sort.

A small difference in growth becomes enormous at scale. O(n²) on 1,000 items is about one million steps; on 10,000 items it is about one hundred million.

## Algorithms are everywhere

- Route planning uses shortest-path algorithms.
- Compression finds repeating patterns.
- Recommendation systems rank items by predicted interest.
- Sorting arranges search results.
- Encryption transforms data so only the right key can read it.

> A program is an algorithm written in a language. Get the steps right before you worry about the syntax.

## Try it

Write the steps to find the largest number in a list of ten numbers. Then write the steps to find the second largest. Which one needs more careful thinking?
