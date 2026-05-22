import React, { useEffect, useState } from 'react';
import { Link } from '../general';
import { useLocation } from 'react-router-dom';

export interface VerticalNavbarProps {}

const VerticalNavbar: React.FC<VerticalNavbarProps> = (props) => {
    const location = useLocation();
    const [isHome, setIsHome] = useState(false);

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
                    text="ARCHIVE"
                />

            </div>
            <div style={styles.spacer} />
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
};

export default VerticalNavbar;
