'use strict';

let expenses = [];

const getById = id => {
  return expenses.find(expense => expense.id === id) || null;
};

const getAll = () => expenses;

const add = expense => {
  expenses.push(expense);
};

const update = (id, body) => {
  const expense = getById(id);

  if (!expense) {
    return;
  }

  Object.assign(expense, body);

  return expense;
};

const remove = id => {
  expenses = expenses.filter(expense => expense.id !== id);
};

const clearExpenses = () => {
  expenses.length = 0;
};

module.exports = {
  getAll,
  add,
  remove,
  getById,
  update,
  clearExpenses,
};
