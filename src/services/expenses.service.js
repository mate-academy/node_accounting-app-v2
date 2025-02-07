const { compareDates } = require('../utils/compareDates');

let expenses = [];

const getAll = ({ userId, categories, from, to }) => {
  let result = [...expenses];

  if (userId) {
    result = result.filter((e) => String(e.userId) === userId);
  }

  if (categories) {
    result = result.filter((e) => categories.includes(e.category));
  }

  if (from) {
    result = result.filter((e) => compareDates('from', e.spentAt, from));
  }

  if (to) {
    result = result.filter((e) => compareDates('to', e.spentAt, to));
  }

  return result;
};

const getById = (id) => {
  return expenses.find((expense) => String(expense.id) === id) || null;
};

const create = ({ userId, spentAt, title, amount, category, note }) => {
  const expense = {
    id: Math.floor(Math.random() * 1_000_000_000),
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

const remove = (id) => {
  expenses = expenses.filter((e) => String(e.id) !== id);
};

const update = (id, data) => {
  const toUpdate = getById(id);

  if (toUpdate !== null) {
    Object.assign(toUpdate, data);
  }

  return toUpdate;
};

const clear = () => {
  expenses = [];
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  clear,
};
