import Link from "next/link";
import { Button } from "@/components/ui/button";
import QuestionBox from "./_components/QuestionBox";

export default function PlayQuiz() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Play Quiz</h1>
      <QuestionBox />
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
