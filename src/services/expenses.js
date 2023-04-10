'use strict';

let expenses = [];

function resetExpenses() {
  expenses = [];
};

function getLastId() {
  if (!expenses.length) {
    return 1;
  }

  const ids = expenses.map(expense => expense.id);

  return Math.max(...ids) + 1;
};

function getAll() {
  return expenses;
};

function getById(expenseId) {
  const foundExpense = expenses
    .find(expense => expense.id === Number(expenseId));

  return foundExpense || null;
};

function create(data) {
  const newExpense = {
    id: getLastId(),
    ...data,
  };

  expenses.push(newExpense);

  return newExpense;
};

function remove(expenseId) {
  expenses = expenses.filter(expense => expense.id !== Number(expenseId));
};

function update(expenseId, data) {
  const foundExpense = getById(expenseId);

  Object.assign(foundExpense, { ...data });

  return foundExpense;
};

module.exports = {
  getAll,
  getById,
  create,
  resetExpenses,
  remove,
  update,
};
