export const backendCategory = {
    id: 'backend',
    label: 'Backend',
    labelId: 'Backend',
    topics: [
        {
            id: 'nodejs',
            title: 'Node.js',
            titleId: 'Node.js',
            content: 'Node.js is an open-source, cross-platform runtime environment that executes JavaScript code on the server side using the V8 engine. It features an event-driven, non-blocking I/O model designed to build scalable network applications. In this project, Node.js serves as the underlying server execution environment and powers the webpack compilation scripts and server assets utility workflows.',
            contentId: 'Node.js adalah environment runtime open-source dan cross-platform yang mengeksekusi kode JavaScript di sisi server menggunakan engine V8. Node.js memiliki model I/O yang event-driven dan non-blocking yang didesain untuk membangun aplikasi jaringan yang terukur. Di proyek ini, Node.js berfungsi sebagai environment eksekusi server yang mendasari skrip kompilasi webpack dan alur kerja utilitas aset server.',
            keywords: ['nodejs', 'javascript-runtime', 'server-side', 'v8-engine', 'web-server'],
        },
        {
            id: 'nestjs',
            title: 'NestJS',
            titleId: 'NestJS',
            content: 'NestJS is a progressive Node.js framework for building efficient, reliable, and scalable server-side applications. It leverages TypeScript and combines elements of OOP, FP, and Reactive Programming with robust modular architecture. In this project, NestJS architecture concepts guide the strict layer separation of concerns between our passive data providers and shell view layers.',
            contentId: 'NestJS adalah framework Node.js progresif untuk membangun aplikasi server-side yang efisien, andal, dan terukur. Framework ini memanfaatkan TypeScript dan menggabungkan elemen dari OOP, FP, dan Reactive Programming dengan arsitektur modular yang solid. Di proyek ini, konsep arsitektur NestJS memandu pemisahan tanggung jawab (separation of concerns) yang ketat antara provider data pasif dan lapisan view shell kita.',
            keywords: ['nestjs', 'node-framework', 'backend-architecture', 'modules', 'dependency-injection'],
        },
        {
            id: 'rest-apis',
            title: 'REST APIs',
            titleId: 'REST API',
            content: 'REST APIs represent architectural interfaces that exchange representations of resources using stateless standard HTTP methods like GET, POST, and DELETE. They rely on standard status codes and structured payloads for cross-context resource modification. In this project, RESTful patterns structure the internal data endpoints and coordinate clean command executions between modular utilities.',
            contentId: 'REST API merupakan antarmuka arsitektural yang menukar representasi resource menggunakan metode standar HTTP yang stateless seperti GET, POST, dan DELETE. API ini bergantung pada kode status standar dan payload terstruktur untuk modifikasi resource lintas konteks. Di proyek ini, pola RESTful menstrukturkan endpoint data internal dan mengoordinasikan eksekusi perintah yang bersih antar utilitas modular.',
            keywords: ['rest-apis', 'http-methods', 'stateless-protocol', 'endpoints', 'data-exchange'],
        },
        {
            id: 'database',
            title: 'Database',
            titleId: 'Database',
            content: 'Databases represent structured storage engines that organize, persist, and query records securely via relational or document-based indexing. They ensure data consistency, constraint compliance, and transaction atomicity. In this project, structured local data schemas organize reference documents and operator manifests, providing reliable offline workstation registers.',
            contentId: 'Database merupakan mesin penyimpanan terstruktur yang mengatur, menyimpan secara persisten, dan me-query record dengan aman melalui pengindeksan relasional atau berbasis dokumen. Sistem ini memastikan konsistensi data, kepatuhan constraint, dan atomicity transaksi. Di proyek ini, skema data lokal terstruktur mengatur dokumen referensi dan manifes operator, memberikan register workstation offline yang andal.',
            keywords: ['database', 'persistence', 'queries', 'indexing', 'data-consistency'],
        },
    ],
};
