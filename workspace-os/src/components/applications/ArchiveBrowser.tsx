import React, { useState, useEffect } from 'react';
import Window from '../os/Window';
import { archiveList, archiveNodes, indexNode, ArchiveNode } from '../../data/archive';

export interface ArchiveBrowserProps extends WindowAppProps {}

const CATEGORY_LABELS: Record<string, string> = {
    stack: "STACK",
    system: "SYSTEM",
    knowledge: "KNOWLEDGE",
};

const CATEGORIES = ["stack", "system", "knowledge"] as const;

const ArchiveBrowser: React.FC<ArchiveBrowserProps> = (props) => {
    const [activePath, setActivePath] = useState<string>("after-hours://index");
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [language, setLanguage] = useState<"en" | "id">("en");

    // Retrieve active record
    const currentNode = archiveNodes[activePath] || indexNode;

    // Handle path changes (expanding parent category automatically)
    useEffect(() => {
        if (currentNode && currentNode.path !== "after-hours://index") {
            setExpandedCategory(currentNode.category);
        }
    }, [activePath, currentNode]);

    const handleCategoryClick = (catId: string) => {
        setExpandedCategory(prev => (prev === catId ? null : catId));
    };

    const handleTopicClick = (path: string) => {
        setActivePath(path);
    };

    const matchesSearch = (node: ArchiveNode, query: string) => {
        if (!query) return true;
        const q = query.toLowerCase();
        return (
            node.title.toLowerCase().includes(q) ||
            node.path.toLowerCase().includes(q) ||
            node.role.toLowerCase().includes(q) ||
            node.tags.some(tag => tag.toLowerCase().includes(q))
        );
    };

    // Filter categories and topics based on search query
    const filteredGrouped: Record<string, ArchiveNode[]> = {};
    let totalFilteredCount = 0;

    CATEGORIES.forEach(cat => {
        const matches = archiveList.filter(
            node => node.category === cat && matchesSearch(node, searchQuery)
        );
        if (matches.length > 0) {
            filteredGrouped[cat] = matches;
            totalFilteredCount += matches.length;
        }
    });

    // Check if the root node itself matches the search
    const rootMatches = matchesSearch(indexNode, searchQuery);
    if (rootMatches) {
        totalFilteredCount += 1;
    }

    return (
        <Window
            top={50}
            left={70}
            width={820}
            height={560}
            windowBarIcon="windowExplorerIcon"
            windowTitle="Knowledge Browser"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            bottomLeftText="knowledge.sys"
        >
            <div style={styles.container}>
                {/* CSS rules for manual styling of scrollbars and hover snaps */}
                <style>{`
                    .kb-scrollbar::-webkit-scrollbar {
                        width: 14px;
                        background-color: #1a1c1d;
                    }
                    .kb-scrollbar::-webkit-scrollbar-thumb {
                        background-color: #2a2d2e;
                        border: 2px solid #1a1c1d;
                    }
                    .kb-scrollbar::-webkit-scrollbar-thumb:hover {
                        background-color: #3e9697;
                    }
                    .kb-scrollbar::-webkit-scrollbar-corner {
                        background-color: transparent;
                    }
                    .kb-hover-row:hover {
                        background-color: #1a3a3d !important;
                        color: #d0d4d6 !important;
                    }
                    .kb-active-row {
                        background-color: #1a3a3d !important;
                        color: #d0d4d6 !important;
                    }
                    .kb-related-link {
                        color: #2a6e6f !important;
                        transition: color 0.1s ease !important;
                    }
                    .kb-related-link:hover {
                        color: #1a1c1d !important;
                    }
                `}</style>

                {/* 1. Header Bar (32px) */}
                <div style={styles.headerBar}>
                    <div style={styles.pathDisplay}>
                        <span style={styles.pathLabel}>NAVIGATE // </span>
                        <span style={styles.pathValue}>{activePath}</span>
                    </div>
                    <div style={styles.systemIdentifier}>Knowledge Browser</div>
                </div>

                {/* 2. Main Workspace Split Panel */}
                <div style={styles.mainSplit}>
                    {/* Left Index Panel (240px fixed) */}
                    <div style={styles.indexPanel}>
                        {/* Search Input Box */}
                        <div style={styles.searchContainer}>
                            <input
                                type="text"
                                placeholder="Search Knowledge..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={styles.searchInput}
                                autoComplete="off"
                                autoCorrect="off"
                                autoCapitalize="off"
                                spellCheck="false"
                            />
                        </div>

                        {/* Category and Node List */}
                        <div className="kb-scrollbar" style={styles.listContainer}>
                            {/* Always allow accessing the gateway root */}
                            {rootMatches && (
                                <div
                                    onClick={() => handleTopicClick("after-hours://index")}
                                    className={`kb-hover-row ${activePath === "after-hours://index" ? "kb-active-row" : ""}`}
                                    style={{
                                        ...styles.gatewayRow,
                                        borderLeft: activePath === "after-hours://index" ? "2px solid #3e9697" : "none",
                                    }}
                                >
                                    KNOWLEDGE GATEWAY
                                </div>
                            )}

                            {CATEGORIES.map(cat => {
                                const topics = filteredGrouped[cat] || [];
                                if (topics.length === 0) return null;

                                const isCatExpanded = searchQuery ? true : (expandedCategory === cat);
                                const isCatActive = isCatExpanded;

                                // KNOWLEDGE category gets brighter label treatment for educational prominence
                                const isKnowledgeCat = cat === 'knowledge';

                                return (
                                    <div key={cat} style={styles.categoryBlock}>
                                        {/* Category Row */}
                                        <div
                                            onClick={() => !searchQuery && handleCategoryClick(cat)}
                                            style={{
                                                ...styles.categoryRow,
                                                borderLeft: isCatActive ? "2px solid #3e9697" : "none",
                                                paddingLeft: isCatActive ? 14 : 16,
                                                cursor: searchQuery ? "default" : "pointer",
                                            }}
                                            className={searchQuery ? "" : "kb-scrollbar-thumb"}
                                        >
                                            <span style={{
                                                ...styles.categoryLabel,
                                                // Task C: KNOWLEDGE prominently brighter than other categories
                                                color: isKnowledgeCat
                                                    ? (isCatActive ? '#6ecacb' : '#5db8b9')
                                                    : (isCatActive ? '#a0a4a6' : '#7a7e82'),
                                            }}>{CATEGORY_LABELS[cat]}</span>
                                            {!searchQuery && (
                                                <span style={styles.categoryIndicator}>
                                                    {isCatExpanded ? "▼" : "▶"}
                                                </span>
                                            )}
                                        </div>

                                        {/* Indented Topic list */}
                                        {isCatExpanded && (
                                            <div style={styles.topicsBlock}>
                                                {topics.map(topic => {
                                                    const isTopicActive = activePath === topic.path;
                                                    return (
                                                        <div
                                                            key={topic.path}
                                                            onClick={() => handleTopicClick(topic.path)}
                                                            className={`kb-hover-row ${isTopicActive ? "kb-active-row" : ""}`}
                                                            style={{
                                                                ...styles.topicRow,
                                                                borderLeft: isTopicActive ? "2px solid #3e9697" : "none",
                                                                paddingLeft: isTopicActive ? 30 : 32,
                                                            }}
                                                        >
                                                            {topic.title}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Document Panel (Flexible) */}
                    <div className="kb-scrollbar" style={styles.documentPanel}>
                        {/* Language Toggle in top-right — Task B: colors adapted for light surface */}
                        <div style={styles.langToggleContainer}>
                            <span
                                onClick={() => setLanguage("en")}
                                style={{
                                    ...styles.langLabel,
                                    textDecoration: language === "en" ? "underline" : "none",
                                    color: language === "en" ? "#1a1c1d" : "#9a9e9e",
                                }}
                            >
                                EN
                            </span>
                            <span style={styles.langSeparator}>/</span>
                            <span
                                onClick={() => setLanguage("id")}
                                style={{
                                    ...styles.langLabel,
                                    textDecoration: language === "id" ? "underline" : "none",
                                    color: language === "id" ? "#1a1c1d" : "#9a9e9e",
                                }}
                            >
                                ID
                            </span>
                        </div>

                        {/* Content Area */}
                        <div style={styles.contentWrapper}>
                            {/* ZONE 1: Page Header */}
                            <div style={styles.docHeader}>
                                <div style={styles.docPath}>PAGE // {currentNode.path}</div>
                                <h1 style={styles.docTitle}>{currentNode.title}</h1>
                                
                                <div style={styles.docGrid}>
                                    <div style={styles.gridCell}>
                                        <span style={styles.cellLabel}>CATEGORY:</span>{" "}
                                        <span style={styles.cellValue}>{currentNode.category.toUpperCase()}</span>
                                    </div>
                                    <div style={styles.gridCell}>
                                        <span style={styles.cellLabel}>STATUS:</span>{" "}
                                        <span style={styles.cellValue}>
                                            {currentNode.status} [v{currentNode.version}]
                                        </span>
                                    </div>
                                    <div style={styles.gridCell}>
                                        <span style={styles.cellLabel}>FILED:</span>{" "}
                                        <span style={styles.cellValue}>{currentNode.filed}</span>
                                    </div>
                                    {currentNode.language && (
                                        <div style={styles.gridCell}>
                                            <span style={styles.cellLabel}>LANG:</span>{" "}
                                            <span style={styles.cellValue}>{currentNode.language}</span>
                                        </div>
                                    )}
                                    {currentNode.environment && (
                                        <div style={styles.gridCell}>
                                            <span style={styles.cellLabel}>ENV:</span>{" "}
                                            <span style={styles.cellValue}>{currentNode.environment}</span>
                                        </div>
                                    )}
                                    {currentNode.category === "knowledge" && (
                                        <div style={styles.gridCell}>
                                            <span style={styles.cellLabel}>INSTALLED:</span>{" "}
                                            <span style={{
                                                ...styles.cellValue,
                                                color: currentNode.installedInProject ? '#3e9697' : '#5c6060',
                                                fontWeight: 'bold',
                                            }}>
                                                {currentNode.installedInProject ? 'YES (IN PROJECT)' : 'NO (REFERENCE)'}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <hr style={styles.divider} />

                            {/* ZONE 2: Metadata Block */}
                            <div style={styles.metadataBlock}>
                                <div style={styles.metaRow}>
                                    <span style={styles.metaLabel}>ROLE:</span>{" "}
                                    <span style={styles.metaValue}>{currentNode.role}</span>
                                </div>
                                <div style={styles.metaRow}>
                                    <span style={styles.metaLabel}>DEPENDS:</span>{" "}
                                    <span style={styles.metaValue}>
                                        {currentNode.dependencies.length > 0
                                            ? currentNode.dependencies.join(", ")
                                            : "NONE (SYSTEM CORE)"}
                                    </span>
                                </div>
                                <div style={styles.metaRow}>
                                    <span style={styles.metaLabel}>TAGS:</span>{" "}
                                    <span style={styles.tagsContainer}>
                                        {currentNode.tags.map(tag => (
                                            <span key={tag} style={styles.tagItem}>[{tag}]</span>
                                        ))}
                                    </span>
                                </div>
                            </div>

                            <hr style={styles.divider} />

                            {/* ZONE 3: Body Content */}
                            <div style={styles.bodyBlock}>
                                <p style={styles.bodyText}>
                                    {language === "en" ? currentNode.content.en : currentNode.content.id}
                                </p>
                            </div>

                            <hr style={styles.divider} />

                            {/* ZONE 4: Related Nodes */}
                            <div style={styles.relatedBlock}>
                                <div style={styles.relatedHeader}>SEE ALSO:</div>
                                <div style={styles.relatedLinks}>
                                    {currentNode.related.length > 0 ? (
                                        currentNode.related.map(relPath => {
                                            const relNode = archiveNodes[relPath]; // internal data lookup
                                            const title = relNode ? relNode.title : relPath;
                                            return (
                                                <div
                                                    key={relPath}
                                                    onClick={() => handleTopicClick(relPath)}
                                                    className="kb-related-link"
                                                    style={styles.relatedLink}
                                                >
                                                    [ {title} ]
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <span style={styles.noRelated}>NONE DETECTED</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. Status Bar (24px) */}
                <div style={styles.statusBar}>
                    <div style={styles.statusLeft}>
                        KNOWLEDGE READY // {currentNode.path}
                    </div>
                    <div style={styles.statusRight}>
                        {searchQuery 
                            ? `${totalFilteredCount} records matched` 
                            : `${archiveList.length} records indexed`
                        }
                    </div>
                </div>
            </div>
        </Window>
    );
};

const styles: StyleSheetCSS = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        backgroundColor: '#2d3031',
        color: '#b0b4b6',
        overflow: 'hidden',
        boxSizing: 'border-box',
        fontFamily: 'MSSerif, sans-serif',
        fontSize: 13,
    },
    headerBar: {
        height: 32,
        backgroundColor: '#111314', // BEVEL.spineColor
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 12px',
        borderBottom: '1px solid #0a0b0b',
        boxSizing: 'border-box',
    },
    pathDisplay: {
        display: 'flex',
        alignItems: 'center',
    },
    pathLabel: {
        fontFamily: 'monospace',
        fontSize: 11,
        color: '#424a4a', // Inactive text
        letterSpacing: '1px',
    },
    pathValue: {
        fontFamily: 'monospace',
        fontSize: 12,
        color: '#3e9697', // Muted teal accent
        letterSpacing: '0.5px',
    },
    systemIdentifier: {
        fontFamily: 'MSSerif',
        fontSize: 12,
        fontWeight: 'bold',
        color: '#86898d', // darkGray
        letterSpacing: '0.5px',
    },
    mainSplit: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        overflow: 'hidden',
        boxSizing: 'border-box',
    },
    indexPanel: {
        width: 240,
        minWidth: 240,
        maxWidth: 240,
        height: '100%',
        backgroundColor: '#1c1f20',
        // Task C: sharper border edge against light document panel
        borderRight: '1px solid #0d0f10',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxSizing: 'border-box',
    },
    searchContainer: {
        height: 42,
        padding: '0 12px',
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid #151718',
        boxSizing: 'border-box',
    },
    searchInput: {
        width: '100%',
        padding: '6px 8px',
        boxSizing: 'border-box',
        border: '1px solid #0a0b0b',
        borderRightColor: '#484b4d',
        borderBottomColor: '#484b4d',
        backgroundColor: '#111314',
        fontFamily: 'MSSerif',
        fontSize: 12,
        color: '#d0d4d6',
        outline: 'none',
        borderRadius: 0,
        boxShadow: 'none',
    },
    listContainer: {
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
        boxSizing: 'border-box',
    },
    gatewayRow: {
        height: 32,
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 16,
        color: '#5db8b9', // Teal — signals educational entry point
        fontSize: 12,
        fontWeight: 'bold',
        cursor: 'pointer',
        borderBottom: '1px solid #1e2122',
        userSelect: 'none',
    },
    categoryBlock: {
        display: 'flex',
        flexDirection: 'column',
        borderBottom: '1px solid #1e2122',
    },
    categoryRow: {
        height: 32,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 12,
        backgroundColor: '#191c1d',
        userSelect: 'none',
    },
    categoryLabel: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#7a7e82', // Slightly brighter than before (#86898d was same lum, now distinct)
        letterSpacing: '1px',
    },
    categoryIndicator: {
        fontSize: 9,
        color: '#424a4a',
    },
    topicsBlock: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#141516',
    },
    topicRow: {
        height: 28,
        display: 'flex',
        alignItems: 'center',
        fontSize: 12,
        color: '#b0b4b6', // Slightly brighter — improves index readability
        cursor: 'pointer',
        userSelect: 'none',
    },
    documentPanel: {
        flex: 1,
        height: '100%',
        // Task B: aged paper surface — remembered browser document under CRT glass
        backgroundColor: '#d6cdb8',
        padding: '20px 28px',
        overflowY: 'auto',
        position: 'relative',
        boxSizing: 'border-box',
    },
    langToggleContainer: {
        position: 'absolute',
        top: 20,
        right: 28,
        display: 'flex',
        alignItems: 'center',
        userSelect: 'none',
    },
    langLabel: {
        fontSize: 11,
        fontFamily: 'monospace',
        cursor: 'pointer',
        fontWeight: 'bold',
        // Task B: active/inactive colors inverted for light surface
    },
    langSeparator: {
        fontSize: 11,
        fontFamily: 'monospace',
        // Task B: separator on light surface
        color: '#9a9e9e',
        margin: '0 6px',
    },
    contentWrapper: {
        display: 'flex',
        flexDirection: 'column',
    },
    docHeader: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
    },
    docPath: {
        fontFamily: 'monospace',
        fontSize: 11,
        // Task B: darker teal readable on light surface
        color: '#2a6e6f',
    },
    docTitle: {
        fontFamily: 'MSSerif',
        fontSize: 22,
        fontWeight: 'bold',
        // Task B: near-black on aged paper
        color: '#1a1c1d',
        margin: '4px 0 12px 0',
    },
    docGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '6px 20px',
        maxWidth: 500,
    },
    gridCell: {
        fontSize: 11,
        fontFamily: 'monospace',
    },
    cellLabel: {
        // Task B: dark label on light surface
        color: '#4a5050',
    },
    cellValue: {
        // Task B: dark value on light surface
        color: '#1e2122',
    },
    divider: {
        border: 'none',
        // Task B: muted warm-toned divider on aged paper
        borderTop: '1px dashed #b0a898',
        margin: '16px 0',
        width: '100%',
    },
    metadataBlock: {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        // Task B: slightly darker aged paper for inset metadata block
        backgroundColor: '#c8bfa8',
        padding: '12px 16px',
        border: '1px solid #b8ae98',
        boxSizing: 'border-box',
    },
    metaRow: {
        fontSize: 12,
        lineHeight: '1.4',
    },
    metaLabel: {
        fontFamily: 'monospace',
        fontWeight: 'bold',
        // Task B: darker teal for light surface
        color: '#2a6e6f',
        display: 'inline-block',
        width: 70,
    },
    metaValue: {
        // Task B: near-black on light surface
        color: '#1a1c1d',
    },
    tagsContainer: {
        display: 'inline-flex',
        flexWrap: 'wrap',
        gap: '6px',
    },
    tagItem: {
        fontFamily: 'monospace',
        // Task B: readable tag color on light surface
        color: '#5a6060',
    },
    bodyBlock: {
        padding: '4px 0',
    },
    bodyText: {
        fontSize: 13,
        lineHeight: '1.6',
        // Task B: dark text on light document surface
        color: '#1a1c1d',
        margin: 0,
        textAlign: 'justify',
        whiteSpace: 'pre-wrap',
    },
    relatedBlock: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    relatedHeader: {
        fontSize: 11,
        fontFamily: 'monospace',
        fontWeight: 'bold',
        // Task B: dark section header on light surface
        color: '#4a5050',
    },
    relatedLinks: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px 16px',
    },
    relatedLink: {
        fontSize: 12,
        fontFamily: 'monospace',
        cursor: 'pointer',
        userSelect: 'none',
        textDecoration: 'none',
    },
    noRelated: {
        fontSize: 12,
        fontFamily: 'monospace',
        // Task B: muted text on light surface
        color: '#8a8e8e',
    },
    statusBar: {
        height: 24,
        backgroundColor: '#111314', // BEVEL.spineColor
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 12px',
        borderTop: '1px solid #0a0b0b',
        boxSizing: 'border-box',
        fontSize: 11,
        fontFamily: 'monospace',
        color: '#546060', // Slightly brighter status bar text
    },
    statusLeft: {
        letterSpacing: '0.5px',
    },
    statusRight: {
        letterSpacing: '0.5px',
    },
};

export default ArchiveBrowser;
