"use client";

import { Button } from "@/components/ui/button";

export default function QuestionBoxSkeleton() {
  return (
    <div className="bg-secondary shadow-md rounded-lg p-6 mb-6">
      <div className="grid grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((el) => (
          <Button key={el} variant="outline" className="h-20 text-lg"></Button>
        ))}
      </div>
    </div>
  );
}
