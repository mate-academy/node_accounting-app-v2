'use strict';

const { generateIntId } = require('../helpers/generateIntId.js');

let expenses = [];

const clear = () => {
  expenses = [];
};

const getAll = ({
  userId,
  categories,
  from,
  to,
}) => {
  let copy = [...expenses];

  copy = copy.filter(expense => {
    if (userId && expense.userId !== +userId) {
      return false;
    }

    if (categories) {
      if (Array.isArray(categories)) {
        if (!categories.includes(expense.category)) {
          return false;
        }
      } else {
        if (categories !== expense.category) {
          return false;
        }
      }
    }

    if (from) {
      const fromDate = new Date(from);

      if (new Date(expense.spentAt) < fromDate) {
        return false;
      }
    }

    if (to) {
      const toDate = new Date(to);

      if (new Date(expense.spentAt) > toDate) {
        return false;
      }
    }

    return true;
  });

  return copy;
};

const getById = (id) => {
  return expenses.find(expense => expense.id === +id) || null;
};

const create = (expenseFromUser) => {
  const expense = {
    id: generateIntId(),
    ...expenseFromUser,
  };

  expenses.push(expense);

  return expense;
};

const update = (id, body) => {
  const expense = getById(id);

  Object.assign(expense, {
    ...body,
  });

  return expense;
};

const remove = (id) => {
  const newExpenses = expenses.filter(expense => expense.id !== +id);

  expenses = newExpenses;
};

module.exports.expensesService = {
  clear,
  getAll,
  getById,
  create,
  update,
  remove,
};
