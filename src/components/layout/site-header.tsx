import { primaryNav } from "@/data/navigation";
import { MoeldersLogo } from "./moelders-logo";
import { MobileNav } from "./mobile-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="#top"
          className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          aria-label="Zur Startseite"
        >
          <MoeldersLogo size="md" />
        </a>

        <nav
          className="hidden md:flex items-center gap-8"
          aria-label="Hauptnavigation"
        >
          {primaryNav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-brand-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              {item.label}
              {item.external ? (
                <span className="sr-only"> (öffnet in neuem Tab)</span>
              ) : null}
            </a>
          ))}
        </nav>

        <MobileNav />
      </div>
    </header>
  );
}
