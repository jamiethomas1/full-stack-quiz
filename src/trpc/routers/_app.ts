import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";
import { db } from "@/lib/db";
import { score } from "@/db/schema/score";

export const appRouter = createTRPCRouter({
  score: baseProcedure
    .input(
      z.object({
        quiz_type: z.string(),
        num_questions: z.number().positive(),
        num_correct: z.number().positive(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.userId) {
        throw new Error("Unauthorized");
      }

      await db.insert(score).values({
        userId: ctx.userId,
        quizType: input.quiz_type,
        numQuestions: input.num_questions,
        numCorrect: input.num_correct,
      });
    }),
});

export type AppRouter = typeof appRouter;
