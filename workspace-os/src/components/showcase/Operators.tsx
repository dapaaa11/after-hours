import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';

export interface OperatorsProps {}

interface OperatorData {
    id: string;
    handle: string;
    name: string;
    role: string;
    bio: string;
    github: string;
    linkedin: string;
    status: string;
}

const getOperators = (lang: string): OperatorData[] => [
    {
        id: 'OPR-01',
        handle: 'dava',
        name: 'M. Dava Ardana',
        role: lang === 'id' ? 'Pengembang Fullstack' : 'Fullstack Developer',
        bio: lang === 'id'
            ? 'Pengembang fullstack dengan ketertarikan pada sistem backend dan antarmuka imersif.\nMembangun hal-hal yang terasa sebaik fungsinya.\nBeroperasi kebanyakan setelah jam kerja.'
            : 'Fullstack developer with a pull toward backend systems and immersive interfaces.\nBuilds things that feel as good as they work.\nOperates mostly after hours.',
        github: 'https://github.com/dapaaa11',
        linkedin: 'https://linkedin.com/in/m-dava-ardana',
        status: lang === 'id' ? 'aktif' : 'active',
    },
    {
        id: 'OPR-02',
        handle: 'dias',
        name: 'Dias Novri Pratama',
        role: lang === 'id' ? 'Sistem & Infrastruktur' : 'Systems & Infrastructure',
        bio: lang === 'id'
            ? 'Membangun sistem tenang di balik antarmuka.\nFokus pada perkakas, arsitektur backend, dan stabilitas.\nBiasanya beroperasi di balik layar.'
            : 'Builds quiet systems behind the interface.\nFocused on tooling, backend architecture, and stability.\nUsually operating somewhere behind the scenes.',
        github: 'https://github.com/dias-git',
        linkedin:
            'https://www.linkedin.com/in/dias-novri-bb5b35357',
        status: lang === 'id' ? 'aktif' : 'active',
    },
];

interface OperatorEntryProps {
    operator: OperatorData;
    index: number;
}

const OperatorEntry: React.FC<OperatorEntryProps> = ({ operator, index }) => {
    const { language } = useLanguage();
    const [expanded, setExpanded] = useState(false);
    const [hovered, setHovered] = useState(false);

    return (
        <div style={styles.entry}>
            {/* Header row — always visible */}
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
                <span style={styles.entryId}>{operator.id}</span>
                <span style={styles.entryHandle}>
                    @{operator.handle}
                </span>
                <span style={styles.entryRole}>{operator.role}</span>
                <span style={styles.entryStatus}>
                    [{operator.status}]
                </span>
                <span style={styles.expandToggle}>
                    {expanded ? '−' : '+'}
                </span>
            </div>

            {/* Expanded detail — operator log */}
            {expanded && (
                <div style={styles.entryBody}>
                    <div style={styles.logLine}>
                        <span style={styles.logKey}>{language === 'id' ? 'NAMA' : 'NAME'}</span>
                        <span style={styles.logSep}>::</span>
                        <span style={styles.logValue}>{operator.name}</span>
                    </div>
                    <div style={styles.logLine}>
                        <span style={styles.logKey}>{language === 'id' ? 'PERAN' : 'ROLE'}</span>
                        <span style={styles.logSep}>::</span>
                        <span style={styles.logValue}>{operator.role}</span>
                    </div>
                    <div style={styles.logDivider} />
                    <div style={styles.bioBlock}>
                        {operator.bio.split('\n').map((line, i) => (
                            <p key={i} style={styles.bioLine}>
                                {line}
                            </p>
                        ))}
                    </div>
                    <div style={styles.logDivider} />
                    <div style={styles.linksRow}>
                        <a
                            href={operator.github}
                            target="_blank"
                            rel="noreferrer"
                            style={styles.logLink}
                        >
                            gh/{operator.github.replace('https://github.com/', '')}
                        </a>
                        <span style={styles.linkSep}>·</span>
                        <a
                            href={operator.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            style={styles.logLink}
                        >
                            in/{operator.linkedin
                                .replace('https://www.linkedin.com/in/', '')
                                .replace('https://linkedin.com/in/', '')
                                .split('?')[0]}
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

const Operators: React.FC<OperatorsProps> = () => {
    const { language } = useLanguage();
    const operatorsData = getOperators(language);

    return (
        <div className="site-page-content">
            {/* Page header */}
            <div style={styles.pageHeader}>
                <h1 style={styles.title}>Operators</h1>
                <p style={styles.subtitle}>AFTER-HOURS / {language === 'id' ? 'kolektif' : 'collective'}</p>
            </div>

            {/* Preamble */}
            <div className="text-block" style={styles.preamble}>
                <p style={styles.preambleText}>
                    {language === 'id' ? 'Dua orang. Satu sistem yang sunyi.' : 'Two people. One quiet system.'}
                    <br />
                    {language === 'id' ? 'Dibangun setelah jam kerja.' : 'Built after hours.'}
                </p>
            </div>

            {/* Terminal divider */}
            <div style={styles.terminalLine}>
                <span style={styles.terminalPrompt}>{'>'}</span>
                <span style={styles.terminalCmd}>list --operators --verbose</span>
            </div>

            {/* Operator entries */}
            <div style={styles.entriesContainer}>
                {operatorsData.map((op, i) => (
                    <OperatorEntry key={op.id} operator={op} index={i} />
                ))}
            </div>

            {/* Footer note */}
            <div style={styles.footer}>
                <p style={styles.footerText}>
                    {language === 'id'
                        ? '— beroperasi sejak 2025. di suatu tempat setelah tengah malam.'
                        : '— operating since 2025. somewhere after midnight.'}
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
        textTransform: 'uppercase' as const,
        marginTop: 8,
    },
    preamble: {
        marginTop: 24,
        marginBottom: 8,
        borderLeft: '2px solid #c0c0c0',
        paddingLeft: 16,
    },
    preambleText: {
        fontFamily: 'Millennium, Times New Roman, serif',
        fontSize: 17,
        lineHeight: 1.7,
        color: '#333',
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
    terminalPrompt: {
        color: '#444',
        fontWeight: 'bold',
        flexShrink: 0,
    },
    terminalCmd: {
        color: '#555',
    },
    entriesContainer: {
        flexDirection: 'column',
        marginTop: 0,
        borderTop: '1px solid #b8b8b8',
    },
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
        transition: 'background-color 0.1s',
        backgroundColor: 'transparent',
    },
    entryHeaderHovered: {
        backgroundColor: 'rgba(0,0,0,0.035)',
    },
    entryId: {
        fontFamily: 'Terminal, Courier New, monospace',
        fontSize: 11,
        color: '#888',
        letterSpacing: 1,
        minWidth: 56,
        flexShrink: 0,
    },
    entryHandle: {
        fontFamily: 'Terminal, Courier New, monospace',
        fontSize: 14,
        color: '#222',
        letterSpacing: 0.5,
        minWidth: 64,
        flexShrink: 0,
    },
    entryRole: {
        fontFamily: 'Millennium, Times New Roman, serif',
        fontSize: 16,
        color: '#333',
        flex: 1,
    },
    entryStatus: {
        fontFamily: 'Terminal, Courier New, monospace',
        fontSize: 11,
        color: '#777',
        letterSpacing: 1,
        flexShrink: 0,
    },
    expandToggle: {
        fontFamily: 'monospace',
        fontSize: 16,
        color: '#999',
        flexShrink: 0,
        minWidth: 16,
        textAlign: 'right' as const,
    },
    entryBody: {
        flexDirection: 'column',
        paddingLeft: 72,
        paddingBottom: 24,
        paddingTop: 4,
    },
    logLine: {
        display: 'flex',
        flexDirection: 'row' as const,
        alignItems: 'baseline',
        gap: 10,
        marginBottom: 6,
    },
    logKey: {
        fontFamily: 'Terminal, Courier New, monospace',
        fontSize: 11,
        color: '#888',
        letterSpacing: 2,
        minWidth: 52,
        textTransform: 'uppercase' as const,
        flexShrink: 0,
    },
    logSep: {
        fontFamily: 'Terminal, Courier New, monospace',
        fontSize: 11,
        color: '#aaa',
        flexShrink: 0,
    },
    logValue: {
        fontFamily: 'Millennium, Times New Roman, serif',
        fontSize: 16,
        color: '#222',
    },
    logDivider: {
        height: 1,
        backgroundColor: '#d8d8d8',
        marginTop: 12,
        marginBottom: 12,
        width: '100%',
    },
    bioBlock: {
        flexDirection: 'column',
        gap: 4,
    },
    bioLine: {
        fontFamily: 'Millennium, Times New Roman, serif',
        fontSize: 16,
        color: '#333',
        lineHeight: 1.65,
        marginBottom: 4,
        textAlign: 'left' as const,
    },
    linksRow: {
        display: 'flex',
        flexDirection: 'row' as const,
        alignItems: 'center',
        gap: 10,
    },
    logLink: {
        fontFamily: 'Terminal, Courier New, monospace',
        fontSize: 12,
        color: '#444',
        textDecoration: 'underline',
        letterSpacing: 0.5,
    },
    linkSep: {
        fontFamily: 'monospace',
        color: '#bbb',
        fontSize: 12,
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
        textAlign: 'left' as const,
    },
};

export default Operators;
