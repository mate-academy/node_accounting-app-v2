'use strict';

const { createNewId, filterExpenses } = require('./expenses.helper');

let expenses = [];

const getAll = queryParams => {
  if (Object.keys(queryParams).length === 0) {
    return expenses;
  }

  return filterExpenses(expenses, queryParams);
};

const getByID = id => expenses.find(ex => ex.id === id);

const create = expense => {
  const newExpense = {
    id: createNewId(expenses),
    ...expense,
  };

  expenses.push(newExpense);

  return newExpense;
};

const remove = id => {
  const filteredExpenses = expenses.filter(ex => ex.id !== id);

  expenses = filteredExpenses;
};

const update = (id, props) => {
  const expense = getByID(id);

  Object.assign(expense, props);

  return expense;
};

module.exports = {
  getAll,
  getByID,
  create,
  remove,
  update,
};
