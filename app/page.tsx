import { Dashboard } from "@/components/dashboard"
import { Wallet } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Wallet className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">FinTrack</h1>
              <p className="text-xs text-muted-foreground">Financial Management</p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>
          <p className="mt-1 text-muted-foreground">
            Track your daily income and expenses to monitor your financial health.
          </p>
        </div>

        <Dashboard />
      </main>

      <footer className="border-t border-border/50 bg-card py-6">
        <div className="mx-auto max-w-6xl px-4 text-center text-sm text-muted-foreground sm:px-6 lg:px-8">
          FinTrack - Keep your finances on track
        </div>
      </footer>
    </div>
  )
}
