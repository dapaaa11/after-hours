import React from 'react';
import Window from '../os/Window';
import Wordle from '../wordle/Wordle';

export interface HenordleAppProps extends WindowAppProps {}

const HenordleApp: React.FC<HenordleAppProps> = (props) => {
    // Calculate the height dynamically based on window.innerHeight to ensure it fits on smaller screens
    const defaultHeight = 860;
    const topOffset = 20;
    const taskbarHeight = 32;
    const safeMargin = 16;
    const calculatedHeight = window.innerHeight - taskbarHeight - topOffset - safeMargin;
    const height = Math.min(defaultHeight, Math.max(400, calculatedHeight));

    return (
        <Window
            top={topOffset}
            left={300}
            width={600}
            height={height}
            windowBarIcon="windowGameIcon"
            windowTitle="Henordle"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            bottomLeftText={'© Copyright 2026 Dava Ardana'}
        >
            <div className="site-page">
                <Wordle windowHeight={height} />
            </div>
        </Window>
    );
};

export default HenordleApp;
