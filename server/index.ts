import { serve } from "bun";
import app from "./app";

const PORT = process.env.PORT || 3000;

serve({
  port: PORT,
  hostname: "0.0.0.0",
  fetch: app.fetch,
});

console.log("server running on port " + PORT);
