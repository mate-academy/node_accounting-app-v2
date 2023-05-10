'use strict';

let expenses = [];

function getAll() {
  return expenses;
}

function getById(expenseId) {
  return expenses.find(expense => expense.id === expenseId);
}

function add(expense) {
  expenses.push(expense);
}

function remove(expenseId) {
  expenses = expenses.filter(expense => expense.id !== expenseId);
}

function update(expense, data) {
  Object.assign(expense, data);
}

function clear() {
  expenses = [];
}

module.exports = {
  getAll,
  add,
  remove,
  getById,
  update,
  clear,
};
