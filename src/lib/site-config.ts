export const siteConfig = {
  name: "Mölders Transportbeton",
  shortName: "Mölders",
  url: "https://transportbeton.moelders.de",
  parentUrl: "https://www.moelders.de",
  region: "zwischen Hamburg, Hannover und Berlin",
  defaultDescription:
    "Transportbeton vom regionalen Spezialisten. Mölders liefert Frischbeton zwischen Hamburg, Hannover und Berlin – für Profi und Privatkunde.",
} as const;

export type SiteConfig = typeof siteConfig;
