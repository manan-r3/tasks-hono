import { serve } from "@hono/node-server";
import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import tasksHandler from "./modules/tasks/tasksHandlers.js";

const app = new OpenAPIHono();

// use logger
app.use(logger());

// use prettyJSON
app.use(prettyJSON());

// The openapi.json will be available at /doc
app.doc("/doc", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Todo API",
  },
});

// swagger ui doc will be available at {server url}/ui
// fell free to change the url
// swaggerUI url must have same path as openapi.json
app.get("/ui", swaggerUI({ url: "/doc" }));

app.route("/api/tasks", tasksHandler);

// handle 404
app.notFound((c) => {
  return c.json({ message: "404: Not Found" }, 404);
});

// handle 500
app.onError((err, c) => {
  return c.json({ error: err.message }, 500);
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
