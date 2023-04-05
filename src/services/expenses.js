'use strict';

const { v4: uuid } = require('uuid');
const { isValidDate } = require('../validation');

let expenses = [];

const resetStore = () => {
  expenses = [];
};

const getAll = (userId, categories, from, to) => {
  const fromDate = new Date(from);
  const toDate = new Date(to);

  const filteredByUserId = userId 
    ? expenses.filter((expense) => expense.userId === userId)
    : expenses;

  const filteredByCategories = categories && categories.length > 0
    ? filteredByUserId.filter((expense) => categories.includes(expense.category))
    : filteredByUserId;

  const filteredByFrom = isValidDate(fromDate)
    ? filteredByCategories.filter((expense) => new Date(expense.spentAt) >= fromDate)
    : filteredByCategories;

  const filteredByTo = isValidDate(toDate)
    ? filteredByFrom.filter((expense) => new Date(expense.spentAt) <= toDate)
    : filteredByFrom;

  return filteredByTo;
};

const getById = (id) => expenses.find((expense) => expense.id === id) || null;

const create = (expenseData) => {
  const expense = { id: uuid(), ...expenseData };
  expenses.push(expense);
  return expense;
}

const deleteById = (id) => {
  const expenseIndex = expenses.findIndex((expense) => expense.id === id);
  if (expenseIndex === -1) {
    return null;
  }

  expenses.splice(expenseIndex, 1);
  return true;
}

const update = (id, updatedExpense) => {
  console.log(expenses);
  const expense = getById(id);
  console.log(expense);
  if (!expense) {
    return null;
  }

  Object.assign(expense, updatedExpense);
  console.log(expense, updatedExpense);
  return expense;
}

module.exports = {
  resetStore,
  getAll,
  getById,
  create,
  deleteById,
  update,
};
