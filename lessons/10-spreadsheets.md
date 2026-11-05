# Spreadsheets

A **spreadsheet** is a grid for numbers. It can add up a shopping list, track exam scores, plan a budget or draw a chart in seconds. Microsoft Excel and Google Sheets are the most common.

## Rows, columns and cells

- **Columns** run up and down and have letters: A, B, C.
- **Rows** run across and have numbers: 1, 2, 3.
- A **cell** is where a column and a row meet. The cell at column B, row 4 is written **B4**.
- The **active cell** is the one with the thick border. Its address appears in the **Name Box** at the top left.

## Types of information

- **Text** is used for names and labels.
- **Numbers** line up on the right and can be calculated.
- **Dates** are stored as numbers underneath, which is why they can be sorted.
- **Currency** shows the money symbol and two decimal places.

If a number lines up on the left, the spreadsheet may think it is text. Remove spaces or letters and re-enter it.

## Your first formula

Every formula starts with `=`. Try this:

```
=A1 + A2
```

That adds the values in cells A1 and A2. A formula can also use functions:

```
=SUM(B2:B10)
```

`SUM` adds everything from B2 to B10. The colon means "all the cells in between".

Other useful functions:

- `=AVERAGE(B2:B10)` — the mean.
- `=MAX(B2:B10)` — the largest value.
- `=MIN(B2:B10)` — the smallest value.
- `=COUNT(B2:B10)` — how many numbers there are.
- `=IF(A1>50,"Pass","Try again")` — choose between two answers.

> Change a number in a cell and every formula that uses it updates automatically. That is the real power of a spreadsheet.

## Fill down and copy

Click a cell, then drag the small square at its bottom-right corner. This **fill handle** copies the formula, changing the row numbers as it goes. You can also press [kbd:Ctrl] + [kbd:C] and [kbd:Ctrl] + [kbd:V], or drag with the mouse.

## A budget example

Put these headings in row 1: `Item`, `Cost`, `Paid`. Fill in a few items, then use `=SUM(B2:B6)` under the costs. Format that cell as currency. Suddenly you can see exactly what you owe.

## Charts

1. Select the data, including the headings.
2. Choose **Insert** then a chart type.
3. Use a **column chart** to compare amounts, a **pie chart** for parts of a whole, and a **line chart** for change over time.
4. Give the chart a clear title and label the axes.

## Sorting and filtering

Select the whole table, then use **Sort** to arrange names from A to Z or scores from highest to lowest. **Filter** hides rows you do not need right now, such as only students in one class.

> Always include the heading row when you sort, and check that every column moves together.

## Saving and sharing

Spreadsheets save as `.xlsx` in Excel and `.csv` for a simple list of values. CSV opens in almost any program but does not keep colours, formulas or charts.

## Try it

Build a weekly food budget with at least six items. Add a total, format it as money, and insert a pie chart showing each item's share.
