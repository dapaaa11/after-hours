import React from 'react';
import { Link } from '../general';

export interface HomeProps {}

const Home: React.FC<HomeProps> = (props) => {
    return (
        <div style={styles.page}>
            <div style={styles.header}>
                <h1 style={styles.name}>after-hours</h1>
                <h2>digital workspace / two operators</h2>
            </div>
            <div style={styles.buttons}>
                <Link containerStyle={styles.link} to="operators" text="OPERATORS" />
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
                <Link
                    containerStyle={styles.link}
                    to="channel"
                    text="CHANNEL"
                />
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    page: {
        left: 0,
        right: 0,
        top: 0,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100%',
    },
    header: {
        textAlign: 'center',
        marginBottom: 64,
        marginTop: 64,

        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttons: {
        justifyContent: 'space-between',
    },
    image: {
        width: 800,
    },
    link: {
        padding: 16,
    },
    name: {
        fontSize: 72,
        marginBottom: 16,
        lineHeight: 0.9,
    },
};

export default Home;
