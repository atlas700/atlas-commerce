import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/drizzle";
import { OrderTable } from "@/drizzle/schema";
import { formatCurrency, formatDate } from "@/lib/formatters";
import { getCurrentUser } from "@/services/clerk/lib/getSession";
import { eq } from "drizzle-orm";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function UserOrdersPage() {
  const { userId } = await getCurrentUser();
  const userOrders = await getUserOrder(userId);

  if (userOrders.length === 0) {
    return (
      <div className="min-h-screen mt-20">
        <div className="flex justify-center items-center gap-6 flex-col h-full mt-32">
          <h1 className="font-semibold text-xl md:text-2xl tracking-tight">
            You don't have orders yet, buy your first product
          </h1>
          <Button asChild>
            <Link href={"/products"}>
              Go To Products <ArrowRightIcon />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-20">
      <h1 className="font-bold text-2xl md:text-3xl tracking-tight">
        Your Orders
      </h1>
      <div className="mt-3">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product Details</TableHead>
              <TableHead>Product Price</TableHead>
              <TableHead>Shipping Address</TableHead>
              <TableHead>Receiver Info</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="flex gap-2 items-center">
                  <div className="h-16 w-[40%] relative rounded-sm">
                    <Image
                      src={order.product.imageUrl!}
                      alt={order.product.name}
                      fill
                      className="object-cover rounded-sm"
                    />
                  </div>
                  <span>{order.product.name}</span>
                </TableCell>
                <TableCell>{formatCurrency(order.pricePaidInCents)}</TableCell>
                <TableCell className="max-w-[80px] truncate whitespace-nowrap overflow-hidden">
                  {order.shippingAddress.city}, {order.shippingAddress.state},{" "}
                  {order.shippingAddress.country}
                </TableCell>
                <TableCell className="max-w-[80px] truncate whitespace-nowrap overflow-hidden">
                  {order.shippingAddress.fullName},{" "}
                  {order.shippingAddress.phoneNumber}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      order.status === "CANCELLED"
                        ? "destructive"
                        : order.status === "DELIVERED"
                        ? "default"
                        : order.status === "PROCESSING"
                        ? "outline"
                        : order.status === "SHIPPED"
                        ? "default"
                        : "default"
                    }
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>{formatDate(order.createdAt!)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

async function getUserOrder(userId: string) {
  return await db.query.OrderTable.findMany({
    where: eq(OrderTable.userId, userId),
    columns: {
      id: true,
      pricePaidInCents: true,
      status: true,
      createdAt: true,
    },
    with: {
      product: {
        columns: {
          imageUrl: true,
          name: true,
        },
      },
      shippingAddress: {
        columns: {
          city: true,
          state: true,
          country: true,
          fullName: true,
          phoneNumber: true,
        },
      },
    },
  });
}
