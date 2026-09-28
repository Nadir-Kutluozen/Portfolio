import type { NextConfig } from "next";
import { projects } from "./data/projects";

const nextConfig: NextConfig = {
    images: {
        // 85 for the big hero photos and artwork, 75 (the default) for the rest
        qualities: [75, 85],
    },
    // Old project links were /projects?id=3; every project has its own page now
    async redirects() {
        return projects.map((p) => ({
            source: "/projects",
            has: [{ type: "query" as const, key: "id", value: p.id }],
            destination: `/projects/${p.slug}`,
            permanent: true,
        }));
    },
};

export default nextConfig;
