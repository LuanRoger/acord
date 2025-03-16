import { env } from "hono/adapter";
import { bearerAuth as bearerAuthHono } from "hono/bearer-auth";

export const bearerAuth = bearerAuthHono({
  verifyToken: async (token, c) => {
    const { AUTH_TOKEN } = env(c);

    return token === AUTH_TOKEN;
  },
});
