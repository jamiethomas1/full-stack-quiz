"use client";

import { Button } from "@/components/ui/button";
import QuestionBox from "./_components/QuestionBox";
import { useTrivia } from "@/hooks/quizHooks";
import QuestionBoxSkeleton from "./_components/QuestionBoxSkeleton";
import { useEffect, useRef, useState } from "react";
import EndScreen from "./_components/EndScreen";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import QuizStart from "./_components/QuizStart";

enum QuizState {
  START_SCREEN,
  IN_PROGRESS,
  END,
}

/**
 * @summary Infinite questions mode
 */
export default function Infinite() {
  const [category, setCategory] = useState<string>("");
  const { isPending, error, questions, answers, refetch } = useTrivia(
    10,
    category,
  );

  const [index, setIndex] = useState<number>(0);
  const [quizState, setQuizState] = useState<QuizState>(QuizState.START_SCREEN);

  const questionCount = useRef(0);
  const correctCount = useRef(0);

  useEffect(() => {
    if (!error) return;

    toast.error("API Error", {
      description: error.message,
    });
  }, [error]);

  useEffect(() => {
    if (quizState !== QuizState.IN_PROGRESS) return;

    refetch();
  }, [quizState, refetch]);

  async function resetQuizState() {
    await refetch();
    setIndex(0);
    questionCount.current = 0;
    correctCount.current = 0;
    setQuizState(QuizState.START_SCREEN);
  }

  async function handleStartQuiz() {
    setQuizState(QuizState.IN_PROGRESS);
  }

  async function handleIncrementIndex() {
    if (index === 9) {
      await refetch();
      return setIndex(0);
    }

    setIndex((index) => index + 1);
  }

  function handleCorrectAnswer() {
    correctCount.current++;
  }

  function getAnswer(): number {
    questionCount.current++;
    return answers[index].correct_answer;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Infinite Mode</h1>

      <Toaster position="top-center" richColors />

      {quizState === QuizState.START_SCREEN ? (
        <QuizStart action={handleStartQuiz} setCategoryAction={setCategory} />
      ) : (
        <></>
      )}

      {(isPending || !questions.length) &&
      quizState === QuizState.IN_PROGRESS ? (
        <QuestionBoxSkeleton />
      ) : (
        <></>
      )}

      {quizState === QuizState.IN_PROGRESS && questions.length ? (
        <QuestionBox
          question={questions[index]}
          nextQuestionAction={handleIncrementIndex}
          getCorrectAnswer={getAnswer}
          incrementCorrect={handleCorrectAnswer}
        />
      ) : (
        <></>
      )}

      {quizState === QuizState.END ? (
        <EndScreen
          questionCount={questionCount.current}
          correctCount={correctCount.current}
          newQuizAction={resetQuizState}
        />
      ) : (
        <></>
      )}

      {quizState === QuizState.IN_PROGRESS ? (
        <div className="mt-4">
          <Button variant="outline" onClick={() => setQuizState(QuizState.END)}>
            End Quiz
          </Button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
