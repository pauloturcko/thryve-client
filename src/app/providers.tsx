"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "@/styles/GlobalStyles";
import { buildTheme } from "@/styles/theme";
import { ToastProvider } from "@/contexts/ToastContext";
import { Toast } from "@/components/Molecules/Toast";
import { LoaderProvider } from "@/contexts/LoaderContext";
import { FullPageLoader } from "@/components/Atoms/FullPageLoader";
import { ModalProvider } from "@/contexts/ModalContext";
import { ThemeModeProvider } from "@/contexts/ThemeModeContext";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeModeProvider>
        {(mode, palette) => (
          <ThemeProvider theme={buildTheme(palette, mode)}>
            <LoaderProvider>
              <ToastProvider>
                <ModalProvider>
                  <GlobalStyles />
                  <Toast />
                  <FullPageLoader />
                  {children}
                </ModalProvider>
              </ToastProvider>
            </LoaderProvider>
          </ThemeProvider>
        )}
      </ThemeModeProvider>
    </QueryClientProvider>
  );
}
