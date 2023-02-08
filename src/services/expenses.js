'use strict';

const { v4: uuidv4 } = require('uuid');

let expenses = [];

const getAll = () => {
  return expenses;
};

const getById = (expenseId) => {
  return expenses.find(expense => expense.id === +expenseId);
};

const add = (expenseData) => {
  const newExpense = {
    id: uuidv4(),
    ...expenseData,
  };

  expenses.push(newExpense);

  return newExpense;
};

const update = (expense, expenseData) => {
  Object.assign(expense, expenseData);
};

const remove = (expenseId) => {
  expenses = expenses.filter(expense => expense.id !== +expenseId);
};

module.exports = {
  getAll, getById, add, update, remove,
};
