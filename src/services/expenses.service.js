/* eslint-disable max-len */
/* eslint-disable no-console */
/*
[
  {
    "id": 0,
    "userId": 0,
    "spentAt": "2015-07-20T15:49:04-07:00",
    "title": "string",
    "amount": 0,
    "category": "string",
    "note": "string"
  }
]
  expenses?
  userId=1
  &categories=string1&categories=string2&categories=string3
  &from=2012-07-20&to=2015-07-20

*/

// const usersService = require('./users.service');

let expenses = [];

const getAll = (userId, categories, from, to) => {
  let result = [...expenses];

  if (userId !== undefined) {
    result = result.filter((ex) => ex.userId === userId);
  }

  if (categories) {
    const categoriesArray = Array.isArray(categories)
      ? categories
      : [categories];

    result = result.filter((ex) => categoriesArray.includes(ex.category));
  }

  if (from) {
    const fromTime = Date.parse(from);

    result = result.filter(
      (ex) =>
        Date.parse(ex.spentAt) > fromTime ||
        Date.parse(ex.spentAt) === fromTime,
    );
  }

  if (to) {
    const toTime = Date.parse(to);

    result = result.filter(
      (ex) =>
        Date.parse(ex.spentAt) < toTime || Date.parse(ex.spentAt) === toTime,
    );
  }

  return result;
};

const getById = (id) => expenses.find((ex) => ex.id === Number(id)) || null;

const create = ({ userId, spentAt, title, amount, category, note }) => {
  const nextId = expenses[expenses.length - 1]?.id + 1 || 0;
  const newExpense = {
    id: nextId,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpense);

  return newExpense;
};

const remove = (id) => {
  expenses = expenses.filter((ex) => ex.id !== Number(id));
};

const update = ({ id, spentAt, title, amount, category, note }) => {
  const expense = getById(id);

  if (!expense) {
    return null;
  }

  if (spentAt) {
    expense.spentAt = spentAt;
  }

  if (title) {
    expense.title = title;
  }

  if (amount) {
    expense.amount = amount;
  }

  if (category) {
    expense.category = category;
  }

  if (note) {
    expense.note = note;
  }

  return expense;
};

const clear = () => {
  expenses = [];
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  clear,
  update,
};
