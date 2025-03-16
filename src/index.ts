import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import ActivityRoutes from "./routes/activity";

const app = new Hono();

app.use(logger());
app.use(cors());

app.route("/activity", ActivityRoutes);

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  () => {
    console.log(`Server is running`);
  },
);
