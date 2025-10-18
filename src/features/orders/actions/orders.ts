"use server";

import { db } from "@/drizzle";
import { OrderStatus, OrderTable } from "@/drizzle/schema";
import { getCurrentUser } from "@/services/clerk/lib/getSession";
import { and, eq } from "drizzle-orm";

export async function changeOrderStatus({
  orderId,
  status,
  userId,
}: {
  status: OrderStatus;
  userId: string;
  orderId: string;
}) {
  const { role } = await getCurrentUser(true);

  if (role != "ADMIN") {
    return {
      error: true,
      message:
        "Only admin users are allowed to change the order status of the user",
    };
  }

  if (orderId == null || userId == null) {
    return {
      error: true,
      message: "The order id and user id is null",
    };
  }

  await db
    .update(OrderTable)
    .set({
      status: status,
    })
    .where(and(eq(OrderTable.userId, userId), eq(OrderTable.id, orderId)));

  return {
    error: false,
    message: "Successfully changed the user order status",
  };
}
