import React, { useEffect, useState } from 'react';
import { Link } from '../general';
import { useLocation } from 'react-router-dom';
import { useLanguage } from './LanguageContext';

export interface VerticalNavbarProps {}

const VerticalNavbar: React.FC<VerticalNavbarProps> = (props) => {
    const location = useLocation();
    const [isHome, setIsHome] = useState(false);
    const { language, setLanguage } = useLanguage();

    useEffect(() => {
        if (location.pathname === '/') {
            setIsHome(true);
        } else {
            setIsHome(false);
        }
        return () => {};
    }, [location.pathname]);

    return !isHome ? (
        <div style={styles.navbar}>
            <div style={styles.header}>
                <h1 style={styles.headerText}>after-hours</h1>
            </div>
            <div style={styles.links}>
                <Link containerStyle={styles.link} to="" text="HOME" />
                <Link
                    containerStyle={styles.link}
                    to="operators"
                    text="OPERATORS"
                />
                <Link
                    containerStyle={styles.link}
                    to="channel"
                    text="CHANNEL"
                />
                <Link
                    containerStyle={styles.link}
                    to="systems"
                    text="SYSTEMS"
                />
                <Link
                    containerStyle={styles.link}
                    to="archive"
                    text={language === 'id' ? 'ARSIP' : 'ARCHIVE'}
                />

            </div>
            <div style={styles.spacer} />
            <div style={styles.langToggle}>
                <span
                    style={Object.assign({}, styles.langOpt, language === 'en' && styles.langActive)}
                    onMouseDown={() => setLanguage('en')}
                >
                    EN
                </span>
                <span style={styles.langSep}>/</span>
                <span
                    style={Object.assign({}, styles.langOpt, language === 'id' && styles.langActive)}
                    onMouseDown={() => setLanguage('id')}
                >
                    ID
                </span>
            </div>
        </div>
    ) : (
        <></>
    );
};

const styles: StyleSheetCSS = {
    navbar: {
        width: 300,
        height: '100%',
        flexDirection: 'column',
        padding: 48,
        boxSizing: 'border-box',
        position: 'fixed',
        overflow: 'hidden',
    },
    header: {
        flexDirection: 'column',
        marginBottom: 36,
    },
    headerText: {
        fontSize: 38,
        lineHeight: 1,
    },
    headerShowcase: {
        marginTop: 12,
    },
    logo: {
        width: '100%',
        marginBottom: 8,
    },
    link: {
        marginBottom: 18,
    },
    links: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
    },
    spacer: {
        flex: 1,
    },
    langToggle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginTop: 32,
    },
    langOpt: {
        fontFamily: 'Terminal, Courier New, monospace',
        fontSize: 12,
        color: '#888',
        cursor: 'pointer',
        letterSpacing: 1,
    },
    langActive: {
        color: '#222',
        fontWeight: 'bold',
    },
    langSep: {
        fontFamily: 'Terminal, Courier New, monospace',
        fontSize: 12,
        color: '#ccc',
    },
};

export default VerticalNavbar;
