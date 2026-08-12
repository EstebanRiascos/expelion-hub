import type { Metadata } from "next";
import "./globals.css";

import SmoothScroll from "@/components/shared/SmoothScroll";

import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "EXPELION Client Portal",
  description: "Desarrollo de software personalizado.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <SmoothScroll />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
