import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "becoss Coding Framework",
  description: "AI-powered development workflow for Claude Code",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
