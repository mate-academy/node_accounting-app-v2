'use strict';

let expenses = [];

const getAll = () => {
  return expenses;
};

const getById = (id) => {
  return expenses.find(expens => expens.id === id) || null;
};

const add = (expense) => {
  expenses.push(expense);
};

const update = (expens, data) => {
  Object.assign(expens, data);

  return expens;
};

const deleteById = (id) => {
  expenses = expenses.filter(expense => expense.id !== id);
};

const clear = () => {
  expenses.length = 0;
};

module.exports = {
  getAll,
  getById,
  add,
  update,
  deleteById,
  clear,
};
