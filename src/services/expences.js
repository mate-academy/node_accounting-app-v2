'use strict';

const { generateId } = require('../helpers/generateId');

const expenses = [];

function getAll(expensesArr, userId, categories, from, to) {
  let filteredExpenses = expensesArr;

  if (userId) {
    filteredExpenses = filteredExpenses
      .filter((expense) => expense.userId === userId);
  }

  if (categories) {
    filteredExpenses = filteredExpenses
      .filter((expense) => categories.includes(expense.category));
  }

  if (from) {
    const fromDate = new Date(from);

    filteredExpenses = filteredExpenses
      .filter((expense) => new Date(expense.date) >= fromDate);
  }

  if (to) {
    const toDate = new Date(to);

    filteredExpenses = filteredExpenses
      .filter((expense) => new Date(expense.date) <= toDate);
  }

  return filteredExpenses;
}

function getExpenseById(expenseId) {
  const foundExpense = expenses
    .find(expense => expense.id === Number(expenseId));

  return foundExpense || null;
}

function createExpense(expenseData) {
  const newId = generateId(expenses);

  const newExpense = {
    id: newId,
    ...expenseData,
    spentAt: new Date(expenseData.spentAt),
  };

  expenses.push(newExpense);

  return newExpense;
};

function removeExpense(expenseId) {
  expenses.filter(expense => expense.id !== Number(expenseId));
}

function updateExpense(expenseId, expenseData) {
  const expense = getExpenseById(expenseId);

  Object.assign(expense, expenseData);

  return expense;
}

module.exports = {
  getAll,
  getExpenseById,
  createExpense,
  removeExpense,
  updateExpense,
};
