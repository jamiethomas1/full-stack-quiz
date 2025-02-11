import { env } from "@/env.mjs";
import shuffleArray from "@/lib/shuffle-array";
import { useQuery } from "@tanstack/react-query";

export function useTrivia(count: number, categoryId?: number) {
  const { isPending, error, data, isFetching, refetch } = useQuery({
    queryKey: [count, categoryId],
    queryFn: async () => {
      const response = await fetch(
        `${env.NEXT_PUBLIC_OPENTDB_API_URL}?amount=${count}${categoryId ? "&category=" + categoryId : ""}`,
      );
      return await response.json();
    },
  });

  if (!data) {
    return { isPending, error, questions: [], isFetching, refetch };
  }

  const { results, response_code } = data;

  switch (response_code) {
    case 0: {
      break;
    }
    case 1: {
      console.error(
        "count parameter is larger than number of available questions",
      );
      break;
    }
    case 2: {
      console.error("Invalid parameters in query to OpenTDB");
      break;
    }
    case 5: {
      console.error("Rate limit exceeded");
      break;
    }
    default: {
      console.error(`Unhandled response code ${response_code}`);
    }
  }

  const questions: Question[] = results.map((question: OpenTDBQuestion) => ({
    question: undefined,
    incorrect_answers: undefined,
    question_text: question.question,
    correct_answer: question.correct_answer,
    available_answers: shuffleArray([
      question.correct_answer,
      ...question.incorrect_answers,
    ]),
  }));

  return { isPending, error, questions, isFetching, refetch };
}
