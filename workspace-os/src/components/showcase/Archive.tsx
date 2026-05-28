import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';

export interface ArchiveProps {}

type NoteTag =
    | 'build'
    | 'process'
    | 'decision'
    | 'reflection'
    | 'todo'
    | 'observation';

interface LabNote {
    id: string;
    timestamp: string;
    tag: NoteTag;
    title: string;
    body: string[];
}

const getNotes = (lang: string): LabNote[] => [
    {
        id: 'LN-009',
        timestamp: '2025.05.21',
        tag: 'build',
        title: lang === 'id' ? 'perluasan bagian workspace-os' : 'workspace-os section expansion',
        body: lang === 'id' ? [
            'Menambahkan struktur dunia baru ke lapisan OS: Operators, Channel, Systems, Archive, Experiments, Lab Notes.',
            'Setiap bagian mengikuti estetika log terminal yang sama seperti pada versi awal.',
            'Mempertahankan rute ABOUT / EXPERIENCE / PROJECTS / CONTACT yang lama tetap aktif selama masa transisi.',
            'Navigasi menjadi semakin panjang — perlu memikirkan pengorganisasian sebelum pembersihan akhir.',
        ] : [
            'Adding new world structure to the OS layer: Operators, Channel, Systems, Archive, Experiments, Lab Notes.',
            'Each section follows the same terminal log aesthetic established in the initial build.',
            'Keeping the old ABOUT / EXPERIENCE / PROJECTS / CONTACT routes live during transition.',
            'Navigation is getting longer — will need to think about organization before final cleanup.',
        ],
    },
    {
        id: 'LN-008',
        timestamp: '2025.04.18',
        tag: 'decision',
        title: lang === 'id' ? 'jembatan iframe dibanding penyematan komponen' : 'iframe bridge over component embedding',
        body: lang === 'id' ? [
            'Memutuskan untuk menjalankan lapisan OS di dalam iframe daripada menyematkannya langsung sebagai overlay DOM pada kanvas Three.js.',
            'Pemisahan ini berarti OS bisa crash atau dimuat ulang tanpa mempengaruhi scene 3D.',
            'Protokol postMessage menangani komunikasi antar-konteks yang diperlukan.',
            'Isolasi performa adalah alasan utamanya. Loop centang 3D tidak peduli dengan render React.',
        ] : [
            'Decided to keep the OS layer running inside an iframe rather than embedding it directly as a DOM overlay on the Three.js canvas.',
            'The decoupling means the OS can crash or reload without affecting the 3D scene.',
            'postMessage protocol handles any necessary cross-context communication.',
            'Performance isolation is the main reason. The 3D tick loop does not care about React renders.',
        ],
    },
    {
        id: 'LN-007',
        timestamp: '2025.04.02',
        tag: 'observation',
        title: lang === 'id' ? 'tentang mendesain untuk atmosfer vs fungsionalitas' : 'on designing for atmosphere vs usability',
        body: lang === 'id' ? [
            'Ada ketegangan antara membuat sesuatu terasa pas dan membuatnya mudah digunakan.',
            'Estetika OS retro memaksakan batasan — segala sesuatu harus terasa sedikit lambat, disengaja, dan tidak sempurna.',
            'Konvensi UX modern (umpan balik instan, animasi halus, keterjangkauan yang jelas) dapat merusak suasana.',
            'Tujuannya bukan untuk memaksimalkan kegunaan. Melainkan memaksimalkan imersi.',
            'Pengguna yang sejalan dengan ini akan menemukannya. Pengguna yang tidak akan pergi. Tidak apa-apa.',
        ] : [
            'There is a tension between making things feel right and making them easy to use.',
            'The retro OS aesthetic imposes constraints — things should feel slightly slow, deliberate, and imperfect.',
            'Modern UX conventions (instant feedback, smooth animations, obvious affordances) can break the atmosphere.',
            'The goal is not to maximize usability. It is to maximize immersion.',
            'Users who resonate with this will find it. Users who do not will leave. That is fine.',
        ],
    },
    {
        id: 'LN-006',
        timestamp: '2025.03.15',
        tag: 'build',
        title: lang === 'id' ? 'sistem font: pasangan Terminal + Millennium' : 'font system: Terminal + Millennium pairing',
        body: lang === 'id' ? [
            'Memilih Terminal (monospace, nuansa bitmap retro) untuk label, metadata, kunci, dan krom UI.',
            'Millennium (serif, sedikit bernuansa tajuk rencana) untuk teks isi dan prosa.',
            'Kontras antara keduanya membawa sebagian besar hierarki tanpa memerlukan perubahan ukuran.',
            'h1 menggunakan gastromond — bobot besar dan tajuk untuk judul halaman saja.',
            'Pasangan ini sekarang menjadi sistem desain di seluruh bagian workspace-os.',
        ] : [
            'Settled on Terminal (monospace, retro bitmap feel) for labels, metadata, keys, and UI chrome.',
            'Millennium (serif, slightly editorial) for body text and prose.',
            'The contrast between the two carries most of the hierarchy without needing size changes.',
            'h1 uses gastromond — large, editorial weight for page titles only.',
            'This pairing is now the design system across all workspace-os sections.',
        ],
    },
    {
        id: 'LN-005',
        timestamp: '2025.02.28',
        tag: 'process',
        title: lang === 'id' ? 'membangun sistem jendela dari awal' : 'building the windowing system from scratch',
        body: lang === 'id' ? [
            'Tanpa pustaka jendela pihak ketiga — membangun fungsionalitas seret, ubah ukuran, minimalkan, dan fokus z-index dari prinsip dasar.',
            'Seret diimplementasikan melalui pendengar mousedown/mousemove/mouseup pada dokumen, bukan elemen.',
            'Ubah ukuran menggunakan pendekatan serupa dengan deteksi sudut pegangan.',
            'Z-index dikelola melalui tumpukan fokus — jendela yang paling baru berinteraksi naik ke atas.',
            'Batasan dari pendekatan ini menjaga perilakunya tetap konsisten dengan konvensi OS retro.',
        ] : [
            'No third-party windowing library — built drag, resize, minimize, and z-index focus from first principles.',
            'Drag implemented via mousedown/mousemove/mouseup listeners on document rather than element.',
            'Resize uses a similar approach with resize handle corner detection.',
            'Z-index managed via a focus stack — most recently interacted window rises to top.',
            'The constraints of this approach keep the behavior consistent with retro OS conventions.',
        ],
    },
    {
        id: 'LN-004',
        timestamp: '2025.02.10',
        tag: 'reflection',
        title: lang === 'id' ? 'mengapa ruang kerja 3D' : 'why the 3D workspace',
        body: lang === 'id' ? [
            'Portofolio yang terlihat seperti portofolio selalu terasa seperti sebuah pertunjukan.',
            'Ruang kerja 3D adalah upaya untuk membuat karya tersebut terasa seperti ditemukan daripada disajikan.',
            'Jika seseorang menjelajahinya dan menemukan lapisan OS serta membuka jendela — itulah pengalaman yang dimaksudkan.',
            'Suasana harus berbicara lebih dulu sebelum konten apa pun.',
            'Atmosfer sebagai argumen.',
        ] : [
            'A portfolio that looks like a portfolio always feels like a performance.',
            'The 3D workspace is an attempt to make the work feel found rather than presented.',
            'If someone explores it and discovers the OS layer and opens a window — that is the intended experience.',
            'The atmosphere should do the talking before any content does.',
            'Atmosphere as argument.',
        ],
    },
    {
        id: 'LN-003',
        timestamp: '2025.01.22',
        tag: 'build',
        title: lang === 'id' ? 'keputusan tumpukan pasca-pemrosesan' : 'post-processing stack decisions',
        body: lang === 'id' ? [
            'Menggunakan EffectComposer Three.js dengan urutan lintasan kustom.',
            'Urutan: RenderPass → UnrealBloomPass → FilmPass kustom (butiran + garis pindai) → ShaderPass (vignette).',
            'Ambang batas mekar dijaga tinggi — hanya elemen paling terang yang mekar. Mencegah kekeruhan.',
            'Intensitas butiran film diatur rendah — tekstur tanpa gangguan.',
            'Vignette menggelapkan sudut dan menambatkan adegan. Membantu fokus pada interior ruang kerja.',
        ] : [
            'Using Three.js EffectComposer with a custom pass sequence.',
            'Order: RenderPass → UnrealBloomPass → custom FilmPass (grain + scanlines) → ShaderPass (vignette).',
            'Bloom threshold kept high — only the brightest elements bloom. Prevents muddiness.',
            'Film grain intensity set low — texture without distraction.',
            'Vignette darkens corners and anchors the scene. Helps focus on the workspace interior.',
        ],
    },
    {
        id: 'LN-002',
        timestamp: '2024.12.05',
        tag: 'todo',
        title: lang === 'id' ? 'hal-hal yang pada akhirnya harus diselesaikan' : 'things to finish eventually',
        body: lang === 'id' ? [
            'Visualisasi cakupan audio di monitor dalam ruangan 3D.',
            'Pencahayaan ambien berbasis jam — ruangan menjadi lebih gelap lewat tengah malam.',
            'Partikel debu reaktif kursor mengambang di cahaya adegan.',
            'Indikator kehadiran WebSocket — tampilkan saat operator lain sedang online.',
            'Efek suara mengetik pada peristiwa keyboard lapisan OS.',
            'Pengalaman cadangan seluler — versi 2D dari ruang kerja untuk layar kecil.',
        ] : [
            'Audio scope visualization on the monitor inside the 3D room.',
            'Clock-driven ambient lighting — room gets darker past midnight.',
            'Cursor-reactive dust particles floating in the scene light.',
            'WebSocket presence indicator — show when another operator is online.',
            'Typing sound effects on the OS layer keyboard events.',
            'Mobile fallback experience — 2D version of the workspace for small screens.',
        ],
    },
    {
        id: 'LN-001',
        timestamp: '2024.11.01',
        tag: 'build',
        title: lang === 'id' ? 'entri pertama — awal proyek' : 'first entry — project start',
        body: lang === 'id' ? [
            'Mulai membangun ruang kerja 3D. Idenya: portofolio yang terasa seperti sebuah tempat, bukan halaman.',
            'Adegan awal: ruangan kosong. Monitor di atas meja. Jendela dengan pemandangan kota. Cahaya ambien.',
            'Tantangan pertama: membuat kamera terasa sinematik tanpa dikendalikan oleh pengguna.',
            'Memilih paralaks melayang perlahan berdasarkan posisi kursor — cukup halus untuk terasa hidup.',
            'Ruangan itu harus terasa seperti tempat seseorang benar-benar bekerja. Larut malam.',
        ] : [
            'Started building the 3D workspace. The idea: a portfolio that feels like a place, not a page.',
            'Initial scene: an empty room. Monitor on a desk. A window with a city view. Ambient light.',
            'First challenge: making the camera feel cinematic without being controlled by the user.',
            'Settled on a slow, drifting parallax based on cursor position — subtle enough to feel alive.',
            'The room needs to feel like somewhere someone actually works. Late at night.',
        ],
    },
];

const TAG_META: Record<NoteTag, { label: string; color: string }> = {
    build: { label: 'build', color: '#3a5a3a' },
    process: { label: 'process', color: '#444' },
    decision: { label: 'decision', color: '#3a3a6a' },
    reflection: { label: 'reflection', color: '#5a3a5a' },
    todo: { label: 'todo', color: '#7a5c1e' },
    observation: { label: 'observation', color: '#555' },
};

interface NoteEntryProps {
    note: LabNote;
    defaultOpen?: boolean;
}

const NoteEntry: React.FC<NoteEntryProps> = ({
    note,
    defaultOpen = false,
}) => {
    const [expanded, setExpanded] = useState(defaultOpen);
    const [hovered, setHovered] = useState(false);
    const meta = TAG_META[note.tag];

    return (
        <div style={styles.entry}>
            <div
                style={Object.assign(
                    {},
                    styles.entryHeader,
                    hovered && styles.entryHeaderHovered
                )}
                onMouseDown={() => setExpanded((v) => !v)}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <span style={styles.entryId}>{note.id}</span>
                <span style={styles.entryTimestamp}>{note.timestamp}</span>
                <span
                    style={Object.assign({}, styles.entryTag, {
                        color: meta.color,
                    })}
                >
                    [{meta.label}]
                </span>
                <span style={styles.entryTitle}>{note.title}</span>
                <span style={styles.expandToggle}>
                    {expanded ? '−' : '+'}
                </span>
            </div>

            {expanded && (
                <div style={styles.entryBody}>
                    {note.body.map((line, i) => (
                        <p key={i} style={styles.bodyLine}>
                            {line}
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
};

type ArchiveStatus = 'complete' | 'archived' | 'incomplete' | 'abandoned';

interface ArchiveRecord {
    id: string;
    year: string;
    tag: string;
    name: string;
    status: ArchiveStatus;
    type: string;
    description: string;
    notes: string[];
}

const getRecords = (lang: string): ArchiveRecord[] => [
    {
        id: 'ARC-001',
        year: '2025',
        tag: 'workspace-3d',
        name: 'AFTER-HOURS Workspace',
        status: 'complete',
        type: lang === 'id' ? 'lingkungan imersif' : 'immersive environment',
        description: lang === 'id' ?
            'Ruang kerja 3D sinematik yang dibangun di dalam browser. Ruangan yang dirender WebGL, sistem kamera kustom, lapisan OS retro yang disematkan melalui iframe. Dibangun sebagai kolektif digital yang tenang.' :
            'A cinematic 3D workspace built inside the browser. WebGL-rendered room, custom camera system, retro OS layer embedded via iframe. Built as a quiet digital collective.',
        notes: lang === 'id' ? [
            'Adegan Three.js dengan alur pasca-pemrosesan kustom',
            'Sistem jendela OS retro (React) yang disematkan di dalam render 3D',
            'Shader GLSL kustom — garis pindai, noise, vignette CRT',
            'Nodemailer + Express backend untuk lapisan transmisi',
            'Integrasi audio ambien dengan kontrol bungkam',
        ] : [
            'Three.js scene with custom post-processing pipeline',
            'Retro OS windowing system (React) embedded inside 3D render',
            'Custom GLSL shaders — scanlines, noise, CRT vignette',
            'Nodemailer + Express backend for transmission layer',
            'Ambient audio integration with mute control',
        ],
    },
    {
        id: 'ARC-002',
        year: '2025',
        tag: 'workspace-os',
        name: 'Retro OS Interface Layer',
        status: 'complete',
        type: lang === 'id' ? 'sistem antarmuka' : 'interface system',
        description: lang === 'id' ?
            'Lapisan OS berjendela yang berjalan di dalam ruang 3D. Seret, ubah ukuran, minimalkan. Navigasi, etalase, transmisi — semuanya hidup di dalam lingkungan desktop retro.' :
            'The windowed OS layer running inside the 3D room. Drag, resize, minimize. Navigation, showcase, transmission — all living inside a retro desktop environment.',
        notes: lang === 'id' ? [
            'Sistem jendela kustom dengan seret dan ubah ukuran',
            'React Router untuk navigasi dalam jendela',
            'Sistem font Millennium + Terminal',
            'Bahasa batas bayangan kotak gaya Windows 95',
            'Bagian Showcase, Systems, Operators, Channel',
        ] : [
            'Custom windowing system with drag and resize',
            'React Router for in-window navigation',
            'Millennium + Terminal font system',
            'Windows 95-style box-shadow border language',
            'Showcase, Systems, Operators, Channel sections',
        ],
    },
    {
        id: 'ARC-003',
        year: '2024',
        tag: 'portfolio-v2',
        name: 'Portfolio Site v2',
        status: 'archived',
        type: lang === 'id' ? 'proyek web' : 'web project',
        description: lang === 'id' ?
            'Iterasi portofolio pribadi sebelumnya. SPA standar, berbasis React. Digantikan oleh pendekatan ruang kerja 3D.' :
            'Previous iteration of the personal portfolio. Standard SPA, React-based. Replaced by the 3D workspace approach.',
        notes: lang === 'id' ? [
            'Aplikasi halaman tunggal React + TypeScript',
            'Etalase proyek, pengalaman, formulir kontak',
            'Basis kode dasar yang kemudian diadaptasi menjadi workspace-os',
        ] : [
            'React + TypeScript single page application',
            'Showcase of projects, experience, contact form',
            'Foundation codebase later adapted into workspace-os',
        ],
    },
    {
        id: 'ARC-004',
        year: '2024',
        tag: 'shader-studies',
        name: 'GLSL Shader Studies',
        status: 'archived',
        type: lang === 'id' ? 'eksperimen / visual' : 'experiments / visual',
        description: lang === 'id' ?
            'Koleksi eksplorasi shader fragmen GLSL. Bidang noise, tekstur prosedural, distorsi ruang layar. Beberapa di antaranya masuk ke dalam alur ruang kerja.' :
            'Collection of GLSL fragment shader explorations. Noise fields, procedural textures, screen-space distortion. Some made it into the workspace pipeline.',
        notes: lang === 'id' ? [
            'Bidang noise Simplex dan Perlin',
            'Butiran beranimasi dan lapisan tekstur film',
            'Garis pindai CRT dan simulasi cahaya fosfor',
            'Distorsi UV dan uji aberasi kromatik',
        ] : [
            'Simplex and Perlin noise fields',
            'Animated grain and film texture overlays',
            'CRT scanline and phosphor glow simulations',
            'UV distortion and chromatic aberration tests',
        ],
    },
    {
        id: 'ARC-005',
        year: '2023',
        tag: 'audio-viz',
        name: 'Audio Visualizer Prototype',
        status: 'incomplete',
        type: lang === 'id' ? 'prototipe / audio' : 'prototype / audio',
        description: lang === 'id' ?
            'Visualizer audio waktu nyata menggunakan Web Audio API dan WebGL. Data frekuensi mendorong perpindahan titik pada mesh. Tidak pernah selesai, tetapi pendekatannya masuk akal.' :
            'Real-time audio visualizer using Web Audio API and WebGL. Frequency data driving vertex displacement on a mesh. Never finished, but the approach was sound.',
        notes: lang === 'id' ? [
            'Analisis frekuensi Web Audio API',
            'Data FFT dipetakan ke seragam shader titik',
            'Eksperimen ambang batas deteksi ketukan',
            'Dibiarkan tidak lengkap — konsep mungkin akan muncul kembali',
        ] : [
            'Web Audio API frequency analysis',
            'FFT data mapped to vertex shader uniforms',
            'Beat detection threshold experiments',
            'Left incomplete — concept may resurface',
        ],
    },
    {
        id: 'ARC-006',
        year: '2023',
        tag: 'cursor-system',
        name: 'Custom Cursor System',
        status: 'archived',
        type: lang === 'id' ? 'eksperimen antarmuka' : 'interface experiment',
        description: lang === 'id' ?
            'Sistem kursor kustom untuk antarmuka web. Perilaku magnetik, riak klik, perubahan bentuk yang sadar konteks. Terasa terlalu mencolok untuk estetika ruang kerja.' :
            'A custom cursor system for web interfaces. Magnetic behavior, click ripples, context-aware shape shifting. Felt too loud for the workspace aesthetic.',
        notes: lang === 'id' ? [
            'Pelacakan kursor halus berbasis Lerp',
            'Daya tarik magnetik ke elemen interaktif',
            'Riak klik dan status animasi diam',
            'Dikesampingkan — ruang kerja lebih menyukai konvensi kursor OS',
        ] : [
            'Lerp-based smooth cursor following',
            'Magnetic attraction to interactive elements',
            'Click ripple and idle animation states',
            'Shelved — workspace favors OS cursor conventions',
        ],
    },
    {
        id: 'ARC-007',
        year: '2022',
        tag: 'backend-tooling',
        name: 'Internal CLI Tools',
        status: 'abandoned',
        type: lang === 'id' ? 'perkakas' : 'tooling',
        description: lang === 'id' ?
            'Serangkaian utilitas baris perintah Node.js untuk perancah proyek dan pembuatan file. Ditinggalkan demi perkakas ekosistem yang ada.' :
            'A set of Node.js command-line utilities for project scaffolding and file generation. Abandoned in favor of existing ecosystem tools.',
        notes: lang === 'id' ? [
            'Pembuatan template dari skema JSON',
            'Skrip perancah struktur file',
            'Digantikan oleh perkakas standar (Vite, CRA)',
        ] : [
            'Template generation from JSON schemas',
            'File structure scaffolding scripts',
            'Replaced by standard tooling (Vite, CRA)',
        ],
    },
];

const STATUS_META: Record<ArchiveStatus, { label: string; color: string }> = {
    complete: { label: 'complete', color: '#444' },
    archived: { label: 'archived', color: '#888' },
    incomplete: { label: 'incomplete', color: '#7a5c1e' },
    abandoned: { label: 'abandoned', color: '#9a3030' },
};

interface RecordEntryProps {
    record: ArchiveRecord;
}

const RecordEntry: React.FC<RecordEntryProps> = ({ record }) => {
    const [expanded, setExpanded] = useState(false);
    const [hovered, setHovered] = useState(false);
    const meta = STATUS_META[record.status];

    return (
        <div style={styles.entry}>
            <div
                style={Object.assign(
                    {},
                    styles.entryHeader,
                    hovered && styles.entryHeaderHovered
                )}
                onMouseDown={() => setExpanded((v) => !v)}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <span style={styles.entryId}>{record.id}</span>
                <span style={styles.entryYear}>{record.year}</span>
                <span style={styles.entryTag}>{record.tag}</span>
                <span style={styles.entryName}>{record.name}</span>
                <span
                    style={Object.assign({}, styles.entryStatus, {
                        color: meta.color,
                    })}
                >
                    [{meta.label}]
                </span>
                <span style={styles.expandToggle}>
                    {expanded ? '−' : '+'}
                </span>
            </div>

            {expanded && (
                <div style={styles.entryBody}>
                    <div style={styles.metaRow}>
                        <span style={styles.metaKey}>TYPE</span>
                        <span style={styles.metaSep}>::</span>
                        <span style={styles.metaVal}>{record.type}</span>
                    </div>
                    <div style={styles.logDivider} />
                    <p style={styles.description}>{record.description}</p>
                    <div style={styles.logDivider} />
                    {record.notes.map((note, i) => (
                        <div key={i} style={styles.noteRow}>
                            <span style={styles.noteBullet}>›</span>
                            <span style={styles.noteText}>{note}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const Archive: React.FC<ArchiveProps> = () => {
    const { language } = useLanguage();
    const byStatus = (s: ArchiveStatus) =>
        getRecords(language).filter((r) => r.status === s).length;

    return (
        <div className="site-page-content">
            <div style={styles.pageHeader}>
                <h1 style={styles.title}>Archive</h1>
                <p style={styles.subtitle}>
                    AFTER-HOURS / {language === 'id' ? 'registrasi proyek & artefak' : 'project & artifact registry'}
                </p>
            </div>

            <div style={styles.statsRow}>
                {(
                    [
                        ['complete', byStatus('complete')],
                        ['archived', byStatus('archived')],
                        ['incomplete', byStatus('incomplete')],
                        ['abandoned', byStatus('abandoned')],
                    ] as [ArchiveStatus, number][]
                ).map(([s, count], i, arr) => (
                    <React.Fragment key={s}>
                        <div style={styles.stat}>
                            <span
                                style={Object.assign({}, styles.statValue, {
                                    color: STATUS_META[s].color,
                                })}
                            >
                                {count}
                            </span>
                            <span style={styles.statLabel}>{s}</span>
                        </div>
                        {i < arr.length - 1 && (
                            <div style={styles.statSep} />
                        )}
                    </React.Fragment>
                ))}
            </div>

            <div style={styles.terminalLine}>
                <span style={styles.terminalPrompt}>{'>'}</span>
                <span style={styles.terminalCmd}>
                    archive --read --all --sort=year
                </span>
            </div>

            <div style={styles.recordList}>
                {getRecords(language).map((record) => (
                    <RecordEntry key={record.id} record={record} />
                ))}
            </div>

            {/* Build Diary Section */}
            <div style={{ marginTop: 40, marginBottom: 20 }}>
                <div style={styles.logDivider} />
                <p style={styles.subtitle}>— {language === 'id' ? 'buku harian pembangunan' : 'build diary'}</p>
            </div>

            <div style={styles.recordList}>
                {getNotes(language).map((note, i) => (
                    <NoteEntry
                        key={note.id}
                        note={note}
                        defaultOpen={i === 0}
                    />
                ))}
            </div>

            <div style={styles.footer}>
                <p style={styles.footerText}>
                    {language === 'id'
                        ? `— ${getRecords(language).length} catatan. beberapa selesai. beberapa tidak. semuanya di sini.`
                        : `— ${getRecords(language).length} records. some finished. some not. all here.`}
                </p>
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    pageHeader: { marginBottom: 8, marginLeft: -16 },
    title: { lineHeight: 1, marginBottom: 6 },
    subtitle: {
        fontFamily: 'Terminal, Courier New, monospace',
        fontSize: 13,
        letterSpacing: 2,
        color: '#555',
        marginTop: 8,
        textTransform: 'uppercase' as const,
    },

    statsRow: {
        display: 'flex',
        flexDirection: 'row' as const,
        alignItems: 'center',
        marginTop: 24,
        marginBottom: 28,
        gap: 0,
    },
    stat: { flexDirection: 'column', paddingRight: 24 },
    statValue: {
        fontFamily: 'Terminal, Courier New, monospace',
        fontSize: 20,
        display: 'block',
        lineHeight: 1.1,
        letterSpacing: 1,
    },
    statLabel: {
        fontFamily: 'Terminal, Courier New, monospace',
        fontSize: 10,
        color: '#aaa',
        letterSpacing: 2,
        textTransform: 'uppercase' as const,
        display: 'block',
        marginTop: 2,
    },
    statSep: {
        width: 1,
        height: 28,
        backgroundColor: '#ccc',
        marginRight: 24,
        flexShrink: 0,
    },

    terminalLine: {
        display: 'flex',
        flexDirection: 'row' as const,
        alignItems: 'center',
        fontFamily: 'Terminal, Courier New, monospace',
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
        gap: 8,
        letterSpacing: 1,
    },
    terminalPrompt: { color: '#444', fontWeight: 'bold', flexShrink: 0 },
    terminalCmd: { color: '#555' },

    recordList: {
        flexDirection: 'column',
        borderTop: '1px solid #b8b8b8',
    },

    entry: { flexDirection: 'column', borderBottom: '1px solid #b8b8b8' },
    entryHeader: {
        display: 'flex',
        flexDirection: 'row' as const,
        alignItems: 'baseline',
        padding: '13px 0',
        gap: 14,
        cursor: 'pointer',
        backgroundColor: 'transparent',
        transition: 'background-color 0.1s',
    },
    entryHeaderHovered: { backgroundColor: 'rgba(0,0,0,0.035)' },
    entryId: {
        fontFamily: 'Terminal, Courier New, monospace',
        fontSize: 11,
        color: '#aaa',
        letterSpacing: 1,
        minWidth: 60,
        flexShrink: 0,
    },
    entryYear: {
        fontFamily: 'Terminal, Courier New, monospace',
        fontSize: 11,
        color: '#bbb',
        minWidth: 36,
        flexShrink: 0,
    },
    entryTag: {
        fontFamily: 'Terminal, Courier New, monospace',
        fontSize: 11,
        color: '#999',
        letterSpacing: 0.5,
        minWidth: 110,
        flexShrink: 0,
    },
    entryName: {
        fontFamily: 'Millennium, Times New Roman, serif',
        fontSize: 16,
        color: '#222',
        flex: 1,
    },
    entryStatus: {
        fontFamily: 'Terminal, Courier New, monospace',
        fontSize: 11,
        letterSpacing: 1,
        flexShrink: 0,
    },
    expandToggle: {
        fontFamily: 'monospace',
        fontSize: 16,
        color: '#aaa',
        flexShrink: 0,
        minWidth: 16,
        textAlign: 'right' as const,
    },

    entryBody: {
        flexDirection: 'column',
        paddingLeft: 72,
        paddingBottom: 20,
        paddingTop: 4,
    },
    metaRow: {
        display: 'flex',
        flexDirection: 'row' as const,
        alignItems: 'baseline',
        gap: 8,
        marginBottom: 4,
    },
    metaKey: {
        fontFamily: 'Terminal, Courier New, monospace',
        fontSize: 11,
        color: '#aaa',
        letterSpacing: 2,
        textTransform: 'uppercase' as const,
        minWidth: 44,
    },
    metaSep: {
        fontFamily: 'Terminal, Courier New, monospace',
        fontSize: 11,
        color: '#ccc',
    },
    metaVal: {
        fontFamily: 'Terminal, Courier New, monospace',
        fontSize: 12,
        color: '#666',
        letterSpacing: 0.5,
    },
    logDivider: {
        height: 1,
        backgroundColor: '#e0e0e0',
        marginTop: 10,
        marginBottom: 10,
        width: '100%',
    },
    description: {
        fontFamily: 'Millennium, Times New Roman, serif',
        fontSize: 15,
        color: '#444',
        lineHeight: 1.65,
        maxWidth: 520,
    },
    noteRow: {
        display: 'flex',
        flexDirection: 'row' as const,
        alignItems: 'baseline',
        gap: 10,
        marginBottom: 5,
    },
    noteBullet: {
        fontFamily: 'Terminal, Courier New, monospace',
        fontSize: 12,
        color: '#ccc',
        flexShrink: 0,
    },
    noteText: {
        fontFamily: 'Terminal, Courier New, monospace',
        fontSize: 12,
        color: '#666',
        letterSpacing: 0.3,
        lineHeight: 1.5,
    },

    entryTimestamp: {
        fontFamily: 'Terminal, Courier New, monospace',
        fontSize: 11,
        color: '#aaa',
        minWidth: 76,
        flexShrink: 0,
        letterSpacing: 0.5,
    },
    entryTitle: {
        fontFamily: 'Millennium, Times New Roman, serif',
        fontSize: 16,
        color: '#222',
        flex: 1,
    },
    bodyLine: {
        fontFamily: 'Millennium, Times New Roman, serif',
        fontSize: 15,
        color: '#444',
        lineHeight: 1.7,
        marginBottom: 10,
        maxWidth: 520,
        textAlign: 'justify' as const,
    },

    // Footer
    footer: {
        marginTop: 48,
        paddingTop: 16,
        borderTop: '1px solid #d0d0d0',
    },
    footerText: {
        fontFamily: 'Terminal, Courier New, monospace',
        fontSize: 11,
        color: '#aaa',
        letterSpacing: 1,
    },
};

export default Archive;
