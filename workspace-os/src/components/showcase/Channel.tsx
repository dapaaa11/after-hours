import React, { useState, useEffect } from 'react';

export interface ChannelProps {}

// POST /api/send-email — expects { name, email, message, company }
// email is required by the mailer; we collect it as an optional field
// and fall back to a placeholder if not provided.
const API_ENDPOINT = '/api/send-email';

type TransmitState = 'idle' | 'sending' | 'sent' | 'error';

const Channel: React.FC<ChannelProps> = () => {
    const [handle, setHandle] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [state, setState] = useState<TransmitState>('idle');
    const [statusText, setStatusText] = useState('');

    const canTransmit =
        handle.trim().length > 0 && message.trim().length > 0;

    async function transmit() {
        if (!canTransmit || state === 'sending') return;

        setState('sending');
        setStatusText('');

        try {
            const res = await fetch(API_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: handle,
                    email: email.trim() || 'no-reply@after-hours.dev',
                    message,
                    company: '',
                }),
            });

            if (res.ok) {
                setState('sent');
                setStatusText('transmission received.');
                setHandle('');
                setEmail('');
                setMessage('');
            } else {
                setState('error');
                setStatusText('transmission failed. try again.');
            }
        } catch {
            setState('error');
            setStatusText('signal lost. check connection.');
        }
    }

    // Reset status after a delay
    useEffect(() => {
        if (state === 'sent' || state === 'error') {
            const t = setTimeout(() => {
                setState('idle');
                setStatusText('');
            }, 5000);
            return () => clearTimeout(t);
        }
    }, [state]);

    return (
        <div className="site-page-content">
            {/* Page header */}
            <div style={styles.pageHeader}>
                <h1 style={styles.title}>Channel</h1>
                <p style={styles.subtitle}>AFTER-HOURS / transmission layer</p>
            </div>

            {/* Intro */}
            <div style={styles.intro}>
                <p style={styles.introLine}>
                    You've reached the end of the workspace.
                </p>
                <p style={styles.introLine}>
                    If something here resonated —
                </p>
                <p style={styles.introLine}>
                    or you want to build something together —
                </p>
                <p style={styles.introLine}>open a channel.</p>
            </div>

            {/* Terminal divider */}
            <div style={styles.terminalLine}>
                <span style={styles.terminalPrompt}>{'>'}</span>
                <span style={styles.terminalCmd}>
                    channel --open --address afterhours.std@gmail.com
                </span>
            </div>

            {/* Email — displayed subtly, not as CTA */}
            <div style={styles.emailRow}>
                <span style={styles.emailLabel}>direct</span>
                <span style={styles.emailSep}>::</span>
                <a
                    href="mailto:afterhours.std@gmail.com"
                    style={styles.emailLink}
                >
                    afterhours.std@gmail.com
                </a>
            </div>

            {/* Divider */}
            <div style={styles.sectionDivider} />

            {/* Form */}
            <div style={styles.form}>
                {/* Handle */}
                <div style={styles.fieldGroup}>
                    <label style={styles.fieldLabel}>
                        <span style={styles.labelKey}>IDENT</span>
                        <span style={styles.labelSep}>::</span>
                        <span style={styles.labelHint}>name or handle</span>
                    </label>
                    <input
                        style={styles.fieldInput}
                        type="text"
                        placeholder="who's transmitting"
                        value={handle}
                        onChange={(e) => setHandle(e.target.value)}
                        disabled={state === 'sending' || state === 'sent'}
                        autoComplete="off"
                        spellCheck={false}
                    />
                </div>

                {/* Email — optional, low emphasis */}
                <div style={styles.fieldGroup}>
                    <label style={styles.fieldLabel}>
                        <span style={styles.labelKey}>ADDR</span>
                        <span style={styles.labelSep}>::</span>
                        <span style={styles.labelHint}>
                            email — optional, for a reply
                        </span>
                    </label>
                    <input
                        style={styles.fieldInput}
                        type="email"
                        placeholder="return address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={state === 'sending' || state === 'sent'}
                        autoComplete="off"
                        spellCheck={false}
                    />
                </div>

                {/* Message */}
                <div style={styles.fieldGroup}>
                    <label style={styles.fieldLabel}>
                        <span style={styles.labelKey}>MSG</span>
                        <span style={styles.labelSep}>::</span>
                        <span style={styles.labelHint}>transmission body</span>
                    </label>
                    <textarea
                        style={styles.fieldTextarea}
                        placeholder="leave a message in the workspace..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        disabled={state === 'sending' || state === 'sent'}
                        spellCheck={false}
                    />
                </div>

                {/* Submit row */}
                <div style={styles.submitRow}>
                    <button
                        className="site-button"
                        style={Object.assign(
                            {},
                            styles.submitBtn,
                            !canTransmit && styles.submitBtnDisabled
                        )}
                        onMouseDown={transmit}
                        disabled={!canTransmit || state === 'sending' || state === 'sent'}
                    >
                        {state === 'sending' ? (
                            <span className="loading">transmitting</span>
                        ) : state === 'sent' ? (
                            'transmitted.'
                        ) : (
                            'send transmission'
                        )}
                    </button>

                    {/* Status line */}
                    {statusText.length > 0 && (
                        <p
                            style={Object.assign(
                                {},
                                styles.statusText,
                                state === 'error' && styles.statusError
                            )}
                        >
                            {statusText}
                        </p>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div style={styles.footer}>
                <p style={styles.footerText}>
                    — all transmissions routed to the operators. after hours.
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

    // Intro block
    intro: {
        flexDirection: 'column',
        marginTop: 28,
        marginBottom: 28,
        borderLeft: '2px solid #c0c0c0',
        paddingLeft: 16,
        gap: 0,
    },
    introLine: {
        fontFamily: 'Millennium, Times New Roman, serif',
        fontSize: 17,
        color: '#333',
        lineHeight: 1.8,
    },

    // Terminal prompt line
    terminalLine: {
        display: 'flex',
        flexDirection: 'row' as const,
        alignItems: 'center',
        fontFamily: 'Terminal, Courier New, monospace',
        fontSize: 12,
        color: '#666',
        marginBottom: 12,
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

    // Email display
    emailRow: {
        display: 'flex',
        flexDirection: 'row' as const,
        alignItems: 'baseline',
        gap: 10,
        marginBottom: 24,
    },
    emailLabel: {
        fontFamily: 'Terminal, Courier New, monospace',
        fontSize: 11,
        letterSpacing: 2,
        color: '#888',
        textTransform: 'uppercase' as const,
    },
    emailSep: {
        fontFamily: 'Terminal, Courier New, monospace',
        fontSize: 11,
        color: '#aaa',
    },
    emailLink: {
        fontFamily: 'Terminal, Courier New, monospace',
        fontSize: 13,
        color: '#444',
        textDecoration: 'none',
        letterSpacing: 0.5,
        borderBottom: '1px solid #ccc',
    },

    sectionDivider: {
        height: 1,
        backgroundColor: '#c8c8c8',
        marginBottom: 28,
        width: '100%',
    },

    // Form
    form: {
        flexDirection: 'column',
        maxWidth: 560,
    },
    fieldGroup: {
        flexDirection: 'column',
        marginBottom: 20,
    },
    fieldLabel: {
        display: 'flex',
        flexDirection: 'row' as const,
        alignItems: 'baseline',
        gap: 8,
        marginBottom: 6,
    },
    labelKey: {
        fontFamily: 'Terminal, Courier New, monospace',
        fontSize: 11,
        letterSpacing: 2,
        color: '#888',
        textTransform: 'uppercase' as const,
        minWidth: 40,
    },
    labelSep: {
        fontFamily: 'Terminal, Courier New, monospace',
        fontSize: 11,
        color: '#bbb',
    },
    labelHint: {
        fontFamily: 'Terminal, Courier New, monospace',
        fontSize: 11,
        color: '#aaa',
        letterSpacing: 0.5,
    },
    fieldInput: {
        // inherits global input styles (.site-button reuses border-field box-shadow)
        // marginTop/marginBottom overrides handled by fieldGroup
        marginTop: 0,
        marginBottom: 0,
    },
    fieldTextarea: {
        width: '100%',
        height: 120,
        marginTop: 0,
        marginBottom: 0,
    },

    // Submit
    submitRow: {
        flexDirection: 'row' as const,
        alignItems: 'center',
        gap: 20,
        marginTop: 8,
    },
    submitBtn: {
        fontFamily: 'Terminal, Courier New, monospace',
        fontSize: 13,
        letterSpacing: 1,
        minWidth: 160,
        height: 32,
        textTransform: 'lowercase' as const,
    },
    submitBtnDisabled: {
        opacity: 0.45,
        cursor: 'not-allowed',
    },
    statusText: {
        fontFamily: 'Terminal, Courier New, monospace',
        fontSize: 12,
        color: '#555',
        letterSpacing: 0.5,
    },
    statusError: {
        color: '#8b0000',
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

export default Channel;
