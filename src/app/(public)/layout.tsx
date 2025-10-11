import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="flex-1 px-4 md:px-8 w-full max-w-7xl mx-auto">
        {children}
      </div>
      <Footer />
    </>
  );
}
