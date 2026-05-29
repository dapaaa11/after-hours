import * as THREE from 'three';
import Application from '../Application';

/**
 * DeskDecals — small identity labels on existing desk props.
 * Uses CanvasTexture planes so no new texture/model assets are needed.
 * Positions are in the same world-unit scale as the rest of the scene (900 = 1 unit).
 */
export default class DeskDecals {
    application: Application;
    scene: THREE.Scene;
    group: THREE.Group;

    constructor() {
        this.application = new Application();
        this.scene = this.application.scene;
        this.group = new THREE.Group();

        this.buildDecals();
        this.scene.add(this.group);
    }

    /** Create a canvas texture with white monospace text on transparent background */
    private makeLabel(
        text: string,
        width: number,
        height: number,
        fontSize: number = 28,
        opacity: number = 0.55
    ): THREE.CanvasTexture {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d')!;

        // transparent background
        ctx.clearRect(0, 0, width, height);

        // text — add manual spacing between chars for monospace tracking feel
        const spaced = text.split('').join(' ');
        ctx.globalAlpha = opacity;
        ctx.fillStyle = '#ffffff';
        ctx.font = `${fontSize}px monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(spaced, width / 2, height / 2);

        const texture = new THREE.CanvasTexture(canvas);
        return texture;
    }

    /** Create a decal plane mesh */
    private makePlane(
        texture: THREE.CanvasTexture,
        w: number,
        h: number
    ): THREE.Mesh {
        const geo = new THREE.PlaneGeometry(w, h);
        const mat = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            depthWrite: false,
            side: THREE.DoubleSide,
        });
        return new THREE.Mesh(geo, mat);
    }

    buildDecals() {
        // ─── Monitor casing label: "AH-OS" ───────────────────────────────────
        // Larger canvas + font for readability in medium-wide shot.
        const monitorTex = this.makeLabel('AH-OS', 512, 96, 48, 0.72);
        const monitorPlane = this.makePlane(monitorTex, 340, 68);
        monitorPlane.position.set(0, 670, 1498);
        monitorPlane.rotation.set(0, 0, 0);
        this.group.add(monitorPlane);

        // ─── Binder spine labels ──────────────────────────────────────────────
        // Taller canvas and higher opacity so spines read from desk view.
        const binderLabels = ['SYSTEM', 'REFERENCE', 'DEPLOY'];
        const binderOffsets = [-1380, -1150, -950];

        binderLabels.forEach((label, i) => {
            const tex = this.makeLabel(label, 320, 64, 28, 0.60);
            const plane = this.makePlane(tex, 240, 48);
            plane.position.set(binderOffsets[i], 445, -320);
            plane.rotation.y = -Math.PI / 2;
            this.group.add(plane);
        });

        // ─── Paper / tray label: "BUILD DIARY" ───────────────────────────────
        // Flat paper on the desk surface — faces up (+Y). Bumped for legibility.
        const paperTex = this.makeLabel('BUILD DIARY', 512, 80, 28, 0.52);
        const paperPlane = this.makePlane(paperTex, 400, 60);
        paperPlane.position.set(900, 399, 200);
        paperPlane.rotation.x = -Math.PI / 2;
        this.group.add(paperPlane);
    }
}
