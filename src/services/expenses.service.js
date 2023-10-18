'use strict';

const { getNextId } = require('./../helpers');

let expenses = [];

const getAll = (filters) => {
  const { userId, categories, from, to } = filters;

  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = filteredExpenses.filter(
      expense => expense.userId === userId
    );
  }

  if (categories) {
    filteredExpenses = filteredExpenses.filter(
      expense => categories.includes(expense.category)
    );
  }

  if (from) {
    filteredExpenses = filteredExpenses.filter(
      expense => +new Date(expense.spentAt) > +new Date(from)
    );
  }

  if (to) {
    filteredExpenses = filteredExpenses.filter(
      expense => +new Date(expense.spentAt) < +new Date(to)
    );
  }

  return filteredExpenses;
};

const get = (expenseId) => {
  return expenses.find(({ id }) => id === expenseId) || null;
};

const create = (expenseData) => {
  const expense = {
    id: getNextId(expenses),
    ...expenseData,
  };

  expenses.push(expense);

  return expense;
};

const update = (expenseId, updateData) => {
  const oldExpense = get(expenseId);
  const updatedExpense = {
    ...oldExpense,
    ...updateData,
  };

  expenses = expenses.map(expense => {
    return expense.id === expenseId
      ? updatedExpense
      : expense;
  });

  return updatedExpense;
};

const remove = (expenseId) => {
  expenses = expenses.filter(({ id }) => id !== expenseId);
};

const exists = (expenseId) => {
  return expenses.some(({ id }) => id === expenseId);
};

const clear = () => {
  expenses = [];
};

module.exports = {
  getAll,
  get,
  create,
  update,
  remove,
  exists,
  clear,
};
