"use client";

import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

interface SignedInProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function SignedIn({ children, fallback = null }: SignedInProps) {
  const { data: session } = authClient.useSession();

  return session ? <>{children}</> : <>{fallback}</>;
}

export function SignedOut({ children }: { children: React.ReactNode }) {
  const { data: session } = authClient.useSession();

  if (session) return null;

  return <>{children}</>;
}

export function Redirect({ to }: { to: string }): never {
  redirect(to);
}
