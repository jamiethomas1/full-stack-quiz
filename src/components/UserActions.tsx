"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function UserActions() {
  const { data: session } = authClient.useSession();

  const user = session?.user;

  return (
    <Avatar>
      <AvatarImage src={user?.image as string | undefined} />
      <AvatarFallback>Avatar</AvatarFallback>
    </Avatar>
  );
}
