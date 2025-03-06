"use client";

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect } from "react";

interface EndScreenProps {
  questionCount: number;
  correctCount: number;
  newQuizAction: () => void;
}

/**
 * @summary This screen shows at the end of a quiz, displaying scores and options
 * @params questionCount - Total number of questions asked in the preceding quiz
 * @params correctCount - Total number of correct answers in preceding quiz
 * @params newQuiz - Function called on clicking 'Start a new quiz'
 */
export default function EndScreen({
  questionCount,
  correctCount,
  newQuizAction,
}: EndScreenProps) {
  const trpc = useTRPC();

  const scoreMutationOptions = trpc.score.mutationOptions();
  const mutationKey = trpc.score.mutationKey();
  const { mutate, isPending, isError, isSuccess } = useMutation({
    ...scoreMutationOptions,
    mutationKey,
  });

  useEffect(() => {
    if (isSuccess) return;

    mutate({
      quiz_type: "infinite",
      num_questions: questionCount,
      num_correct: correctCount,
    });
  }, [isSuccess, questionCount, correctCount, mutate]);

  const pendingMessage = <p>Submitting score...</p>;
  const failureMessage = (
    <p className="font-bold text-destructive">Failed to submit score</p>
  );

  return (
    <div className="flex flex-col gap-4">
      <p className="text-center">
        You correctly answered {correctCount} out of {questionCount} questions
      </p>
      {isPending ? pendingMessage : <></>}
      {isError ? failureMessage : <></>}
      {isSuccess ? <p>Score submitted</p> : <></>}
      <div className="flex flex-col items-center gap-2 w-fit mx-auto">
        <Button onClick={newQuizAction}>Start a new quiz</Button>
        <Button>Change quiz mode</Button>
        <Link href="/">
          <Button>Back to home</Button>
        </Link>
      </div>
    </div>
  );
}
