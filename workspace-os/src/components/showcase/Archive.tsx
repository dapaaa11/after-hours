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
        timestamp: '2026.05.21',
        tag: 'todo',
        title: lang === 'id' ? 'persiapan akhir penyiapan' : 'final deployment preparation',
        body: lang === 'id' ? [
            'Menyiapkan proyek untuk juri Indonesia dan konteks kompetisi pendidikan/informasi.',
            'Memastikan antarmuka bilingual (EN/ID) stabil di semua bagian sistem.',
            'Membersihkan sisa-sisa rute lama dan memastikan workspace-os berdiri sebagai lingkungan yang terpadu.',
            'Memverifikasi bahwa nada dokumentasi tetap reflektif dan menjaga ilusi OS lokal.',
        ] : [
            'Preparing the project for Indonesian judges and the education/information competition context.',
            'Ensuring the bilingual (EN/ID) interface is stable across all system sections.',
            'Cleaning up previous route remnants and making sure workspace-os stands as a unified environment.',
            'Verifying that the documentation tone remains reflective and maintains the local OS illusion.',
        ],
    },
    {
        id: 'LN-008',
        timestamp: '2026.04.18',
        tag: 'build',
        title: lang === 'id' ? 'menetapkan referensi sebagai registri' : 'establishing reference as registry',
        body: lang === 'id' ? [
            'Reference (Referensi) kini sepenuhnya berfungsi sebagai registri identitas proyek dan tim.',
            'Bagian-bagian seperti Operators, Channel, Systems, dan Build Diary menjadi komponen yang disengaja dalam arsitektur ini.',
            'Pendekatan ini memberikan konteks internal yang lebih kaya dibandingkan dokumen standar.',
            'Setiap log terasa seperti catatan sistem yang ditarik dari mesin lokal.',
        ] : [
            'Reference now fully serves as the identity registry for the project and team.',
            'Sections like Operators, Channel, Systems, and Build Diary have become intentional components of this architecture.',
            'This approach provides richer internal context compared to standard documents.',
            'Every log feels like a system record pulled directly from the local machine.',
        ],
    },
    {
        id: 'LN-007',
        timestamp: '2026.04.02',
        tag: 'build',
        title: lang === 'id' ? 'knowledge browser sebagai portal informasi' : 'knowledge browser as information portal',
        body: lang === 'id' ? [
            'Knowledge Browser telah disiapkan sebagai permukaan utama untuk pendidikan dan informasi.',
            'Menerapkan dukungan EN/ID penuh untuk memfasilitasi juri Indonesia.',
            'Sistem peruteannya meniru navigasi awal — sengaja dibatasi agar terasa seperti direktori intranet lama.',
            'Portal ini menjembatani celah antara lingkungan imersif dan penyampaian konten yang jelas.',
        ] : [
            'Knowledge Browser is now set up as the primary surface for education and information.',
            'Implemented full EN/ID support to facilitate Indonesian judges.',
            'Its routing system mimics early navigation — intentionally constrained to feel like an old intranet directory.',
            'This portal bridges the gap between the immersive environment and clear content delivery.',
        ],
    },
    {
        id: 'LN-006',
        timestamp: '2026.03.15',
        tag: 'decision',
        title: lang === 'id' ? 'pergeseran bahasa visual' : 'visual language shift',
        body: lang === 'id' ? [
            'Mengarahkan antarmuka pengguna menuju nostalgia browser lama dan Windows klasik bernuansa biru-abu.',
            'Pasangan font Terminal + Millennium berfungsi ganda: Terminal untuk krom UI, Millennium untuk teks isi.',
            'Estetika OS retro memaksakan batasan — segala sesuatu harus terasa sedikit berat, terarah, dan tidak sempurna.',
            'Tujuannya adalah imersi. Pengguna harus merasa seperti sedang mengoperasikan mesin yang tertinggal di masa lalu.',
        ] : [
            'Pivoting the user interface toward classic blue-gray Windows and old browser nostalgia.',
            'The Terminal + Millennium font pairing does double duty: Terminal for UI chrome, Millennium for prose.',
            'The retro OS aesthetic imposes constraints — things should feel slightly heavy, deliberate, and imperfect.',
            'The goal is immersion. Users should feel like they are operating a machine left behind in time.',
        ],
    },
    {
        id: 'LN-005',
        timestamp: '2026.02.28',
        tag: 'process',
        title: lang === 'id' ? 'mengembangkan sistem jendela lokal' : 'developing the local windowing system',
        body: lang === 'id' ? [
            'Tanpa pustaka jendela pihak ketiga — membangun fungsionalitas seret, ubah ukuran, minimalkan dari awal.',
            'Z-index dikelola melalui tumpukan fokus — jendela yang paling baru berinteraksi naik ke atas.',
            'Perilakunya dijaga agar tetap konsisten dengan konvensi OS retro, memperkuat gagasan bahwa ini adalah sistem tertutup.',
        ] : [
            'No third-party windowing library — built drag, resize, and minimize from first principles.',
            'Z-index managed via a focus stack — most recently interacted window rises to top.',
            'Behavior is kept strictly consistent with retro OS conventions, reinforcing the idea that this is an enclosed system.',
        ],
    },
    {
        id: 'LN-004',
        timestamp: '2026.02.10',
        tag: 'reflection',
        title: lang === 'id' ? 'memunculkan lapisan os lokal' : 'surfacing the local os layer',
        body: lang === 'id' ? [
            'workspace-os berubah menjadi lapisan sistem operasi lokal yang kecil.',
            'Dijalankan di dalam jembatan iframe, memastikan bahwa lapisan UI beroperasi secara independen dari adegan 3D.',
            'Isolasi performa ini memungkinkan OS untuk dimuat ulang atau crash tanpa menjatuhkan ruangan secara keseluruhan.',
            'Meninggalkan pola desain tradisional demi metafora ruang kerja yang utuh.',
        ] : [
            'workspace-os is evolving into a small local operating system layer.',
            'Running inside an iframe bridge, ensuring the UI layer operates independently of the 3D scene.',
            'This performance isolation allows the OS to reload or crash without taking down the room.',
            'Leaving behind traditional design patterns in favor of a complete workspace metaphor.',
        ],
    },
    {
        id: 'LN-003',
        timestamp: '2026.01.22',
        tag: 'observation',
        title: lang === 'id' ? 'identitas ruang kerja 3d' : '3d workstation identity',
        body: lang === 'id' ? [
            'workspace-3d sekarang diformat sebagai ruang fisik untuk menampung sistem operasi.',
            'Detail lingkungan ditambahkan: pembingkaian kamera sinematik, suasana monitor yang bersinar, dan label di meja.',
            'Ruangan itu terasa seperti tempat di mana sistem ini benar-benar berjalan — sunyi dan terisolasi.',
            'Tampilan overlay dan alur pasca-pemrosesan menjaga rendering tetap terasa membumi.',
        ] : [
            'workspace-3d is now formatted as the physical room housing the operating system.',
            'Environmental details added: cinematic camera framing, glowing monitor mood, and labels on the desk.',
            'The room feels like the actual place where this system runs — quiet and isolated.',
            'The overlay view and post-processing pipeline keep the rendering grounded.',
        ],
    },
    {
        id: 'LN-002',
        timestamp: '2024.12.05',
        tag: 'process',
        title: lang === 'id' ? 'tumpukan efek dan filter' : 'effects stack and filters',
        body: lang === 'id' ? [
            'Menyempurnakan alur rendering untuk workspace-3d.',
            'Ambang batas cahaya dijaga agar tinggi, memastikan hanya layar monitor yang memancarkan pendaran cahaya.',
            'Intensitas butiran film diatur rendah untuk memberikan tekstur tanpa mengganggu visibilitas OS.',
            'Vignette menggelapkan sudut ruangan, memusatkan fokus sepenuhnya pada layar terminal.',
        ] : [
            'Refining the rendering pipeline for workspace-3d.',
            'Bloom threshold kept high, ensuring only the monitor screen casts a real glow.',
            'Film grain intensity set low to provide texture without distracting from the OS visibility.',
            'Vignette darkens the room corners, centering all focus on the terminal screen.',
        ],
    },
    {
        id: 'LN-001',
        timestamp: '2024.11.01',
        tag: 'build',
        title: lang === 'id' ? 'inisialisasi sistem utama' : 'primary system initialization',
        body: lang === 'id' ? [
            'Mulai membangun lingkungan ruang kerja AFTER-HOURS.',
            'Tujuannya: menyusun kolektif digital yang terasa seperti tempat fisik, yang dioperasikan melalui OS retro.',
            'Adegan awal: ruangan kosong yang sunyi. Monitor di atas meja menyala dalam kegelapan.',
            'Hanya terminal dan alat-alat yang tertinggal.',
        ] : [
            'Started building the AFTER-HOURS workspace environment.',
            'The directive: construct a digital collective that feels like a physical place, operated via a retro OS.',
            'Initial boot scene: a quiet empty room. A monitor on a desk glowing in the dark.',
            'Just a terminal and the tools left behind.',
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
        year: '2026',
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
        year: '2026',
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
        tag: 'foundation-web',
        name: lang === 'id' ? 'Fondasi Web Awal' : 'Foundation Web Layer',
        status: 'archived',
        type: lang === 'id' ? 'lingkungan web' : 'web environment',
        description: lang === 'id' ?
            'Iterasi lingkungan web sebelumnya. SPA standar, berbasis React. Digantikan oleh pendekatan ruang kerja 3D.' :
            'Previous iteration of the web environment. Standard SPA, React-based. Replaced by the 3D workstation approach.',
        notes: lang === 'id' ? [
            'Aplikasi halaman tunggal React + TypeScript',
            'Sistem perutean standar',
            'Basis kode dasar yang kemudian diadaptasi menjadi workspace-os',
        ] : [
            'React + TypeScript single page application',
            'Standard routing system',
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
                <h1 style={styles.title}>Build Diary</h1>
                <p style={styles.subtitle}>
                    AFTER-HOURS / {language === 'id' ? 'buku harian pengembangan' : 'build diary'}
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
                    diary --read --all --sort=timestamp
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
                <p style={styles.subtitle}>— {language === 'id' ? 'buku harian pengembangan' : 'build diary'}</p>
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
