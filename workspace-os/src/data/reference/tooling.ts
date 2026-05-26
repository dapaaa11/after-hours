export const toolingCategory = {
    id: 'tooling',
    label: 'Tooling',
    topics: [
        {
            id: 'git',
            title: 'Git',
            content: {
                en: 'Git is a distributed version control system designed to handle everything from small to very large projects with speed and efficiency. It tracks source code changes across branches and coordinates work among distributed developers. In this project, Git provides version control infrastructure, version tracking, and workspace boundary security for code commits.',
                id: '',
            },
            keywords: ['git', 'version-control', 'branching', 'commits', 'history'],
        },
        {
            id: 'package-management',
            title: 'Package Management',
            content: {
                en: 'Package Management utilities like NPM or PNPM automate the installation, configuration, and upgrading of external software dependencies. They resolve nested dependency trees and lock package versions to guarantee build reproducibility across environments. In this project, package managers resolve the runtime dependencies of both the 3D scene engine and the React OS shell.',
                id: '',
            },
            keywords: ['package-management', 'dependencies', 'npm', 'pnpm', 'lockfile'],
        },
    ],
};
