/* eslint-disable max-len */
'use strict';

// const generateId = require('../utils/generateId.js');

let expenses = [];

const getInitialExpenses = () => {
  expenses = [];

  return expenses;
};

function getExpenses(userId, categories, from, to) {
  const demandExpenses = expenses.filter(expense => (
    (!userId || expense.id === Number(userId))
    && (!categories || categories.includes(expense.category))
    && (!from || expense.spentAt >= from)
    && (!to || expense.spentAt <= to)
  ));

  return demandExpenses;
}

function getExpenseById(expensesId) {
  const foundExpense = expenses.find(expense => expense.id === Number(expensesId));

  return foundExpense || null;
}

function createExpense(data) {
  const newExpense = {
    id: (Math.max(...expenses.map(element => element.id), 0) + 1),
    ...data,
  };

  expenses.push(newExpense);

  return newExpense;
}

function removeExpense(expensesId) {
  expenses = expenses.filter(expense => expense.id !== Number(expensesId));
}

function updateExpense(expensesId, data) {
  const expense = getExpenseById(expensesId);

  Object.assign(expense, data);

  return expense;
}

module.exports = {
  getExpenses,
  getExpenseById,
  createExpense,
  removeExpense,
  updateExpense,
  getInitialExpenses,
};
