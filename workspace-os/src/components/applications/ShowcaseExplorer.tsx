import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../showcase/Home';
import Window from '../os/Window';

import Operators from '../showcase/Operators';
import Channel from '../showcase/Channel';
import Systems from '../showcase/Systems';
import Archive from '../showcase/Archive';
import VerticalNavbar from '../showcase/VerticalNavbar';
import useInitialWindowSize from '../../hooks/useInitialWindowSize';

export interface ShowcaseExplorerProps extends WindowAppProps {}

const ShowcaseExplorer: React.FC<ShowcaseExplorerProps> = (props) => {
    const { initWidth, initHeight } = useInitialWindowSize({ margin: 100 });

    return (
        <Window
            top={24}
            left={56}
            width={initWidth}
            height={initHeight}
            windowTitle="Reference"
            windowBarIcon="windowExplorerIcon"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            bottomLeftText={'© 2025 after-hours collective'}
        >
            <Router>
                <div className="site-page">
                    <VerticalNavbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/operators" element={<Operators />} />
                        <Route path="/channel" element={<Channel />} />
                        <Route path="/systems" element={<Systems />} />
                        <Route path="/archive" element={<Archive />} />
                    </Routes>
                </div>
            </Router>
        </Window>
    );
};

export default ShowcaseExplorer;
