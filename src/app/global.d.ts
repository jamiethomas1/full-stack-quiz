declare global {
  interface OpenTDBQuestion {
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
  }

  interface Question {
    question_text: string;
    correct_answer: string;
    available_answers: string[];
  }
}

export {};
