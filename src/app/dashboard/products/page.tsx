import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "../_components/PageHeader";

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
      {/* TODO: SHOW ALL PRODUCTS IN TABLE */}
    </div>
  );
}
