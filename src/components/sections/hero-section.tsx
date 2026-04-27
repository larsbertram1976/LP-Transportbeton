import { Button } from "@/components/ui/button";
import { trustAnchors } from "@/data/trust-anchors";

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-b from-brand-cream to-background"
      aria-labelledby="hero-heading"
    >
      <div className="container mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <p className="mb-4 inline-flex items-center rounded-full bg-brand-red/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-red">
              Transportbeton
            </p>
            <h1
              id="hero-heading"
              className="text-balance text-4xl font-extrabold tracking-tight text-brand-ink sm:text-5xl lg:text-6xl"
            >
              Transportbeton aus der Region —{" "}
              <span className="text-brand-red">geliefert von Mölders.</span>
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-lg text-muted-foreground sm:text-xl">
              Frischbeton in geprüfter Qualität für Bauunternehmen, Handwerk und
              Privatkunden. Lieferung mit Fahrmischer oder Selbstabholung an der
              Betontankstelle — zwischen Hamburg, Hannover und Berlin.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-brand-red text-primary-foreground hover:bg-brand-red-dark"
              >
                <a href="#sorten">Betonsorten ansehen</a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a
                  href="https://www.moelders.de"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Standort & Kontakt
                  <span className="sr-only"> (öffnet in neuem Tab)</span>
                </a>
              </Button>
            </div>

            <ul
              className="mt-12 grid gap-5 sm:grid-cols-2"
              aria-label="Vorteile auf einen Blick"
            >
              {trustAnchors.map(({ icon: Icon, title, description }) => (
                <li key={title} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-red/10 text-brand-red"
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-brand-ink">{title}</p>
                    <p className="text-sm text-muted-foreground">{description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5" aria-hidden="true">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Placeholder hero visual until a real photograph is supplied. Uses CSS-only
 * gradients and shapes so it is fully SSR-rendered, has zero JS cost, and no
 * external image dependency.
 */
function HeroVisual() {
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-brand-red via-brand-red-dark to-brand-ink shadow-xl">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.6) 0%, transparent 45%), radial-gradient(circle at 70% 80%, rgba(0,0,0,0.4) 0%, transparent 50%)",
        }}
      />
      <div className="absolute inset-0 flex flex-col justify-end p-8 text-primary-foreground">
        <p className="text-sm font-medium uppercase tracking-[0.3em] opacity-80">
          Beton. Frisch. Regional.
        </p>
        <p className="mt-2 text-3xl font-extrabold leading-tight sm:text-4xl">
          C20/25 bis C30/37
        </p>
        <p className="mt-1 text-sm opacity-90">
          Geprüfte Qualität nach DIN EN 206-1 / DIN 1045-2
        </p>
      </div>
    </div>
  );
}
