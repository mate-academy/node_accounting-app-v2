'use strict';

const generateUniqueId = require('generate-unique-id');

let expenses = [];

function init() {
  expenses = [];
};

function getAll() {
  return expenses;
};

function getExpenseById(expenseId) {
  const foundExpense = expenses
    .find(expense => expense.id === Number(expenseId));

  return foundExpense || null;
}

function getExpenseByCategory(category) {
  const categoryExpenses = expenses
    .filter(expense => expense.category === category);

  return categoryExpenses;
}

function getExpenseByUser(userId) {
  const userExpenses = expenses
    .filter(expense => expense.userId === Number(userId));

  return userExpenses;
}

function getExpensesBetweenDates(from, to) {
  const expensesBetweenDates = expenses
    .filter(({ spentAt }) => spentAt >= from && spentAt <= to);

  return expensesBetweenDates;
}

function createExprense(expensesKey) {
  const newExpense = {
    id: Number(generateUniqueId({
      length: 16,
      useLetters: false,
    })),
    ...expensesKey,
  };

  expenses.push(newExpense);

  return newExpense;
}

function removeExpense(expenseId) {
  expenses = expenses
    .filter(expense => expense.id !== Number(expenseId));
};

function updateUser({ id, expensesKey }) {
  const expense = getExpenseById(id);

  Object.assign(expense, expensesKey);

  return expense;
};

module.exports = {
  getAll,
  getExpenseById,
  createExprense,
  removeExpense,
  updateUser,
  init,
  getExpenseByCategory,
  getExpenseByUser,
  getExpensesBetweenDates,
};
