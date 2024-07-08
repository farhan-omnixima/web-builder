import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema";

const dbUrl = process.env.DB_URL!;
const dbAuth = process.env.DB_TOKEN!;

export const client = createClient({ url:dbUrl, authToken: dbAuth});
const db = drizzle(client, {
    schema: {
        ...schema
    }
});

export default db;

export type DrizzleClient = typeof db;