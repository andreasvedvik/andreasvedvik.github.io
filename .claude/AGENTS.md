# AGENTS.md - Rules for Claude on Hjemmeside

> **Read this file at the start of every session.**

---

## Project Identity

**Hjemmeside** is Andreas Vedvik's personal actor portfolio website (andreasvedvik.com). A static single-page website showcasing acting work, CV, and contact information.

**Tech Stack:** Static HTML, CSS (inline), minimal JavaScript

---

## Core Rules

### 1. Read Before Acting
- Always read `.claude/tasklist.md` and `.claude/assessment.md` before starting work
- Check `index.html` - it's the main (and only) page
- Never make claims about code without reading the actual files first

### 2. Track All Work
- Every fix/feature gets an ID: `HS-XXXX`
- Update `tasklist.md` when starting and completing work
- Document root cause and verification in `assessment.md`

### 3. Verify Changes
- Check HTML validity
- Test responsive design (mobile, tablet, desktop)
- Verify SEO meta tags and structured data

### 4. Minimal Diffs
- Fix root causes, not symptoms
- Avoid refactoring unrelated code
- Keep changes focused and reviewable

### 5. Respect the Codebase
- Norwegian language for all visible text
- Maintain SEO optimization (meta tags, JSON-LD)
- Keep the single-file architecture (no separate CSS/JS files)
- Preserve accessibility features

---

## Task Priorities

| Priority | Meaning | Examples |
|----------|---------|----------|
| **P0** | Critical - site broken | Page doesn't load, broken links, missing images |
| **P1** | Important - significant issues | SEO problems, mobile layout broken |
| **P2** | Nice-to-have - improvements | Visual tweaks, content updates |

Work order: P0 → P1 → P2.

---

## File Responsibilities

| File | What Goes Here |
|------|----------------|
| `tasklist.md` | All tasks with IDs, status, priority |
| `assessment.md` | Architecture notes, findings, root cause analysis |
| `instructions.md` | User's standing preferences and rules |

---

## Session Start Checklist

1. [ ] Read `.claude/AGENTS.md` (this file)
2. [ ] Read `.claude/tasklist.md` for pending work
3. [ ] Read `.claude/assessment.md` for current state
4. [ ] Check `.claude/instructions.md` for user preferences
5. [ ] Ask user what they want to work on (or continue P0→P1→P2)
