import {
  pgTable,
  text,
  timestamp,
  integer,
  uuid,
  unique,
} from "drizzle-orm/pg-core";

import { user } from "./authTables";
import { sql } from "drizzle-orm";

export const totalScore = pgTable(
  "total_score",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    userId: text("user_id")
      .references(() => user.id, { onDelete: "cascade" })
      .notNull(),
    quizType: text("quiz_type").notNull(),
    numQuestions: integer("num_questions").notNull(),
    numCorrect: integer("num_correct").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [unique().on(table.userId, table.quizType)],
);
