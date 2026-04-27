export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

/**
 * Header navigation. In-page anchors (#sorten, #service) point to sections that
 * are activated by later features (PROJ-2 etc.). Until those land, the anchors
 * resolve to nothing and the browser stays put — non-blocking.
 */
export const primaryNav: NavItem[] = [
  { label: "Sorten", href: "#sorten" },
  { label: "Service", href: "#service" },
  { label: "Standorte", href: "https://www.moelders.de", external: true },
];
