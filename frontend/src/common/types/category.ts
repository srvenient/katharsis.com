import { z } from "zod";

export const CategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  tenant_id: z.number().optional(),
});

export type Category = z.infer<typeof CategorySchema>;