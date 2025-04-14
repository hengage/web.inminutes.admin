import { IVendorCredentials } from "@/api/vendors";
import { z } from "zod";

export const initialValue: IVendorCredentials = {
  businessName: "",
  businessLogo: "",
  email: "",
  phoneNumber: "",
  address: "",
  location: [2, 3],
  residentialAddress: "",
  category: "",
  subCategory: "",
};

export const vendorSchema: z.ZodType<IVendorCredentials> = z.object({
  businessName: z
    .string()
    .min(2, "Business name must be at least 2 characters")
    .max(50, "Business name must be less than 50 characters"),
  businessLogo: z.string(),
  category: z.string(),
  subCategory: z.string(),
  email: z.string().email("Invalid email"),
  phoneNumber: z
    .string()
    .min(11, "Phone number must be 10 digits")
    .max(11, "Phone number must be 10 digits"),
  address: z
    .string()
    .min(2, "Address must be at least 2 characters")
    .max(100, "Address must be less than 100 characters"),
  location: z.array(z.number()).length(2),
  residentialAddress: z
    .string()
    .min(2, "Residential address must be at least 2 characters")
    .max(100, "Residential address must be less than 100 characters"),
});
