'use strict';

let expenses = [];

function init() {
  expenses = [];
};

function getAll() {
  return expenses;
};

function getExpenseById(id) {
  const foundExpense = expenses.find((expense) => expense.id === id);

  return foundExpense || null;
};

function addExpense(expense) {
  expenses.push(expense);
};

function removeExpense(id) {
  expenses = expenses.filter((expense) => expense.id !== id);
};

function updateExpense(expense, updateData) {
  Object.assign(expense, updateData);
};

function filterExpense(callback) {
  return expenses.filter(callback);
};

module.exports = {
  init,
  getAll,
  getExpenseById,
  addExpense,
  removeExpense,
  updateExpense,
  filterExpense,
};
