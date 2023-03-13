'use strict';

const validator = require('./expenses.validator');
const { generateId } = require('../utils/generateId');

let expenses = [];

const initiate = (initialValue) => {
  expenses = initialValue;
};

const getMany = (query) => {
  validator.validateQuery(query);

  const { userId, category, from, to } = query;

  const categories = Array.isArray(category)
    ? category
    : [category];

  return expenses.filter(expense => {
    const isMatchingUserId = userId
      ? expense.userId === +userId
      : true;

    const isMatchingCategory = category
      ? categories.includes(expense.category)
      : true;

    const isMatchingFrom = from
      ? expense.spentAt > from
      : true;

    const isMatchingTo = to
      ? expense.spentAt < to
      : true;

    return (
      isMatchingUserId && isMatchingCategory && isMatchingFrom && isMatchingTo
    );
  });
};

const getById = id => {
  const expenseId = Number(id);

  if (isNaN(expenseId)) {
    throw Error();
  }

  return expenses.find(expense => expense.id === expenseId) || null;
};

const add = (data) => {
  validator.validateEntity(data);

  const expense = {
    ...data,
    id: generateId(expenses),
  };

  expenses.push(expense);

  return expense;
};

const remove = (id) => {
  const expenseId = Number(id);

  expenses = expenses.filter(expense => expense.id !== expenseId);
};

const update = (id, data) => {
  validator.validatePartial(data);

  const expense = getById(id);

  return Object.assign(expense, data);
};

module.exports = {
  initiate,
  getMany,
  getById,
  remove,
  add,
  update,
};
