"use client";

import { redirect } from "next/navigation";
import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";

export function SignInOutButton() {
  const { data: session, refetch } = authClient.useSession();

  async function handleSignIn() {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/play-quiz",
    });
  }

  async function handleSignOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          refetch();
          redirect("/");
        },
      },
    });
  }

  if (session) {
    return <Button onClick={handleSignOut}>Sign Out</Button>;
  }

  return <Button onClick={handleSignIn}>Sign In</Button>;
}
