/* eslint-disable function-paren-newline */
const { v4: uuidv4 } = require('uuid');

const expenses = [];

function getAllExpenses(userId, categories, dateFrom, dateTo) {
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

function getSingleExpense(id) {
  return expenses.find((e) => e.id === id);
}

function addExpense({ userId, title, amount, category, note }) {
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

function removeExpense(id) {
  const index = expenses.findIndex((e) => e.id === id);

  if (index === -1) {
    return;
  }

  const [exp] = expenses.splice(index, 1);

  return exp;
}

function updateExpense({ id, userId, spentAt, title, amount, category, note }) {
  const exp = expenses.find((e) => e.id === id);

  if (!exp) {
    return;
  }

  if (userId !== undefined) {
    exp.userId = userId;
  }

  if (spentAt !== undefined) {
    exp.spentAt = spentAt;
  }

  if (title !== undefined) {
    exp.title = title;
  }

  if (amount !== undefined) {
    exp.amount = amount;
  }

  if (category !== undefined) {
    exp.category = category;
  }

  if (note !== undefined) {
    exp.note = note;
  }

  return exp;
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
