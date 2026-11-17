import type { Metadata } from "next";
import { Providers } from "./providers";
import StyledComponentsRegistry from "./registry";
import React from "react";
import { fontVariables } from "@/styles/fonts";

export const metadata: Metadata = {
  title: "Thryve",
  description: "Thryve Finance Dashboard",
  icons: {
    icon: { url: "/favicon.svg", type: "image/svg+xml" },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={fontVariables}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <StyledComponentsRegistry>
          <Providers>{children}</Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
