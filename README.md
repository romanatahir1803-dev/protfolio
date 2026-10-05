# Romana Tahir — Cinematic Developer Portfolio

A dark cinematic, animated single-page portfolio website for **Romana Tahir** — AI/ML Engineer, MERN Stack Developer, and AI Automation Engineer based in Karachi, Pakistan.

---

## 🌟 Features & Highlights

- **Visual Aesthetic**: Near-black background (`#050505`) with an interactive, animated canvas starfield (slow drifting particles, ambient dust clouds, subtle mouse parallax).
- **Warm Amber Glow Accent**: Glowing typography (`#FF8A1F`), glassmorphism cards with backdrop blur, inner glow, and faded section numbers (`01`, `02`, `03`...).
- **Hero Section**:
  - Live green "OPEN TO WORK" pulsing pill.
  - Huge bold condensed heading (`Bebas Neue`) with soft text-glow.
  - Portrait photo in a tall arch-shaped frame with amber gradient border, dark vignette blending, subtle floating animation, and 3D mouse tilt.
  - Orbiting glass chips: `"MERN"`, `"AI/ML"`, `"n8n"`, `"RAG"`, `"Python"`.
  - Graceful animated `"RT"` monogram fallback.
- **Stacked Glass Cards**: 3D perspective depth as the user navigates through sections.
- **Sticky Mini Navbar**: Active section indicator, scroll progress bar, and responsive mobile menu drawer.
- **Complete Sections (01 to 08)**:
  1. `01 ── WHO I AM`: Academic honors, research credentials, and key highlight cards.
  2. `02 ── TECHNICAL SKILLS`: Grouped tag clouds (MERN, AI/ML, AI Automation, ML Libraries, Languages & Core, Databases & CMS) with glowing hover effects.
  3. `03 ── EXPERIENCE`: Animated vertical timeline (orange dates on left, glass cards on right, newest first, clearly marked editable 10Pearls entry).
  4. `04 ── PROJECTS`: 3D tilt cards, dynamic gradient placeholders, tech pills, and Code / Live Demo links.
  5. `05 ── EDUCATION`: Academic milestones (SSUET CGPA 3.77, Pre-Engineering, SMIT).
  6. `06 ── BY THE NUMBERS`: Interactive scroll-triggered count-up statistics.
  7. `07 ── ACHIEVEMENTS`: ICISCT 2026 paper, Merit scholarships, Hackathon honors, and Top Exhibition awards.
  8. `08 ── CONTACT`: Direct contacts, copy-to-clipboard buttons, and contact form with validation and confetti celebration.
- **Centralized Data**: All textual content and project entries are cleanly stored in [`src/data/portfolio.ts`](./src/data/portfolio.ts) for effortless updates.

---

## 📁 Folder Structure

```
protfolio/
├── public/
│   ├── romana.jpg              # Hero portrait photo
│   └── Romana_Tahir_CV.pdf     # Downloadable CV
├── src/
│   ├── app/
│   │   ├── globals.css         # Custom glow utilities & theme styling
│   │   ├── layout.tsx          # Fonts (Bebas Neue, Inter, JetBrains Mono) & SEO
│   │   └── page.tsx            # Assembled single-page application
│   ├── components/
│   │   ├── Achievements.tsx    # Section 07 Achievements cards
│   │   ├── ContactForm.tsx     # Section 08 Form with confetti
│   │   ├── EducationList.tsx   # Section 05 Education items
│   │   ├── Hero.tsx            # Hero section with 3D Arch & Orbiting chips
│   │   ├── Icons.tsx           # GitHub & LinkedIn SVGs
│   │   ├── LenisProvider.tsx   # Lenis 60fps smooth scrolling
│   │   ├── Navbar.tsx          # Sticky navigation & scroll progress bar
│   │   ├── ProjectCard.tsx     # 3D Tilt Project Cards
│   │   ├── SkillGroup.tsx      # Section 02 Tag clouds with glow
│   │   ├── StackedCard.tsx     # 3D Glassmorphic Section wrapper
│   │   ├── StarField.tsx       # Canvas animated particle background
│   │   └── StatCounter.tsx     # Section 06 Count-up statistics
│   └── data/
│       └── portfolio.ts        # Centralized portfolio data & text content
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
npm run start
```

---

## ✏️ How to Edit Content

All text, links, and entries can be edited in a single file:
👉 **[`src/data/portfolio.ts`](./src/data/portfolio.ts)**

To update the **10Pearls** internship details, locate `experience.items` in `portfolio.ts` and edit the placeholders:
```typescript
{
  id: "exp-3",
  role: "Intern",
  company: "10Pearls",
  location: "Karachi, Pakistan",
  period: "Jun 2025 – Aug 2025",
  bullets: [
    "Your bullet 1 here",
    "Your bullet 2 here",
    "Your bullet 3 here",
  ],
  tags: ["Role Title", "Tools", "Impact"],
}
```

---

## 🌐 Deploy to Vercel

1. Push this repository to your GitHub account (`git push origin main`).
2. Visit [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Framework Preset will automatically detect **Next.js**.
5. Click **"Deploy"**. Your cinematic portfolio will be live worldwide in seconds!
