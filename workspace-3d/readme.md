# after-hours

Immersive 3D portfolio website oleh **M. Dava Ardana** — sebuah atmospheric digital workspace yang memadukan lingkungan Three.js/WebGL dengan retro OS interaktif, dibangun di atas React, GSAP, dan custom GLSL shaders.

Repository ini adalah bagian dari dua workspace yang membentuk keseluruhan portfolio:
- **workspace-3d** *(repo ini)* — 3D scene engine, kamera, lighting, dan asset pipeline
- **workspace-os** — Retro OS UI yang ditampilkan di dalam monitor 3D

<br>

## Tech Stack

| Layer | Teknologi |
|---|---|
| 3D Engine | Three.js, WebGL |
| UI Layer | React |
| Animation | GSAP |
| Shaders | GLSL (custom vertex & fragment) |
| Bundler | Webpack |
| Server | Express (production) |

<br>

## Dev Environment

### workspace-3d (port 8080)

```bash
# Install dependencies
npm i

# Jalankan dev server (localhost:8080)
npm run dev
```

### workspace-os (port 3000)

```bash
# Masuk ke workspace-os
cd ../workspace-os

# Install dependencies
npm i

# Jalankan dev server (localhost:3000)
npm run dev
```

<br>

## Production Build

```bash
# Build untuk production
npm run build

# Serve menggunakan Express
npm start
```

<br>

## Contact

**M. Dava Ardana** — [dava@after-hours.dev](mailto:dava@after-hours.dev)
