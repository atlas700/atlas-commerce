import { ActionButton } from "@/components/ui/action-button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { db } from "@/drizzle";
import { orderStatuses } from "@/drizzle/schema";
import { changeOrderStatus } from "@/features/orders/actions/orders";
import { formatCurrency, formatDate } from "@/lib/formatters";
import Image from "next/image";

export default async function AdminOrdersPage() {
  const orders = await getOrders();

  if (orders.length === 0) {
    return (
      <div className="min-h-screen mt-20">
        <div className="mt-32">
          <h1 className="font-semibold text-xl md:text-2xl tracking-tight">
            No Orders Yet.
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <h1 className="font-bold text-2xl md:text-3xl tracking-tight mt-1">
        All Orders
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
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
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
                  <DropdownMenu>
                    <DropdownMenuTrigger>{order.status}</DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {orderStatuses.map((os) => (
                        <DropdownMenuItem key={os}>
                          <ActionButton
                            action={changeOrderStatus.bind(null, {
                              status: os,
                              userId: order.user.id,
                              orderId: order.id,
                            })}
                            size={"sm"}
                            variant={"ghost"}
                            className="w-full"
                          >
                            {os}
                          </ActionButton>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
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

async function getOrders() {
  return await db.query.OrderTable.findMany({
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
      user: {
        columns: {
          id: true,
        },
      },
    },
  });
}
