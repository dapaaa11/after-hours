import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';

export interface SystemsProps {}

type ExpStatus = 'ongoing' | 'concluded' | 'shelved' | 'prototype';

interface Experiment {
    id: string;
    date: string;
    tag: string;
    name: string;
    status: ExpStatus;
    domain: string;
    log: string;
    findings: string[];
}

const EXPERIMENTS: Experiment[] = [
    {
        id: 'EXP-001',
        date: '2025.04',
        tag: 'shader / atmosphere',
        name: 'CRT Phosphor Decay',
        status: 'concluded',
        domain: 'GLSL / post-processing',
        log: 'Simulated phosphor persistence and scanline decay typical of CRT monitors. Used as the primary screen atmosphere layer in the workspace render pipeline.',
        findings: [
            'Phosphor decay best achieved via framebuffer blending, not pure shader',
            'Scanline frequency depends on viewport resolution — needs dynamic calculation',
            'Combined with film grain: maintains retro feel without being distracting',
            'Integrated into workspace-3d post-processing stack',
        ],
    },
    {
        id: 'EXP-002',
        date: '2025.03',
        tag: 'interface / motion',
        name: 'Windowed OS Drag Inertia',
        status: 'shelved',
        domain: 'interface behavior',
        log: 'Experimented with adding inertia/momentum to window dragging in the OS layer. Windows would slide and settle rather than stopping immediately.',
        findings: [
            'Inertia felt inconsistent with retro OS aesthetic — too fluid',
            'Increased perceived complexity without atmosphere gain',
            'Shelved: OS snappiness better suits the retro feel',
            'Lerp behavior reserved for 3D camera only',
        ],
    },
    {
        id: 'EXP-003',
        date: '2025.02',
        tag: 'audio / reactive',
        name: 'Ambient Score Reactivity',
        status: 'prototype',
        domain: 'Web Audio API / Three.js',
        log: 'Prototype for having the ambient audio score subtly affect scene properties — room lighting, shader uniforms, camera depth of field. Never fully implemented.',
        findings: [
            'Web Audio API AnalyserNode provides real-time frequency data',
            'Mapped bass frequencies to scene fog density',
            'High frequencies affected grain intensity in post-processing',
            'Prototype remains — integration needs performance profiling',
        ],
    },
    {
        id: 'EXP-004',
        date: '2025.01',
        tag: 'layout / typography',
        name: 'Terminal Log UI Language',
        status: 'concluded',
        domain: 'interface design',
        log: 'Developed the visual language for the OS showcase layer. Terminal prompts, monospace hierarchies, log-style entries, and :: separator syntax.',
        findings: [
            'Monospace + serif pairing: Terminal font for keys, Millennium for body',
            ':: separator carries more weight than - or / in this context',
            '› bullet reads better than • in monospace environments',
            'Left-aligned, low-contrast layouts feel authored rather than generated',
            'Became the design system for Operators, Systems, Channel, Archive sections',
        ],
    },
    {
        id: 'EXP-005',
        date: '2024.11',
        tag: 'shader / noise',
        name: 'Procedural Room Texture',
        status: 'concluded',
        domain: 'GLSL / Three.js materials',
        log: 'Replaced static texture maps on room surfaces with procedural noise-based materials. Allowed for more atmospheric imperfection in the workspace surfaces.',
        findings: [
            'Simplex noise over UV coordinates provides subtle surface variation',
            'Layered noise octaves simulate aged material feel',
            'Performance acceptable at moderate resolution — heavy at 4K',
            'Wall and floor materials use this approach in workspace-3d',
        ],
    },
    {
        id: 'EXP-006',
        date: '2024.09',
        tag: 'interaction / 3D',
        name: 'Cursor–Scene Parallax',
        status: 'ongoing',
        domain: 'Three.js / mouse events',
        log: 'Mouse cursor position subtly affects camera rotation and scene objects — creating a parallax sensation that makes the workspace feel alive and reactive.',
        findings: [
            'Cursor delta mapped to camera quaternion via damped lerp',
            'Small rotation range (±3°) sufficient for depth sensation',
            'Interaction feels alive without breaking cinematic stillness',
            'Currently active in workspace-3d — ongoing refinement',
        ],
    },
    {
        id: 'EXP-007',
        date: '2024.07',
        tag: 'architecture',
        name: 'iframe Bridge Protocol',
        status: 'concluded',
        domain: 'postMessage / DOM',
        log: 'Explored embedding the React OS layer inside the Three.js scene via an iframe. Needed a reliable message-passing protocol between the 3D context and the 2D OS.',
        findings: [
            'postMessage API handles cross-frame communication cleanly',
            'OS renders independently — no performance coupling to Three.js tick',
            'CSS pointer-events management required careful z-index handling',
            'Became the foundation architecture for the workspace',
        ],
    },
];

const STATUS_META: Record<ExpStatus, { label: string; color: string }> = {
    ongoing: { label: 'ongoing', color: '#3a5a3a' },
    concluded: { label: 'concluded', color: '#555' },
    shelved: { label: 'shelved', color: '#7a5c1e' },
    prototype: { label: 'prototype', color: '#3a3a6a' },
};

interface ExpEntryProps {
    exp: Experiment;
}

const ExpEntry: React.FC<ExpEntryProps> = ({ exp }) => {
    const [expanded, setExpanded] = useState(false);
    const [hovered, setHovered] = useState(false);
    const meta = STATUS_META[exp.status];

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
                <span style={styles.entryId}>{exp.id}</span>
                <span style={styles.entryDate}>{exp.date}</span>
                <span style={styles.entryTag}>{exp.tag}</span>
                <span style={styles.entryName}>{exp.name}</span>
                <span
                    style={Object.assign({}, styles.entryStatus, {
                        color: meta.color,
                    })}
                >
                    [{meta.label}]
                </span>
                <span style={styles.expandToggle}>{expanded ? '−' : '+'}</span>
            </div>

            {expanded && (
                <div style={styles.entryBody}>
                    <div style={styles.metaRow}>
                        <span style={styles.metaKey}>DOMAIN</span>
                        <span style={styles.metaSep}>::</span>
                        <span style={styles.metaVal}>{exp.domain}</span>
                    </div>
                    <div style={styles.logDivider} />
                    <p style={styles.logText}>{exp.log}</p>
                    <div style={styles.logDivider} />
                    <div style={styles.findingsLabel}>findings</div>
                    {exp.findings.map((f, i) => (
                        <div key={i} style={styles.findingRow}>
                            <span style={styles.findingBullet}>›</span>
                            <span style={styles.findingText}>{f}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

interface SystemModule {
    id: string;
    tag: string;
    name: string;
    status: 'active' | 'standby' | 'experimental';
    description: string;
    entries: string[];
}

const MODULES: SystemModule[] = [
    {
        id: 'SYS-01',
        tag: 'immersive-web',
        name: 'Immersive Web Systems',
        status: 'active',
        description:
            'Real-time 3D environments running inside the browser. WebGL pipelines, scene graphs, and cinematic workspace construction.',
        entries: [
            'Three.js scene architecture',
            'Custom camera systems and cinematic controls',
            'GLSL shader integration',
            'Post-processing pipelines (bloom, depth, grain)',
            'iframe bridge for embedded OS layers',
            'Asset loading and texture management',
        ],
    },
    {
        id: 'SYS-02',
        tag: 'interactive-interfaces',
        name: 'Interactive Interfaces',
        status: 'active',
        description:
            'Atmospheric, tactile UIs built with precision. Retro OS aesthetics, windowed environments, and immersive interaction layers.',
        entries: [
            'Retro OS windowing system (drag, resize, minimize)',
            'React component architecture',
            'Custom typography and font systems',
            'Keyboard-driven and cursor-driven interaction',
            'State machines for UI behavior',
            'Responsive layout within constrained canvases',
        ],
    },
    {
        id: 'SYS-03',
        tag: 'backend-systems',
        name: 'Backend Systems',
        status: 'active',
        description:
            'Server infrastructure that stays quiet and out of the way. REST APIs, mailer services, and deployment pipelines.',
        entries: [
            'Node.js + Express REST API',
            'Nodemailer transactional email routing',
            'Environment-based configuration',
            'Static asset serving and compression',
            'CORS and body parsing middleware',
        ],
    },
    {
        id: 'SYS-04',
        tag: 'shader-workflows',
        name: 'Shader Workflows',
        status: 'active',
        description:
            'Low-level visual programming for atmosphere. Custom GLSL written to shape light, noise, and surface feel.',
        entries: [
            'Vertex and fragment shader authoring (GLSL)',
            'Noise-based procedural textures',
            'Screen-space effects (scanlines, vignette, CRT)',
            'Custom material systems in Three.js',
            'Uniform-driven real-time parameter control',
        ],
    },
    {
        id: 'SYS-05',
        tag: 'workspace-tooling',
        name: 'Workspace Tooling',
        status: 'active',
        description:
            'The scaffolding that holds the project together. Build systems, type safety, and developer environment configuration.',
        entries: [
            'TypeScript across full stack',
            'React + CRA / Vite build pipelines',
            'Git-based version control with structured commits',
            'ESLint and static analysis',
            'Path aliasing and module resolution',
            'Environment variable management',
        ],
    },
    {
        id: 'SYS-06',
        tag: 'realtime-environments',
        name: 'Realtime Environments',
        status: 'experimental',
        description:
            'Live, reactive spaces that respond to time, input, and state. Experimental territory — always after hours.',
        entries: [
            'Clock-driven and time-based scene mutations',
            'Ambient audio integration',
            'Cursor-reactive 3D interaction',
            'Dynamic lighting based on system time',
            'WebSocket-ready architecture for live presence',
        ],
    },
];

const STATUS_LABELS: Record<SystemModule['status'], string> = {
    active: 'active',
    standby: 'standby',
    experimental: 'exp.',
};

interface ModuleEntryProps {
    module: SystemModule;
}

const ModuleEntry: React.FC<ModuleEntryProps> = ({ module }) => {
    const [expanded, setExpanded] = useState(false);
    const [hovered, setHovered] = useState(false);

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
                <span style={styles.entryId}>{module.id}</span>
                <span style={styles.entryTag}>{module.tag}</span>
                <span style={styles.entryName}>{module.name}</span>
                <span
                    style={Object.assign(
                        {},
                        styles.entryStatus,
                        module.status === 'experimental' &&
                            styles.entryStatusExp
                    )}
                >
                    [{STATUS_LABELS[module.status]}]
                </span>
                <span style={styles.expandToggle}>
                    {expanded ? '−' : '+'}
                </span>
            </div>

            {expanded && (
                <div style={styles.entryBody}>
                    <p style={styles.description}>{module.description}</p>
                    <div style={styles.logDivider} />
                    <div style={styles.entriesList}>
                        {module.entries.map((entry, i) => (
                            <div key={i} style={styles.logRow}>
                                <span style={styles.logBullet}>›</span>
                                <span style={styles.logEntry}>{entry}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const Systems: React.FC<SystemsProps> = () => {
    const { language } = useLanguage();
    const activeCount = MODULES.filter((m) => m.status === 'active').length;
    const expCount = MODULES.filter(
        (m) => m.status === 'experimental'
    ).length;

    return (
        <div className="site-page-content">
            {/* Page header */}
            <div style={styles.pageHeader}>
                <h1 style={styles.title}>Systems</h1>
                <p style={styles.subtitle}>AFTER-HOURS / {language === 'id' ? 'registrasi modul aktif' : 'active module registry'}</p>
            </div>

            {/* System stats row */}
            <div style={styles.statsRow}>
                <div style={styles.stat}>
                    <span style={styles.statValue}>{MODULES.length}</span>
                    <span style={styles.statLabel}>{language === 'id' ? 'modul' : 'modules'}</span>
                </div>
                <div style={styles.statSep} />
                <div style={styles.stat}>
                    <span style={styles.statValue}>{activeCount}</span>
                    <span style={styles.statLabel}>{language === 'id' ? 'aktif' : 'active'}</span>
                </div>
                <div style={styles.statSep} />
                <div style={styles.stat}>
                    <span style={styles.statValue}>{expCount}</span>
                    <span style={styles.statLabel}>{language === 'id' ? 'eksperimental' : 'experimental'}</span>
                </div>
            </div>

            {/* Terminal prompt */}
            <div style={styles.terminalLine}>
                <span style={styles.terminalPrompt}>{'>'}</span>
                <span style={styles.terminalCmd}>
                    sys --list --all --verbose
                </span>
            </div>

            {/* Module list */}
            <div style={styles.moduleList}>
                {MODULES.map((mod, i) => (
                    <ModuleEntry key={mod.id} module={mod} />
                ))}
            </div>

            {/* Experimental Changelog Section */}
            <div style={{ marginTop: 40, marginBottom: 20 }}>
                <div style={styles.logDivider} />
                <p style={styles.subtitle}>— {language === 'id' ? 'catatan eksperimental' : 'experimental changelog'}</p>
            </div>

            <div style={styles.moduleList}>
                {EXPERIMENTS.map((exp) => (
                    <ExpEntry key={exp.id} exp={exp} />
                ))}
            </div>

            {/* Footer */}
            <div style={styles.footer}>
                <p style={styles.footerText}>
                    {language === 'id'
                        ? '— registrasi terakhir diperbarui: 2025. sistem berjalan setelah jam kerja.'
                        : '— registry last updated: 2025. systems running after hours.'}
                </p>
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    pageHeader: {
        marginBottom: 8,
        marginLeft: -16,
    },
    title: {
        lineHeight: 1,
        marginBottom: 6,
    },
    subtitle: {
        fontFamily: 'Terminal, Courier New, monospace',
        fontSize: 13,
        letterSpacing: 2,
        color: '#555',
        marginTop: 8,
        textTransform: 'uppercase' as const,
    },

    // Stats
    statsRow: {
        display: 'flex',
        flexDirection: 'row' as const,
        alignItems: 'center',
        gap: 0,
        marginTop: 24,
        marginBottom: 28,
    },
    stat: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingRight: 24,
    },
    statValue: {
        fontFamily: 'Terminal, Courier New, monospace',
        fontSize: 22,
        color: '#222',
        letterSpacing: 1,
        display: 'block',
        lineHeight: 1.1,
    },
    statLabel: {
        fontFamily: 'Terminal, Courier New, monospace',
        fontSize: 10,
        color: '#999',
        letterSpacing: 2,
        textTransform: 'uppercase' as const,
        display: 'block',
        marginTop: 2,
    },
    statSep: {
        width: 1,
        height: 32,
        backgroundColor: '#ccc',
        marginRight: 24,
        flexShrink: 0,
    },

    // Terminal line
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
    terminalPrompt: {
        color: '#444',
        fontWeight: 'bold',
        flexShrink: 0,
    },
    terminalCmd: {
        color: '#555',
    },

    // Module list
    moduleList: {
        flexDirection: 'column',
        borderTop: '1px solid #b8b8b8',
    },

    // Entry
    entry: {
        flexDirection: 'column',
        borderBottom: '1px solid #b8b8b8',
    },
    entryHeader: {
        display: 'flex',
        flexDirection: 'row' as const,
        alignItems: 'baseline',
        padding: '13px 0',
        gap: 16,
        cursor: 'pointer',
        backgroundColor: 'transparent',
        transition: 'background-color 0.1s',
    },
    entryHeaderHovered: {
        backgroundColor: 'rgba(0,0,0,0.035)',
    },
    entryId: {
        fontFamily: 'Terminal, Courier New, monospace',
        fontSize: 11,
        color: '#999',
        letterSpacing: 1,
        minWidth: 56,
        flexShrink: 0,
    },
    entryDate: {
        fontFamily: 'Terminal, Courier New, monospace',
        fontSize: 11,
        color: '#bbb',
        minWidth: 56,
        flexShrink: 0,
    },
    entryTag: {
        fontFamily: 'Terminal, Courier New, monospace',
        fontSize: 11,
        color: '#aaa',
        letterSpacing: 0.5,
        minWidth: 120,
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
        color: '#888',
        letterSpacing: 1,
        flexShrink: 0,
    },
    entryStatusExp: {
        color: '#7a6030',
    },
    expandToggle: {
        fontFamily: 'monospace',
        fontSize: 16,
        color: '#aaa',
        flexShrink: 0,
        minWidth: 16,
        textAlign: 'right' as const,
    },

    // Body
    entryBody: {
        flexDirection: 'column',
        paddingLeft: 72,
        paddingBottom: 20,
        paddingTop: 4,
    },
    description: {
        fontFamily: 'Millennium, Times New Roman, serif',
        fontSize: 15,
        color: '#444',
        lineHeight: 1.65,
        textAlign: 'justify' as const,
        maxWidth: 520,
    },
    logDivider: {
        height: 1,
        backgroundColor: '#ddd',
        marginTop: 12,
        marginBottom: 12,
        width: '100%',
    },
    entriesList: {
        flexDirection: 'column',
        gap: 6,
    },
    logRow: {
        display: 'flex',
        flexDirection: 'row' as const,
        alignItems: 'baseline',
        gap: 10,
        marginBottom: 5,
    },
    logBullet: {
        fontFamily: 'Terminal, Courier New, monospace',
        fontSize: 12,
        color: '#bbb',
        flexShrink: 0,
        lineHeight: 1,
    },
    logEntry: {
        fontFamily: 'Terminal, Courier New, monospace',
        fontSize: 12,
        color: '#555',
        letterSpacing: 0.3,
        lineHeight: 1.5,
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
        minWidth: 52,
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
    logText: {
        fontFamily: 'Millennium, Times New Roman, serif',
        fontSize: 15,
        color: '#444',
        lineHeight: 1.65,
        maxWidth: 520,
    },
    findingsLabel: {
        fontFamily: 'Terminal, Courier New, monospace',
        fontSize: 10,
        color: '#bbb',
        letterSpacing: 2,
        textTransform: 'uppercase' as const,
        marginBottom: 8,
    },
    findingRow: {
        display: 'flex',
        flexDirection: 'row' as const,
        alignItems: 'baseline',
        gap: 10,
        marginBottom: 5,
    },
    findingBullet: {
        fontFamily: 'Terminal, Courier New, monospace',
        fontSize: 12,
        color: '#ccc',
        flexShrink: 0,
    },
    findingText: {
        fontFamily: 'Terminal, Courier New, monospace',
        fontSize: 12,
        color: '#666',
        letterSpacing: 0.3,
        lineHeight: 1.5,
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

export default Systems;
