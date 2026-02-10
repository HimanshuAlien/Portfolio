import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google"; // Changed fonts
import "./globals.css";

import Header from "@/components/Header";
import BackgroundMusic from "@/components/BackgroundMusic";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Himanshu Mishra",
  description: "A cinematic scrolling experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${dmSans.variable} font-sans antialiased`}>
        <BackgroundMusic />
        <Header />
        {children}
      </body>
    </html>
  );
}
