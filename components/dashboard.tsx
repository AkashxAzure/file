"use client"

import { useCallback } from "react"
import useSWR from "swr"
import { createClient } from "@/lib/supabase/client"
import { FinancialSummaryCards } from "@/components/financial-summary"
import { TransactionForm } from "@/components/transaction-form"
import { TransactionsList } from "@/components/transactions-list"
import type { Transaction, TransactionFormData, FinancialSummary } from "@/lib/types"
import { useState } from "react"

const supabase = createClient()

async function fetchTransactions(): Promise<Transaction[]> {
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .order("date", { ascending: false })
    .order("created_at", { ascending: false })

  if (error) throw error
  return data || []
}

function calculateSummary(transactions: Transaction[]): FinancialSummary {
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0)

  return {
    totalIncome,
    totalExpenses,
    balance: totalIncome - totalExpenses,
  }
}

export function Dashboard() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)

  const {
    data: transactions = [],
    error,
    isLoading,
    mutate,
  } = useSWR("transactions", fetchTransactions)

  const summary = calculateSummary(transactions)

  const handleAddTransaction = useCallback(
    async (formData: TransactionFormData) => {
      setIsSubmitting(true)
      try {
        const { error } = await supabase.from("transactions").insert([
          {
            type: formData.type,
            amount: formData.amount,
            category: formData.category,
            description: formData.description || null,
            date: formData.date,
          },
        ])

        if (error) throw error
        await mutate()
      } catch (err) {
        console.error("Error adding transaction:", err)
      } finally {
        setIsSubmitting(false)
      }
    },
    [mutate]
  )

  const handleDeleteTransaction = useCallback(
    async (id: string) => {
      setIsDeleting(id)
      try {
        const { error } = await supabase
          .from("transactions")
          .delete()
          .eq("id", id)

        if (error) throw error
        await mutate()
      } catch (err) {
        console.error("Error deleting transaction:", err)
      } finally {
        setIsDeleting(null)
      }
    },
    [mutate]
  )

  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-destructive">Error loading data</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Please try refreshing the page.
          </p>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="mt-3 text-sm text-muted-foreground">Loading your finances...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <FinancialSummaryCards summary={summary} />
      
      <div className="grid gap-6 lg:grid-cols-2">
        <TransactionForm onSubmit={handleAddTransaction} isSubmitting={isSubmitting} />
        <TransactionsList
          transactions={transactions}
          onDelete={handleDeleteTransaction}
          isDeleting={isDeleting}
        />
      </div>
    </div>
  )
}
