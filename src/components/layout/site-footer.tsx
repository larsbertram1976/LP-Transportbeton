import { footerLinks } from "@/data/footer-links";
import { siteConfig } from "@/lib/site-config";
import { MoeldersLogo } from "./moelders-logo";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-border bg-brand-cream">
      <div className="container mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md space-y-3">
            <MoeldersLogo size="sm" />
            <p className="text-sm text-muted-foreground">
              Transportbeton vom regionalen Spezialisten – {siteConfig.region}.
            </p>
          </div>

          <nav aria-label="Footer-Navigation">
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-2">
              {footerLinks.map((link) => (
                <li key={link.href + link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-foreground/80 transition-colors hover:text-brand-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                  >
                    {link.label}
                    <span className="sr-only"> (öffnet in neuem Tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 border-t border-border/60 pt-6 text-xs text-muted-foreground">
          © {year} Mölders Holding. Alle Rechte vorbehalten.
        </div>
      </div>
    </footer>
  );
}
