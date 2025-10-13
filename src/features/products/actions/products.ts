"use server";

import { db } from "@/drizzle";
import { ProductTable } from "@/drizzle/schema";
import { getCurrentUser } from "@/services/clerk/lib/getSession";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
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

export async function toggleProductAvailability(productId: string) {
  await getCurrentUser();

  const product = await db.query.ProductTable.findFirst({
    where: eq(ProductTable.id, productId),
    columns: {
      isAvailableForPurchase: true,
    },
  });

  if (product == null) {
    return {
      error: true,
      message: "Cannot update the product availability, try again",
    };
  }

  await db
    .update(ProductTable)
    .set({ isAvailableForPurchase: !product.isAvailableForPurchase });

  return {
    error: false,
    message: "Successfully updated the product availability",
  };
}

export async function deleteProduct(productId: string) {
  await getCurrentUser();

  const product = await db.query.ProductTable.findFirst({
    where: eq(ProductTable.id, productId),
    columns: {
      id: true,
    },
  });

  if (product == null) {
    return {
      error: true,
      message: "Cannot delete the product, try again",
    };
  }

  await db.delete(ProductTable).where(eq(ProductTable.id, product.id));

  return {
    error: false,
    message: "Successfully deleted the product",
  };
}
