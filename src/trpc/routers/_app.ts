import { createTRPCRouter } from "../init";
import { quizRouter } from "./quizRouter";

export const appRouter = createTRPCRouter({
  quizRouter,
});

export type AppRouter = typeof appRouter;
