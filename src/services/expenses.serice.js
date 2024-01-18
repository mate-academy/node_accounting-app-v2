'use strict';

const { prepareExpenses } = require('../helpers/helper.expenses');
const { maxId } = require('../helpers/helper');

let expenses = [];

const getAll = queryParams => {
  if (Object.keys(queryParams).length === 0) {
    return expenses;
  }

  return prepareExpenses(expenses, queryParams);
};

const remove = (id) => {
  expenses = expenses.filter(user => user.id !== id);
};

const getById = id => {
  return expenses.find(user => user.id === id);
};

const create = (params) => {
  const newExpenses = {
    id: maxId(expenses),
    ...params,
  };

  expenses.push(newExpenses);
};

const update = (id, params) => {
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

const clearExp = () => {
  expenses = [];
};

module.exports = {
  clearExp,
  getAll,
  create,
  update,
  remove,
  getById,
};
