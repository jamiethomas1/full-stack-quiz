import { auth } from "@/lib/auth";
import { headers } from "next/headers";

interface SignedInProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export async function SignedIn({ children, fallback = null }: SignedInProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session ? <>{children}</> : <>{fallback}</>;
}

export async function SignedOut({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) return null;

  return <>{children}</>;
}
