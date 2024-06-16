import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"

export const user = pgTable("User", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("createdAt", { withTimezone: true })
    .defaultNow()
    .notNull(),
  name: text("name").notNull(),
  company: text("company").notNull(),
  employeeId: text("employeeId").notNull().unique(),
  telephone: text("telephone").notNull(),
  email: text("email").notNull(),
  image: text("image").notNull(),
})
export type User = typeof user.$inferSelect
export type NewUser = typeof user.$inferInsert

const client = postgres(process.env.POSTGRES_URL as string)
export const db = drizzle(client)
