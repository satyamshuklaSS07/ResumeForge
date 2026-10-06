# ResumeForge — Interactive Resume Builder

A polished, responsive resume builder made with **HTML5, CSS3 and vanilla JavaScript**.

## Features

- Live resume preview on every input event
- Personal information, education, experience and projects
- Add/remove dynamic entries
- Skills as reusable tags
- Profile photo upload
- LocalStorage auto-save
- Completion percentage
- Sample resume data
- Clear/reset action
- Print stylesheet for **Print / Save as PDF**
- Responsive editor + resume preview layout
- No framework or backend required

## Run locally

1. Download/clone the repository.
2. Open `index.html` in a browser.

For VS Code, you can use the Live Server extension for a smoother development workflow.

## Suggested GitHub description

**ResumeForge — Interactive Resume Builder | Live Preview + PDF Ready**

## Tech Stack

HTML5 · CSS3 · JavaScript · LocalStorage · Print CSS

## Interview questions

1. **How would you implement a live preview from form data?**  
   Attach `input` event listeners to the form, read current field values, and update the corresponding preview DOM elements immediately.

2. **How do print stylesheets differ from screen stylesheets?**  
   Print CSS hides editor controls and navigation, removes shadows/background UI, sets an A4 page size and optimizes spacing for paper/PDF.

3. **How do you allow dynamic addition/removal of experience entries?**  
   Use an HTML `<template>` for a reusable entry card. JavaScript clones it, appends it to the list, and attaches a remove button listener.

4. **Why use LocalStorage?**  
   It keeps resume data in the browser so the user's work survives refreshes without requiring a backend.

## Project structure

```text
interactive-resume-builder/
├── index.html
├── style.css
├── script.js
└── README.md
```
