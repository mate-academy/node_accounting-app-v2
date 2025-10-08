/* eslint-disable function-paren-newline */
const { v4: uuidv4 } = require('uuid');

const expenses = [];

export function getAllExpenses(userId, categories, dateFrom, dateTo) {
  let filteredExpenses = expenses;

  if (typeof userId === 'number') {
    filteredExpenses = filteredExpenses.filter((e) => e.userId === userId);
  }

  if (Array.isArray(categories)) {
    filteredExpenses = filteredExpenses.filter((exp) =>
      categories.includes(exp.category),
    );
  }

  if (typeof dateFrom === 'string') {
    filteredExpenses = filteredExpenses.filter(
      (e) => new Date(e.spentAt) >= new Date(dateFrom),
    );
  }

  if (typeof dateTo === 'string') {
    filteredExpenses = filteredExpenses.filter(
      (e) => new Date(e.spentAt) <= new Date(dateTo),
    );
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
    spentAt: date.toISOString(),
    title,
    amount,
    category,
    note,
  };

  expenses.push(expense);

  return expense;
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

module.exports = {
  expenseService: {
    getAllExpenses,
    getSingleExpense,
    addExpense,
    removeExpense,
    updateExpense,
  },
};
