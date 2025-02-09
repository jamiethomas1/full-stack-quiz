import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut } from "@/components/AuthWrapper";

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
        <SignedIn>
          <p>You are signed in.</p>
        </SignedIn>
        <SignedOut>
          <p>You are signed out.</p>
        </SignedOut>
      </div>
    </div>
  );
}
