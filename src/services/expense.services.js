'use strict';

const { getId } = require('./getId');

const expenses = [];

const init = () => {
  expenses.length = 0;
};

const getAll = (params) => {
  let filteredExpenses = expenses;

  if (params.userId) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.userId === +params.userId);
  }

  if (params.categories) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.category === params.categories);
  }

  if (params.from && params.to) {
    const dateFrom = new Date(params.from);
    const dateTo = new Date(params.to);

    filteredExpenses = filteredExpenses
      .filter(expense => dateFrom <= new Date(expense.spentAt)
        && new Date(expense.spentAt) <= dateTo);
  }

  return filteredExpenses;
};

const getById = (id) => {
  const choosedUser = expenses.find(expense => expense.id === +id);

  return choosedUser;
};

const create = (data) => {
  const newExpense = {
    id: getId(expenses),
    ...data,
  };

  expenses.push(newExpense);

  return newExpense;
};

const update = (choosedExpense, data) => {
  return Object.assign(choosedExpense, data);
};

const remove = (id) => {
  const index = expenses.findIndex(expense => expense.id === +id);

  if (index > -1) {
    expenses.splice(index, 1);
  }
};

module.exports = {
  init,
  getAll,
  getById,
  create,
  update,
  remove,
};
