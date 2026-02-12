import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Naluz | Ilumina con Estilo",
  description: "Transformamos espacios con diseño sofisticado y tecnología LED de vanguardia. La elegancia de Loja ahora tiene nombre propio.",
  manifest: '/manifest.json',
  metadataBase: new URL('https://naluzloja.com'),
  openGraph: {
    title: "Naluz | Ilumina con Estilo",
    description: "Transformamos espacios con diseño sofisticado y tecnología LED de vanguardia. La elegancia de Loja ahora tiene nombre propio.",
    url: "https://naluzloja.com",
    siteName: "Naluz",
    locale: "es_ES",
    type: "website",
  },
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
