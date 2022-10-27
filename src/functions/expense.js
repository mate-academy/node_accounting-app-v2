'use strict';

let expenses = [];

function init() {
  expenses = [];
};

function getAllExpense() {
  return expenses;
};

function findById(id) {
  const foundExpense = expenses.find(expense => expense.id === id);

  return foundExpense || null;
};

function add(expense) {
  expenses.push(expense);
};

function remove(id) {
  expenses = expenses.filter(expense => expense.id !== id);
};

function update(expense, updateData) {
  Object.assign(expense, updateData);
};

function filter(callback) {
  return expenses.filter(callback);
};

module.exports = {
  init,
  getAllExpense,
  add,
  remove,
  findById,
  update,
  filter,
};
