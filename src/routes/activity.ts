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

activityRoutes.post("/", bearerAuth, postActivityValidator, async (c) => {
  const activityData = c.req.valid("json");

  const newActivityStatus =
    await InternalActivityStorage.getInstance().setActivity(activityData);

  return c.json(newActivityStatus, 201);
});

activityRoutes.delete("/", bearerAuth, (c) => {
  InternalActivityStorage.getInstance().clearActivity();

  return c.body(null, 204);
});

activityRoutes.get("/metadata", (c) => {
  const metadata = InternalActivityStorage.getInstance().getMetadata();

  return c.json(metadata);
});

export default activityRoutes;
