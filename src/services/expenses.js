'use strict';

const { createId } = require('../helpers/createId');

let expenses = [];

function getExpenses(query) {
  const { userId, categories = [], from, to } = query;

  return expenses.filter(expense => {
    if (userId && expense.userId !== +userId) {
      return false;
    }

    if (from && expense.spentAt < from) {
      return false;
    }

    if (to && expense.spentAt > to) {
      return false;
    }

    if (categories.length > 0 && !categories.includes(expense.category)) {
      return false;
    }

    return true;
  });
};

function getExpense(expenseId) {
  const foundExpense = expenses.find(expense => expense.id === +expenseId);

  return foundExpense || null;
};

function createExpense(body) {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = body;

  const newExpense = {
    id: createId(expenses),
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

function updateExpense(expenseId, body) {
  const expense = getExpense(expenseId) || {};

  Object.assign(expense, body);

  return expense;
};

function deleteExpense(expenseId) {
  expenses = expenses.filter(({ id }) => id !== +expenseId);
}

function deleteAllExpenses() {
  expenses = [];
};

module.exports = {
  getExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
  deleteAllExpenses,
};
