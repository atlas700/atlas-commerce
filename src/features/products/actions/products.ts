"use server";

import { db } from "@/drizzle";
import { ProductTable } from "@/drizzle/schema";
import { auth } from "@clerk/nextjs/server";
import z from "zod";
import { productSchema } from "./schemas";

export async function createProduct(unsafeData: z.infer<typeof productSchema>) {
  const { userId, redirectToSignIn } = await auth();

  if (userId == null) {
    return redirectToSignIn();
  }

  const { success, data } = productSchema.safeParse(unsafeData);

  if (!success) {
    return {
      error: true,
      message: "Unable to parse the schema for new product",
    };
  }

  const [newProduct] = await db
    .insert(ProductTable)
    .values({
      userId,
      ...data,
    })
    .returning({
      id: ProductTable.id,
    });

  if (newProduct == null) {
    return {
      error: true,
      message: "There was an error saving the product, try again",
    };
  }

  return {
    error: false,
    message: "Successfully created the product",
  };
}
