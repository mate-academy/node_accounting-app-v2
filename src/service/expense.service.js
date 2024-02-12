'use strict';

const { getIntegerId } = require('../utils/getIntegerId');

let expenses = [];

const initializeExpenses = () => {
  expenses = [];
};

const get = ({ userId, categories, from, to }) => {
  return expenses.filter(expense => {
    return (!isNaN(userId) ? expense.userId === userId : true)
      && (categories ? (typeof categories === 'string'
        ? expense.category === categories
        : categories.includes(expense.category)
      ) : true)
      && (from ? new Date(expense.spentAt) >= new Date(from) : true)
      && (to ? new Date(expense.spentAt) <= new Date(to) : true);
  });
};

const getById = (id) => {
  return expenses.find(expense => expense.id === id);
};

const add = (newExpenseData) => {
  const newExpense = {
    id: getIntegerId(expenses),
  };
  const data = { ...newExpenseData };

  if (!data.note) {
    delete data.note;
  }

  Object.assign(newExpense, data);
  expenses.push(newExpense);

  return newExpense;
};

const remove = (id) => {
  expenses = expenses.filter(expense => expense.id !== id);
};

const update = (id, dataToUpdate) => {
  const expense = getById(id);
  const data = { ...dataToUpdate };

  Object.keys(data)
    .forEach(key => typeof data[key] === 'undefined' && delete data[key]);

  Object.assign(expense, data);

  return expense;
};

module.exports = {
  initializeExpenses,
  get,
  getById,
  add,
  remove,
  update,
};
