import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://romanatahir.dev"),
  title: "Romana Tahir | AI/ML Engineer · MERN Stack · AI Automation",
  description:
    "Portfolio of Romana Tahir — AI/ML Engineer, MERN Stack Developer, and AI Automation Engineer based in Karachi, Pakistan. Published researcher (ICISCT 2026), Merit Scholar, building intelligent AI workflows, RAG systems, and robust web applications.",
  keywords: [
    "Romana Tahir",
    "AI Engineer",
    "ML Engineer",
    "MERN Stack Developer",
    "AI Automation",
    "Karachi Pakistan",
    "RAG",
    "n8n",
    "Computer Vision",
    "NLP",
    "Next.js Developer",
  ],
  authors: [{ name: "Romana Tahir" }],
  creator: "Romana Tahir",
  openGraph: {
    title: "Romana Tahir | AI/ML Engineer · MERN Stack · AI Automation",
    description:
      "Explore the portfolio of Romana Tahir — AI/ML Engineer & MERN Stack Developer. Discover research papers, production RAG chatbots, full-stack applications, and automated workflows.",
    url: "https://romanatahir.dev",
    siteName: "Romana Tahir Portfolio",
    images: [
      {
        url: "/romana.jpg",
        width: 1200,
        height: 630,
        alt: "Romana Tahir - AI/ML Engineer & MERN Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Romana Tahir | AI/ML Engineer & Full Stack Developer",
    description:
      "AI/ML Engineer, MERN Stack Developer, and AI Automation specialist based in Karachi, Pakistan.",
    images: ["/romana.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${inter.variable} ${jetbrainsMono.variable} scroll-smooth dark`}
    >
      <body className="bg-[#050505] text-[#E0E0E0] font-sans antialiased selection:bg-[#FF8A1F]/30 selection:text-[#FF8A1F] overflow-x-hidden min-h-screen">
        {children}
      </body>
    </html>
  );
}
