'use strict';

let expenses = [];

function initExpenses() {
  expenses = [];
}

function filter(cb) {
  return expenses.filter(cb);
}

function getExpense(id) {
  return expenses.find(expense => expense.id === id);
}

function getExpenses() {
  return expenses;
}

function createExpense(expense) {
  expenses.push(expense);
}

function removeExpense(id) {
  expenses = expenses.filter(expense => expense.id !== id);
}

function updateExpense(expenseId, updateData) {
  const expenseToUdpate = expenses.find(expense => expense.id === expenseId);

  Object.assign(expenseToUdpate, updateData);
}

module.exports = {
  initExpenses,
  getExpense,
  getExpenses,
  createExpense,
  removeExpense,
  updateExpense,
  filter,
};
