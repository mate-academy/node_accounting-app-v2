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

  let expensesByQuery = [...expenses];

  if (categories) {
    expensesByQuery = expensesByQuery.filter(exp => (
      exp.category === categories
    ));
  }

  if (userId) {
    expensesByQuery = expensesByQuery.filter(exp => +exp.userId === +userId);
  }

  if (from) {
    const dateFrom = new Date(from).valueOf();

    expensesByQuery = expensesByQuery.filter(exp => (
      new Date(exp.spentAt).valueOf() > dateFrom
    ));
  }

  if (to) {
    const dateTo = new Date(to).valueOf();

    expensesByQuery = expensesByQuery.filter(exp => (
      new Date(exp.spentAt).valueOf() < dateTo
    ));
  }

  return expensesByQuery;
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
