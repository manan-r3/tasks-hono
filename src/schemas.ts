import { z } from "@hono/zod-openapi";

export const authorSchema = z.object({
  name: z.string(),
  age: z.number(),
});
