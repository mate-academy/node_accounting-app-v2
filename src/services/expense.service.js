const { getMaxId } = require('../utils/helpers.js');

let expenses = [];

function init() {
  expenses = [];
}

const getAll = ({ from, to, userId, categories }) => {
  return expenses.filter((expense) => {
    const fromDate = from ? new Date(from) : null;
    const toDate = to ? new Date(to) : null;

    if (fromDate && new Date(expense.spentAt) < fromDate) {
      return false;
    }

    if (toDate && new Date(expense.spentAt) > toDate) {
      return false;
    }

    if (userId && expense.userId !== userId) {
      return false;
    }

    if (
      categories &&
      categories.length > 0 &&
      !categories.includes(expense.category)
    ) {
      return false;
    }

    return true;
  });
};

const getById = (id) => {
  return expenses.find((expense) => expense.id === id) || null;
};

const create = (body) => {
  const newExpense = {
    id: getMaxId(expenses),
    ...body,
  };

  expenses.push(newExpense);

  return newExpense;
};

const update = ({ id, body }) => {
  const expense = getById(+id);
  const index = expenses.indexOf(expense);

  Object.assign(expense, { ...body });

  expenses.splice(index, 1, expense);

  return expense;
};

const remove = (id) => {
  expenses = expenses.filter((expense) => expense.id !== id);
};

module.exports = {
  init,
  getAll,
  create,
  getById,
  remove,
  update,
};
