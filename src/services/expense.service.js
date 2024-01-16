'use strict';

const { generateUniqueId } = require('../utils/generateUniqueId');
let expenses = [];

const getAll = () => {
  return expenses;
};

const getByQueries = ({
  userId,
  categories,
  from,
  to,
}) => {
  let filteredExpenses = [...expenses];

  filteredExpenses = filteredExpenses.filter(expense => {
    let condition = true;

    if (userId && expense.userId !== userId) {
      condition = false;
    }

    if (categories && !categories.includes(expense.category)) {
      condition = false;
    }

    if (from && new Date(expense.spentAt) < new Date(from)) {
      condition = false;
    }

    if (to && new Date(expense.spentAt) > new Date(to)) {
      condition = false;
    }

    return condition;
  });

  return filteredExpenses;
};

const getById = (id) => {
  return expenses.find(expense => expense.id === id) || null;
};

const create = ({
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  const expense = {
    id: generateUniqueId(),
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
  expenses = expenses.filter(expense => expense.id !== id);
};

const update = ({
  parsedId: id,
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  const expense = getById(id);

  Object.assign(expense, {
    userId: userId || expense.userId,
    spentAt: spentAt || expense.spentAt,
    title: title || expense.title,
    amount: amount || expense.amount,
    category: category || expense.category,
    note: note || expense.note,
  });

  return expense;
};

module.exports = {
  getAll,
  getByQueries,
  getById,
  remove,
  update,
  create,
};
