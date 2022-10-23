'use strict';

let expenses = [];

function getAll() {
  return expenses;
};

function init() {
  expenses = [];
}

function add(newExpense) {
  expenses.push(newExpense);
};

function findById(id) {
  const foundExpense = expenses.find(expense => expense.id === id);

  return foundExpense || null;
};

function update(title, expense) {
  return Object.assign(expense, { title });
}

function remove(id) {
  expenses = expenses.filter(expense => expense.id !== id);
};

module.exports.expensesService = {
  getAll,
  add,
  init,
  findById,
  update,
  remove,
};
