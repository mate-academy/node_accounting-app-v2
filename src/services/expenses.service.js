const { compareDates } = require('../utils/compareDates');

let expenses = [];

const getAll = ({ userId, categories, from, to }) => {
  let result = [...expenses];

  if (userId) {
    result = result.filter((e) => String(e.userId) === userId);
  }

  if (categories) {
    result = result.filter((e) => categories === e.category);
  }

  if (from) {
    result = result.filter((e) => compareDates('from', from, e.spentAt));
  }

  if (to) {
    result = result.filter((e) => compareDates('to', to, e.spentAt));
  }

  return result;
};

const getById = (id) => {
  return expenses.find((item) => String(item.id) === id) || null;
};

const create = ({ userId, spentAt, title, amount, category, note }) => {
  const expense = {
    id: Math.trunc(Date.now() + Math.random()),
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
  expenses = expenses.filter((expense) => String(expense.id) !== id);
};

const update = (id, dataToUpdate) => {
  const expense = getById(id);

  Object.assign(expense, dataToUpdate);

  return expense;
};

const clear = () => {
  expenses = [];
};

module.exports = {
  getAll,
  create,
  getById,
  remove,
  update,
  clear,
};
