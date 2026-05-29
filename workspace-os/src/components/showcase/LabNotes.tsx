import React, { useState } from 'react';

export interface LabNotesProps {}

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

const NOTES: LabNote[] = [
    {
        id: 'LN-009',
        timestamp: '2026.05.21',
        tag: 'build',
        title: 'workspace-os section expansion',
        body: [
            'Adding new world structure to the OS layer: Operators, Channel, Systems, Archive, Experiments, Lab Notes.',
            'Each section follows the same terminal log aesthetic established in the initial build.',
            'Keeping the old ABOUT / EXPERIENCE / PROJECTS / CONTACT routes live during transition.',
            'Navigation is getting longer — will need to think about organization before final cleanup.',
        ],
    },
    {
        id: 'LN-008',
        timestamp: '2026.04.18',
        tag: 'decision',
        title: 'iframe bridge over component embedding',
        body: [
            'Decided to keep the OS layer running inside an iframe rather than embedding it directly as a DOM overlay on the Three.js canvas.',
            'The decoupling means the OS can crash or reload without affecting the 3D scene.',
            'postMessage protocol handles any necessary cross-context communication.',
            'Performance isolation is the main reason. The 3D tick loop does not care about React renders.',
        ],
    },
    {
        id: 'LN-007',
        timestamp: '2026.04.02',
        tag: 'observation',
        title: 'on designing for atmosphere vs usability',
        body: [
            'There is a tension between making things feel right and making them easy to use.',
            'The retro OS aesthetic imposes constraints — things should feel slightly slow, deliberate, and imperfect.',
            'Modern UX conventions (instant feedback, smooth animations, obvious affordances) can break the atmosphere.',
            'The goal is not to maximize usability. It is to maximize immersion.',
            'Users who resonate with this will find it. Users who do not will leave. That is fine.',
        ],
    },
    {
        id: 'LN-006',
        timestamp: '2026.03.15',
        tag: 'build',
        title: 'font system: Terminal + Millennium pairing',
        body: [
            'Settled on Terminal (monospace, retro bitmap feel) for labels, metadata, keys, and UI chrome.',
            'Millennium (serif, slightly editorial) for body text and prose.',
            'The contrast between the two carries most of the hierarchy without needing size changes.',
            'h1 uses gastromond — large, editorial weight for page titles only.',
            'This pairing is now the design system across all workspace-os sections.',
        ],
    },
    {
        id: 'LN-005',
        timestamp: '2026.02.28',
        tag: 'process',
        title: 'building the windowing system from scratch',
        body: [
            'No third-party windowing library — built drag, resize, minimize, and z-index focus from first principles.',
            'Drag implemented via mousedown/mousemove/mouseup listeners on document rather than element.',
            'Resize uses a similar approach with resize handle corner detection.',
            'Z-index managed via a focus stack — most recently interacted window rises to top.',
            'The constraints of this approach keep the behavior consistent with retro OS conventions.',
        ],
    },
    {
        id: 'LN-004',
        timestamp: '2026.02.10',
        tag: 'reflection',
        title: 'why the 3D workspace',
        body: [
            'A portfolio that looks like a portfolio always feels like a performance.',
            'The 3D workspace is an attempt to make the work feel found rather than presented.',
            'If someone explores it and discovers the OS layer and opens a window — that is the intended experience.',
            'The atmosphere should do the talking before any content does.',
            'Atmosphere as argument.',
        ],
    },
    {
        id: 'LN-003',
        timestamp: '2026.01.22',
        tag: 'build',
        title: 'post-processing stack decisions',
        body: [
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
        title: 'things to finish eventually',
        body: [
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
        title: 'first entry — project start',
        body: [
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

const LabNotes: React.FC<LabNotesProps> = () => {
    return (
        <div className="site-page-content">
            <div style={styles.pageHeader}>
                <h1 style={styles.title}>Lab Notes</h1>
                <p style={styles.subtitle}>
                    AFTER-HOURS / build diary
                </p>
            </div>

            <div style={styles.intro}>
                <p style={styles.introText}>
                    Notes from the build.
                    <br />
                    Process entries, decisions, observations.
                    <br />
                    Newest first.
                </p>
            </div>

            <div style={styles.terminalLine}>
                <span style={styles.terminalPrompt}>{'>'}</span>
                <span style={styles.terminalCmd}>
                    notes --read --sort=newest
                </span>
            </div>

            <div style={styles.noteList}>
                {NOTES.map((note, i) => (
                    <NoteEntry
                        key={note.id}
                        note={note}
                        defaultOpen={i === 0}
                    />
                ))}
            </div>

            <div style={styles.footer}>
                <p style={styles.footerText}>
                    — {NOTES.length} entries logged. more after hours.
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

    intro: {
        marginTop: 24,
        marginBottom: 28,
        borderLeft: '2px solid #c0c0c0',
        paddingLeft: 16,
        flexDirection: 'column',
    },
    introText: {
        fontFamily: 'Millennium, Times New Roman, serif',
        fontSize: 16,
        color: '#444',
        lineHeight: 1.8,
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

    noteList: {
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
        color: '#bbb',
        letterSpacing: 1,
        minWidth: 52,
        flexShrink: 0,
    },
    entryTimestamp: {
        fontFamily: 'Terminal, Courier New, monospace',
        fontSize: 11,
        color: '#aaa',
        minWidth: 76,
        flexShrink: 0,
        letterSpacing: 0.5,
    },
    entryTag: {
        fontFamily: 'Terminal, Courier New, monospace',
        fontSize: 11,
        letterSpacing: 1,
        minWidth: 84,
        flexShrink: 0,
    },
    entryTitle: {
        fontFamily: 'Millennium, Times New Roman, serif',
        fontSize: 16,
        color: '#222',
        flex: 1,
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
        paddingLeft: 56,
        paddingBottom: 20,
        paddingTop: 6,
        gap: 0,
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

export default LabNotes;
