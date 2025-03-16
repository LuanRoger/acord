import { postActivityValidator } from "@/middlewares/validation/activity";
import { Hono } from "hono";
import { bearerAuth } from "@/middlewares/authorization";
import { InternalActivityStorage } from "@/storage/activity";

const activityRoutes = new Hono<{ Bindings: Env }>();

activityRoutes.get("/", (c) => {
  const activity = InternalActivityStorage.getInstance().getActivity();

  if (!activity) {
    return c.notFound();
  }

  return c.json(activity);
});

activityRoutes.post("/", bearerAuth, postActivityValidator, (c) => {
  const activityData = c.req.valid("json");

  InternalActivityStorage.getInstance().setActivity(activityData);

  return c.json(activityData, 201);
});

activityRoutes.get("/metadata", (c) => {
  const metadata = InternalActivityStorage.getInstance().getMetadata();

  return c.json(metadata);
});

export default activityRoutes;
