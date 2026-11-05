# Dictionaries

A **dictionary** stores values under named keys instead of numbered positions.

```python
student = {
    "name": "Ada",
    "age": 16,
    "score": 87
}
```

Curly braces create the dictionary. Each entry is `key: value`, separated by commas. Keys are usually strings; values can be anything.

## Reading values

```python
print(student["name"])     # Ada
print(student["score"])    # 87
```

Using a key that does not exist raises a `KeyError`. To avoid that, use `get()`.

```python
print(student.get("school"))          # None
print(student.get("school", "Unknown"))  # Unknown
```

## Adding and changing

```python
student["school"] = "Golden Mind"   # add
student["score"] = 90               # change
del student["age"]                  # remove
```

Dictionaries are **mutable**. You can grow and shrink them.

## Checking for a key

```python
if "score" in student:
    print("Score exists")
```

`in` checks keys, not values.

## Looping

```python
for key in student:
    print(key, student[key])
```

A cleaner way:

```python
for key, value in student.items():
    print(f"{key}: {value}")
```

Other views:

```python
print(student.keys())     # all keys
print(student.values())   # all values
```

## A list of dictionaries

This is how real data is usually stored: one dictionary per record.

```python
students = [
    {"name": "Ada", "score": 87},
    {"name": "Bola", "score": 64},
    {"name": "Chika", "score": 49}
]

for student in students:
    print(f"{student['name']}: {student['score']}")
```

Inside the f-string, use single quotes for the dictionary key so they do not clash with the double quotes outside.

## Counting with a dictionary

```python
votes = ["yes", "no", "yes", "yes", "no"]
counts = {}

for vote in votes:
    counts[vote] = counts.get(vote, 0) + 1

print(counts)     # {'yes': 3, 'no': 2}
```

`counts.get(vote, 0)` returns 0 when the key is new, then we add one.

## Nesting

```python
school = {
    "name": "Golden Mind",
    "classes": ["JSS1", "JSS2"],
    "head": {"name": "Mrs Bello", "phone": "0803 000 0000"}
}

print(school["head"]["name"])     # Mrs Bello
print(school["classes"][0])       # JSS1
```

Read nested values one step at a time.

## Dictionary or list?

- Use a **list** when order matters and you find items by position.
- Use a **dictionary** when you find items by name.

> If you are writing `student[0]` and cannot remember what 0 means, a dictionary key such as `student["name"]` is probably better.

## Try it

Create a dictionary for yourself with `name`, `school`, `level` and a list of three skills. Print it as a short profile using `items()`. Then add a `goal` key and print the updated profile.
