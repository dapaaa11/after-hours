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
    // Primary group — main applications
    {
        label: 'Archive Network',
        type: 'window',
        target: 'archive',
        icon: 'windowExplorerIcon',
        group: 'primary',
    },
    {
        label: 'Programs',
        type: 'window',
        target: 'reference',
        icon: 'showcaseIcon',
        hasSubmenu: true,
        group: 'primary',
    },
    {
        label: 'Documents',
        type: 'window',
        target: 'reference',
        icon: 'showcaseIcon',
        hasSubmenu: true,
        group: 'primary',
    },
    {
        label: 'Settings',
        type: 'window',
        target: 'reference',
        icon: 'computerSmall',
        hasSubmenu: true,
        group: 'primary',
    },
    {
        label: 'Find',
        type: 'window',
        target: 'reference',
        icon: 'windowExplorerIcon',
        hasSubmenu: true,
        group: 'primary',
    },
    // Secondary group — utilities
    {
        label: 'Help',
        type: 'window',
        target: 'reference',
        icon: 'windowGameIcon',
        group: 'secondary',
    },
    {
        label: 'Run...',
        type: 'window',
        target: 'reference',
        icon: 'windowExplorerIcon',
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
