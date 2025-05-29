import { z } from "zod";

export const ProductSchema = z.object({
  code: z.string().max(20),
  name: z.string().max(100),
  description: z.string().nullable().optional(),
  purchase_price: z.number().min(0).default(0),
  sale_price: z.number().min(0).default(0),
  current_stock: z.number().int().min(0).default(0),
  minimum_stock: z.number().int().min(0).default(0),
  last_updated: z.coerce.date().nullable().optional()
});

export type Product = z.infer<typeof ProductSchema>;