import { betterAuth } from "better-auth";
import { Pool } from "pg";
 
export const auth = betterAuth({
  database: new Pool({
    connectionString: "postgres://potgres:potgres@localhost:5432/potgres",
  }),
});