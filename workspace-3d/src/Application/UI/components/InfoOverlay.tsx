import React, { useEffect, useRef, useState } from 'react';
import FreeCamToggle from './FreeCamToggle';
import MuteToggle from './MuteToggle';

interface InfoOverlayProps {
    visible: boolean;
}

// System status panel lines — typed in sequence
const LINE_1 = 'AFTER-HOURS NODE';
const LINE_2 = 'LOCAL KNOWLEDGE OS';
const LINE_3 = 'TWO OPERATORS';
const LINE_4 = 'ID/EN READY';
const LINE_5 = 'STATUS: ONLINE';
const MULTIPLIER = 1;

const InfoOverlay: React.FC<InfoOverlayProps> = ({ visible }) => {
    const visRef = useRef(visible);
    const [line1, setLine1] = useState('');
    const [line2, setLine2] = useState('');
    const [line3, setLine3] = useState('');
    const [line4, setLine4] = useState('');
    const [line5, setLine5] = useState('');
    const [textDone, setTextDone] = useState(false);
    const [volumeVisible, setVolumeVisible] = useState(false);
    const [freeCamVisible, setFreeCamVisible] = useState(false);

    const typeText = (
        i: number,
        curText: string,
        text: string,
        setText: React.Dispatch<React.SetStateAction<string>>,
        callback: () => void
    ) => {
        if (i < text.length) {
            setTimeout(() => {
                if (visRef.current === true)
                    window.postMessage(
                        { type: 'keydown', key: `_AUTO_${text[i]}` },
                        '*'
                    );
                setText(curText + text[i]);
                typeText(i + 1, curText + text[i], text, setText, callback);
            }, Math.random() * 40 + 35 * MULTIPLIER);
        } else {
            callback();
        }
    };

    useEffect(() => {
        if (visible && line1 === '') {
            setTimeout(() => {
                typeText(0, '', LINE_1, setLine1, () => {
                    typeText(0, '', LINE_2, setLine2, () => {
                        typeText(0, '', LINE_3, setLine3, () => {
                            typeText(0, '', LINE_4, setLine4, () => {
                                typeText(0, '', LINE_5, setLine5, () => {
                                    setTextDone(true);
                                });
                            });
                        });
                    });
                });
            }, 400);
        }
        visRef.current = visible;
    }, [visible]);

    useEffect(() => {
        if (textDone) {
            setTimeout(() => {
                setVolumeVisible(true);
                setTimeout(() => {
                    setFreeCamVisible(true);
                }, 250);
            }, 250);
        }
    }, [textDone]);

    useEffect(() => {
        window.postMessage({ type: 'keydown', key: `_AUTO_` }, '*');
    }, [freeCamVisible, volumeVisible]);

    return (
        <div style={styles.wrapper}>
            {/* Dim header label */}
            {line1 !== '' && (
                <div style={styles.headerContainer}>
                    <p style={styles.headerText}>{line1}</p>
                </div>
            )}
            {/* Body lines */}
            {line2 !== '' && (
                <div style={styles.container}>
                    <p style={styles.dimText}>{line2}</p>
                </div>
            )}
            {line3 !== '' && (
                <div style={styles.container}>
                    <p style={styles.dimText}>{line3}</p>
                </div>
            )}
            {line4 !== '' && (
                <div style={styles.container}>
                    <p style={styles.dimText}>{line4}</p>
                </div>
            )}
            {/* Status line + controls row */}
            {line5 !== '' && (
                <div style={styles.lastRow}>
                    <div
                        style={Object.assign(
                            {},
                            styles.container,
                            styles.lastRowChild
                        )}
                    >
                        <p style={styles.statusText}>{line5}</p>
                    </div>
                    {volumeVisible && (
                        <div style={styles.lastRowChild}>
                            <MuteToggle />
                        </div>
                    )}
                    {freeCamVisible && (
                        <div style={styles.lastRowChild}>
                            <FreeCamToggle />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

const styles: StyleSheetCSS = {
    container: {
        background: 'black',
        padding: 4,
        paddingLeft: 12,
        paddingRight: 12,
        textAlign: 'left',
        display: 'flex',
        marginBottom: 2,
        boxSizing: 'border-box',
    },
    headerContainer: {
        background: 'black',
        padding: 4,
        paddingLeft: 12,
        paddingRight: 12,
        textAlign: 'left',
        display: 'flex',
        marginBottom: 6,
        boxSizing: 'border-box',
        borderBottom: '1px solid rgba(255,255,255,0.12)',
    },
    headerText: {
        margin: 0,
        letterSpacing: '0.12em',
        opacity: 1,
    },
    dimText: {
        margin: 0,
        opacity: 0.45,
        letterSpacing: '0.08em',
    },
    statusText: {
        margin: 0,
        opacity: 0.75,
        letterSpacing: '0.08em',
    },
    wrapper: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    lastRow: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 4,
    },
    lastRowChild: {
        marginRight: 4,
    },
};

export default InfoOverlay;
