"use client";

import { Redirect, SignedIn } from "@/components/AuthWrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

type StatBoxProps = {
  stat: string | number;
  description: string;
};

function StatBox({ stat, description }: StatBoxProps) {
  return (
    <div className="bg-accent rounded-lg p-4 flex-column justify-between">
      <h3 className="font-bold text-5xl">{stat}</h3>
      <p>{description}</p>
    </div>
  );
}

function StatsSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-6">
      <Skeleton className="bg-accent rounded-lg p-4 flex-column justify-between" />
      <Skeleton className="bg-accent rounded-lg p-4 flex-column justify-between" />
      <Skeleton className="bg-accent rounded-lg p-4 flex-column justify-between" />
      <Skeleton className="bg-accent rounded-lg p-4 flex-column justify-between" />
    </div>
  );
}

export default function StatsPage() {
  const trpc = useTRPC();

  const [infinite, setInfinite] = useState<{
    questions: number;
    correct: number;
  }>({ questions: 0, correct: 0 });

  const infiniteIncorrect = infinite.questions - infinite.correct;
  const infinitePercentage =
    infinite.questions === 0
      ? 0
      : (infinite.correct / infinite.questions) * 100;

  const { data, isPending } = useQuery(
    trpc.quizRouter.totalScore.queryOptions({ quiz_type: "infinite" }),
  );

  useEffect(() => {
    if (!data) return;

    setInfinite({
      questions: data[0].numQuestions,
      correct: data[0].numCorrect,
    });
  }, [data]);

  return (
    <SignedIn fallback={<Redirect to="/" />}>
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-6">Stats</h1>
        <h2 className="text-xl font-bold mb-6">Infinite Mode</h2>
        {isPending ? <StatsSkeleton /> : <></>}
        {!isPending ? (
          <div className="grid grid-cols-2 gap-6">
            <StatBox
              stat={Math.floor(infinite.questions)}
              description="Total"
            />
            <StatBox
              stat={Math.floor(infinite.correct)}
              description="Correct"
            />
            <StatBox
              stat={Math.floor(infiniteIncorrect)}
              description="Incorrect"
            />
            <StatBox
              stat={`${Math.floor(infinitePercentage)}%`}
              description="Success rate"
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    </SignedIn>
  );
}
