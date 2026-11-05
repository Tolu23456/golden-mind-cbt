# Binary and bits

Computers store everything as **binary**: patterns of two states, on and off, 1 and 0.

## Why only two states?

Inside a chip, a wire is either carrying a voltage or it is not. Two states are easy to build reliably, even when power fluctuates or components heat up. With many wires, two states are enough to represent any number or symbol.

## Bits and bytes

- A **bit** is one 0 or 1.
- A **byte** is 8 bits.
- A **kilobyte** is about 1,000 bytes.
- A **megabyte** is about 1,000 kilobytes.
- A **gigabyte** is about 1,000 megabytes.

Strictly, 1 KB is 1,024 bytes (2 to the power 10), but storage makers often use 1,000. That is why a "64 GB" phone shows less space than you expect.

## Counting in binary

Decimal uses ten digits. Binary uses two. Each position is a power of two.

```
Decimal    Binary
0          0
1          1
2          10
3          11
4          100
5          101
6          110
7          111
8          1000
```

Read `101` from the right: 1 × 1 plus 0 × 2 plus 1 × 4 = 5.

Eight bits can represent values from 0 to 255. That gives 256 combinations, because 2 to the power 8 is 256.

## Text

Each character is stored as a number using a code.

- **ASCII** maps the basic English letters and symbols to numbers 0 to 127. `A` is 65, `a` is 97, and the space is 32.
- **Unicode** (usually encoded as **UTF-8**) covers almost every writing system, including Yoruba, Hausa and Igbo characters.

```
H   e   l   l   o
72  101 108 108 111
```

## Images

An image is a grid of pixels. Each pixel stores colour values, often one byte each for red, green and blue. A 1000 by 1000 image has one million pixels, so it needs about three million bytes before compression.

## Sound and video

Sound is sampled thousands of times per second. Each sample is a number. Video is a series of images plus sound, compressed by finding parts that do not change.

## Compression

- **Lossless** compression keeps every detail. A ZIP file is lossless.
- **Lossy** compression throws away detail the eye or ear may not notice. JPG and MP3 are lossy.

That is why saving a JPG again and again slowly damages it.

## Logic gates

Binary values also power logic. Three basic gates:

- **AND** — true only when both inputs are true.
- **OR** — true when at least one input is true.
- **NOT** — flips true to false.

Modern chips contain billions of tiny gates built from transistors. A computer is, at the bottom, an enormous arrangement of on/off switches.

> Every photo, song, message and program is a pattern of bits. The meaning comes from how we agree to read them.

## Try it

Convert these binary numbers to decimal: `10`, `111`, `1010`, `11111111`. Then write your first initial in binary using its ASCII value. Show your working.
