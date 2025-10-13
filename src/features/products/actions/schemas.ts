import z from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Required"),
  priceInCents: z.number().int().min(1, "Required"),
  description: z.string().min(1, "Required"),
  isAvailableForPurchase: z.boolean().default(false),
  imageUrl: z.string().min(1, "Required"),
  weightInGrams: z.number().int().min(1, "Required"),
  dimensions: z.string().min(1, "Required"),
  sku: z.string().min(1, "Required"),
  stockQuantity: z.number().int().min(1, "Required"),
});
