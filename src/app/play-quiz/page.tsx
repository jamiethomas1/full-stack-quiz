"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PlayQuiz() {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const dummyQuestion = {
    question: "What is the capital of France?",
    answers: ["London", "Berlin", "Paris", "Madrid"],
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Play Quiz</h1>
      <div className="bg-secondary shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl text-primary font-semibold mb-4">
          {dummyQuestion.question}
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {dummyQuestion.answers.map((answer, index) => (
            <Button
              key={index}
              variant={selectedAnswer === index ? "default" : "outline"}
              className="h-20 text-lg"
              onClick={() => setSelectedAnswer(index)}
            >
              {answer}
            </Button>
          ))}
        </div>
      </div>
      <div className="flex justify-between">
        <Button disabled>Previous</Button>
        <Button>Next</Button>
      </div>
      <div className="mt-4">
        <Link href="/">
          <Button variant="link">Exit Quiz</Button>
        </Link>
      </div>
    </div>
  );
}
