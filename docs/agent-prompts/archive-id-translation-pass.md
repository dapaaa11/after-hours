# Archive Indonesian Translation Pass

This document defines the guidelines and constraints for translating the technical knowledge records in the Archive system into Indonesian.

## Scope of Work
- Locate the knowledge base data file at: `workspace-os/src/data/archive/knowledge.ts`.
- Complete or validate the high-fidelity Indonesian translation under each node's `content.id` (the property named `id` inside the `content` object) to match the depth, complexity, and paragraph structure of the corresponding English description (`content.en` / `en` property).
- Ensure all structural separators, including the `DIV` constant, are preserved exactly.

## Critical Safety Constraints
To avoid introducing regression errors in other applications, you must adhere strictly to these constraints:

> [!IMPORTANT]
> 1. **Do NOT touch the Reference Application:** Do not modify any code, content, or styling in the Reference app (`workspace-os/src/components/applications/Reference.tsx` or `workspace-os/src/data/reference/`).
> 2. **Do NOT touch ArchiveBrowser.tsx:** Do not edit the Archive visual component (`workspace-os/src/components/applications/ArchiveBrowser.tsx`).
> 3. **Do NOT modify content.en:** The English content (`en` fields) is final and must not be altered under any circumstances.
> 4. **Isolate edits to knowledge.ts:** The only file that should be modified is `workspace-os/src/data/archive/knowledge.ts`. Only the `id` translation fields inside this file are within scope.

## Verification
- Run `npm run build` in the `workspace-os` directory to ensure all TSX and TS files compile successfully and no type errors are introduced.
- Validate that the Archive app can still be launched and opens correctly.
