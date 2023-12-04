'use strict';

let expenses = [];

const getId = () => {
  if (expenses.length > 0) {
    return Math.max(...expenses.map(expense => expense.id)) + 1;
  }

  return 1;
};

const resetExpenses = () => {
  expenses = [];
};

const getAll = () => {
  return expenses;
};

const getById = (id) => {
  return expenses.find(expense => expense.id === +id) || null;
};

const create = (exp) => {
  const expense = {
    ...exp,
    id: getId(),
  };

  expenses.push(expense);

  return expense;
};

const remove = (id) => {
  expenses = expenses.filter(expence => expence.id !== +id);
};

const update = (id, fields) => {
  const expense = getById(id);

  Object.assign(expense, fields);

  expenses = expenses.map(elem => elem.id === +id ? expense : elem);

  return expense;
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  resetExpenses,
};
