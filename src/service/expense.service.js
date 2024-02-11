'use strict';

const { getIntegerId } = require('../utils/getIntegerId');

let expenses = [];

const initializeExpenses = () => {
  expenses = [];
};

const get = ({ userId, categories, from, to }) => {
  let expensesFiltered = [...expenses];

  if (!isNaN(userId)) {
    expensesFiltered = expensesFiltered
      .filter(expense => expense.userId === userId);
  }

  if (categories) {
    expensesFiltered = expensesFiltered
      .filter(expense => typeof categories === 'string'
        ? expense.category === categories
        : categories.includes(expense.category)
      );
  }

  if (from) {
    expensesFiltered = expensesFiltered
      .filter(expense => new Date(expense.spentAt) >= new Date(from));
  }

  if (to) {
    expensesFiltered = expensesFiltered
      .filter(expense => new Date(expense.spentAt) <= new Date(to));
  }

  return expensesFiltered;
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
