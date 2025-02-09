import { serve } from "bun";
import app from "./app";

serve({
  fetch: app.fetch,
});
