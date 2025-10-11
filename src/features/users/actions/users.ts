"use server";

import { db } from "@/drizzle";
import { UserTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function createUser(data: typeof UserTable.$inferInsert) {
  await db.insert(UserTable).values(data);
}

export async function updateUser(
  userId: string,
  data: Partial<typeof UserTable.$inferInsert>
) {
  await db.update(UserTable).set(data).where(eq(UserTable.id, userId));
}

export async function deleteUser(userId: string) {
  await db.delete(UserTable).where(eq(UserTable.id, userId));
}
