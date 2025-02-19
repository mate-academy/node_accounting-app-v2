let expenses = [];
const { getNewId } = require('../utils/getNewId');

const reset = () => {
  expenses = [];

  return expenses;
};

const getAll = ({ from, to, userId, categories }) => {
  return expenses.filter((expense) => {
    let res = true;

    if (from) {
      res = res && new Date(expense.spentAt) >= new Date(from);
    }

    if (to) {
      res = res && new Date(expense.spentAt) <= new Date(to);
    }

    if (userId) {
      res = res && expense.userId === Number(userId);
    }

    if (Array.isArray(categories) && categories.length > 0) {
      res = res && categories.includes(expense.category);
    } else if (typeof categories === 'string') {
      res = res && expense.category === categories;
    }

    return res;
  });
};

const getById = (id) => {
  return expenses.find((expense) => expense.id === Number(id));
};

const create = (expenseBody) => {
  const expense = {
    id: getNewId(expenses),
    ...expenseBody,
  };

  expenses.push(expense);

  return expense;
};

const update = (id, updatedExpenseBody) => {
  const expense = getById(id);

  Object.assign(expense, updatedExpenseBody);

  return expense;
};

const remove = (id) => {
  expenses = expenses.filter((expense) => expense.id !== Number(id));
};

module.exports = {
  reset,
  getAll,
  getById,
  create,
  update,
  remove,
};
