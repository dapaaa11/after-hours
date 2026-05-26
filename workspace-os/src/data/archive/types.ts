export type ArchiveStatus = "FILED" | "PARTIAL" | "NOT YET FILED";

// Kept for internal use in system/display/grammar/logs sub-records
export type ArchiveKind =
    | "INSTALLED_STACK"
    | "SYSTEM_RECORD"
    | "DISPLAY_RECORD"
    | "GRAMMAR_RECORD"
    | "PROJECT_LOG"
    | "KNOWLEDGE";

export interface ArchiveNode {
    path: string;
    title: string;
    category: "stack" | "system" | "knowledge";
    kind?: ArchiveKind;
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
}
