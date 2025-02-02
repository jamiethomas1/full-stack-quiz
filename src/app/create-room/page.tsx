import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CreateRoom() {
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create a Room</h1>
      <form className="space-y-4">
        <div>
          <Label htmlFor="room-name">Room Name</Label>
          <Input id="room-name" placeholder="Enter room name" />
        </div>
        <div>
          <Label htmlFor="quiz-topic">Quiz Topic</Label>
          <Input id="quiz-topic" placeholder="Enter quiz topic" />
        </div>
        <Button type="submit" className="w-full">
          Create Room
        </Button>
      </form>
      <div className="mt-4">
        <Link href="/">
          <Button variant="link">Back to Home</Button>
        </Link>
      </div>
    </div>
  );
}
