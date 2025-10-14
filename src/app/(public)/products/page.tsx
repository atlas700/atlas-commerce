import { PageHeader } from "@/app/dashboard/_components/PageHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/drizzle";
import { ProductTable } from "@/drizzle/schema";
import { desc } from "drizzle-orm";
import Image from "next/image";
import { Suspense } from "react";


export default function ProductsPage() {
  return (
    <div className="min-h-screen mt-28">
      <PageHeader title="All Products">{null}</PageHeader>
      <Suspense>
        <SuspendedProductsPage />
      </Suspense>
    </div>
  );
}

async function SuspendedProductsPage() {
  const products = await getProducts();

  if (products.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Products</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            There was no products in the database
          </CardDescription>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-y-5 md:gap-x-5 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

function ProductCard({product}: {product: typeof ProductTable.$inferSelect}){
    return <Card>
        <div className="p-0 mb-4 h-32 w-full relative">
            <Image src={product.imageUrl!} alt={product.name} fill />
        </div>
    </Card>
}


async function getProducts() {
  return await db.query.ProductTable.findMany({
    orderBy: desc(ProductTable.createdAt),
  });
}
