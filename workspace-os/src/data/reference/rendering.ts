export const renderingCategory = {
    id: 'rendering',
    label: 'Rendering',
    topics: [
        {
            id: 'threejs',
            title: 'Three.js',
            content: 'Three.js is a high-level cross-browser JavaScript library used to create and display animated 3D computer graphics in a web browser using WebGL. It abstracts low-level WebGL buffers, matrices, and shader programs into standard objects like cameras, meshes, and lights. In this project, Three.js renders the immersive cinematic 3D workspace environment, handling baked texture maps and camera animations.',
            keywords: ['threejs', '3d-graphics', 'scene-graph', 'cameras', 'meshes', 'lights'],
        },
        {
            id: 'webgl',
            title: 'WebGL',
            content: 'WebGL is a low-level JavaScript API for rendering high-performance interactive 3D and 2D graphics within any compatible web browser without plugins. It executes custom GLSL vertex and fragment shaders directly on the hardware graphics processing unit. In this project, WebGL powers the outer environment viewport and runs custom screen shaders (CRT curvature and scanline overlay passes) on the monitor mesh.',
            keywords: ['webgl', 'low-level-rendering', 'shaders', 'gpu-execution', 'glsl'],
        },
    ],
};
