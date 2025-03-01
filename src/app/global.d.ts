declare global {
  interface QuestionWithoutAnswer {
    question_id: number;
    question_text: string;
    available_answers: string[];
  }

  interface QuestionWithAnswer {
    question_id: number;
    question_text: string;
    correct_answer: number;
    available_answers: string[];
  }

  interface QuestionAnswer {
    question_id: number;
    correct_answer: number;
  }
}

export {};
