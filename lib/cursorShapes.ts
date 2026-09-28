/**
 * The glass cursor's drawings. Each outline is in px of its own `width` x
 * `height` box; `hot` is the point that sits on the pointer, and `detail`
 * is inner lines drawn over the glass.
 */
export interface CursorShape {
    d: string;
    width: number;
    height: number;
    hot: { x: number; y: number };
    detail?: string;
}

/** My Mouse drawing (made in Stew Factory). The tip is the hotspot. */
export const ARROW: CursorShape = {
    d:
        "M 1.94 28.94 L 11.32 3.66 C 12.27 1.11 15.88 1.12 16.81 3.67 L 26.07 29.02 C 27.03 31.67 23.97 33.97 21.70 32.30 " +
        "L 15.81 27.97 C 14.78 27.21 13.39 27.21 12.36 27.95 L 6.36 32.30 C 4.04 33.97 0.94 31.63 1.94 28.94 Z",
    width: 28,
    height: 35,
    hot: { x: 14.07, y: 1.75 },
};

// The hands are built from rounded pieces (palm, fingers, thumb, knuckles)
// that all wind the same way, so the nonzero fill rule merges them into one
// silhouette. Keep that true when editing: a reversed piece cuts a hole.
// The palm is the hotspot.

/** A cartoon hand, open, fingers fanned */
export const OPEN_HAND: CursorShape = {
    d:
        "M 20.5 15 L 16.5 15 A 7 7 0 0 0 9.5 22 L 9.5 24.5 A 7 7 0 0 0 16.5 31.5 L 20.5 31.5 A 7 7 0 0 0 27.5 24.5 L 27.5 22 A 7 7 0 0 0 20.5 15 Z " +
        "M 14.99 16.46 L 12.69 5.86 A 2.55 2.55 0 0 0 7.71 6.94 L 10.01 17.54 A 2.55 2.55 0 0 0 14.99 16.46 Z " +
        "M 19.65 15.91 L 19.25 4.11 A 2.65 2.65 0 0 0 13.95 4.29 L 14.35 16.09 A 2.65 2.65 0 0 0 19.65 15.91 Z " +
        "M 23.92 16.38 L 25.52 5.78 A 2.55 2.55 0 0 0 20.48 5.02 L 18.88 15.62 A 2.55 2.55 0 0 0 23.92 16.38 Z " +
        "M 27.45 18.82 L 30.35 11.22 A 2.3 2.3 0 0 0 26.05 9.58 L 23.15 17.18 A 2.3 2.3 0 0 0 27.45 18.82 Z " +
        "M 13.84 22.53 L 6.44 15.63 A 2.7 2.7 0 0 0 2.76 19.57 L 10.16 26.47 A 2.7 2.7 0 0 0 13.84 22.53 Z",
    width: 36,
    height: 36,
    hot: { x: 18.5, y: 23 },
};

/** The same hand holding on: knuckles on top, thumb across the front */
export const FIST: CursorShape = {
    d:
        "M 21 14.5 L 15 14.5 A 6.5 6.5 0 0 0 8.5 21 L 8.5 24 A 6.5 6.5 0 0 0 15 30.5 L 21 30.5 A 6.5 6.5 0 0 0 27.5 24 L 27.5 21 A 6.5 6.5 0 0 0 21 14.5 Z " +
        "M 15.1 15.2 A 3.1 3.1 0 1 0 8.9 15.2 A 3.1 3.1 0 1 0 15.1 15.2 Z " +
        "M 19.8 14 A 3.2 3.2 0 1 0 13.4 14 A 3.2 3.2 0 1 0 19.8 14 Z " +
        "M 24.4 14 A 3.2 3.2 0 1 0 18 14 A 3.2 3.2 0 1 0 24.4 14 Z " +
        "M 28.3 15.4 A 2.9 2.9 0 1 0 22.5 15.4 A 2.9 2.9 0 1 0 28.3 15.4 Z",
    width: 36,
    height: 36,
    hot: { x: 18.5, y: 23 },
    detail:
        "M 14.3 15.8 L 14.3 18.6 M 18.9 15.2 L 18.9 18.4 M 23.3 15.8 L 23.3 18.6 " +
        "M 10.92 24.78 L 19.92 23.58 A 2.4 2.4 0 0 0 19.28 18.82 L 10.28 20.02 A 2.4 2.4 0 0 0 10.92 24.78 Z",
};
