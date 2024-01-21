'use strict';

const { generatedId } = require('../utils/generatedId');

let expenses = [
  // {
  //   id: 0,
  //   userId: 0,
  //   spentAt: '2024-01-21T14:27:12.411Z',
  //   title: 'string',
  //   amount: 0,
  //   category: 'string',
  //   note: 'string',
  // },
];

const getExpensesAll = ({ userId, category, from, to }) => {
  let filterExpenses = [...expenses];

  if (userId) {
    filterExpenses = filterExpenses.filter(item => item.userId === userId);
  }

  if (category) {
    filterExpenses = filterExpenses
      .filter(item => item.categories === category);
  }

  if (from && to) {
    filterExpenses = filterExpenses
      .filter(item => item.spentAt >= from && item.spentAt <= to);
  }

  return filterExpenses;
};

const getExpensesById = (id) => {
  return expenses.find(item => item.id === id) || null;
};

const createExpenses = (
  userId, spentAt, title, amount, category, note
) => {
  const cost = {
    id: generatedId(expenses),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(cost);

  return cost;
};

const updateExpense = ({ id, spentAt, title, amount, category, note }) => {
  const cost = getExpensesById(id);

  Object.assign(cost, {
    spentAt, title, amount, category, note,
  });

  return cost;
};

const removeExpenses = (id) => {
  expenses = expenses.filter(item => item.id !== id);
};

const resetExpenses = () => {
  expenses = [];
};

module.exports = {
  getExpensesAll,
  getExpensesById,
  createExpenses,
  updateExpense,
  removeExpenses,
  resetExpenses,
};
