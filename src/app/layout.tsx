import "./globals.css"
import { Inter } from "next/font/google"
import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Quiz App",
  description: "A Kahoot-like quiz application",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <main className="container mx-auto px-4 py-8">
            <div className="flex justify-end mb-4">
              <ThemeToggle />
            </div>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}

