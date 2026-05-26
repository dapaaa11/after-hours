import { ArchiveNode } from './types';

export const stackNodes: ArchiveNode[] = [
    {
        path: "after-hours://stack/react",
        title: "React",
        category: "stack",
        status: "FILED",
        version: "17.0.2",
        filed: "2026-05-26",
        role: "Core user interface construction library.",
        language: "JavaScript / TypeScript",
        environment: "Browser",
        installedInProject: true,
        dependencies: ["react-dom"],
        tags: ["interface", "rendering", "vdom", "components"],
        content: {
            en: "A component-driven interface layer running on version 17.0.2. It acts as the core UI engine for the workstation environment, coordinating virtual DOM reconciliation, state updates, and the execution of desktop applications.\n\nThis environment uses React 17, which predates the concurrent rendering model introduced in React 18. Components render synchronously within the desktop shell. The window manager, task bar, start menu, and all application panels are React function components.",
            id: "Lapisan antarmuka berbasis komponen yang berjalan pada versi 17.0.2. React bertindak sebagai mesin UI utama untuk lingkungan workstation, mengoordinasikan rekonsiliasi virtual DOM, pembaruan state, dan eksekusi aplikasi desktop.\n\nLingkungan ini menggunakan React 17, sebelum model rendering konkuren yang diperkenalkan di React 18. Komponen dirender secara sinkron di dalam shell desktop."
        },
        related: ["after-hours://system/window-shell", "after-hours://system/start-menu", "after-hours://knowledge/react"]
    },
    {
        path: "after-hours://stack/typescript",
        title: "TypeScript",
        category: "stack",
        status: "FILED",
        version: "4.6.2",
        filed: "2026-05-26",
        role: "Static type safety compiler and structural contract enforcer.",
        language: "TypeScript",
        environment: "Build-time",
        installedInProject: true,
        dependencies: [],
        tags: ["compiler", "type-safety", "ecmascript"],
        content: {
            en: "A strictly typed syntactic superset of JavaScript, compiled to clean ES5/ES6 output at build time. This environment uses TypeScript 4.6.2 across both the OS workspace and the 3D room workspace.\n\nIt enforces structural contracts across window components, application registries, archive data models, and the main desktop shell. Type errors are caught at compile time, reducing runtime failures during late-night development sessions.",
            id: "Superset sintaksis JavaScript dengan tipe data ketat, dikompilasi menjadi ES5/ES6 bersih saat build time. Lingkungan ini menggunakan TypeScript 4.6.2 di seluruh workspace OS dan workspace 3D.\n\nTypeScript memaksakan kontrak struktural di seluruh komponen jendela, registri aplikasi, model data arsip, dan shell desktop utama."
        },
        related: ["after-hours://stack/react", "after-hours://knowledge/typescript"]
    },
    {
        path: "after-hours://stack/threejs",
        title: "Three.js",
        category: "stack",
        status: "FILED",
        version: "0.137.5",
        filed: "2026-05-26",
        role: "Low-level WebGL graphics wrapper for spatial room simulation.",
        language: "JavaScript / GLSL",
        environment: "Browser / WebGL",
        installedInProject: true,
        dependencies: ["three", "@types/three"],
        tags: ["webgl", "3d", "rendering", "shaders"],
        content: {
            en: "A low-level WebGL abstraction layer running in the workspace-3d environment. It constructs the outer physical room viewport: the computer monitor geometry, environmental lighting, shadow mapping, and the physical desk surface.\n\nCustom GLSL fragment shaders operate on the screen mesh to simulate phosphor decay traces, scanline overlay passes, and barrel curvature distortion. The workstation's React OS is embedded into the Three.js scene via an iframe projected onto the screen geometry.",
            id: "Lapisan abstraksi WebGL tingkat rendah yang berjalan di lingkungan workspace-3d. Library ini membangun viewport ruang fisik luar: geometri monitor komputer, pencahayaan lingkungan, pemetaan bayangan, dan permukaan meja fisik.\n\nShader GLSL kustom beroperasi pada mesh layar untuk mensimulasikan jejak peluruhan fosfor, overlay scanlines, dan distorsi kelengkungan barel."
        },
        related: ["after-hours://stack/webpack", "after-hours://system/crt-display"]
    },
    {
        path: "after-hours://stack/webpack",
        title: "Webpack",
        category: "stack",
        status: "FILED",
        version: "5.68.0",
        filed: "2026-05-26",
        role: "Static asset bundler and environment build controller.",
        language: "JavaScript",
        environment: "Build-time / Node.js",
        installedInProject: true,
        dependencies: ["webpack-cli", "webpack-dev-server", "webpack-merge"],
        tags: ["bundling", "build-system", "assets"],
        content: {
            en: "A modular asset bundler driving the workspace-3d build cycle. It aggregates WebGL modules, GLSL shader source fragments (via glslify-loader), TypeScript files, texture assets, and HTML templates into optimized production bundles.\n\nThe OS workspace uses react-scripts which internally bundles via Webpack as well. The 3D environment uses a custom multi-config Webpack setup (webpack.common.js / webpack.dev.js / webpack.prod.js).",
            id: "Pembungkus aset modular yang menggerakkan siklus build workspace-3d. Webpack menggabungkan modul WebGL, fragmen shader GLSL, file TypeScript, aset tekstur, dan template HTML menjadi bundle produksi yang teroptimalkan."
        },
        related: ["after-hours://stack/threejs", "after-hours://stack/express"]
    },
    {
        path: "after-hours://stack/express",
        title: "Express",
        category: "stack",
        status: "FILED",
        version: "4.17.3",
        filed: "2026-05-26",
        role: "Local server utility for serving workstation assets.",
        language: "JavaScript",
        environment: "Node.js",
        installedInProject: true,
        dependencies: ["cors", "body-parser"],
        tags: ["backend", "server", "routing", "http"],
        content: {
            en: "A minimal HTTP server framework providing backend infrastructure for the 3D workspace server. It handles local route serving, asset delivery, and basic cross-origin resource sharing policies.\n\nThis workstation does not use a full backend application framework. Express is used only as a static file and routing utility. There is no database connection, authentication layer, or REST API surface attached to this Express instance.",
            id: "Framework server HTTP minimal yang menyediakan infrastruktur backend untuk server workspace 3D. Ini menangani penyajian rute lokal, pengiriman aset, dan kebijakan CORS dasar.\n\nWorkstation ini tidak menggunakan framework aplikasi backend penuh. Express hanya digunakan sebagai utilitas file statis dan perutean."
        },
        related: ["after-hours://stack/webpack", "after-hours://knowledge/rest-api"]
    },
    {
        path: "after-hours://stack/framer-motion",
        title: "Framer Motion",
        category: "stack",
        status: "FILED",
        version: "6.2.9",
        filed: "2026-05-26",
        role: "Declarative animation layer for mechanical window simulation.",
        language: "TypeScript / React",
        environment: "Browser",
        installedInProject: true,
        dependencies: ["react"],
        tags: ["animation", "motion", "transitions", "spring"],
        content: {
            en: "A declarative animation engine integrated directly with React. In this workstation, it drives window drag physics, desktop shortcut focus state responses, and toolbar snap behaviors.\n\nFramer Motion is installed in both workspace-os and workspace-3d. Usage is deliberately constrained — no large-scale entrance/exit animation systems. The workstation interface favors mechanical snap over fluid motion.",
            id: "Mesin animasi deklaratif yang terintegrasi langsung dengan React. Di workstation ini, library ini menggerakkan fisika drag jendela, respons fokus pintasan desktop, dan perilaku snap toolbar."
        },
        related: ["after-hours://system/window-shell", "after-hours://stack/react"]
    },
    {
        path: "after-hours://stack/js-dos",
        title: "JS-DOS / Emulators-UI",
        category: "stack",
        status: "FILED",
        version: "7.3.9",
        filed: "2026-05-26",
        role: "WebAssembly-powered x86 emulation system for legacy archives.",
        language: "JavaScript / WebAssembly",
        environment: "Browser",
        installedInProject: true,
        dependencies: ["emulators-ui"],
        tags: ["emulation", "dos", "webassembly", "x86"],
        content: {
            en: "An emulated DOS shell environment built on Emulators-UI and WebAssembly. It executes raw x86 machine instructions inside the browser, allowing the workstation to launch archived legacy executables (DOOM, Oregon Trail) directly from the desktop as registered applications.\n\nThe emulator runs inside a sandboxed window component. Binary assets (WAD files, game data) are bundled and served from the build output. Keyboard input is intercepted and forwarded into the emulator context.",
            id: "Lingkungan shell DOS ter-emulasi yang dibangun di atas Emulators-UI dan WebAssembly. Menjalankan instruksi mesin x86 mentah di browser, memungkinkan workstation meluncurkan executable warisan (DOOM, Oregon Trail) langsung dari desktop."
        },
        related: ["after-hours://system/start-menu", "after-hours://stack/react"]
    }
];
