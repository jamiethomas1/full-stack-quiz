"use client";

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
