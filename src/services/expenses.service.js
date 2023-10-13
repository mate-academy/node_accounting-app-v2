'use strict';

let expenses = [];

const getAll = () => expenses;

const add = expense => {
  expenses.push(expense);
};

const getById = id => (
  expenses.find(expense => +expense.id === +id)
);

const remove = id => {
  expenses = expenses.filter(expense => expense.id !== +id);
};

const update = (id, requestBody) => {
  const expense = getById(+id);

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
