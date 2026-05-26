/* ─────────────────────────────────────────────
   AFTER-HOURS Bevel Constants
   Dark atmospheric palette — warm charcoal surface
   with restrained bevel contrast (~15-20% luminance)
   for dusty-industrial Z-depth.
   ───────────────────────────────────────────── */
export const BEVEL = {
    // Outer bevel — physical boundary (subdued ridges)
    outerLight: '#484b4d',
    outerDark: '#0a0b0b',
    // Inner bevel — surface edge (barely-there luminance)
    innerLight: '#3a3d3f',
    innerDark: '#151718',
    // Spine tonal value — deepest element, structural back (Inactive titlebar)
    spineColor: '#111314',
    // Surface — warm charcoal (not cool gray)
    surface: '#2a2d2e',
    // Selection — atmospheric teal (Active titlebar)
    selectBg: '#1a3a3d',
    selectFg: '#d0d4d6',
    // Default text — warm muted gray
    textDefault: '#a0a4a6',
    inactiveText: '#424a4a', // Matched to Start Menu spine readability
};
