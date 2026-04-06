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
| Role | Font | Source | Fallback Stack |
| :--- | :--- | :--- | :--- |
| Primary (Sans) | Inter | Google Fonts | `ui-sans-serif, system-ui, sans-serif` |
| Secondary (Serif) | Playfair Display | Google Fonts | `ui-serifm Georgia, serif` | 

---

## 🚀 Key Features
Parallax video hero, scroll-aware glassmorphism navbar, animated product filtering, contact form with loading/success states,
full accessibility (ARIA, keyboard nav, reduced motion), responsive mobile-first design

---

## 🛠 Tech Stack
| Layer | Technology | Version |
| :--- | :--- | :--- |
| Framework | React | 19.0.0 |
| Build Tool | Vite | 6.2.0 |
| Language | TypeScript | 5.8.2 |
| Styling | Tailwind CSS | 4.1.14 (with @theme directive) |
| CSS Integration | @tailwindcss/vite | 4.1.14 |
| Animations | Motion (Framer Motion) | 12.23.24 |
| Icons | Lucide React | 0.546.0 |
| Utility Functions | clsx + tailwind-merge | 2.1.1 / 3.5.0 |
| Fonts | Google Fonts (Inter, Playfair Display) | CDN |
| Media | MP4 video (hero), JPG (logo), External images | — |

---
**Project Structure**
```
Alice-Pastery/
├── index.html              # Entry point (Vite)
├── package.json            # Závislosti a skripty
├── tsconfig.json           # Konfigurácia TypeScriptu
├── vite.config.ts          # Vite + Tailwind nastavenia
├── .env.example            # Šablóna pre environmentálne premenné
├── .gitignore              # Ignorované súbory (node_modules, atď.)
├── public/
│   └── images/
│       ├── logo.jpg        # Brand identita (Babickino Srdce)
│       ├── 248474-hero.mp4 # Hero video (Optimalizované, 2.3MB)
│       ├── 248474-web.mp4  # Web-quality video (12.4MB)
│       └── 248474.mp4      # Master video (Raw, 31.7MB)
└── src/
    ├── main.tsx            # React DOM inicializácia
    ├── App.tsx             # Hlavná logika a komponenty
    ├── index.css           # Design tokens + Tailwind vrstvy
    └── lib/
        └── utils.ts        # cn() utility pre čisté Tailwind classy
```

---

## 📩 Contact
Máte záujem o podobnú digitálnu transformáciu?
- **Web:** [neolix.studio](https://neolix.studio)
- **Email:** [info@neolix.studio](mailto:info@neolix.studio)

---
<p align="center">
  <sub>© 2026 Neolix Studio. Vytvorené s vášňou pre detail a stratégiu.</sub>
</p>
