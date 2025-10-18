import { AddressForm } from "@/app/(public)/_components/AddressForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/drizzle";
import { AddressTable } from "@/drizzle/schema";
import { getCurrentUser } from "@/services/clerk/lib/getSession";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function AddressPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;

  if (productId == null) {
    return notFound();
  }

  return (
    <div className="min-h-screen mt-24">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Shipping Details</CardTitle>
          <CardDescription>
            Enter your complete and correct shipping details for product
            shipping
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense>
            <SuspendedAddressForm productId={productId} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}

async function SuspendedAddressForm({ productId }: { productId: string }) {
  const existedUserAddress = await getUserExistingAddress();

  return <AddressForm productId={productId} address={existedUserAddress} />;
}

async function getUserExistingAddress() {
  const { userId } = await getCurrentUser();

  return await db.query.AddressTable.findFirst({
    where: eq(AddressTable.userId, userId),
  });
}
