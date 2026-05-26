# AFTER-HOURS — Start Menu / Desktop Sync Pass

This is a small navigation consistency pass.

Do NOT touch archive.sys content.
Do NOT touch ArchiveBrowser.tsx.
Do NOT modify the IT Knowledge Archive data.
Do NOT modify CRT/display systems.
Do NOT redesign the window system.
Do NOT redesign desktop visuals.
Do NOT perform broad UI changes.

## Goal

Synchronize the Start Menu with the actual desktop application set and system utilities.

## Start Menu Categories

The Start Menu must clearly separate and support three distinct types of entries:

### 1. Desktop-Synced Applications
These applications are visible as shortcuts on the desktop and must be mirrored directly in the primary section of the Start Menu:
- **Reference** (target: `showcase`, icon: `showcaseIcon`)
- **Henordle** (target: `henordle`, icon: `henordleIcon`)
- **archive.sys** (target: `archive`, icon: `windowExplorerIcon`)

### 2. Secret Start Menu-Only Applications
These applications must appear inside the Start Menu but must **never** be rendered as desktop shortcuts:
- **DOOM** (target: `doom`, icon: `doomIcon`, placed in a secondary hidden/separated category)

### 3. OS System Commands
These utilities represent native operating system functions, not workspace shortcuts. They belong only in the bottom command group of the Start Menu:
- **Shut Down...** (target: `shutdown`, icon: `computerSmall`, group: `terminal`)

---

## Remove Legacy Placeholders

To maintain structural and conceptual clarity, all placeholder entries that are not part of the active workspace must be removed:
- Programs (submenu)
- Documents (submenu)
- Settings (submenu)
- Find (submenu)
- Help (utility)
- Run... (utility)

Do NOT remove `Shut Down...`. It must remain active as the system shutdown commander.

---

## Visual Constraints

Do not redesign the Start Menu, modernized icons, or bevel depths. Keep:
- Existing industrial dark HSL colors and bevel tokens
- 36px compressed item row height and 32px desaturated icons
- Direct snap mouse-over selections (no modern transition glows or fades)
- Etched two-pixel group separators (`BevelGroove` double-line etching)

---

## Validation

After changes:
1. Run `npm run build` in `workspace-os`.
2. Start the required local web server.
3. Use Playwright to capture the Start Menu state:
   - Verify `Reference`, `Henordle`, and `archive.sys` are present in the primary group.
   - Verify `DOOM` is located in the secondary secret group.
   - Verify `Shut Down...` is fully restored in the terminal system command group.
   - Confirm no legacy entries are present.
   - Confirm `DOOM` and `Shut Down...` do not render as desktop shortcuts.

---

## Report

Report:
- Changed files
- Build status
- Restoration of the `Shut Down...` system command
- Verification of Start Menu items