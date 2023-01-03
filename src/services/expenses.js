'use strict';

let expenses = [];

function clear() {
  expenses = [];
}

function getExpenses(userId = null, category = null, from = null, to = null) {
  let currentExpenses = expenses;

  if (userId) {
    currentExpenses = currentExpenses
      .filter(expense => expense.userId === Number(userId));
  }

  if (category) {
    currentExpenses = currentExpenses
      .filter(expense => expense.category === category);
  }

  if (from) {
    currentExpenses = currentExpenses
      .filter(expense => expense.spentAt > from);
  }

  if (to) {
    currentExpenses = currentExpenses
      .filter(expense => expense.spentAt < to);
  }

  return currentExpenses;
}

function createExpense(userId, spentAt, title, amount, category, note) {
  const newExpense = {
    id: expenses.length + 1,
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

function getExpenseById(expenseId) {
  const foundExpense = expenses
    .find(expense => expense.id === Number(expenseId));

  return foundExpense || null;
}

function deleteExpense(expenseId) {
  expenses = expenses.filter(expense => expense.id !== Number(expenseId));
}

function updateExpense(expenseId, body) {
  const expense = getExpenseById(expenseId);

  Object.assign(expense, body);

  return expense;
}

module.exports = {
  clear,
  getExpenses,
  createExpense,
  getExpenseById,
  deleteExpense,
  updateExpense,
};
