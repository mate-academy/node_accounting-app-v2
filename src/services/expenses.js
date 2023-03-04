'use strict';

let expenses = [];

const initiate = (initialValue) => {
  expenses = initialValue;
};

const getNewId = () => {
  if (!expenses.length) {
    return 1;
  }

  return Math.max(
    ...expenses.map(({ id }) => id)
  ) + 1;
};

const getAll = ({ userId, category, from, to }) => {
  let filteredExpenses = expenses;
  const categories = Array.isArray(category)
    ? category
    : [category];

  if (userId) {
    filteredExpenses = expenses.filter(expense => expense.userId === +userId);
  }

  if (category) {
    filteredExpenses = expenses.filter(expense => (
      categories.includes(expense.category)
    ));
  }

  if (from) {
    filteredExpenses = expenses.filter(expense => (
      expense.spentAt > from
    ));
  }

  if (to) {
    filteredExpenses = expenses.filter(expense => (
      expense.spentAt < to
    ));
  }

  return filteredExpenses;
};

const getById = id => expenses.find(expense => expense.id === id) || null;

const add = ({
  userId,
  title,
  category,
  note,
  amount,
  spentAt,
}) => {
  const expense = {
    id: getNewId(),
    userId,
    title,
    category,
    note,
    amount,
    spentAt,
  };

  expenses.push(expense);

  return expense;
};

const remove = (id) => {
  expenses = expenses.filter(expense => expense.id !== id);
};

const update = (id, data) => {
  const expense = getById(id);

  return Object.assign(expense, data);
};

module.exports = {
  initiate,
  getAll,
  getById,
  remove,
  add,
  update,
};
