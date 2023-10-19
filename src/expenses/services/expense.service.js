'use strict';

const helper = require('../../helper');

let expenses = [];

const clearState = () => {
  expenses = [];
};

const getAll = (userId, categories, from, to) => {
  let newExpences = [...expenses];

  if (userId) {
    newExpences = newExpences.filter(
      expence => expence.userId === userId
    );
  }

  if (categories) {
    newExpences = newExpences.filter(
      expense => categories
        .includes(expense.category)
    );
  }

  if (from) {
    newExpences = newExpences.filter(
      expense => from <= expense.spentAt
    );
  }

  if (to) {
    newExpences = newExpences.filter(
      expense => to >= expense.spentAt
    );
  }

  return newExpences;
};

const getById = (id) => {
  return expenses.find(expense => expense.id === id) || null;
};

const create = (
  userId,
  spentAt,
  title,
  amount,
  category,
  note,) => {
  const expense = {
    id: helper.getId(expenses),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(expense);

  return expense;
};

const update = (id, userId, spentAt, title, amount, category, note) => {
  const expense = getById(+id);

  if (userId !== undefined) {
    expense.userId = userId;
  }

  if (spentAt !== undefined) {
    expense.spentAt = spentAt;
  }

  if (title !== undefined) {
    expense.title = title;
  }

  if (amount !== undefined) {
    expense.amount = amount;
  }

  if (category !== undefined) {
    expense.category = category;
  }

  if (note !== undefined) {
    expense.note = note;
  }

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
