# How computers think

A computer is fast, obedient and completely literal. It does not understand your intention; it follows instructions exactly.

## The four parts

- **Input** — keyboards, mice, touch screens, microphones and sensors bring information in.
- **Processing** — the **CPU** (central processing unit) carries out instructions.
- **Memory** — **RAM** holds the current work. **Storage** keeps files when the power is off.
- **Output** — screens, speakers and printers show results.

A useful picture: the CPU is the cook, RAM is the counter where ingredients sit while cooking, and storage is the cupboard.

## Instructions

The CPU understands a small set of simple commands, such as:

- Copy a value from memory.
- Add two numbers.
- Compare two values.
- Jump to another instruction if a condition is true.
- Move a value back to memory.

Everything else, from a video to a spreadsheet, is built from enormous numbers of these small steps.

## The fetch-decode-execute cycle

The CPU repeats three steps millions of times per second:

1. **Fetch** the next instruction from memory.
2. **Decode** what it means.
3. **Execute** it.

Then it moves to the next instruction, unless a jump sends it elsewhere. The clock speed, measured in gigahertz, is roughly how many cycles happen each second.

## Programs are data

A program is a list of instructions stored in memory, just like a document. The CPU does not know whether a value is text, an image or an instruction. The program decides how to treat it.

This is powerful and dangerous: a bug can make the computer treat data as code.

## Layers

Computers are built in layers:

- **Hardware** — transistors, wires, chips.
- **Machine code** — the CPU's own instructions.
- **Operating system** — manages memory, files and devices.
- **Programs** — browsers, games, editors.
- **What you see** — a page, a photo, a score.

Each layer hides the complexity below it. You do not need to know how a transistor works to write a web page.

## Why this matters

- Programs must be **precise**. A missing step or a wrong order changes the result.
- Computers do not get bored. A loop that repeats a million times is normal.
- Computers make mistakes only when the instructions or the data are wrong.
- Speed comes from doing simple things very fast, and from choosing fewer steps.

> A computer is a very fast idiot. Your job is to be the careful thinker.

## Try it

Write the steps to make a cup of tea as if for a machine that knows nothing. Include opening the cupboard, filling the kettle and waiting. Then find one step you assumed a human would know. That missing step is the kind of detail programming demands.
