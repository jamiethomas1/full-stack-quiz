"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { redirect } from "next/navigation";
import { Skeleton } from "./ui/skeleton";

export default function UserActions() {
  const { data: session, isPending, refetch } = authClient.useSession();
  const user = session?.user;

  function handleSignOut() {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          refetch();
          redirect("/");
        },
      },
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {isPending ? (
          <Skeleton className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full" />
        ) : (
          <Avatar className="cursor-pointer">
            <AvatarImage src={user?.image as string | undefined} />
            <AvatarFallback>Avatar</AvatarFallback>
          </Avatar>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => {}}>Profile</DropdownMenuItem>
        <DropdownMenuItem onClick={() => redirect("/stats")}>
          Stats
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => {}}>Settings</DropdownMenuItem>
        <DropdownMenuItem onClick={handleSignOut}>Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
