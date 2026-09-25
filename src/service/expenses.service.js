'use strict';

const UPDATABLE_FIELDS = ['spentAt', 'title', 'amount', 'category', 'note'];

let expenses = [];
let lastId = 0;

function reset() {
  expenses = [];
  lastId = 0;
}

function getAll({ userId, categories, from, to } = {}) {
  let result = [...expenses];

  if (userId !== undefined) {
    result = result.filter((expense) => expense.userId === Number(userId));
  }

  if (categories !== undefined) {
    const wanted = Array.isArray(categories) ? categories : [categories];

    result = result.filter((expense) => wanted.includes(expense.category));
  }

  if (from !== undefined) {
    result = result.filter(
      (expense) => new Date(expense.spentAt) >= new Date(from),
    );
  }

  if (to !== undefined) {
    result = result.filter(
      (expense) => new Date(expense.spentAt) <= new Date(to),
    );
  }

  return result;
}

function getById(id) {
  return expenses.find((expense) => expense.id === id) || null;
}

function create({ userId, spentAt, title, amount, category, note }) {
  lastId++;

  const expense = {
    id: lastId,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(expense);

  return expense;
}

function update(id, data) {
  const expense = getById(id);

  if (!expense) {
    return null;
  }

  for (const field of UPDATABLE_FIELDS) {
    if (data[field] !== undefined) {
      expense[field] = data[field];
    }
  }

  return expense;
}

function remove(id) {
  expenses = expenses.filter((expense) => expense.id !== id);
}

module.exports = {
  reset,
  getAll,
  getById,
  create,
  update,
  remove,
};
