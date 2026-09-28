import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight, Instrument_Serif } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeProvider";
import Navbar from "@/components/navbar/Navbar";
import PageLoader from "@/components/ui/PageLoader";
import Footer from "@/components/ui/Footer";
import CursorLabel from "@/components/ui/CursorLabel";
import GlassCursor from "@/components/ui/GlassCursor";
import GlassScrollbar from "@/components/ui/GlassScrollbar";
import RouteScrollRefresh from "@/components/animation/motion/RouteScrollRefresh";
import { bootScript } from "@/lib/intro";
import { profile } from "@/data/profile";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const interTight = Inter_Tight({ subsets: ["latin"], variable: "--font-inter-tight", display: "swap" });
const instrument = Instrument_Serif({
    subsets: ["latin"],
    weight: "400",
    style: ["normal", "italic"],
    variable: "--font-instrument",
    display: "swap",
});

const description =
    "Engineer, artist and AI researcher in New York. 20+ websites and web apps delivered, a paper at NeurIPS, research at Cold Spring Harbor Laboratory, and CEO of Stew Factory.";

export const metadata: Metadata = {
    metadataBase: new URL(profile.siteUrl),
    title: {
        default: `${profile.name} · Engineer, Artist & AI Researcher`,
        template: `%s · ${profile.name}`,
    },
    description,
    openGraph: {
        title: `${profile.name} · Engineer, Artist & AI Researcher`,
        description,
        siteName: profile.name,
        images: [{ url: "/og.jpg", width: 1200, height: 630, alt: profile.name }],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: `${profile.name} · Engineer, Artist & AI Researcher`,
        description,
        images: ["/og.jpg"],
    },
};

export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#f4f3ef" },
        { media: "(prefers-color-scheme: dark)", color: "#0e0e0e" },
    ],
};

const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: profile.siteUrl,
    jobTitle: "Engineer, AI researcher and CEO of Stew Factory",
    worksFor: { "@type": "Organization", name: "Stew Factory", url: profile.stewUrl },
    address: { "@type": "PostalAddress", addressLocality: "New York", addressRegion: "NY" },
    sameAs: [
        "https://github.com/nadir-kutluozen",
        "https://linkedin.com/in/nadir-kutluozen",
        "https://instagram.com/nadirkutluozen",
    ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html
            lang="en"
            data-theme="light"
            data-scroll-behavior="smooth"
            className={`${inter.variable} ${interTight.variable} ${instrument.variable}`}
            suppressHydrationWarning
        >
            <head>
                {/* Theme + first-visit check before the first paint (no flash) */}
                <script dangerouslySetInnerHTML={{ __html: bootScript }} />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
                />
            </head>
            <body suppressHydrationWarning>
                <ThemeProvider>
                    <a href="#main" className="skip-link">Skip to content</a>
                    <PageLoader />
                    <Navbar />
                    <main id="main">{children}</main>
                    <Footer />
                    <CursorLabel />
                    <GlassCursor />
                    <GlassScrollbar />
                    <RouteScrollRefresh />
                </ThemeProvider>
            </body>
        </html>
    );
}
