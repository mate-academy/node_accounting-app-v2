'use strict';

const { v4: uuidv4 } = require('uuid');

let expenses = [];

const getAll = ({
  userId,
  categories,
  from,
  to,
}) => {
  let copy = [...expenses];

  if (userId) {
    copy = copy.filter(expense => expense.userId === userId);
  }

  if (categories) {
    copy = copy.filter(expense => Array.isArray(categories)
      ? categories.includes(expense.category)
      : categories === expense.category
    );
  }

  if (from) {
    const fromDate = new Date(from);

    copy = copy.filter(expense => new Date(expense.spentAt) >= fromDate);
  }

  if (to) {
    const toDate = new Date(to);

    copy = copy.filter(expense => new Date(expense.spentAt) <= toDate);
  }

  return copy;
};

const getById = (id) => {
  return expenses.find(expense => expense.id === id) || null;
};

const create = (expenseFromUser) => {
  const user = {
    id: uuidv4(),
    ...expenseFromUser,
  };

  expenses.push(user);

  return getAll();
};

const update = (id, body) => {
  const expense = getById(id);

  Object.assign(expense, {
    ...body,
  });

  return expense;
};

const remove = (id) => {
  const newExpenses = expenses.filter(expense => expense.id !== id);

  expenses = newExpenses;
};

module.exports.expensesService = {
  getAll,
  getById,
  create,
  update,
  remove,
};
