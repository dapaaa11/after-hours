import React, { useState } from 'react';
import { IconName } from '../../assets/icons';
import Colors from '../../constants/colors';
import { Icon } from '../general';
import { BEVEL } from './windowBevel';

export interface ButtonProps {
    icon?: IconName;
    text?: string;
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ icon, text, onClick }) => {
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseEnter = () => {
        setIsHovering(true);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
    };

    const outerBorderStyle = Object.assign(
        {},
        styles.outerBorder,
        icon && { width: 16, height: 14 }
    );

    const innerBorderStyle = Object.assign(
        {},
        styles.innerBorder,
        icon && { width: 12, height: 12 },
        text && { padding: 4 }
    );

    const click = (e: any) => {
        e.preventDefault();
        onClick && onClick();
    };

    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={outerBorderStyle}
            onMouseDown={click}
        >
            <div
                style={Object.assign(
                    {},
                    isHovering && { backgroundColor: BEVEL.innerDark },
                    innerBorderStyle
                )}
            >
                {icon && <Icon icon={icon} style={{ filter: 'saturate(0.3) brightness(0.5)' }} />}
                {text && (
                    // <Text noSelect style={styles.text}>
                    //     {text}
                    // </Text>
                    <p>{text}</p>
                )}
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    outerBorder: {
        border: `1px solid ${BEVEL.outerDark}`,
        borderTopColor: BEVEL.outerLight,
        borderLeftColor: BEVEL.outerLight,
        background: BEVEL.surface,

        cursor: 'pointer',
    },
    innerBorder: {
        border: `1px solid ${BEVEL.innerDark}`,
        borderTopColor: BEVEL.innerLight,
        borderLeftColor: BEVEL.innerLight,
        flex: 1,
    },
};

export default Button;
