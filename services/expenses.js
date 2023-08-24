'use strict';

const { generateId } = require('../utils/idGenerator');

const expenses = [];

const getAll = ({ userId, categories, from, to }) => {
  let result = expenses;

  if (userId) {
    result = result.filter(expense => expense.userId === +userId);
  }

  if (categories && categories.length > 0) {
    result = result.filter(({ category }) => categories.includes(category));
  }

  if (from) {
    result = result.filter(({ spentAt }) => {
      return Date.parse(spentAt) >= Date.parse(from);
    });
  }

  if (to) {
    result = result.filter(({ spentAt }) => {
      return Date.parse(spentAt) <= Date.parse(to);
    });
  }

  return result;
};

const getExpenseById = (expenseId) => {
  return expenses.find(({ id }) => id === +expenseId);
};

const createEpxense = (data) => {
  const newExpense = {
    id: generateId(),
    ...data,
  };

  expenses.push(newExpense);

  return newExpense;
};

const removeExpense = (expenseId) => {
  const expenseIndex = expenses.findIndex(({ id }) => id === +expenseId);

  expenses.splice(expenseIndex, 1);
};

const clearExpenses = () => {
  expenses.length = 0;
};

const updateExpense = (expenseId, data) => {
  const foundedExpence = getExpenseById(expenseId);

  Object.assign(foundedExpence, data);

  return foundedExpence;
};

module.exports = {
  getAll,
  getExpenseById,
  createEpxense,
  removeExpense,
  updateExpense,
  clearExpenses,
};
