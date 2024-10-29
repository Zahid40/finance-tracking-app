// /types/apiResponse.type.ts
import { z } from "zod";
import { ApiResponseSchema } from "../schema/apiResponse.schema";

export type ApiResponseType = z.infer<typeof ApiResponseSchema>;
