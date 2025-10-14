import { PageHeader } from "@/app/dashboard/_components/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/drizzle";
import { ProductTable } from "@/drizzle/schema";
import { formatCurrency } from "@/lib/formatters";
import { desc, eq } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default function ProductsPage() {
  return (
    <div className="min-h-screen mt-28">
      <PageHeader title="All Products">{null}</PageHeader>
      <Suspense
        fallback={
          <>
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </>
        }
      >
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
    <div className="grid grid-cols-1 gap-y-5 sm:gap-x-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

function ProductCard({
  product: {
    id,
    description,
    name,
    imageUrl,
    priceInCents,
    stockQuantity,
    createdAt,
  },
}: {
  product: typeof ProductTable.$inferSelect;
}) {
  return (
    <Card className="flex overflow-hidden flex-col">
      <div className="relative w-full h-auto aspect-video -mt-6 rounded-tl-xl rounded-tr-xl">
        <Image
          src={imageUrl!}
          fill
          alt={name}
          className="rounded-tl-xl rounded-tr-xl"
        />
      </div>
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>{formatCurrency(priceInCents / 100)}</CardTitle>
          <Badge variant={"destructive"}>{stockQuantity} Left</Badge>
        </div>
        <p className="font-bold tracking-wide">{name}</p>
      </CardHeader>
      <CardContent className="grow">
        <CardDescription className="line-clamp-4">
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/products/${id}/purchase`}>Purchase</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden flex flex-col animate-pulse">
      <div className="w-full aspect-video bg-gray-300" />
      <CardHeader>
        <CardTitle>
          <div className="w-3/4 h-6 rounded-full bg-gray-300" />
        </CardTitle>
        <CardDescription>
          <div className="w-1/2 h-4 rounded-full bg-gray-300" />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="w-full h-4 rounded-full bg-gray-300" />
        <div className="w-full h-4 rounded-full bg-gray-300" />
        <div className="w-3/4 h-4 rounded-full bg-gray-300" />
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled size="lg"></Button>
      </CardFooter>
    </Card>
  );
}

async function getProducts() {
  return await db.query.ProductTable.findMany({
    where: eq(ProductTable.isAvailableForPurchase, true),
    orderBy: desc(ProductTable.createdAt),
  });
}
