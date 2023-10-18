'use strict';

let expenses = [];

const getAll = () => expenses;

const getById = id => expenses.find(expense => expense.id === id) || null;

const add = (expense) => {
  expenses.push(expense);
};

const remove = (id) => {
  expenses = expenses.filter(expense => expense.id !== id);
};

const update = (id, newExpense) => {
  const expense = getById(id);

  if (!expense) {
    return;
  }

  Object.assign(expense, newExpense);

  return expense;
};

const clear = () => {
  expenses.length = 0;
};

module.exports = {
  getAll,
  getById,
  add,
  remove,
  update,
  clear,
};
