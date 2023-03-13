'use strict';

const { getNewId } = require('../utils/generateId.js');

let expenses = [];

const getInitial = () => {
  expenses = [];
};

const getAll = (userId, from, to, category) => {
  if (!userId && !from && !to && !category) {
    return expenses;
  }

  return expenses.filter(e => {
    const isFilteredByUser = userId
      ? e.userId === userId
      : true;

    const isFromMatches = from
      ? e.spentAt >= from
      : true;

    const isToMatches = to
      ? e.spentAt <= to
      : true;

    const isFilteredByCategory = category
      ? e.category === category
      : true;

    return isFilteredByUser && isFromMatches
      && isToMatches && isFilteredByCategory;
  });
};

const getById = (expenseId) => {
  const foundExpense = expenses.find(exp => exp.id === expenseId);

  return foundExpense || null;
};

const create = (options) => {
  const newExpense = {
    id: getNewId(expenses),
    ...options,
  };

  expenses.push(newExpense);

  return newExpense;
};

const remove = (expenseId) => {
  expenses = expenses.filter(exp => exp.id !== expenseId);
};

const update = (expenseId, options) => {
  const expense = getById(expenseId);

  Object.assign(expense, options);

  return expense;
};

module.exports = {
  expenseService: {
    getAll,
    create,
    getById,
    remove,
    update,
    getInitial,
  },
};
