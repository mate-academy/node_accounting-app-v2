import { Expense } from '../types/expense';

let expenses: Expense[] = [];

export function getAll() {
  return expenses;
}

function findExpenseById(expenseId: number) {
  const foundExpense = expenses
    .find(expense => expense.id === Number(expenseId));

  return foundExpense || null;
}

export function addOne(body: Expense) {
  const maxID: number = Math.max(...expenses.map(expense => expense.id));
  const newExpense = {
    id: maxID > 0 ? (maxID + 1) : 1,
    ...body,
  };

  expenses.push(newExpense);

  return newExpense;
}

export function updateOne(expenseId: number, body: Partial<Expense[]>) {
  const foundExpense: Expense | null = findExpenseById(expenseId);

  return Object.assign(foundExpense?, ...body);
}

export function deleteOne(expenseId: number) {
  const filteredExpenses: Expense[] = expenses
    .filter(expense => expense.id !== Number(expenseId));

  expenses = filteredExpenses;
}
