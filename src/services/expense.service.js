'use strict';

const { getId } = require('./getId');

const expenses = [];

const init = () => {
  expenses.length = 0;
};

const getAll = (params) => {
  let filteredExpenses = expenses;
  const {
    userId,
    categories,
    from,
    to,
  } = params;

  if (userId) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.userId === +userId);
  }

  if (categories) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.category === categories);
  }

  if (from && to) {
    const dateFrom = new Date(from);
    const dateTo = new Date(to);

    filteredExpenses = filteredExpenses
      .filter(expense => dateFrom <= new Date(expense.spentAt)
      && new Date(expense.spentAt) <= dateTo);
  }

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
