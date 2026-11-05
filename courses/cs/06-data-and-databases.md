# Data and databases

**Data** is raw facts: a name, a score, a date. **Information** is data arranged to answer a question: "Who passed?" "Which class has the best average?"

## From list to table

A class register is a table.

| id | name | class | score |
|---|---|---|---|
| 1 | Ada | JSS2 | 87 |
| 2 | Bola | JSS2 | 64 |
| 3 | Chika | JSS1 | 49 |

- Each **row** is one record: one student.
- Each **column** is one field: one property.
- A **cell** is one value.

## Keys

A **primary key** uniquely identifies a row. Here, `id` is the primary key. No two students share an id, even if they share a name.

A **foreign key** points to a row in another table. A `class_id` column in the student table could point to the class table. This avoids repeating the class details in every student row.

## Why not one giant sheet?

Repeating data causes problems:

- It wastes space.
- It is easy to update one copy and forget another.
- It is hard to enforce rules.

Splitting related data into separate tables is called **normalisation**. Each fact lives in one place.

## Spreadsheet or database?

Use a **spreadsheet** for:

- A quick calculation.
- A small list you edit by hand.
- A one-off report or chart.

Use a **database** for:

- Many users and many records.
- Rules that must always hold.
- Fast searching and updating.
- Applications where data changes all the time.

A spreadsheet is a calculator that keeps its numbers. A database is a filing system with rules.

## Queries

A **query** asks a question of the data. In SQL, the language of relational databases:

```sql
SELECT name, score
FROM students
WHERE score >= 50
ORDER BY score DESC;
```

Read it as: show the name and score, from the students table, where the score is at least 50, highest first.

Other useful commands:

```sql
INSERT INTO students (name, class, score)
VALUES ('Dayo', 'JSS2', 71);

UPDATE students
SET score = 90
WHERE id = 1;

DELETE FROM students
WHERE id = 3;
```

> `WHERE` is essential. An `UPDATE` or `DELETE` without it changes **every** row. Back up before experimenting.

## Indexes

An **index** is a sorted structure that makes lookups fast, like the index at the back of a book. It speeds up reads but takes space and slows down writes. Add indexes to columns you search often.

## Data quality

- **Accuracy** — is the value correct?
- **Completeness** — are required fields filled?
- **Consistency** — is the same fact stored the same way?
- **Timeliness** — is it up to date?

A database full of wrong data is worse than no database, because people trust it.

## Privacy and ethics

Collect only what you need. Protect it with strong access control. Tell people how it will be used. Delete it when it is no longer needed. In many countries, data protection law makes this a legal duty, not a favour.

## Try it

Design a table for a school library with columns for book id, title, author and whether it is borrowed. Choose a primary key. Then write a query that lists the borrowed books in title order.
