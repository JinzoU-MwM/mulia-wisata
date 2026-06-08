import fs from "fs";
import path from "path";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema";

const url = process.env.DATABASE_URL ?? "file:./local.db";

function ensureParentDir(dbUrl: string) {
  if (dbUrl.startsWith("file:")) {
    const filePath = dbUrl.slice("file:".length);
    const dir = path.dirname(filePath);
    if (dir && dir !== "." && dir !== "/") {
      try {
        fs.mkdirSync(dir, { recursive: true });
      } catch {
        /* ignore — surfaced later if the path is truly unwritable */
      }
    }
  }
}

type DrizzleDb = ReturnType<typeof drizzle<typeof schema>>;

// Reuse across hot reloads in dev to avoid exhausting connections.
const globalForDb = globalThis as unknown as { __db?: DrizzleDb };

function getDb(): DrizzleDb {
  if (!globalForDb.__db) {
    ensureParentDir(url);
    const client = createClient({ url });
    globalForDb.__db = drizzle(client, { schema });
  }
  return globalForDb.__db;
}

/**
 * Lazy proxy: the database connection is only opened on first use, so simply
 * importing this module (e.g. during a production build that doesn't query the
 * DB) never connects. This lets the app build without a live database.
 */
export const db = new Proxy({} as DrizzleDb, {
  get(_target, prop) {
    const real = getDb() as unknown as Record<string | symbol, unknown>;
    const value = real[prop];
    return typeof value === "function" ? value.bind(real) : value;
  },
});

export { schema };
