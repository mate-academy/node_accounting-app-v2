'use strict';

const { getNewId } = require('../getNewId');

let expenses = [];

const getInitial = () => {
  expenses = [];

  return expenses;
};

const getAllExpenses = ({
  userId,
  categories,
  from,
  to,
}) => {
  let visibleExpenses = expenses;

  if (userId) {
    visibleExpenses = expenses.filter(expense => expense.userId === +userId);
  }

  if (categories) {
    visibleExpenses = expenses.filter(
      ({ category }) => categories.includes(category)
    );
  }

  if (from) {
    visibleExpenses = expenses.filter(({ spentAt }) => spentAt > from);
  }

  if (to) {
    visibleExpenses = expenses.filter(({ spentAt }) => spentAt < to);
  }

  return visibleExpenses;
};

const getExpenseById = (expenseId) => {
  const foundExpense = expenses.find(({ id }) => id === +expenseId);

  return foundExpense || null;
};

const createExpense = (expenseBody) => {
  const newExpense = {
    id: getNewId(expenses),
    ...expenseBody,
  };

  expenses.push(newExpense);

  return newExpense;
};

const removeExpense = (expenseId) => {
  expenses = expenses.filter(({ id }) => id !== +expenseId);
};

const updateExpense = (expenseId, body) => {
  let foundExpense = getExpenseById(expenseId);

  foundExpense = {
    ...foundExpense,
    ...body,
  };

  return foundExpense;
};

module.exports = {
  getInitial,
  getAllExpenses,
  getExpenseById,
  createExpense,
  removeExpense,
  updateExpense,
};
