"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

/**
 * @summary Used to determine whether to display correct answer
 */
enum QuestionStage {
  Asked,
  Submitted,
}

/**
 * @summary The box encapsulating the question and answer logic
 * @param question - The question metadata
 * @param getCorrectAnswer - Function called on clicking 'Submit'
 * @param nextQuestionAction - Function called on clicking 'Next'
 */
export default function QuestionBox({
  question,
  getCorrectAnswer,
  nextQuestionAction,
}: {
  question: QuestionWithoutAnswer;
  getCorrectAnswer: () => number;
  nextQuestionAction: () => void;
}) {
  const { question_text, correct_answer, available_answers } = question;

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [stage, setStage] = useState<QuestionStage>(QuestionStage.Asked);
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);

  function resetQuestionBox() {
    setSelectedAnswer(null);
    setStage(QuestionStage.Asked);
  }

  function handleNextButtonClick() {
    resetQuestionBox();
    nextQuestionAction();
  }

  function handleSubmitButtonClick() {
    setStage(QuestionStage.Submitted);
    setCorrectAnswer(getCorrectAnswer());
  }

  function getButtonColor(
    index: number,
  ): "default" | "outline" | "success" | "destructive" {
    if (stage === QuestionStage.Submitted) {
      if (index === correctAnswer) {
        return "success";
      }

      if (selectedAnswer !== correctAnswer && selectedAnswer === index) {
        return "destructive";
      }
    }

    if (selectedAnswer !== index) return "outline";

    if (selectedAnswer === correct_answer) return "success";

    return "default";
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
              variant={getButtonColor(index)}
              className="h-20 text-lg"
              onClick={() => setSelectedAnswer(index)}
            >
              {answer}
            </Button>
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        {stage === QuestionStage.Asked && (
          <Button
            disabled={selectedAnswer === null}
            onClick={handleSubmitButtonClick}
          >
            Submit
          </Button>
        )}
        {stage === QuestionStage.Submitted && (
          <Button onClick={handleNextButtonClick}>Next</Button>
        )}
      </div>
    </>
  );
}
