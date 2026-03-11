"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Wallet } from "lucide-react"
import type { FinancialSummary } from "@/lib/types"

interface FinancialSummaryCardsProps {
  summary: FinancialSummary
}

export function FinancialSummaryCards({ summary }: FinancialSummaryCardsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="border-0 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Income
          </CardTitle>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-success/10">
            <TrendingUp className="h-4 w-4 text-success" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-success">
            {formatCurrency(summary.totalIncome)}
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Expenses
          </CardTitle>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-destructive/10">
            <TrendingDown className="h-4 w-4 text-destructive" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-destructive">
            {formatCurrency(summary.totalExpenses)}
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Net Balance
          </CardTitle>
          <div className={`flex h-9 w-9 items-center justify-center rounded-full ${
            summary.balance >= 0 ? "bg-success/10" : "bg-destructive/10"
          }`}>
            <Wallet className={`h-4 w-4 ${
              summary.balance >= 0 ? "text-success" : "text-destructive"
            }`} />
          </div>
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${
            summary.balance >= 0 ? "text-success" : "text-destructive"
          }`}>
            {summary.balance >= 0 ? "+" : ""}{formatCurrency(summary.balance)}
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            {summary.balance >= 0 ? "Profit" : "Loss"}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
