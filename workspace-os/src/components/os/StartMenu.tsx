import React, { useEffect, useRef } from 'react';
// Colors are defined in the BEVEL constants below — no external import needed
import { START_MENU_ENTRIES, StartMenuEntry } from './startMenuConfig';
import { BEVEL } from './windowBevel';
import { Icon } from '../general';

export interface StartMenuProps {
    onClose: () => void;
    onSelect: (entry: StartMenuEntry) => void;
}


const SPINE_WIDTH = 24;

/* ─────────────────────────────────────────────
   StartMenuItem — Individual Row
   ───────────────────────────────────────────── */
const StartMenuItem: React.FC<{
    entry: StartMenuEntry;
    onClick: () => void;
}> = ({ entry, onClick }) => {
    const [hovered, setHovered] = React.useState(false);

    return (
        <div
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                display: 'flex',
                alignItems: 'center',
                height: 36,
                padding: '0 6px',
                cursor: 'pointer',
                userSelect: 'none',
                backgroundColor: hovered ? BEVEL.selectBg : 'transparent',
                // No CSS transitions — mechanical snap, not smooth fade
                position: 'relative',
            }}
        >
            {/* Row Icon — 32x32 visual mass */}
            {entry.icon && (
                <Icon
                    icon={entry.icon}
                    size={32}
                    style={{
                        marginRight: 6,
                        flexShrink: 0,
                        // Pass 5: Icon muting — desaturated/dimmed by default,
                        // slightly brighter on selection
                        filter: hovered
                            ? 'brightness(1.5) saturate(0.4)'
                            : 'saturate(0.3) brightness(0.7)',
                    }}
                />
            )}
            {/* Label */}
            <span
                style={{
                    fontSize: 13,
                    fontFamily: 'MSSerif, sans-serif',
                    color: hovered ? BEVEL.selectFg : BEVEL.textDefault,
                    flex: 1,
                    lineHeight: '36px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                }}
            >
                {entry.label}
            </span>
            {/* Submenu Arrow — directional signaling */}
            {entry.hasSubmenu && (
                <span
                    style={{
                        fontSize: 10,
                        fontFamily: 'MSSerif, sans-serif',
                        color: hovered ? BEVEL.selectFg : BEVEL.textDefault,
                        marginLeft: 'auto',
                        paddingLeft: 12,
                        lineHeight: '36px',
                    }}
                >
                    ▶
                </span>
            )}
        </div>
    );
};

/* ─────────────────────────────────────────────
   Bevel Groove Separator
   2px double-line: dark-gray + white
   Simulates an etched groove in the surface.
   ───────────────────────────────────────────── */
const BevelGroove: React.FC = () => (
    <div
        style={{
            margin: '3px 2px 3px 0',
            height: 2,
            position: 'relative',
        }}
    >
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 1,
                backgroundColor: BEVEL.innerDark,
            }}
        />
        <div
            style={{
                position: 'absolute',
                top: 1,
                left: 0,
                right: 0,
                height: 1,
                backgroundColor: BEVEL.innerLight,
            }}
        />
    </div>
);

/* ─────────────────────────────────────────────
   StartMenu — Full Reconstruction
   ───────────────────────────────────────────── */
const StartMenu: React.FC<StartMenuProps> = ({ onClose, onSelect }) => {
    const menuRef = useRef<HTMLDivElement>(null);

    // Close on click outside the menu panel
    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                onClose();
            }
        };

        const t = setTimeout(() => {
            document.addEventListener('mousedown', handleOutsideClick);
        }, 10);

        return () => {
            clearTimeout(t);
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [onClose]);

    // Close on Escape key press
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    return (
        <div
            ref={menuRef}
            style={{
                // ─── Positioning: anchored to taskbar ───
                position: 'absolute',
                bottom: 30, // Flush against taskbar top (taskbar is 32px, minus 2px for bevel merge)
                left: 3,
                zIndex: 200000,
                // ─── Step 1: Double-Bevel Container ───
                // Outer bevel: white/black (raised slab)
                borderTop: `1px solid ${BEVEL.outerLight}`,
                borderLeft: `1px solid ${BEVEL.outerLight}`,
                borderBottom: `1px solid ${BEVEL.outerDark}`,
                borderRight: `1px solid ${BEVEL.outerDark}`,
                boxSizing: 'border-box',
            }}
        >
            {/* Inner bevel wrapper */}
            <div
                style={{
                    borderTop: `1px solid ${BEVEL.innerLight}`,
                    borderLeft: `1px solid ${BEVEL.innerLight}`,
                    borderBottom: `1px solid ${BEVEL.innerDark}`,
                    borderRight: `1px solid ${BEVEL.innerDark}`,
                    backgroundColor: BEVEL.surface,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'stretch',
                }}
            >
                {/* ─── Step 2: Structural Spine Column ───
                    Real flexbox column, not a positioned overlay.
                    Full height, dark tonal value, vertical text. */}
                <div
                    style={{
                        width: SPINE_WIDTH,
                        flexShrink: 0,
                        backgroundColor: '#808080', // Classic Windows spine
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        position: 'relative',
                        borderRight: `1px solid ${BEVEL.innerDark}`,
                    }}
                >
                    {/* ─── Step 10: Spine Vertical Text ───
                        Counter-flow: bottom-to-top, perpendicular to rows */}
                    <div
                        style={{
                            // @ts-ignore
                            writingMode: 'vertical-rl',
                            transform: 'rotate(180deg)',
                            // Pass 3: Spine text — lores branding font,
                            // barely legible watermark (~10% contrast above spine bg)
                            fontFamily: 'lores-15-bold-alt-oakland, MSSerif, sans-serif',
                            fontSize: 14,
                            fontWeight: 'normal',
                            letterSpacing: 3,
                            color: '#424a4a',
                            textShadow: '1px 1px 0px #000000',
                            padding: '6px 0',
                            userSelect: 'none',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        AFTER·HOURS
                    </div>
                </div>

                {/* ─── Action Column (Right) ─── */}
                <div
                    style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        // Step 3: Row Compression —
                        // Minimal top/bottom padding. Rows pack directly.
                        padding: '2px 0',
                        minWidth: 180,
                    }}
                >
                    {START_MENU_ENTRIES.map((entry, index) => {
                        const prevEntry =
                            index > 0 ? START_MENU_ENTRIES[index - 1] : null;
                        const showSeparator =
                            prevEntry && entry.group !== prevEntry.group;

                        return (
                            <React.Fragment key={entry.target + '-' + index}>
                                {/* Step 4: Bevel-Groove Separators */}
                                {showSeparator && <BevelGroove />}
                                {/* Step 5 + 6 + 7: Row with icon, full-width highlight, arrow */}
                                <StartMenuItem
                                    entry={entry}
                                    onClick={() => {
                                        onSelect(entry);
                                        onClose();
                                    }}
                                />
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default StartMenu;
