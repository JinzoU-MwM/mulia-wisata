import { config } from "dotenv";

// Mirror Next.js env precedence for the CLI scripts (db:setup / db:seed):
//   .env  <  .env.<NODE_ENV>  <  .env.local
// So `NODE_ENV=production npm run db:setup` uses the VPS DATABASE_URL.
config();
const nodeEnv = process.env.NODE_ENV;
if (nodeEnv) config({ path: `.env.${nodeEnv}`, override: true });
config({ path: ".env.local", override: true });
