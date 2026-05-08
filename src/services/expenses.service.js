'use strict';

const expenses = [];
let currentExpenseId = 1;

function getAllExpenses() {
  return expenses;
}

function createExpense(userId, spentAt, title, amount, category, note) {
  const newExpense = {
    id: currentExpenseId++,
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

function getExpenseById(id) {
  return expenses.find((expense) => expense.id === id);
}

function removeExpenseById(id) {
  const expenseIndex = expenses.findIndex((expense) => expense.id === id);

  if (expenseIndex === -1) {
    return null;
  }

  const [removedExpense] = expenses.splice(expenseIndex, 1);

  return removedExpense;
}

function updateExpenseById(id, updates) {
  const expense = expenses.find((exp) => exp.id === id);

  if (!expense) {
    return null;
  }

  return Object.assign(expense, updates);
}

function clearExpenses() {
  expenses.length = 0;
  currentExpenseId = 1;
}

module.exports = {
  getAllExpenses,
  createExpense,
  getExpenseById,
  removeExpenseById,
  updateExpenseById,
  clearExpenses,
};
