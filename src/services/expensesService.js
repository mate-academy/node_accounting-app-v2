import { v4 as uuidv4 } from 'uuid';

let expenses = [
  {
    id: 1,
    userId: 0,
    spentAt: '2022-10-28T12:54:43.881Z',
    title: 'string',
    amount: 0,
    category: 'string',
    note: 'string',
  },
];

export function getExpenses() {
  return expenses;
}

export function getExpense(id) {
  const expense = expenses.find((e) => e.id === +id);

  return expense || null;
}

export function createExpense(userId, spentAt, title, amount, category, note) {
  const newExpense = {
    id: uuidv4(),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpense);

  return newExpense;
}

export function removeUser(id) {
  expenses = expenses.filter(expense => expense.id !== +id);
}

export function updateExpense(id, params) {
  const foundExpense = getExpense(id);

  Object.assign(foundExpense, { ...params });

  return foundExpense;
}
