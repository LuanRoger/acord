import { setActivitySchema } from "@/utils/schemas/activity";
import { zValidator } from "@hono/zod-validator";

export const postActivityValidator = zValidator("json", setActivitySchema);
