'use strict';

const { getNewId } = require('../utils/helpers');

let expenses = [];

const getAll = (filters) => {
  const {
    userId,
    from,
    to,
    categories,
  } = filters;

  if (+userId) {
    expenses = expenses.filter(expense => expense.userId === +userId);
  }

  if (from) {
    expenses = expenses.filter(expense => expense.spentAt >= from);
  }

  if (to) {
    expenses = expenses.filter(expense => expense.spentAt <= to);
  }

  if (categories) {
    expenses
      = expenses.filter(expense => categories.includes(expense.category));
  }

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
