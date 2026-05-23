# Context Summary — after-hours
*Paste ini di awal chat baru*

---

## Siapa kami
- **M. Dava Ardana** — fullstack developer, fokus backend & immersive interfaces
- **Dias Novri Pratama** — operator kedua
- Project berbasis di Indonesia

---

## Project: after-hours

Immersive cinematic 3D portfolio sekaligus **digital creative workspace collective**.

> Bukan personal CV website. Bukan SaaS dashboard.
> Ini adalah: late-night digital workspace, handcrafted cinematic web experience,
> experimental interactive environment — dibangun oleh dua operator.

---

## Workflow saat ini

| Tool | Role |
|------|------|
| VSCode | code editor utama |
| agy CLI | scoped execution & analysis |
| Runtime MCP tools | file read, inspection |
| Claude | project manager / creative director |

**Rules:**
- No autonomous full-project scans
- All analysis must be targeted and bounded
- Small prompts → small changes → verify → commit
- Analyze ONLY files related to current task

---

## Arsitektur

Dua sub-project mandiri — JANGAN di-merge:
- **`workspace-3d/`** — Three.js world: scene, WebGL, GLSL shaders, camera, GSAP, spatial audio
- **`workspace-os/`** — standalone React app, virtual retro OS diembed ke monitor 3D via `iframe + CSS3DRenderer`

Bridge paling sensitif: **`workspace-3d/src/Application/World/MonitorScreen.ts`**

Dev servers:
- `workspace-os` → port **3000** (`npm start`)
- `workspace-3d` → port **8080** (`npm run dev`)
- Test dengan `http://localhost:8080/?dev`

---

## Tech stack

| Layer | Tech |
|-------|------|
| 3D rendering | Three.js + WebGL |
| Shaders | GLSL (via Webpack glslify loader) |
| Animasi | GSAP / Tween.js |
| React OS | React + TypeScript |
| Bridge | CSS3DRenderer + iframe + postMessage |
| Audio | Three.js Spatial Audio |
| Backend | Express + Nodemailer (contact form) |
| Bundler | Webpack (config custom, HIGH RISK) |

---

## Status project

| Section | Status |
|---------|--------|
| OPERATORS | ✅ selesai |
| CHANNEL | ✅ selesai |
| SYSTEMS | ✅ selesai |
| ARCHIVE | ✅ selesai |
| EXPERIMENTS | ✅ selesai |
| LAB NOTES | ✅ selesai |
| Atmosphere consistency pass | ✅ selesai |
| HOME identity alignment | ✅ selesai |
| Navbar cleanup | ✅ selesai |
| Scoped CLI workflow | ✅ selesai |

### Navbar saat ini (final)
```
HOME
OPERATORS
CHANNEL
SYSTEMS
ARCHIVE
EXPERIMENTS
LAB NOTES
```
Legacy sections (ABOUT, EXPERIENCE, PROJECTS, CONTACT) sudah dihapus.

### Identity shift yang sudah diterapkan
- `Home.tsx` — nama personal diganti ke `after-hours` / `digital workspace / two operators`
- `VerticalNavbar.tsx` — branding `Dava / Ardana / Showcase '25` diganti ke `after-hours`
- Semua `forHireContainer`, `nowHiring`, import gif terkait sudah dihapus
- Operators kini exist **di dalam dunia**, bukan pusat dunia

---

## Remaining tasks

### 1. Loading Screen Identity Pass ← NEXT
Loading screen masih perlu AFTER-HOURS branding alignment.

Goal: terasa seperti **booting into a workspace**, bukan loading personal showcase.

### 2. MonitorScreen Integration (HIGH RISK)
`MonitorScreen.ts` masih referensi URL production lama.
Perlu update ke `http://localhost:3000` untuk dev, lalu production URL saat deploy.

### 3. Final Visual Polish
Setelah identity work selesai:
- spacing review
- consistency pass
- performance verification
- final atmosphere polish

---

## HIGH RISK AREAS — jangan disentuh tanpa alasan kuat

- `MonitorScreen.ts`
- `Shaders/`
- `bundler/` & `webpack.config.js`
- Camera transition system
- iframe bridge system
- Query param `?dev`

---

## Identitas

| Item | Value |
|------|-------|
| Brand | after-hours |
| Operators | M. Dava Ardana + Dias Novri Pratama |
| Email | dava@after-hours.dev |
| Contact form backend | afterhours.std@gmail.com |
| GitHub Dava | github.com/dapaaa11 |
| LinkedIn Dava | linkedin.com/in/m-dava-ardana |
| Domain (planned) | after-hours.dev |
| workspace-os URL (placeholder) | os.after-hours.dev |

---

## Prinsip utama

- atmosphere
- tactile interaction
- CRT aesthetics
- cinematic movement
- subtle branding
- immersive feeling
- handcrafted quality

> Prioritaskan subtlety. Prioritaskan atmospheric consistency.
> Jangan redesign. Jangan overengineering.
> Preserve soul at all costs.

---

## Role AI

| AI | Role |
|----|------|
| Claude | project manager / creative director — atmosphere, architecture, wording, direction |
| agy CLI | scoped execution — analysis, inspection, implementation |