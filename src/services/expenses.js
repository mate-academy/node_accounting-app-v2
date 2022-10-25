'use strict';

let expenses = [];

function getAll() {
  return expenses;
}

function init() {
  expenses = [];
}

function findById(id) {
  return expenses.find(expense => expense.id === id);
}

function add(expense) {
  expenses.push(expense);
}


function remove(id) {
  expenses = expenses.filter(expense => expense.id !== id);
}

function update(expenseId, updateData) {
  const expenseToUdpate = expenses.find(expense => expense.id === expenseId);

  Object.assign(expenseToUdpate, updateData);
}

function filter(callback) {
  return expenses.filter(callback);
}

module.exports = {
  getAll,
  init,
  add,
  remove,
  findById,
  update,
  filter,
};
