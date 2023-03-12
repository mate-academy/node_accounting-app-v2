'use strict';

const { generateId } = require('../helper/idGenerator.js');

let expenses = [];

const getFirst = () => {
  expenses = [];
};

const getAll = (userId, from, to, category) => {
  if (!userId && !from && !to && !category) {
    return expenses;
  }

  return expenses.filter(exp => {
    const filteredUsers = userId
      ? exp.userId === userId
      : true;

    const validFrom = from
      ? exp.spentAt >= from
      : true;

    const validTo = to
      ? exp.spentAt <= to
      : true;

    const filteredCategory = category
      ? exp.category === category
      : true;

    return filteredUsers && validFrom && validTo && filteredCategory;
  });
};

const getById = (expenseId) => {
  const foundExpense = expenses.find(e => e.id === expenseId);

  return foundExpense || null;
};

const create = (options) => {
  const newExpense = {
    id: generateId(expenses),
    ...options,
  };

  expenses.push(newExpense);

  return newExpense;
};

const remove = (expenseId) => {
  expenses = expenses.filter(e => e.id !== expenseId);
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
    getFirst,
  },
};
