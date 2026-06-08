import "./load-env";
import { createClient } from "@libsql/client";
import { eq } from "drizzle-orm";
import { createTables } from "./ddl";
import { db } from "./index";
import { user } from "./schema";
import { seedContent } from "./seed";
import { auth } from "../auth";

async function main() {
  const url = process.env.DATABASE_URL ?? "file:./local.db";
  const email = process.env.ADMIN_EMAIL ?? "admin@muliaindahwisata.id";
  const password = process.env.ADMIN_PASSWORD ?? "MuliaIndah#2026";
  const name = process.env.ADMIN_NAME ?? "H. Faisal R.";

  console.log("→ Creating tables…");
  const client = createClient({ url });
  await createTables(client);

  console.log("→ Seeding content…");
  await seedContent();

  console.log("→ Ensuring admin user…");
  const existing = await db.select().from(user).where(eq(user.email, email));
  if (existing.length === 0) {
    await auth.api.signUpEmail({ body: { email, password, name } });
    // Mark verified so login isn't gated even if config changes later.
    await db.update(user).set({ emailVerified: true }).where(eq(user.email, email));
    console.log(`  ✓ Admin created: ${email}`);
  } else {
    console.log(`  • Admin already exists: ${email}`);
  }

  console.log("\n✅ Database ready.");
  console.log(`   Admin login → ${email} / ${password}`);
  process.exit(0);
}

main().catch((err) => {
  console.error("Setup failed:", err);
  process.exit(1);
});
