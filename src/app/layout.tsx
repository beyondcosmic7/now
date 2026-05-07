import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Akshan Khan — Web Developer, Photographer & Cinematographer",
  description: "Portfolio of Akshan Khan — crafting digital experiences through code, photography, and cinematic storytelling. Japanese ink aesthetic.",
  keywords: ["Akshan Khan", "web developer", "photographer", "cinematographer", "portfolio", "creative developer"],
  openGraph: {
    title: "Akshan Khan — Web Developer, Photographer & Cinematographer",
    description: "Crafting digital experiences through code, photography, and cinematic storytelling.",
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
      <body>
        {children}
      </body>
    </html>
  );
}
