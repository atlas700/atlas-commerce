import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { shadcn } from "@clerk/themes";
import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";

const soraSans = Sora({
  variable: "--font-sora-sans",
  subsets: ["latin"],
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
    <ClerkProvider appearance={{ theme: shadcn }}>
      <html lang="en">
        <body
          className={`${soraSans.variable} antialiased min-h-screen font-sans bg-background dark flex flex-col`}
        >
          <main className="flex-1 px-4 md:px-8 w-full max-w-7xl mx-auto">
            {children}
            <Toaster position="top-right" closeButton richColors theme="dark" />
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
