'use strict';

let expenses = [];

function initExpenses() {
  expenses = [];
};

function getAllExpense() {
  return expenses;
};

function findExpenseById(id) {
  const foundExpense = expenses.find(expense => expense.id === id);

  return foundExpense || null;
};

function addExpense(expense) {
  expenses.push(expense);
};

function removeExpense(id) {
  expenses = expenses.filter(expense => expense.id !== id);
};

function updateExpense(expense, updateData) {
  Object.assign(expense, updateData);
};

module.exports = {
  initExpenses,
  getAllExpense,
  addExpense,
  removeExpense,
  findExpenseById,
  updateExpense,
};
