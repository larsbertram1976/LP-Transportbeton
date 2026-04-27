import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Transportbeton von Mölders | Beton aus der Region",
    template: "%s | Mölders Transportbeton",
  },
  description:
    "Transportbeton vom regionalen Spezialisten. Mölders liefert Frischbeton zwischen Hamburg, Hannover und Berlin – für Profi und Privatkunde.",
  applicationName: "Mölders Transportbeton",
  authors: [{ name: "Mölders Holding" }],
  metadataBase: new URL("https://transportbeton.moelders.de"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "Mölders Transportbeton",
    title: "Transportbeton von Mölders | Beton aus der Region",
    description:
      "Transportbeton vom regionalen Spezialisten. Mölders liefert Frischbeton zwischen Hamburg, Hannover und Berlin – für Profi und Privatkunde.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={inter.variable}>
      <body className={`${inter.className} antialiased bg-background text-foreground`}>
        {children}
      </body>
    </html>
  );
}
