import { z } from "zod";

export const riderScheme: z.ZodType<RiderData> = z.object({
  name: z.string().min(1, "Rider Name is required"),
  displayName: z.string().min(1, "Display Name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  vehicleType: z.string().min(1, "Vehicle type is required"),
  dateOfBirth: z.string().nonempty("Date of birth is required"),
  businessAddress: z.string().max(100, "Business Address must be 100 characters or less"),
  residentialAddress: z.string().max(100, "Residential Address must be 100 characters or less"),
  businessLogo: z.string().optional(), // Optional image URL
});

export const initialValue: RiderData = {
  name: "",
  displayName: "",
  email: "",
  phoneNumber: "",
  vehicleType: "",
  dateOfBirth: "",
  businessAddress: "",
  residentialAddress: "",
  businessLogo: "",
};

export interface RiderData {
  name?: string;
  displayName?: string;
  email?: string;
  phoneNumber?: string;
  vehicleType?: string;
  dateOfBirth?: string;
  businessAddress?: string;
  residentialAddress?: string;
  businessLogo?: string; // Added for image upload
}
