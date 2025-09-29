import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "JAT Digital - Joel Torres Portfolio",
    template: "%s | JAT Digital"
  },
  description: "Joel Torres - BA&IS Student exploring AI, automation, and backend systems. Building projects and documenting the journey.",
  keywords: [
    "Joel Torres",
    "Joel Torres portfolio",
    "Joel Torres AI",
    "Joel Torres automation",
    "Joel Torres developer",
    "Joel Torres MIS",
    "Joel Torres Penn State",
    "JAT Digital", 
    "AI automation",
    "backend systems",
    "MIS student",
    "portfolio",
    "web development",
    "automation",
    "AI agents",
    "business automation",
    "Penn State University",
    "BA&IS student"
  ],
  authors: [{ name: "Joel Torres" }],
  creator: "Joel Torres",
  publisher: "JAT Digital",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jat-digital.netlify.app",
    title: "JAT Digital - Joel Torres Portfolio",
    description: "Joel Torres - BA&IS Student exploring AI, automation, and backend systems. Building projects and documenting the journey.",
    siteName: "JAT Digital",
    images: [
      {
        url: "/images/profile-headshot.webp",
        width: 1200,
        height: 630,
        alt: "Joel Torres - JAT Digital Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JAT Digital - Joel Torres Portfolio",
    description: "Joel Torres - BA&IS Student exploring AI, automation, and backend systems. Building projects and documenting the journey.",
    images: ["/images/profile-headshot.webp"],
    creator: "@joeltorres",
  },
  verification: {
    google: "your-google-verification-code", // You can add this later
  },
  alternates: {
    canonical: "https://jat-digital.netlify.app",
  },
  category: "Portfolio",
  classification: "Joel Torres Portfolio - AI Automation Developer",
  other: {
    "google-site-verification": "your-google-verification-code", // Add your Google Search Console verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased text-white min-h-screen`}>
        <Navbar />
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
