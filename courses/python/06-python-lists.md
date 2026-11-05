# Lists

A **list** holds several values in order. It is Python's everyday collection.

```python
fruits = ["mango", "orange", "guava"]
scores = [72, 85, 49]
mixed = ["Ada", 16, True]
```

Square brackets create a list. Commas separate the items. A list can hold any type, including other lists.

## Indexing

Each item has a position called an **index**. Counting starts at 0.

```python
fruits = ["mango", "orange", "guava"]

print(fruits[0])    # mango
print(fruits[1])    # orange
print(fruits[-1])   # guava, the last item
```

Negative indexes count from the end. Asking for an index that does not exist raises an `IndexError`.

## Slicing

A slice copies part of the list.

```python
numbers = [10, 20, 30, 40, 50]

print(numbers[1:4])   # [20, 30, 40]
print(numbers[:2])    # [10, 20]
print(numbers[3:])    # [40, 50]
```

The first number is included and the second is excluded. That is why `1:4` gives items 1, 2 and 3.

## Changing a list

```python
fruits = ["mango", "orange"]

fruits.append("guava")      # add to the end
fruits.insert(0, "apple")   # add at the start
fruits[1] = "banana"        # replace an item
fruits.remove("orange")     # remove by value
last = fruits.pop()         # remove and return the last item
```

`append` is the one you will use most.

## Length and membership

```python
print(len(fruits))            # 4
print("mango" in fruits)      # True
print("rice" not in fruits)   # True
```

## Sorting

```python
scores = [72, 85, 49]

scores.sort()                 # changes the list, ascending
scores.sort(reverse=True)     # descending
copy_sorted = sorted(scores)  # returns a new list
```

`sort()` changes the original list. `sorted()` returns a new one.

## Looping over a list

```python
for fruit in fruits:
    print(fruit)
```

To get the index as well:

```python
for index, fruit in enumerate(fruits):
    print(index, fruit)
```

## Useful helpers

```python
scores = [72, 85, 49]

print(sum(scores))       # 206
print(max(scores))       # 85
print(min(scores))       # 49
print(sum(scores) / len(scores))  # average
```

## List comprehensions

A short way to build a list from a loop.

```python
scores = [72, 85, 49]
passed = [score for score in scores if score >= 50]
print(passed)           # [72, 85]
```

Read it as "a list of score, for each score in scores, if score is at least 50".

## Lists are mutable

```python
a = [1, 2, 3]
b = a
b.append(4)
print(a)        # [1, 2, 3, 4]
```

`b = a` does not copy the list. Both names point to the same list. To copy:

```python
b = a.copy()
```

> A list is a container, not a value. When two names point to the same container, a change through one name appears through the other.

## Try it

Make a list of five scores. Print the highest, the lowest and the average. Then build a new list containing only the scores of 50 or more.
