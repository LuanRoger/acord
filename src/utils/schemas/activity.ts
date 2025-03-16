import { z } from "zod";

export const setActivitySchema = z.object({
  state: z.string(),
  details: z.string(),
  startTimestamp: z.union([z.number(), z.date()]).optional(),
  endTimestamp: z.union([z.number(), z.date()]).optional(),
  largeImageKey: z.string().optional(),
  smallImageKey: z.string().optional(),
  largeImageText: z.string().optional(),
  smallImageText: z.string().optional(),
});

export type SetActivity = z.infer<typeof setActivitySchema>;
