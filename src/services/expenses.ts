import { Expense } from '../types/expense';

let expenses: Expense[] = [{
  id: 1,
  userId: 2,
  spentAt: 'dsfkjghkdjf',
  title: 'Hairdryer',
  amount: 100,
  category: 'Electronics',
  note: 'Wife',
},
{
  id: 2,
  userId: 1,
  spentAt: 'dsfkjghkdjf',
  title: 'Toy',
  amount: 50,
  category: 'Electronics',
  note: 'Kid',
}];

export function getAll() {
  return expenses;
}

export function findExpenseById(expenseId: number) {
  const foundExpense = expenses
    .find(expense => expense.id === Number(expenseId));

  return foundExpense || null;
}

export function addOne(body: Omit<Expense, 'id'>) {
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

  Object.assign(foundExpense, ...body);

  return foundExpense;
}

export function deleteOne(expenseId: number) {
  const filteredExpenses: Expense[] = expenses
    .filter(expense => expense.id !== Number(expenseId));

  expenses = filteredExpenses;
}
