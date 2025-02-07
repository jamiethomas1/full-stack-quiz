"use client";

import { redirect } from "next/navigation";
import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";

export function SignInButton() {
  async function handleSignIn() {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/play-quiz",
    });
  }

  return <Button onClick={handleSignIn}>Sign In</Button>;
}

export function SignOutButton() {
  async function handleSignOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          redirect("/");
        },
      },
    });
  }

  return <Button onClick={handleSignOut}>Sign Out</Button>;
}
