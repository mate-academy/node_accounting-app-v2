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

  return expense;
};

const updateById = (id, body) => {
  const expense = getById(id);

  if (!expense) {
    return;
  }

  Object.assign(expense, body);

  return expense;
};

const remove = (id) => {
  expenses = expenses.filter(expense => expense.id !== id);
};

module.exports = {
  getAll,
  getById,
  add,
  updateById,
  remove,
};
