'use strict';
/* eslint-disable max-len */

let expenses = [];

function getFilteredExpenses({
  userId, from, to, categories,
}) {
  if (userId) {
    expenses = expenses.filter(expense => expense.userId === parseInt(userId));
  }

  if (from && to) {
    const fromDate = new Date(from);
    const toDate = new Date(to);

    expenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.spentAt);

      return expenseDate >= fromDate && expenseDate <= toDate;
    });
  }

  if (categories) {
    expenses = expenses.filter(expense => expense.category === categories);
  }

  return expenses;
};

function getExpenseById(expenseId) {
  const foundExpense = expenses.find(user => user.id === parseInt(expenseId));

  return foundExpense || null;
};

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
};

function deleteExpense(expenseId) {
  expenses = expenses.filter(expense => expense.id !== parseInt(expenseId));
};

function updateExpense(id, expenseBody) {
  const updatedExpense = getExpenseById(id);

  Object.assign(updatedExpense, expenseBody);

  return updatedExpense;
};

function clearExpenses() {
  expenses = [];
};

module.exports = {
  getFilteredExpenses,
  getExpenseById,
  createExpense,
  deleteExpense,
  updateExpense,
  clearExpenses,
};
