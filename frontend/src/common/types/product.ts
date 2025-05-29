import { z } from "zod";

export const ProductSchema = z.object({
  id: z.number().int().min(1).default(0),
  code: z.string().max(20),
  name: z.string().max(100),
  description: z.string().nullable().optional(),
  purchase_price: z.number().min(0).default(0),
  sale_price: z.number().min(0).default(0),
  currency: z.string().max(3).default("COP"),
  current_stock: z.number().int().min(0).default(0),
  minimum_stock: z.number().int().min(0).default(0),
  last_updated: z.coerce.date().nullable().optional(),
  category_id: z.number().int().min(1).default(1),
  tenant_id: z.number().int().min(1).default(1),
});

export type Product = z.infer<typeof ProductSchema>;