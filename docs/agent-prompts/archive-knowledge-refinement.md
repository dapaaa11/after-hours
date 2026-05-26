# AFTER-HOURS — Archive Knowledge Refinement Pass

Continue from the current implemented Archive Network state.

Important:
Do NOT restart the implementation.
Do NOT scaffold a new project.
Do NOT recreate ArchiveBrowser from scratch unless absolutely necessary.
Do NOT redesign Start Menu, Window System, CRT, Desktop, or 3D environment.
Do NOT overwrite working integration.

This is a continuation/refinement pass.

The current archive.sys implementation already exists and is integrated.
Your task is to revise and extend it into the AFTER-HOURS IT Knowledge Archive for the education/information competition category.

## Core Goal

The Internet Explorer / archive.sys must become three things at once:

1. A world-building element.
2. A project/system documentation surface.
3. A genuine IT knowledge reference.

This feature must support the education/information competition category clearly.

The archive must remain:
- archival
- operational
- institutional
- quiet
- dense but readable
- system-authored
- atmosphere-safe
- consistent with AFTER-HOURS as a remembered operating environment

It must NOT become:
- Chrome
- a normal browser
- a modern documentation website
- Notion
- SaaS dashboard
- blog
- tutorial website
- generic encyclopedia
- retro parody
- vaporwave UI

## Revised Archive Structure

Refactor or adjust the current archive data so the top-level categories are cleanly separated into:

### 1. stack

Technologies actually installed or used in this AFTER-HOURS project.

Stack records describe how the technology runs in this environment.

Do not invent installed stack.
Inspect the actual project files before confirming a stack record.

### 2. system

Internal AFTER-HOURS systems.

System records describe Start Menu, Desktop, Window Shell, Archive System, CRT/display, and other internal workstation systems.

### 3. knowledge

General IT educational records.

Knowledge records are not necessarily used by this project.
They exist for education/information purposes.

Vue and NestJS must be under knowledge unless the codebase actually uses them.
Do not place Vue or NestJS under installed stack unless detected in the project.

## Data Model

If the current ArchiveNode type does not already support these fields, update it carefully.

```ts
type ArchiveStatus = "FILED" | "PARTIAL" | "NOT YET FILED";

type ArchiveNode = {
  path: string;
  title: string;
  category: "stack" | "system" | "knowledge";
  status: ArchiveStatus;
  version: string;
  filed: string;
  role: string;
  language?: string;
  environment?: string;
  installedInProject?: boolean;
  dependencies: string[];
  tags: string[];
  content: {
    en: string;
    id: string;
  };
  related: string[];
};