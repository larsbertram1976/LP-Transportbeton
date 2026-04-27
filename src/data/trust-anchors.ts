import type { LucideIcon } from "lucide-react";
import { MapPin, Truck, Users, Award } from "lucide-react";

export type TrustAnchor = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const trustAnchors: TrustAnchor[] = [
  {
    icon: MapPin,
    title: "Regional verwurzelt",
    description: "Standorte zwischen Hamburg, Hannover und Berlin.",
  },
  {
    icon: Truck,
    title: "Frisch geliefert",
    description: "Lieferung mit Fahrmischer oder Selbstabholung an der Betontankstelle.",
  },
  {
    icon: Users,
    title: "Profi & Privat",
    description: "Beratung für Bauunternehmen, Handwerker und Heimwerker.",
  },
  {
    icon: Award,
    title: "Familienunternehmen",
    description: "Persönlicher Service mit langjähriger Erfahrung.",
  },
];
