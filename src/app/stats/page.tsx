import { Redirect, SignedIn } from "@/components/AuthWrapper";

interface StatBoxProps {
  stat: string;
  description: string;
}

function StatBox({ stat, description }: StatBoxProps) {
  return (
    <div className="bg-accent rounded-lg p-4 flex-column justify-between">
      <h3 className="font-bold text-5xl">{stat}</h3>
      <p>{description}</p>
    </div>
  );
}

export default function StatsPage() {
  return (
    <SignedIn fallback={<Redirect to="/" />}>
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-6">Stats</h1>
        <h2 className="text-xl font-bold mb-6">Infinite Mode</h2>
        <div className="grid grid-cols-2 gap-6">
          <StatBox stat="20" description="Total" />
          <StatBox stat="15" description="Correct" />
          <StatBox stat="5" description="Incorrect" />
          <StatBox stat="75%" description="Success rate" />
        </div>
      </div>
    </SignedIn>
  );
}
