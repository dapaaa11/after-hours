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
            windowTitle="archive.sys"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            bottomLeftText="archive.sys"
        >
            <div style={styles.container}>
                {/* CSS rules for manual styling of scrollbars and hover snaps */}
                <style>{`
                    .archive-scrollbar::-webkit-scrollbar {
                        width: 14px;
                        background-color: #1a1c1d;
                    }
                    .archive-scrollbar::-webkit-scrollbar-thumb {
                        background-color: #2a2d2e;
                        border: 2px solid #1a1c1d;
                    }
                    .archive-scrollbar::-webkit-scrollbar-thumb:hover {
                        background-color: #3e9697;
                    }
                    .archive-hover-row:hover {
                        background-color: #1a3a3d !important;
                        color: #d0d4d6 !important;
                    }
                    .archive-active-row {
                        background-color: #1a3a3d !important;
                        color: #d0d4d6 !important;
                    }
                    .archive-related-link {
                        color: #3e9697 !important;
                        transition: color 0.1s ease !important;
                    }
                    .archive-related-link:hover {
                        color: #d0d4d6 !important;
                    }
                `}</style>

                {/* 1. Header Bar (32px) */}
                <div style={styles.headerBar}>
                    <div style={styles.pathDisplay}>
                        <span style={styles.pathLabel}>RETRIEVING // </span>
                        <span style={styles.pathValue}>{activePath}</span>
                    </div>
                    <div style={styles.systemIdentifier}>archive.sys</div>
                </div>

                {/* 2. Main Workspace Split Panel */}
                <div style={styles.mainSplit}>
                    {/* Left Index Panel (240px fixed) */}
                    <div style={styles.indexPanel}>
                        {/* Search Input Box */}
                        <div style={styles.searchContainer}>
                            <input
                                type="text"
                                placeholder="Search Index..."
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
                        <div className="archive-scrollbar" style={styles.listContainer}>
                            {/* Always allow accessing the gateway root */}
                            {rootMatches && (
                                <div
                                    onClick={() => handleTopicClick("after-hours://index")}
                                    className={`archive-hover-row ${activePath === "after-hours://index" ? "archive-active-row" : ""}`}
                                    style={{
                                        ...styles.gatewayRow,
                                        borderLeft: activePath === "after-hours://index" ? "2px solid #3e9697" : "none",
                                    }}
                                >
                                    NETWORK GATEWAY
                                </div>
                            )}

                            {CATEGORIES.map(cat => {
                                const topics = filteredGrouped[cat] || [];
                                if (topics.length === 0) return null;

                                const isCatExpanded = searchQuery ? true : (expandedCategory === cat);
                                const isCatActive = isCatExpanded;

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
                                            className={searchQuery ? "" : "archive-scrollbar-thumb"}
                                        >
                                            <span style={styles.categoryLabel}>{CATEGORY_LABELS[cat]}</span>
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
                                                            className={`archive-hover-row ${isTopicActive ? "archive-active-row" : ""}`}
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
                    <div className="archive-scrollbar" style={styles.documentPanel}>
                        {/* Language Toggle in top-right */}
                        <div style={styles.langToggleContainer}>
                            <span
                                onClick={() => setLanguage("en")}
                                style={{
                                    ...styles.langLabel,
                                    textDecoration: language === "en" ? "underline" : "none",
                                    color: language === "en" ? "#d0d4d6" : "#424a4a",
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
                                    color: language === "id" ? "#d0d4d6" : "#424a4a",
                                }}
                            >
                                ID
                            </span>
                        </div>

                        {/* Content Area */}
                        <div style={styles.contentWrapper}>
                            {/* ZONE 1: Page Header */}
                            <div style={styles.docHeader}>
                                <div style={styles.docPath}>RECORD // {currentNode.path}</div>
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
                                <div style={styles.relatedHeader}>RELATED RECORDS:</div>
                                <div style={styles.relatedLinks}>
                                    {currentNode.related.length > 0 ? (
                                        currentNode.related.map(relPath => {
                                            const relNode = archiveNodes[relPath];
                                            const title = relNode ? relNode.title : relPath;
                                            return (
                                                <div
                                                    key={relPath}
                                                    onClick={() => handleTopicClick(relPath)}
                                                    className="archive-related-link"
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
                        SYS_STATUS // RETRIEVED_OK // {currentNode.path}
                    </div>
                    <div style={styles.statusRight}>
                        {searchQuery 
                            ? `${totalFilteredCount} matching records found` 
                            : `${archiveList.length} operational records filed`
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
        backgroundColor: '#2a2d2e', // BEVEL.surface
        color: '#a0a4a6', // BEVEL.textDefault
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
        backgroundColor: '#1a1c1d', // Darker panel background
        borderRight: '1px solid #151718', // InnerDark boundary
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
        boxSizing: 'border-box',
    },
    gatewayRow: {
        height: 32,
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 16,
        color: '#a0a4a6',
        fontSize: 12,
        fontWeight: 'bold',
        cursor: 'pointer',
        borderBottom: '1px solid #151718',
        userSelect: 'none',
    },
    categoryBlock: {
        display: 'flex',
        flexDirection: 'column',
        borderBottom: '1px solid #151718',
    },
    categoryRow: {
        height: 32,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 12,
        backgroundColor: '#17191a',
        userSelect: 'none',
    },
    categoryLabel: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#86898d', // Inactive warm grey
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
        color: '#a0a4a6',
        cursor: 'pointer',
        userSelect: 'none',
    },
    documentPanel: {
        flex: 1,
        height: '100%',
        backgroundColor: '#2a2d2e', // BEVEL.surface
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
    },
    langSeparator: {
        fontSize: 11,
        fontFamily: 'monospace',
        color: '#424a4a',
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
        color: '#3e9697', // teal
    },
    docTitle: {
        fontFamily: 'MSSerif',
        fontSize: 22,
        fontWeight: 'bold',
        color: '#d0d4d6', // selectFg
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
        color: '#424a4a', // muted inactive grey
    },
    cellValue: {
        color: '#a0a4a6',
    },
    divider: {
        border: 'none',
        borderTop: '1px dashed #3a3d3f',
        margin: '16px 0',
        width: '100%',
    },
    metadataBlock: {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        backgroundColor: '#202223',
        padding: '12px 16px',
        border: '1px solid #1c1e1f',
        boxSizing: 'border-box',
    },
    metaRow: {
        fontSize: 12,
        lineHeight: '1.4',
    },
    metaLabel: {
        fontFamily: 'monospace',
        fontWeight: 'bold',
        color: '#3e9697',
        display: 'inline-block',
        width: 70,
    },
    metaValue: {
        color: '#d0d4d6',
    },
    tagsContainer: {
        display: 'inline-flex',
        flexWrap: 'wrap',
        gap: '6px',
    },
    tagItem: {
        fontFamily: 'monospace',
        color: '#86898d',
    },
    bodyBlock: {
        padding: '4px 0',
    },
    bodyText: {
        fontSize: 13,
        lineHeight: '1.6',
        color: '#d0d4d6',
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
        color: '#424a4a',
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
        color: '#424a4a',
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
        color: '#424a4a',
    },
    statusLeft: {
        letterSpacing: '0.5px',
    },
    statusRight: {
        letterSpacing: '0.5px',
    },
};

export default ArchiveBrowser;
