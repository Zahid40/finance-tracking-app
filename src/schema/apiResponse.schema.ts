// /schema/apiResponse.schema.ts
import { z } from "zod";

export const ApiResponseSchema = z.object({
  message: z.string(),
  status: z.number(),
  data: z.union([z.object({}).passthrough(), z.array(z.any()), z.null()]),
});
