'use strict';

let expenses = [];

const getAll = () => {
  return expenses;
};

const add = user => {
  expenses.push(user);
};

const getById = (id) => {
  return expenses.find(expense => expense.id === +id) || null;
};

const update = (id, requestBody) => {
  const expense = getById(+id);

  if (!expense) {
    return;
  }

  Object.assign(expense, requestBody);

  return expense;
};

const remove = (id) => {
  expenses = expenses.filter(expense => expense.id !== +id);
};

const clear = () => {
  expenses = [];
};

module.exports = {
  getAll,
  getById,
  add,
  update,
  remove,
  clear,
};
