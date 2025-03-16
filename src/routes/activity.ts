import { postActivityValidator } from "@/middlewares/validation/activity";
import { Hono } from "hono";

const activityRoutes = new Hono();

activityRoutes.get("/", (c) => {
  return c.text("Hello Activity!");
});

activityRoutes.post("/", postActivityValidator, (c) => {
  const activityData = c.req.valid("json");
  console.log(activityData);

  return c.json(activityData);
});

export default activityRoutes;
