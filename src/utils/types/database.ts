import { Expense } from './ExpenseType'
import { User } from './UserType'

export type CommonDatabase = {
  users: User[],
  expenses: Expense[],
}

export type Database = 'users' | 'expenses';
