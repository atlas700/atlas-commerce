"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addressSchema } from "@/features/addresses/actions/schemas";
import z from "zod";
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
import { Button } from "@/components/ui/button";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { addAddress } from "@/features/addresses/actions/addresses";
import { toast } from "sonner";
import { AddressTable } from "@/drizzle/schema";

export function AddressForm({
  productId,
  address,
}: {
  productId: string;
  address?: Pick<
    typeof AddressTable.$inferSelect,
    "city" | "country" | "fullName" | "phoneNumber" | "state"
  >;
}) {
  const form = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      city: address?.city ?? "",
      country: address?.country ?? "",
      fullName: address?.fullName ?? "",
      phoneNumber: address?.phoneNumber ?? "",
      state: address?.state ?? "",
    },
  });

  async function onSubmit(values: z.infer<typeof addressSchema>) {
    const results = await addAddress(values, productId);

    if (results.error) {
      toast.error(results.message);
    } else {
      toast.success("Successfully saved your shipping address");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-x-4 flex justify-between items-start">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Full Name" {...field} />
                </FormControl>
                <FormDescription>Enter your legal full name</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Phone Number" {...field} />
                </FormControl>
                <FormDescription>
                  Enter your personal phone number for product delivery
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-x-4 flex justify-between items-start">
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  Currently we only shipping to Afghanistan
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Province (State)</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Province Name" {...field} />
                </FormControl>
                <FormDescription>
                  Enter your province name were you live
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="Enter City Name" {...field} />
                </FormControl>
                <FormDescription>
                  Enter your city name were you live
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="ml-auto"
          >
            <LoadingSwap isLoading={form.formState.isSubmitting}>
              Continue
            </LoadingSwap>
          </Button>
        </div>
      </form>
    </Form>
  );
}
