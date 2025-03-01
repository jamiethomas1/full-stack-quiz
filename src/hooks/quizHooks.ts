import { env } from "@/env.mjs";
import shuffleArray from "@/lib/shuffle-array";
import { useQuery } from "@tanstack/react-query";

interface OpenTDBQuestion {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

/**
 * @summary Replaces encoded symbols in a string.
 * @param encodedString - The string containing encoded symbols
 * @returns The decoded string
 */
function decodeHtmlEntities(encodedString: string): string {
  const parser = new DOMParser();
  const decoded = parser.parseFromString(encodedString, "text/html").body
    .textContent;
  return decoded || "";
}

/**
 * @param count - The number of questions to fetch
 * @param categoryId - OpenTDB category ID
 * @returns Separate question and answer arrays
 */
export function useTrivia(count: number, categoryId?: number) {
  const { isPending, error, data, isFetching, refetch } = useQuery({
    queryKey: [count, categoryId],
    queryFn: async () => {
      const response = await fetch(
        `${env.NEXT_PUBLIC_OPENTDB_API_URL}?amount=${count}${categoryId ? "&category=" + categoryId : ""}`,
      );
      return await response.json();
    },
    refetchOnWindowFocus: false,
  });

  if (!data) {
    return {
      isPending,
      error,
      questions: [],
      answers: [],
      isFetching,
      refetch,
    };
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

  const _questions: QuestionWithAnswer[] = results.map(
    (question: OpenTDBQuestion, index: number) => {
      const available_answers = shuffleArray([
        question.correct_answer,
        ...question.incorrect_answers,
      ]);
      const correct_answer = available_answers.indexOf(question.correct_answer);

      return {
        question_text: decodeHtmlEntities(question.question),
        correct_answer,
        available_answers: available_answers.map(decodeHtmlEntities),
        question_id: index,
      };
    },
  );

  const questions: QuestionWithoutAnswer[] = _questions.map(
    (question: QuestionWithAnswer) => {
      return {
        ...question,
        correct_answer: null,
      };
    },
  );

  const answers: QuestionAnswer[] = _questions.map(
    (question: QuestionWithAnswer) => {
      return {
        question_id: question.question_id,
        correct_answer: question.correct_answer,
      };
    },
  );

  return { isPending, error, questions, answers, isFetching, refetch };
}
