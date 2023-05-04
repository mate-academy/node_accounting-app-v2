'use strict';

const { getNewId } = require('../helpers/getNewId');

let expenses = [];

const resetExpenses = () => {
  expenses = [];

  return expenses;
};

const getAllExpenses = (query) => {
  const {
    userId,
    categories,
    from,
    to,
  } = query;

  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = expenses
      .filter(expense => expense.userId === Number(userId));
  }

  if (categories) {
    filteredExpenses = expenses
      .filter(({ category }) => categories.includes(category));
  }

  if (from) {
    filteredExpenses = expenses
      .filter(({ spentAt }) => spentAt > from);
  }

  if (to) {
    filteredExpenses = expenses
      .filter(({ spentAt }) => spentAt < to);
  }

  return filteredExpenses;
};

const getExpenseById = (expenseId) => {
  const foundExpense = expenses
    .find(expense => expense.id === Number(expenseId));

  return foundExpense || null;
};

const createExpense = (requestBody) => {
  const newExpense = {
    id: getNewId(expenses),
    ...requestBody,
  };

  expenses.push(newExpense);

  return newExpense;
};

const removeExpense = (expenseId) => {
  expenses = expenses.filter(expense => expense.id !== Number(expenseId));
};

const updateExpense = ({
  expenseId,
  requestBody,
}) => {
  let updatedExpense = getExpenseById(expenseId);

  updatedExpense = {
    ...updatedExpense,
    ...requestBody,
  };

  return updatedExpense;
};

module.exports = {
  resetExpenses,
  getAllExpenses,
  getExpenseById,
  createExpense,
  removeExpense,
  updateExpense,
};
