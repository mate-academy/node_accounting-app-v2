'use strict';

let expenses = [];

const getAll = () => expenses;

const getById = (id) => expenses.find(expense => expense.id === +id) || null;

const add = (data) => {
  const newExpense = {
    id: Date.now(),
    ...data,
  };

  expenses.push(newExpense);

  return newExpense;
};

const remove = (id) => {
  expenses = expenses.filter(expense => expense.id !== +id);
};

const clean = () => {
  expenses.length = 0;
};

const update = (id, data) => {
  const expense = getById(id);

  Object.assign(expense, data);

  return expense;
};

module.exports = {
  getAll,
  getById,
  add,
  remove,
  clean,
  update,
};
