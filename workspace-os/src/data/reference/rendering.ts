export const renderingCategory = {
    id: 'rendering',
    label: 'Rendering',
    labelId: 'Rendering',
    topics: [
        {
            id: 'threejs',
            title: 'Three.js',
            titleId: 'Three.js',
            content: 'Three.js is a high-level cross-browser JavaScript library used to create and display animated 3D computer graphics in a web browser using WebGL. It abstracts low-level WebGL buffers, matrices, and shader programs into standard objects like cameras, meshes, and lights. In this project, Three.js renders the immersive cinematic 3D workspace environment, handling baked texture maps and camera animations.',
            contentId: 'Three.js adalah library JavaScript tingkat tinggi yang cross-browser, digunakan untuk membuat dan menampilkan grafik komputer 3D animasi di web browser menggunakan WebGL. Library ini mengabstraksi buffer WebGL tingkat rendah, matriks, dan program shader menjadi objek standar seperti kamera, mesh, dan cahaya. Di proyek ini, Three.js me-render environment workspace 3D sinematik yang imersif, menangani baked texture map dan animasi kamera.',
            keywords: ['threejs', '3d-graphics', 'scene-graph', 'cameras', 'meshes', 'lights'],
        },
        {
            id: 'webgl',
            title: 'WebGL',
            titleId: 'WebGL',
            content: 'WebGL is a low-level JavaScript API for rendering high-performance interactive 3D and 2D graphics within any compatible web browser without plugins. It executes custom GLSL vertex and fragment shaders directly on the hardware graphics processing unit. In this project, WebGL powers the outer environment viewport and runs custom screen shaders (CRT curvature and scanline overlay passes) on the monitor mesh.',
            contentId: 'WebGL adalah API JavaScript tingkat rendah untuk me-render grafik 3D dan 2D interaktif berkinerja tinggi dalam web browser yang kompatibel tanpa plugin. API ini mengeksekusi vertex GLSL khusus dan fragment shader langsung pada unit pemrosesan grafik (GPU) perangkat keras. Di proyek ini, WebGL menjalankan viewport environment luar dan menjalankan screen shader khusus (kelengkungan CRT dan pass overlay scanline) pada mesh monitor.',
            keywords: ['webgl', 'low-level-rendering', 'shaders', 'gpu-execution', 'glsl'],
        },
    ],
};
