# GEMINI.md — Antigravity Agent Rules
# after-hours

Antigravity-specific behavior overrides dan panduan MCP.
Rules ini prioritasnya lebih tinggi dari AGENTS.md jika ada konflik.

---

## Perilaku agent

- Sebelum mengimplementasi fitur apapun, gunakan **Sequential Thinking MCP** untuk memecah task menjadi langkah-langkah yang jelas. Jangan mulai nulis kode sebelum rencana dikonfirmasi.
- Sebelum menyentuh bagian codebase yang belum dikenal di session ini, gunakan **Serena MCP** untuk membaca struktur yang ada. Jangan menebak lokasi file atau nama class.
- Saat tidak yakin dengan API library (Three.js, GSAP, React), query **Context7 MCP** terlebih dahulu. Jangan andalkan memory training — bisa outdated.
- Gunakan trigger `model_decision` untuk sebagian besar rules agar agent menerapkannya secara kontekstual, bukan mekanis di setiap pesan.

---

## Panduan MCP — kapan dan bagaimana menggunakannya

### Serena — memahami codebase
Gunakan saat:
- Mulai bekerja di file atau modul yang belum disentuh di session ini.
- Mengecek apakah abstraksi (manager, utility, hook) sudah ada sebelum membuat yang baru.
- Menelusuri bug — baca file yang relevan sebelum mengusulkan perbaikan.
- Ingin tahu isi `Application/World/` sebelum menambah entity baru.

Jangan gunakan Serena untuk file yang sudah dibaca di session yang sama.

### Context7 — dokumentasi library terkini
Gunakan saat:
- Menulis atau debugging kode Three.js (scene graph, renderer, material, geometry).
- Bekerja dengan GSAP tween API, easing functions, atau timeline.
- Menggunakan React hooks di `workspace-os`.
- Apapun di mana API signature penting dan kamu tidak 100% yakin.

Prioritaskan Context7 di atas asumsi dari memory untuk semua library eksternal.

### Sequential Thinking — perencanaan
Gunakan saat:
- Task melibatkan lebih dari dua file atau dua sistem.
- Task menyentuh jembatan CSS3DRenderer ↔ iframe (area paling sensitif — rencanakan dengan hati-hati).
- Perubahan apapun pada camera system (zoom, transition, alignment dengan CSS3D plane).
- Implementasi shader baru atau modifikasi CRT post-process pipeline.
- Refactor `MonitorScreen.ts` — hanya lakukan jika benar-benar perlu dan sudah direncanakan matang.

### Playwright — browser testing
Gunakan saat:
- Memverifikasi bahwa 3D scene load tanpa WebGL console errors.
- Menguji flow: klik monitor → zoom-in → interaksi React OS end-to-end.
- Memastikan iframe render dengan benar di dalam CSS3DRenderer plane.
- Verifikasi bahwa mekanisme `?dev` query param berfungsi untuk switching URL.

Jangan gunakan Playwright untuk logic test level unit — itu milik Jest.

### Chrome DevTools — performance debugging
Gunakan saat:
- Frame rate turun di bawah 60fps di mesin mid-range.
- Memory terus bertambah seiring waktu (kemungkinan undisposed Three.js objects).
- CRT shader menyebabkan GPU spike.
- Perlu trace apakah `AudioContext` berhasil di-resume setelah user gesture.

Selalu profile dulu sebelum optimasi. Jangan optimasi berdasarkan asumsi.

### GitHub MCP — repo & workflow
Gunakan saat:
- Mengecek recent commit history sebelum memulai refactor.
- Membuat PR description setelah fitur signifikan.
- Ingin tahu apa yang berubah di file tertentu untuk memahami konteksnya.

### Supabase MCP — khusus workspace-os
Supabase hanya digunakan di dalam `workspace-os`. Three.js shell (`workspace-3d`) tidak connect ke Supabase.
Gunakan saat: debugging auth flow, mengecek RLS policies, atau inspeksi realtime subscriptions di dalam inner site.

---

## Trigger classification

```
always_on:
  - TypeScript strict — tidak ada implicit any
  - Dispose Three.js resources saat object dihapus dari scene
  - Tidak ada .env values yang di-hardcode
  - Tidak ada import lintas workspace-3d dan workspace-os

model_decision:
  - Kapan menggunakan GSAP vs pendekatan animasi lain
  - Kapan memecah file menjadi modul yang lebih kecil
  - Kapan memanggil MCP tool vs menjawab dari memory
  - Keputusan optimasi shader
  - Apakah perlu menyentuh MonitorScreen.ts atau ada cara lain
```

---

## Yang TIDAK boleh dilakukan agent

- **Jangan merge `workspace-3d` dan `workspace-os`** menjadi satu project. Pemisahan ini disengaja dan arsitektural.
- **Jangan buat monorepo** (Lerna, Turborepo, npm workspaces) — terlalu kompleks untuk filosofi handcrafted project ini.
- **Jangan tambahkan path alias agresif** (`@/components`) tanpa kebutuhan yang sangat jelas — berisiko merusak bundler config yang sudah stabil.
- **Jangan taruh UI components** (button, modal, menu) ke dalam file Three.js scene. UI milik `workspace-os` atau `workspace-3d/src/Application/UI/`.
- **Jangan start GSAP tween** pada camera property yang juga dikontrol OrbitControls secara bersamaan — mereka akan saling fight.
- **Jangan auto-fix TypeScript errors** dengan melebarkan types (`any`, `unknown`, non-null assertion) — perbaiki type-nya dengan benar.
- **Jangan install npm package baru** tanpa mengecek dulu apakah fungsinya sudah ada di dependency yang terpasang.
- **Jangan modifikasi `workspace-3d/bundler/`** tanpa membaca seluruh config terlebih dahulu — ada custom loader untuk GLSL dan model 3D.
- **Jangan ganggu mekanisme `?dev` query param** di `MonitorScreen.ts` — ini yang memisahkan URL production dan local dev.

---

## File paling sensitif — perlakukan dengan ekstra hati-hati

| File | Kenapa sensitif |
|------|----------------|
| `workspace-3d/src/Application/World/MonitorScreen.ts` | Jembatan iframe + postMessage. Camera merespons dari sini. Satu perubahan salah = interaksi OS hancur. |
| `workspace-3d/src/Application/Shaders/*.glsl` | Kalkulasi matriks WebGL. Salah sedikit = layar hitam atau partikel pecah. |
| `workspace-3d/bundler/webpack.*.js` | Custom GLSL loader + model 3D bundling. Salah config = build gagal. |
| `workspace-3d/src/Application/Camera/` | Sync antara camera position dan CSS3D plane alignment. |

---

## Verification checklist — jalankan setelah perubahan signifikan

- [ ] `tsc --noEmit` pass dengan zero error di kedua sub-project.
- [ ] Scene load di `http://localhost:8080/?dev` tanpa WebGL error di console.
- [ ] Flow end-to-end bekerja: klik monitor → zoom-in → iframe interaktif → Escape zoom-out.
- [ ] CRT shader render normal di 1080p dan 1440p tanpa artifak.
- [ ] Memory tidak terus naik setelah beberapa menit (cek Chrome DevTools Memory tab).
- [ ] Tidak ada `console.log` yang tertinggal di kode yang di-commit.
- [ ] Semua Three.js object yang ditambah punya path `.dispose()` saat dihapus.
- [ ] `workspace-os` bisa jalan standalone dengan `npm start` tanpa 3D shell.