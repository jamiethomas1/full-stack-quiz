import { env } from "@/env.mjs";
import shuffleArray from "@/lib/shuffle-array";
import { useQuery } from "@tanstack/react-query";

interface OpenTDBQuestion {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

/**
 * @summary Decodes a base64 string, accounting for special characters
 * @param str - The base64 string to decode
 * @returns The decoded utf-8 string
 */
function b64DecodeUnicode(str: string) {
  // Going backwards: from bytestream, to percent-encoding, to original string.
  return decodeURIComponent(
    atob(str)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(""),
  );
}

/**
 * @summary useQuery wrapper that gets `count` number of OpenTDB questions
 * @param count - The number of questions to fetch
 * @param categoryId - OpenTDB category ID
 * @returns Separate question and answer arrays
 */
export function useTrivia(count: number, categoryId?: number | string) {
  const { isPending, error, data, isFetching, refetch } = useQuery({
    queryKey: [count, categoryId],
    queryFn: async () => {
      const response = await fetch(
        `${env.NEXT_PUBLIC_OPENTDB_API_URL}?amount=${count}&encode=base64${categoryId ? "&category=" + categoryId : ""}`,
      );
      return await response.json();
    },
    refetchOnWindowFocus: false,
    enabled: false,
  });

  if (!data || error) {
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

  let triviaError = "";

  switch (response_code) {
    case 0: {
      break;
    }
    case 1: {
      triviaError =
        "Count parameter is larger than number of available questions";
      break;
    }
    case 2: {
      triviaError = "Invalid parameters in query to OpenTDB";
      break;
    }
    case 5: {
      triviaError = "Rate limit exceeded";
      break;
    }
    default: {
      triviaError = `Unhandled response code ${response_code}`;
    }
  }

  if (triviaError !== "") {
    return {
      isPending,
      error: new Error(triviaError),
      questions: [],
      answers: [],
      isFetching,
      refetch,
    };
  }

  const _questions: QuestionWithAnswer[] = results.map(
    (question: OpenTDBQuestion, index: number) => {
      const available_answers = shuffleArray([
        question.correct_answer,
        ...question.incorrect_answers,
      ]);

      const correct_answer = available_answers.indexOf(question.correct_answer);

      return {
        question_text: b64DecodeUnicode(question.question),
        correct_answer,
        available_answers: available_answers.map(b64DecodeUnicode),
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
