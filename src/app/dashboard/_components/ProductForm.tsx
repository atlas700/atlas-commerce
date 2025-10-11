"use client";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Required"),
  priceInCents: z.number().int().min(1, "Required"),
  description: z.string().min(1, "Required"),
  isAvailableForPurchase: z.boolean().default(true),
  imageUrl: z.string().min(1, "Required"),
  weightInGrams: z.number().int().min(1, "Required"),
  dimensions: z.string().min(1, "Required"),
  sku: z.string().min(1, "Required"),
  stockQuantity: z.number().int().min(1, "Required"),
});

export type NewProduct = z.infer<typeof formSchema>;

export function ProductForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      dimensions: "",
      imageUrl: "",
      isAvailableForPurchase: true,
      priceInCents: 1,
      sku: "",
      stockQuantity: 1,
      weightInGrams: 1,
    },
  });

  async function onSubmit(values: NewProduct) {}

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex gap-x-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="Product Name" {...field} />
                </FormControl>
                <FormDescription>Enter Product Name</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="priceInCents"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Product Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Product Price In Cents"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Enter the product price in cents
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}
