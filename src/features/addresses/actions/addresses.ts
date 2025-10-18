"use server";

import z from "zod";
import { addressSchema } from "./schemas";
import { getCurrentUser } from "@/services/clerk/lib/getSession";
import { db } from "@/drizzle";
import { AddressTable } from "@/drizzle/schema";
import { redirect } from "next/navigation";

export async function addAddress(
  unsafeData: z.infer<typeof addressSchema>,
  productId: string
) {
  const { userId } = await getCurrentUser();

  const { success, data } = addressSchema.safeParse(unsafeData);

  if (!success) {
    return {
      error: true,
      message: "There was and error parsing your data, try again",
    };
  }

  const [newAddress] = await db
    .insert(AddressTable)
    .values({
      city: data.city,
      country: data.country,
      state: data.state,
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      userId,
    })
    .returning({ id: AddressTable.id });

  if (newAddress.id == null) {
    return {
      error: true,
      message: "There was an error saving your address information, try again",
    };
  }

  redirect(`/products/${productId}/purchase`);
}
