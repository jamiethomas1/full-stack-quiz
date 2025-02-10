"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { env } from "@/env.mjs";
import shuffleArray from "@/lib/shuffle-array";

export default function PlayQuiz() {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["quiz-random-single"],
    queryFn: async () => {
      const response = await fetch(
        `${env.NEXT_PUBLIC_OPENTDB_API_URL}?amount=1`,
      );
      return await response.json();
    },
  });

  if (isPending) return <p>Loading...</p>;

  if (error) return <p>An error has occurred: {error.message}</p>;

  if (isFetching) return <p>Fetching...</p>;

  if (data.response_code !== 0)
    return <p>Unhandled response code: {data.response_code}</p>;

  const answers = shuffleArray([
    ...data.results[0].incorrect_answers,
    data.results[0].correct_answer,
  ]);

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Play Quiz</h1>
      <div className="bg-secondary shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl text-primary font-semibold mb-4">
          {data.results[0].question}
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {answers.map((answer, index) => (
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
