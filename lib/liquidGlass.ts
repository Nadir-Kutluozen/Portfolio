/**
 * Liquid glass, the refraction half. Apple's glass bends what's behind it
 * at the curved rim and splits the colors a little; here that's an SVG
 * displacement map run as a backdrop-filter. Only Chromium can apply an SVG
 * filter to the backdrop today, so other browsers keep the CSS part only
 * (tint, frost, rim light, depth) from .liquid-glass in globals.css.
 */

/** Chrome, Edge, Opera, Brave, Arc (desktop and Android). Not iOS: every iOS browser is WebKit. */
export function canRefract(): boolean {
    if (typeof navigator === "undefined") return false;
    const ua = navigator.userAgent;
    return /Chrome\/\d+/.test(ua) && !/CriOS|EdgiOS|FxiOS/.test(ua);
}

/**
 * A displacement map for a rounded pane of `width` x `height` px.
 * Neutral grey in the middle; along the rim each pixel samples from further
 * in, strongest right at the edge and easing off across `bezel` px, like a
 * thick glass edge that curves away. Red = x shift, green = y shift, 128 = none.
 */
export function lensMap(width: number, height: number, radius: number, bezel: number): string {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return "";

    const hw = width / 2;
    const hh = height / 2;
    const r = Math.min(radius, hw, hh);
    // signed distance to the rounded rectangle: negative inside
    const sdf = (x: number, y: number) => {
        const qx = Math.abs(x - hw) - (hw - r);
        const qy = Math.abs(y - hh) - (hh - r);
        return Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) + Math.min(Math.max(qx, qy), 0) - r;
    };
    return paintLens(ctx, width, height, (x, y) => -sdf(x, y), bezel);
}

/**
 * The same lens for any outline (a cursor, a blob): `shape`, in px of a
 * `width` x `height` box, is sampled `density` times per px, and every point
 * gets its distance to the outline.
 */
export function shapeLensMap(width: number, height: number, shape: Path2D, bezel: number, density = 2): string {
    const w = Math.round(width * density);
    const h = Math.round(height * density);
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return "";

    ctx.scale(density, density);
    const inside = new Uint8Array(w * h);
    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) inside[y * w + x] = ctx.isPointInPath(shape, x + 0.5, y + 0.5) ? 1 : 0;
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    // The outline: pixels with a neighbour on the other side of it
    const edge: number[] = [];
    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            const i = y * w + x;
            const v = inside[i];
            if ((x > 0 && inside[i - 1] !== v) || (x < w - 1 && inside[i + 1] !== v) ||
                (y > 0 && inside[i - w] !== v) || (y < h - 1 && inside[i + w] !== v)) edge.push(x, y);
        }
    }
    // Signed distance to the nearest of them: positive inside
    const depth = new Float32Array(w * h);
    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            let best = Infinity;
            for (let j = 0; j < edge.length; j += 2) best = Math.min(best, (edge[j] - x) ** 2 + (edge[j + 1] - y) ** 2);
            const i = y * w + x;
            depth[i] = inside[i] ? Math.sqrt(best) : -Math.sqrt(best);
        }
    }
    const at = (x: number, y: number) =>
        depth[Math.min(h - 1, Math.max(0, Math.floor(y))) * w + Math.min(w - 1, Math.max(0, Math.floor(x)))];
    return paintLens(ctx, w, h, at, bezel * density);
}

/** Writes the lens from `depthAt`: px in from the rim, negative outside. */
function paintLens(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    depthAt: (x: number, y: number) => number,
    bezel: number,
): string {
    const img = ctx.createImageData(width, height);
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const px = x + 0.5;
            const py = y + 0.5;
            const depth = depthAt(px, py);
            let dx = 0;
            let dy = 0;
            if (depth >= 0 && depth < bezel) {
                // inward normal = gradient of the depth field
                const gx = depthAt(px + 1, py) - depthAt(px - 1, py);
                const gy = depthAt(px, py + 1) - depthAt(px, py - 1);
                const len = Math.hypot(gx, gy) || 1;
                const k = 1 - depth / bezel; // 1 at the rim, 0 where the flat middle starts
                const m = k * k; // eases in, so the bend is concentrated at the very edge
                dx = (gx / len) * m;
                dy = (gy / len) * m;
            }
            const i = (y * width + x) * 4;
            img.data[i] = Math.round(128 + dx * 127);
            img.data[i + 1] = Math.round(128 + dy * 127);
            img.data[i + 2] = 128;
            img.data[i + 3] = 255;
        }
    }
    ctx.putImageData(img, 0, 0);
    return ctx.canvas.toDataURL("image/png");
}
