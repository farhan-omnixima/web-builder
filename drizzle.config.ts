import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./lib/schema.ts",
  out: "./migrations",
  dialect: "sqlite",
  driver: "turso",
  dbCredentials: {
    url: process.env.DB_URL as string,
    authToken: process.env.DB_TOKEN as string,
  },
  verbose: true,
  strict: true,
});
