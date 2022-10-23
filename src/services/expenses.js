'use strict';

let expenses = [];

function getAllExpenses() {
  return expenses;
}

function add(expense) {
  expenses.push(expense);
}

function initializeExpenses() {
  expenses = [];
}

function getExpenseById(id) {
  return expenses.find((expense) => expense.id === Number(id));
}

function removeExpenseById(id) {
  expenses = expenses.filter((expense) => expense.id !== Number(id));
}

function updateExpense(expense, updateData) {
  Object.assign(expense, updateData);
}

function filter(callback) {
  return expenses.filter(callback);
}

module.exports = {
  getAllExpenses,
  add,
  initializeExpenses,
  getExpenseById,
  removeExpenseById,
  updateExpense,
  filter,
};
