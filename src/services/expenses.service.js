'use strict';

let expenses = [];

const getAll = () => expenses;

const add = expense => {
  expenses.push(expense);
};

const getById = id => (
  expenses.find(expense => Number(expense.id) === Number(id))
);

const remove = id => {
  expenses = expenses.filter(expense => expense.id !== Number(id));
};

const update = (id, requestBody) => {
  const expense = getById(Number(id));

  if (!expense) {
    return;
  }

  Object.assign(expense, requestBody);

  return expense;
};

const clear = () => {
  expenses.length = 0;
};

module.exports = {
  getAll,
  add,
  getById,
  remove,
  update,
  clear,
};
