'use strict';

const { getId } = require('../libs/helpers');

let expenses = [];

const reset = () => {
  expenses = [];
};

const getExpenses = (userId, categories = [], from, to) => {
  const categoriesArray = Array.isArray(categories) ? categories : [categories];

  return expenses.filter(expense => {
    if (userId && expense.userId !== userId) {
      return false;
    }

    if (categoriesArray.length && !categoriesArray.includes(expense.category)) {
      return false;
    }

    if (from && new Date(expense.spentAt) < new Date(from)) {
      return false;
    }

    if (to && new Date(expense.spentAt) > new Date(to)) {
      return false;
    }

    return true;
  });
};

const getById = (id) => {
  return expenses.find(user => user.id === id) || null;
};

const create = (data) => {
  const id = getId(expenses);

  const newUser = {
    id,
    ...data,
  };

  expenses.push(newUser);

  return newUser;
};

const remove = (id) => {
  expenses = expenses.filter(user => user.id !== id);
};

const update = (id, data) => {
  const expense = getById(id);

  Object.assign(expense, data);

  return expense;
};

module.exports = {
  getExpenses, getById, create, remove, update, reset,
};
