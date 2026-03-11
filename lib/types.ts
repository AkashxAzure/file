export interface Transaction {
  id: string
  type: 'income' | 'expense'
  amount: number
  category: string
  description: string | null
  date: string
  created_at: string
}

export interface TransactionFormData {
  type: 'income' | 'expense'
  amount: number
  category: string
  description: string
  date: string
}

export interface FinancialSummary {
  totalIncome: number
  totalExpenses: number
  balance: number
}
