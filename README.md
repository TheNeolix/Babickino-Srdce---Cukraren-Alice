Markdown
# 🌌 Project Name: Babičkino Srdce
### ⚡ Powered by Neolix Studio

<img width="150" height="50" alt="Neolix-Studio-Logo-Transparent" src="https://github.com/user-attachments/assets/2b6f81cb-333f-4cee-9bd0-783759b4b9b9" />


---

## 🎯 Strategický cieľ
Vytvorenie moderného, „chutného“ digitálneho zážitku, ktorý prenáša rodinnú atmosféru Cukrárne Alice do online sveta. Web slúži ako vizuálny katalóg poctivej výroby, pričom čistý layout a optimalizované zobrazenie produktov eliminujú bariéry medzi online návštevnikom a nákupom. Dizajn cielene odlišuje značku od konkurenčných reťazcov dôrazom na autenticitu a lokálny pôvod.

---

## 🎨 Visual Identity (Style Guide)

### 🔴 Core Colors
| Role | Name | HEX |
| :---  | :---  | :--- |
|Primary / Accent | Gold | `#D4AF37` |
| Primary Dark | Chocolate | `#3D1C02` |
| Background Light | Cream | `#FFFDD0` |
| Background Neutral | Warm Gray | `#F5F5F0` |
| Text on Dark | White | `#FFFFFF` |
| Overlay | Black (30% opacity) | `#000000` / 30% |
| Success State | Green | `#16A34A` |

### 🔡 Typography
Inter (sans-serif) — body text, UI, buttons, labels — weights 300–600
Playfair Display (serif) — all headings, brand name, quotes — weights 400–700 + italic

---

## 🚀 Key Features
Parallax video hero, scroll-aware glassmorphism navbar, animated product filtering, contact form with loading/success states,
full accessibility (ARIA, keyboard nav, reduced motion), responsive mobile-first design

---

## 🛠 Tech Stack
- **Design:** Figma
- **Platform:** Framer / Webflow
- **Assets:** Adobe Illustrator (Vector Logos)

---
**Project Structure**

Alice-Pastery/
├── index.html              ← Entry point
├── package.json            ← Dependencies & scripts
├── tsconfig.json           ← TypeScript config
├── vite.config.ts          ← Vite + Tailwind plugin
├── .env.example            ← Environment variables template
├── .gitignore
├── public/
│   └── images/
│       ├── logo.jpg        ← Brand logo
│       ├── 248474-hero.mp4 ← Hero background video (2.3MB)
│       ├── 248474-web.mp4  ← Web-quality video (12.4MB)
│       └── 248474.mp4      ← Original video (31.7MB)
└── src/
    ├── main.tsx            ← React DOM entry
    ├── App.tsx             ← All components (single-file)
    ├── index.css           ← Design tokens + Tailwind
    └── lib/
        └── utils.ts        ← cn() utility (clsx + twMerge)


---

## 📩 Contact
Máte záujem o podobnú digitálnu transformáciu?
- **Web:** [neolix.studio](https://neolix.studio)
- **Email:** [info@neolix.studio](mailto:info@neolix.studio)

---
<p align="center">
  <sub>© 2026 Neolix Studio. Vytvorené s vášňou pre detail a stratégiu.</sub>
</p>
