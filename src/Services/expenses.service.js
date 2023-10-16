'use strict';

let expenses = [];

const getAll = () => {
  return expenses;
};

const getById = (id) => {
  return expenses.find(expense => expense.id === id) || null;
};

const add = (expense) => {
  expenses.push(expense);
};

const remove = (id) => {
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

module.exports = {
  getAll,
  add,
  remove,
  getById,
  update,
};
