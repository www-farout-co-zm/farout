import { z } from "zod";

export const paymentSchema = z.object({
  cardNumber: z
    .string()
    .min(16, "Card number must be at least 16 digits")
    .max(19, "Card number must be at most 19 digits")
    .regex(/^\d[\d\s]*\d$/, "Card number must contain only digits"),
  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry date must be in MM/YY format"),
  cvv: z
    .string()
    .min(3, "CVV must be at least 3 digits")
    .max(4, "CVV must be at most 4 digits")
    .regex(/^\d+$/, "CVV must contain only digits"),
  cardholderName: z
    .string()
    .min(2, "Cardholder name is required")
    .regex(/^[a-zA-Z\s]+$/, "Cardholder name must contain only letters"),
});

export type PaymentFormValues = z.infer<typeof paymentSchema>;
