'use strict';

const { getMaxId } = require('../helpers/getMaxId');

let EXPENSES = [];

const create = (expense) => {
  const newExpense = {
    ...expense,
    id: getMaxId(EXPENSES) + 1,
  };

  EXPENSES.push(newExpense);

  return newExpense;
};

const getAll = () => {
  return EXPENSES;
};

const getById = (expenseId) => {
  return EXPENSES.find(expense => expense.id === +expenseId);
};

const remove = (expenseId) => {
  EXPENSES = EXPENSES.filter(expense => expense.id !== +expenseId);
};

const update = (expenseId, data) => {
  const foundExpense = EXPENSES.find(expense => expense.id === +expenseId);

  Object.assign(foundExpense, data);

  return foundExpense;
};

const clear = () => {
  EXPENSES = [];
};

module.exports = {
  create,
  getAll,
  getById,
  remove,
  update,
  clear,
};
