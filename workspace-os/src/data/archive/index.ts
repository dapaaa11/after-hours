import { ArchiveNode } from './types';
import { stackNodes } from './stack';
import { systemNodes } from './system';
import { knowledgeNodes } from './knowledge';

export * from './types';

// Gateway index node — not rendered as a category entry; used as default selection
export const indexNode: ArchiveNode = {
    path: "after-hours://index",
    title: "Internal Archive Network",
    category: "system",
    status: "FILED",
    version: "1.1.0",
    filed: "2026-05-26",
    role: "Archival gatekeeper and retrieval terminal entrypoint.",
    dependencies: [],
    tags: ["gateway", "index", "system"],
    content: {
        en: "AFTER-HOURS Internal Archive Network — archive.sys v1.1.0\n\nThis system provides access to three record categories:\n\n— STACK: Technologies actively installed and running in this workstation environment.\n— SYSTEM: Internal workstation systems, design grammar records, display layer configuration, and project logs.\n— KNOWLEDGE: General IT education records. These are reference materials and do not indicate installed or active usage in this workstation.\n\nAll records are stored locally. No network requests are made. Language toggle switches content between English and Indonesian. Search queries are filtered synchronously against the local index.\n\nUse the index tree on the left panel to browse or enter terms to filter records.",
        id: "Jaringan Arsip Internal AFTER-HOURS — archive.sys v1.1.0\n\nSistem ini menyediakan akses ke tiga kategori catatan:\n\n— STACK: Teknologi yang aktif diinstal dan berjalan di lingkungan workstation ini.\n— SYSTEM: Sistem workstation internal, catatan tata bahasa desain, konfigurasi lapisan tampilan, dan log proyek.\n— KNOWLEDGE: Catatan edukasi IT umum. Ini adalah materi referensi dan tidak menunjukkan penggunaan aktif di workstation ini.\n\nSemua catatan disimpan secara lokal. Tidak ada permintaan jaringan yang dibuat. Toggle bahasa mengalihkan konten antara Bahasa Inggris dan Indonesia."
    },
    related: [
        "after-hours://stack/react",
        "after-hours://system/window-shell",
        "after-hours://system/crt-display",
        "after-hours://system/grammar-design-rules",
        "after-hours://system/log-current",
        "after-hours://knowledge/html"
    ]
};

export const archiveList: ArchiveNode[] = [
    indexNode,
    ...stackNodes,
    ...systemNodes,
    ...knowledgeNodes,
];

export const archiveNodes: Record<string, ArchiveNode> = archiveList.reduce(
    (acc, node) => {
        acc[node.path] = node;
        return acc;
    },
    {} as Record<string, ArchiveNode>
);
