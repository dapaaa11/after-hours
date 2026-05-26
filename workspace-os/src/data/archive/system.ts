import { ArchiveNode } from './types';

export const systemNodes: ArchiveNode[] = [
    // ─── Workstation Interface Systems ───────────────────────────────────────
    {
        path: "after-hours://system/start-menu",
        title: "Start Menu",
        category: "system",
        status: "FILED",
        version: "1.0.0",
        filed: "2026-05-26",
        role: "Lower taskbar workspace navigation array.",
        dependencies: ["/components/os/StartMenu.tsx", "/components/os/startMenuConfig.ts"],
        tags: ["navigation", "taskbar", "interface"],
        content: {
            en: "A multi-tiered, keyboard-accessible navigation array anchored to the lower-left of the workspace. The Start Menu implements rigid vertical row alignment, custom etched groove dividers, desaturated icon filters, and a structural spine column carrying the workstation branding in vertical text.\n\nAll option selections trigger mechanical state snaps rather than animated transitions. Applications registered in startMenuConfig.ts are exposed as primary-group entries. System actions (Shut Down) are separated into a terminal group.",
            id: "Susunan navigasi bertingkat yang dapat diakses keyboard, terpasang di kiri bawah workspace. Start Menu menerapkan keselarasan baris vertikal yang kaku, pembagi alur tergores kustom, filter ikon desaturasi, dan kolom tulang belakang struktural yang menampilkan branding workstation dalam teks vertikal."
        },
        related: ["after-hours://system/window-shell", "after-hours://system/archive-browser", "after-hours://stack/react"]
    },
    {
        path: "after-hours://system/window-shell",
        title: "Window Shell",
        category: "system",
        status: "FILED",
        version: "1.0.0",
        filed: "2026-05-26",
        role: "Layered bevel-contoured container and application boundary renderer.",
        dependencies: ["/components/os/Window.tsx", "/components/os/windowBevel.ts"],
        tags: ["windows", "bevels", "dragging", "resize"],
        content: {
            en: "The double-bevel workstation frame responsible for rendering the layered desktop interface. Each window container implements precise outer and inner bevel contours with 15–20% luminance contrast, simulating physical Z-depth in the warm charcoal surface palette.\n\nThe shell coordinates dragging hitboxes (positioned over the title bar area), corner resize handles, minimized state (opacity 0, pointer-events none), and standard controls (minimize/maximize/close). Window Z-index is managed by the desktop registry.",
            id: "Bingkai workstation bevel ganda yang bertanggung jawab merender antarmuka desktop berlapis. Setiap kontainer jendela menerapkan kontur bevel luar dan dalam yang presisi dengan kontras luminans 15–20%, mensimulasikan kedalaman Z fisik dalam palet permukaan warm charcoal."
        },
        related: ["after-hours://system/start-menu", "after-hours://stack/framer-motion"]
    },
    {
        path: "after-hours://system/archive-browser",
        title: "Archive Browser",
        category: "system",
        status: "FILED",
        version: "1.0.0",
        filed: "2026-05-26",
        role: "Split-pane retrieval system for local operational and knowledge records.",
        dependencies: ["/components/applications/ArchiveBrowser.tsx", "/data/archive/index.ts"],
        tags: ["archive", "database", "retrieval", "knowledge"],
        content: {
            en: "The workstation's internal retrieval interface (archive.sys). A split-pane terminal that provides access to three record categories: stack (installed technologies), system (internal workstation systems), and knowledge (general IT education records).\n\nThe archive does not make network requests. All records are local TypeScript data modules. Search filters the index synchronously. The language toggle (EN/ID) switches the displayed content body without reloading.",
            id: "Antarmuka pengambilan internal workstation (archive.sys). Terminal panel terpisah yang menyediakan akses ke tiga kategori catatan: stack (teknologi yang diinstal), system (sistem workstation internal), dan knowledge (catatan edukasi IT umum)."
        },
        related: ["after-hours://system/window-shell", "after-hours://stack/typescript"]
    },
    // ─── Display Layer ───────────────────────────────────────────────────────
    {
        path: "after-hours://system/crt-display",
        title: "CRT Monitor Simulation",
        category: "system",
        status: "FILED",
        version: "1.0.0",
        filed: "2026-05-26",
        role: "Screen post-processing atmosphere layer.",
        dependencies: ["/workspace-3d/src/Application/Shaders/screen/fragment.glsl", "/workspace-3d/src/Application/World/MonitorScreen.ts"],
        tags: ["webgl", "shaders", "scanlines", "crt", "display"],
        content: {
            en: "A custom post-processing pass implemented as a GLSL fragment shader operating on the monitor screen mesh in the Three.js scene. It applies phosphor decay traces, horizontal scanline bands, frame-level jitter, and a subtle spherical curvature mapping to the rendered iframe surface.\n\nThis layer does not modify the React OS content. It operates as a screen-space effect above the embedded iframe. The effect is intentionally moderate — it enhances the CRT atmosphere without consuming readability.",
            id: "Tahapan post-processing kustom yang diimplementasikan sebagai shader fragment GLSL yang beroperasi pada mesh layar monitor dalam scene Three.js. Menerapkan jejak peluruhan fosfor, garis pindai horizontal, jitter tingkat frame, dan pemetaan kelengkungan bola halus ke permukaan iframe yang dirender."
        },
        related: ["after-hours://stack/threejs", "after-hours://system/grammar-atmosphere"]
    },
    // ─── Design Grammar ──────────────────────────────────────────────────────
    {
        path: "after-hours://system/grammar-design-rules",
        title: "Interface Grammar",
        category: "system",
        status: "FILED",
        version: "1.0.0",
        filed: "2026-05-26",
        role: "Visual syntax and grid layout principles.",
        dependencies: ["/src/constants/colors.ts", "/components/os/windowBevel.ts"],
        tags: ["design", "typography", "bevels", "palette"],
        content: {
            en: "Workstation interface layout guidelines. Interfaces must favor strict alignment, high density, sharp-edged contours, and constrained double-bevel borders.\n\nGradients are prohibited except within the Start Menu vertical spine column. box-shadow is fully disabled. Visual weight relies on 15–20% luminance contrast changes in the warm charcoal palette: surface #2a2d2e, teal accent #3e9697, active title bar #1a3a3d, default text #a0a4a6.\n\nTypography: MSSerif (system font, 13px) for interface text. Monospace for paths, tags, and status. No border-radius above 0.",
            id: "Panduan tata letak antarmuka workstation. Antarmuka harus mengutamakan keselarasan ketat, kerapatan tinggi, kontur bermata tajam, dan batas bevel ganda yang tertahan.\n\nGradien dilarang kecuali dalam kolom tulang belakang vertikal Start Menu. box-shadow sepenuhnya dinonaktifkan."
        },
        related: ["after-hours://system/grammar-atmosphere", "after-hours://system/window-shell"]
    },
    {
        path: "after-hours://system/grammar-atmosphere",
        title: "Emotional Restraint",
        category: "system",
        status: "FILED",
        version: "1.0.0",
        filed: "2026-05-26",
        role: "Atmospheric framing and emotional constraints.",
        dependencies: [],
        tags: ["aesthetic", "tone", "archival", "restraint"],
        content: {
            en: "The emotional core of the AFTER-HOURS workstation. The environment evokes the quiet, infrastructural focus of a digital terminal operating at 2:00 AM — an institutional archive accessed outside of business hours.\n\nDesign decisions prioritize restraint over parody. The project is not a vaporwave aesthetic exercise, not a retro-comedy OS clone, and not a modern SaaS product. It is a remembered operating environment: atmospheric, archival, and operationally serious.",
            id: "Inti emosional dari workstation AFTER-HOURS. Lingkungan ini membangkitkan fokus tenang dan struktural dari terminal digital yang beroperasi pada jam 2 pagi — arsip institusional yang diakses di luar jam kerja."
        },
        related: ["after-hours://system/grammar-design-rules", "after-hours://system/crt-display"]
    },
    // ─── Project Logs ────────────────────────────────────────────────────────
    {
        path: "after-hours://system/log-breakthroughs",
        title: "System Breakthroughs",
        category: "system",
        status: "FILED",
        version: "1.0.0",
        filed: "2026-05-26",
        role: "Historical system achievement logs.",
        dependencies: [],
        tags: ["milestones", "webassembly", "shaders", "bevels"],
        content: {
            en: "Chronicle of system achievements during active development:\n\n— Integration of the React desktop layer into the Three.js 3D screen space viewport via iframe projection.\n— High-precision sub-bevel outline rendering using BEVEL constants with 15–20% luminance delta.\n— Mapping DOSBox binary assets through WebAssembly for in-browser emulation.\n— Full keyboard-navigable taskbar and start menu interfaces without external navigation libraries.",
            id: "Kronik pencapaian sistem selama pengembangan aktif:\n\n— Integrasi lapisan desktop React ke dalam viewport 3D Three.js melalui proyeksi iframe.\n— Rendering garis bevel sub-presisi tinggi menggunakan konstanta BEVEL.\n— Pemetaan aset biner DOSBox melalui WebAssembly.\n— Antarmuka taskbar dan start menu yang dapat dinavigasi keyboard sepenuhnya."
        },
        related: ["after-hours://system/log-current", "after-hours://stack/threejs"]
    },
    {
        path: "after-hours://system/log-current",
        title: "Active Log Entry",
        category: "system",
        status: "FILED",
        version: "1.1.0",
        filed: "2026-05-26",
        role: "Active implementation timeline tracking.",
        dependencies: ["/components/applications/ArchiveBrowser.tsx"],
        tags: ["active-sprint", "archival", "retrieval", "knowledge-base"],
        content: {
            en: "Operational log entry for the active development cycle.\n\nThis cycle implements the first-pass and knowledge-refinement passes of the Internal Archive Network (archive.sys). The system now supports three-category retrieval (stack, system, knowledge), a 14-record IT knowledge base, bilingual content (EN/ID), and the installedInProject field distinguishing active stack from reference material.",
            id: "Entri log operasional untuk siklus pengembangan aktif.\n\nSiklus ini mengimplementasikan pass pertama dan pass penyempurnaan pengetahuan dari Jaringan Arsip Internal (archive.sys). Sistem sekarang mendukung pengambilan tiga kategori (stack, system, knowledge), basis pengetahuan IT 14 catatan, konten bilingual (EN/ID)."
        },
        related: ["after-hours://system/log-breakthroughs", "after-hours://system/archive-browser"]
    }
];
