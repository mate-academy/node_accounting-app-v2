import { v4 as uuidv4 } from 'uuid';

const expenses = [];

export function getAllExpenses(userId, categories, dateFrom, dateTo) {
  let filteredExpenses = expenses;

  if (typeof userId === 'number') {
    filteredExpenses = filteredExpenses.filter((e) => e.userId === userId);
  }

  if (Array.isArray(categories)) {
    filteredExpenses = filteredExpenses.filter((c) => categories.includes(c));
  }

  if (typeof dateFrom === 'string') {
    const date = new Date(dateFrom);

    filteredExpenses = filteredExpenses.filter((d) => date > d);
  }

  if (typeof dateTo === 'string') {
    const date = new Date(dateTo);

    filteredExpenses = filteredExpenses.filter((d) => d < date);
  }

  return filteredExpenses;
}

export function getSingleExpense(id) {
  return expenses.find((e) => e.id === id);
}

export function addExpense({ userId, title, amount, category, note }) {
  const date = new Date();
  const expense = {
    id: uuidv4(),
    userId,
    spentAt: date.toDateString(),
    title,
    amount,
    category,
    note,
  };

  expenses.push(expense);

  return expenses;
}

export function removeExpense(id) {
  const index = expenses.findIndex((e) => e.id === id);

  if (index === -1) {
    return;
  }

  const [exp] = expenses.splice(index, 1);

  return exp;
}

export function updateExpense({
  id,
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) {
  const exp = expenses.find((e) => e.id === id);

  if (!exp) {
    return;
  }

  return Object.assign(exp, {
    id,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });
}

export const expenseService = {
  getAllExpenses,
  getSingleExpense,
  addExpense,
  removeExpense,
  updateExpense,
};
