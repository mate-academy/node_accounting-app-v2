'use strict';

let expenses = [];
let nextId = 1;

const getAll = ({ userId, categories, from, to } = {}) => {
  let result = expenses;

  if (userId !== undefined) {
    result = result.filter((ex) => ex.userId === Number(userId));
  }

  if (categories) {
    const cats = Array.isArray(categories) ? categories : [categories];

    result = result.filter((ex) => cats.includes(ex.category));
  }

  if (from) {
    result = result.filter((ex) => new Date(ex.spentAt) >= new Date(from));
  }

  if (to) {
    result = result.filter((ex) => new Date(ex.spentAt) <= new Date(to));
  }

  return result;
};

const getById = (id) => expenses.find((exp) => exp.id === id) || null;

const create = ({ userId, spentAt, title, amount, category, note }) => {
  const expense = {
    id: nextId++,
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

const update = (id, data) => {
  const expense = getById(id);

  if (!expense) {
    return null;
  }

  const allowedFields = ['spentAt', 'title', 'amount', 'category', 'note'];
  const updates = Object.fromEntries(
    allowedFields.filter((key) => key in data).map((key) => [key, data[key]]),
  );

  Object.assign(expense, updates);

  return expense;
};

const remove = (id) => {
  const index = expenses.findIndex((exp) => exp.id === id);

  if (index === -1) {
    return false;
  }

  expenses.splice(index, 1);

  return true;
};

const reset = () => {
  expenses = [];
  nextId = 1;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  reset,
};
