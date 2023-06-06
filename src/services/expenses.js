/* eslint-disable max-len */
'use strict';

const { v4: uuidv4 } = require('uuid');

let expenses = [];

function getAllExpenses(requestQuery) {
  let filteredExpenses = expenses;

  const { userId, categories, from, to } = requestQuery;

  if (userId) {
    filteredExpenses = filteredExpenses.filter(expense => (
      expense.userId === Number(userId)
    ));
  };

  if (categories) {
    filteredExpenses = filteredExpenses.filter(expense => (
      categories.includes(expense.category)
    ));
  }

  if (from && to) {
    filteredExpenses = filteredExpenses.filter(expense => (
      expense.spentAt >= from && expense.spentAt <= to
    ));
  }

  return filteredExpenses;
};

function getExpenseById(expenseId) {
  const foundExpenses = expenses.find(expense => expense.id === Number(expenseId));

  return foundExpenses || null;
}

function createExpense(requestBody) {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = requestBody;

  const newExpense = {
    id: parseInt(uuidv4(), 16),
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

function removeExpense(expenseId) {
  expenses = expenses.filter(expense => (
    expense.id !== Number(expenseId)));
}

function updateExpense(expenseId, requestBody) {
  const expense = getExpenseById(expenseId);

  Object.assign(expense, requestBody);
}

function resetExpenses() {
  expenses = [];
}

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  removeExpense,
  updateExpense,
  resetExpenses,
};
