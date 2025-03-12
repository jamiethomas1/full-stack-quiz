import { Combobox } from "@/components/Combobox";
import { categories } from "./categories";
import { Button } from "@/components/ui/button";

type QuizStartProps = {
  action: () => void;
  setCategoryAction: (value: string) => void;
};

/**
 * @summary This screen shows at the start of a quiz, allowing the user to change quiz settings
 */
export default function QuizStart({
  action,
  setCategoryAction,
}: QuizStartProps) {
  return (
    <div className="flex flex-col gap-4">
      <Combobox
        items={categories}
        defaultText="Select category"
        notFoundText="No category found"
        action={setCategoryAction}
      />
      <Button onClick={action}>Start quiz</Button>
    </div>
  );
}
