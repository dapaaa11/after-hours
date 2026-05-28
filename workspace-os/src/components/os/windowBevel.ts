/* ─────────────────────────────────────────────
   AFTER-HOURS Bevel Constants
   Dark atmospheric palette — warm charcoal surface
   with restrained bevel contrast (~15-20% luminance)
   for dusty-industrial Z-depth.
   ───────────────────────────────────────────── */
export const BEVEL = {
    // Outer bevel — physical boundary (classic windows inset/outset)
    outerLight: '#dfdfdf',
    outerDark: '#000000',
    // Inner bevel — surface edge
    innerLight: '#ffffff',
    innerDark: '#808080',
    // Spine tonal value (Inactive titlebar)
    spineColor: '#808080',
    // Surface — classic Windows gray
    surface: '#c0c0c0',
    // Selection — classic navy (Active titlebar)
    selectBg: '#0a246a',
    selectFg: '#ffffff',
    // Default text — black on light gray
    textDefault: '#000000',
    inactiveText: '#dfdfdf',
};
