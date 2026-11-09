"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "@/styles/GlobalStyles";
import { buildTheme } from "@/styles/theme";
import { ToastProvider } from "@/contexts/ToastContext";
import { Toast } from "@/components/Molecules/Toast";
import { FullPageLoader } from "@/components/Atoms/FullPageLoader";
import { ModalProvider } from "@/contexts/ModalContext";
import { ThemeModeProvider } from "@/contexts/ThemeModeContext";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { refetchOnWindowFocus: false } },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeModeProvider>
        {(mode) => (
          <ThemeProvider theme={buildTheme(mode)}>
            <ToastProvider>
              <ModalProvider>
                <GlobalStyles />
                <Toast />
                <FullPageLoader />
                {children}
              </ModalProvider>
            </ToastProvider>
          </ThemeProvider>
        )}
      </ThemeModeProvider>
    </QueryClientProvider>
  );
}
