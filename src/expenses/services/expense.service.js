'use strict';

const helper = require('../../helper');

let expenses = [];

const clearState = () => {
  expenses = [];
};

const getAll = ({ userId, categories, from, to }) => {
  let newExpences = [...expenses];

  if (userId) {
    newExpences = newExpences.filter(
      expence => expence.userId === Number(userId)
    );
  }

  if (categories) {
    const categoriesList = Array.isArray(categories)
      ? categories
      : [categories];

    newExpences = newExpences.filter(
      expense => categoriesList
        .includes(expense.category)
    );
  }

  if (from) {
    newExpences = newExpences.filter(
      expense => new Date(from) <= expense.spentAt
    );
  }

  if (to) {
    newExpences = newExpences.filter(
      expense => new Date(to) >= expense.spentAt
    );
  }

  return newExpences;
};

const getById = (id) => {
  return expenses.find(expense => expense.id === id) || null;
};

const create = (body) => {
  const expense = {
    id: helper.getId(expenses),
    userId: helper.toNumber(body.userId),
    spentAt: helper.toDate(body.spentAt),
    title: body.title,
    amount: helper.toNumber(body.amount),
    category: body.category,
    note: body.note,
  };

  expenses.push(expense);

  return expense;
};

const update = (params) => {
  const expense = getById(Number(params.id));

  Object.assign(expense, params);

  return expense;
};

const remove = (id) => {
  expenses = expenses.filter(expense => expense.id !== id);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  clearState,
};
