import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Welcome to Quiz App</h1>
      <div className="space-y-4">
        <Link href="/create-room">
          <Button className="w-full">Create a Room</Button>
        </Link>
        <Link href="/join-room">
          <Button className="w-full" variant="outline">
            Join a Room
          </Button>
        </Link>
      </div>
    </div>
  )
}

