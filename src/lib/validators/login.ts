import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email, phone number or account number format"),
});

export const otpSchema = z.object({
  otp: z.string().min(5, "OTP must be 5 digits").max(5, "OTP must be 5 digits"),
});
