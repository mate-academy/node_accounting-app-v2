const getExpensesByPeriod = require('../helpers/getExpensesByPeriod');

let expenses = [];

const getAll = ({ userId, categories, from, to }) => {
  let filtered = expenses;

  if (userId) {
    filtered = filtered.filter((exp) => exp.userId === +userId);
  }

  if (categories) {
    filtered = filtered.filter((exp) => categories.includes(exp.category));
  }

  if (from) {
    filtered = filtered.filter((exp) => getExpensesByPeriod(exp, from, to));
  }

  return filtered;
};

const create = (expense) => {
  expense.id = Date.now();
  expenses.push(expense);

  return expense;
};

const getById = (id) => {
  return expenses.find((exp) => exp.id === +id) || null;
};

const remove = (id) => {
  expenses = expenses.filter((exp) => exp.id !== +id);
};

const update = (expense, data) => {
  return Object.assign(expense, data);
};

module.exports = {
  getAll,
  create,
  getById,
  remove,
  update,
};
