'use strict';

const { getNewId } = require('../getNewID');

let expenses = [];

const getInitial = () => {
  expenses = [];

  return expenses;
};

const getAllExpenses = (
  id,
  categories,
  from,
  to,
) => {
  let filteredExpenses = expenses;

  if (id) {
    filteredExpenses = filteredExpenses.filter(
      expense => expense.userId === id
    );
  }

  if (categories) {
    filteredExpenses = filteredExpenses.filter(
      ({ category }) => categories.includes(category)
    );
  }

  if (from) {
    filteredExpenses = filteredExpenses.filter(
      ({ spentAt }) => spentAt > from
    );
  }

  if (to) {
    filteredExpenses = filteredExpenses.filter(
      ({ spentAt }) => spentAt < to
    );
  }

  return filteredExpenses;
};

const getExpenseById = (expenseId) => {
  const foundExpense = expenses.find(({ id }) => id === expenseId);

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
  expenses = expenses.filter(({ id }) => id !== expenseId);
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
