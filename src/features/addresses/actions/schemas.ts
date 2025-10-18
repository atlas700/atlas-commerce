import z from "zod";

export const addressSchema = z.object({
  fullName: z.string().min(1, "Required"),
  city: z.string().min(1, "Required"),
  state: z.string().min(1, "Required"),
  country: z.string().min(1, "Required"),
  phoneNumber: z.string().min(1, "Required"),
});
