import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function CreateQuiz() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create a Quiz</h1>
      <form className="space-y-6">
        <div>
          <Label htmlFor="quiz-title">Quiz Title</Label>
          <Input id="quiz-title" placeholder="Enter quiz title" />
        </div>
        <div>
          <Label htmlFor="question">Question</Label>
          <Textarea id="question" placeholder="Enter your question" />
        </div>
        <div className="space-y-2">
          <Label>Answers</Label>
          <Input placeholder="Answer 1" />
          <Input placeholder="Answer 2" />
          <Input placeholder="Answer 3" />
          <Input placeholder="Answer 4" />
        </div>
        <div>
          <Label htmlFor="correct-answer">Correct Answer</Label>
          <Input id="correct-answer" placeholder="Enter the correct answer" />
        </div>
        <div className="flex justify-between">
          <Button type="button">Add Question</Button>
          <Button type="submit">Finish Quiz</Button>
        </div>
      </form>
      <div className="mt-4">
        <Link href="/">
          <Button variant="link">Back to Home</Button>
        </Link>
      </div>
    </div>
  )
}

