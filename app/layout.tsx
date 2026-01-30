import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import BackgroundMusic from "@/components/BackgroundMusic";



const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap", // Best practice for font loading
});

export const metadata: Metadata = {
  title: "Scrollytelling Portfolio",
  description: "A cinematic scrolling experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <BackgroundMusic />
        <Header />
        {children}
      </body>
    </html >
  );
}
