"use client";

import { Button } from "@/components/ui/button";
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
import { LoadingSwap } from "@/components/ui/loading-swap";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { createProduct } from "@/features/products/actions/products";
import { productSchema } from "@/features/products/actions/schemas";
import { UploadDropzone } from "@/services/uploadthing/components/Uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import { Json } from "@uploadthing/shared";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { UploadThingError } from "uploadthing/server";
import { z } from "zod";

export type NewProduct = z.infer<typeof productSchema>;

export function ProductForm() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      dimensions: "",
      imageUrl: "",
      isAvailableForPurchase: false,
      priceInCents: undefined,
      sku: "",
      stockQuantity: undefined,
      weightInGrams: undefined,
    },
  });

  async function onSubmit(values: NewProduct) {
    const result = await createProduct(values);

    if (result.error) {
      toast.error(result.message);
    } else {
      toast.success(result.message);
      router.push("/dashboard/products");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                    {...field}
                    type="number"
                    inputMode="numeric"
                    min={0}
                    step={1}
                    pattern="\d*"
                    placeholder="Product Price in Cents"
                    value={field.value ?? ""}
                    onChange={(e) => {
                      const value = e.target.value;

                      // Allow empty input for clearing
                      if (value === "") {
                        field.onChange(undefined);
                        return;
                      }

                      // Always update with the number form (arrow keys will work)
                      const numericValue = e.target.valueAsNumber;

                      // If the browser gives NaN (e.g., invalid chars), skip
                      if (!isNaN(numericValue)) {
                        field.onChange(numericValue);
                      }
                    }}
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
        <div className="flex gap-x-4">
          <FormField
            control={form.control}
            name="stockQuantity"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Product Stock Quantity</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    inputMode="numeric"
                    min={0}
                    step={1}
                    pattern="\d*"
                    placeholder="Product Stock Quantity"
                    value={field.value ?? ""}
                    onChange={(e) => {
                      const value = e.target.value;

                      // Allow empty input for clearing
                      if (value === "") {
                        field.onChange(undefined);
                        return;
                      }

                      // Always update with the number form (arrow keys will work)
                      const numericValue = e.target.valueAsNumber;

                      // If the browser gives NaN (e.g., invalid chars), skip
                      if (!isNaN(numericValue)) {
                        field.onChange(numericValue);
                      }
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Enter product quantity in stock
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sku"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Product SKU</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Product SKU" />
                </FormControl>
                <FormDescription>
                  Enter an unique sku number for product
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-x-4">
          <FormField
            control={form.control}
            name="weightInGrams"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Product Weight</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    inputMode="numeric"
                    min={0}
                    step={1}
                    pattern="\d*"
                    placeholder="Product Weight"
                    value={field.value ?? ""}
                    onChange={(e) => {
                      const value = e.target.value;

                      // Allow empty input for clearing
                      if (value === "") {
                        field.onChange(undefined);
                        return;
                      }

                      // Always update with the number form (arrow keys will work)
                      const numericValue = e.target.valueAsNumber;

                      // If the browser gives NaN (e.g., invalid chars), skip
                      if (!isNaN(numericValue)) {
                        field.onChange(numericValue);
                      }
                    }}
                  />
                </FormControl>
                <FormDescription>Enter product weight in grams</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dimensions"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Product Dimensions</FormLabel>
                <FormControl>
                  <Input placeholder="Product Dimensions" {...field} />
                </FormControl>
                <FormDescription>
                  Enter product dimensions like 2 x 3
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isAvailableForPurchase"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Is Available For Purchase</FormLabel>
                <FormControl>
                  <Switch
                    {...field}
                    onChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormDescription>
                  Is the product available for purchase when created
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="my-8">
          <FormField
            name="imageUrl"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Image</FormLabel>
                <FormControl>
                  <UploadDropzone
                    {...field}
                    endpoint={"imageUploader"}
                    onClientUploadComplete={(res) => {
                      res.forEach(({ serverData }) => {
                        form.setValue("imageUrl", serverData.imageUrl);
                        toast.success(serverData.message);
                      });
                    }}
                    onUploadError={(error: UploadThingError<Json>) => {
                      toast.error(error.message);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Product Description</FormLabel>
              <FormControl>
                <Textarea className="min-h-32 resize-none" {...field} />
              </FormControl>
              <FormDescription>
                Enter product description for any product specification.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            <LoadingSwap isLoading={form.formState.isSubmitting}>
              Save
            </LoadingSwap>
          </Button>
        </div>
      </form>
    </Form>
  );
}
