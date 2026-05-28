import { IconName } from '../../assets/icons';

export interface StartMenuEntry {
    label: string;
    type: 'window' | 'system';
    target: string;
    icon?: IconName;
    hasSubmenu?: boolean;
    group: 'primary' | 'secondary' | 'tertiary' | 'terminal';
}

export const START_MENU_ENTRIES: StartMenuEntry[] = [
    // Primary group — active desktop synchronized applications
    {
        label: 'Reference',
        type: 'window',
        target: 'showcase',
        icon: 'showcaseIcon',
        group: 'primary',
    },
    {
        label: 'Henordle',
        type: 'window',
        target: 'henordle',
        icon: 'henordleIcon',
        group: 'primary',
    },
    {
        label: 'Knowledge Browser',
        type: 'window',
        target: 'archive',
        icon: 'windowExplorerIcon',
        group: 'primary',
    },
    // Secondary group — secret/hidden operational systems
    {
        label: 'DOOM',
        type: 'window',
        target: 'doom',
        icon: 'doomIcon',
        group: 'secondary',
    },
    // Terminal group — system operations
    {
        label: 'Shut Down...',
        type: 'system',
        target: 'shutdown',
        icon: 'computerSmall',
        group: 'terminal',
    },
];
