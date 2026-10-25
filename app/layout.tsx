
import type { Metadata } from "next";
// The stylesheet is loaded by Next.js at runtime; this suppresses the
// TypeScript diagnostic when the CSS type declaration is unavailable.
// @ts-expect-error — Next.js handles the side-effect CSS import.
import "./globals.css";

export const metadata: Metadata = {
  title: "Halden H1 — Sound, Uncovered",
  description:
    "Discover Halden H1. A considered approach to headphone design, acoustic engineering, and everyday listening.",
  applicationName: "Halden",
  openGraph: {
    title: "Halden H1 — Sound, Uncovered",
    description:
      "Less noise. More meaning. Discover the Halden H1 design experience.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
