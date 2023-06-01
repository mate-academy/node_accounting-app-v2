'use strict';

const { filterExpanses } = require('../utils/filterExpanses.js');
const { createId } = require('../utils/createId.js');

let expenses = [];

const resetExpenses = () => {
  expenses = [];
};

function getExpenses(queryParams) {
  expenses = expenses.filter(expense => filterExpanses(expense, queryParams));

  return expenses;
}

function getExpenseById(expensesId) {
  const foundExpense = expenses.find(({ id }) => id === Number(expensesId));

  return foundExpense || null;
}

function createExpense(data) {
  const newExpense = {
    id: createId(expenses),
    ...data,
  };

  expenses.push(newExpense);

  return newExpense;
}

function removeExpense(expensesId) {
  expenses = expenses.filter(({ id }) => id !== Number(expensesId));
}

function updateExpense({ expensesId, data }) {
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
  resetExpenses,
};
