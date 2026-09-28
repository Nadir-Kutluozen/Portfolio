export interface Point {
    x: number;
    y: number;
}

const r = (n: number) => Math.round(n * 1e4) / 1e4;

/**
 * The CSS transform (with transform-origin 0 0) that lays a drawing so its
 * `tail` lands on `from` and its `tip` on `to`: one uniform scale and a turn,
 * never a stretch. `mirror` flips the drawing across its own tail-to-tip
 * line first, so a loop can hang on the other side.
 */
export function arrowTransform(tail: Point, tip: Point, from: Point, to: Point, mirror = false): string {
    // Mirroring negates the drawing's own y, so the ends move with it
    const t = mirror ? { x: tail.x, y: -tail.y } : tail;
    const p = mirror ? { x: tip.x, y: -tip.y } : tip;
    const scale = Math.hypot(to.x - from.x, to.y - from.y) / Math.hypot(p.x - t.x, p.y - t.y);
    const turn = Math.atan2(to.y - from.y, to.x - from.x) - Math.atan2(p.y - t.y, p.x - t.x);
    const a = scale * Math.cos(turn);
    const b = scale * Math.sin(turn);
    // (x, y) -> (a x - b y + e, b x + a y + f) sends the tail to `from`
    const e = from.x - (a * t.x - b * t.y);
    const f = from.y - (b * t.x + a * t.y);
    // the mirror's negated y folds into the y column
    const [c, d] = mirror ? [b, -a] : [-b, a];
    return `matrix(${r(a)}, ${r(b)}, ${r(c)}, ${r(d)}, ${r(e)}, ${r(f)})`;
}
