'use strict';

const { nextId } = require('../helpers/helpers');
let expenses = [];

const getExpenses = () => {
  return expenses;
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

module.exports = {
  removeExpense,
  getExpenses,
  createExpense,
  expenses,
  getOneExpense,
};
