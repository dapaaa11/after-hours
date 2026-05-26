import React, { useState } from 'react';
import Window from '../os/Window';
import Colors from '../../constants/colors';
import { referenceData, Topic } from '../../data/reference';

export interface ReferenceAppProps extends WindowAppProps {}

const ReferenceApp: React.FC<ReferenceAppProps> = (props) => {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [activeTopic, setActiveTopic] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const handleCategoryClick = (categoryId: string) => {
        setActiveCategory(activeCategory === categoryId ? null : categoryId);
    };

    const handleTopicClick = (topicId: string) => {
        setActiveTopic(topicId);
    };

    const selectedTopic = activeTopic
        ? referenceData
              .reduce<Topic[]>((acc, cat) => acc.concat(cat.topics), [])
              .find((t) => t.id === activeTopic)
        : null;

    const filteredCategories = referenceData
        .map((category) => {
            if (!searchQuery) {
                return category;
            }
            const query = searchQuery.toLowerCase();
            const matchedTopics = category.topics.filter(
                (topic) =>
                    topic.title.toLowerCase().includes(query) ||
                    topic.keywords.some((keyword) => keyword.toLowerCase().includes(query))
            );
            return {
                ...category,
                topics: matchedTopics,
            };
        })
        .filter((category) => category.topics.length > 0);

    return (
        <Window
            top={40}
            left={80}
            width={840}
            height={600}
            windowBarIcon="windowExplorerIcon"
            windowTitle="Reference — Workspace"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            bottomLeftText={'Reference Environment'}
        >
            <div style={styles.container}>
                <style>{`
                    .ref-row:hover {
                        background-color: #d8dadc !important;
                    }
                    .ref-row-active:hover {
                        background-color: #b0b3b7 !important;
                    }
                `}</style>
                {/* Left Panel - Fixed 240px with search and list */}
                <div style={styles.leftPanel}>
                    <div style={styles.searchContainer}>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={styles.searchInput}
                            autoComplete="off"
                            autoCorrect="off"
                            autoCapitalize="off"
                            spellCheck="false"
                        />
                    </div>
                    <div style={styles.listContainer}>
                        {filteredCategories.map((category) => {
                            const isExpanded = activeCategory === category.id;
                            return (
                                <div key={category.id} style={styles.categoryGroup}>
                                    {/* Category Row */}
                                    <div
                                        onClick={() => handleCategoryClick(category.id)}
                                        className="ref-row"
                                        style={styles.categoryRow}
                                    >
                                        <span style={styles.categoryLabel}>{category.label}</span>
                                    </div>

                                    {/* Expandable Topic Rows */}
                                    {isExpanded &&
                                        category.topics.map((topic) => {
                                            const isActive = activeTopic === topic.id;
                                            return (
                                                <div
                                                    key={topic.id}
                                                    onClick={() => handleTopicClick(topic.id)}
                                                    className={isActive ? "ref-row ref-row-active" : "ref-row"}
                                                    style={{
                                                        ...styles.topicRow,
                                                        backgroundColor: isActive ? '#b0b3b7' : 'transparent',
                                                    }}
                                                >
                                                    <span style={styles.topicLabel}>{topic.title}</span>
                                                </div>
                                            );
                                        })}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Vertical Divider Rule - 1px Not Draggable */}
                <div style={styles.divider} />

                {/* Right Panel - Remaining Space, Scrollable */}
                <div style={styles.rightPanel}>
                    {selectedTopic ? (
                        <div style={styles.contentContainer}>
                            <h2 style={styles.topicTitle}>{selectedTopic.title}</h2>
                            <p style={styles.topicContent}>{selectedTopic.content.en}</p>
                            {(selectedTopic as any).code && (
                                <pre style={styles.codeBlock}>
                                    <code style={styles.codeText}>{(selectedTopic as any).code}</code>
                                </pre>
                            )}
                        </div>
                    ) : null}
                </div>
            </div>
        </Window>
    );
};

const styles: StyleSheetCSS = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        backgroundColor: Colors.white,
        overflow: 'hidden',
    },
    leftPanel: {
        width: 240,
        minWidth: 240,
        maxWidth: 240,
        height: '100%',
        backgroundColor: Colors.lightGray,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
    },
    searchContainer: {
        height: 38,
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 16,
        paddingRight: 16,
        borderBottom: `1px solid ${Colors.darkGray}`,
        boxSizing: 'border-box',
        backgroundColor: Colors.lightGray,
    },
    searchInput: {
        width: '100%',
        padding: '4px 8px',
        boxSizing: 'border-box',
        border: `1px solid ${Colors.darkGray}`,
        borderBottomColor: Colors.white,
        borderRightColor: Colors.white,
        backgroundColor: '#e8eaec',
        fontFamily: 'MSSerif',
        fontSize: 13,
        color: Colors.black,
        outline: 'none',
        borderRadius: 0,
        boxShadow: 'none',
    },
    listContainer: {
        flex: 1,
        overflowY: 'auto',
        boxSizing: 'border-box',
    },
    categoryGroup: {
        display: 'flex',
        flexDirection: 'column',
    },
    categoryRow: {
        height: 30,
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 16,
        paddingRight: 16,
        cursor: 'pointer',
        userSelect: 'none',
    },
    categoryLabel: {
        fontFamily: 'MSSerif',
        fontSize: 13,
        fontWeight: 'bold',
        color: Colors.black,
    },
    topicRow: {
        height: 30,
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 32,
        paddingRight: 16,
        cursor: 'pointer',
        userSelect: 'none',
    },
    topicLabel: {
        fontFamily: 'MSSerif',
        fontSize: 13,
        fontWeight: 'normal',
        color: Colors.black,
    },
    divider: {
        width: 1,
        height: '100%',
        backgroundColor: Colors.darkGray,
    },
    rightPanel: {
        flex: 1,
        height: '100%',
        backgroundColor: Colors.white,
        overflowY: 'auto',
        boxSizing: 'border-box',
    },
    contentContainer: {
        padding: '24px 32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    topicTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.black,
        margin: 0,
        padding: 0,
        fontFamily: 'MSSerif',
    },
    topicContent: {
        fontSize: 13,
        lineHeight: '1.5',
        color: Colors.black,
        margin: 0,
        padding: 0,
        fontFamily: 'MSSerif',
    },
    codeBlock: {
        backgroundColor: '#e8eaec',
        border: `1px solid ${Colors.darkGray}`,
        padding: '8px 12px',
        margin: '8px 0 0 0',
        overflowX: 'auto',
        whiteSpace: 'pre-wrap',
    },
    codeText: {
        fontFamily: 'monospace',
        fontSize: 12,
        lineHeight: '1.4',
        color: Colors.black,
    },
};

export default ReferenceApp;
