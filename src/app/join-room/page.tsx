import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function JoinRoom() {
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Join a Room</h1>
      <form className="space-y-4">
        <div>
          <Label htmlFor="room-code">Room Code</Label>
          <Input id="room-code" placeholder="Enter room code" />
        </div>
        <div>
          <Label htmlFor="nickname">Your Nickname</Label>
          <Input id="nickname" placeholder="Enter your nickname" />
        </div>
        <Button type="submit" className="w-full">
          Join Room
        </Button>
      </form>
      <div className="mt-4">
        <Link href="/">
          <Button variant="link">Back to Home</Button>
        </Link>
      </div>
    </div>
  )
}

