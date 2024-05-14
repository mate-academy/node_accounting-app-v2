const { getNextAvailableId } = require('../utils/getNextAvailableId');
const { getFilteredExpenses } = require('../utils/getFilteredExpenses');

let expenses = [];
const clearExpenses = () => {
  expenses = [];
};

const getExpenses = (query) => {
  return getFilteredExpenses(expenses, query);
};

const getById = (id) => {
  return expenses.find((expense) => expense.id === Number(id)) || null;
};

const create = ({ userId, spentAt, title, amount, category, note }) => {
  const expense = {
    id: getNextAvailableId(expenses),
    userId,
    spentAt,
    title,
    amount,
    category,
    note: note || null,
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
  getExpenses,
  getById,
  create,
  update,
  remove,
  clearExpenses,
};
