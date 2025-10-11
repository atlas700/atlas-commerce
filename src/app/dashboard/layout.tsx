import { Footer } from "@/components/Footer";
import { db } from "@/drizzle";
import { UserTable } from "@/drizzle/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { Header } from "./_components/Header";

export default async function DashboardLayout({
  children,
}: {
  children: Readonly<ReactNode>;
}) {
  const { userId, redirectToSignIn } = await auth();

  if (userId == null) {
    return redirectToSignIn();
  }

  const user = await db.query.UserTable.findFirst({
    where: eq(UserTable.id, userId),
  });

  if (user?.role !== "ADMIN") {
    return redirect("/");
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 grow mt-24 min-h-[calc(100vh-128px)]">
        {children}
      </div>
      <Footer />
    </div>
  );
}
