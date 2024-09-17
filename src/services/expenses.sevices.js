'use strict';

const { nextId } = require('../helpers/helpers');
let expenses = [];

const getExpenses = (userId, categories, from, to) => {
  let preaperedExpenses = expenses;

  if (userId) {
    preaperedExpenses = preaperedExpenses
      .filter(expense => expense.userId === userId);
  }

  if (categories) {
    preaperedExpenses = preaperedExpenses
      .filter(({ category }) => categories.includes(category));
  }

  if (from && to) {
    preaperedExpenses = preaperedExpenses
      .filter(expense => from <= expense.spentAt && expense.spentAt <= to);
  }

  return preaperedExpenses;
};

const createExpense = (userId, spentAt, title, amount, category, note) => {
  const expense = {
    id: nextId(expenses),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(expense);

  return expense;
};

const removeExpense = (id) => {
  expenses = expenses.filter(expense => expense.id !== id);
};

const getOneExpense = (id) => {
  return expenses.find(expense => expense.id === id);
};

const clearExpenses = () => {
  expenses = [];
};

const patchExpense = (expense, information) => {
  Object.assign(expense, information);
};

module.exports = {
  removeExpense,
  getExpenses,
  createExpense,
  expenses,
  getOneExpense,
  clearExpenses,
  patchExpense,
};
