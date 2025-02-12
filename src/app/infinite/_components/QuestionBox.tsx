"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function QuestionBox({
  question,
  nextQuestionAction,
}: {
  question: Question;
  nextQuestionAction: () => void;
}) {
  const { question_text, correct_answer, available_answers } = question;

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  function handleNextButtonClick() {
    setSelectedAnswer(null);
    nextQuestionAction();
  }

  return (
    <>
      <div className="bg-secondary shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl text-primary font-semibold mb-4">
          {question_text}
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {available_answers.map((answer, index) => (
            <Button
              key={answer}
              variant={selectedAnswer === index ? "default" : "outline"}
              className="h-20 text-lg"
              onClick={() => setSelectedAnswer(index)}
            >
              {answer}
            </Button>
          ))}
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          disabled={selectedAnswer === null}
          onClick={handleNextButtonClick}
        >
          Next
        </Button>
      </div>
    </>
  );
}
