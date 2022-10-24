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

function findUserExpenses(id, category) {
  let userExpenses = expenses
    .filter(expense => expense.userId === Number(id));

  if (category) {
    userExpenses = expenses
      .filter(expense => expense.category === category);
  }

  return userExpenses;
}

function filteredFromTo(from, to) {
  return expenses.filter(
    (expense) => expense.spentAt >= from && expense.spentAt <= to);
};

function update(title, expense) {
  return Object.assign(expense, { title });
};

function remove(id) {
  expenses = expenses.filter(expense => expense.id !== id);
};

module.exports.expenseService = {
  getAll,
  add,
  init,
  findById,
  update,
  remove,
  findUserExpenses,
  filteredFromTo,
};
