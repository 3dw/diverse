# CLAUDE.md

## Project Overview

**diverse** — 學習風格自我測驗 (Learning Style Self-Assessment)

A Quasar/Vue 3 web app for self-assessing learning styles based on the VARK model (Visual, Auditory, Reading/Writing, Kinesthetic). Includes a VARK quiz, a Whole/Analytic style quiz, and a guessing game.

Author: Bestian Tang <bestian@gmail.com>

## Tech Stack

- **Framework**: [Quasar](https://quasar.dev/) v2 (Vue 3)
- **Language**: TypeScript + Vue (Options API, `.vue` SFCs)
- **Template engine**: Pug (`lang="pug"` in some templates)
- **Routing**: Vue Router v4
- **HTTP**: Axios
- **i18n**: vue-i18n v9
- **PWA**: Workbox-based service worker (`src-pwa/`)
- **Build tool**: Quasar CLI with Vite (`@quasar/app-vite`)

## Project Structure

```
src/
  layouts/MainLayout.vue   # Main layout; holds VARK question data (qs[]) and passes via props
  pages/
    Index.vue              # VARK learning style quiz
    Whole_Reduct.vue       # Whole/Analytic style quiz
    Game.vue               # Learning style guessing game (receives qs via props)
    ErrorNotFound.vue      # 404 page
  components/
    EssentialLink.vue
    ExampleComponent.vue
  router/                  # Vue Router config
  boot/                    # Quasar boot files (axios, i18n)
  i18n/                    # Internationalization strings
src-pwa/                   # PWA service worker files
```

## Key Architecture Notes

- Question data (`qs[]`) lives in `MainLayout.vue` and is passed down to pages via `:qs="qs"` prop on `<router-view>`.
- `Game.vue` receives `qs` as a prop from the layout.
- Pages emit `@closeDrawer` to trigger drawer close in the layout.
- VARK scores use letter codes: `v` (Visual), `a` (Auditory), `r` (Reading), `k` (Kinesthetic).

## Dev Commands

```bash
quasar dev       # Start dev server
quasar build     # Production build
npm run lint     # ESLint
npm run format   # Prettier
```

## Coding Conventions

- Use Vue Options API (consistent with existing code).
- Pug is used in some page templates — keep consistent with the file being edited.
- No test suite currently (`npm test` exits 0 with a message).
- Keep Chinese UI text as-is; this is a Traditional Chinese (zh-TW) interface.
