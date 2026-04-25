import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
  <circle cx="60" cy="60" r="60" fill="#1a3faa"/>
  <g transform="rotate(-6,60,60)">
    <rect x="28" y="16" width="52" height="66" rx="5" fill="white"/>
    <polygon points="68,16 80,16 80,28 68,28" fill="#d0d8f0"/>
    <path d="M68 16 L68 28 L80 28" fill="none" stroke="#b0bcd8" stroke-width="1"/>
    <path d="M54 34 A10 10 0 1 0 54 54" fill="none" stroke="#2563eb" stroke-width="4" stroke-linecap="round"/>
    <path d="M50 46 L55 52 L66 38" fill="none" stroke="#2563eb" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="33" y="62" width="36" height="4" rx="2" fill="#c8d0e8"/>
    <rect x="33" y="70" width="32" height="4" rx="2" fill="#c8d0e8"/>
    <rect x="33" y="78" width="28" height="4" rx="2" fill="#c8d0e8"/>
  </g>
  <circle cx="76" cy="84" r="19" fill="#1a3faa"/>
  <circle cx="76" cy="84" r="17" fill="#2563eb"/>
  <text x="76" y="91" text-anchor="middle" font-family="Arial,sans-serif" font-size="19" font-weight="900" fill="white">$</text>
</svg>`;

const iconDataUri = `data:image/svg+xml;base64,${Buffer.from(iconSvg).toString("base64")}`;

export const metadata: Metadata = {
  title: {
    default: "CotizaApp",
    template: "%s | CotizaApp",
  },
  description: "Sistema de cotizaciones SaaS",
  applicationName: "CotizaApp",
  icons: {
    icon: [{ url: iconDataUri, type: "image/svg+xml" }],
    shortcut: [{ url: iconDataUri, type: "image/svg+xml" }],
    apple: [{ url: iconDataUri, type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#1a3faa",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        <link rel="icon" href={iconDataUri} type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          {children}
          <Toaster position="top-center" richColors />
        </Providers>
      </body>
    </html>
  );
}
