const { filterExpenses } = require('../helpers/filterExpenses');
const { getId } = require('../helpers/getId');

let expenses = [];

const getAll = () => {
  return expenses;
};

const getFiltered = (filters) => {
  return filterExpenses(expenses, filters) || [];
};

const create = ({ userId, spentAt, title, amount, category, note }) => {
  const expense = {
    id: getId(),
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

const getById = (id) => {
  return expenses.find((expense) => expense.id === id) || null;
};

const remove = (id) => {
  expenses = expenses.filter((expense) => expense.id !== id);
};

const update = ({ id, spentAt, title, amount, category, note }) => {
  const expense = getById(id);

  if (expense) {
    expense.spentAt = spentAt || expense.spentAt;
    expense.title = title || expense.title;
    expense.amount = amount || expense.amount;
    expense.category = category || expense.category;
    expense.note = note || expense.note;
  }

  return expense;
};

const reset = () => {
  expenses = [];
};

module.exports = {
  getAll,
  getFiltered,
  create,
  getById,
  remove,
  update,
  reset,
};
