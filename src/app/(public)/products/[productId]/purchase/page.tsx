import { Button } from "@/components/ui/button";
import { db } from "@/drizzle";
import { ProductTable } from "@/drizzle/schema";
import { createCheckoutSession } from "@/services/stripe/createCheckout";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

export default async function ProductPurchasePage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;

  // Example: normally you'd load this from your DB using drizzle
  const product = await getProduct(productId);

  if(product == null){
    return notFound()
  }

  return (
    <div className="min-h-screen mt-24 flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p>{product.description}</p>
      <p className="text-lg font-semibold">
        ${(product.priceInCents / 100).toFixed(2)}
      </p>

      <form
        action={async () => {
          "use server";
          await createCheckoutSession(product);
        }}
      >
        <Button type="submit" className="mt-4">
          Buy Now
        </Button>
      </form>
    </div>
  );
}

async function getProduct(productId: string) {
  return await db.query.ProductTable.findFirst({
    where: eq(ProductTable.id, productId),
  });
}
