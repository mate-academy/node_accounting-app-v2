'use strict';

let expenses = [];

const getAll = () => {
  return expenses;
};

const add = expense => {
  expenses.push(expense);

  return expense;
};

const getById = id => {
  return expenses.find(expense => expense.id === id) || null;
};

const remove = id => {
  expenses = expenses.filter(expense => expense.id !== id);
};

const updateById = (id, body) => {
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
  getById,
  remove,
  updateById,
};
