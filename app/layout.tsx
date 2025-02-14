import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "TrustGuard – Detect Fake News with AI",
  description: "TrustGuard uses advanced AI and machine learning to analyze and verify news sources in real time. Stay informed with reliable news.",
  keywords: "fake news detector, AI news verification, fact-checking AI, news credibility, misinformation detection",
  authors: [{ name: "Amardeep Lakshkar", url: "https://amardeep-portfolio.vercel.app/" }],
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
            {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
