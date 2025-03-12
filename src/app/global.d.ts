declare global {
  type QuestionWithoutAnswer = {
    question_id: number;
    question_text: string;
    available_answers: string[];
  };

  type QuestionWithAnswer = {
    question_id: number;
    question_text: string;
    correct_answer: number;
    available_answers: string[];
  };

  type QuestionAnswer = {
    question_id: number;
    correct_answer: number;
  };
}

export {};
