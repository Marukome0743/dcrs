import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"

export const users = pgTable("users", {
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
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert

const client = postgres(process.env.POSTGRES_URL as string)
export const db = drizzle(client)
