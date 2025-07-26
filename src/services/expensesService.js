const userService = require('../services/userService');

let expenses = [];
let nextId = 1;

function getExpenses() {
  return expenses;
}

function getExpenseById(id) {
  return expenses.find((item) => item.id === Number(id)) || null;
}

function createExpense({ userId, spentAt, title, amount, category, note }) {
  const user = userService.getUserById(userId);

  if (!user) {
    return null;
  }

  const newExpense = {
    id: nextId++,
    userId,
    spentAt,
    title,
    amount,
    category,
    note: note || '',
  };

  expenses.push(newExpense);

  return newExpense;
}

function updateExpense(id, { userId, spentAt, title, amount, category, note }) {
  const expense = getExpenseById(id);

  if (!expense) {
    return null;
  }

  expense.userId = userId ?? expense.userId;
  expense.spentAt = spentAt ?? expense.spentAt;
  expense.title = title ?? expense.title;
  expense.amount = amount ?? expense.amount;
  expense.category = category ?? expense.category;
  expense.note = note ?? expense.note;

  return expense;
}

function deleteExpense(id) {
  const initialLength = expenses.length;

  expenses = expenses.filter((expense) => expense.id !== Number(id));

  return expenses.length !== initialLength;
}

function resetExpenses() {
  expenses = [];
  nextId = 1;
}

module.exports = {
  getExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
  resetExpenses,
};
