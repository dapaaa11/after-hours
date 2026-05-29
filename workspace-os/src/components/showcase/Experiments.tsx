import React, { useState } from 'react';

export interface ExperimentsProps {}

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
        date: '2026.04',
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
        date: '2026.03',
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
        date: '2026.02',
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
        date: '2026.01',
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

const Experiments: React.FC<ExperimentsProps> = () => {
    const statusCounts = (
        ['ongoing', 'concluded', 'shelved', 'prototype'] as ExpStatus[]
    ).map((s) => ({
        status: s,
        count: EXPERIMENTS.filter((e) => e.status === s).length,
    }));

    return (
        <div className="site-page-content">
            <div style={styles.pageHeader}>
                <h1 style={styles.title}>Experiments</h1>
                <p style={styles.subtitle}>
                    AFTER-HOURS / experimental changelog
                </p>
            </div>

            <div style={styles.statsRow}>
                {statusCounts.map(({ status, count }, i, arr) => (
                    <React.Fragment key={status}>
                        <div style={styles.stat}>
                            <span
                                style={Object.assign({}, styles.statValue, {
                                    color: STATUS_META[status].color,
                                })}
                            >
                                {count}
                            </span>
                            <span style={styles.statLabel}>{status}</span>
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
                    exp --log --all --sort=date
                </span>
            </div>

            <div style={styles.expList}>
                {EXPERIMENTS.map((e) => (
                    <ExpEntry key={e.id} exp={e} />
                ))}
            </div>

            <div style={styles.footer}>
                <p style={styles.footerText}>
                    — {EXPERIMENTS.filter(e => e.status === 'ongoing').length} experiment
                    {EXPERIMENTS.filter(e => e.status === 'ongoing').length !== 1 ? 's' : ''} still running.
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

    expList: {
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
        color: '#999',
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
    logDivider: {
        height: 1,
        backgroundColor: '#e0e0e0',
        marginTop: 10,
        marginBottom: 10,
        width: '100%',
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

export default Experiments;
