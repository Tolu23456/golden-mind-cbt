# CSS boxes and layout

Every element is a box. Once you see the boxes, layout stops being magic.

## The box model

Each box has four layers, from the inside out:

1. **Content** — the text or image.
2. **Padding** — space inside the border.
3. **Border** — the line around the padding.
4. **Margin** — space outside the border, between this box and others.

```
.card {
  padding: 24px;
  border: 2px solid #e9e2cf;
  margin: 16px 0;
  border-radius: 18px;
}
```

`margin: 16px 0` means 16px top and bottom, 0 left and right. With four values, the order is top, right, bottom, left, like a clock.

## Width and height

```
.card {
  width: 100%;
  max-width: 600px;
}
```

A percentage is relative to the parent. `max-width` stops a box from growing too wide on a large screen. Avoid fixed heights for text boxes; the text may overflow when the font changes.

By default, padding and border are added to the width. Add this near the top of your CSS to include them:

```
* { box-sizing: border-box; }
```

## Display

- `block` elements start on a new line and take the full width: `div`, `p`, `h1`.
- `inline` elements sit in the flow of text: `span`, `a`, `strong`.
- `inline-block` sits in the flow but accepts width and height.
- `none` hides the element completely.

## Flexbox

Flexbox arranges items in one direction.

```
.row {
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
}
```

- `flex-direction: row` is horizontal, `column` is vertical.
- `gap` spaces the items.
- `align-items` controls the cross axis.
- `justify-content` controls the main axis.
- `flex-wrap: wrap` lets items move to the next line on small screens.

## Grid

Grid arranges items in rows and columns.

```
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
```

`1fr` means one share of the available space. `repeat(3, 1fr)` makes three equal columns. Grid is perfect for card layouts and dashboards.

## Centring a box

```
.center {
  max-width: 700px;
  margin-inline: auto;
}
```

`margin-inline` sets the left and right margins. `auto` shares the leftover space equally, so the box sits in the middle.

> If a layout looks wrong, outline every box: `* { outline: 1px solid red; }`. You will instantly see the margins and widths.

## Try it

Build three cards in a grid. Give each one padding, a border, rounded corners and a shadow. Then switch the grid to one column and back again.
