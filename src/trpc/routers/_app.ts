import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";
import { db } from "@/lib/db";
import { score } from "@/db/schema/score";
import { totalScore } from "@/db/schema/totalScore";

export const appRouter = createTRPCRouter({
  score: baseProcedure
    .input(
      z.object({
        quiz_type: z.enum(["infinite"]),
        num_questions: z.number().gte(0),
        num_correct: z.number().gte(0),
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

      await db
        .insert(totalScore)
        .values({
          userId: ctx.userId,
          quizType: input.quiz_type,
          numQuestions: input.num_questions,
          numCorrect: input.num_correct,
        })
        .onConflictDoUpdate({
          target: [totalScore.userId, totalScore.quizType],
          set: {
            numQuestions: input.num_questions,
            numCorrect: input.num_correct,
          },
        });
    }),
});

export type AppRouter = typeof appRouter;
