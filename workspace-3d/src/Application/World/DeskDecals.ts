import * as THREE from 'three';
import Application from '../Application';

/**
 * DeskDecals — nostalgic identity labels on existing desk props.
 *
 * Design intent: late-90s computer lab / local knowledge terminal.
 * Labels are printed-label/sticker in feel — warm cream off-white, not
 * pure glowing white. All planes are transparent with depthWrite:false
 * so they layer cleanly over baked geometry.
 *
 * World unit scale matches the scene (900 = 1 metre approximately).
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

    /**
     * Render text onto a canvas and return a CanvasTexture.
     * @param color  CSS color string — defaults to aged-cream '#d4c8a8'
     *               for a printed-label / old-sticker feel.
     */
    private makeLabel(
        text: string,
        width: number,
        height: number,
        fontSize: number = 28,
        opacity: number = 0.58,
        color: string = '#d4c8a8'
    ): THREE.CanvasTexture {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d')!;

        ctx.clearRect(0, 0, width, height);

        // Character-spaced text for that monospace terminal feel
        const spaced = text.split('').join(' ');
        ctx.globalAlpha = opacity;
        ctx.fillStyle = color;
        ctx.font = `${fontSize}px monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(spaced, width / 2, height / 2);

        return new THREE.CanvasTexture(canvas);
    }

    private makePlane(texture: THREE.CanvasTexture, w: number, h: number): THREE.Mesh {
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

        // ═══════════════════════════════════════════════════════════════════════
        // MONITOR CASING — front bezel labels
        // ═══════════════════════════════════════════════════════════════════════

        // Primary sticker: AH-OS — slightly cooler white, like a system sticker
        const monitorMainTex = this.makeLabel('AH-OS', 512, 96, 46, 0.70, '#dde0e0');
        const monitorMain = this.makePlane(monitorMainTex, 320, 60);
        monitorMain.position.set(0, 672, 1500);
        this.group.add(monitorMain);

        // Secondary label: knowledge.sys — smaller, warm cream, printed feel
        const monitorSubTex = this.makeLabel('knowledge.sys', 512, 64, 22, 0.45, '#c8bfa8');
        const monitorSub = this.makePlane(monitorSubTex, 300, 38);
        monitorSub.position.set(0, 640, 1500);
        this.group.add(monitorSub);

        // ═══════════════════════════════════════════════════════════════════════
        // BINDER SPINES — right side of desk
        // Both +X facing (visible from idle left-angle) and +Z facing
        // (visible from straight-on desk view) via DoubleSide + two plane sets.
        // ═══════════════════════════════════════════════════════════════════════

        const binderData: { label: string; x: number }[] = [
            { label: 'SYSTEM LOG',    x: -1390 },
            { label: 'REF MANUAL',    x: -1155 },
            { label: 'DEPLOY NOTES',  x:  -945 },
        ];

        binderData.forEach(({ label, x }) => {
            // Spine face toward +Z (desk-camera-facing)
            const texZ = this.makeLabel(label, 384, 64, 24, 0.62, '#c8bfa8');
            const planeZ = this.makePlane(texZ, 270, 46);
            planeZ.position.set(x, 455, -310);
            // No Y rotation — faces +Z by default
            this.group.add(planeZ);

            // Spine face toward -X (idle left-angle)
            const texX = this.makeLabel(label, 384, 64, 24, 0.55, '#c8bfa8');
            const planeX = this.makePlane(texX, 270, 46);
            planeX.position.set(x - 18, 455, -310);
            planeX.rotation.y = Math.PI / 2;
            this.group.add(planeX);
        });

        // ═══════════════════════════════════════════════════════════════════════
        // PAPER TRAY — top surface label (the beige tray box, upper-left)
        // ═══════════════════════════════════════════════════════════════════════

        const trayTex = this.makeLabel('BUILD DIARY', 512, 72, 24, 0.50, '#c0b090');
        const trayPlane = this.makePlane(trayTex, 360, 52);
        trayPlane.position.set(-1050, 560, 80);   // top of tray
        trayPlane.rotation.x = -Math.PI / 2;
        this.group.add(trayPlane);

        // ═══════════════════════════════════════════════════════════════════════
        // PAPER STACK — top page label (the white paper stack, left desk area)
        // ═══════════════════════════════════════════════════════════════════════

        const stackTex = this.makeLabel('KNOWLEDGE INDEX', 640, 72, 22, 0.45, '#b8ac90');
        const stackPlane = this.makePlane(stackTex, 420, 48);
        stackPlane.position.set(-280, 430, 200);   // top of paper stack
        stackPlane.rotation.x = -Math.PI / 2;
        this.group.add(stackPlane);

        // ═══════════════════════════════════════════════════════════════════════
        // LOOSE PAPER — flat sheet, lower-left foreground
        // ═══════════════════════════════════════════════════════════════════════

        // Main line
        const looseTex = this.makeLabel('OPERATOR CHECKLIST', 640, 64, 20, 0.42, '#b0a888');
        const loosePlane = this.makePlane(looseTex, 430, 44);
        loosePlane.position.set(-850, 402, 480);
        loosePlane.rotation.x = -Math.PI / 2;
        this.group.add(loosePlane);

        // Sub-line (node identifier below)
        const looseSubTex = this.makeLabel('LOCAL NODE / AH-01', 512, 48, 16, 0.32, '#a09878');
        const looseSubPlane = this.makePlane(looseSubTex, 340, 32);
        looseSubPlane.position.set(-850, 402, 530);
        looseSubPlane.rotation.x = -Math.PI / 2;
        this.group.add(looseSubPlane);

        // ═══════════════════════════════════════════════════════════════════════
        // CPU / TOWER — front panel small label (below floppy drive)
        // ═══════════════════════════════════════════════════════════════════════

        const cpuTex = this.makeLabel('LOCAL MODE', 384, 56, 18, 0.40, '#c0bdb0');
        const cpuPlane = this.makePlane(cpuTex, 240, 35);
        cpuPlane.position.set(0, 540, 1500);
        this.group.add(cpuPlane);
    }
}

