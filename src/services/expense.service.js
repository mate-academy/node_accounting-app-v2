'use strict';

const { filterUsingParams } = require('../utils/filterUsingParams');
let expenses = [];

const expenseInit = () => {
  expenses = [];
};

const readAll = (params) => {
  return filterUsingParams(expenses, params);
};

const read = (id) => {
  return expenses.find(expense => expense.id === id) || null;
};

const create = (fields) => {
  const newExpense = {
    id: expenses.length + 1,
    ...fields,
  };

  expenses.push(newExpense);

  return newExpense;
};

const remove = (id) => {
  expenses = expenses.filter(user => user.id !== id);
};

const update = (id, params) => Object.assign(read(id), { ...params });

module.exports = {
  expenseInit,
  readAll,
  read,
  create,
  remove,
  update,
};
