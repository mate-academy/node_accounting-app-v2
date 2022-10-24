'use strict';

// eslint-disable-next-line prefer-const
let expenses = [];
let id = 1;

function initExpenses() {
  expenses = [];
}

function getAll() {
  return expenses;
}

function create(name) {
  const newExpense = {
    id: id++,
    name,
  };

  expenses.push(expenses);

  return newExpense;
}

module.exports = {
  create,
  initExpenses,
  getAll,
};
