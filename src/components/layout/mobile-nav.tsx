"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { primaryNav } from "@/data/navigation";
import { MoeldersLogo } from "./moelders-logo";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Menü öffnen"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-72 sm:w-80">
        <SheetHeader>
          <SheetTitle className="text-left">
            <MoeldersLogo size="sm" />
          </SheetTitle>
        </SheetHeader>
        <nav className="mt-8 flex flex-col gap-1">
          {primaryNav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-3 text-base font-medium text-foreground hover:bg-accent hover:text-brand-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors"
            >
              {item.label}
              {item.external ? (
                <span className="sr-only"> (öffnet in neuem Tab)</span>
              ) : null}
            </a>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
