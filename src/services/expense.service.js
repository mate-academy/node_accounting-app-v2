'use strict';

const { getId } = require('./getId');

const expenses = [];

const init = () => {
  expenses.length = 0;
};

const getAll = (params) => {
  const {
    userId,
    categories,
    from,
    to,
  } = params;

  const filteredExpenses = expenses.filter(expense => {
    if (userId && expense.userId !== +userId) {
      return false;
    }

    if (categories && !categories.includes(expense.category)) {
      return false;
    }

    if (from && Date.parse(expense.spentAt) < Date.parse(from)) {
      return false;
    }

    if (to && Date.parse(expense.spentAt) > Date.parse(to)) {
      return false;
    }

    return true;
  });

  return filteredExpenses;
};

const getById = (expenseId) => {
  const choosedExpense = expenses.find(expense => expense.id === +expenseId);

  return choosedExpense;
};

const update = (choosedExpense, data) => {
  return Object.assign(choosedExpense, data);
};

const remove = (expenseId) => {
  const index = expenses.findIndex(expense => expense.id === +expenseId);

  if (index > -1) {
    expenses.splice(index, 1);
  }
};

const create = (data) => {
  const newExpense = {
    id: getId(expenses),
    ...data,
  };

  expenses.push(newExpense);

  return newExpense;
};

module.exports = {
  init,
  getAll,
  getById,
  update,
  remove,
  create,
};
