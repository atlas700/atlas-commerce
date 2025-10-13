import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "../_components/PageHeader";
import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/drizzle";

export default function AdminProductPage() {
  return (
    <div>
      <PageHeader title="Products">
        <Button asChild>
          <Link href={"/dashboard/products/new"}>
            <PlusIcon /> Add Product
          </Link>
        </Button>
      </PageHeader>
      <Suspense>
        <SuspendedAdminProductPage />
      </Suspense>
    </div>
  );
}

async function SuspendedAdminProductPage() {
  const { userId, redirectToSignIn } = await auth();

  if (userId == null) {
    return redirectToSignIn();
  }

  const products = await getProducts();

  return <div>
    
  </div>
}

async function getProducts() {
  return await db.query.ProductTable.findMany();
}
