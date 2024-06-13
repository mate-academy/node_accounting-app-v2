'use strict';

const { prepareExpenses } = require('../helpers/helper.expenses');
const { maxId } = require('../helpers/helper');

let expenses = [];

const getAllExpenses = queryParams => {
  if (Object.keys(queryParams).length === 0) {
    return expenses;
  }

  return prepareExpenses(expenses, queryParams);
};

const removeExpenses = (id) => {
  expenses = expenses.filter(user => user.id !== id);
};

const getByIdExpenses = id => {
  return expenses.find(user => user.id === id);
};

const createExpenses = (params) => {
  const newExpenses = {
    id: maxId(expenses),
    ...params,
  };

  expenses.push(newExpenses);
};

const updateExpenses = (id, params) => {
  const updateExp = expenses.map(exp => {
    if (exp.id === id) {
      return {
        ...exp, ...params,
      };
    }

    return exp;
  });

  expenses = updateExp;
};

const clearExpenses = () => {
  expenses = [];
};

module.exports = {
  clearExpenses,
  getAllExpenses,
  createExpenses,
  updateExpenses,
  removeExpenses,
  getByIdExpenses,
};
