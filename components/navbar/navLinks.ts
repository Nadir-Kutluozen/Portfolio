export interface NavLink {
    label: string;
    href: string;
}

export const NAV_LINKS: NavLink[] = [
    { label: "Work", href: "/projects" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
];

/** /projects stays active on /projects/some-project too */
export function isActive(pathname: string, href: string): boolean {
    return pathname === href || pathname.startsWith(`${href}/`);
}
