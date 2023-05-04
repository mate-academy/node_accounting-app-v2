'use strict';

const { getNewId } = require('../utils/helpers');

let expenses = [];

const getAll = () => {
  return expenses;
};

const getById = (expenseId) => {
  const foundExpense = expenses.find(({ id }) => id === +expenseId);

  return foundExpense || null;
};

const create = (expenseBody) => {
  const newExpense = {
    id: getNewId(expenses),
    ...expenseBody,
  };

  expenses.push(newExpense);

  return newExpense;
};

const remove = (expenseId) => {
  expenses = expenses.filter(({ id }) => id !== +expenseId);
};

const update = (expense, expenseBody) => {
  Object.assign(expense, expenseBody);
};

const reset = () => {
  expenses = [];
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  reset,
};
