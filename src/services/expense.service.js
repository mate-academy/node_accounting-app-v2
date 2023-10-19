/* eslint-disable max-len */
'use strict';

let expenses = [];

const getAll = ({ userId, categories, from, to }) => {
  if (categories) {
    const categoriesArray = Array.isArray(categories) ? categories : [categories];

    expenses = expenses.filter(expense => categoriesArray.includes(expense.category));
  }

  if (userId) {
    expenses = expenses.filter((expense) => Number(expense.userId) === Number(userId));
  }

  if (from) {
    expenses = expenses.filter((expense) => expense.spentAt >= from);
  }

  if (to) {
    expenses = expenses.filter((expense) => expense.spentAt <= to);
  }

  return expenses;
};

const getById = (id) => {
  return expenses.find(({ id: expensesId }) => Number(expensesId) === Number(id));
};

const create = ({
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  const newExpense = {
    id: +new Date(),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpense);

  return newExpense;
};

const update = (id, body) => {
  const expense = getById(id);

  Object.assign(expense, body);

  return expense;
};

const remove = (id) => {
  expenses = expenses.filter(({ id: expenseId }) => Number(expenseId) !== Number(id));
};

const removeAll = () => {
  expenses = [];
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  removeAll,
};
