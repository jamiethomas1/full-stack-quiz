import "./globals.css";
import { Inter } from "next/font/google";
import type React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { SignInButton } from "@/components/AuthButtons";
import UserActions from "@/components/UserActions";
import { SignedIn, SignedOut } from "@/components/AuthWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Quiz App",
  description: "A quiz app with rooms",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="container mx-auto px-4 py-8">
            <div className="flex justify-end mb-4 gap-4">
              <ThemeToggle />
              <SignedIn>
                <UserActions />
              </SignedIn>
              <SignedOut>
                <SignInButton />
              </SignedOut>
            </div>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
