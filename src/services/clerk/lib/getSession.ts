import { db } from "@/drizzle";
import { UserTable } from "@/drizzle/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export async function getCurrentUser(allData?: boolean) {
  const { userId, redirectToSignIn } = await auth();

  if (userId == null) {
    return redirectToSignIn();
  }

  if (allData) {
    const user = await getUser(userId);
    return {
      userId,
      name: user?.name,
      email: user?.email,
      role: user?.role,
      imageUrl: user?.imageUrl,
    };
  }

  return { userId, redirectToSignIn };
}

async function getUser(userId: string) {
  return await db.query.UserTable.findFirst({
    where: eq(UserTable.id, userId),
    columns: {
      imageUrl: true,
      name: true,
      email: true,
      role: true,
    },
  });
}
