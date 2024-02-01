'use strict';

const { v4: uuid } = require('uuid');

let expenses = [];

const get = () => {
  return expenses;
};

const getById = (id) => {
  return expenses.find(us => us.id === id) || null;
};

const create = (data) => {
  const expense = {
    ...data,
    id: uuid(),
  };

  expenses.push(expense);

  return expenses;
};

const update = (id, data) => {
  const expense = getById(id);

  if (expense) {
    Object.assign(expense, { ...data });

    return expense;
  }
};

const remove = (id) => {
  expenses = expenses.filter(expense => expense.id !== id);
};

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
};
