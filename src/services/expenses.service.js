'use strict';

const { generateId } = require('../helpers/generateId');

let expenses = [];
const REQUIRE_KEYS = {
  userId: 0,
  spentAt: 'string',
  title: 'string',
  amount: 0,
  category: 'string',
  note: 'string',
};

const createExpense = (expenseData) => {
  const expense = {
    ...expenseData,
    id: generateId(),
  };

  expenses.push(expense);

  return expense;
};

const getExpenses = () => {
  return expenses;
};

const getExpenseById = (id) => {
  return expenses.find(expense => expense.id === id);
};

const getExpenseByQuery = (query) => {
  const {
    userId,
    categories,
    from,
    to,
  } = query;

  return expenses.filter(({
    category,
    userId: id,
    spentAt,
  }) => {
    const spentDate = new Date(spentAt).valueOf();
    const dateFrom = new Date(from).valueOf();
    const dateTo = new Date(to).valueOf();

    if (categories && category !== categories) {
      return false;
    }

    if (userId && +id !== +userId) {
      return false;
    }

    if (from && spentDate < dateFrom) {
      return false;
    }

    if (to && spentDate > dateTo) {
      return false;
    }

    return true;
  });
};

const deleteExpense = (id) => {
  expenses = expenses.filter(expense => expense.id !== id);
};

const updateExpense = (expense, expenseData) => {
  for (const prop in expenseData) {
    if (!REQUIRE_KEYS.hasOwnProperty(prop)) {
      return false;
    }
  }

  Object.assign(expense, { ...expenseData });

  return expense;
};

const clear = () => {
  expenses.length = 0;
};

module.exports = {
  createExpense,
  getExpenses,
  getExpenseById,
  getExpenseByQuery,
  deleteExpense,
  updateExpense,
  clear,
};
