'use strict';

const getNewId = (array) => {
  return array.length
    ? Math.max(...array.map(element => element.id)) + 1
    : 1;
};

let expenses = [];

const getAll = () => {
  return expenses;
};

const getById = (expenseId) => {
  const foundExpense = expenses.find(expense => expense.id === +expenseId);

  return foundExpense || null;
};

const create = (expenseBody) => {
  const newExpense = {
    id: getNewId(expenses),
    ...expenseBody,
  };

  expenses.push(newExpense);

  return newExpense;
};

const remove = (expenseId) => {
  expenses = expenses.filter(expense => expense.id !== +expenseId);
};

const update = (expense, expenseBody) => {
  Object.assign(expense, expenseBody);
};

const reset = () => {
  expenses = [];
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  reset,
};
