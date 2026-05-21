# AGENTS.md — after-hours

Cross-tool rules for all AI agents working on this project.
Applies to: Antigravity, Cursor, Claude Code, and any compatible agent.

---

## Project overview

**after-hours** adalah immersive 3D portfolio dengan dua sub-project mandiri:

- `workspace-3d/` — dunia Three.js: scene, WebGL rendering, GLSL shaders, camera system, raycasting, GSAP transitions, dan HTML overlay UI.
- `workspace-os/` — standalone React app yang berfungsi sebagai virtual retro OS, diembed ke dunia 3D via `iframe + CSS3DRenderer`.

Jembatan antara keduanya ada di `workspace-3d/src/Application/World/MonitorScreen.ts` — file paling sensitif di seluruh project. Ini yang menciptakan ilusi monitor sungguhan di dalam 3D world.

Dev servers:
- `workspace-os` berjalan di port **3000** (`npm start`)
- `workspace-3d` berjalan di port **8080** (`npm run dev`)
- Akses dengan `http://localhost:8080/?dev` untuk load OS retro dari localhost

---

## ⚠️ HIGH RISK — Jangan disentuh tanpa rencana yang jelas

Area berikut sangat sensitif. Perubahan sekecil apapun bisa merusak visual, interaksi, atau build:

- **`workspace-3d/src/Application/World/MonitorScreen.ts`** — jembatan iframe + postMessage antara OS dan Three.js. Kamera merespons input dari sini. Jangan refactor strukturnya.
- **`workspace-3d/src/Application/Shaders/`** — GLSL shader bergantung pada kalkulasi matriks WebGL. Mengubah shader tanpa pemahaman WebGL mendalam bisa menyebabkan layar hitam atau efek partikel pecah.
- **`workspace-3d/bundler/`** — Webpack config sudah dioptimalkan untuk glslify dan bundling model 3D besar. Refactor config ini bisa menyebabkan build gagal.

---

## ✅ LOW RISK — Aman dirapikan

- Rename folder root (sudah dilakukan: `portfolio-website` → `workspace-3d`, `portfolio-inner-site` → `workspace-os`)
- Konten di `docs/`
- Standardisasi naming file di `workspace-os/src/components/` ke PascalCase
- Hapus dead code (boilerplate sisa template, `reportWebVitals.ts` jika tidak dipakai)

---

## Struktur folder

```
after-hours/
├── workspace-3d/
│   ├── bundler/           # Webpack config (dev & prod) — HIGH RISK
│   ├── server/            # Express server untuk production
│   ├── static/            # 3D models, textures, audio, fonts
│   └── src/
│       ├── Application/
│       │   ├── Audio/     # Spatial audio controllers
│       │   ├── Camera/    # Camera system, transitions, keyframes
│       │   ├── Shaders/   # GLSL shaders — HIGH RISK
│       │   ├── UI/        # HTML HUD overlays (React minimal)
│       │   ├── Utils/     # Game-loop tickers, resize observers, event emitters
│       │   └── World/     # 3D meshes & entity logic (Desk, Computer, Room)
│       ├── script.ts      # Entrypoint 3D world
│       └── style.css
│
├── workspace-os/
│   ├── public/            # Retro icons, wallpapers, game ROMs
│   └── src/
│       ├── components/
│       │   ├── os/        # Taskbar, Desktop, Window Manager
│       │   ├── applications/  # Terminal, Notepad, Settings
│       │   ├── showcase/  # Konten portofolio (About, Experience, Projects)
│       │   ├── dos/       # MS-DOS simulation (js-dos)
│       │   ├── wordle/    # Custom Wordle mini-game
│       │   └── general/   # Reusable widgets (buttons, frames, retro-borders)
│       ├── hooks/         # Custom React hooks
│       ├── constants/     # Config, theme, filesystem layout
│       └── types/         # TypeScript declarations
│
└── docs/
    ├── AGENTS.md
    ├── GEMINI.md
    └── folder-restructuring-plan.md
```

---

## Language & type safety

- Selalu gunakan **TypeScript**. Tidak ada implicit `any`. Tidak ada `as X` tanpa komentar alasannya.
- Return type eksplisit pada semua fungsi, terutama di `workspace-3d`.
- Gunakan `interface` untuk object shapes, `type` untuk unions dan utility types.
- Jangan pernah gunakan `// @ts-ignore`. Perbaiki type problem-nya.

---

## Naming conventions

**`workspace-3d` — TypeScript OOP style:**
- Class dan class files: `PascalCase` → `MonitorScreen.ts`, `CameraKeyframes.ts`
- Variables dan helper functions: `camelCase` → `initializeScreenEvents()`, `maxOffset`

**`workspace-os` — React component style:**
- React components: `PascalCase` → `Window.tsx`, `Taskbar.tsx`, `Software.tsx`
- Custom hooks: prefix `use` + `camelCase` → `useWindowSize.ts`
- Styles & assets: `kebab-case` → `retro-border.css`

---

## Pemisahan tanggung jawab

- `workspace-3d` dan `workspace-os` adalah dua aplikasi mandiri. Tidak ada import lintas project — komunikasi hanya via `postMessage`.
- Logic Three.js hidup di file manager/service tersendiri — tidak boleh masuk ke React component atau file UI.
- GLSL shader menggunakan extension `.glsl` dan diimport via Webpack GLSL loader. Jangan inline shader string di file `.ts` kecuali sangat pendek (< 5 baris).
- Satu tanggung jawab per file: `CameraManager` hanya untuk camera, `MonitorScreen` hanya untuk interaksi monitor.

---

## Three.js & rendering

- Selalu **dispose** geometry, material, dan texture saat menghapus object dari scene. Resource yang tidak di-dispose menyebabkan memory leak.
- Jangan mutasi `camera.position` atau `camera.rotation` langsung di animation tick loop jika GSAP tween sedang aktif pada property yang sama — mereka akan saling fight.
- Gunakan `THREE.Clock` untuk delta time. Jangan gunakan `setInterval` untuk animasi.
- Raycasting hanya menarget mesh yang relevan — jangan raycast ke seluruh scene.
- Pixel ratio: `Math.min(window.devicePixelRatio, 2)`. Jangan gunakan raw device pixel ratio.

---

## GLSL shader

- Efek CRT (scanlines, curvature, glow) ada dalam satu post-process shader pass.
- Nama uniform harus ada komentar yang menjelaskan unit dan range-nya.
- Jangan hardcode resolusi layar di shader — selalu pass `uResolution` sebagai uniform yang diupdate saat resize.

---

## Camera & GSAP

- Semua camera transition menggunakan **GSAP** (`gsap.to`). Tidak ada manual lerp di tick loop.
- Setiap tween harus ada `ease` yang di-set eksplisit — jangan andalkan default GSAP.
- Zoom-in ke monitor dan zoom-out harus simetris: durasi sama, ease sama, dibalik.
- Raycasting harus dinonaktifkan selama transisi kamera. Gunakan `onComplete` callback GSAP untuk mengaktifkan kembali.

---

## CSS3DRenderer & iframe

- Iframe yang mengarah ke `workspace-os` adalah satu-satunya element yang dirender `CSS3DRenderer`.
- CSS3D plane harus selalu aligned dengan monitor mesh — recompute alignment saat resize.
- `workspace-os` harus bisa jalan standalone (`npm start` di direktorinya sendiri tanpa 3D shell).
- Jangan ganggu mekanisme URL switching: production (`https://os.domain.com/`) vs local (`http://localhost:3000/`) menggunakan query param `?dev` di `MonitorScreen.ts`.

---

## Spatial audio

- Semua audio object harus di-attach ke `AudioListener` Three.js pada camera — bukan `HTMLAudioElement` langsung.
- Positional audio harus punya `setRefDistance` dan `setMaxDistance` yang dikonfigurasi.
- Selalu cek user gesture sebelum start `AudioContext`. Browser memblokir autoplay.

---

## Backend (Express + Nodemailer)

- Contact form submission adalah satu-satunya backend route. Jaga `server/` tetap minimal.
- Jangan log email address atau message content ke console di production.
- Validasi semua field dari client sebelum dikirim ke Nodemailer.
- SMTP credentials hanya di `.env`. `.env` ada di `.gitignore`.

---

## Arsitektur — jangan over-engineer

- **Jangan buat monorepo** (Lerna, Turborepo, npm workspaces). Kedua sub-project cukup sebagai aplikasi mandiri sederhana.
- **Jangan gunakan path alias secara agresif** (`@/components/...`) — membutuhkan perubahan tsconfig dan Webpack yang berisiko. Gunakan relative path sederhana.

---

## Git conventions

- Branch naming: `feat/camera-zoom`, `fix/crt-flicker`, `refactor/audio-manager`
- Commit messages: imperative mood — `Add CRT scanline shader`, bukan `Added` atau `Adding`
- Selalu commit sebelum restructuring apapun: `git add . && git commit -m "style: persiapan penataan ulang folder"`
- Jangan commit `.env`, `node_modules/`, atau build output (`dist/`)
- Satu perubahan logis per commit. Jangan campur pekerjaan shader dengan audio dalam satu commit.

---

## Code style

- Tidak ada commented-out code di commit. Hapus dead code — git history menyimpannya.
- Tidak ada `console.log` di production paths. Gunakan utility `debug()` yang no-op di production.
- Prefer named exports untuk semua utility/manager file.

## Artistic Direction

Project ini bukan:
- SaaS dashboard
- startup landing page
- AI futuristic interface

Project ini adalah:
- immersive digital workspace
- atmospheric personal environment
- cinematic interactive experience

Prioritas utama:
- atmosphere
- interaction feel
- tactile computing
- subtle branding
- emotional immersion

Jangan overdesign.
Jangan overanimate.
Jangan corporate-ify project.