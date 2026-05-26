export const backendCategory = {
    id: 'backend',
    label: 'Backend',
    topics: [
        {
            id: 'nodejs',
            title: 'Node.js',
            content: {
                en: 'Node.js is an open-source, cross-platform runtime environment that executes JavaScript code on the server side using the V8 engine. It features an event-driven, non-blocking I/O model designed to build scalable network applications. In this project, Node.js serves as the underlying server execution environment and powers the webpack compilation scripts and server assets utility workflows.',
                id: '',
            },
            keywords: ['nodejs', 'javascript-runtime', 'server-side', 'v8-engine', 'web-server'],
        },
        {
            id: 'nestjs',
            title: 'NestJS',
            content: {
                en: 'NestJS is a progressive Node.js framework for building efficient, reliable, and scalable server-side applications. It leverages TypeScript and combines elements of OOP, FP, and Reactive Programming with robust modular architecture. In this project, NestJS architecture concepts guide the strict layer separation of concerns between our passive data providers and shell view layers.',
                id: '',
            },
            keywords: ['nestjs', 'node-framework', 'backend-architecture', 'modules', 'dependency-injection'],
        },
        {
            id: 'rest-apis',
            title: 'REST APIs',
            content: {
                en: 'REST APIs represent architectural interfaces that exchange representations of resources using stateless standard HTTP methods like GET, POST, and DELETE. They rely on standard status codes and structured payloads for cross-context resource modification. In this project, RESTful patterns structure the internal data endpoints and coordinate clean command executions between modular utilities.',
                id: '',
            },
            keywords: ['rest-apis', 'http-methods', 'stateless-protocol', 'endpoints', 'data-exchange'],
        },
        {
            id: 'database',
            title: 'Database',
            content: {
                en: 'Databases represent structured storage engines that organize, persist, and query records securely via relational or document-based indexing. They ensure data consistency, constraint compliance, and transaction atomicity. In this project, structured local data schemas organize reference documents and operator manifests, providing reliable offline workstation registers.',
                id: '',
            },
            keywords: ['database', 'persistence', 'queries', 'indexing', 'data-consistency'],
        },
    ],
};
