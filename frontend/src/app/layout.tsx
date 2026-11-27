
import type {
  Metadata,
  Viewport,
} from "next";

import {
  Geist,
  Geist_Mono,
} from "next/font/google";

import ThemeProvider
  from "../components/ThemeProvider";

import AdaptiveProvider
  from "../components/AdaptiveProvider";

import WalletProvider from "../components/WalletProvider";

import DemoVaultProvider from "../components/DemoVaultProvider";

import AdaptiveShell
  from "../components/AdaptiveShell";

import "./globals.css";
import "./adaptive.css";
import "./adaptive-shell.css";
import "./wallet-connection.css";

/* ==========================================
   FONTS
========================================== */

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

/* ==========================================
   APPLICATION METADATA
========================================== */

export const metadata: Metadata = {
  title: "AgentVault — Adaptive One 2.0",

  description:
    "Paranızı ve dijital asistanlarınızı kolayca yönetin.",

  applicationName: "AgentVault",
};

/* ==========================================
   VIEWPORT
========================================== */

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

/* ==========================================
   ROOT LAYOUT
========================================== */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        <ThemeProvider>

          <AdaptiveProvider>

            <WalletProvider>
            <DemoVaultProvider>
            <AdaptiveShell>

              {children}

            </AdaptiveShell>
            </DemoVaultProvider>
            </WalletProvider>

          </AdaptiveProvider>

        </ThemeProvider>

      </body>

    </html>
  );
}
