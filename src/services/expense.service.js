'use strict';

const { filterExpense } = require('../utils/filterExpense');
const { getNewId } = require('../utils/getNewId');

let expenses = [];

const getAll = (userId, categories, from, to) => {
  return filterExpense(expenses,
    {
      userId,
      categories,
      from,
      to,
    });
};

const getById = id => expenses.find(expense => expense.id === id);

const create = (expense) => {
  const newExpense = {
    id: getNewId(expenses),
    ...expense,
  };

  expenses.push(newExpense);

  return newExpense;
};

const update = (id, updatedExpense) => {
  const expense = getById(id);

  Object.assign(expense, updatedExpense);

  return expense;
};

const remove = (id) => {
  const filteredExpenses = expenses.filter(expense => expense.id !== id);

  expenses = filteredExpenses;
};

const clearExpenses = () => {
  expenses = [];
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  clearExpenses,
};
