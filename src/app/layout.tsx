import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Akshan Khan — Web Developer, Photographer & Cinematographer",
  description: "Portfolio of Akshan Khan — crafting digital experiences through code, photography, and cinematic storytelling. Japanese ink aesthetic.",
  keywords: ["Akshan Khan", "web developer", "photographer", "cinematographer", "portfolio", "creative developer"],
  icons: {
    icon: "/miguel_logo_new.png",
    shortcut: "/miguel_logo_new.png",
    apple: "/miguel_logo_new.png",
  },
  openGraph: {
    title: "Akshan Khan — Web Developer, Photographer & Cinematographer",
    description: "Crafting digital experiences through code, photography, and cinematic storytelling.",
    type: "website",
  },
};

import { ThemeProvider } from "@/components/ThemeProvider/ThemeProvider";
import { LayoutProvider } from "@/context/LayoutContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem={false}
        >
          <LayoutProvider>
            {children}
          </LayoutProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

