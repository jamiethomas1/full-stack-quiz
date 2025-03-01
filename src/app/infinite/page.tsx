"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import QuestionBox from "./_components/QuestionBox";
import { useTrivia } from "@/hooks/quizHooks";
import QuestionBoxSkeleton from "./_components/QuestionBoxSkeleton";
import { useEffect, useState } from "react";

export default function Infinite() {
  const { isPending, questions, answers, refetch } = useTrivia(10);

  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    if (index === 9) {
      refetch();
      setIndex(0);
    }
  }, [index, refetch]);

  function handleIncrementIndex() {
    setIndex((index) => index + 1);
  }

  function getAnswer(): number {
    return answers[index].correct_answer;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Infinite Mode</h1>
      {isPending ? (
        <QuestionBoxSkeleton />
      ) : (
        <QuestionBox
          question={questions[index]}
          nextQuestionAction={handleIncrementIndex}
          getCorrectAnswer={() => getAnswer()}
        />
      )}
      <div className="mt-4">
        <Link href="/">
          <Button variant="link">Exit Quiz</Button>
        </Link>
      </div>
    </div>
  );
}
