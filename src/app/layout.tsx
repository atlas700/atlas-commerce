import { Header } from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Rubik_Mono_One, Sora } from "next/font/google";
import "./globals.css";

const soraSans = Sora({
  variable: "--font-sora-sans",
  subsets: ["latin"],
});

const rubikSans = Rubik_Mono_One({
  variable: "--font-rubik-sans",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Atlas Commerce",
  description:
    "Atlas Commerce is the full featured eCommerce app that build with quality and standards",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${soraSans.variable} antialiased min-h-screen font-sans bg-background dark`}
      >
        <Header />
        <main className="flex-1 px-4 md:px-8 w-full max-w-7xl mx-auto">
          {children}
          <Toaster position="top-right" closeButton richColors theme="dark" />
        </main>
      </body>
    </html>
  );
}
