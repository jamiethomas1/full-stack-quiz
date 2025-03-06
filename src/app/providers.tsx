import { TRPCReactProvider } from "@/trpc/client";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <TRPCReactProvider>{children}</TRPCReactProvider>;
}
