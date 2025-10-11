import { ReactNode } from "react";

export default function AuthLayout({
  children,
}: {
  children: Readonly<ReactNode>;
}) {
  return (
    <div className="min-h-screen w-full flex justify-center items-center pt-32 ">
      {children}
    </div>
  );
}
