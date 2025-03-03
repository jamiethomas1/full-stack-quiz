import { pgTable, text, timestamp, integer } from "drizzle-orm/pg-core";

import { user } from "./auth";

export const score = pgTable("score", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
  quizType: text("quiz_type").notNull(),
  numQuestions: integer("num_questions").notNull(),
  numCorrect: integer("num_correct").notNull(),
  timeStarted: timestamp("time_started").notNull(),
  timeFinished: timestamp("time_finished").notNull(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});
