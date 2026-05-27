# AFTER-HOURS — Reference Rollback Pass

This is a targeted rollback pass.

The Archive / archive.sys implementation is correct and must remain untouched.

The Reference app has been modified incorrectly and must be restored to its previous working state.

## Hard Rules

Do NOT modify archive.sys.
Do NOT modify ArchiveBrowser.tsx.
Do NOT modify archive data files.
Do NOT modify `workspace-os/src/data/archive/knowledge.ts`.
Do NOT modify Start Menu.
Do NOT modify Window System.
Do NOT modify CRT/display layer.
Do NOT modify Desktop integration unless Reference launch is broken.
Do NOT perform broad redesigns.
Do NOT re-run the multilingual pass.

## Goal

Restore the Reference app to the state it had before the incorrect Reference multilingual changes.

The Reference app should look and behave like it did previously.

Archive multilingual/content changes, if already correct, must be preserved.

## Scope

Inspect git history and current diff.

Focus only on Reference-related files, likely:

- `workspace-os/src/components/applications/Reference.tsx`
- `workspace-os/src/data/reference/`
- any Reference-specific supporting files

Do not touch unrelated files.

## Required Method

Use git history or git diff to identify what changed in Reference.

Restore only the Reference-related changes from before the incorrect multilingual pass.

Do not revert the whole commit if that would remove correct Archive changes.

Do not use a broad reset.

Do a targeted restore.

## Validation

After restoring Reference:

1. Run `npm run build` in `workspace-os`.
2. Fix only errors caused by this rollback.
3. Use Playwright MCP to open the Reference app.
4. Confirm Reference appears like its previous correct version.
5. Confirm archive.sys still works.
6. Confirm Archive ID/EN behavior remains unchanged if it was already correct.

## Report

Report:
- changed files
- what Reference files were restored
- build result
- Reference validation result
- confirmation that archive.sys was not modified