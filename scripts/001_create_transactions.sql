-- Create transactions table for tracking income and expenses
CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
  amount DECIMAL(12, 2) NOT NULL CHECK (amount > 0),
  category TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster date-based queries
CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(date DESC);
CREATE INDEX IF NOT EXISTS idx_transactions_type ON transactions(type);

-- Enable Row Level Security
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Allow public read/write access (since we're not using auth for this simple app)
CREATE POLICY "Allow public read access" ON transactions FOR SELECT USING (true);
CREATE POLICY "Allow public insert access" ON transactions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access" ON transactions FOR UPDATE USING (true);
CREATE POLICY "Allow public delete access" ON transactions FOR DELETE USING (true);
