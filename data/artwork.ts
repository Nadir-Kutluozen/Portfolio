/** My drawings and paintings, as the sketchbook strip shows them (left to right). */
export interface Artwork {
    src: string;
    title: string;
    alt: string;
    width: number;
    height: number;
}

export const ARTWORK: Artwork[] = [
    {
        src: "/about/nadir-drawing.webp",
        title: "At the desk",
        alt: "Nadir drawing a charcoal mountain landscape in a sketchbook",
        width: 826,
        height: 1600,
    },
    {
        src: "/about/lofibaker.webp",
        title: "LoFi Baker",
        alt: "LoFi Baker, a skateboarding illustration seen through a fisheye camera lens",
        width: 3000,
        height: 1961,
    },
    {
        src: "/about/wired-raccoon.webp",
        title: "Wired Raccoon",
        alt: "A raccoon face painted in vivid color splashes",
        width: 2800,
        height: 2100,
    },
    {
        src: "/about/raccoon-street.webp",
        title: "Raccoon Street",
        alt: "A raccoon climbing down a rope past lit apartment windows at sunset",
        width: 2400,
        height: 1503,
    },
    {
        src: "/about/lofi-magnify.webp",
        title: "LoFi Magnify",
        alt: "An astronaut standing in a watercolor galaxy",
        width: 2800,
        height: 1830,
    },
];
