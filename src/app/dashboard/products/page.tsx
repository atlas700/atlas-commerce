import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/drizzle";
import { formatCurrency, formatNumber, formatWeight } from "@/lib/formatters";
import { getCurrentUser } from "@/services/clerk/lib/getSession";
import {
  CheckCircle2,
  LucideEdit3,
  MoreVerticalIcon,
  PlusIcon,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { PageHeader } from "../_components/PageHeader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ActionButton } from "@/components/ui/action-button";
import {
  deleteProduct,
  toggleProductAvailability,
} from "@/features/products/actions/products";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  const { userId, redirectToSignIn } = await getCurrentUser();

  const products = await getProducts();

  if (products.length === 0) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>No Products</CardTitle>
          </CardHeader>
          <CardContent>
            <Button asChild variant={"secondary"}>
              <Link href={"/dashboard/products/new"}>Create Now</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="">
      <Table className="border-2">
        <TableCaption>All Products</TableCaption>
        <TableHeader className="border-b-2">
          <TableRow>
            <TableHead className="w-0">
              <span className="sr-only">Available For Purchase</span>
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Dimensions</TableHead>
            <TableHead>Weight In Grams</TableHead>
            <TableHead>Orders</TableHead>
            <TableHead className="w-0">
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                {product.isAvailableForPurchase ? (
                  <>
                    <span className="sr-only">Available</span>
                    <CheckCircle2 />
                  </>
                ) : (
                  <>
                    <span className="sr-only">Unavailable</span>
                    <XCircle className="stroke-destructive" />
                  </>
                )}
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>
                {formatCurrency(product.priceInCents / 100)}
              </TableCell>
              <TableCell className="max-w-[150px] truncate whitespace-nowrap overflow-hidden">
                {product.description}
              </TableCell>
              <TableCell>{formatNumber(product.stockQuantity)}</TableCell>
              <TableCell>{product.sku}</TableCell>
              <TableCell>{product.dimensions}</TableCell>
              <TableCell>{formatWeight(product.weightInGrams)}</TableCell>
              <TableCell>{product.orders.length}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreVerticalIcon />
                    <span className="sr-only">Actions</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/products/${product.id}/edit`}>
                        <LucideEdit3 />
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ActionButton
                        className="w-full"
                        variant={"ghost"}
                        size={"sm"}
                        action={toggleProductAvailability.bind(
                          null,
                          product.id
                        )}
                      >
                        {product.isAvailableForPurchase ? "Inactive" : "Active"}
                      </ActionButton>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <ActionButton
                      className="w-full"
                      variant={"destructive"}
                      action={deleteProduct.bind(null, product.id)}
                      requireAreYouSure
                    >
                      Delete
                    </ActionButton>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

async function getProducts() {
  return await db.query.ProductTable.findMany({
    with: {
      orders: {
        columns: { id: true, productId: true },
      },
    },
  });
}
