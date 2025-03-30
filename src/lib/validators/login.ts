import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
});

export const otpSchema = z.object({
  otp: z.string().min(5, "OTP must be 5 digits").max(5, "OTP must be 5 digits"),
});

export const adminSchema = z.object({
  email: z.string().email("Invalid email"),
  role: z.string().min(1, "Role is required"),
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters"),
});
