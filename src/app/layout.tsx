import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ParticleBackground from "@/components/particle-bg";
import Header from "@/components/header";

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
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="gradient-bg relative min-h-screen bg-black overflow-hidden">
          {/* Music Pulse Background */}
          <div className="absolute inset-0 flex justify-center items-center z-0 pointer-events-none">
            <div className="music-pulse">
              {[...Array(10)].map((_, index) => (
                <span key={index} className={`bar delay-${index}`}></span>
              ))}
            </div>
          </div>
          {/* Particle Background */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <ParticleBackground />
          </div>

          {/* Main Content */}
          <div className="relative z-10"><Header />{children}</div>
        </div>
      </body>
    </html>
  );
}
