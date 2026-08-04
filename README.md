SVK · Life OS

A sacred personal operating system — daily sadhana, second brain, 15-year vision.


SVK Life OS is a single-file, installable Progressive Web App built as a personal
command center: one Capture flow that routes into Journal, Diary, Reflection,
Knowledge, Actions, and Mastery tracking — all in service of a long-horizon
vision and a daily practice.


Design philosophy: zen minimalism, frictionless execution. The app is meant
to answer one question at a glance — what do I do right now — without
clutter, without duplicate data entry, and without breaking flow.



✨ Features


Today HQ — a single dashboard surfacing what matters today: schedule, daily plan, one-win focus, and quick actions.

Universal Capture — one input, AI-classified into Action / Journal / Reflection / Diary / Knowledge, so you never have to decide where something goes before writing it.

Direction (Zen Compass) — North Star hero (Chief Aim, 15-Year Vision, Current Identity), Identity, Mastery, Compass, and Blueprint views, with a progressive-disclosure "Today's Execution" panel (season → month → today → one win → practice → goals → vows).

Journal / Diary / Reflection Hub — a shared entry drawer across all three, with AI-assisted classification, distillation into Knowledge, and a morning/evening reflection ritual.

Mastery tracking — 10,000-hour-style progress per skill, linked directly to Journal practice sessions (including a /practice slash command with a countdown timer), with automatic duplicate-skill prevention.

Action / Focus system — Prepare → Focus (hero timer, current step, notes) → Complete, with AI-coached preparation, blockers, and success criteria that adapt to energy level and difficulty.

Second Brain / Knowledge Store — collections, relationships, and a knowledge graph (themes, timelines, clusters, people, projects) built over captured entries.

Weekly Goals & 90-Day Cycles — a lightweight weekly review ritual nested inside the longer 90-day sprint / 15-year vision hierarchy.

Contacts, Favorites, Global Search, Backups — full JSON/CSV export, automatic midnight backups, IndexedDB fallback, and printable Sadhak PDFs.

AI features — powered by your own Groq API key (stored locally in your browser only), used for classification, coaching, and daily plan generation.


🧱 Tech stack


Single-file architecture — the entire app (HTML, CSS, and ~60+ inline <script> blocks) lives in index.html. No build step, no bundler.

Storage — localStorage + IndexedDB for persistence; optional Supabase sync for cross-device backup.

AI — Groq API for fast inference (bring your own key, entered in Settings and stored client-side only).

PWA — installable, offline-capable via a versioned service worker with network-first navigation and cache-first static assets.


📦 Project structure

.
├── index.html          # the entire app — UI, styles, and all logic
├── manifest.json        # PWA manifest (name, icons, theme, display mode)
├── sw.js                 # service worker (precache + runtime caching)
└── icons/
    ├── favicon.ico
    ├── icon-16.png
    ├── icon-32.png
    ├── icon-192.png
    ├── icon-512.png
    ├── icon-192-maskable.png
    ├── icon-512-maskable.png
    └── apple-touch-icon.png

🚀 Getting started


Clone the repo:
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>

Serve the folder with any static file server (a service worker requires http:// or https://, not file://):
npx serve .
# or
python3 -m http.server 8080

Open the app in your browser and install it as a PWA (look for the install icon in your browser's address bar, or "Add to Home Screen" on mobile).

Open Settings → AI and paste in a free Groq API key from console.groq.com to enable AI features. The key is stored only in your browser's local storage — it never leaves your device except in direct calls to Groq's API.


🔄 Releasing a new version

The app version is tracked in three places and must be bumped together
on every release, or the service worker, manifest, and in-app version display
will drift out of sync:



CFG.APP_VER in index.html

APP_VERSION in sw.js

"version" in manifest.json


🔐 Privacy

All personal data (journal entries, reflections, mastery logs, knowledge
base, etc.) is stored locally in your browser via localStorage and
IndexedDB. Nothing is sent to a server unless you explicitly configure
Supabase sync or make an AI call, both of which use your own credentials.


📄 License

Personal project — license not yet decided. If you're seeing this on a
public repo without a LICENSE file, treat it as all-rights-reserved until
one is added.

