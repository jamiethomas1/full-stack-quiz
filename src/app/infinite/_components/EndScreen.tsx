import { Button } from "@/components/ui/button";
import Link from "next/link";

/**
 * @summary This screen shows at the end of a quiz, displaying scores and options
 * @params questionCount - Total number of questions asked in the preceding quiz
 * @params correctCount - Total number of correct answers in preceding quiz
 */
export default function EndScreen({ questionCount, correctCount }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-center">
        You correctly answered {correctCount} out of {questionCount} questions
      </p>
      <div className="flex flex-col items-center gap-2 w-fit mx-auto">
        <Link href="/infinite">
          <Button>Start a new quiz</Button>
        </Link>
        <Button>Change quiz mode</Button>
        <Link href="/">
          <Button>Back to home</Button>
        </Link>
      </div>
    </div>
  );
}
