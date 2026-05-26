
---

# 2. `docs/agent-prompts/archive-visual-validation.md`

```md
# AFTER-HOURS — Archive Visual Validation Pass

This is a validation pass only.

Do NOT redesign.
Do NOT refactor.
Do NOT add new features.
Do NOT expand archive content.
Do NOT modify Start Menu, Window System, CRT, Desktop, or 3D environment.
Do NOT change code unless something is visibly broken or prevents validation.

The current target is to validate the Internet Explorer / archive.sys IT Knowledge Archive after implementation.

## Required Setup

Start the required development servers for:

1. workspace-os
2. workspace-3d, if needed for full CRT/display validation

Use Playwright MCP for rendered inspection.
Do not rely only on code reasoning.

## Screenshots to Capture

Capture these screenshots:

1. Desktop before opening archive.sys.
2. Start Menu with archive.sys / Internet Explorer / Reference entry visible.
3. archive.sys opened at `after-hours://index`.
4. A stack node page.
5. A system node page.
6. `after-hours://knowledge/vue`.
7. `after-hours://knowledge/nestjs`.
8. `after-hours://knowledge/auth` or `after-hours://knowledge/rest-api`.
9. A stub node if present.
10. Full screen with CRT/display layer active.

## Launch + Integration Checklist

Check:

- Window opens from Start Menu entry.
- Window opens from the existing application registry if applicable.
- Window title reads `archive.sys` or the approved system label.
- Default path on open is `after-hours://index`.
- Index node renders on open.
- The feature feels integrated into the existing workstation, not newly pasted on.

## Layout Checklist

Check:

- Three zones are visible: index panel, document panel, status bar.
- Header bar is compact.
- Index panel is narrower than document panel.
- Index panel is darker or more compressed than document panel.
- Status bar is the darkest/quietest surface zone.
- No URL bar exists.
- No tab bar exists.
- No back/forward buttons exist.
- No browser chrome appears.

## Index Panel Checklist

Check:

- Search input appears at top.
- Search input has no modern rounded style.
- Categories are clearly visible.
- Top-level categories include STACK, SYSTEM, KNOWLEDGE.
- Category rows feel compressed and institutional.
- Active category uses a restrained left accent.
- Active topic uses the same accent logic.
- Search filters records synchronously.
- Filtering `vue` shows the Vue knowledge record.
- Filtering `next` shows relevant Next/Next.js records.
- Clearing search restores full index.

## Document Panel Checklist

Check:

- Page header renders path, title, status, version, filed, and category.
- Metadata block renders role, language/environment where applicable, dependencies, and tags.
- Knowledge nodes show INSTALLED IN THIS PROJECT: YES/NO.
- Stack nodes do not show installedInProject field.
- Body content is readable.
- Body content uses section dividers.
- Related nodes are visible and clickable.
- Related node click updates active document.
- Status bar path updates after related node click.
- No full page reload occurs.

## Knowledge Node Checklist

Test with:

- `after-hours://knowledge/vue`
- `after-hours://knowledge/nestjs`
- `after-hours://knowledge/auth` or `after-hours://knowledge/rest-api`

Check:

- Content is educational and understandable.
- Content is not too poetic.
- Content does not read like marketing copy.
- Content does not read like a generic blog tutorial.
- Vue and NestJS are not described as installed project stack unless detected in codebase.
- The distinction between reference knowledge and installed project stack is clear.

## Stub Node Checklist

If stub nodes exist, test one.

Check:

- Page header renders normally.
- Metadata block renders normally.
- Body renders exactly or equivalently:
  `This record has not been filed. Path is indexed.`
- No 404 styling.
- No error-state feeling.
- Stub feels diegetic and intentional.

## Language Toggle Checklist

Check:

- EN/ID toggle is visible.
- EN is default if English is the populated language.
- Active state is underline only.
- No pill, badge, or modern toggle styling.
- If ID content is empty, clicking ID renders:
  `Terjemahan belum tersedia.`
- Clicking EN restores English content.

## Atmosphere Checklist

Mark PASS / FAIL:

- System reads as internal archive, not web browser.
- Index panel reads as institutional index, not modern nav menu.
- Document panel reads as retrieved record, not web page.
- Page header feels like filed document metadata.
- Knowledge records feel educational but not tutorial-like.
- Stack records feel operational and project-specific.
- Stub nodes feel indexed but unfiled, not broken.
- No element reads as modern SaaS.
- No element reads as Notion.
- No element reads as Chrome.
- No element reads as retro parody.
- No element reads as vaporwave.
- Overall register: operational, archival, institutional, quiet.
- A judge unfamiliar with the project can navigate and learn from it.
- Educational content is accurate and useful.
- CRT/display layer supports readability instead of consuming it.

## Report Format

Report:

1. Development server status.
2. Screenshot list.
3. Build status if checked.
4. Launch/integration result.
5. Visual validation result.
6. Educational clarity result.
7. Atmosphere pass/fail.
8. Specific issues found.
9. Suggested next fixes.

Do not implement suggested fixes unless explicitly asked.