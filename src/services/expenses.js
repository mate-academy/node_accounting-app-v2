'use strict';

const { createNewId } = require('../helpers.js');

let expenses = [];

const resetExpenses = () => {
  expenses = [];
};
const getAll = () => expenses;
const getFiltered = (userId, from, to, categories) => {
  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.userId === Number(userId));
  }

  if (categories) {
    filteredExpenses = filteredExpenses
      .filter(expense => categories.includes(expense.category));
  }

  if (from) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.spentAt > from);
  }

  if (to) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.spentAt < to);
  }

  return filteredExpenses;
};
const getById = (id) => {
  const foundExpense = expenses.find(expense => expense.id === +id);

  return foundExpense || null;
};
const create = (options) => {
  const id = createNewId(expenses);

  const newExpense = {
    id,
    ...options,
  };

  expenses.push(newExpense);

  return newExpense;
};
const remove = (id) => {
  expenses = expenses.filter(expense => expense.id !== +id);
};
const update = (id, options) => {
  const expense = getById(id);

  Object.assign(expense, { ...options });

  return expense;
};

const expensesService = {
  resetExpenses,
  getAll,
  getFiltered,
  getById,
  create,
  remove,
  update,
};

module.exports = { expensesService };
