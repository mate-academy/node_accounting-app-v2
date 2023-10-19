'use strict';

let expenses = [];

const getAll = () => {
  return expenses;
};

const add = expense => {
  expenses.push(expense);

  return expense;
};

const getById = (id) => {
  const exp = expenses.find(expense => expense.id === +id);

  return exp;
};

const remove = (id) => {
  expenses = expenses.filter(expense => expense.id !== +id);
};

const update = (id, body) => {
  const expense = getById(id);

  if (!expense) {
    return;
  }

  Object.assign(expense, body);

  return expense;
};

const clear = () => {
  expenses = [];
};

module.exports = {
  getAll,
  add,
  getById,
  remove,
  update,
  clear,
};
