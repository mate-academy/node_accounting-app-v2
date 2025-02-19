const getNextAvailableId = require('../utils/getNextAvailableId');
const getFilteredExpenses = require('../utils/getFilteredExpenses');

let expenses = [];
const clearExpenses = () => {
  expenses = [];
};

const getAll = (query) => {
  return getFilteredExpenses(expenses, query);
};

const getById = (id) => {
  return expenses.find((expense) => expense.id === Number(id)) || null;
};

const create = (body) => {
  const expense = {
    id: getNextAvailableId(expenses),
    ...body,
  };

  expenses.push(expense);

  return expense;
};

const update = (id, body) => {
  const expense = getById(id);

  Object.assign(expense, { ...body });

  return expense;
};

const remove = (id) => {
  expenses = expenses.filter((expense) => expense.id !== Number(id));
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  clearExpenses,
};
