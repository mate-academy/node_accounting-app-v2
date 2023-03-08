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

    const isFilteredByDate = from && to
      ? getAllBetweenDates(from, to).includes(e)
      : true;

    const isFilteredByCategory = category
      ? e.category === category
      : true;

    return isFilteredByUser && isFilteredByDate && isFilteredByCategory;
  });
};

const getAllBetweenDates = (from, to) => {
  const parsedFromDate = Date.parse(from);
  const parsedToDate = Date.parse(to);

  const foundExpenses = expenses.filter(e => {
    const parsedExpense = Date.parse(e.spentAt);

    return parsedExpense >= parsedFromDate && parsedExpense <= parsedToDate;
  });

  return foundExpenses;
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
    getAllBetweenDates,
    remove,
    update,
    getInitial,
  },
};
