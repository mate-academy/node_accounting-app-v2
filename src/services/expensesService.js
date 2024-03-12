'use strict';

const { generateNewID } = require('./genID');

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

const getById = (id) => {
  return expenses.find(expense => expense.id === +id);
};

const create = (data) => {
  const newExpense = {
    id: generateNewID(expenses),
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
