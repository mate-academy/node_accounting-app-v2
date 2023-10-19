'use strict';

let expenses = [];

const getAll = () => expenses;

const getById = id => {
  return expenses.find(expense => expense.id === id) || null;
};

const add = expense => {
  expenses.push(expense);
};

const remove = id => {
  expenses = expenses.filter(expense => expense.id !== id);
};

const update = (id, body) => {
  const expense = getById(id);

  if (!expense) {
    return;
  }

  Object.assign(expense, body);

  return expense;
};

const clear = () => {
  expenses.length = 0;
};

module.exports = {
  getAll,
  add,
  remove,
  getById,
  update,
  clear,
};
