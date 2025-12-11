"use client";

import { SessionProvider } from "next-auth/react";
import { Providers } from "./provider";
import { Toaster } from "react-hot-toast";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Providers>
        {children}
        <Toaster position="top-right" />
      </Providers>
    </SessionProvider>
  );
}
