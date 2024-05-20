const { filterExpenses } = require('../utils/getFilteredExtenses');
const getId = require('../utils/getMaxId');

let expenses = [];

const initExpenses = () => {
  expenses = [];
};

const getAll = (data) => {
  return filterExpenses(expenses, data);
};

const getById = (id) => {
  return expenses.find((item) => item.id === Number(id)) || null;
};

const createExpenses = (data) => {
  const newExpenses = {
    id: getId.getCreateMaxId(expenses),
    ...data,
    note: data.note || '',
  };

  expenses.push(newExpenses);

  return newExpenses;
};

const updateExpenses = (id, data) => {
  const expense = getById(id);

  Object.assign(expense, { ...data });

  return expense;
};

const deleteExpenses = (id) => {
  expenses = expenses.filter((item) => item.id !== Number(id));
};

module.exports = {
  initExpenses,
  getAll,
  getById,
  createExpenses,
  updateExpenses,
  deleteExpenses,
};
