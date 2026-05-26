# AFTER-HOURS — Knowledge Content Depth Audit Pass

This is a content-only pass.

Do NOT touch layout.
Do NOT touch styling.
Do NOT touch architecture.
Do NOT modify Start Menu.
Do NOT modify Window System.
Do NOT modify CRT/display layer.
Do NOT modify Desktop integration.
Do NOT modify application registration.
Do NOT modify stack.ts.
Do NOT modify system.ts.
Do NOT add new nodes.
Do NOT rename paths.
Do NOT change ArchiveBrowser.tsx.

## Goal

Audit and deepen the educational content inside the IT Knowledge Archive.

The current archive.sys structure is already correct:
- stack
- system
- knowledge

This pass exists because the project is being judged under an education/information competition category.

The archive must not only look archival.
It must also teach real IT concepts clearly and accurately.

## Scope

Only edit:

- `workspace-os/src/data/archive/knowledge.ts`

Do not edit any other file unless the build fails because of a direct content syntax issue.

## Records to Audit

Audit all FILED knowledge records:

- `knowledge/html`
- `knowledge/css`
- `knowledge/javascript`
- `knowledge/typescript`
- `knowledge/react`
- `knowledge/vue`
- `knowledge/nextjs`
- `knowledge/nodejs`
- `knowledge/nestjs`
- `knowledge/rest-api`
- `knowledge/sql`
- `knowledge/postgresql`
- `knowledge/auth`
- `knowledge/git`
- `knowledge/deployment`

## Audit Rule

For each FILED knowledge node, inspect `content.en`.

If the body is under 200 words, rewrite it to full depth.

If the body is missing any of these sections, rewrite it to full depth:

- FUNCTION
- CORE CONCEPTS
- INTEGRATION CONTEXT
- TRADEOFFS

Every FILED knowledge record must contain all four sections.

## Priority Order

Prioritize likely thin records first:

1. `knowledge/sql`
2. `knowledge/auth`
3. `knowledge/deployment`
4. `knowledge/git`
5. `knowledge/rest-api`
6. `knowledge/html`
7. `knowledge/css`
8. `knowledge/javascript`
9. `knowledge/typescript`
10. `knowledge/react`
11. `knowledge/vue`
12. `knowledge/nextjs`
13. `knowledge/nodejs`
14. `knowledge/nestjs`
15. `knowledge/postgresql`

## Writing Requirements

Content must be educational and useful.

A developer or judge should be able to read each record and understand:
- what the technology is
- why it exists
- what problem it solves
- how it is commonly used
- what tradeoffs it introduces

Write in restrained institutional archive voice.

Do not make it poetic.
Do not make it vague.
Do not make it promotional.
Do not make it a tutorial.

## Required Section Format

Use this exact section structure inside each `content.en` string:

FUNCTION

[Explain what the technology or concept is.]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CORE CONCEPTS

[Explain the important concepts someone should understand.]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

INTEGRATION CONTEXT

[Explain where it is commonly used and how it connects to other systems.]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TRADEOFFS

[Explain limitations, costs, constraints, or reasons to choose/not choose it.]

## Writing Rules

No markdown headings inside content strings.
No bullet points.
No numbered tutorial steps.
No external links.
No marketing language.
No hype.

Avoid words and phrases like:
- powerful
- seamless
- beautiful
- intuitive
- revolutionary
- amazing
- beginner-friendly
- in this tutorial
- you will learn
- let's build
- follow these steps

Use direct technical prose.

Allowed tone examples:
- This record describes...
- This technology handles...
- This layer is responsible for...
- This pattern is used when...
- This introduces a tradeoff...
- This framework organizes...
- This mechanism allows...
- This constraint matters because...

## Reference Technology Rule

Vue and NestJS are knowledge records, not installed stack records.

For `knowledge/vue`, preserve this meaning:
Vue.js is indexed as general IT knowledge. This workstation does not use Vue as its installed interface layer unless detected in the codebase.

For `knowledge/nestjs`, preserve this meaning:
NestJS is indexed as general IT knowledge. This workstation does not use NestJS as its installed backend layer unless detected in the codebase.

Do not describe Vue or NestJS as active AFTER-HOURS project dependencies.

## Installed Field Rule

Do not change `installedInProject` values unless the existing codebase proves the technology is used.

Knowledge records may include technologies that overlap with stack records.
That is acceptable.

Difference:
- `stack/react` describes React inside this project.
- `knowledge/react` explains React generally.

## Bahasa Indonesia

Do not fill `content.id` in this pass unless it already exists and only needs minor correction.

This pass focuses on English content depth first.

## Validation

After editing:

1. Run `npm run build` in `workspace-os`.
2. Fix only compile errors caused by this content edit.
3. Do not perform UI changes.
4. Do not run visual redesign.
5. Report changed files.
6. Report which knowledge records were rewritten.
7. Report whether every FILED knowledge record now has all four required sections.
8. Report whether every FILED knowledge record is at least approximately 200 words.