'use strict';

const validator = require('./expenses.validator');

let expenses = [];

const initiate = (initialValue) => {
  expenses = initialValue;
};

const getNewId = () => (
  Math.max(
    ...expenses.map(({ id }) => id), 0
  ) + 1
);

const getFiltered = ({ userId, category, from, to }) => {
  let filteredExpenses = expenses;
  const categories = Array.isArray(category)
    ? category
    : [category];

  if (userId) {
    filteredExpenses = expenses.filter(expense => expense.userId === +userId);
  }

  if (category) {
    filteredExpenses = expenses.filter(expense => (
      categories.includes(expense.category)
    ));
  }

  if (from) {
    filteredExpenses = expenses.filter(expense => (
      expense.spentAt > from
    ));
  }

  if (to) {
    filteredExpenses = expenses.filter(expense => (
      expense.spentAt < to
    ));
  }

  return filteredExpenses;
};

const getAll = (query) => {
  validator.validateQuery(query);

  return getFiltered(query);
};

const getById = id => {
  if (isNaN(id)) {
    throw Error();
  }

  return expenses.find(expense => expense.id === id) || null;
};

const add = (data) => {
  validator.validateEntity(data);

  const expense = {
    ...data,
    id: getNewId(),
  };

  expenses.push(expense);

  return expense;
};

const remove = (id) => {
  expenses = expenses.filter(expense => expense.id !== id);
};

const update = (id, data) => {
  validator.validatePartial(data);

  const expense = getById(id);

  return Object.assign(expense, data);
};

module.exports = {
  initiate,
  getAll,
  getById,
  remove,
  add,
  update,
};
