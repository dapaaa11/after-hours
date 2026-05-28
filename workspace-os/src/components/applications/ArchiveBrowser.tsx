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
                        background-color: #e4e4e4;
                    }
                    .kb-scrollbar::-webkit-scrollbar-thumb {
                        background-color: #c0c0c0;
                        border: 2px solid #e4e4e4;
                    }
                    .kb-scrollbar::-webkit-scrollbar-thumb:hover {
                        background-color: #a0a0a0;
                    }
                    .kb-scrollbar::-webkit-scrollbar-corner {
                        background-color: transparent;
                    }
                    .kb-hover-row:hover {
                        background-color: #000080 !important;
                        color: #ffffff !important;
                    }
                    .kb-active-row {
                        background-color: #000080 !important;
                        color: #ffffff !important;
                    }
                    .kb-related-link {
                        color: #0000ee !important;
                        transition: color 0.1s ease !important;
                    }
                    .kb-related-link:hover {
                        color: #551a8b !important;
                    }
                `}</style>

                {/* 1. Browser Toolbar */}
                <div style={styles.headerBar}>
                    <div style={styles.toolbarRow}>
                        <div style={styles.addressInputContainer}>
                            <div style={styles.addressLabel}>Address</div>
                            <input
                                type="text"
                                readOnly
                                value={searchQuery ? `after-hours://search?q=${searchQuery}` : activePath}
                                style={styles.headerSearchInput}
                            />
                        </div>
                        <div style={styles.searchBarContainer}>
                            <div style={styles.addressLabel}>Search</div>
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={styles.headerSearchInput}
                                autoComplete="off"
                                autoCorrect="off"
                                autoCapitalize="off"
                                spellCheck="false"
                            />
                        </div>
                    </div>
                </div>

                {/* 2. Main Workspace Split Panel */}
                <div style={styles.mainSplit}>
                    {/* Left Index Panel - Visible only on Topic Pages */}
                    {!searchQuery && activePath !== "after-hours://index" && (
                        <div style={styles.indexPanel}>
                            {/* Category and Node List */}
                            <div className="kb-scrollbar" style={styles.listContainer}>
                            {/* Always allow accessing the gateway root */}
                            {rootMatches && (
                                <div
                                    onClick={() => handleTopicClick("after-hours://index")}
                                    className={`kb-hover-row ${activePath === "after-hours://index" ? "kb-active-row" : ""}`}
                                    style={{
                                        ...styles.gatewayRow,
                                        borderLeft: activePath === "after-hours://index" ? "2px solid #000080" : "none",
                                    }}
                                >
                                    LOCAL DIRECTORY
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
                                                color: isKnowledgeCat
                                                    ? (isCatActive ? '#1a1c1d' : '#2a2a2a')
                                                    : (isCatActive ? '#1a1c1d' : '#4a4a4a'),
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
                                                                borderLeft: isTopicActive ? "2px solid #000080" : "none",
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
                    )}

                    {/* Right Document Panel (Flexible) */}
                    <div className="kb-scrollbar" style={styles.documentPanel}>
                        {/* Language Toggle in top-right — Task B: colors adapted for light surface */}
                        <div style={styles.langToggleContainer}>
                            <span
                                onClick={() => setLanguage("en")}
                                style={{
                                    ...styles.langLabel,
                                    textDecoration: language === "en" ? "underline" : "none",
                                    color: language === "en" ? "#0000ee" : "#5a6060",
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
                                    color: language === "id" ? "#0000ee" : "#5a6060",
                                }}
                            >
                                ID
                            </span>
                        </div>

                        {/* Content Area */}
                        <div style={styles.contentWrapper}>
                            {searchQuery ? (
                                /* SEARCH ENGINE RESULTS PAGE (SERP) */
                                <div style={styles.serpContainer}>
                                    <h2 style={styles.serpTitle}>
                                        {language === "en" ? `Search Results for "${searchQuery}"` : `Hasil Pencarian untuk "${searchQuery}"`}
                                    </h2>
                                    <div style={styles.serpMeta}>
                                        {totalFilteredCount === 0 
                                            ? (language === "en" ? "No pages found." : "Tidak ada halaman ditemukan.")
                                            : `${totalFilteredCount} ${language === "en" ? "pages found" : "halaman ditemukan"}`
                                        }
                                    </div>
                                    
                                    {totalFilteredCount > 0 && (
                                        <div style={styles.serpList}>
                                            {CATEGORIES.map(cat => {
                                                const topics = filteredGrouped[cat] || [];
                                                if (topics.length === 0) return null;
                                                return (
                                                    <div key={cat} style={styles.serpCategoryGroup}>
                                                        <h3 style={styles.serpCategoryTitle}>{CATEGORY_LABELS[cat]}</h3>
                                                        {topics.map(topic => (
                                                            <div key={topic.path} style={styles.serpItem}>
                                                                <div 
                                                                    style={styles.serpLink}
                                                                    onClick={() => {
                                                                        setSearchQuery('');
                                                                        handleTopicClick(topic.path);
                                                                    }}
                                                                >
                                                                    {topic.title}
                                                                </div>
                                                                <div style={styles.serpPath}>{topic.path}</div>
                                                                <div style={styles.serpDesc}>
                                                                    {language === "en" 
                                                                        ? topic.role 
                                                                        : (topic.content.id.split('\n')[0].substring(0, 100) + '...')
                                                                    }
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            ) : activePath === "after-hours://index" ? (
                                /* PORTAL HOMEPAGE VIEW */
                                <div style={styles.portalContainer}>
                                    <div style={styles.portalHeaderArea}>
                                        <h1 style={styles.portalTitle}>Knowledge Browser</h1>
                                        <div style={styles.portalSubtitle}>
                                            {language === "en" ? "Local Educational Portal" : "Portal Edukasi Lokal"}
                                        </div>
                                    </div>
                                    
                                    <div style={styles.portalBody}>
                                        <div style={styles.portalTilesSection}>
                                            <div style={styles.portalTilesGrid}>
                                                <div style={styles.portalTile} onClick={() => setSearchQuery('web')}>
                                                    <div style={styles.portalTileTitle}>WEB / FRONTEND</div>
                                                    <div style={styles.portalTileDesc}>
                                                        {language === "en" ? "Web Technologies" : "Teknologi Web"}
                                                    </div>
                                                </div>
                                                <div style={styles.portalTile} onClick={() => setSearchQuery('system')}>
                                                    <div style={styles.portalTileTitle}>SYSTEMS</div>
                                                    <div style={styles.portalTileDesc}>
                                                        {language === "en" ? "Internal OS logic" : "Logika OS internal"}
                                                    </div>
                                                </div>
                                                <div style={styles.portalTile} onClick={() => setSearchQuery('knowledge')}>
                                                    <div style={styles.portalTileTitle}>KNOWLEDGE</div>
                                                    <div style={styles.portalTileDesc}>
                                                        {language === "en" ? "General IT records" : "Catatan IT umum"}
                                                    </div>
                                                </div>
                                                <div style={styles.portalTile} onClick={() => setSearchQuery('stack')}>
                                                    <div style={styles.portalTileTitle}>STACK</div>
                                                    <div style={styles.portalTileDesc}>
                                                        {language === "en" ? "Installed tools" : "Alat terinstal"}
                                                    </div>
                                                </div>
                                                <div style={styles.portalTile} onClick={() => setSearchQuery('deployment')}>
                                                    <div style={styles.portalTileTitle}>TOOLS / DEPLOY</div>
                                                    <div style={styles.portalTileDesc}>
                                                        {language === "en" ? "Build & Deploy" : "Build & Deploy"}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div style={styles.portalWelcomeBox}>
                                            <div style={styles.portalWelcomeHeader}>
                                                {language === "en" ? "Welcome to the Knowledge Browser" : "Selamat datang di Knowledge Browser"}
                                            </div>
                                            <div style={styles.portalIntro}>
                                                {language === "en" ? (
                                                    `AFTER-HOURS Knowledge Browser v1.1\n\nThis system provides access to three reference categories:\n— STACK: Active local workstation technologies.\n— SYSTEM: Internal layers and project logs.\n— KNOWLEDGE: General IT reference pages.\n\nAll pages are stored locally. No external requests are made. Search queries are filtered synchronously.\n\nUse the tiles to the left or the search bar above to browse.`
                                                ) : (
                                                    `Portal Pengetahuan AFTER-HOURS v1.1\n\nSistem ini menyediakan akses ke tiga kategori:\n— STACK: Teknologi lokal yang aktif berjalan.\n— SYSTEM: Lapisan internal dan log proyek.\n— KNOWLEDGE: Halaman referensi IT umum.\n\nSemua halaman disimpan secara lokal. Tidak ada permintaan eksternal. Kueri pencarian disaring secara sinkron.\n\nGunakan ubin di sebelah kiri atau bilah pencarian untuk menelusuri.`
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                /* TOPIC PAGE VIEW */
                                <>
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
                                        <div style={styles.relatedHeader}>RELATED PAGES:</div>
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
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* 3. Status Bar (24px) */}
                <div style={styles.statusBar}>
                    <div style={styles.statusLeft}>
                        PAGES READY // {currentNode.path}
                    </div>
                    <div style={styles.statusRight}>
                        {searchQuery 
                            ? `${totalFilteredCount} pages found` 
                            : `${archiveList.length} local pages`
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
        height: 40,
        backgroundColor: '#0a246a',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 12px',
        borderBottom: '1px solid #000000',
        boxSizing: 'border-box',
    },
    toolbarRow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        gap: '20px',
    },
    searchBarContainer: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        maxWidth: '300px',
    },
    headerSearchInput: {
        width: '100%',
        padding: '3px 6px',
        backgroundColor: '#ffffff',
        border: '2px inset #dfdfdf',
        fontFamily: 'monospace',
        fontSize: 12,
        color: '#1a1c1d',
        outline: 'none',
    },
    addressInputContainer: {
        flex: 2,
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
    },
    addressLabel: {
        fontFamily: 'MSSans',
        fontSize: 12,
        fontWeight: 'bold',
        color: '#e4e4e4',
        marginRight: 12,
    },
    addressValue: {
        fontFamily: 'monospace',
        fontSize: 12,
        color: '#ffffff',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    mainSplit: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        overflow: 'hidden',
        boxSizing: 'border-box',
    },
    indexPanel: {
        width: 160,
        minWidth: 160,
        maxWidth: 160,
        height: '100%',
        backgroundColor: '#f0f0f0',
        borderRight: '1px solid #cccccc',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxSizing: 'border-box',
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
        color: '#0000ee',
        fontSize: 12,
        fontWeight: 'bold',
        cursor: 'pointer',
        borderBottom: '1px solid #e4e4e4',
        userSelect: 'none',
    },
    categoryBlock: {
        display: 'flex',
        flexDirection: 'column',
        borderBottom: '1px solid #e4e4e4',
    },
    categoryRow: {
        height: 32,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 12,
        backgroundColor: '#e4e4e4',
        userSelect: 'none',
    },
    categoryLabel: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#1a1c1d',
        letterSpacing: '1px',
    },
    categoryIndicator: {
        fontSize: 9,
        color: '#888888',
    },
    topicsBlock: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f8f8f8',
    },
    topicRow: {
        height: 28,
        display: 'flex',
        alignItems: 'center',
        fontSize: 12,
        color: '#1a1c1d',
        cursor: 'pointer',
        userSelect: 'none',
    },
    documentPanel: {
        flex: 1,
        height: '100%',
        backgroundColor: '#ffffff',
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
        color: '#888888',
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
        color: '#006600',
    },
    docTitle: {
        fontFamily: 'MSSerif',
        fontSize: 22,
        fontWeight: 'bold',
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
        color: '#4a5050',
    },
    cellValue: {
        color: '#1e2122',
    },
    divider: {
        border: 'none',
        borderTop: '1px dashed #b0a898',
        margin: '16px 0',
        width: '100%',
    },
    metadataBlock: {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
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
        color: '#2a6e6f',
        display: 'inline-block',
        width: 70,
    },
    metaValue: {
        color: '#1a1c1d',
    },
    tagsContainer: {
        display: 'inline-flex',
        flexWrap: 'wrap',
        gap: '6px',
    },
    tagItem: {
        fontFamily: 'monospace',
        color: '#5a6060',
    },
    bodyBlock: {
        padding: '4px 0',
    },
    bodyText: {
        fontSize: 13,
        lineHeight: '1.6',
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
        color: '#8a8e8e',
    },
    statusBar: {
        height: 24,
        backgroundColor: '#1a2639',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 12px',
        borderTop: '1px solid #0a121e',
        boxSizing: 'border-box',
        fontSize: 11,
        fontFamily: 'monospace',
        color: '#7a8e9e',
    },
    statusLeft: {
        letterSpacing: '0.5px',
    },
    statusRight: {
        letterSpacing: '0.5px',
    },
    portalContainer: {
        width: '100%',
        minHeight: '100%',
        padding: '24px 32px',
        boxSizing: 'border-box',
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        alignItems: 'center',
    },
    portalHeaderArea: {
        textAlign: 'center',
    },
    portalTitle: {
        fontFamily: 'MSSerif',
        fontSize: 28,
        color: '#1a1c1d',
        margin: '0 0 4px 0',
    },
    portalSubtitle: {
        fontFamily: 'MSSans',
        fontSize: 14,
        color: '#5a6060',
        letterSpacing: '1px',
    },
    portalBody: {
        display: 'flex',
        flexDirection: 'row',
        gap: '32px',
        width: '100%',
        maxWidth: '1000px',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    portalTilesSection: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    portalTilesGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '16px',
        width: '100%',
    },
    portalTile: {
        backgroundColor: '#f0f0f0',
        border: '2px outset #dfdfdf',
        padding: '16px',
        cursor: 'pointer',
        boxShadow: '1px 1px 0px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
    },
    portalTileTitle: {
        fontFamily: 'MSSerif',
        fontSize: 14,
        fontWeight: 'bold',
        color: '#0000ee',
        marginBottom: '8px',
        textDecoration: 'underline',
    },
    portalTileDesc: {
        fontFamily: 'MSSans',
        fontSize: 11,
        color: '#1a1c1d',
        lineHeight: '1.5',
    },
    portalWelcomeBox: {
        flex: 1,
        padding: '20px',
        backgroundColor: '#f8f8f8',
        border: '1px solid #cccccc',
    },
    portalWelcomeHeader: {
        fontFamily: 'MSSerif',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0000ee',
        marginBottom: '12px',
        borderBottom: '1px solid #dfdfdf',
        paddingBottom: '8px',
    },
    docSubtitle: {
        fontFamily: 'MSSerif',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1a1c1d',
        marginTop: 24,
        marginBottom: 12,
        borderBottom: '1px solid #cccccc',
        paddingBottom: 4,
    },
    portalIntro: {
        fontSize: 12,
        lineHeight: '1.5',
        color: '#1a1c1d',
        whiteSpace: 'pre-wrap',
        margin: 0,
    },
    serpContainer: {
        padding: '24px 40px',
        backgroundColor: '#ffffff',
        width: '100%',
        boxSizing: 'border-box',
    },
    serpTitle: {
        fontFamily: 'MSSerif',
        fontSize: 24,
        color: '#1a1c1d',
        margin: '0 0 8px 0',
    },
    serpMeta: {
        fontFamily: 'monospace',
        fontSize: 12,
        color: '#5a6060',
        marginBottom: '24px',
        borderBottom: '1px solid #cccccc',
        paddingBottom: '8px',
    },
    serpList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
    },
    serpCategoryGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    serpCategoryTitle: {
        fontFamily: 'monospace',
        fontSize: 14,
        color: '#4a5050',
        margin: 0,
        textDecoration: 'underline',
    },
    serpItem: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        marginBottom: '8px',
    },
    serpLink: {
        fontFamily: 'MSSerif',
        fontSize: 18,
        color: '#0000ee',
        textDecoration: 'underline',
        cursor: 'pointer',
    },
    serpPath: {
        fontFamily: 'monospace',
        fontSize: 11,
        color: '#006600',
    },
    serpDesc: {
        fontFamily: 'MSSerif',
        fontSize: 13,
        color: '#1a1c1d',
    },
    docMetaLabel: {
        fontSize: 11,
        color: '#5a6060',
        fontWeight: 'bold',
    },
    docMetaValue: {
        fontSize: 11,
        color: '#1a1c1d',
    },
};

export default ArchiveBrowser;
